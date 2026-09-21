// Content lint for the workshop. Fails on:
//  - any time / date / day / event reference in slides, tasks, README, FACILITATOR
//  - a task slide whose qrSlug has no matching tasks/<slug>.md
//  - a code-live slide without a "⟵ LIVE" marker
//  - a concept slide with more than 40 words of body text (warning)
//  - a docs link that breaks the convention: the `docs:` frontmatter field, an official
//    English docs URL, never on a task slide, never an inline <DocLink> tag in a slide body
import { readFile, readdir } from 'node:fs/promises'
import { existsSync, readdirSync } from 'node:fs'
import { join, dirname, relative } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..', '..')
const forbidden = [
  [/\b\d{1,2}:\d{2}\b/, 'clock time'],
  [/(?<![-\w\/.])\b\d+\s?(min|mins|minutes?|hours?|h)\b(?![-\w])/i, 'duration'],
  [/\bDay\s?[123]\b/, 'day number'],
  [/\b(React Day|GitNation|Zoom)\b/, 'event reference'],
  [/\bconference\b/i, 'event reference'],
  [/\b20[2-3]\d-\d\d(-\d\d)?\b/, 'date'],
  [/\btime-?box\b/i, 'time-box'],
  [/\b(this morning|this afternoon|after the break|tomorrow morning)\b/i, 'time of day'],
  [/\bthe room\b/i, 'room wording'],
  [/\bblock ends\b/i, 'block wording'],
  [/\bmarble\b/i, 'marble chart'],
  [/\b(\d+|ten|twenty|thirty|sixty)[- ]seconds?\b/i, 'seconds'],
  // German equivalents — apply to slides/notes/de/*.md and any other German content
  [/\b\d{1,2}\s?Uhr\b/, 'clock time (de)'],
  [/(?<![-\w\/.])\b\d+\s?(Minuten?|Stunden?)\b(?![-\w])/, 'duration (de)'],
  [/\bTag\s?[123]\b/, 'day number (de)'],
  [/\b(Montag|Dienstag|Mittwoch|Donnerstag|Freitag|Samstag|Sonntag)\b/, 'weekday (de)'],
  [/\b20[2-3]\d-\d\d(-\d\d)?\b/, 'date (de)'],
  [/\b\d{1,2}\.\d{1,2}\.\d{4}\b/, 'date (de, DD.MM.YYYY)'],
  [/\bKonferenz\b/i, 'event reference (de)'],
  [/\b(heute (früh|Morgen)|heute Nachmittag|nach der Pause|morgen früh)\b/i, 'time of day (de)'],
  [/\bim Raum\b/i, 'room wording (de)'],
]
// QR is allowed only on the welcome section (the trainer's LinkedIn code)
const forbiddenOutsideWelcome = [[/\bQR\b/, 'QR code']]

let errors = 0
let warnings = 0
const err = (f, msg) => { errors++; console.log(`ERROR ${f}: ${msg}`) }
const warn = (f, msg) => { warnings++; console.log(`warn  ${f}: ${msg}`) }

async function listMd(dir) {
  const out = []
  for (const f of await readdir(dir)) if (f.endsWith('.md')) out.push(join(dir, f))
  return out
}

const files = [
  ...(await listMd(join(root, 'slides', 'sections'))),
  ...(existsSync(join(root, 'slides', 'notes', 'en')) ? await listMd(join(root, 'slides', 'notes', 'en')) : []),
  ...(existsSync(join(root, 'slides', 'notes', 'de')) ? await listMd(join(root, 'slides', 'notes', 'de')) : []),
  ...(await listMd(join(root, 'tasks'))),
  ...(await listMd(join(root, 'docs'))),
  join(root, 'README.md'),
  join(root, 'FACILITATOR.md'),
].filter(existsSync)

for (const file of files) {
  // normalise line endings and path separators, or every per-slide check below is
  // silently skipped on Windows (backslash paths never start with 'slides/sections/')
  const text = (await readFile(file, 'utf8')).replace(/\r\n/g, '\n')
  const rel = relative(root, file).split('\\').join('/')
  text.split('\n').forEach((line, i) => {
    const rules = rel.endsWith('00-welcome.md') ? forbidden : [...forbidden, ...forbiddenOutsideWelcome]
    for (const [re, label] of rules) {
      if (re.test(line)) err(rel, `line ${i + 1} — ${label}: ${line.trim().slice(0, 90)}`)
    }
  })

  if (!rel.startsWith('slides/sections/')) continue
  // split into slides: a slide starts with a frontmatter block delimited by --- lines
  // split into chunks on --- lines that are NOT inside a code fence
  const slides = ['']
  let inFence = false
  for (const line of text.split('\n')) {
    if (/^```/.test(line)) inFence = !inFence
    if (!inFence && /^---\s*$/.test(line)) { slides.push(''); continue }
    slides[slides.length - 1] += line + '\n'
  }
  // slides[] alternates: '', frontmatter, body, frontmatter, body ...
  for (let i = 1; i < slides.length; i += 2) {
    const fm = slides[i]
    const raw = slides[i + 1] ?? ''
    const fences = (raw.match(/```[\s\S]*?```/g) ?? []).join('\n')
    const body = raw.replace(/<!--[\s\S]*?-->/g, '')
    const layout = /layout:\s*(\S+)/.exec(fm)?.[1]
    const n = Math.ceil(i / 2)
    // wording limits (see plan: no orphan words, no clipped code)
    const linesBlock = /lines:\n((?:\s+- .*\n)+)/.exec(fm)?.[1] ?? ''
    for (const ln of linesBlock.split('\n')) {
      const txt = ln.replace(/^\s+- /, '').replace(/^"|"$/g, '')
      if (txt.length > 80) err(rel, `slide ${n}: line has ${txt.length} chars (> 80): ${txt.slice(0, 60)}…`)
    }
    for (const fence of raw.match(/```[\s\S]*?```/g) ?? []) {
      const count = fence.split('\n').length - 2
      if (layout === 'code-live' && count > 14) err(rel, `slide ${n}: code-live fence has ${count} lines (> 14)`)
      if (/^```(txt|text)/.test(fence) && /<!--/.test(fence)) err(rel, `slide ${n}: HTML comment inside a txt fence — use a plain ⟵ LIVE line`)
    }
    if (layout === 'task') {
      for (const key of ['goal', 'success']) {
        const v = new RegExp(`${key}:\\s*"([^"]*)"`).exec(fm)?.[1] ?? ''
        const words = v.trim().split(/\s+/).filter(Boolean).length
        if (words > 22) err(rel, `slide ${n}: task ${key} has ${words} words (> 22)`)
      }
      const th = /heading:\s*"([^"]*)"/.exec(fm)?.[1] ?? ''
      if (th.trim().split(/\s+/).length > 5) err(rel, `slide ${n}: task heading "${th}" has more than 5 words`)
    }
    if (layout === 'task') {
      const num = /number:\s*"?(\d\d)"?/.exec(fm)?.[1]
      if (!num) err(rel, `slide ${n}: task slide without number`)
      else if (!readdirSync(join(root, 'tasks')).some((f) => f.startsWith(`${num}-`))) err(rel, `slide ${n}: no tasks/${num}-*.md for this task slide`)
      if (/timebox:|qrSlug:|repoUrl:/.test(fm)) err(rel, `slide ${n}: task slide still has timebox/qrSlug/repoUrl`)
    }
    if (layout === 'code-live' && !/⟵ LIVE/.test(fences)) err(rel, `slide ${n}: code-live slide without a ⟵ LIVE marker`)
    // [ \t]*, not \s*: an empty `docs:` must not swallow the next frontmatter line. Quotes are valid YAML.
    const docs = /^docs:[ \t]*["']?(.*?)["']?[ \t]*$/m.exec(fm)?.[1]
    if (docs !== undefined) {
      // pages can be nested (en/agent-sdk/overview); anchors may hold dots, underscores and %2F
      if (!/^https:\/\/code\.claude\.com\/docs\/en\/[a-z0-9-]+(\/[a-z0-9-]+)*(#[A-Za-z0-9%._-]+)?$/.test(docs)) err(rel, `slide ${n}: docs link is not an official English docs URL: ${docs || '(empty)'}`)
      // only these layouts draw the link; anywhere else the field would pass silently and show nothing
      if (!['concept', 'code-live', 'section'].includes(layout)) err(rel, `slide ${n}: docs link on a ${layout ?? 'default'} slide — only concept, code-live and section slides draw it (task slides carry no URL)`)
    }
    if (/<DocLink\b/.test(body)) err(rel, `slide ${n}: inline <DocLink> tag — use the docs: frontmatter field instead`)
    if (layout === 'concept') {
      const words = body
        .replace(/<[^>]+>/g, ' ')
        .replace(/:\w+="[^"]*"/g, ' ')
        .replace(/```[\s\S]*?```/g, ' ')
        .trim()
        .split(/\s+/)
        .filter(Boolean).length
      if (words > 40) warn(rel, `slide ${n}: concept body has ${words} words (> 40)`)
    }
  }
}

console.log(`\n${errors} error(s), ${warnings} warning(s) across ${files.length} files`)
process.exit(errors ? 1 : 0)
