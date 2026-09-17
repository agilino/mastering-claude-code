---
layout: concept
heading: "Letting go of the wheel"
lines:
  - "Worktrees: several agents, one repo, no collisions."
  - "Headless: started by an event, nobody watching."
  - "The Agent SDK: the same loop, inside your program."
---

<!--
Three ideas, each done properly. Worktrees are the thing people use most afterwards. Headless CI
turns the audit into permanent infrastructure. The SDK shows that every control from this workshop
carries over unchanged when the agent lives inside your software.
-->

---
layout: concept
heading: "One repo, N isolated agents"
lines:
  - "claude --worktree <name>   (short: -w)"
  - "Copy under .claude/worktrees/<name>/, on branch worktree-<name>"
---

<G18WorktreeParallelism />

<!--
Every strategy so far shared one working tree. Worktrees let you run several agents on separate
branches of the same repo in parallel, with no risk of one agent's half-finished edit breaking
another's. Give it time.

Mention without demoing: `isolation: worktree` in a subagent's frontmatter, and the
EnterWorktree/ExitWorktree tools. At home: `claude --worktree "#<pr-number>"` starts from a PR.
-->

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

<!--
Headless means no human watching: the same agent that just paired with you, running unattended,
triggered by an event. Fill the empty Actions tab with the security audit from task 08, running on
every PR. The centrepiece becomes permanent infrastructure.

Do not put `claude -p` in the YAML. Use anthropics/claude-code-action@v1 with `prompt` and
`claude_args`. @beta is legacy and dropped the `mode` input.
-->

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
      - uses: actions/checkout@v4
      - uses: anthropics/claude-code-action@v1
        with:
          # ⟵ LIVE: NOT `claude -p` in a run: step. The action runs
          # headless. Fill in the prompt and the auth secret.
          prompt: "___"
          claude_args: "___"
          claude_code_oauth_token: ___
```

<!--
FULL WORKING SOLUTION (trainer only):
      - uses: anthropics/claude-code-action@v1
        with:
          prompt: |
            Audit every exported Server Action in app/actions/ changed by
            this PR for missing ownership checks on mutations of existing
            rows. Comment the findings on the PR.
          claude_args: "--model claude-sonnet-5"
          claude_code_oauth_token: ${{ secrets.CLAUDE_CODE_OAUTH_TOKEN }}

Authenticate through the `claude_code_oauth_token` action input, fed from a named repository
secret (created with `claude setup-token`), never a hardcoded key.
`id-token: write` is required. A live token is not needed to check that the YAML is valid.
-->

---
layout: task
number: "12"
heading: "Letting go"
goal: "Run two agents in separate worktrees at once, then add a GitHub Action that runs the audit on every pull request."
mode: "you do"
success: "Two worktree sessions never touched each other's files, and the audit workflow uses claude-code-action@v1 with a named secret."
branch: "12-start"
---

<!--
Two terminals for the worktree half. The CI half needs no live token to verify the YAML shape.
-->

---
layout: concept
heading: "Same loop, inside your program"
lines:
  - "Context budget, tool limits, hooks: all carry over unchanged."
  - "Only the host changes."
---

<G19AutonomyLevels />

<!--
You just ran the agent headless in a pipeline. The Agent SDK is the same idea one level further
in: the agent lives inside your application. Imagine CLASH answering "find me something outdoors
in Kreuzberg this evening" over its own map. Today we build the smallest version: a script that
answers that question from the seed data, with read-only tools and a hook.
-->

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

<!--
FULL WORKING SOLUTION (trainer only): workshop-artifacts/13-agent-sdk/ask-clash.mts. Run with
`npx tsx ask-clash.mts "find me something outdoors in Kreuzberg this evening"` after
`npm install @anthropic-ai/claude-agent-sdk tsx`.

Point at the three controls: allowedTools/disallowedTools, hooks.PreToolUse, maxTurns. Then the
result message: the answer, num_turns, total_cost_usd. Say the cost out loud.
-->

---
layout: task
number: "13"
heading: "The Agent SDK"
goal: "Host the Claude Code loop in a small program that answers a question about CLASH with read-only tools and a hook."
mode: "you do"
success: "ask-clash.mts prints an answer with a clash, a place and a time, and never edits a file or runs a command."
branch: "13-start"
---

<!--
The finished program is in workshop-artifacts/13-agent-sdk/. The "Now you" part removes tools and
adds a system prompt; the stretch turns it into an API route.
-->
