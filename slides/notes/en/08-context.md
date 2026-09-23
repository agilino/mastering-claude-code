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
- The one constraint: the context window. Every row on this table is a different way of managing what enters it
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

<!-- @note: task-06-context-and-claude-md -->
> Do:
> - Branch: 06-start is the reference CLASH, seeded, CLAUDE.md still just `@AGENTS.md`

Say:
- Five things to learn, four things to end up with — starting from a CLAUDE.md that is 11 bytes

<!-- @note: context-is-an-instrument -->
> Do:
> - Demo: run `/context` live on a fresh session in the reference CLASH
> - Read the lines aloud — don't summarize, let people hear the real numbers
> - Docs link: open it, play the interactive timeline at the top, scroll to "What the timeline shows", then back to the slides

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
> - If not everyone already knows Next.js: "RSC page" just means a page that fetches its own data on the server, no separate API call
> - Task 08's audit finds this exact shape missing from deleteClash and deleteVenue — show it correct now so it's recognizable on sight later, not a blind hunt

Say:
- Same five-box shape behind every feature in CLASH — learn it once, read it everywhere
- [click] Reads: browser → page → helper in lib/data → Prisma → SQLite
- [click] Writes: client → a Server Action — looks like a normal function call, but it's really a public server endpoint
- [click] requireUser() plus an ownership check, then back through the same Prisma Client — highlighted because Task 08 finds this exact node missing in two places later
- [click] The dashed line isn't a function call like the others — revalidatePath just marks the page stale, the RSC page on the read side refetches on its own

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

<!-- @note: plan-mode-review-first -->
> Do:
> - Demo: switch into plan mode live (Shift+Tab until it says plan)
> - Describe the next feature
> - Read the plan together, out loud
> - Save it to `docs/plans/realtime-notifications.md`
> - Docs link: open it, scroll to "Analyze before you edit with plan mode", then back to the slides

Say:
- Real-time notifications — currently loads on render via `getNotifications` and `getUnreadCount` in `lib/data/notifications.ts`
- "Don't write any code yet. Propose an approach and the files it touches."
- Plan mode is documented under permission modes

<!-- @note: a-reviewed-plan-is-not-a-guarantee -->
> Do:
> - Tell it as a real story, light tone — the point underneath is serious
> - Land on: read every line, don't just skim for the feature you expected

Say:
- A colleague once asked Claude to add a BCC to his own mail-sending self-service tool
- The plan also proposed rewriting the GDPR and privacy pages — with a warning that he was reading everyone's private email
- Nonsense, obviously — but it was sitting right there in the plan
- Luckily he read the whole thing and caught it before it shipped

<!-- @note: skill-doctor-what-it-costs -->
> Do:
> - Step 9 links .agents/skills/* into .claude/skills/ first — skip it and /skill-doctor shows nothing
> - Demo: run `/skill-doctor` live
> - Show the two folders side by side — the overlap is obvious on sight

Say:
- Claude Code only reads .claude/skills/ — vendored skills in .agents/skills/ do nothing until linked
- Unused skills cost you every session — but only their short description loads, not the ~100 KB body. The body loads when the skill is used
- Not in a bloated CLAUDE.md (there is none) — it's in `.agents/skills/react-best-practices` and `.agents/skills/vercel-react-best-practices`
- Two real, near-duplicate rule sets, each about 100 KB

<!-- @note: claude-md-files-add-up-they-don-t-compete -->
> Do:
> - Docs link: open it, scroll to "How CLAUDE.md files load", then back to the slides

Say:
- [click] ~/.claude/CLAUDE.md — your personal instructions, every project
- [click] CLAUDE.md at the repository root — read first, closest to launch
- [click] CLAUDE.local.md — gitignored, appended right after CLAUDE.md at the same level
- [click] A subdirectory's CLAUDE.md loads when Claude reads a file there — read last, closest to the work
- [click] .claude/rules/*.md loads the same way, on demand
- [click] All of it lands in one context — nothing is dropped, nothing is chosen
- [click] Two files disagree? Claude picks one. That is a bug you created, not a feature

<!-- @note: rules-can-load-only-for-matching-files -->
Say:
- A rule with no paths: field loads for every session, like an extra CLAUDE.md
- [click] ~/.claude/rules/ — yours, every project, for things that are not this repo's business
- Symlink a shared rules folder into multiple repos to keep one copy in sync

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

<!-- @note: context-and-claude-md -->
> Do:
> - Task slide: say the reset branch and where the task file is
> - Everything here is pulled from `tasks/06-context-and-claude-md.md`
> - Do not paraphrase the check list differently
