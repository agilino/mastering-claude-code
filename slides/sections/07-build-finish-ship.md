---
layout: concept
heading: "Batch what does not touch"
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

<!--
The last slices do not share files, so one brief can carry all four. Show the brief from
Task 05: each job has its own paths. Say: the paths are what keep the jobs apart. Then
send it and move to the next slide while it runs.
-->

---
layout: concept
heading: "Do not wait"
lines:
  - "\"Run the build in the background. Tell me when done.\""
  - "Keep asking questions while it runs"
  - "/cost — what this session has used so far"
---

<!--
Demo background work: ask for the build in the background, then ask something else.
Then /cost. Say the number out loud. People are surprised in both directions. The point:
know the price of the way you work, then decide.
-->

---
layout: concept
heading: "Remember it: #"
lines:
  - "# Always use UserAvatar, never a raw img tag"
  - "Saved to memory. Loaded next time."
  - "/memory shows where it went"
---

<!--
Type a # message live. Show /memory. Say: CLAUDE.md is what the repo tells Claude.
Memory is what you tell Claude. Both are read at the start of every conversation.
-->

---
layout: code-live
heading: "Review like a stranger"
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

<!--
FULL WORKING PROMPT (verbatim from tasks/05-finish-and-ship.md):

Review the diff of this branch against 05-start like a strict senior engineer.
Look for: missing ownership checks in actions, Prisma calls outside lib/data,
Zod schemas outside lib/validation.ts, params not awaited. List findings with file and line.
Fix nothing yet.

Then: "Fix findings 1 and 3. Leave the others." Say: review and fix are two messages
on purpose. You stay the one who decides.
-->

---
layout: concept
heading: "Ship, then look at the reference"
lines:
  - "branch → commits → gh pr create — all through Claude"
  - "git fetch origin 06-start · git diff --stat 06-start"
  - "From here on, every task runs on the reference CLASH"
---

<!--
Open the PR live (or write PR.md if gh is not set up). Then fetch 06-start and diff.
Ask Claude for three differences in lib/data and app/actions, no judgement. Then the
retrospective questions from Task 05 — give the group a moment to answer them to a
neighbour. Then: git checkout 06-start, npm install, npm run db:reset. Say clearly:
your build stays on your branch. The next parts need one shared codebase, so we all
move to the reference.
-->

---
layout: task
number: "05"
heading: "Finish and ship"
goal: "Batch the last four slices, run work in the background, review your pull request with Claude, and switch to the reference."
mode: "you do"
success: "Profile, search, dashboard and theme work, a pull request exists, and you are on 06-start with the app running."
branch: "05-start"
---

<!--
Task 05 recap. Reset: 05-start is everything up to notifications; 06-start is the
reference CLASH and the start of Part III. Everyone must end on 06-start — check it
before the next divider.
-->
