---
layout: section
heading: "Build CLASH"
---

<template #map>
  <JourneyMap current="build" />
</template>

<!--
Divider for Part II. Say: "From here on you build. I show one step, you do it on your
machine. The spec is docs/SPEC.md. Claude writes the code. You decide what is good."
Point at the four modules of this part. Each one is a task. Each task has a reset branch.
-->

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

<!--
A prompt is a wish. A brief is a contract. Show the three parts with the real scaffold
brief from Task 02. Say: the "done when" line is the one people forget, and it is the
one that stops Claude from wandering. Contrast with the cold prompt "set up a Next.js
app" — it works too, but you will not know when it is finished, and neither will Claude.
-->

---
layout: concept
heading: "Plan mode: read, think, propose"
lines:
  - "Shift+Tab twice — the prompt shows plan"
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

<!--
Demo live: Shift+Tab twice, show the "plan" marker in the prompt line. Send the data
model prompt from Task 02. Let the plan appear. Read one part of it out loud and ask the
room a question about it ("why lib/generated/prisma?"). Then switch back and say "do
it". The point: the data model is hard to change later, so this is the right moment to
look before Claude writes.
-->

---
layout: concept
heading: "Read the diff, not the summary"
lines:
  - "Claude says what it did. Git shows what it did."
  - "Ask: show me git status and one line per file"
  - "Commit through Claude. It writes the message."
---

<!--
The habit to build early: after every step, look at the files. Claude's summary is
usually right, but the diff is always right. Show git status after the scaffold. Then
ask Claude to commit and read the commit message it wrote. Say: this is a good first
place to let Claude take over a chore.
-->

---
layout: code-live
heading: "Plan the data model"
filePath: "prompt to Claude Code — in plan mode"
success: "The plan names five models, string status fields, the generated client path and the seed, before a single file is written."
---

```txt
Read @docs/SPEC.md, section "Data". Plan a Prisma 7 schema for SQLite
using the better-sqlite3 adapter.

⟵ LIVE: add the four rules: five models, strings not enums,
        client in lib/generated/prisma, seed with 8 users / password test

Show the plan, do not write files.
```

<!--
FULL WORKING PROMPT (verbatim from tasks/02-foundation.md):

Read @docs/SPEC.md, section "Data". Plan a Prisma 7 schema for SQLite using the
better-sqlite3 adapter. Five models. Status and type fields are strings, not enums.
Generate the client into lib/generated/prisma. Also plan a seed with 8 users
(password "test", hashed with bcryptjs), 8 venues and 8 clashes in Berlin,
some past, some upcoming. Show the plan, do not write files.

Type the rules live, one by one, and say why each one is there: SQLite has no enums;
the generated client path keeps the import stable; the seed is what every later task
logs in with.
-->

---
layout: task
number: "02"
heading: "Foundation"
goal: "Scaffold the app, plan and build the data model in plan mode, seed eight users, and make your first commit through Claude."
mode: "you do"
success: "npm run dev shows a page, prisma/schema.prisma has five models, the seed created 8 users, and CLAUDE.md has a Rules section."
branch: "02-start"
---

<!--
Task 02 recap. Say the reset branch and where the task file is: 02-start is the spec plus a first
CLAUDE.md; 03-start is where you land if this task goes wrong. Walk the group while they
work. The most common stall: create-next-app asking interactive questions — the flags in
the brief avoid most of them, but say "answer yes to everything you are not sure about".
-->
