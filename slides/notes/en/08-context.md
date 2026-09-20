<!-- @note: control-the-context -->
> Do:
> - Part III starts here — everyone switches to the reference CLASH: `git checkout 06-start`
> - Say it once, clearly

Say:
- Not building any more, now controlling
- Three tasks: context, skills, subagents
- Each is a different way of deciding what enters the window

<!-- @note: seven-tools-one-constraint -->
> Do:
> - Map before territory — walk the seven rows top to bottom
> - Leave the map up — it returns on every divider with the current row highlighted

Say:
- [click] Context: always on, the constraint everything else works around
- [click] Skill: for repeatable work you keep re-explaining
- [click] Subagent: for noisy work that would pollute your thread
- [click] Agent team: when workers need to talk to each other
- [click] Workflow: when the fan-out is bigger than one conversation can steer
- [click] Hook: when a rule must hold whether or not the agent agrees
- [click] MCP: when the agent needs to reach outside the repo

<!-- @note: context -->
> Do:
> - Divider: context row highlighted
> - Keep the beat short

Say:
- "We start here because it is the row that is always in play."

<!-- @note: context-is-an-instrument -->
> Do:
> - Demo: run `/context` live on a fresh session in the reference CLASH
> - Read the lines aloud — don't summarize, let people hear the real numbers

Say:
- Come back to this same command after every task from now on
- [click] The diagram is the same picture the command draws in text

<!-- @note: budget-or-dumping-ground -->
> Do:
> - Demo: open both files live
> - Say plainly
> - Keep the import in the CLAUDE.md we write

Say:
- This is the whole content, nothing hidden
- There is nothing to trim
- The exercise: write a good context file from nothing, grounded in real rules
- That's the harder, more useful skill
- Most repos you touch look like this: nothing, or nearly nothing
- Worth knowing: since Claude Code v2.1.277, Claude reads AGENTS.md by itself — but only when the repo has no CLAUDE.md. CLASH has one, so the @AGENTS.md import is still what loads AGENTS.md.

<!-- @note: the-shape-underneath-the-rules -->
> Do:
> - Show the shape before writing a single rule
> - Task 08 spends a long time on that node being missing in two places — plant it now

Say:
- [click] Reads: browser → page → helper in lib/data → Prisma → SQLite
- [click] Writes: client → Server Action in app/actions → requireUser() plus an ownership check → Prisma → revalidatePath back to the page
- [click] Point at the auth-check node — highlighted on purpose

<!-- @note: claude-md-from-real-rules -->
> Do:
> - FULL WORKING SOLUTION (trainer only — do not show before people write their own): `workshop-artifacts/06-context-and-claude-md/CLAUDE.md` in the workshop repository
> - While building it: point at the exact line in `app/actions/clashes.ts` with the ownership check
> - Show on screen: `if (clash.creatorId !== user.id)`
> - If a draft is mostly prose and vibes, push back
> - That seeds task 10

Say:
- The six rules:
  - reads in `lib/data/*`
  - writes in `app/actions/*`, and every action re-checks authorization itself (a Server Action is a public POST endpoint with a generated id; the layout guard protects the page, not the action)
  - `lib/validation.ts` is the only place for Zod schemas
  - Prisma client generated to `lib/generated/prisma`
  - status fields are strings with values in `lib/constants.ts`
  - Next 16 `params` and `searchParams` are Promises
- "could a hook enforce this? If not, is it a rule or a preference?"

<!-- @note: references-beat-grep-and-guess -->
> Do:
> - Say plainly

Say:
- Left (careless), one step per click:
  - [click] grep -r "notif" app/
  - [click] read 40 files
  - [click] guess the notification model
  - [click] guess the Server Action shape
  - [click] write code, hope it compiles
  - [click] context bar: ~85% consumed
- Right (engineered), one step per click:
  - [click] @lib/data/notifications.ts
  - [click] @app/actions/clashes.ts
  - [click] @prisma/schema.prisma
  - [click] Plan Mode: review before a byte moves
  - [click] context bar: ~18% consumed
- The difference between the two columns is not a smarter model — it is the same model, pointed on purpose

<!-- @note: plan-mode-review-first -->
> Do:
> - Demo: switch into plan mode live (Shift+Tab until it says plan)
> - Describe the next feature
> - Read the plan together, out loud
> - Save it to `docs/plans/realtime-notifications.md`

Say:
- Real-time notifications — currently loads on render via `getNotifications` and `getUnreadCount` in `lib/data/notifications.ts`
- "Don't write any code yet. Propose an approach and the files it touches."
- Plan mode is documented under permission modes

<!-- @note: skill-doctor-what-it-costs -->
> Do:
> - Demo: run `/skill-doctor` live
> - Show the two folders side by side — the overlap is obvious on sight

Say:
- Unused skills cost you every session — but only their short description loads, not the ~100 KB body. The body loads when the skill is used
- Not in a bloated CLAUDE.md (there is none) — it's in `.agents/skills/react-best-practices` and `.agents/skills/vercel-react-best-practices`
- Two real, near-duplicate rule sets, each about 100 KB

<!-- @note: context-and-claude-md -->
> Do:
> - Task slide: say the reset branch and where the task file is
> - Everything here is pulled from `tasks/06-context-and-claude-md.md`
> - Do not paraphrase the check list differently
