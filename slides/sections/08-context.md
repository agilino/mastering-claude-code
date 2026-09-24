---
layout: section
heading: "Control the context"
---

<template #map>
  <JourneyMap current="control" />
</template>

---
layout: concept
heading: "Eight tools, one constraint"
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
layout: task-intro
number: "06"
routeAlias: task-06
heading: "Task 06 — Context and CLAUDE.md"
branch: "06-start"
learn:
  - "Read /context, write CLAUDE.md from grounded rules"
  - "Point Claude with @-references, not grep-and-guess"
  - "Review a plan before any code moves"
  - "Separate project context from personal defaults"
outcome:
  - "CLAUDE.md: six grounded rules, from nothing"
  - "A reviewed plan: docs/plans/realtime-notifications.md"
  - "A measured /context baseline before and after"
  - "A personal rule in ~/.claude/rules/"
---

---
layout: concept
heading: "/context is an instrument"
routeAlias: theory-context-instrument
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
heading: "Plan mode: review first"
routeAlias: theory-plan-review
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
heading: "CLAUDE.md files add up, they don't compete"
docs: https://code.claude.com/docs/en/memory
lines:
  - "Every CLAUDE.md above your working directory loads — none of them wins."
  - "A contradiction? Claude picks one arbitrarily. Keep your rules consistent."
---

<G22MemoryConcatenation />

---
layout: concept
heading: "Personal rules follow you"
lines:
  - "~/.claude/rules/ is for defaults that follow you across projects."
  - "Project invariants stay in CLAUDE.md. Path rules come in task 10."
---

<div class="grid grid-cols-2 gap-6 w-full max-w-3xl">
  <div class="na-card p-5"><div class="font-mono font-semibold mb-2">~/.claude/rules/</div><div class="text-sm" style="color: var(--na-fg-muted)">your defaults · every project</div></div>
  <div class="na-card p-5" v-click><div class="font-mono font-semibold mb-2">CLAUDE.md</div><div class="text-sm" style="color: var(--na-fg-muted)">this project's invariants</div></div>
</div>

---
layout: concept
heading: "@-references beat grep-and-guess"
---

<G03CarelessVsEngineered />

---
layout: task
number: "06"
heading: "Context and CLAUDE.md"
goal: "Write CLAUDE.md from nothing around six real rules, then get a reviewed plan for real-time notifications before any code."
mode: "you do"
success: "CLAUDE.md states the six rules in your words, and the notifications plan was reviewed in plan mode."
branch: "06-start"
---
