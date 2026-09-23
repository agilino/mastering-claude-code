# Task 08 — Subagent audit

> Part: Control the context · Reset branch: `08-start`
> Slides: https://mastering-claude-code.vercel.app/task-08

## Theory

- [The attack surface](https://mastering-claude-code.vercel.app/theory-attack-surface)
- [Agent, subagent, fork: which is which](https://mastering-claude-code.vercel.app/theory-agent-subagent-fork)
- [Two ways to isolate](https://mastering-claude-code.vercel.app/theory-subagents)

> **Reminder:** A subagent gets its own context; give it a narrow, falsifiable read-only brief.

## You will end up with

A `security-auditor` subagent that checked every Server Action in `app/actions/` and
found exactly two problems. Your own context window barely moved. Then the same audit by
OWASP's `code-security-skills` plugin, so you can compare the two reports.

## Why

A subagent is a second agent loop with its own context window. It does the noisy work
(reading many files) and sends back a short report. Your main window stays clean.

Three words, used this way for the rest of the course:

- **Agent**: one running loop. Your own session is one. It is the `main` row in the panel
  below your prompt input.
- **Subagent**: a loop that `main` starts, in its own context window.
- **Fork**: a subagent that starts as a copy of your conversation.

A subagent built from a definition file (`.claude/agents/`, or one a plugin ships) starts
fresh, with only the tools its `tools:` line allows. A fork gets every tool `main` has, so a
`tools:` line does not apply to it. A skill is not an agent: it is text loaded into whichever
conversation runs it. The one exception is a skill that sets `context: fork`: that one runs as
a subagent. The `discover` skill in task 09 does not set it, so it stays in `main`.

While a subagent or a fork runs, a row appears in the panel below your prompt input, indented
under `main`. The row goes away when it finishes, so look while it runs. `/tasks` lists the
same rows. Here is what starts what in this task:

| Step | What runs | Fork or fresh | In the panel |
|---|---|---|---|
| 4 (trainer only) | `main` reads every file | no subagent | only `main` |
| 6 | `security-auditor` | fresh, tools: Read, Grep, Glob | one row under `main` |
| 9 | `/subtask` | fork, every tool `main` has | one row under `main` |
| 16 | `code-security-reviewer` from the plugin | fresh, the plugin's own definition | one row under `main` |

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
   subagent's. Nothing is delegated, so nothing stays clean, and the panel below the prompt
   shows only `main`.
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
   While it runs, look below your prompt input: a row appears, indented under `main`. That row
   is the subagent. It is a fresh one, built from `security-auditor.md`.
7. Read `/context` again. It moved a little. The file reads happened in the subagent's window, not yours.
8. Check the report against the answer key (shared with task 12): `workshop-artifacts/12-team-and-workflow-audit/AUTH-FIX.md`
   in the workshop repository. Do not fix the bug yet. Task 12 does that.
9. Hand the same audit to a fork with `/subtask` instead of naming an agent.
   ```
   /subtask Using only Read, Grep and Glob, audit every exported Server Action in
   app/actions/ for missing ownership checks on mutations of existing rows. Do not edit any
   file. Report file, function, PASS or FAIL.
   ```
10. Look below your prompt input while it runs: a row appears under `main`. This one is a fork.
    It inherited your conversation, so it can see the report from step 6, and every tool `main`
    has, `Edit` and `Write` included. The read-only `tools:` line of `security-auditor` does not
    apply to it. The brief names the tools, but that is only an instruction: the fork can still
    call `Edit` and `Write`, and nothing stops it. For a hard limit, use a fresh subagent with a
    `tools:` line. Compare the `/context` numbers against step 6's run.
11. Someone has already built a wider auditor, and you met plugins in task 07. Add OWASP's
    marketplace. Read what a plugin ships before you install it: it runs on your machine and
    can carry hooks.
    ```
    /plugin marketplace add OWASP/secure-agent-playbook
    ```
12. Install the `code-security-skills` plugin. It bundles subagents and skills.
    ```
    /plugin install code-security-skills@agent-security-playbook
    ```
13. Run `/plugin` and check that `code-security-skills` is listed as installed. If the install
    summary asks for it, run `/reload-plugins`.
14. Copy your auditor's report from step 6 into a note outside the chat. The next step removes it.
15. Start with a clean context, so the reviewer cannot lean on that report.
    ```
    /clear
    ```
16. Run the plugin's reviewer.
    ```
    Use the code-security-skills:code-security-reviewer subagent to review
    app/actions/ for security issues and show me its report.
    ```
    A row appears under `main` again. Same kind as step 6: a fresh subagent, this time from a
    definition the plugin ships.
17. Compare the two reports: the one you copied and the one on screen. Are `deleteClash` and
    `deleteVenue` in both? What did the OWASP reviewer report that yours cannot? What did yours
    give that theirs did not: a PASS or FAIL per action, with the deciding line? Write two
    sentences. Neither is "the better one": one is narrow and checkable, the other is broad.

## Now you

- Hand a different read-only job to a fork with `/subtask`: find every place `requireUser()` is
  called under `app/`. Goal: a report only, no file edited. Write the brief so that it asks for
  that, then check afterwards that no file changed: the brief is an instruction, not a lock.
- Write a second subagent, `perf-auditor`, that only looks for Prisma queries without a `select`.

## Check

- [ ] The subagent flags `deleteClash` and `deleteVenue` as FAIL, and nothing else.
- [ ] It does not flag `updateClash`, `updateVenue`, `joinClash`, `acceptRequest`, `markNotificationRead`, `updateProfile` or `updateAvatar`.
- [ ] Your main `/context` moved only a little.
- [ ] You can say what a fork shares with its parent and what a fresh subagent does not.
- [ ] You can point at the panel row of a fresh subagent and at the row of a fork.
- [ ] You can say which of the two a `tools:` line restricts.
- [ ] The OWASP reviewer ran after a `/clear`, and you compared its report with your own auditor's.

## Stuck?

`git checkout 08-start` — the reference CLASH with the seeded bug and the task 06 and 07 files.

## Go further

`npm run lint` on this branch shows an unused `user` variable in `deleteVenue`. The check
that used it is gone. A sharp auditor could find the bug from that warning alone.
Ask your subagent to explain how.

## Links

- Subagents — https://code.claude.com/docs/en/sub-agents
- Tools reference — https://code.claude.com/docs/en/tools-reference
- Discover and install plugins — https://code.claude.com/docs/en/discover-plugins
- OWASP secure-agent-playbook (the `code-security-skills` plugin) — https://github.com/OWASP/secure-agent-playbook
