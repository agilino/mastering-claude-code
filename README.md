<p align="center">
  <img src="slides/public/brand/nalogo.svg" width="56" alt="nextacademy.io" />
</p>

<h1 align="center">Mastering Claude Code</h1>
<p align="center"><strong>Learn What's Next. <em>Today.</em></strong></p>
<p align="center">Adam Furmanczuk · nextacademy.io<br/>From first prompt to black belt, on one real codebase.</p>
<p align="center"><strong>Slides:</strong> <a href="https://mastering-claude-code.vercel.app">mastering-claude-code.vercel.app</a></p>

---

## Repository

- This workshop: [github.com/nextacademy-io/mastering-claude-code](https://github.com/nextacademy-io/mastering-claude-code)
- The app you build and extend: [github.com/pawsaw/clash](https://github.com/pawsaw/clash)
- Live deck: [mastering-claude-code.vercel.app](https://mastering-claude-code.vercel.app)
- Trainer: Adam Furmanczuk, nextacademy.io

## What this is

A guided workshop on Claude Code. You start with no experience. You end with the skills of an
expert: context engineering, skills, subagents, agent teams, dynamic workflows, hooks, MCP,
worktrees, headless runs in CI, and the Agent SDK.

The trainer explains and shows. Then you do it on your own machine. Every task has a reset
branch, so nobody gets stuck.

## The app you build

**CLASH** is a small social app for Berlin. Clashes happen at a place and a time on a map.
People join, hosts accept or reject, everyone gets notified.

In the first half you **build CLASH yourself** with Claude Code, from an empty repo and a spec.
In the second half you work on the **finished reference CLASH** and learn to control and
orchestrate Claude Code on it.

- Spec: [`docs/SPEC.md`](docs/SPEC.md)
- Reference app: [github.com/pawsaw/clash](https://github.com/pawsaw/clash)

## Who this is for

Developers who want to use Claude Code well. No Claude Code experience needed. You should be
able to read TypeScript and use git.

## Setup

Do this before the workshop: **[`docs/SETUP.md`](docs/SETUP.md)**.

```bash
git clone https://github.com/pawsaw/clash
cd clash
git checkout 01-start
claude --version
```

## The road

| Part | Belt | Tasks |
|---|---|---|
| I — Foundations | White | 01 |
| II — Build CLASH | Blue | 02 · 03 · 04 · 05 |
| III — Control the context | Brown | 06 · 07 · 08 · 09 · 10 |
| IV — Orchestrate and let go | Black | 11 · 12 · 13 · 14 · 15 · 16 · 17 |

## Tasks

| # | Task | Part | Reset branch |
|---|---|---|---|
| 01 | [Setup and first conversation](tasks/01-setup-first-conversation.md) | I | `01-start` |
| 02 | [Foundation](tasks/02-foundation.md) | II | `02-start` |
| 03 | [Auth and clashes](tasks/03-auth-and-clashes.md) | II | `03-start` |
| 04 | [Venues, map, people](tasks/04-venues-map-people.md) | II | `04-start` |
| 05 | [Finish and ship](tasks/05-finish-and-ship.md) | II | `05-start` |
| 06 | [Context and CLAUDE.md](tasks/06-context-and-claude-md.md) | III | `06-start` |
| 07 | [The clash-feature skill](tasks/07-clash-feature-skill.md) | III | `07-start` |
| 08 | [Subagent audit](tasks/08-subagent-audit.md) | III | `08-start` |
| 09 | [Example Mapping and the `discover` skill](tasks/09-example-mapping.md) | III | `09-start` |
| 10 | [Path-scoped rules](tasks/10-path-scoped-rules.md) | III | `10-start` |
| 11 | [The TDD inner loop](tasks/11-tdd-inner-loop.md) | IV | `11-start` |
| 12 | [Team and workflow audit](tasks/12-team-and-workflow-audit.md) | IV | `12-start` |
| 13 | [Hooks](tasks/13-hooks.md) | IV | `13-start` |
| 14 | [The browser closes the loop](tasks/14-browser-loop.md) | IV | `14-start` |
| 15 | [Letting go](tasks/15-letting-go.md) | IV | `15-start` |
| 16 | [Agent SDK](tasks/16-agent-sdk.md) | IV | `16-start` |
| 17 | [Capstone](tasks/17-capstone.md) | IV | `17-start` |

Standalone index: [`tasks/README.md`](tasks/README.md). What each branch contains:
[`docs/BRANCHES.md`](docs/BRANCHES.md).

## Reset branches

`NN-start` is the state at the **start** of task NN. If you fall behind, do not debug. Reset
and continue:

```bash
git stash -u          # keep your own work, including new files, if you want it
git checkout 04-start
```

`01-start` is an empty repo with the spec. `06-start` is the finished reference CLASH.

## What you will have built

- CLASH, built by you with Claude Code, and compared against the reference.
- A `CLAUDE.md` grounded in real invariants, a reusable `clash-feature` skill, a hook set.
- An authorization audit run three ways: subagent, agent team, dynamic workflow. With the fix merged.
- A browser test suite and a measured performance fix.
- The audit running headless in CI, a worktree flow, and a small Agent SDK program.
- One feature of your choice, shipped with everything above.

## Slides

Live deck: **[mastering-claude-code.vercel.app](https://mastering-claude-code.vercel.app)**. It is
redeployed automatically whenever the slides change (a Claude Code `Stop` hook in
`.claude/settings.json` runs `.claude/hooks/deploy-slides.sh`).

```bash
cd slides
npm install
npm run dev        # opens the deck
npm run build      # also exports dist/mastering-claude-code.pdf
```

## For trainers

[`FACILITATOR.md`](FACILITATOR.md) holds the talking points, demo scripts and pitfalls per part.
Answer keys live in [`workshop-artifacts/`](workshop-artifacts/).

Create a new task from the shared template, or check that task structure and theory links still match:

```bash
npm run task:new -- 15 My new task
npm run task:new -- My new task    # picks the next task number
npm run task:check
```

The slide base URL defaults to the deployed workshop. Override it when testing new aliases locally
or if the deployment moves:

```bash
SLIDES_BASE_URL=http://localhost:3000 npm run task:check
SLIDES_BASE_URL=http://localhost:3000 npm run task:new -- 15 My new task
```

With a localhost override, the linter accepts both existing deployed links and local links. CI
still uses the deployed URL by default, so a localhost link cannot be committed unnoticed.

The speaker notes come in English and German. They live in `slides/notes/en/` and
`slides/notes/de/`. The slides are the same in both languages. Only the notes change.
Pick the language when you start the deck:

```bash
cd slides
npm run dev                  # English notes (default)
npm run dev -- --lang=de     # German notes
npm run build -- --lang=de   # German build, also exports dist/mastering-claude-code.de.pdf
npm run export -- --lang=de  # German PDF only
npm run check:notes          # both languages still match: note keys, [click] markers, commands
```

## Resources

- [Claude Code docs](https://code.claude.com/docs/en/) · [Skills](https://code.claude.com/docs/en/skills) · [Subagents](https://code.claude.com/docs/en/sub-agents) · [Agent teams](https://code.claude.com/docs/en/agent-teams) · [Dynamic workflows](https://code.claude.com/docs/en/workflows)
- [Hooks guide](https://code.claude.com/docs/en/hooks-guide) · [Hooks reference](https://code.claude.com/docs/en/hooks) · [Permission modes](https://code.claude.com/docs/en/permission-modes) · [Settings](https://code.claude.com/docs/en/settings-reference)
- [MCP](https://code.claude.com/docs/en/mcp) · [Headless mode](https://code.claude.com/docs/en/headless) · [Worktrees](https://code.claude.com/docs/en/worktrees) · [GitHub Actions](https://code.claude.com/docs/en/github-actions) · [Agent SDK](https://docs.claude.com/en/api/agent-sdk/overview)
- [Playwright MCP](https://github.com/microsoft/playwright-mcp) · [Chrome DevTools MCP](https://github.com/ChromeDevTools/chrome-devtools-mcp) · [Agent Browser](https://github.com/vercel-labs/agent-browser)

## License

Slides and text: [LICENSE](LICENSE). Code: [LICENSE-CODE](LICENSE-CODE).
