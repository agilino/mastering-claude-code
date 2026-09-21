// Live check for every official Claude Code docs link in the deck, the tasks and the docs.
// Needs network, so it is separate from lint-slides.mjs. Fails when:
//  - a linked page is no longer in the docs index (pages get renamed: slash-commands
//    became commands)
//  - a #anchor has no matching heading on its page
// scripts/audit-links.sh cannot see either: it only asks for an HTTP 200, and the docs
// site still answers 200 for a renamed page. That script covers every other external URL.
// The index is https://code.claude.com/docs/llms.txt; every page is also served as raw
// markdown at <url>.md, which is what the anchor check reads.
import { readFile, readdir } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import { join, dirname, relative } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..', '..')
const BASE = 'https://code.claude.com/docs/'

async function listMd(dir) {
  const out = []
  for (const f of await readdir(dir)) if (f.endsWith('.md')) out.push(join(dir, f))
  return out
}

const files = [
  ...(await listMd(join(root, 'slides', 'sections'))),
  ...(await listMd(join(root, 'tasks'))),
  ...(await listMd(join(root, 'docs'))),
  join(root, 'README.md'),
  join(root, 'FACILITATOR.md'),
]
  .filter(existsSync)
  // LINK-AUDIT.md is the generated report of scripts/audit-links.sh, not content
  .filter((f) => !f.endsWith('LINK-AUDIT.md'))

// url -> ["file:line", ...]
const uses = new Map()
for (const file of files) {
  const rel = relative(root, file).split('\\').join('/')
  const lines = (await readFile(file, 'utf8')).split(/\r?\n/)
  lines.forEach((line, i) => {
    for (const m of line.matchAll(/https:\/\/code\.claude\.com\/docs\/[^\s)"'<>`]+/g)) {
      const url = m[0].replace(/[.,;:]+$/, '')
      if (!uses.has(url)) uses.set(url, [])
      uses.get(url).push(`${rel}:${i + 1}`)
    }
  })
}

let errors = 0
const err = (where, msg) => { errors++; console.log(`ERROR ${where} — ${msg}`) }

// every request goes through here: an error page must never be parsed as markdown.
// scripts/audit-links.sh caps its requests at 25s; match that so a hung connection
// cannot stall this check indefinitely.
async function get(url) {
  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), 25000)
  try {
    const res = await fetch(url, { signal: controller.signal })
    if (!res.ok) throw new Error(`${res.status} ${res.statusText} for ${url}`)
    return res.text()
  } catch (e) {
    if (e.name === 'AbortError') throw new Error(`timed out after 25s for ${url}`)
    throw e
  } finally {
    clearTimeout(timeout)
  }
}

// compare anchors and headings on letters and digits only, so punctuation and
// URL-encoding differences (#side-questions-with-%2Fbtw) do not matter
const norm = (s) => s.toLowerCase().replace(/[^a-z0-9]/g, '')
// only an anchor is URL-encoded; a heading may hold a bare % that would make decoding throw
const decode = (a) => { try { return decodeURIComponent(a) } catch { return a } }

// Drop fenced code before collecting headings: a shell comment like "# Install the package"
// is not a heading. A fence closes only on the same character, at least as long as its
// opener, with nothing after it — so a four-backtick fence is not closed by three.
function withoutFences(md) {
  const out = []
  let open = null
  for (const line of md.split('\n')) {
    const m = /^[ \t]*(`{3,}|~{3,})(.*)$/.exec(line)
    if (open) {
      if (m && m[1][0] === open[0] && m[1].length >= open.length && m[2].trim() === '') open = null
      continue
    }
    if (m) { open = m[1]; continue }
    out.push(line)
  }
  return out.join('\n')
}

// Markdown headings are auto-slugified from their text; a repeated heading gets its
// slug numbered (#example, #example-1, #example-2, ...), so a bare per-heading Set
// can't tell a real numbered anchor from a made-up one — it needs the occurrence count
// too. An HTML heading (<h2 id="...">) instead carries its anchor explicitly: that id
// is the real slug, not derived from the text, so it goes into the same exact-match set.
const headingCache = new Map()
async function headingsOf(page) {
  if (!headingCache.has(page)) {
    const raw = await get(`${BASE}${page}.md`)
    const prose = withoutFences(raw)
    const mdHeadings = [...prose.matchAll(/^#{1,6}\s+(.+?)\s*$/gm)].map((m) => norm(m[1]))
    const htmlIds = [...raw.matchAll(/<h[1-6][^>]*\bid=["']([^"']+)["']/gi)].map((m) => norm(decode(m[1])))
    const counts = new Map()
    for (const h of mdHeadings) counts.set(h, (counts.get(h) ?? 0) + 1)
    headingCache.set(page, { exact: new Set([...mdHeadings, ...htmlIds]), counts })
  }
  return headingCache.get(page)
}

try {
  // pages can be nested, e.g. en/agent-sdk/overview
  const indexText = await get(`${BASE}llms.txt`)
  const pages = new Set([...indexText.matchAll(/https:\/\/code\.claude\.com\/docs\/([a-z-]+(?:\/[a-z0-9-]+)+)\.md/g)].map((m) => m[1]))
  if (pages.size === 0) throw new Error('the docs index (llms.txt) lists no pages')

  for (const [url, where] of uses) {
    const [pageUrl, anchor] = url.split('#')
    const page = pageUrl.slice(BASE.length).replace(/\/$/, '')
    if (/^[a-z-]+$/.test(page)) continue // the docs home page of a language, e.g. /docs/en/
    if (!pages.has(page)) {
      err(where.join(', '), `page not in the docs index: ${url}`)
      continue
    }
    if (!anchor) continue
    const headings = await headingsOf(page)
    const a = decode(anchor)
    if (headings.exact.has(norm(a))) continue
    // the docs site numbers a repeated heading as #example, #example-1, #example-2, ... —
    // valid only up to (occurrence count - 1), so #step-1-install-claude-code-7 fails unless
    // that heading actually appears 8 times
    const numbered = /^(.*)-(\d+)$/.exec(a)
    const idx = numbered ? Number(numbered[2]) : NaN
    const count = numbered ? (headings.counts.get(norm(numbered[1])) ?? 0) : 0
    if (numbered && idx >= 1 && idx <= count - 1) continue
    err(where.join(', '), `no heading matches #${anchor} on ${pageUrl}`)
  }
} catch (e) {
  console.log(`ERROR could not check the docs links — ${e.message}`)
  process.exit(1)
}

console.log(`\n${errors} error(s) across ${uses.size} docs links in ${files.length} files`)
process.exit(errors ? 1 : 0)
