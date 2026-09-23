---
layout: task-intro
number: "05"
routeAlias: task-05
heading: "Task 05 — Finish and ship"
branch: "05-start"
learn:
  - "Batch jobs, run long work in the background"
  - "Ask Claude to remember something, for later"
  - "Review your own diff like a stranger"
  - "Ship through Claude: branch, commit, PR"
outcome:
  - "Profile with avatar crop, public profiles"
  - "A dashboard, and ⌘K search everywhere"
  - "Light, dark, system theme"
  - "A pull request, reviewed by Claude"
outcomeHeading: "You build"
---

---
layout: concept
heading: "Batch what does not touch"
routeAlias: theory-batching
lines:
  - "Profile · search · dashboard · theme — four jobs, no shared files"
  - "One brief, each job names its files"
  - "You review while it works"
---

<div class="grid grid-cols-4 gap-4 w-full max-w-4xl">
  <div v-click class="na-card p-4 text-center"><div class="font-semibold">Profile</div><div class="text-sm mt-1" style="color: var(--na-fg-muted)">app/(app)/profile<br/>app/actions/profile.ts</div></div>
  <div v-click class="na-card p-4 text-center"><div class="font-semibold">Search</div><div class="text-sm mt-1" style="color: var(--na-fg-muted)">app/(app)/search<br/>lib/data/search.ts</div></div>
  <div v-click class="na-card p-4 text-center"><div class="font-semibold">Dashboard</div><div class="text-sm mt-1" style="color: var(--na-fg-muted)">app/(app)/dashboard<br/>lib/data/dashboard.ts</div></div>
  <div v-click class="na-card p-4 text-center"><div class="font-semibold">Theme</div><div class="text-sm mt-1" style="color: var(--na-fg-muted)">app/(app)/settings<br/>components/theme-*.tsx</div></div>
</div>

---
layout: concept
heading: "Do not wait"
lines:
  - "\"Run the build in the background. Tell me when done.\""
  - "Keep asking questions while it runs"
  - "/usage — what this session has used so far"
---


---
layout: concept
heading: "Remember it"
routeAlias: theory-memory
lines:
  - "Remember: always use UserAvatar, never a raw img tag"
  - "Saved to memory. Loaded next time."
  - "/memory shows where it went"
---


---
layout: code-live
heading: "Review like a stranger"
routeAlias: theory-code-review
filePath: "prompt to Claude Code — on the finish branch"
success: "Findings come back with file and line, and you decide which ones to fix."
---

```txt
Review the diff of this branch against 05-start like a strict senior engineer.
Look for:
⟵ LIVE: the four things this repo cares about: ownership checks,
        Prisma outside lib/data, schemas outside lib/validation.ts,
        params not awaited
List findings with file and line. Fix nothing yet.
```

---
layout: concept
heading: "Ship, then look at the reference"
lines:
  - "branch → commits → gh pr create — all through Claude"
  - "git fetch origin 06-start · git diff --stat 06-start"
  - "From here on, every task runs on the reference CLASH"
---


---
layout: task
number: "05"
heading: "Finish and ship"
goal: "Batch the last four slices, run work in the background, review your pull request with Claude, and switch to the reference."
mode: "you do"
success: "Profile, search, dashboard and theme work, a pull request exists, and you are on 06-start with the app running."
branch: "05-start"
---


