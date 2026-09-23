# Answer key — task 18 (automate)

Four small files. Each one hands a piece of the work to Claude Code without you at the keyboard.

| File | Goes to | What it does |
|---|---|---|
| `host-notes.md` | `.claude/output-styles/host-notes.md` in your CLASH clone | A custom output style. Claude works as usual and ends every answer with one "Host note:" line. In the task, Claude Code writes this file from the prompt in step 4; this copy is the reference. |
| `loop.md` | `.claude/loop.md` in your CLASH clone | Replaces the built-in prompt of a bare `/loop`: check the background build, then the typecheck, report in one line, say "quiet" when nothing changed. |
| `schedule-prompt.md` | Not copied. The trainer types the prompt. | The spec-drift guard: a routine that compares `docs/SPEC.md` with the schema and the Server Actions and opens a pull request on drift. |
| this README | — | How to smoke-test each file. |

All tests run on `18-start` of your CLASH clone (identical to `14-start`). That branch carries the task 13
hooks in `.claude/settings.json`: a `Stop` hook runs `npm run build` before a turn may end. Expect every
turn, and every loop round, to take as long as one build.

## 1. The output style

1. The task does not have participants type this file. One prompt (step 4) makes Claude Code write
   `.claude/output-styles/host-notes.md` in your CLASH clone. Compare the result with `host-notes.md` here:
   the two frontmatter fields (`description`, `keep-coding-instructions: true`), no `name` field, and the
   rule for the closing line. Copying this file straight in is the fallback when the prompt goes sideways.
2. Restart Claude Code in your CLASH clone. Style files are read at launch, not while a session runs.
3. Run `/output-style`. The list shows the built-ins (Default, Proactive, Concise, Explanatory, Learning)
   and one custom entry: `host-notes`. Pick it. `/output-style host-notes` does the same in one step.
4. Ask one question.
   ```
   What does joinClash in app/actions/clashes.ts do?
   ```
5. Check the last line of the answer. It starts with `Host note:` and reads like a sentence for a person
   who creates clashes, with no code and no file names. Everything above that line looks like a normal answer:
   `keep-coding-instructions: true` keeps the default coding behaviour.
6. `/output-style default` switches back. The chosen style lands in `.claude/settings.local.json` of your
   CLASH clone as `outputStyle`.

## 2. The loop prompt

1. Copy `loop.md` to `.claude/loop.md` in your CLASH clone.
2. In the same session, start a build in the background.
   ```
   Run npm run build in the background and tell me when it is done.
   ```
3. Run `/loop` with nothing after it. Claude reads `.claude/loop.md`, reports once, picks its own pause
   and prints why it chose that pause. No interval is typed anywhere.
4. Wait for the second round. While the build still runs, the line says so. Once nothing changes, the
   answer is the single word `quiet`.
5. Press `Esc` to stop the loop. Then ask:
   ```
   what scheduled tasks do I have?
   ```
   The stopped loop is gone from the list.

## 3. The background session

1. Leave any Claude Code session. In a terminal at the root of your CLASH clone, run:
   ```
   claude --bg --name audit "Audit every exported Server Action in app/actions/*.ts. For each action that updates or deletes an existing row, check whether the code verifies that the current user owns the row before it mutates. requireUser() alone is not enough. Write the report to docs/audit.md: one line per action with file, function name, PASS or FAIL and the deciding line. Do not change any app code."
   ```
   The command returns at once. The session runs without a terminal.
2. Run `claude agents`. One row is named `audit`. `Space` peeks at it, `Enter` attaches, `←` detaches.
3. Find the report. A background session moves into a worktree under `.claude/worktrees/` before its
   first edit, so `docs/audit.md` is in `.claude/worktrees/<name>/docs/audit.md`, not in the main checkout
   of your CLASH clone. On `18-start` every action is guarded, so every line says PASS.
4. `claude logs <id>` prints what the session did. `claude stop <id>` ends it. The id is in the `claude agents` list.
5. Watch the `Stop` hook. The worktree starts without `node_modules`, so `npm run build` there fails until
   the session runs `npm install`. If the session seems stuck at the end of its turn, attach and look.

## 4. The routine (trainer only)

Open `schedule-prompt.md`. It holds the verbatim `/schedule` prompt, the follow-up commands and the
checks to do before the demo. The prompt needs `docs/SPEC.md` in the fork of CLASH the routine clones,
and that file is not on `main` of `pawsaw/clash`.
