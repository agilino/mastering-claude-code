---
layout: section
heading: "Control the context"
---

<template #map>
  <JourneyMap current="control" />
</template>

<!--
Part III starts here. From now on everyone works on the reference CLASH: `git checkout 06-start`.
Say it once, clearly: you are not building any more, you are controlling. Three tasks: context,
skills, subagents. Each one is a different way of deciding what enters the window.
-->

---
layout: concept
heading: "Seven tools, one constraint"
lines:
  - "We build every row of this table, in this order, on one codebase."
---

<ToolkitMap reveal-rows />

<!--
Before the territory, the map. Walk the seven rows top to bottom. Context is always on; it is the
constraint everything else works around. Skill for repeatable work you keep re-explaining. Subagent
for noisy work that would pollute your thread. Agent team when workers need to talk to each other.
Workflow when the fan-out is bigger than one conversation can steer. Hook when a rule must hold
whether or not the agent agrees. MCP when the agent needs to reach outside the repo.
Leave it up. It comes back on every divider with the current row highlighted.
-->

---
layout: section
heading: "Context"
---

<template #map>
  <ToolkitMap current="context" />
</template>

<!--
Divider. Context row highlighted. "We start here because it is the row that is always in play."
Keep the beat short.
-->

---
layout: concept
heading: "/context is an instrument"
lines:
  - "Read it: system prompt, CLAUDE.md, skills, tool results, conversation."
  - "Come back to it after every big step."
---

<G02ContextBudget />

<!--
Run `/context` live on a fresh session in the reference CLASH. Read the lines aloud. Do not
summarize; let people hear the real numbers. Say: we come back to this same command after every
task from now on. The diagram is the same picture the command draws in text.
-->

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

<!--
Open both files live so people see this is the whole content. Say plainly: there is nothing to
trim. The exercise is writing a good context file from nothing, grounded in real rules. That is
the harder and more useful skill. Most repos you touch look like this: nothing, or nearly nothing.
-->

---
layout: concept
heading: "The shape underneath the rules"
---

<G13ClashArchitecture />

<!--
Before writing a single rule, show the shape. Reads: browser → page → helper in lib/data → Prisma →
SQLite. Writes: client → Server Action in app/actions → requireUser() plus an ownership check →
Prisma → revalidatePath back to the page. Point at the auth-check node. It is highlighted on
purpose. Task 08 spends a long time on that node being missing in two places. Plant it now.
-->

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

<!--
FULL WORKING SOLUTION (trainer only — do not show before people write their own):
workshop-artifacts/06-context-and-claude-md/CLAUDE.md in the workshop repository.

The six rules: reads in lib/data/*; writes in app/actions/* and every action re-checks
authorization itself (a Server Action is a public POST endpoint with a generated id; the layout
guard protects the page, not the action); lib/validation.ts is the only place for Zod schemas;
Prisma client generated to lib/generated/prisma; status fields are strings with values in
lib/constants.ts; Next 16 params and searchParams are Promises.

While building it: point at the exact line in app/actions/clashes.ts with the ownership check.
Show `if (clash.creatorId !== user.id)` on screen. If a draft is mostly prose and vibes, push
back: "could a hook enforce this? If not, is it a rule or a preference?" That seeds task 10.
-->

---
layout: concept
heading: "@-references beat grep-and-guess"
---

<G03CarelessVsEngineered />

<!--
Left: Claude reading forty files it found by grepping around, guessing at a model that does not
exist yet. Right: you tell it exactly where to look with @-references and plan mode. Say it
plainly: the difference between the two columns is not a smarter model. It is the same model,
pointed on purpose.
-->

---
layout: concept
heading: "Plan mode: review first"
lines:
  - "Task: real-time notifications for CLASH."
  - "Claude proposes. You review. Nothing is touched."
  - "Ships: docs/plans/realtime-notifications.md"
---

<!--
Switch into plan mode live (Shift+Tab until it says plan) and describe the next feature: real-time
notifications. Currently they load on render via getNotifications and getUnreadCount in
lib/data/notifications.ts. "Don't write any code yet. Propose an approach and the files it
touches." Read the plan together, out loud. Then save it to docs/plans/realtime-notifications.md.
Plan mode is documented under permission modes.
-->

---
layout: concept
heading: "/skill-doctor: what it costs"
lines:
  - "CLASH ships nine vendored skills in .agents/skills/"
  - "Two are ~100 KB near-duplicates, scanned every session."
---

<!--
Run /skill-doctor live. This is where the "wasted context" story lives now: not in a bloated
CLAUDE.md (there is none) but in .agents/skills/react-best-practices and
.agents/skills/vercel-react-best-practices. Two real, near-duplicate rule sets, each about
100 KB. Show the two folders side by side. The overlap is obvious on sight.
-->

---
layout: task
number: "06"
heading: "Context and CLAUDE.md"
goal: "Write CLAUDE.md from nothing around six real rules, then get a reviewed plan for real-time notifications before any code."
mode: "you do"
success: "CLAUDE.md states the six rules in your words, and the notifications plan was reviewed in plan mode."
branch: "06-start"
---

<!--
Task slide. Say the reset branch and where the task file is. Everything here is pulled from
tasks/06-context-and-claude-md.md; do not paraphrase the check list differently.
-->
