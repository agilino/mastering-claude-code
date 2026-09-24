---
layout: concept
heading: "Letting go of the wheel"
lines:
  - "Worktrees: several agents, one repo, no collisions."
  - "Headless: started by an event, nobody watching."
  - "The Agent SDK: the same loop, inside your program."
---

---
layout: task-intro
number: "15"
routeAlias: task-15
heading: "Task 15 — Letting go"
branch: "15-start"
learn:
  - "Several agents, separate worktrees, no collisions"
  - "Move the audit into CI, unattended"
  - "Wire up claude-code-action@v1 with a named secret"
  - "Set up the GitHub App with /install-github-app"
outcome:
  - "Two worktrees running at once, no file collisions"
  - "A GitHub Actions workflow, audits every PR"
  - "Findings posted as a PR comment, unattended"
  - "GitHub App installed, OAuth secret working"
---


---
layout: concept
heading: "One repo, N isolated agents"
routeAlias: theory-worktrees
docs: https://code.claude.com/docs/en/worktrees
lines:
  - "claude --worktree <name>   (short: -w)"
  - "Copy under .claude/worktrees/<name>/, on branch worktree-<name>"
---

<G18WorktreeParallelism />



---
layout: concept
heading: "/batch: many independent pull requests"
docs: https://code.claude.com/docs/en/commands
lines:
  - "Claude researches, proposes 5–30 independent units, then waits for approval."
  - "Each unit gets a background subagent, worktree, tests and its own pull request."
  - "Use it for separable migrations, not one coupled architecture decision."
---

<div class="flex items-center gap-3 w-full max-w-4xl justify-center text-sm">
  <div class="na-card px-4 py-3">research</div><span>→</span><div class="na-card px-4 py-3">5–30 units</div><span>→</span><div class="na-card px-4 py-3">approve</div><span>→</span><div class="na-card px-4 py-3">worktrees</div><span>→</span><div class="na-card px-4 py-3">PRs</div>
</div>

---
layout: concept
heading: "Headless in CI"
routeAlias: theory-headless-ci
docs: https://code.claude.com/docs/en/headless
lines:
  - "CLASH has no .github/workflows/. Nothing runs on a pull request."
  - "anthropics/claude-code-action@v1. Not @beta. Not a raw claude -p."
---

<div class="grid grid-cols-2 gap-8 w-full max-w-3xl">
  <div class="na-card p-6">
    <div class="text-sm font-semibold mb-2" style="color: var(--na-accent-500)">Local session</div>
    <div class="text-lg">You type. Claude works. You watch and decide.</div>
  </div>
  <div v-click class="na-card p-6">
    <div class="text-sm font-semibold mb-2" style="color: var(--na-accent-500)">CI run</div>
    <div class="text-lg">A pull request opens. The same agent audits it. Nobody watches.</div>
  </div>
</div>

---
layout: code-live
heading: "Audit on every PR"
docs: https://code.claude.com/docs/en/github-actions
filePath: ".github/workflows/security-audit.yml"
success: "Runs on pull_request, uses anthropics/claude-code-action@v1, authenticates via a named secret."
---

```yaml
on: pull_request
jobs:
  audit:
    runs-on: ubuntu-latest
    permissions: { contents: read, pull-requests: write, id-token: write }
    steps:
      - uses: actions/checkout@v6
      - uses: anthropics/claude-code-action@v1
        with:
          # ⟵ LIVE: NOT `claude -p` in a run: step. The action runs
          # headless. Fill in the prompt and the auth secret.
          prompt: "___"
          claude_args: "___"
          claude_code_oauth_token: ___
```

---
layout: concept
heading: "Drive a session from your phone"
docs: https://code.claude.com/docs/en/remote-control
lines:
  - "/remote-control connects claude.ai/code or the mobile app to this session."
  - "Your files, your tools, stay on your machine the whole time."
---

<div class="flex flex-col gap-3 w-full max-w-2xl">
  <div class="na-card px-5 py-3 flex gap-4 items-center"><span class="font-mono text-sm w-40" style="color: var(--na-accent-500)">/remote-control</span><span style="color: var(--na-fg-muted)">from inside a running session</span></div>
  <div class="na-card px-5 py-3 flex gap-4 items-center" v-click><span class="font-mono text-sm w-40" style="color: var(--na-accent-500)">claude --rc</span><span style="color: var(--na-fg-muted)">start a new session already connected</span></div>
  <div class="na-card px-5 py-3 flex gap-4 items-center" v-click><span class="font-mono text-sm w-40" style="color: var(--na-accent-500)">/loop</span><span style="color: var(--na-fg-muted)">a prompt that repeats on an interval, no phone needed</span></div>
</div>

---
layout: task
number: "15"
heading: "Letting go"
goal: "Run two agents in separate worktrees at once, then add a GitHub Action that runs the audit on every pull request."
mode: "you do"
success: "Two worktree sessions never touched each other's files, and the audit workflow uses claude-code-action@v1 with a named secret."
branch: "15-start"
---


---
layout: task-intro
number: "16"
routeAlias: task-16
heading: "Task 16 — The Agent SDK"
branch: "16-start"
learn:
  - "Host the Claude Code loop in your own program"
  - "Carry context budget, tool limits, hooks unchanged"
  - "Restrict a scripted agent to read-only tools"
  - "Log every tool call via a PreToolUse hook"
outcome:
  - "ask-clash.mts: answers one question about CLASH"
  - "Only Read, Grep, Glob — no edits, no commands"
  - "A capped turn limit, every tool call logged"
  - "A printed answer: a clash, a place, a time"
---

---
layout: concept
heading: "Same loop, inside your program"
routeAlias: theory-agent-sdk-loop
docs: https://code.claude.com/docs/en/agent-sdk/overview
lines:
  - "Context budget, tool limits, hooks: all carry over unchanged."
  - "Only the host changes."
---

<G19AutonomyLevels />

---
layout: code-live
heading: "ask-clash.mts"
docs: https://code.claude.com/docs/en/agent-sdk/typescript
filePath: "ask-clash.mts (in the CLASH clone)"
success: "The program answers with a clash, a place and a time, and the tool log shows only Read, Grep and Glob."
---

```ts
import { query } from "@anthropic-ai/claude-agent-sdk";

const question = process.argv.slice(2).join(" ");
const run = query({
  prompt: `The demo data lives in prisma/seed.ts. Read it, then answer: ${question}`,
  options: {
    cwd: process.cwd(),
    allowedTools: ["Read", "Grep", "Glob"],
    // ⟵ LIVE: forbid Bash, Edit, Write. Add maxTurns. Add a PreToolUse
    //         hook that logs every tool call to stderr.
  },
});
for await (const m of run)
  if (m.type === "result" && m.subtype === "success") console.log(m.result);
```

---
layout: task
number: "16"
heading: "The Agent SDK"
goal: "Host the Claude Code loop in a small program that answers a question about CLASH with read-only tools and a hook."
mode: "you do"
success: "ask-clash.mts prints an answer with a clash, a place and a time, and never edits a file or runs a command."
branch: "16-start"
---
