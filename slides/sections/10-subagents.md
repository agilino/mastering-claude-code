---
layout: section
heading: "Subagents"
---

<template #map>
  <ToolkitMap current="subagent" />
</template>

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
heading: "Two ways to isolate"
routeAlias: theory-subagents
docs: https://code.claude.com/docs/en/sub-agents
---

<div class="grid grid-cols-2 gap-8 w-full">
  <G06SubagentIsolation />
  <G07ForkVsFresh />
</div>

---
layout: task
number: "08"
routeAlias: task-08
heading: "Subagent audit"
goal: "Run one isolated auditor subagent over the actions and watch your own context barely move."
mode: "you do"
success: "The subagent flags exactly deleteClash and deleteVenue, and nothing else."
branch: "08-start"
---


