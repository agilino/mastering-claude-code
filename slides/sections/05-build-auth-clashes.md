---
layout: concept
heading: "Small steps beat big asks"
lines:
  - "One feature per message. One message per thing you can check."
  - "Big ask: build the app. Small step: build login."
  - "Each step ends with something you can click."
---

<svg viewBox="0 0 960 220" class="w-full max-w-4xl h-auto" role="img" aria-label="small steps">
  <g v-click="1">
    <rect x="40" y="40" width="880" height="50" rx="8" fill="var(--na-zinc-800)" stroke="var(--na-error-500)" stroke-width="2" />
    <text x="480" y="72" text-anchor="middle" fill="var(--na-fg)" style="font-size:17px">"Build auth, the shell, and clashes."   →   40 files, nothing to click for a long time</text>
  </g>
  <g v-click="2">
    <rect x="40" y="130" width="270" height="50" rx="8" fill="var(--na-primary-900)" stroke="var(--na-primary-500)" stroke-width="2" />
    <text x="175" y="162" text-anchor="middle" fill="var(--na-fg)" style="font-size:17px">login</text>
    <rect x="345" y="130" width="270" height="50" rx="8" fill="var(--na-primary-900)" stroke="var(--na-primary-500)" stroke-width="2" />
    <text x="480" y="162" text-anchor="middle" fill="var(--na-fg)" style="font-size:17px">shell</text>
    <rect x="650" y="130" width="270" height="50" rx="8" fill="var(--na-primary-900)" stroke="var(--na-primary-500)" stroke-width="2" />
    <text x="785" y="162" text-anchor="middle" fill="var(--na-fg)" style="font-size:17px">clashes</text>
    <text x="480" y="208" text-anchor="middle" fill="var(--na-fg-muted)" style="font-size:15px">check · commit · next</text>
  </g>
</svg>

---
layout: concept
heading: "Undo a step: /rewind"
lines:
  - "Claude saves a checkpoint before every prompt"
  - "/rewind shows them — pick one, files go back"
  - "Then give a better instruction. Cheaper than by hand."
---


---
layout: concept
heading: "Watch the window fill"
lines:
  - "/context — what is in the window right now"
  - "Every file Claude read is still there"
  - "/compact keeps a summary and drops the rest"
---

<G02ContextBudget />

---
layout: concept
heading: "Point, don't let it guess"
---

<G03CarelessVsEngineered />

---
layout: code-live
heading: "The safety moment"
filePath: "prompt to Claude Code — after clashes work"
success: "Claude explains that the layout guards the page and not the action, and the ownership rule lands in CLAUDE.md."
---

```txt
requireUser() runs in app/(app)/layout.tsx.
Does that protect the deleteClash action in app/actions/clashes.ts
from being called by someone who is not the creator?

⟵ LIVE: ask for the explanation first. Then, in a second message,
        ask for the fix and the CLAUDE.md rule.
```

---
layout: task
number: "03"
routeAlias: task-03
heading: "Auth and clashes"
goal: "Build login and the app shell in small steps, then clashes end to end, and make the ownership rule permanent."
mode: "you do"
success: "Login, logout and clash CRUD work, deleteClash refuses a stranger, and you used /rewind, /context and /compact."
branch: "03-start"
---


