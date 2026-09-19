// One-time migration: pull the trailing <!-- ... --> presenter note off every
// slide in slides/sections/*.md into slides/notes/en/*.md (keyed per slide),
// and strip the note out of sections/*.md so there is exactly one English
// source for each note. Run once: `node scripts/migrate-notes.mjs`.
// `--check` reconstructs the original file from the split pieces first and
// diffs it byte-for-byte, so a splitter bug fails loudly instead of eating content.
//
// Two passes: every section is validated and its output staged in memory first;
// files are written only when all of them passed. A slide without a trailing
// note aborts the run before anything on disk has changed.
import { readFile, writeFile, readdir, mkdir } from 'node:fs/promises'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { splitSlides, reconstruct, slugify } from './lib/slide-notes.mjs'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const sectionsDir = join(root, 'sections')
const notesEnDir = join(root, 'notes', 'en')
const check = process.argv.includes('--check')

let totalNotes = 0
const files = (await readdir(sectionsDir)).filter((f) => f.endsWith('.md')).sort()
const staged = []

// Pass 1 — validate everything, write nothing.
for (const file of files) {
  const path = join(sectionsDir, file)
  const text = await readFile(path, 'utf8')
  const eol = text.includes('\r\n') ? '\r\n' : '\n'
  const parsed = splitSlides(text)
  const { slides } = parsed

  if (reconstruct(parsed) !== text) {
    throw new Error(`${file}: splitter did not round-trip the file — aborting before touching anything`)
  }

  const usedKeys = new Set()
  let notesOut = ''

  for (let i = 1; i < slides.length; i += 2) {
    const n = Math.ceil(i / 2)
    const fm = slides[i]
    const body = slides[i + 1] ?? ''

    const heading = /heading:\s*"([^"]*)"/.exec(fm)?.[1]
    let key = (heading ? slugify(heading) : '') || `slide-${n}`
    let unique = key, suffix = 2
    while (usedKeys.has(unique)) unique = `${key}-${suffix++}`
    usedKeys.add(unique)

    const matches = [...body.matchAll(/<!--[\s\S]*?-->/g)]
    const last = matches.at(-1)
    if (!last || last.index + last[0].length < body.trimEnd().length) {
      throw new Error(`${file} slide ${n}: no trailing <!-- --> note found — aborting before touching anything`)
    }
    const noteBody = last[0].slice(4, -3).trim().replace(/\r\n/g, '\n')
    totalNotes++
    notesOut += `<!-- @note: ${unique} -->\n${noteBody}\n\n`

    slides[i + 1] = body.slice(0, last.index).trimEnd() + eol + eol
  }

  staged.push({ file, path, sectionOut: reconstruct(parsed), notesOut: notesOut.trimEnd() + '\n' })
}

// Pass 2 — every section passed: write.
if (!check) {
  await mkdir(notesEnDir, { recursive: true })
  for (const { file, path, sectionOut, notesOut } of staged) {
    await writeFile(path, sectionOut, 'utf8')
    await writeFile(join(notesEnDir, file), notesOut, 'utf8')
  }
}

console.log(`${check ? '[check] ' : ''}${totalNotes} notes extracted from ${files.length} files`)
