---
layout: section
heading: "Orchestrate and let go"
---

<template #map>
  <JourneyMap current="orchestrate" />
</template>

---
layout: section
heading: "Strategy two: agent teams"
---

<template #map>
  <ToolkitMap current="team" />
</template>

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
---

<G08TeamTopology />

---
layout: section
heading: "Strategy three: dynamic workflows"
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
layout: code-live
heading: "Read the generated script"
filePath: "~/.claude/projects/<session>/ … then .claude/workflows/ after pressing s"
success: "The group can point at the meta export, name one phase, and explain what the refuter agents are for."
---

```js
export const meta = { name: 'audit-actions', description: 'Fan-out audit with a refuter gate' }

// ⟵ LIVE: read whatever Claude actually generated. Walk phase by phase:
// discovery → parallel review → refuter → converge. Do not pre-write this.

const findings = await pipeline(actionFiles,
  file => agent(/* review prompt for `file` */, { phase: 'Review' }))

const verified = await parallel(findings.flat().map(f => () =>
  agent(/* refute `f` using only the code */, { phase: 'Verify' })))

return { verified: verified.filter(Boolean) }
```

---
layout: concept
heading: "Reconcile, decide, merge"
---

<G10OrchestrationLadder />

---
layout: task
number: "09"
heading: "Team and workflow audit"
goal: "Run the audit as an agent team and as a dynamic workflow, read the generated script, and merge the fix."
mode: "watch first"
success: "The workflow confirms exactly deleteClash and deleteVenue, you read the generated script, and the fix is merged with green gates."
branch: "09-start"
---


