<!-- @note: build-clash -->
> Do:
> - Divider for Part II
> - Point at the four modules of this part

Say:
- "From here on you build. I show one step, you do it on your
machine. The spec is docs/SPEC.md. Claude writes the code. You decide what is good."
- Each one is a task; each task has a reset branch

<!-- @note: a-brief-has-three-parts -->
> Do:
> - [click] Show the three parts with the real scaffold brief from Task 02
> - Contrast with the cold prompt "set up a Next.js app"

Say:
- A prompt is a wish; a brief is a contract
- [click:3] Key point: the "done when" line is the one people forget — it's what stops Claude from wandering
- It works too, but nobody — not you, not Claude — knows when it's finished

<!-- @note: plan-mode-read-think-propose -->
> Do:
> - Demo live: Shift+Tab until the status bar shows "plan mode on" (two presses from Manual mode, three from auto — Pro/Max/Team sessions start in auto)
> - Send the data model prompt from Task 02, let the plan appear
> - Read one part of it out loud, ask the group a question ("why lib/generated/prisma?")
> - Switch back and say "do it"

Say:
- [click] Point: the data model is hard to change later — this is the moment to look before Claude writes

<!-- @note: read-the-diff-not-the-summary -->
> Do:
> - Show git status after the scaffold
> - Ask Claude to commit, read the commit message it wrote

Say:
- Habit to build early: after every step, look at the files
- Claude's summary is usually right — the diff is always right
- This is a good first place to let Claude take over a chore

<!-- @note: plan-the-data-model -->
> Do:
> - FULL WORKING PROMPT (verbatim from tasks/02-foundation.md):

Read @docs/SPEC.md, section "Data". Plan a Prisma 7 schema for SQLite using the
better-sqlite3 adapter. Five models. Status and type fields are strings, not enums.
Generate the client into lib/generated/prisma. Also plan a seed with 8 users
(password "test", hashed with bcryptjs), 8 venues and 8 clashes in Berlin,
some past, some upcoming. Show the plan, do not write files.

- Type the rules live, one by one

Say:
- SQLite has no enums
- the generated client path keeps the import stable
- the seed is what every later task logs in with

<!-- @note: foundation -->
> Do:
> - Task 02 recap
> - Say the reset branch and where the task file is
> - Walk the group while they work
> - Most common stall: create-next-app asking interactive questions — the brief's flags avoid most of them

Say:
- 02-start = spec plus a first CLAUDE.md; 03-start = where you land if this task goes wrong
- "answer yes to everything you are not sure about."
