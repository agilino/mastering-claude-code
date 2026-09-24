---
layout: section
heading: "Strategy two: agent teams"
routeAlias: theory-agent-teams
docs: https://code.claude.com/docs/en/agent-teams
---

<template #map>
  <ToolkitMap current="team" />
</template>

---
layout: task-intro
number: "12"
routeAlias: task-12
heading: "Task 12 — Team and workflow audit"
branch: "12-start"
learn:
  - "Describe an agent team in words, no config"
  - "Watch teammates message each other by name"
  - "Describe a workflow; Claude writes the script"
  - "Know where a workflow script first lands"
outcome:
  - "The same audit, by team and by workflow"
  - "A saved workflow script in .claude/workflows/"
  - "Ownership checks restored and merged"
  - "Findings, time, tokens — compared across three runs"
---

---
layout: code-live
heading: "Describe the audit team"
filePath: "prompt to Claude Code — plain words, not a config file"
success: "The group can name the four peer domains before the lead assigns them, and knows teammates message by name."
---

```txt
Set up an agent team to audit app/actions/ for missing ownership checks.
Assign one teammate per domain: clashes, venues, participations, profile.
Each teammate should independently report PASS/FAIL per exported action in
their domain, citing the exact check (or its absence). If two teammates'
findings touch the same file, have them compare notes before the lead
finalizes the report.

⟵ LIVE: there is no YAML or JSON to fill in. A team is configured by
        describing it. Confirm the experimental flag is set before sending.
```

---
layout: concept
heading: "Lead, peers, and a disagreement"
lines:
  - "Close to the blog's agent teams pattern: one lead, long-lived peers."
  - "The difference: peers send messages by name, and the lead settles the dispute."
---

<G08TeamTopology />

---
layout: flow-ways
heading: "Lead, peers, and a disagreement"
ways:
  - way: "Named peers"
    prompt: "Create an agent team to audit app/actions/. Name teammates by domain: clashes, venues, participations, profile."
  - way: "A debate on purpose"
    prompt: "Spawn 3 teammates to audit deleteVenue. Have them challenge each other."
  - way: "A lead that waits"
    prompt: "Wait for your teammates to finish. Then settle any disagreement."
---

<G08TeamTopology still />

---
layout: concept
heading: "Generator-verifier: make, then check"
routeAlias: theory-coordination-patterns
docs: https://claude.com/blog/multi-agent-coordination-patterns
lines:
  - "One agent makes an output. A second checks it against clear criteria."
  - "Use it when a wrong output costs more than one more try."
  - "Vague criteria let everything pass. A loop can stall, so cap the rounds."
---

<G28CoordinationPatterns pattern="generator-verifier" />

---
layout: flow-ways
heading: "Generator-verifier: make, then check"
ways:
  - way: "/goal checks each turn"
    prompt: "/goal npx tsc --noEmit and npm run lint both exit 0, or stop after 10 turns"
  - way: "A workflow refutes findings"
    prompt: "Use a workflow to audit app/actions/ and try to refute each finding."
  - way: "An agent Stop hook"
    prompt: "Add a Stop hook of type agent to .claude/settings.json that checks npm run lint passes before Claude stops."
---

<G28CoordinationPatterns pattern="generator-verifier" still />

---
layout: concept
heading: "Orchestrator-subagent: lead, helpers"
docs: https://claude.com/blog/multi-agent-coordination-patterns
lines:
  - "A lead plans, hands out subtasks, and merges what the helpers report back."
  - "Use it when the job splits cleanly and the parts barely depend on each other."
  - "Every finding goes through the lead. Details often get lost on the way."
---

<G28CoordinationPatterns pattern="orchestrator-subagent" />

---
layout: flow-ways
heading: "Orchestrator-subagent: lead, helpers"
ways:
  - way: "One named subagent"
    prompt: "Use the security-auditor subagent on app/actions/ and show me its report."
  - way: "Helpers in parallel"
    prompt: "Audit app/actions/ in parallel using separate subagents, one per file."
  - way: "A workflow as the lead"
    prompt: "Use a workflow to review each file in app/actions/ in its own agent, then merge the findings."
---

<G28CoordinationPatterns pattern="orchestrator-subagent" still />

---
layout: concept
heading: "The blog's agent teams: a task queue"
docs: https://claude.com/blog/multi-agent-coordination-patterns
lines:
  - "A coordinator fills a task queue. Long-lived workers claim tasks on their own."
  - "Use it when the parts are independent and each needs many steps of work."
  - "Workers can't easily share findings. Two may edit the same file."
---

<G28CoordinationPatterns pattern="agent-teams" />

---
layout: flow-ways
heading: "The blog's agent teams: a task queue"
ways:
  - way: "A shared task list"
    prompt: "Create an agent team with 3 teammates to audit app/actions/. One task per file."
  - way: "A task that waits"
    prompt: "Add a report task that depends on all audit tasks."
  - way: "A hook gates each task"
    prompt: "Add a TaskCompleted hook to .claude/settings.json that exits 2 unless npm run lint passes."
---

<G28CoordinationPatterns pattern="agent-teams" still />

---
layout: concept
heading: "Message bus: publish and subscribe"
docs: https://claude.com/blog/multi-agent-coordination-patterns
lines:
  - "Agents publish events to a bus. Each one subscribes to the topics it needs."
  - "Use it when events drive the work and new agents keep joining."
  - "Hard to trace. A wrongly routed event fails silently."
---

<G28CoordinationPatterns pattern="message-bus" />

---
layout: flow-ways
heading: "Message bus: publish and subscribe"
ways:
  - way: "One message per name"
    prompt: "Spawn teammates schema, actions, ui. Have schema message the other two."
  - way: "Messages to your sessions"
    prompt: "Let @web know that prisma/schema.prisma changed."
  - way: "A one-time notice"
    prompt: "Tell me when the migration session finishes what it's working on."
footnote: "Not built into Claude Code. These are the closest ways."
---

<G28CoordinationPatterns pattern="message-bus" still />

---
layout: concept
heading: "Shared state: one store, no coordinator"
docs: https://claude.com/blog/multi-agent-coordination-patterns
lines:
  - "Agents read and write one shared store: a database, files, a document."
  - "Use it when agents should build on each other's findings right away."
  - "Agents may repeat work or keep replying to each other. Set a stop rule."
---

<G28CoordinationPatterns pattern="shared-state" />

---
layout: flow-ways
heading: "Shared state: one store, no coordinator"
ways:
  - way: "Your own sessions, no lead"
    prompt: "Audit app/actions/. Read docs/audits/findings.md first, append your findings, and skip anything already listed."
  - way: "/goal as the stop rule"
    prompt: "/goal Claude has shown docs/audits/findings.md with a verdict per action, or stop after 15 turns"
footnote: "Not built into Claude Code. These are the closest ways."
---

<G28CoordinationPatterns pattern="shared-state" still />

---
layout: section
heading: "Strategy three: dynamic workflows"
routeAlias: theory-dynamic-workflows
docs: https://code.claude.com/docs/en/workflows
---

<template #map>
  <ToolkitMap current="workflow" />
</template>

---
layout: concept
heading: "Four ways to start a workflow"
routeAlias: theory-start-a-workflow
docs: https://code.claude.com/docs/en/workflows#have-claude-write-a-workflow
lines:
  - "Own words (“use a workflow to …”) or the word ultracode. This task only."
  - "/effort ultracode: very high effort, a workflow per big task, all session."
  - "On Pro: workflow size small, try one folder first, stop a run in /workflows."
---

<G29WorkflowStart />

---
layout: code-live
heading: "Describe the fan-out"
filePath: "prompt to Claude Code — Claude writes the .js script from this"
success: "The prompt names discovery, parallel review, a refuter gate, and quarantine."
---

```txt
Write a dynamic workflow that audits every file in app/actions/ for
missing ownership checks on mutations of existing rows.

Phase 1 — discover every file in app/actions/.
Phase 2 — review each file independently in parallel, reporting
  suspected findings with file, function, and reasoning.
Phase 3 — for every finding, spawn a separate agent to try to refute
  it using only the code, not the original finding's reasoning. Drop
  any finding that doesn't survive.

⟵ LIVE: add the quarantine rule before sending. CLASH is full of
        user-supplied titles and bios. Agents that read untrusted content
        should not also hold write or delete tool access.
```

---
layout: concept
heading: "One script, many agents"
---

<G09WorkflowFanout />

---
layout: concept
heading: "Phases: the plan you can watch"
routeAlias: theory-workflow-phases
docs: https://code.claude.com/docs/en/workflows#watch-the-run
lines:
  - "phase('Review') groups the agents that follow under one title."
  - "The same titles in meta.phases. /workflows shows agents and tokens per phase."
  - "parallel() waits for all. pipeline() runs one agent per item in a list."
---

<G27WorkflowPhases />

---
layout: code-live
heading: "Read the generated script"
filePath: "~/.claude/projects/<session>/ … then .claude/workflows/ after pressing s"
success: "The group can point at the meta export, name one phase, and explain what the refuter agents are for."
---

```js
export const meta = { name: 'audit-actions', description: 'Fan-out audit with a refuter gate',
  phases: [{ title: 'Discover' }, { title: 'Review' }, { title: 'Verify' }] }

// ⟵ LIVE: read whatever Claude actually generated. Walk phase by phase:
// discovery → parallel review → refuter → converge. Do not pre-write this.
phase('Discover')
const found = await agent(/* list every file in app/actions/ */, { schema: filesSchema })
phase('Review')
const findings = await pipeline(found.files,
  file => agent(/* review prompt for `file` */, { label: file }))
phase('Verify')
const verified = await parallel(findings.flat().map(f => () =>
  agent(/* refute `f` using only the code */)))
return { verified: verified.filter(Boolean) }
```

---
layout: concept
heading: "Which pattern did we just run?"
lines:
  - "Team: lead and long-lived peers fit. Peer messages and mediation are extra."
  - "Auditor: main hands one subagent the job and gets a summary back."
  - "Workflow: a script orchestrates. Refuters drop a failed finding, no retry."
---

<div class="grid grid-cols-3 gap-4 w-full max-w-4xl">
  <div class="na-card p-4 text-center" v-click><div class="text-sm" style="color: var(--na-fg-muted)">Task 08 auditor</div><div class="font-semibold mt-1">Orchestrator-subagent</div><div class="text-sm mt-1" style="color: var(--na-accent-500)">exact fit</div></div>
  <div class="na-card p-4 text-center" v-click style="border-color: var(--na-accent-500)"><div class="text-sm" style="color: var(--na-fg-muted)">Task 12 agent team</div><div class="font-semibold mt-1">The blog's agent teams</div><div class="text-sm mt-1" style="color: var(--na-accent-500)">partial fit</div></div>
  <div class="na-card p-4 text-center" v-click><div class="text-sm" style="color: var(--na-fg-muted)">Task 12 workflow</div><div class="font-semibold mt-1">Orchestrator-subagent + verifier</div><div class="text-sm mt-1" style="color: var(--na-accent-500)">partial fit</div></div>
</div>

---
layout: concept
heading: "Reconcile, decide, merge"
routeAlias: theory-reconcile
---

<G10OrchestrationLadder />



---
layout: concept
heading: "Pick the parallelism primitive"
lines:
  - "Noisy read → subagent · talking peers → team · repeatable fan-out → workflow"
  - "Independent edits → worktrees · many separable changes → /batch"
---

<div class="grid grid-cols-2 gap-3 w-full max-w-4xl text-sm">
  <div class="na-card p-3"><span class="font-semibold">subagent</span><span style="color: var(--na-fg-muted)"> — isolate noisy investigation</span></div>
  <div class="na-card p-3"><span class="font-semibold">team</span><span style="color: var(--na-fg-muted)"> — long-lived peers must communicate</span></div>
  <div class="na-card p-3" v-click><span class="font-semibold">workflow</span><span style="color: var(--na-fg-muted)"> — repeatable fan-out / verify / converge</span></div>
  <div class="na-card p-3" v-click><span class="font-semibold">worktree</span><span style="color: var(--na-fg-muted)"> — independent code changes without collisions</span></div>
  <div class="na-card p-3 col-span-2" v-click><span class="font-semibold">/batch</span><span style="color: var(--na-fg-muted)"> — many separable units, each ending as a tested pull request</span></div>
</div>

---
layout: task
number: "12"
heading: "Team and workflow audit"
goal: "Run the audit as an agent team and as a dynamic workflow, read the generated script, and merge the fix."
mode: "watch first"
success: "The workflow confirms exactly deleteClash and deleteVenue, you read the generated script, and the fix is merged with green gates."
branch: "12-start"
---
