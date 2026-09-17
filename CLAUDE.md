# Mastering Claude Code — workshop repository

A reusable, three-part-plus-one guided workshop on Claude Code: complete beginners build the
CLASH app with Claude Code, then learn to control and orchestrate it on the finished app.
Trainer: Adam Furmanczuk · nextacademy.io. Not tied to any event or date.

## Layout

- `README.md` — participant entry point. `FACILITATOR.md` — trainer guide.
- `docs/SPEC.md` — the CLASH product spec participants build from (no code).
- `docs/SETUP.md` — pre-flight. `docs/BRANCHES.md` — what every `NN-start` branch holds.
- `tasks/NN-slug.md` — one file per task, 01–14. `tasks/README.md` — index.
- `slides/` — one Slidev project, one deck. `slides/sections/*.md` are composed into `slides/slides.md`.
- `scripts/prepare-branches.sh` + `scripts/checkpoints/` — build the catch-up branches on a local CLASH clone. Never pushes.
- `workshop-artifacts/` — answer keys.

Target codebase: `https://github.com/pawsaw/clash` (Next.js 16 / React 19 / Prisma 7 + SQLite / shadcn / Leaflet).

## Hard rules (apply to every file)

1. **No times, no dates, no durations, no days.** Never write `00:15`, "35 min", "hour",
   "Day 1", "morning", "after the break", a year, or an event name. Structure is by part and task only.
2. **Simple language.** Short sentences. Everyday words. Explain a term in one line the first time it appears.
   Prefer less text. One idea per slide.
3. **Every path, command and file name is real.** Verify against the reference clone of CLASH before writing it.
   CLASH's `hooks/` folder holds React hooks; Claude Code hooks live in `.claude/settings.json`. Always say which one.
4. **Tasks follow the template below**, in this order, with these exact headings.
5. **Prompts are verbatim** in fenced code blocks. Never paraphrase a prompt in prose.
6. **`code-live` slides are skeletons** with `⟵ LIVE` markers. The full solution goes only in the presenter note.
7. **Facts about Claude Code that were verified against the Claude Code docs stay as verified**: only exit code 2 blocks a hook;
   hook `matcher` matches the tool name, path scoping uses the sibling `if` field; `hard_deny` is an auto-mode setting, not a hook decision;
   agent teams need `CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1`; teammates message by name via SendMessage, no `@`-mentions;
   a dynamic workflow's script lands under `~/.claude/projects/<session>/` first and only `s` in `/workflows` saves it to `.claude/workflows/`;
   `Date.now()`, `Math.random()` and no-arg `new Date()` throw inside a workflow script; headless CI uses `anthropics/claude-code-action@v1`.

## Task template

```
# Task NN — Title
> Part: <part name> · Reset branch: `NN-start`

## You will end up with
## Why
## Do this
## Now you
## Check
## Stuck?
## Go further
## Links
```

- **Do this**: numbered steps. Each step is one action. Exact commands and exact prompts in code blocks.
  Say what the participant should see after the step.
- **Now you**: the same shape again on a new target. State the goal. Give no prompt. One to four items.
- **Check**: checkboxes a participant can verify by looking.
- **Stuck?**: `git checkout NN-start` and one line on what that branch contains.
- **Go further**: one open extension, no steps.
- **Links**: official docs only, verified live.

## Slide rules

- Layouts: `concept` (graphic + ≤ 3 lines), `code-live` (skeleton), `task` (recap: number, goal, success, reset branch), `section` (divider with `JourneyMap`, plus `ToolkitMap` in the control/orchestrate parts).
- Concept slides: ≤ 40 words of body text. Headings ≤ 8 words.
- Diagrams are small Vue/SVG components in `slides/components/` (`D*.vue` for the LLM and harness ideas, `G*.vue` for the rest). Text inside SVG is never under 13 px.
- Presenter notes (`<!-- -->`) hold the trainer script: what to say, what to demo, what to watch for. No times.
- Task slide frontmatter: `number` (matches `tasks/NN-*.md`), `heading`, `goal`, `mode` (`you do` | `watch first`), `success`, `branch`. No QR code and no task URL on slides: the trainer picks the medium.

## Task slugs (fixed — README, docs and task numbers on slides depend on them)

01-setup-first-conversation · 02-foundation · 03-auth-and-clashes · 04-venues-map-people ·
05-finish-and-ship · 06-context-and-claude-md · 07-clash-feature-skill · 08-subagent-audit ·
09-team-and-workflow-audit · 10-hooks · 11-browser-loop · 12-letting-go · 13-agent-sdk · 14-capstone

## Parts

- Part I — Foundations (White belt): what a model is, the harness, first steps. Task 01.
- Part II — Build CLASH (Blue belt): tasks 02–05. Participants build CLASH from `docs/SPEC.md`.
- Part III — Control the context (Brown belt): tasks 06–08, on the reference CLASH (`06-start`).
- Part IV — Orchestrate and let go (Black belt): tasks 09–14.

## Build and check

```bash
cd slides && npm install && npm run build      # also exports dist/mastering-claude-code.pdf
node slides/scripts/lint-slides.mjs            # no times, slugs match, LIVE markers present
slides/scripts/check-slides.sh                 # agent-browser overflow check per slide
```
