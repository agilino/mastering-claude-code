// Orchestrator for the Slidev deck: generates a per-locale entry deck (English
// notes by default, German with --lang=de) by splicing slides/notes/<lang>/*.md
// back onto slides/sections/*.md, then runs Slidev on the generated entry.
//
//   npm run dev                 -> English dev server
//   npm run dev -- --lang=de    -> German dev server
//   npm run build -- --lang=de  -> German build + PDF export
//   npm run export -- --lang=de -> German PDF export only
//
// Slide bodies and frontmatter are never localized — only presenter notes are.
import { readFile, writeFile, mkdir, readdir } from 'node:fs/promises'
import { existsSync, watch } from 'node:fs'
import { join, dirname, relative } from 'node:path'
import { fileURLToPath } from 'node:url'
import { spawn } from 'node:child_process'
import { parseArgs } from 'node:util'
import { slidesWithKeys, parseNotesFile } from './lib/slide-notes.mjs'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const sectionsDir = join(root, 'sections')
const manifestPath = join(root, 'slides.md')

const { values, positionals } = parseArgs({
  args: process.argv.slice(2),
  options: { lang: { type: 'string', default: 'en' } },
  allowPositionals: true,
})
const cmd = positionals[0] ?? 'dev'
const lang = values.lang
if (!existsSync(join(root, 'notes', lang))) {
  throw new Error(`no slides/notes/${lang}/ directory — known locales: ${(await readdir(join(root, 'notes'))).join(', ')}`)
}

async function generate() {
  const genSectionsDir = join(root, 'generated', 'sections', lang)
  await mkdir(genSectionsDir, { recursive: true })

  const sectionFiles = (await readdir(sectionsDir)).filter((f) => f.endsWith('.md')).sort()
  for (const file of sectionFiles) {
    const sectionText = await readFile(join(sectionsDir, file), 'utf8')
    const eol = sectionText.includes('\r\n') ? '\r\n' : '\n'
    const notesPath = join(root, 'notes', lang, file)
    const notes = existsSync(notesPath) ? parseNotesFile(await readFile(notesPath, 'utf8')) : {}

    let out = ''
    for (const { fm, body, key } of slidesWithKeys(sectionText)) {
      const note = notes[key]
      if (note === undefined) throw new Error(`${file}: no ${lang} note for key "${key}" — run scripts/migrate-notes.mjs or add it to notes/${lang}/${file}`)
      // A notes file checked out with CRLF already carries \r\n: match either form,
      // or a CRLF section would get \r\r\n inside its notes.
      out += `---${eol}${fm}---${eol}${body.trimEnd()}${eol}${eol}<!--${eol}${note.replace(/\r?\n/g, eol)}${eol}-->${eol}${eol}`
    }
    await writeFile(join(genSectionsDir, file), out, 'utf8')
  }

  const manifestText = await readFile(manifestPath, 'utf8')
  const genManifest = manifestText.replace(
    /src: \.\/sections\/(\S+\.md)/g,
    (_m, f) => `src: ./generated/sections/${lang}/${f}`,
  )
  const outManifest = join(root, `slides.${lang}.md`)
  await writeFile(outManifest, genManifest, 'utf8')
  return outManifest
}

async function runQrGen() {
  await import('./generate-qr.mjs')
}

function resolveSlidevCli() {
  // Run Slidev's own CLI file with the current Node binary, not the package
  // manager's shim in node_modules/.bin (slidev.cmd, slidev.exe, slidev.ps1).
  // A shim, and the cmd.exe a .cmd shim needs, sit between the terminal and
  // Slidev — and Slidev only binds its r/o/e/q keys when its stdin is a TTY.
  const cli = join(root, 'node_modules', '@slidev', 'cli', 'bin', 'slidev.mjs')
  if (!existsSync(cli)) throw new Error(`no Slidev CLI at ${cli} — run install first`)
  return cli
}

function spawnSlidev(args) {
  const child = spawn(process.execPath, [resolveSlidevCli(), ...args], { stdio: 'inherit', cwd: root })
  return new Promise((resolvePromise, reject) => {
    child.on('exit', (code) => (code === 0 ? resolvePromise() : reject(new Error(`slidev exited with code ${code}`))))
    child.on('error', reject)
  })
}

await runQrGen()
const entry = await generate()
const entryRel = relative(root, entry).replace(/\\/g, '/')

if (cmd === 'dev') {
  console.log(`[deck] lang=${lang} — watching sections/ and notes/${lang}/ for changes`)
  let regenerating = false
  let pending = false
  const regen = async () => {
    // A save that lands while a pass is running must not be dropped: the pass may
    // have read that file already. Remember it and run once more afterwards.
    if (regenerating) { pending = true; return }
    regenerating = true
    try {
      do {
        pending = false
        try {
          await generate()
          console.log(`[deck] regenerated ${entryRel}`)
        } catch (e) {
          console.error(`[deck] regeneration failed: ${e.message}`)
        }
      } while (pending)
    } finally {
      regenerating = false
    }
  }
  const watchers = [
    watch(sectionsDir, { recursive: true }, regen),
    watch(join(root, 'notes', lang), { recursive: true }, regen),
  ]
  if (!process.stdin.isTTY) {
    console.log('[deck] stdin is not a TTY — Slidev\'s r/o/e/q keys are off in this terminal; stop with Ctrl+C')
  }
  // Stop when Slidev stops (q, or Ctrl+C). The watchers would keep this process
  // alive, and the terminal would look hung as if the key had done nothing.
  try {
    await spawnSlidev(['--open', entryRel])
  } catch {
    process.exitCode = 1
  } finally {
    for (const w of watchers) w.close()
  }
} else if (cmd === 'build' || cmd === 'export') {
  // Keep the default (English) PDF name unsuffixed — docs/CI already point at
  // dist/mastering-claude-code.pdf; only non-default locales get a suffix.
  const pdfName = lang === 'en' ? 'mastering-claude-code.pdf' : `mastering-claude-code.${lang}.pdf`
  if (cmd === 'build') await spawnSlidev(['build', entryRel])
  await mkdir(join(root, 'dist'), { recursive: true })
  await spawnSlidev(['export', entryRel, '--output', `dist/${pdfName}`])
} else {
  throw new Error(`unknown command "${cmd}" — use dev, build, or export`)
}
