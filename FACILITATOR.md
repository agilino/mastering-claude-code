# Mastering Claude Code — Facilitator guide

**Format:** guided workshop. You explain and show. Then participants do the task on their own
machine. You walk around (or watch the chat), help, and only move on when most are through
the "Check" list of the task.

**Codebase:** `github.com/pawsaw/clash`. Part I starts on `01-start` (spec only), Part II on `02-start`.
Parts III and IV run on the reference app from `06-start`.

**Spine:** the journey map (four belts) on the four part dividers, and the seven-primitive
toolkit map on the primitive dividers in Parts III and IV.

**Before the first session:** push the branches (`docs/BRANCHES.md`), confirm your own
machine passes `docs/SETUP.md` including `/skills` listing `agent-browser`, confirm
`CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1` is set and Dynamic workflows are on in `/config`,
pre-install the MCP servers, run the deck once (`cd slides && npm run dev`).

**Rhythm for every task:** the deck explains and shows, the task file is where they do it.

- Open on the task-intro slide — the `/task-NN` link target. Say what they will learn and
  build. Demo nothing yet.
- Walk every concept slide that follows, in order. These are the mechanisms the task needs;
  teach all of them before anyone touches a keyboard. Demo a `code-live` slide live where the
  deck marks `⟵ LIVE`.
- If the block has a stop slide (a careless-vs-engineered graphic) **with a matching anti-pattern
  step in the task file**: click through the careless side, narrating as it builds, and stop on
  the red bar — do not reveal the engineered side yet. Switch to the task file and send that step
  live, once, on your own machine, while the group watches (say plainly: this is not what they
  will do). Let it run long enough to make the point, then `Esc`, `/context` to show the damage,
  then `/rewind` to the checkpoint from before you sent it — this restores the files it touched
  as well as the conversation, unlike `/clear`, which only clears conversation context and would
  leave your checkout partially changed. Point at the small step that follows it in the task
  file, and hand over. Step back to the stop slide once most are through "Check", and click through the
  engineered side then — this is the only point it appears, so do it, or the graphic's right half
  never gets shown.
- If the block has a stop slide with **no** matching task-file step (a few tasks reuse an older
  slide for this beat, illustrating a lesson rather than a literal prompt): click through both
  sides in one pass, as a concept slide, then hand over straight after — no live send, no
  stepping back.
- If the block has no stop slide, hand over straight from the last concept slide: point at
  step one of "Do this" and let them start.
- Keep the recap slide up while they work. Do not demo "Now you".
- When most are through the "Check" list, bring the deck back and walk any debrief slide after
  the recap: it explains, after the fact, why what they just did matters.
- Close by asking two people what they saw.

Refer to a task by its `/task-NN` link, never by a slide number — numbers shift as the deck
grows.

**Pace:** favor running long over cutting a task short — consistent feedback says too little
time hurts more than too much. If a task is moving fast, stretch it: ask someone to walk the
group through their solution, or, if nobody has one yet, turn it into a problem the group
solves together. Plan a lunch break, plus a few short breaks along the way — set yourself a
reminder, it is easy to forget once everyone is deep in a task.

---

## Part I — Foundations

### What a model is

Go slowly here. This is where beginners decide whether the rest of the workshop is for them.

- **Tokens.** Type a sentence in a tokenizer if you have one; otherwise say it: "notifications"
  may be two or three tokens. Numbers and code split in odd places. This is why the model
  cannot count letters.
- **One token at a time.** The probability bars are the whole story: the prompt goes in, the
  top candidate comes out, that token joins the prompt, the bars change, repeat. Nothing is planned ahead. Say it twice.
- **Probabilities.** Same prompt, different answer. That is not a bug. Temperature is the
  spread. Claude Code runs with a fixed setting; you do not tune it.
- **Knowledge.** Trained once, on a snapshot. It does not read the internet now. If it needs
  a fact from today, something has to put that fact into the prompt.
- **No memory.** Every turn sends the whole conversation again. That is what "context" means.
  This is the single most important idea of the workshop. Everything in Parts III and IV is
  about managing what goes into that window.
- **The window is a budget.** Show the tank filling towards the red limit line. Past it, old
  things fall out or the run stops.
- **Bad at.** Counting, arithmetic, hidden state, current facts, checking its own work.
  The fix for all five is the same: give it a tool.
- **Tool call.** The model writes a small structured request and stops. Something else
  runs it. That "something else" is the next section.

### The harness

- Model alone: text in, text out. A function. The harness is the loop around it.
- Walk the cycle diagram station by station: build prompt, call model, permission, run tool,
  append result. The harness ring runs the tools; the model in the centre only chooses. Point
  at where the tool result goes: back into the prompt. That is why tool output costs context.
- What is in the prompt every turn: system prompt, CLAUDE.md, the tool list, the skills
  index, the history, your message. The part that repeats is cached. Cache is why the
  second turn is cheaper than the first.
- Permissions: the tool call waits at the gate until a rule or you say yes. Five modes: manual,
  accept edits, plan, auto, bypass. Plan mode is "no writes".
- Hooks: a shell command runs before or after a tool. Only exit code 2 matters: before a tool
  it blocks the call, after a tool it hands the error to the model. Say "we build
  these in Part IV".
- Subagents: a second loop with its own window. Only a summary comes back.
- Compaction: the full tank becomes a small summary block with room above it. Starting fresh
  empties it. Name the commands, don't run them yet — no live session is open. The real, live
  version comes later in Task 01.
- A question that skips the loop (`/btw`): same loop, no tool call, answered from what's
  already in the window. Name it, don't run it yet, same reason as compaction.
- Install and log in: this is where the group first sees a terminal with Claude Code running.
  Everyone installed before the workshop (`docs/SETUP.md`) — say so, this is a recap, not a
  fresh install. An empty folder has nothing for `/context`, `/btw` or `/clear` to show yet,
  so don't demo them here.
- Skills and MCP: one slide each, name them, point forward.
- Close: "The model is the same for everyone. The harness is where you win."

### First steps — Task 01

Demo: `claude`, `/help`, ask about `@docs/SPEC.md`, `/init`, `/clear`, `/context`.
Watch for: people who never press Enter on the permission prompt; people who type in the
terminal while Claude is working (Esc stops it).

---

## Part II — Build CLASH

The build is the content. Every Claude Code basic is introduced exactly when the build needs it.
Participants' code will differ from the reference. That is fine. The reset branches are the
reference build at each stage.

### Task 02 — Foundation

- Teach the brief first: goal, constraints, done-when. Write one on screen before typing it.
- Start in manual mode. Read the first two or three permission prompts aloud, then switch to
  auto — scaffolding a Next.js app is standard, low-risk work. Let the group watch the tool
  calls scroll by and name them: Bash, Write, Read. Read the diff, not the summary.
- Plan mode for the data model. Show a plan being changed before it is accepted.
- First commit through Claude. Say: it writes the message, you approve.
- CLAUDE.md gets its first real invariants: Prisma client path, string statuses, async params.

### Task 03 — Auth and clashes

- Small steps beat big asks. Show one big ask failing (or drifting), then the same in three
  steps.
- `/rewind` after a wrong turn. Do this once on purpose.
- `/context` after the auth work. Read the numbers aloud. `/compact` and read them again.
- Stop slide ("Point, don't let it guess") has no matching task-file step — click through both
  sides in one pass, no live send. It sets up step 10, the clash-building step.
- The page guard vs. the action: ask Claude to explain it, then add "every action checks
  ownership" to CLAUDE.md. This plants the seed for the audit in Part III.

### Task 04 — Venues, map, people

- "Do it like clashes" is the reuse pattern. Then the first custom slash command.
- Leaflet breaks on the server. Let Claude read the dev-server error and fix it. Do not
  fix it yourself.
- Paste a screenshot. Then let Claude look for itself with agent-browser. Both are input.
- Stop slide: the one-big-ask prompt is task file step 2 — send it live, stop on the red bar,
  then hand over at step 1 (they check out and start their own session; skip step 2, they just
  watched it) and continue from step 3, the small-steps version of the same four things.
- Quality gates into CLAUDE.md, as the debrief after the recap. From here on, "done" means
  tsc, lint and build are green.

### Task 05 — Finish and ship

- Batch the independent work into one brief. Background tasks for the long ones.
- `/usage` once. Memory once (ask Claude to remember a rule, then `/memory`).
- Git through Claude: branch, commit, PR, a strict review prompt.
- Compare with the reference. Ask: what did the reference do that you did not? What did
  you do better? Then `git checkout 06-start`. Everyone is on the same code from here.

---

## Part III — Control the context

Parts III and IV run on the finished reference CLASH, as guided tasks.

### Task 06 — Context and CLAUDE.md

- `/context` is an instrument. Read it aloud.
- CLASH's real `CLAUDE.md` is `@AGENTS.md` and `AGENTS.md` is generic boilerplate. Nothing
  to trim. The exercise is authoring from real invariants.
- Plan mode for real-time notifications. `/skill-doctor` on `.agents/skills/` (two
  near-duplicate ~100KB skills).
- Stop slide ("@-references beat grep-and-guess") sits last, right before the recap, with no
  matching task-file step — click through both sides in one pass, no live send.
- Answer key: `workshop-artifacts/06-context-and-claude-md/CLAUDE.md`. Do not show it before they write theirs.

### Task 07 — The clash-feature skill

- Progressive disclosure: name and description always loaded, body on match.
- Commands did not break: `.claude/commands/*.md` still works. Skills are the richer format.
- Build the skill step by step on screen. Stop at the Server Action step and say why it
  insists on its own ownership check. Then ship venue favourites with it and compare `/context`.
- A skill is advice. Hold that thought for hooks.

### Task 08 — Subagent audit

- Do not skip the setup: the layout guard protects the page, not the action. A Server
  Action is a public POST endpoint with a generated id. Zod validates shape, not permission.
- Say out loud: upstream `main` has no missing checks. The two are seeded on `08-start`
  (`deleteClash`, `deleteVenue`). `npm run lint` shows an unused `user` warning in
  `deleteVenue` as a tell.
- One `security-auditor` with Read/Grep/Glob and a falsifiable brief. `/context` barely
  moves. Say "agent, subagent, fork" once, slowly, and point at the row that appears under
  `main` below the prompt. Fork mode is on by default in interactive sessions, but a named
  agent from a definition file stays a fresh subagent. Only `/subtask` (or Claude choosing the
  fork type) starts a fork, and a fork ignores a `tools:` line.
- Steps 9 to 11 install OWASP's `code-security-skills` plugin (needs GitHub reachable, and it
  spends more tokens than the auditor). Compare the two reports, do not crown a winner. Say it
  is a plugin bundling subagents and skills, and that a plugin can ship hooks: read what you install.
- Stop slide: task file step 4 is reading every action file yourself, in the main
  conversation — send it live, watch your own `/context` climb, stop, then hand over at step 1
  (they check out, look at both sides and note their own `/context` themselves; skip step 4,
  they just watched it) and continue from step 5, the subagent version of the same audit.
- End on the cliffhanger: two findings, nothing fixed yet.

### Task 09 — Example Mapping and the `discover` skill

- Manual prompt first, then package it: send the raw Example Mapping prompt live in chat, no
  skill yet, and count how much of it people would have to retype for the next story.
- `references/example-mapping.md` is the point of this task, not a nice-to-have: the skill body
  stays short, the method only enters context when the skill actually opens the file.
- `AskUserQuestion` runs from inside the skill, not just from Claude directly — resolve the
  capacity-lowering question live and read the options it offers out loud.
- No stop slide: the contrast here is the manual prompt vs. the packaged skill, not a
  careless-vs-engineered demo.
- Answer key: `workshop-artifacts/09-example-mapping/`. The saved spec has no `Questions`
  section left — say why that's the rule, not an accident.

### Task 10 — Path-scoped rules

- Contrast with task 06's `~/.claude/rules/tone.md`: same directory name, different scope
  (project vs. personal) and different trigger (`paths:` vs. unconditional).
- Demo the trigger live: run `/context` before Claude has read anything under `app/actions/`,
  then after — the rule appears only the second time.
- `paths` is the only field Claude Code reads from a rule file. Say it plainly: everything else
  in that frontmatter is silently ignored.
- No stop slide.

---

## Part IV — Orchestrate and let go

### Task 11 — The TDD inner loop

- Ships pre-configured: vitest, one trivial passing test, a deliberately wrong `lib/capacity.ts`
  stub. Do not let anyone fight test-runner config live — that is not the lesson here.
- The deliberate mistake, same shape as task 13's hooks mistake: send "the test is failing,
  update the test so the suite passes" live, once, on your own machine. Watch Claude edit the
  assertion, not the code. Then `Esc`, `/rewind` to the checkpoint before that edit, hand over.
- RED must fail on an assertion, not a compile error — say why explicitly. Same lesson as task
  13's silent hook, from the other direction: the wrong kind of failure teaches nothing either.
- `disable-model-invocation: true` — a one-cycle skill is a deliberate ceremony, not something
  Claude should reach for on its own.
- Stop slide ("Update the test, or fix the code?") has a matching anti-pattern step in the task
  file — click through the careless side, stop on the red bar, send the live prompt, `/rewind`,
  hand over at the engineered prompt, come back to click through the engineered side once most
  people are through Check.
- Answer key: `workshop-artifacts/11-tdd-inner-loop/`.

### Task 12 — Team and workflow audit

- Agent team: needs `CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1` or it silently spawns plain
  subagents. Teammates message by name via SendMessage. No `@`-mentions. `claude agents` is
  the background-sessions view, not a team dashboard. The moment to wait for: two peers
  disagree about the same file and the lead reconciles.
- Dynamic workflow: describe the job, Claude writes the script, the runtime runs it in the
  background. Read the generated script on screen. It lands under
  `~/.claude/projects/<session>/`; `s` in `/workflows` saves it to `.claude/workflows/`.
  `Date.now()`, `Math.random()` and no-arg `new Date()` throw inside it.
- Verifier/refuter and quarantine. Say the token cost out loud.
- Reconcile three results, fill the toolkit map from evidence, then restore the two
  `creatorId` checks. `workshop-artifacts/12-team-and-workflow-audit/AUTH-FIX.md` has the diff.
- Keep a finished run in a second terminal in case the live one is slow.
- No stop slide: this whole block is the live demo already, mode `watch first`. The real
  contrast here is three-way (subagent vs. team vs. workflow), not careless-vs-engineered — that
  is what "Reconcile, decide, merge" is for, and it stays before the recap on purpose: the
  numbers it compares only exist once you have watched the demo, not once they are back.

### Task 13 — Hooks

- Say the naming trap again: `hooks/` in CLASH is React hooks. Claude Code hooks live in
  `.claude/settings.json`.
- Event, matcher, exit code. Only exit 2 matters: it blocks before a tool or at Stop; after a
  tool it cannot block (the tool already ran) and the stderr goes to the model. Exit-0 stdout
  goes to the debug log only.
- The deliberate mistake: a path glob in `matcher` never fires. Let it sit. Fix with `if`.
- Watch the agent receive a blocked edit and fix its own type error. That is the moment.
- Then the deny set, output replacement (`hookSpecificOutput.updatedToolOutput`, all tools),
  and the Stop gate. `hard_deny` is an auto-mode setting, not a hook decision.
- Skills are advice. Hooks are law.

### Task 14 — The browser closes the loop

- MCP is a protocol boundary. Playwright MCP drives a browser; DevTools MCP speaks the
  DevTools protocol.
- Drive the join flow by hand first, then ask for the test file. Never generate tests blind.
- Avatars: `getCurrentUser()` selects `avatar` on every request. Measure, fix, re-measure.
- Four browser tools, one comparison. Do not quote a token-savings percentage for
  agent-browser; it is not an official number.

### Task 15 — Letting go

- Worktrees: `claude --worktree <name>`. The one thing they use next week.
- CI: `anthropics/claude-code-action@v1` with `prompt` and `claude_args`. Not `@beta`,
  not a bare `claude -p` in the YAML. Token via a repository secret.

### Task 16 — Agent SDK

- Same loop, hosted in your program. Every primitive carries over: allowed tools, hooks,
  context budget.
- The script in `workshop-artifacts/16-agent-sdk/` answers one question about the seed data
  with Read, Grep and Glob only. Run it, then read it.

### Task 17 — Capstone

- Three briefs. Each participant picks one and ships it in a worktree with the skill, a
  subagent review, the hook set, a browser check and a PR.
- Close with security (prompt injection, quarantine, least privilege), Spec Kit vs BMAD
  (facts as corrected: Spec Kit is a Python/uv tool; BMAD v6 has 5 named agents), the
  "what we did not cover" slide, and the two lines: *context is king* and *you push it, you own it.*

---

## Risk register

| Risk | Mitigation |
|---|---|
| Beginners lost in the model section | Slow down. Every slide has one diagram and one sentence. Ask a question per slide. |
| Participants' builds diverge from the reference | Expected. Reset branches are the reference build. Say so at the start of Part II. |
| Scaffold fails on a machine | `git checkout 03-start` and continue. Do not debug installs in the session. |
| Dynamic workflows off on Pro | Everyone enables them in `/config` during setup. |
| Agent teams demo does nothing | Confirm the env flag on your machine before you start. It fails silently. |
| Typecheck hook does not fire | It is the scripted mistake. Make sure they saw the silence before the fix. |
| Slow workflow run | Second terminal with a finished run. The script read-through is the filler. |
| Token limits on Pro during Part IV | Warn early. Watch the trainer screen for that segment. Rejoin at the next branch. |
| Someone hand-edits `prisma/migrations` | The deny hook from Task 13 catches it from `14-start` on. |
| `/tdd` fires on its own mid-conversation | Shouldn't happen — `disable-model-invocation: true` blocks it. If it does, the skill file is wrong; fix it live as a teaching moment. |
