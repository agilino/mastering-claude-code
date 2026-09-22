# Task 10 — Hooks

> Part: Orchestrate and let go · Reset branch: `10-start`

## You will end up with

A `.claude/settings.json` with four Claude Code hooks: a typecheck after edits under
`app/actions/`, a deny set, an output replacement for `npm run build`, and a Stop gate that
keeps the turn open while the build is red.

## Why

A skill is advice. A hook is law. A skill is what you tell a new colleague. A hook is what
CI rejects. If you keep repeating a rule in `CLAUDE.md` and Claude keeps drifting past it,
that rule wanted to be a hook.

One naming trap: CLASH has a `hooks/` folder. Those are React hooks (`hooks/use-mobile.ts`).
Claude Code hooks live in `.claude/settings.json`. Different things.

A hook needs three things: an **event** (`PreToolUse`, `PostToolUse`, `Stop`, and about thirty more),
a **matcher** (which tool), and an **exit code**. Only exit code 2 matters. Before a tool or at Stop it blocks. After a tool it cannot block,
because the tool already ran; the stderr goes to the model instead. Other non-zero codes
are logged, not enforced. What Claude sees on a block is stderr.

## Do this

**Build one slowly, and get it wrong once on purpose**

1. Write the hook the way it looks like it should work. Put this in `.claude/settings.json`.
   ```json
   { "hooks": { "PostToolUse": [
     { "matcher": "app/actions/*.ts", "hooks": [ { "type": "command",
       "command": "npx tsc --noEmit" } ] }
   ] } }
   ```
2. Ask Claude to change something under `app/actions/`. Nothing fires. Why?
   `matcher` matches the **tool name** (`Edit`, `Write`, `Bash`), not a path. A path there never matches.
3. Fix it. Match the tool. Scope the path with the sibling `if` field.
   `if` holds one permission rule. An `Edit(...)` rule covers every tool that edits files, `Write` too.
   ```json
   { "hooks": { "PostToolUse": [
     { "matcher": "Edit|Write", "hooks": [ { "type": "command",
       "if": "Edit(app/actions/**)",
       "command": "${CLAUDE_PROJECT_DIR}/.claude/hooks/typecheck-actions.sh",
       "timeout": 60 } ] }
   ] } }
   ```
4. Write `.claude/hooks/typecheck-actions.sh`. Make it executable.
   ```bash
   #!/usr/bin/env bash
   set -euo pipefail
   output="$(npx tsc --noEmit 2>&1)" && exit 0
   echo "npx tsc --noEmit failed:" >&2
   echo "$output" >&2
   exit 2
   ```
5. Make Claude break something, so the hook fires.
   ```
   Introduce a type error into app/actions/venues.ts on purpose. For example,
   pass a number where updateVenue expects a string. Make the edit yourself so
   the hook fires. Then fix it.
   ```
   Watch: the edit lands, `tsc` fails, Claude gets the error on stderr, Claude fixes its own code.

**Three more, fast**

6. Deny writes under `prisma/migrations/`, `rm`, and reads of `.env*`.
   ```
   Add PreToolUse hooks that deny: writing under prisma/migrations/, running rm,
   and reading any .env* file. Use exit code 2 with a clear reason on stderr for
   each. Match the tool name in matcher and scope the path with the if field.
   ```
7. Collapse the build log.
   ```
   Add a PostToolUse hook that replaces the output of npm run build with just
   the pass/fail line and error count, using hookSpecificOutput.updatedToolOutput,
   so the full build log doesn't land in context on every successful build.
   ```
8. Keep the turn open while the build is red.
   ```
   Add a Stop hook that runs npm run build and blocks (exit 2) if it fails,
   putting the last 40 lines of the failure on stderr.
   ```
9. Try each one: edit a migration file, run `rm`, read `.env`, run a build, break the build and try to end the turn.
10. See what is actually configured, grouped by event.
    ```
    /hooks
    ```
11. Hooks in a list all run — they do not override each other. A plain key does. See it for
    yourself: set the same key two ways.
    Add this key to `.claude/settings.json`:
    ```json
    { "model": "claude-sonnet-5" }
    ```
    Add this key to `.claude/settings.local.json`:
    ```json
    { "model": "claude-opus-4-8" }
    ```
    Start a new `claude` session. The startup header names the model and which file set it.
    Project local sits above shared project, so yours starts on Opus. Remove both keys after.

## Now you

- Add a `PreToolUse` hook that blocks `git push` to `main`.
- Add a `PostToolUse` hook that runs `npm run lint` after edits under `components/`. Decide: block, or only warn?

## Check

- [ ] You saw the path-in-`matcher` version do nothing, and you can say why.
- [ ] The working hook uses `"matcher": "Edit|Write"` and an `if` for the path.
- [ ] The script exits 2 on a type error and 0 otherwise.
- [ ] You watched Claude receive a blocked edit and fix it without your help.
- [ ] Migrations, `rm` and `.env` are denied with a reason.
- [ ] A green build shows one line. A red build keeps the turn open.
- [ ] `/hooks` lists every hook you added, grouped by event.
- [ ] You can say why `hard_deny` does not belong in this file. It is an auto-mode setting
      (`settings.autoMode.hard_deny`), not a hook decision. Hook decisions are `allow`, `deny`, `ask`.
- [ ] A new session started on the model set in `.claude/settings.local.json`, not the one in `.claude/settings.json`.

## Stuck?

`git checkout 10-start` — the reference CLASH with the fix merged, the skill and `CLAUDE.md`. No hooks yet.

## Go further

Compare with `workshop-artifacts/10-hooks/` in the workshop repository. Then look up auto mode
and `hard_deny` in the permission modes docs.

## Links

- Hooks guide — https://code.claude.com/docs/en/hooks-guide
- Hooks reference — https://code.claude.com/docs/en/hooks
- Permission modes — https://code.claude.com/docs/en/permission-modes
