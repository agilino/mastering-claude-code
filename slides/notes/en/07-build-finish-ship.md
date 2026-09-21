<!-- @note: batch-what-does-not-touch -->
> Do:
> - tasks/05-finish-and-ship.md steps 2-3, then back to the slides
> - [click] Show the brief from Task 05
> - Send it, then move to the next slide while it runs

Say:
- Last slices don't share files, so one brief can carry all four
- Each job has its own paths
- [click:4] The paths are what keep the jobs apart

<!-- @note: do-not-wait -->
> Do:
> - tasks/05-finish-and-ship.md steps 4-5, then back to the slides
> - Demo: ask for the build in the background, then ask something else
> - Run /usage, say the number out loud

Say:
- People are surprised in both directions
- Know the price of the way you work, then decide

<!-- @note: remember-it -->
> Do:
> - tasks/05-finish-and-ship.md step 6, then back to the slides
> - Demo: say "Remember for next time: always use UserAvatar, never a raw img tag" — wait for Claude to confirm the save
> - Show /memory — pick the auto memory folder

Say:
- The old # shortcut is gone (removed in v2.0.70) — to save on purpose, ask in words: "Remember …". Left alone, Claude also saves corrections by itself, but not every time
- CLAUDE.md is what you write down; auto memory is what Claude notices and saves itself
- Both are read at the start of every conversation

<!-- @note: review-like-a-stranger -->
> Do:
> - tasks/05-finish-and-ship.md steps 8-9, then back to the slides
> - Show full working prompt (verbatim from tasks/05-finish-and-ship.md):
>
> Review the diff of this branch against 05-start like a strict senior engineer.
> Look for: missing ownership checks in actions, Prisma calls outside lib/data,
> Zod schemas outside lib/validation.ts, params not awaited. List findings with file and line.
> Fix nothing yet.
>
> - Then say, verbatim: "Fix findings 1 and 3. Leave the others."

Say:
- Review and fix are two messages on purpose — you stay the one who decides
- Writing this prompt by hand, once, is the point today — `/code-review` is the bundled-skill shortcut for next time

<!-- @note: ship-then-look-at-the-reference -->
> Do:
> - tasks/05-finish-and-ship.md steps 7 and 10-12, then back to the slides
> - Open the PR live (or write PR.md if gh isn't set up)
> - Fetch 06-start and diff
> - Ask Claude for three differences in lib/data and app/actions, no judgement
> - Retrospective questions from Task 05 — give the group a moment to answer to a neighbour
> - Then: git checkout 06-start, npm install, npm run db:reset

Say:
- Your build stays on your branch; the next parts need one shared codebase, so everyone moves to the reference

<!-- @note: finish-and-ship -->
> Do:
> - Task 05 recap
> - Hand off to tasks/05-finish-and-ship.md, full 12 steps — no more slides until Task 06
> - Everyone must end on 06-start — check before the next divider

Say:
- Reset: 05-start = everything up to notifications; 06-start = reference CLASH, start of Part III
