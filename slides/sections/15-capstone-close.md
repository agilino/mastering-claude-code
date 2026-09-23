---
layout: task-intro
number: "14"
routeAlias: task-14
heading: "Task 14 — Capstone"
branch: "14-start"
learn:
  - "Build the feature with the clash-feature skill"
  - "Verify with a subagent review, a real browser check"
  - "Hooks gate the work automatically"
  - "Claude drafts the pull request; you edit it"
outcome:
  - "One of three briefs, shipped end to end"
  - "A pull request on the reference CLASH"
  - "Every gate green: types, lint, build"
  - "A /context reading, explained start to finish"
---

---
layout: task
number: "14"
heading: "Capstone"
goal: "Pick one brief and ship it as a pull request using every tool from this workshop."
mode: "you do"
success: "Every box on the capstone checklist is ticked and the PR description was written by Claude and edited by you."
branch: "14-start"
---


---
layout: concept
heading: "Security: three rules"
routeAlias: theory-security-rules
lines:
  - "Anything a model reads can be an instruction."
  - "Quarantine: readers of untrusted text cannot write."
  - "Least privilege: the smallest tool list that works."
---


---
layout: concept
heading: "Spec Kit: six steps, one constitution"
lines:
  - "specify init sets up a new project with the whole command set."
  - "Six steps: constitution, specify, plan, tasks, implement, converge."
---

<div class="flex flex-wrap gap-3 w-full max-w-4xl justify-center">
  <div class="na-card px-4 py-3 text-sm font-mono">/speckit-constitution</div>
  <div class="na-card px-4 py-3 text-sm font-mono" v-click>/speckit-specify</div>
  <div class="na-card px-4 py-3 text-sm font-mono" v-click>/speckit-plan</div>
  <div class="na-card px-4 py-3 text-sm font-mono" v-click>/speckit-tasks</div>
  <div class="na-card px-4 py-3 text-sm font-mono" v-click>/speckit-implement</div>
  <div class="na-card px-4 py-3 text-sm font-mono" v-click style="border-color: var(--na-accent-500)">/speckit-converge</div>
</div>
<div class="text-base mt-6 max-w-2xl text-center" style="color: var(--na-fg-muted)" v-click>
  The constitution runs once: principles for code quality, testing and maintainability that every later step reads.
</div>

---
layout: concept
heading: "BMAD: five agents, one Party Mode"
lines:
  - "Analyst, PM, Architect, Developer, UX — five agents, installed as a skill."
  - "Party Mode puts them all in one conversation, arguing in character."
---

<div class="grid grid-cols-5 gap-2 w-full max-w-4xl">
  <div class="na-card p-3 text-center"><div class="font-semibold text-sm">Analyst</div><div class="text-xs" style="color: var(--na-fg-muted)">Mary</div></div>
  <div class="na-card p-3 text-center" v-click><div class="font-semibold text-sm">PM</div><div class="text-xs" style="color: var(--na-fg-muted)">John</div></div>
  <div class="na-card p-3 text-center" v-click><div class="font-semibold text-sm">Architect</div><div class="text-xs" style="color: var(--na-fg-muted)">Winston</div></div>
  <div class="na-card p-3 text-center" v-click><div class="font-semibold text-sm">Developer</div><div class="text-xs" style="color: var(--na-fg-muted)">Amelia</div></div>
  <div class="na-card p-3 text-center" v-click><div class="font-semibold text-sm">UX</div><div class="text-xs" style="color: var(--na-fg-muted)">Sally</div></div>
</div>
<div class="text-base mt-6 max-w-2xl text-center" style="color: var(--na-fg-muted)" v-click>
  <span class="font-mono" style="color: var(--na-accent-500)">/bmad-party-mode</span> — for a decision with a real tradeoff, not a routine step.
</div>

---
layout: concept
heading: "Spec Kit vs BMAD"
lines:
  - "Spec Kit: low ceremony, agent-agnostic, a Python/uv tool."
  - "BMAD v6: five named agents, heavyweight, maps onto roles you already have."
  - "Both are greenfield methods. CLASH is brownfield."
---

<G20SpecKitVsBmad />

---
layout: concept
heading: "What we did not cover"
lines:
  - "/loop, routines, output styles"
  - "/background and claude agents, plus building your own MCP server"
---


---
layout: concept
heading: "Context is king. You push it, you own it."
routeAlias: theory-context-is-king
---


