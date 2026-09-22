#!/usr/bin/env node

import { existsSync } from 'node:fs'
import { readdir, writeFile } from 'node:fs/promises'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = fileURLToPath(new URL('..', import.meta.url))
const tasksDir = join(root, 'tasks')
const slidesBaseUrl = (process.env.SLIDES_BASE_URL ?? 'https://mastering-claude-code.vercel.app').replace(/\/+$/, '')
const args = process.argv.slice(2)

function usage() {
  console.error('Usage:')
  console.error('  npm run task:new -- 15 My new task')
  console.error('  npm run task:new -- My new task')
  process.exit(1)
}

function slugify(value) {
  return value
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

async function nextTaskNumber() {
  const files = await readdir(tasksDir)
  const numbers = files
    .map((file) => /^(\d\d)-.+\.md$/.exec(file)?.[1])
    .filter(Boolean)
    .map(Number)

  const next = (numbers.length ? Math.max(...numbers) : 0) + 1
  if (next > 99) throw new Error('Task numbers above 99 are not supported.')
  return String(next).padStart(2, '0')
}

if (args.length === 0) usage()

const explicitNumber = /^\d{1,2}$/.test(args[0])
const number = explicitNumber
  ? String(Number(args.shift())).padStart(2, '0')
  : await nextTaskNumber()

if (number === '00') throw new Error('Task number must be between 01 and 99.')

const title = args.join(' ').trim()
if (!title) usage()

const slug = slugify(title)
if (!slug) throw new Error('Title must contain at least one letter or number.')

const filename = `${number}-${slug}.md`
const target = join(tasksDir, filename)
const existingForNumber = (await readdir(tasksDir)).find((file) => file.startsWith(`${number}-`))

if (existingForNumber) {
  throw new Error(`Task ${number} already exists: tasks/${existingForNumber}`)
}
if (existsSync(target)) {
  throw new Error(`Task already exists: tasks/${filename}`)
}

const content = `# Task ${number} — ${title}

> Part: TODO · Reset branch: \`${number}-start\`
> Slides: ${slidesBaseUrl}/task-${number}

## Theory

- [TODO: exact slide heading](${slidesBaseUrl}/theory-TODO)

> **Reminder:** TODO

## You will end up with

TODO

## Why

TODO

## Do this

1. TODO

## Now you

- TODO

## Check

- [ ] TODO

## Stuck?

\`git checkout ${number}-start\` — TODO.

## Go further

TODO

## Links

- TODO
`

await writeFile(target, content, { flag: 'wx' })

console.log(`Created tasks/${filename}`)
console.log('')
console.log('Next:')
console.log(`  1. Fill the TODOs and set Part.`)
console.log(`  2. Add a task-intro slide with number: "${number}" and routeAlias: task-${number}, then a`)
console.log(`     task recap slide with the same number and no routeAlias, in the same section file.`)
console.log('  3. Replace theory-TODO with stable theory-* aliases whose link text matches the slide headings.')
console.log('  4. Run: npm run task:check')
