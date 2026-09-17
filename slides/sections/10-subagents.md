---
layout: section
heading: "Subagents"
---

<template #map>
  <ToolkitMap current="subagent" />
</template>

<!--
Divider, Subagent row. This is strategy one of three on one problem. Say it plainly: "one
problem, three strategies. Today the first. Next part, the other two."
-->

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

<!--
Do not skip this. Many strong React developers do not know it, and if it does not land, the rest of
this part is people watching agents audit something they do not understand the danger of.

Open the real file. Show requireUser() guarding the page. Open app/actions/clashes.ts. Ask the
question directly. It does not. A Server Action compiles to a public POST endpoint with a
generated id. Anyone with a session cookie can call any action directly, with any arguments,
without loading the page. Authorization must be re-established inside every action. Zod checks
shape, not permission.
-->

---
layout: concept
heading: "The attack surface"
---

<G14AttackSurface />

<!--
The centrepiece graphic. Left: the safe-looking path, browser → guarded page → requireUser() →
button → action. Right: the bypass, a direct POST to the action's generated id, arriving at the
same Server Action, never having loaded the guarded page. Close on: "Zod validates shape, not
permission."
-->

---
layout: concept
heading: "Find it"
lines:
  - "Which actions let a user change someone else's clash?"
  - "Two actions. This branch seeds a real, findable flaw."
---

<!--
Say the correction out loud before anyone starts: the public CLASH main branch has NO missing
checks. All 18 exported actions are guarded. The flaw is seeded on 08-start: the ownership check
was removed from deleteClash (app/actions/clashes.ts) and deleteVenue (app/actions/venues.ts).
Workshop content, not a CLASH bug. Answer key: workshop-artifacts/09-team-and-workflow-audit/AUTH-FIX.md.

A tell for a sharp auditor: npm run lint on 08-start reports an unused `user` variable in
deleteVenue. The guard that used it is gone. Green gates do not mean safe code.
-->

---
layout: code-live
heading: "The auditor subagent"
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

<!--
FULL WORKING SOLUTION (trainer only): the body is in tasks/08-subagent-audit.md step 4.

Talking points: the tools: line matters. Read, Grep, Glob only. This agent reads and reports; it
does not fix. Narrowing tools is itself a control. Contrast the brief with a vague "find security
bugs": a falsifiable property is what makes the report checkable instead of a wall of prose.
-->

---
layout: concept
heading: "Two ways to isolate"
---

<div class="grid grid-cols-2 gap-8 w-full">
  <G06SubagentIsolation />
  <G07ForkVsFresh />
</div>

<!--
Left: the subagent's own window fills with noisy tool calls; only a thin summary crosses back. That
is why the main thread barely moves.

Right: fork versus fresh. A fork branches off the parent and inherits the whole conversation and
the parent's prompt cache, so it is cheap when the shared context is really needed. A fresh
subagent starts cold: no history, filtered tools, no cache, so the first call costs more. Fork is
on by default in interactive sessions, off under -p and the Agent SDK. Neither is better. Know
which one you invoked and why.
-->

---
layout: task
number: "08"
heading: "Subagent audit"
goal: "Run one isolated auditor subagent over the actions and watch your own context barely move."
mode: "you do"
success: "The subagent flags exactly deleteClash and deleteVenue, and nothing else."
branch: "08-start"
---

<!--
Note the /context reading before launching. Launch one subagent with the narrow brief. Let it
read every file in app/actions/. Then read /context again: it moved only slightly. That IS the
point. The part ends on a cliffhanger: two findings, not fixed yet. Part IV fixes them.
-->
