// EN/DE presenter-note parity check. Fails when the two locales drift apart.
//
// Errors (exit 1):
//  - a notes file exists in one locale only, or has no matching sections file
//  - the note keys of a locale differ from the slide keys of its section (set or order)
//  - the [click] marker sequence of a note differs between locales
//  - a verbatim block (an English prompt or command kept as-is in the German note)
//    is not identical to the English note
//  - a prose step label ("Click 1:", "Klick 2:") is left where a [click] marker belongs
//  - tool-call residue ("</content>", "</invoke>") inside a note
//  - a command or path differs between locales: slash commands, paths, file names,
//    env vars, reset branches. A translation must carry these over unchanged.
// Warnings:
//  - bullet counts or block-line counts differ
//  - softer tokens differ: camelCase and PascalCase identifiers, numbers. German can
//    spell a number out or glue an identifier into a compound, so these only warn.
//
//   node scripts/check-notes-parity.mjs            all sections
//   node scripts/check-notes-parity.mjs 12-hooks   one section
import { readFile, readdir } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { slidesWithKeys, parseNotesFile } from './lib/slide-notes.mjs'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const LOCALES = ['en', 'de']
const only = process.argv[2]

let errors = 0
let warnings = 0
const err = (where, msg) => { errors++; console.log(`ERROR ${where}: ${msg}`) }
const warn = (where, msg) => { warnings++; console.log(`warn  ${where}: ${msg}`) }

const listMd = async (dir) => (existsSync(dir) ? (await readdir(dir)).filter((f) => f.endsWith('.md')).sort() : [])

const MARKER = /\[click(?::(\d+))?\]/g
const markerSeq = (note) => [...note.matchAll(MARKER)].map((m) => (m[1] ? `click:${m[1]}` : 'click'))
// A leading "> " (a Do/Tun stage-direction bullet rendered as a blockquote
// for smaller presenter-note type) is not itself content — a quoted bullet
// is still a bullet, not a verbatim block line.
const isBullet = (line) => /^\s*>?\s*- /.test(line)

// Splits a note into bullets and block lines. A non-bullet line directly under a
// bullet (no blank line between) is a wrapped continuation of that bullet.
function shape(note) {
  let bullets = 0
  const blocks = []
  let inBullet = false
  for (const raw of note.split('\n')) {
    const line = raw.trimEnd()
    if (!line.trim()) { inBullet = false; continue }
    if (isBullet(line)) { bullets++; inBullet = true; continue }
    if (inBullet) continue
    if (!line.trim().endsWith(':')) blocks.push(line.trim())
  }
  return { bullets, blocks }
}

const EN_WORDS = /\b(the|and|of|with|for|every|each|that|this|from|not|to|a|an|is|are|it)\b/gi
const DE_WORDS = /\b(der|die|das|und|nicht|mit|für|ist|ein|eine|den|dem|von|zu|auf|sich|wird|auch)\b/gi
const looksEnglish = (line) => (line.match(EN_WORDS) ?? []).length >= 2 && (line.match(DE_WORDS) ?? []).length < 2

// Commands and paths: a participant types these, so a mismatch is an error.
const HARD_TOKEN_PATTERNS = [
  /(?<![\w/.:])\/[a-z][\w-]*/g, // slash commands
  /[\w@()[\].-]+(?:\/[\w@()[\].*<>-]+)+/g, // paths
  /\b[\w.-]+\.(?:md|mjs|tsx?|jsx?|json|sh|ya?ml|vue|prisma|pdf)\b/g, // file names
  /\b[A-Z][A-Z0-9]*(?:_[A-Z0-9]+)+(?:=\w+)?\b/g, // ENV_VARS
  /\b\d\d-start\b/g, // reset branches
]
// Identifiers and numbers: fuzzier across languages, so a mismatch only warns.
const SOFT_TOKEN_PATTERNS = [
  /\b[a-z]+(?:[A-Z][a-z0-9]*)+\b(?:\(\))?/g, // camelCase
  /\b(?:[A-Z][a-z0-9]+){2,}\b/g, // PascalCase
  /(?<![\w.-])\d+(?:\.\d+)?(?![\w-])/g, // numbers
]
const plain = (note) => note.replace(MARKER, ' ').replace(/(\d),(\d)/g, '$1.$2')
const trimToken = (t) => t.replace(/^[([]+/, '').replace(/[.,;:!?)\]]+$/, '')
function tokenSet(note, patterns) {
  const out = new Set()
  for (const re of patterns) for (const m of plain(note).matchAll(re)) out.add(trimToken(m[0]))
  out.delete('')
  return out
}
// German glues words onto tokens ("/context-Werte", "Start-CLAUDE.md"), so a German
// token may also match with its glued prefix or suffix removed.
function present(token, otherNote, glued) {
  const t = token.toLowerCase()
  const hay = plain(otherNote).toLowerCase()
  if (/^\d+(\.\d+)?$/.test(t)) return new RegExp(`(?<![\\d.])${t.replace('.', '\\.')}(?!\\.?\\d)`).test(hay)
  const variants = glued ? [t, t.replace(/-[a-zäöüß]+$/, ''), t.replace(/^[a-zäöüß]+-/, '')] : [t]
  return variants.some((v) => v.length > 1 && hay.includes(v))
}

const sectionFiles = await listMd(join(root, 'sections'))
const perLocale = Object.fromEntries(await Promise.all(LOCALES.map(async (l) => [l, await listMd(join(root, 'notes', l))])))

for (const l of LOCALES) {
  for (const f of perLocale[l]) if (!sectionFiles.includes(f)) err(`notes/${l}/${f}`, 'no matching sections file')
  for (const f of sectionFiles) if (!perLocale[l].includes(f)) err(`notes/${l}/${f}`, 'missing — the section has no notes in this locale')
}

let checkedKeys = 0
for (const file of sectionFiles) {
  if (only && !file.startsWith(only)) continue
  const slideKeys = slidesWithKeys(await readFile(join(root, 'sections', file), 'utf8')).map((s) => s.key)
  const notes = {}
  for (const l of LOCALES) {
    const p = join(root, 'notes', l, file)
    if (!existsSync(p)) continue
    notes[l] = parseNotesFile((await readFile(p, 'utf8')).replace(/\r\n/g, '\n'))
    const keys = Object.keys(notes[l])
    for (const k of slideKeys) if (!keys.includes(k)) err(`notes/${l}/${file}`, `no note for slide key "${k}"`)
    for (const k of keys) if (!slideKeys.includes(k)) err(`notes/${l}/${file}`, `orphan note "${k}" — no slide has this key`)
    const shared = keys.filter((k) => slideKeys.includes(k))
    const expected = slideKeys.filter((k) => keys.includes(k))
    if (shared.join('|') !== expected.join('|')) err(`notes/${l}/${file}`, 'note order differs from slide order')
    for (const k of keys) {
      const where = `notes/${l}/${file} · ${k}`
      const label = /^\s*-\s*(?:\[click(?::\d+)?\]\s*)?(?:Click|Klick)\s+\d+\s*:/m.exec(notes[l][k])
      if (label) err(where, `prose step label left in place of a [click] marker: "${label[0].trim()}"`)
      const residue = /<\/?(?:content|invoke|parameter|antml)[^>]*>/.exec(notes[l][k])
      if (residue) err(where, `tool-call residue in the note: "${residue[0]}"`)
    }
  }
  if (!notes.en || !notes.de) continue

  for (const k of slideKeys) {
    const en = notes.en[k]
    const de = notes.de[k]
    if (en === undefined || de === undefined) continue
    checkedKeys++
    const where = `${file} · ${k}`

    const mEn = markerSeq(en).join(' ')
    const mDe = markerSeq(de).join(' ')
    if (mEn !== mDe) err(where, `click markers differ — en: [${mEn}] de: [${mDe}]`)

    const sEn = shape(en)
    const sDe = shape(de)
    if (sEn.bullets !== sDe.bullets) warn(where, `bullet count differs — en: ${sEn.bullets}, de: ${sDe.bullets}`)
    if (sEn.blocks.length !== sDe.blocks.length) warn(where, `block-line count differs — en: ${sEn.blocks.length}, de: ${sDe.blocks.length}`)
    for (const line of sDe.blocks) {
      if (looksEnglish(line) && !sEn.blocks.includes(line)) err(where, `verbatim line in de is not in en: "${line.slice(0, 80)}"`)
    }

    for (const [patterns, report] of [[HARD_TOKEN_PATTERNS, err], [SOFT_TOKEN_PATTERNS, warn]]) {
      const onlyEn = [...tokenSet(en, patterns)].filter((t) => !present(t, de, false))
      const onlyDe = [...tokenSet(de, patterns)].filter((t) => !present(t, en, true))
      if (onlyEn.length) report(where, `in en, not in de: ${onlyEn.join('  ')}`)
      if (onlyDe.length) report(where, `in de, not in en: ${onlyDe.join('  ')}`)
    }
  }
}

console.log(`\n${errors} error(s), ${warnings} warning(s) across ${checkedKeys} notes in ${LOCALES.join('/')}`)
process.exit(errors ? 1 : 0)
