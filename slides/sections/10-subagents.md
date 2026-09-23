---
layout: section
heading: "Subagents"
---

<template #map>
  <ToolkitMap current="subagent" />
</template>

---
layout: task-intro
number: "08"
routeAlias: task-08
heading: "Task 08 — Subagent audit"
branch: "08-start"
learn:
  - "Spin up a subagent, its own context window"
  - "Write a falsifiable brief, not 'find bugs'"
  - "Restrict a subagent's tools to Read, Grep, Glob"
  - "Tell a fork from a fresh subagent"
outcome:
  - "A security-auditor subagent in .claude/agents/"
  - "Two real findings: deleteClash, deleteVenue"
  - "Your own /context barely moved"
---

---
layout: code-live
heading: "Page guard, action guard?"
filePath: "app/(app)/layout.tsx (excerpt)"
success: "The group can say, unprompted, that a Server Action is a public POST endpoint with a generated id."
---

```tsx
import { requireUser } from "@/lib/auth";

export default async function AppLayout({ children }: { children: ReactNode }) {
  const user = await requireUser();
  // ⟵ LIVE: this guards every page under (app). Now open any file in
  // app/actions/ and ask: does this guard protect the action too?
  const [notifications, unreadCount] = await Promise.all([
    getNotifications(user.id),
    getUnreadCount(user.id),
  ]);
  // … sidebar, top bar, children
}
```

---
layout: concept
heading: "The attack surface"
routeAlias: theory-attack-surface
---

<G14AttackSurface />

---
layout: concept
heading: "Find it"
lines:
  - "Which actions let a user change someone else's clash?"
  - "Two actions. This branch seeds a real, findable flaw."
---


---
layout: code-live
heading: "The auditor subagent"
routeAlias: theory-auditor-subagent
filePath: ".claude/agents/security-auditor.md"
success: "The brief names one falsifiable check: ownership on mutation of an existing row. Not 'find security bugs'."
---

```md
---
name: security-auditor
description: >
  Audit Server Actions in app/actions/ for missing ownership checks on
  mutations of existing rows. Use when reviewing authorization in CLASH.
tools: Read, Grep, Glob
---

⟵ LIVE: write the brief as a property that can be true or false.
     For every exported Server Action that mutates an EXISTING row: does
     the code check that the current user owns it before mutating, not
     just that requireUser() ran? Report file, function, PASS/FAIL and
     the exact deciding line.
```

---
layout: concept
heading: "Agent, subagent, fork: which is which"
routeAlias: theory-agent-subagent-fork
lines:
  - "Agent: one running loop. Your session is main."
  - "Subagent: a loop main starts, in its own context."
  - "Fork: a subagent that starts as a copy of your chat."
---

<G24AgentPanel />

---
layout: concept
heading: "Two ways to isolate"
routeAlias: theory-subagents
docs: https://code.claude.com/docs/en/sub-agents
lines:
  - "Run /tasks to see every subagent and fork this session has running."
---

<div class="grid grid-cols-2 gap-8 w-full">
  <G06SubagentIsolation />
  <G07ForkVsFresh />
</div>

---
layout: concept
heading: "Six agents ship with Claude Code"
lines:
  - "Explore, Plan, general-purpose — the ones you will meet most."
  - "claude, statusline-setup, claude-code-guide round out the six."
---

<div class="grid grid-cols-3 gap-3 w-full max-w-4xl">
  <div class="na-card p-4" style="border-color: var(--na-accent-500)"><div class="font-semibold mb-1">Explore</div><div class="text-sm" style="color: var(--na-fg-muted)">fast, read-only search</div></div>
  <div class="na-card p-4" v-click style="border-color: var(--na-accent-500)"><div class="font-semibold mb-1">Plan</div><div class="text-sm" style="color: var(--na-fg-muted)">research before a plan</div></div>
  <div class="na-card p-4" v-click style="border-color: var(--na-accent-500)"><div class="font-semibold mb-1">general-purpose</div><div class="text-sm" style="color: var(--na-fg-muted)">exploration and action</div></div>
  <div class="na-card p-4" v-click><div class="font-semibold mb-1">claude</div><div class="text-sm" style="color: var(--na-fg-muted)">catch-all, every tool</div></div>
  <div class="na-card p-4" v-click><div class="font-semibold mb-1">statusline-setup</div><div class="text-sm" style="color: var(--na-fg-muted)">for /statusline</div></div>
  <div class="na-card p-4" v-click><div class="font-semibold mb-1">claude-code-guide</div><div class="text-sm" style="color: var(--na-fg-muted)">questions about Claude Code itself</div></div>
</div>

---
layout: concept
heading: "Or install one that exists"
docs: https://github.com/OWASP/secure-agent-playbook
lines:
  - "A plugin from OWASP: 5 subagents and 11 skills, one install."
  - "Only sca-audit and dependency-auditor are about CVEs."
  - "A plugin can ship hooks too. Read what you install."
---

<div class="flex flex-col gap-3 w-full max-w-3xl">
  <div class="na-card px-5 py-3"><span class="font-mono text-sm" style="color: var(--na-accent-500)">/plugin marketplace add OWASP/secure-agent-playbook</span></div>
  <div class="na-card px-5 py-3" v-click><span class="font-mono text-sm" style="color: var(--na-accent-500)">/plugin install code-security-skills@agent-security-playbook</span></div>
</div>

---
layout: concept
heading: "One subagent, or read it yourself?"
---

<G03CarelessVsEngineered
  :careless="['one prompt: read every file in app/actions/ yourself', 'every action file lands in the main thread', 'your own /context climbs with every file', 'a wall of prose back, nothing falsifiable']"
  :engineered="['a security-auditor subagent: Read, Grep, Glob', 'one falsifiable brief: PASS or FAIL, cited line', 'the reads happen in its window, not yours', 'your own /context barely moves']"
  :careless-pct="50"
  :engineered-pct="5"
  closing-line="Same audit, same two bugs. The difference is whose context window fills up."
/>

---
layout: task
number: "08"
heading: "Subagent audit"
goal: "Run one isolated auditor subagent over the actions and watch your own context barely move."
mode: "you do"
success: "The subagent flags exactly deleteClash and deleteVenue, and nothing else."
branch: "08-start"
---


