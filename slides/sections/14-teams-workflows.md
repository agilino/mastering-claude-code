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
layout: concept
heading: "Generator-verifier: make, then check"
routeAlias: theory-coordination-patterns
lines:
  - "One agent makes an output. A second checks it against clear criteria."
  - "Use it when a wrong output costs more than one more try."
  - "Vague criteria let everything pass. A loop can stall, so cap the rounds."
---

<G28CoordinationPatterns pattern="generator-verifier" />

---
layout: concept
heading: "Orchestrator-subagent: lead, helpers"
lines:
  - "A lead plans, hands out subtasks, and merges what the helpers report back."
  - "Use it when the job splits cleanly and the parts barely depend on each other."
  - "Every finding goes through the lead. Details often get lost on the way."
---

<G28CoordinationPatterns pattern="orchestrator-subagent" />

---
layout: concept
heading: "The blog's agent teams: a task queue"
lines:
  - "A coordinator fills a task queue. Long-lived workers claim tasks on their own."
  - "Use it when the parts are independent and each needs many steps of work."
  - "Workers can't easily share findings. Two may edit the same file."
---

<G28CoordinationPatterns pattern="agent-teams" />

---
layout: concept
heading: "Message bus: publish and subscribe"
lines:
  - "Agents publish events to a bus. Each one subscribes to the topics it needs."
  - "Use it when events drive the work and new agents keep joining."
  - "Hard to trace. A wrongly routed event fails silently."
---

<G28CoordinationPatterns pattern="message-bus" />

---
layout: concept
heading: "Shared state: one store, no coordinator"
lines:
  - "Agents read and write one shared store: a database, files, a document."
  - "Use it when agents should build on each other's findings right away."
  - "Agents may repeat work or keep replying to each other. Set a stop rule."
---

<G28CoordinationPatterns pattern="shared-state" />

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
layout: task
number: "12"
heading: "Team and workflow audit"
goal: "Run the audit as an agent team and as a dynamic workflow, read the generated script, and merge the fix."
mode: "watch first"
success: "The workflow confirms exactly deleteClash and deleteVenue, you read the generated script, and the fix is merged with green gates."
branch: "12-start"
---


