# Task 06 — Context and CLAUDE.md

> Part: Control the context · Reset branch: `06-start`
> Slides: https://mastering-claude-code.vercel.app/task-06

## Theory

- [/context is an instrument](https://mastering-claude-code.vercel.app/theory-context-instrument)
- [Plan mode: review first](https://mastering-claude-code.vercel.app/theory-plan-review)
- [/skill-doctor: what it costs](https://mastering-claude-code.vercel.app/theory-skill-doctor)

> **Reminder:** Context is a budget; keep standing instructions small and review plans before implementation.

## You will end up with

A `CLAUDE.md` for the reference CLASH that states the six rules that really prevent bugs
here, and a reviewed plan for real-time notifications in `docs/plans/realtime-notifications.md`.
No feature code yet.

## Why

From here on you work on the reference CLASH. Its `CLAUDE.md` is 11 bytes: `@AGENTS.md`.
`AGENTS.md` is a generic Next.js warning. Nothing in either file is about this app.
There is nothing to trim. The real job is to write a good context file from nothing,
grounded in rules you can point to in the code.

Context is a budget. Everything you put in it costs on every turn. Everything you leave
out, Claude has to guess or search for.

## Do this

1. Switch to the reference app and start fresh.
   ```bash
   git checkout 06-start
   npm install && npm run db:migrate && npm run db:seed
   claude
   ```
2. Look at the budget before you touch anything.
   ```
   /context
   ```
   Read every line. Note the total.
3. Open `CLAUDE.md` and `AGENTS.md`. Confirm there is nothing project-specific in either.
4. Point Claude at the files that hold the real rules. Use `@`, not "look around".
   ```
   Read @app/actions/clashes.ts, @lib/data/clashes.ts, @lib/validation.ts,
   @app/(app)/layout.tsx and @prisma/schema.prisma. Draft a CLAUDE.md for this
   repository covering: where reads happen, where writes happen and how they are
   authorized, where Zod schemas live, how Next 16 handles params and searchParams,
   where the generated Prisma client lives, and how status fields are modeled.
   Keep it dense. Rules, not a tour of the codebase.
   ```
5. Check the draft against these six rules. All six must be in the file, in your words.
   - Reads go through `lib/data/*`. Pages never call Prisma directly.
   - Writes go through `app/actions/*`. **Every action checks authorization itself.**
     The `requireUser()` in `app/(app)/layout.tsx` guards the page, not the action.
     A Server Action is a public POST endpoint with a generated id.
   - `lib/validation.ts` is the only place for Zod schemas.
   - Next 16: `params` and `searchParams` are Promises. Always `await` them.
   - The Prisma client is generated to `lib/generated/prisma`, not `@prisma/client`.
   - Status fields (`Participation.status`, `Notification.type`) are strings, not enums.
     The allowed values live in `lib/constants.ts`.
6. Run `/context` again. The file should be small and dense. Not a transcript of everything Claude read.
7. Switch to plan mode (press Shift+Tab until you see *plan*) and describe the next feature.
   ```
   I want to add real-time notifications to CLASH. Right now notifications only load
   on render via getNotifications and getUnreadCount in lib/data/notifications.ts.
   Don't write any code yet. Propose an approach and the files it touches.
   ```
8. Read the plan together. Ask one question about it. Then save it.
   ```
   Save this plan as docs/plans/realtime-notifications.md. Do not implement it.
   ```
9. See what loaded skills cost you.
   ```
   /skill-doctor
   ```
   Look at `.agents/skills/` in the CLASH repository. These are the app's vendored skills,
   not the workshop repository's own `.agents/skills/agent-browser` tooling skill.
   CLASH ships nine vendored skills. Two of them, `react-best-practices` and
   `vercel-react-best-practices`, are near-duplicates of about 100 KB each. Both are
   scanned every session.
10. See what a personal rule adds, not overrides.
    ```bash
    mkdir -p ~/.claude/rules
    ```
    Write one line to `~/.claude/rules/tone.md`: `Explain every fix in one sentence before making it.`
    Run `/context` and look under **Memory files**. Your project `CLAUDE.md` and this new
    rule both loaded. Neither replaced the other — a CLAUDE.md file only adds to what Claude
    reads, it never overrides another one. If two files ever disagree, Claude just picks one.

## Now you

- Add a **Commands** section to `CLAUDE.md` with the four scripts you run most.
- Add a **Quality gates** section: the three commands that must pass before work is done.
- Add one rule you found yourself while reading the code. Point to the file it comes from.

## Check

- [ ] `CLAUDE.md` is no longer just `@AGENTS.md`. It states the six rules in your words.
- [ ] The authorization rule says every Server Action checks ownership itself.
- [ ] `docs/plans/realtime-notifications.md` exists and was reviewed in plan mode before any code.
- [ ] `/skill-doctor` ran and you can name one skill worth removing.
- [ ] `/context` after the task is not much higher than before it.
- [ ] `/context` lists both `CLAUDE.md` and `~/.claude/rules/tone.md` together under Memory files.

## Stuck?

`git checkout 06-start` — the reference CLASH, seeded, with the 11-byte `CLAUDE.md`.

## Go further

Compare your file with `workshop-artifacts/06-context-and-claude-md/CLAUDE.md` in the workshop repository.
Yours does not need to match. It needs the same six rules.

## Links

- The context window — https://code.claude.com/docs/en/context-window
- Memory and CLAUDE.md — https://code.claude.com/docs/en/memory
- Plan mode and permission modes — https://code.claude.com/docs/en/permission-modes
- Skills — https://code.claude.com/docs/en/skills
