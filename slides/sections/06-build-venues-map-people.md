---
layout: task-intro
number: "04"
routeAlias: task-04
heading: "Task 04 — Venues, map, people"
branch: "04-start"
learn:
  - "Reuse a pattern, don't re-explain it"
  - "Turn a repeated brief into a slash command"
  - "Hand Claude the evidence: an error, a screenshot"
  - "Let Claude look at its own work with agent-browser"
outcome:
  - "Venues, created and edited like clashes"
  - "A live map with click-to-create"
  - "Join, leave, accept and reject"
  - "A notification bell"
outcomeHeading: "You build"
---

---
layout: concept
heading: "Reuse information by reference"
lines:
  - "First time: explain the pattern. Next time: point at the implementation."
  - "When you repeat it again, package the recipe as a command or skill."
---

<div class="flex items-center gap-4 w-full max-w-4xl justify-center text-sm">
  <div class="na-card px-5 py-4"><div class="font-semibold">describe</div><div style="color: var(--na-fg-muted)">full brief once</div></div>
  <span>→</span>
  <div class="na-card px-5 py-4" v-click><div class="font-semibold">@reference</div><div style="color: var(--na-fg-muted)">reuse existing pattern</div></div>
  <span v-click>→</span>
  <div class="na-card px-5 py-4" v-click><div class="font-semibold">skill / rule</div><div style="color: var(--na-fg-muted)">reuse the recipe</div></div>
</div>

---
layout: code-live
heading: "Your first slash command"
routeAlias: theory-custom-command
docs: https://code.claude.com/docs/en/commands
filePath: ".claude/commands/new-page.md"
success: "/new-page <description> adds a page that follows the repo rules, without you repeating them."
---

```md
Add a new page to this app for: $ARGUMENTS

Follow these rules:
⟵ LIVE: the four rules you keep repeating — where reads go,
     where writes go, where schemas go, which components to use,
     and the check to run at the end
```

---
layout: concept
heading: "Let Claude read the error"
routeAlias: theory-error-feedback
lines:
  - "Do not fix the map yourself"
  - "\"The dev server shows an error. Read it and fix it.\""
  - "Or paste the error. Or paste a screenshot."
---


---
layout: concept
heading: "Let Claude look at the page"
routeAlias: theory-browser-feedback
docs: https://code.claude.com/docs/en/common-workflows
lines:
  - "agent-browser open http://localhost:3000/map"
  - "snapshot -i — the page as a short list of elements"
  - "screenshot — what a user would see"
---

<G16VerificationLoop />

---
layout: concept
heading: "One big ask, or four small ones"
---

<G03CarelessVsEngineered
  :careless="['venues, map, participation, notifications — one message', 'Claude touches 40+ files before you can check anything', 'nothing to click until it all lands', 'one wrong guess early is wrong for everything after it']"
  :engineered="['venues — do it like clashes', 'the map — a focused brief, docs first', 'participation — join, leave, accept, reject', 'notifications — the bell, last']"
  :careless-pct="80"
  :engineered-pct="20"
  closing-line="Same four features. The difference is whether each one ends with something you can check."
/>

---
layout: task
number: "04"
heading: "Venues, map, people"
goal: "Reuse the pattern for venues, add the live map, join and accept flows, notifications, a slash command, and quality gates."
mode: "you do"
success: "Venues, map with click-to-create, join/leave/accept/reject and the bell all work, and all three quality gates pass."
branch: "04-start"
---

---
layout: concept
heading: "Quality gates, said once"
lines:
  - "npx tsc --noEmit · npm run lint · npm run build"
  - "\"Before you say done, run all three and fix what fails\""
  - "Claude runs them without being asked — most of the time, not a guarantee"
---
