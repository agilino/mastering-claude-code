# Task 08 — Subagent audit

> Part: Control the context · Reset branch: `08-start`
> Slides: https://mastering-claude-code.vercel.app/task-08

## Theory

- [The attack surface](https://mastering-claude-code.vercel.app/theory-attack-surface)
- [The auditor subagent](https://mastering-claude-code.vercel.app/theory-auditor-subagent)
- [Two ways to isolate](https://mastering-claude-code.vercel.app/theory-subagents)

> **Reminder:** A subagent gets its own context; give it a narrow, falsifiable read-only brief.

## You will end up with

A `security-auditor` subagent that checked every Server Action in `app/actions/` and
found exactly two problems. Your own context window barely moved.

## Why

A subagent is a second agent loop with its own context window. It does the noisy work
(reading many files) and sends back a short report. Your main window stays clean.

This branch has a real bug on purpose. The ownership check was removed from `deleteClash`
in `app/actions/clashes.ts` and from `deleteVenue` in `app/actions/venues.ts`. Every other
action is guarded. The bug does not exist in the public CLASH code. It is here for this task.

Why it matters: `requireUser()` in `app/(app)/layout.tsx` protects the page. A Server
Action is a public POST endpoint with a generated id. Anyone with a session cookie can
call it directly, with any arguments, without ever opening the page. So every action must
check ownership itself. Zod checks the shape of the input, not who may send it.

## Do this

1. Start on the seeded branch.
   ```bash
   git checkout 08-start
   claude
   ```
2. Look at the two sides yourself. Open `app/(app)/layout.tsx` and find `requireUser()`.
   Then open `app/actions/clashes.ts`. Ask yourself: does the layout guard run when the action is called directly?
3. Note your `/context` number.
4. Watch. Your trainer sends this once, live, on their own machine. Do not send it yourself —
   the subagent starts at the next step.
   ```
   Read every file in app/actions/ yourself, in this conversation, and report
   which exported actions are missing an ownership check before mutating an
   existing row.
   ```
   Watch what happens: every file's contents land in the trainer's own context window, not a
   subagent's. Nothing is delegated, so nothing stays clean.
5. Create the subagent. Put this in `.claude/agents/security-auditor.md`.
   ```md
   ---
   name: security-auditor
   description: Audit Server Actions in app/actions/ for missing ownership checks on mutations of existing rows. Use when reviewing authorization in CLASH.
   tools: Read, Grep, Glob
   ---

   Audit every exported Server Action in app/actions/*.ts. For each one that
   mutates an EXISTING row (update or delete, not create), check: does the code
   verify the current user owns the row (for example `existing.creatorId !== user.id`
   or a where clause scoped to the user) before mutating? requireUser() alone
   is not enough.

   Report one line per action: file, function name, PASS or FAIL, and the exact
   line that decides it. Do not report actions that only create rows or that
   scope their own where clause to the current user. Those are safe by construction.
   ```
   Note the `tools:` line. This agent reads and reports. It cannot edit.
6. Run it.
   ```
   Use the security-auditor subagent on app/actions/ and show me its report.
   ```
7. Read `/context` again. It moved a little. The file reads happened in the subagent's window, not yours.
8. Check the report against the answer key (shared with task 12): `workshop-artifacts/12-team-and-workflow-audit/AUTH-FIX.md`
   in the workshop repository. Do not fix the bug yet. Task 12 does that.

## Now you

- Run the same audit again, but hand it off with `/subtask` instead of naming the
  `security-auditor` subagent. Compare the `/context` numbers and the time taken against
  step 6's run.
- Write a second subagent, `perf-auditor`, that only looks for Prisma queries without a `select`.

## Check

- [ ] The subagent flags `deleteClash` and `deleteVenue` as FAIL, and nothing else.
- [ ] It does not flag `updateClash`, `updateVenue`, `joinClash`, `acceptRequest`, `markNotificationRead`, `updateProfile` or `updateAvatar`.
- [ ] Your main `/context` moved only a little.
- [ ] You can say what a fork shares with its parent and what a fresh subagent does not.

## Stuck?

`git checkout 08-start` — the reference CLASH with the seeded bug and the task 06 and 07 files.

## Go further

`npm run lint` on this branch shows an unused `user` variable in `deleteVenue`. The check
that used it is gone. A sharp auditor could find the bug from that warning alone.
Ask your subagent to explain how.

## Links

- Subagents — https://code.claude.com/docs/en/sub-agents
- Tools reference — https://code.claude.com/docs/en/tools-reference
