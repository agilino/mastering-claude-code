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
const defaultSlidesBaseUrl = 'https://mastering-claude-code.vercel.app'
const slidesBaseUrl = (process.env.SLIDES_BASE_URL ?? defaultSlidesBaseUrl).replace(/\/+$/, '')
const slidesBase = new URL(slidesBaseUrl)
const defaultSlidesBase = new URL(defaultSlidesBaseUrl)
const allowDefaultAlongsideLocal = ['localhost', '127.0.0.1', '[::1]'].includes(slidesBase.hostname)
const allowedSlidesOrigins = new Set([
  slidesBase.origin,
  ...(allowDefaultAlongsideLocal ? [defaultSlidesBase.origin] : []),
])

function stripFencedCode(text) {
  const lines = []
  let fence = null
  for (const line of text.split('\n')) {
    const marker = /^[ \t]*(\`\`\`|~~~)/.exec(line)?.[1]
    if (marker && fence === null) {
      fence = marker
      lines.push('')
      continue
    }
    if (marker === fence) {
      fence = null
      lines.push('')
      continue
    }
    lines.push(fence ? '' : line)
  }
  return lines.join('\n')
}

function validateSlideUrl(rel, rawUrl, expectedAlias, label) {
  let url
  try {
    url = new URL(rawUrl)
  } catch {
    err(rel, `${label} is not a valid URL: ${rawUrl}`)
    return null
  }

  if (!allowedSlidesOrigins.has(url.origin)) {
    err(rel, `${label} must use ${slidesBase.origin}: ${rawUrl}`)
  }
  if (url.pathname !== `/${expectedAlias}` || url.search || url.hash) {
    err(rel, `${label} must point to /${expectedAlias}: ${rawUrl}`)
  }

  return expectedAlias
}
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
const introSlides = new Map()
const recapSlides = new Map()
const taskFiles = new Map()
const theorySlides = new Map()
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
  const taskFileMatch = /^tasks\/(\d\d)-.+\.md$/.exec(rel)
  if (taskFileMatch) {
    const num = taskFileMatch[1]
    if (taskFiles.has(num)) err(rel, `duplicate task number ${num}; also used by ${taskFiles.get(num)}`)
    else taskFiles.set(num, rel)
  }
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
    const heading = /heading:\s*"([^"]*)"/.exec(fm)?.[1] ?? ''
    const routeAliasRaw = /^routeAlias:[ \t]*(.*)$/m.exec(fm)?.[1]
    const routeAlias = routeAliasRaw?.replace(/\s+#.*$/, '').trim().replace(/^["']|["']$/g, '')
    if (routeAlias?.startsWith('theory-')) {
      if (!heading) err(rel, `slide ${n}: theory routeAlias ${routeAlias} has no heading`)
      if (theorySlides.has(routeAlias)) err(rel, `slide ${n}: duplicate theory routeAlias ${routeAlias}`)
      theorySlides.set(routeAlias, { heading, rel, slide: n })
    }
    // wording limits (see plan: no orphan words, no clipped code)
    // task-intro slides carry two lists (learn:, outcome:) — check every
    // lines:/learn:/outcome: block on the slide, not just the first
    for (const m of fm.matchAll(/(?:lines|learn|outcome):\n((?:\s+- .*\n)+)/g)) {
      for (const ln of m[1].split('\n')) {
        const txt = ln.replace(/^\s+- /, '').replace(/^"|"$/g, '')
        if (txt.length > 80) err(rel, `slide ${n}: line has ${txt.length} chars (> 80): ${txt.slice(0, 60)}…`)
      }
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
    if (layout === 'task-intro' || layout === 'task') {
      const num = /number:\s*"?(\d\d)"?/.exec(fm)?.[1]
      const label = layout === 'task-intro' ? 'task-intro slide' : 'task slide'
      if (!num) err(rel, `slide ${n}: ${label} without number`)
      else {
        if (!readdirSync(join(root, 'tasks')).some((f) => f.startsWith(`${num}-`))) err(rel, `slide ${n}: no tasks/${num}-*.md for this ${label}`)
        const registry = layout === 'task-intro' ? introSlides : recapSlides
        if (registry.has(num)) err(rel, `slide ${n}: duplicate ${label} number ${num}; also used by ${registry.get(num).rel}`)
        const aliasRaw = /^routeAlias:[ \t]*(.*)$/m.exec(fm)?.[1]
        const alias = aliasRaw?.replace(/\s+#.*$/, '').trim().replace(/^["']|["']$/g, '')
        const expectedAlias = `task-${num}`
        // routeAlias creates the /task-NN route. It lives on the intro slide,
        // the link target — the recap must not carry a second one.
        if (layout === 'task-intro') {
          if (alias !== expectedAlias) err(rel, `slide ${n}: task ${num} intro must use routeAlias: ${expectedAlias}`)
        } else if (alias !== undefined) {
          err(rel, `slide ${n}: task ${num} recap must not carry routeAlias — it belongs on the task-intro slide`)
        }
        registry.set(num, { rel, slide: n, alias })
      }
      if (/timebox:|qrSlug:|repoUrl:/.test(fm)) err(rel, `slide ${n}: ${label} still has timebox/qrSlug/repoUrl`)
    }
    if (layout === 'code-live' && !/⟵ LIVE/.test(fences)) err(rel, `slide ${n}: code-live slide without a ⟵ LIVE marker`)
    // [ \t]*, not \s*: an empty `docs:` must not swallow the next frontmatter line. Quotes are
    // valid YAML, and so is a trailing " # comment" — strip it (a '#' preceded by whitespace)
    // before checking the value, the same way a YAML parser would.
    const docsRaw = /^docs:[ \t]*(.*)$/m.exec(fm)?.[1]
    const docs = docsRaw === undefined ? undefined
      : docsRaw.replace(/\s+#.*$/, '').trim().replace(/^["']|["']$/g, '')
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

for (const [num, rel] of taskFiles) {
  const text = (await readFile(join(root, rel), 'utf8')).replace(/\r\n/g, '\n')
  const structuralText = stripFencedCode(text)
  const links = [...structuralText.matchAll(/^> Slides:[ \t]*(\S+)[ \t]*$/gm)].map((m) => m[1])
  if (links.length !== 1) err(rel, `expected exactly one Slides link for task ${num}, found ${links.length}`)
  else validateSlideUrl(rel, links[0], `task-${num}`, `task ${num} Slides link`)
  if (!introSlides.has(num)) err(rel, `no task-intro slide with number ${num} and routeAlias task-${num}`)
  if (!recapSlides.has(num)) err(rel, `no task recap slide with number ${num}`)

  const expectedHeadings = ['Theory', 'You will end up with', 'Why', 'Do this', 'Now you', 'Check', 'Stuck?', 'Go further', 'Links']
  const headings = [...structuralText.matchAll(/^## (.+)$/gm)].map((m) => m[1])
  if (JSON.stringify(headings) !== JSON.stringify(expectedHeadings)) {
    err(rel, `task headings must be exactly: ${expectedHeadings.join(' → ')}`)
  }

  const theory = /## Theory\n\n([\s\S]*?)(?=\n## )/.exec(structuralText)?.[1] ?? ''
  const theoryLinks = [...theory.matchAll(/^- \[([^\]]+)\]\(([^)]+)\)$/gm)]
  if (theoryLinks.length < 1 || theoryLinks.length > 3) {
    err(rel, `Theory must contain one to three slide links; found ${theoryLinks.length}`)
  }
  const reminders = [...theory.matchAll(/^> \*\*Reminder:\*\* .+$/gm)]
  if (reminders.length !== 1) err(rel, `Theory must contain exactly one Reminder line; found ${reminders.length}`)
  for (const [, label, rawUrl] of theoryLinks) {
    let url
    try {
      url = new URL(rawUrl)
    } catch {
      err(rel, `Theory link is not a valid URL: ${rawUrl}`)
      continue
    }
    const alias = url.pathname.replace(/^\//, '')
    if (!alias.startsWith('theory-')) {
      err(rel, `Theory link must point to a /theory-* route: ${rawUrl}`)
      continue
    }
    validateSlideUrl(rel, rawUrl, alias, `Theory link "${label}"`)
    const slide = theorySlides.get(alias)
    if (!slide) err(rel, `Theory link /${alias} has no matching slide routeAlias`)
    else if (label !== slide.heading) err(rel, `Theory link text "${label}" must match slide heading "${slide.heading}" for /${alias}`)
  }
}

for (const [num, slide] of introSlides) {
  if (!taskFiles.has(num)) err(slide.rel, `slide ${slide.slide}: no tasks/${num}-*.md for this task-intro slide`)
}
for (const [num, slide] of recapSlides) {
  if (!taskFiles.has(num)) err(slide.rel, `slide ${slide.slide}: no tasks/${num}-*.md for this task recap slide`)
}

// Block order: for every task with both an intro and a recap, they must sit
// in the same section file, intro before recap — the deck order the
// Explain-Show-You-do flow depends on (see CLAUDE.md's block-order rule).
for (const [num, intro] of introSlides) {
  const recap = recapSlides.get(num)
  if (!recap) continue // already reported above
  if (intro.rel !== recap.rel) err(recap.rel, `task ${num}: intro is in ${intro.rel}, recap is in ${recap.rel} — both must be in the same section file`)
  else if (intro.slide >= recap.slide) err(recap.rel, `task ${num}: intro (slide ${intro.slide}) must come before the recap (slide ${recap.slide}) in the same file`)
}

console.log(`\n${errors} error(s), ${warnings} warning(s) across ${files.length} files`)
process.exit(errors ? 1 : 0)
