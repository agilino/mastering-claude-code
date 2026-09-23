<!-- @note: task-05-finish-and-ship -->
> Do:
> - Branch: 05-start already has auth, the shell, clashes, venues, the map and notifications

Say:
- Five things to learn, five things to build — the last stretch before the reference build takes over

<!-- @note: batch-what-does-not-touch -->
> Do:
> - Participants do this in steps 2-3
> - [click] Show the brief from Task 05
> - Send it, then move to the next slide while it runs

Say:
- Last slices don't share files, so one brief can carry all four
- Each job has its own paths
- [click:4] The paths are what keep the jobs apart

<!-- @note: do-not-wait -->
> Do:
> - Participants do this in steps 4-5
> - Demo: ask for the build in the background, then ask something else
> - Run /usage, say the number out loud

Say:
- People are surprised in both directions
- Know the price of the way you work, then decide

<!-- @note: remember-it -->
> Do:
> - Participants do this in step 6
> - Demo: say "Remember for next time: always use UserAvatar, never a raw img tag" — wait for Claude to confirm the save
> - Show /memory — pick the auto memory folder
> - Optional: point at the docs page's "Auto memory" section — the four note types, and where the files live

Say:
- The old # shortcut is gone (removed in v2.0.70) — to save on purpose, ask in words: "Remember …". Left alone, Claude also saves corrections by itself, but not every time
- CLAUDE.md is what you write down; auto memory is what Claude notices and saves itself
- Both are read at the start of every conversation

<!-- @note: review-like-a-stranger -->
> Do:
> - Participants do this in steps 8-9
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
> - Participants do this in steps 7 and 10-12
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
> - Hand off to tasks/05-finish-and-ship.md, full 13 steps — no more slides until Task 06
> - Everyone must end on 06-start — check before the next divider

Say:
- Reset: 05-start = everything up to notifications; 06-start = reference CLASH, start of Part III
