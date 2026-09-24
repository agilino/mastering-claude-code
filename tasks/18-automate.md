# Task 18 — Automate

> Part: Orchestrate and let go · Reset branch: `18-start`
> Slides: https://mastering-claude-code.vercel.app/task-18

## Theory

- [/goal: evidence decides when to stop](https://mastering-claude-code.vercel.app/theory-goal)
- [/loop: the prompt comes back](https://mastering-claude-code.vercel.app/theory-loop)
- [Background: the session keeps working](https://mastering-claude-code.vercel.app/theory-background-sessions)

> **Reminder:** A goal defines when Claude may stop; loops, background sessions and routines decide how work continues without you at the keyboard.

## You will end up with

A custom output style, `host-notes`, in `.claude/output-styles/` of your CLASH clone. A
self-paced loop that watched a build and stopped. A background session named `audit` that
wrote `docs/audit.md` in its own worktree while you did something else. And a routine,
created by your trainer, that checks CLASH against its spec in the cloud on a schedule.

## Why

So far you were at the keyboard for every turn. This task hands four pieces of that work to
the harness:

- An **output style** sets the voice once, for every answer in a session. It is an
  instruction, not a hook: nothing enforces it.
- A **loop** brings one prompt back, again and again, in the same session.
- A **background session** keeps working after you leave the terminal.
- A **routine** runs in the cloud. Your machine can be off.

A **goal** adds a measurable stop condition to a session. Give it a proof and a turn ceiling; it does not change permissions.

Each mechanism changes a different part of unattended work. You still define the boundary and read the result.

## Do this

Everything here happens in your CLASH clone. One thing about `18-start`: the Stop hook from
task 13 runs `npm run build` before a turn may end. Every answer, and every loop round, waits
for one build. That is the gate, not the loop.

**Output styles**

1. Start on the reset branch of your CLASH clone.
   ```bash
   git checkout 18-start
   claude
   ```
   You see the Claude Code prompt, on `18-start`, in your CLASH clone.
2. Switch to the built-in Concise style, then ask one question about your CLASH clone.
   ```
   /output-style concise
   ```
   ```
   What does joinClash in app/actions/clashes.ts do?
   ```
   You see the answer in the first sentence: no lead-in, no closing recap.
3. Switch back and ask the same question again.
   ```
   /output-style default
   ```
   ```
   What does joinClash in app/actions/clashes.ts do?
   ```
   You see the lead-in and the closing recap return. Same facts, same work underneath: only the voice changed.
4. Let Claude Code write your own style. Send this as one message.
   ```
   Write .claude/output-styles/host-notes.md in this CLASH clone. Frontmatter: a description field saying the style ends every answer with one plain line for a CLASH host, and keep-coding-instructions: true. No name field — the file name is the style name. Body: work as usual, then end every answer with exactly one extra line. That line starts with "Host note:" and says, in plain words, what changed for a CLASH host, a person who creates clashes. No code, no file names and no jargon in that line. When nothing changed for a host, the line is: Host note: nothing changed for hosts. Write the file and change nothing else.
   ```
   You see one new file, `.claude/output-styles/host-notes.md`, with those two frontmatter fields and the rule in the body. `keep-coding-instructions: true` keeps the normal coding behaviour under your style.
5. Restart Claude Code, then list the styles. Style files are read at launch, not while a session runs.
   ```
   /exit
   ```
   ```bash
   claude
   ```
   ```
   /output-style
   ```
   You see `host-notes` next to the built-ins: Default, Proactive, Concise, Explanatory, Learning.
6. Pick your style and ask the question once more.
   ```
   /output-style host-notes
   ```
   ```
   What does joinClash in app/actions/clashes.ts do?
   ```
   You see one extra last line, starting with `Host note:`, written for a person who creates clashes.
7. Switch back before the next block.
   ```
   /output-style default
   ```
   You see the choice stored as `outputStyle` in `.claude/settings.local.json` in your CLASH clone, not only in this session.

**A loop**

8. Start a build in the background. Same prompt as task 05.
   ```
   Run npm run build in the background and tell me when it is done.
   ```
   You see Claude return at once, with the build still running.
9. Start a loop. No interval anywhere: Claude picks the pause itself.
   ```
   /loop tell me whether the background build has finished and whether it passed; if it failed, name the first error
   ```
   You see one report, then a line that names the pause Claude chose and why. Sometimes Claude watches the build with a monitor instead of a loop; then there is no pause to name.
10. Let the loop come back at least once, then press `Esc`.
    You see the pending round cleared. When the build finished first, the loop may already have ended on its own.
11. Check the list.
    ```
    what scheduled tasks do I have?
    ```
    You see no loop in it. An empty list is fine too.

**A background session**

12. Open a second terminal at the root of your CLASH clone, in the main checkout, not in a
    worktree left over from task 15 or 17. Start a session that goes straight to the background.
    ```bash
    claude --bg --name audit "Audit every exported Server Action in app/actions/*.ts. For each action that updates or deletes an existing row, check whether the code verifies that the current user owns the row before it mutates. requireUser() alone is not enough. Write the report to docs/audit.md: one line per action with file, function name, PASS or FAIL and the deciding line. Do not change any app code."
    ```
    You see the command return at once, printing a short id, the name `audit` and the commands to manage it.
13. Open agent view, then select the `audit` row with the arrow keys and press `Space`.
    ```bash
    claude agents
    ```
    You see one screen for all your background sessions, and a peek panel with the `audit` session's latest output, or the question it is waiting on.
14. Press `Enter`, then `←` on an empty prompt.
    You see the session take over the terminal, then the table again. The session keeps running: detaching never stops it.
15. Find the report. Before its first edit, the session moved into its own git worktree under `.claude/worktrees/`. Nothing in the main checkout of your CLASH clone changed.
    ```bash
    git worktree list
    ```
    You see the new worktree listed, with the report inside it at `.claude/worktrees/<name>/docs/audit.md`. On `18-start` every action is guarded, so every line says PASS.
    If your CLASH clone has a remote, Claude may also commit the report in that worktree and push a branch. It never pushes to `main`.
    The worktree starts without `node_modules`, so the Stop gate's build may fail there until the session runs `npm install`. If the row looks stuck, attach and read what it is doing.
16. Stop the session and read what it did. The id is in the `claude agents` list.
    ```bash
    claude stop <id>
    claude logs <id>
    ```
    You see the row leave the running list, and the log print what the session did. `claude logs <id>` works before the stop too.
17. Back in your first session, where the loop ran, move the conversation itself to the background.
    ```
    /bg
    ```
    You see your terminal free, and `claude agents` lists the conversation as a second row, still running. A session with no messages yet cannot do this; yours has plenty.

**A routine (watch)**

18. Watch. Your trainer types this once, in Claude Code inside their own fork of CLASH, as one message. Do not send it yourself.
    ```
    /schedule weekly spec-drift guard for CLASH. Compare the rules in docs/SPEC.md (the "Rules" and "Data" sections) with prisma/schema.prisma and with the exported Server Actions in app/actions/. When a rule and the code disagree, open a pull request that names the rule, the file and a proposed fix. One pull request per run. When nothing drifted, do nothing: no pull request, no issue, no commit.
    ```
    You see Claude ask for what the web form would ask, then save the routine to the trainer's account. Nothing runs on the trainer's machine: the cloud clones their fork of CLASH fresh for every run.
19. The trainer lists the routine, then opens the same list in the browser.
    ```
    /schedule list
    ```
    ```
    https://claude.ai/code/routines
    ```
    You see the routine in both, and in the browser also **Run now** and the runs so far. `/schedule update` changes it, `/schedule run` fires it now instead of waiting. A green run means the session ended without an infrastructure error, not that the task succeeded. The transcript tells.

    Optional, on your own fork of CLASH, if you have a claude.ai subscription: `/schedule` needs the claude.ai login in the CLI, an API key hides it. The routine needs GitHub access to clone your fork. `docs/SPEC.md` must be committed on the fork's default branch before the routine runs, because the routine clones the default branch. A routine runs with no permission prompts and its pull requests carry your GitHub user.

## Now you

- Set a bounded `/goal` for one real check in your CLASH clone. Include the evidence that proves it and a turn ceiling; then inspect `/goal` and clear it.
- Write `.claude/loop.md` in your CLASH clone: your own default prompt for a bare `/loop`. Goal: check the background build and `npx tsc --noEmit`, report in one line, answer `quiet` when nothing changed. Compare with `workshop-artifacts/18-automate/loop.md`.
- Write a second style in your CLASH clone that answers in German. Goal: same code, same care, German prose.
- With a subscription: create your own routine on your fork of CLASH with the trainer's prompt, then give it a GitHub trigger, so a pull request starts it. A routine belongs to one claude.ai account, so you cannot edit the trainer's. The Claude GitHub App must be installed on that fork.

## Check

- [ ] `/output-style` lists `host-notes` next to the built-ins, and an answer in that style ends with a line that starts with `Host note:`.
- [ ] `.claude/settings.local.json` in your CLASH clone holds `outputStyle`.
- [ ] You can explain the three parts of a safe `/goal`: end state, proof and turn ceiling.
- [ ] The loop reported at least once and is no longer listed.
- [ ] `claude agents` showed a row named `audit`. You peeked, attached and detached.
- [ ] `docs/audit.md` is in a worktree under `.claude/worktrees/`, not in the main checkout of your CLASH clone, and every line says PASS.
- [ ] You saw the trainer's routine in `/schedule list` and at claude.ai/code/routines.
- [ ] You can say which of the four needs an open session, and which runs with your machine off.
- [ ] You can say why a fresh subagent, like `security-auditor`, would not end with a Host note.

## Stuck?

`git checkout 18-start` in your CLASH clone — identical to `14-start`: the reference CLASH with `CLAUDE.md`, the skill, the fix and the hook set.
The finished style file, the loop file and the routine prompt are in `workshop-artifacts/18-automate/` in the workshop repository.
Compare `host-notes.md` there with the file Claude wrote for you.

## Go further

Start capstone brief B with `claude --bg` while you build brief A in the foreground. Two
features, one CLASH clone, one of them with nobody watching. Merge both.

## Links

- Output styles — https://code.claude.com/docs/en/output-styles
- Goal mode — https://code.claude.com/docs/en/goal
- Scheduled tasks and `/loop` — https://code.claude.com/docs/en/scheduled-tasks
- Agent view and background sessions — https://code.claude.com/docs/en/agent-view
- Routines — https://code.claude.com/docs/en/routines
