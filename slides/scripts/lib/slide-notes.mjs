// Shared slide-splitting and note-keying logic used by both
// scripts/migrate-notes.mjs (one-time extraction) and scripts/deck.mjs
// (per-build note injection). Keep these two in lockstep: a key derived
// here must always match the key a note was filed under.

export function slugify(s) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')
}

// Fence-aware splitter (mirrors scripts/lint-slides.mjs) that preserves the
// exact original delimiter text and trailing-newline state for a byte-exact
// round trip via reconstruct().
export function splitSlides(text) {
  const trailingNL = text.endsWith('\n')
  const lines = (trailingNL ? text.slice(0, -1) : text).split('\n')
  const slides = ['']
  const delims = []
  let inFence = false
  lines.forEach((line, idx) => {
    const sep = idx === lines.length - 1 && !trailingNL ? '' : '\n'
    if (/^```/.test(line)) inFence = !inFence
    if (!inFence && /^---\s*\r?$/.test(line)) { delims.push(line + sep); slides.push(''); return }
    slides[slides.length - 1] += line + sep
  })
  return { slides, delims }
}

export function reconstruct({ slides, delims }) {
  let out = slides[0]
  for (let i = 1; i < slides.length; i++) out += delims[i - 1] + slides[i]
  return out
}

// Returns [{ n, fm, body }] — one entry per slide (frontmatter + body pair),
// with the same key derivation + intra-file dedup rule migrate-notes.mjs used.
export function slidesWithKeys(text) {
  const { slides } = splitSlides(text)
  const usedKeys = new Set()
  const out = []
  for (let i = 1; i < slides.length; i += 2) {
    const n = Math.ceil(i / 2)
    const fm = slides[i]
    const body = slides[i + 1] ?? ''
    const heading = /heading:\s*"([^"]*)"/.exec(fm)?.[1]
    let key = (heading ? slugify(heading) : '') || `slide-${n}`
    let unique = key, suffix = 2
    while (usedKeys.has(unique)) unique = `${key}-${suffix++}`
    usedKeys.add(unique)
    out.push({ n, fm, body, key: unique })
  }
  return out
}

// Parses notes/<lang>/NN-*.md into { key: noteText }.
export function parseNotesFile(text) {
  const notes = {}
  const blocks = text.split(/^<!-- @note: (.+?) -->\s*$/m)
  // blocks[0] is any text before the first marker (should be empty/whitespace)
  for (let i = 1; i < blocks.length; i += 2) {
    const key = blocks[i].trim()
    const body = (blocks[i + 1] ?? '').trim()
    notes[key] = body
  }
  return notes
}
