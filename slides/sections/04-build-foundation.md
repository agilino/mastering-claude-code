---
layout: section
heading: "Build CLASH"
---

<template #map>
  <JourneyMap current="build" />
</template>

---
layout: concept
heading: "A brief has three parts"
lines:
  - "Goal — what you want, one sentence"
  - "Rules — what must hold, a short list"
  - "Done when — how you both know it is finished"
---

<div class="grid grid-cols-3 gap-6 w-full max-w-4xl">
  <div v-click class="na-card p-6">
    <div class="text-sm font-semibold mb-2" style="color: var(--na-accent-500)">Goal</div>
    <div class="text-lg">Scaffold the app from the spec.</div>
  </div>
  <div v-click class="na-card p-6">
    <div class="text-sm font-semibold mb-2" style="color: var(--na-accent-500)">Rules</div>
    <div class="text-lg">Next.js 16, Tailwind v4, shadcn. No feature yet.</div>
  </div>
  <div v-click class="na-card p-6">
    <div class="text-sm font-semibold mb-2" style="color: var(--na-accent-500)">Done when</div>
    <div class="text-lg">localhost:3000 shows "CLASH".</div>
  </div>
</div>

---
layout: concept
heading: "Read the diff, not the summary"
lines:
  - "Claude says what it did. git status, then /diff, show what it actually did."
  - "Commit through Claude. It writes the message."
---

---
layout: concept
heading: "Plan mode: read, think, propose"
docs: https://code.claude.com/docs/en/permission-modes
lines:
  - "Shift+Tab until the status bar shows \"plan mode on\""
  - "Claude can read files. It cannot write them."
  - "You review the plan. Then you switch back and say: do it."
---

<svg viewBox="0 0 960 300" class="w-full max-w-4xl h-auto" role="img" aria-label="plan mode flow">
  <g fill="var(--na-bg-raised)" stroke="var(--na-zinc-600)" stroke-width="2">
    <rect x="40" y="100" width="220" height="100" rx="8" />
    <rect x="370" y="100" width="220" height="100" rx="8" />
    <rect x="700" y="100" width="220" height="100" rx="8" />
  </g>
  <g fill="var(--na-fg)" font-weight="600" style="font-size:20px" text-anchor="middle">
    <text x="150" y="140">Read</text>
    <text x="480" y="140">Plan</text>
    <text x="810" y="140">You decide</text>
  </g>
  <g fill="var(--na-fg-muted)" style="font-size:15px" text-anchor="middle">
    <text x="150" y="172">spec, existing files</text>
    <text x="480" y="172">files it will touch, in order</text>
    <text x="810" y="172">accept · change · reject</text>
  </g>
  <g stroke="var(--na-zinc-500)" stroke-width="2" fill="var(--na-zinc-500)">
    <line x1="260" y1="150" x2="360" y2="150" />
    <polygon points="360,144 372,150 360,156" />
    <line x1="590" y1="150" x2="690" y2="150" />
    <polygon points="690,144 702,150 690,156" />
  </g>
  <g v-click>
    <rect x="40" y="230" width="880" height="44" rx="8" fill="var(--na-primary-900)" stroke="var(--na-primary-500)" />
    <text x="480" y="258" text-anchor="middle" fill="var(--na-fg)" style="font-size:16px">No file changes until you say so. Use it for anything that is hard to undo.</text>
  </g>
</svg>

---
layout: code-live
heading: "Plan the data model"
filePath: "prompt to Claude Code — in plan mode"
success: "The plan names five models, string status fields, the generated client path and the seed, before a single file is written."
---

```txt
Read @docs/SPEC.md, section "Data". Plan a Prisma 7 schema for SQLite
using the better-sqlite3 adapter.

⟵ LIVE: add the five rules: five models, strings not enums,
        client in lib/generated/prisma, seed with 8 users / password test,
        run prisma/seed.ts with tsx

Show the plan, do not write files.
```

---
layout: task
number: "02"
heading: "Foundation"
goal: "Scaffold the app, plan the data model in plan mode, build it, seed eight users, and commit through Claude."
mode: "you do"
success: "npm run dev shows a page, prisma/schema.prisma has five models, the seed created 8 users, and CLAUDE.md has a Rules section."
branch: "02-start"
---


