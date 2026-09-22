---
layout: concept
heading: "Letting go of the wheel"
lines:
  - "Worktrees: several agents, one repo, no collisions."
  - "Headless: started by an event, nobody watching."
  - "The Agent SDK: the same loop, inside your program."
---


---
layout: concept
heading: "One repo, N isolated agents"
lines:
  - "claude --worktree <name>   (short: -w)"
  - "Copy under .claude/worktrees/<name>/, on branch worktree-<name>"
---

<G18WorktreeParallelism />

---
layout: concept
heading: "Headless in CI"
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
layout: task
number: "12"
routeAlias: task-12
heading: "Letting go"
goal: "Run two agents in separate worktrees at once, then add a GitHub Action that runs the audit on every pull request."
mode: "you do"
success: "Two worktree sessions never touched each other's files, and the audit workflow uses claude-code-action@v1 with a named secret."
branch: "12-start"
---


---
layout: concept
heading: "Same loop, inside your program"
lines:
  - "Context budget, tool limits, hooks: all carry over unchanged."
  - "Only the host changes."
---

<G19AutonomyLevels />

---
layout: code-live
heading: "ask-clash.mts"
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
number: "13"
routeAlias: task-13
heading: "The Agent SDK"
goal: "Host the Claude Code loop in a small program that answers a question about CLASH with read-only tools and a hook."
mode: "you do"
success: "ask-clash.mts prints an answer with a clash, a place and a time, and never edits a file or runs a command."
branch: "13-start"
---


