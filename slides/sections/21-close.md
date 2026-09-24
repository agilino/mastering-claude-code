---
layout: concept
heading: "Three levers, one responsibility"
lines:
  - "Context decides what the agent knows. Reasoning decides how hard it thinks."
  - "Evidence decides when you should trust the result."
---

<div class="grid grid-cols-3 gap-5 w-full max-w-4xl text-center">
  <div class="na-card p-5"><div class="font-semibold">Context</div><div class="text-sm mt-2" style="color: var(--na-fg-muted)">right information</div></div>
  <div class="na-card p-5" v-click><div class="font-semibold">Reasoning</div><div class="text-sm mt-2" style="color: var(--na-fg-muted)">right effort</div></div>
  <div class="na-card p-5" v-click><div class="font-semibold">Evidence</div><div class="text-sm mt-2" style="color: var(--na-fg-muted)">right proof</div></div>
</div>

---
layout: concept
heading: "Autonomy is earned by verification"
lines:
  - "More freedom needs stronger evidence, isolation and limits."
  - "Do not scale autonomy beyond your ability to detect and contain errors."
---

<div class="flex items-end gap-4 w-full max-w-4xl justify-center text-sm">
  <div class="na-card px-4 py-3">you watch</div>
  <div class="na-card px-4 py-5" v-click>goal + gates</div>
  <div class="na-card px-4 py-7" v-click>isolated agents</div>
  <div class="na-card px-4 py-9" v-click>background / batch</div>
  <div class="na-card px-4 py-11" v-click>CI / routine</div>
</div>

---
layout: concept
heading: "Context is king. You push it, you own it."
routeAlias: theory-context-is-king
---


---
layout: section
heading: "Further paths"
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
docs: https://github.com/bmad-code-org/bmad-method
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
<div class="text-base mt-3 max-w-2xl text-center" style="color: var(--na-fg-muted)" v-click>
  <span class="font-mono" style="color: var(--na-accent-500)">bmad-build</span> — intent, plan, spec, code, review: <a href="https://docs.bmad-method.org/build/build-a-change/#run-bmad-build" target="_blank" rel="noopener" style="color: var(--na-accent-500)">run bmad-build</a>
</div>

---
layout: concept
heading: "Spec Kit vs BMAD"
lines:
  - "Spec Kit: low ceremony, agent-agnostic, a Python/uv tool."
  - "BMAD v6: five named agents, heavyweight, maps onto roles you already have."
  - "Both shine on greenfield, but not only there. CLASH is both."
---

<G20SpecKitVsBmad />

---
layout: concept
heading: "What we did not cover"
lines:
  - "Channels: events pushed into a running session"
  - "Computer use: Claude clicks native apps"
---
