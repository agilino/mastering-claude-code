<!-- @note: build-clash -->
> Do:
> - Divider for Part II
> - Point at the four modules of this part

Say:
- "From here on you build. I show one step, you do it on your
machine. The spec is docs/SPEC.md. Claude writes the code. You decide what is good."
- Each one is a task; each task has a reset branch

<!-- @note: task-02-foundation -->
> Do:
> - Branch: 02-start has the spec plus a first CLAUDE.md

Say:
- From a brief to a working app: scaffold it, plan the data model, then build it

<!-- @note: a-brief-has-three-parts -->
> Do:
> - Participants do this in steps 1-2
> - Start in manual mode, let the group watch the first two or three permission prompts
> - The repo is intentionally non-empty. Point out that the brief tells Claude to preserve the workshop files before create-next-app runs
> - Then switch to auto — scaffolding a Next.js app is standard, low-risk work
> - [click] Show the three parts with the real scaffold brief from Task 02
> - Contrast with the cold prompt "set up a Next.js app"

Say:
- A prompt is a wish; a brief is a contract
- [click:3] Key point: the "done when" line is the one people forget — it's what stops Claude from wandering
- It works too, but nobody — not you, not Claude — knows when it's finished

<!-- @note: read-the-diff-not-the-summary -->
> Do:
> - Participants do this in steps 3-4
> - Ask for `git status`, then run `/diff` live after the scaffold — only scaffold changes should be there, before plan mode touches anything else
> - The panel may say some files are "not shown", and brand-new files made by a shell command can be among them — `git status` is the complete list, which is why it comes first
> - Ask Claude to commit, read the commit message it wrote

Say:
- Habit to build early: after every step, read `/diff` — in fullscreen the panel stays open and refreshes itself, and running `/diff` again closes it
- Claude's summary is usually right — the diff is always right
- This is a good first place to let Claude take over a chore

<!-- @note: plan-mode-read-think-propose -->
> Do:
> - Participants do this in steps 5, 7-8 — step 6 (the actual prompt) is next, on its own live-coding slide
> - Demo live: Shift+Tab until the status bar shows "plan mode on" (two presses from Manual mode, three from auto — Pro/Max/Team sessions start in auto)
> - Let the plan appear, once you've sent the prompt from the next slide
> - Read one part of it out loud, ask the group a question ("why lib/generated/prisma?")
> - Switch back and say "do it"

Say:
- [click] Point: the data model is hard to change later — this is the moment to look before Claude writes



<!-- @note: when-a-plan-earns-its-cost -->
> Do:
> - Ask for one example that deserves a plan and one that does not.
> - Keep the boundary practical: uncertainty, blast radius, reversibility.

Say:
- Planning is not free. It reads code, writes prose, and creates another artifact to review.
- Pay that cost when a wrong direction is expensive or the approach is genuinely unclear.
- If you could describe the diff in one sentence and verify it cheaply, implementation is often the better first move.

<!-- @note: a-good-plan-has-an-exit -->
> Do:
> - Point left to right through the eight fields.
> - Stop on verification and done. Those are what turn a plan into an executable work package.

Say:
- A good plan is not a tour of the repository. It states the decision boundary and how each risky step will be checked.
- Evidence means real files, contracts and observed behavior. Risks name what would invalidate the approach.
- Done is observable. A plan with no exit condition tends to grow while it is being implemented.

<!-- @note: plan-or-roadmap -->
> Do:
> - Ask: could two middle pieces be reviewed, merged or reverted independently? If yes, call them work packages.

Say:
- A plan should describe one coherent change with one acceptance boundary.
- Once several outcomes are independently valuable, mergeable or revertible, the useful artifact is a roadmap with smaller plans underneath it.
- Smaller boundaries make review, delegation, rollback and verification cheaper.

<!-- @note: upgrade-the-planner-not-the-run -->
> Do:
> - Point out opusplan in the model docs: Opus while planning, Sonnet for execution.
> - Explain the reviewer pattern without turning it into a required second vendor or tool.

Say:
- Spend the expensive model on the decision when the decision is the hard part; routine execution does not automatically need it.
- A fresh reviewer should attack assumptions, missing constraints and verification gaps.
- Do not bounce the whole plan through reviewers indefinitely. Resolve the disagreements, freeze the work package, execute, then verify.

<!-- @note: plan-the-data-model -->
> Do:
> - Participants do this in step 6
> - Paste the prompt with the rules as bullet points — use "\" at the end of a line to continue on a new line without sending

Say:
- SQLite has no enums
- the generated client path keeps the import stable
- tsx makes the TypeScript seed command portable across the workshop's supported Node versions
- Prisma 7.10+ may generate prisma7.config.ts; older 7.x projects can still use prisma.config.ts
- the seed is what every later task logs in with

<!-- @note: foundation -->
> Do:
> - Task 02 recap
> - Hand off to tasks/02-foundation.md, full 11 steps — no more slides until Task 03
> - Watch the chat while they work
> - Most common stall: create-next-app and local package-manager preferences. The brief forces npm, no src/ directory, non-interactive answers and preservation of the workshop files

Say:
- 02-start = spec plus a first CLAUDE.md; 03-start = where you land if this task goes wrong
- "answer yes to everything you are not sure about."
