---
layout: section
heading: "Control the context"
---

<template #map>
  <JourneyMap current="control" />
</template>

---
layout: concept
heading: "Seven tools, one constraint"
lines:
  - "We build every row of this table, in this order, on one codebase."
---

<ToolkitMap reveal-rows />

---
layout: section
heading: "Context"
---

<template #map>
  <ToolkitMap current="context" />
</template>

---
layout: concept
heading: "/context is an instrument"
docs: https://code.claude.com/docs/en/context-window
lines:
  - "Read it: system prompt, CLAUDE.md, skills, tool results, conversation."
  - "Come back to it after every big step."
---

<G02ContextBudget />

---
layout: concept
heading: "Budget, or dumping ground?"
lines:
  - "CLAUDE.md is 11 bytes: @AGENTS.md"
  - "AGENTS.md is a generic Next.js warning. Nothing about this app."
  - "There is nothing to trim. We write from nothing."
---

<div class="na-card p-6 font-mono text-sm w-full" style="color: var(--na-fg-muted)">
  <div class="mb-1" style="color: var(--na-fg)">CLAUDE.md</div>
  <div class="mb-4">@AGENTS.md</div>
  <div class="mb-1" style="color: var(--na-fg)">AGENTS.md</div>
  <div>&lt;!-- BEGIN:nextjs-agent-rules --&gt;<br/># This is NOT the Next.js you know<br/>…</div>
</div>

---
layout: concept
heading: "The shape underneath the rules"
---

<G13ClashArchitecture />

---
layout: code-live
heading: "CLAUDE.md from real rules"
filePath: "CLAUDE.md"
success: "Every rule points at a real file or behavior in CLASH, not a guess."
---

```md
# CLASH — agent instructions

A geospatial social platform for spontaneous meetups across Berlin.
Next.js 16 (App Router) · React 19 · Prisma 7 + SQLite · Tailwind v4 · shadcn/ui · Leaflet.

@AGENTS.md

## Architecture invariants

⟵ LIVE: @-reference app/actions/clashes.ts, lib/data/clashes.ts,
     lib/validation.ts, app/(app)/layout.tsx and prisma/schema.prisma.
     Draft the six rules from what Claude actually finds there.
```

---
layout: concept
heading: "@-references beat grep-and-guess"
---

<G03CarelessVsEngineered />

---
layout: concept
heading: "Plan mode: review first"
docs: https://code.claude.com/docs/en/permission-modes
lines:
  - "Task: real-time notifications for CLASH."
  - "Claude proposes. You review. Nothing is touched."
  - "Ships: docs/plans/realtime-notifications.md"
---

---
layout: concept
heading: "A reviewed plan is not a guarantee"
lines:
  - "The plan can include things you never asked for."
  - "Read it line by line — don't just skim for the feature you expected."
---


---
layout: concept
heading: "/skill-doctor: what it costs"
lines:
  - "CLASH ships nine vendored skills in .agents/skills/"
  - "Two ~100 KB near-duplicates — only their descriptions scan every session."
---


---
layout: task
number: "06"
heading: "Context and CLAUDE.md"
goal: "Write CLAUDE.md from nothing around six real rules, then get a reviewed plan for real-time notifications before any code."
mode: "you do"
success: "CLAUDE.md states the six rules in your words, and the notifications plan was reviewed in plan mode."
branch: "06-start"
---


