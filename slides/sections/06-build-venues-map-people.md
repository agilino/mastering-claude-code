---
layout: concept
heading: "Do it like X"
lines:
  - "The pattern exists now. Point at it."
  - "Venues like clashes: follow @app/actions/clashes.ts"
  - "Short brief, same result"
---


---
layout: code-live
heading: "Your first slash command"
routeAlias: theory-custom-command
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
lines:
  - "agent-browser open http://localhost:3000/map"
  - "snapshot -i — the page as a short list of elements"
  - "screenshot — what a user would see"
---

<G16VerificationLoop />

---
layout: concept
heading: "Quality gates, said once"
lines:
  - "npx tsc --noEmit · npm run lint · npm run build"
  - "\"Before you say done, run all three and fix what fails\""
  - "Claude runs them without being asked — most of the time, not a guarantee"
---


---
layout: task
number: "04"
routeAlias: task-04
heading: "Venues, map, people"
goal: "Reuse the pattern for venues, add the live map, join and accept flows, notifications, a slash command, and quality gates."
mode: "you do"
success: "Venues, map with click-to-create, join/leave/accept/reject and the bell all work, and all three quality gates pass."
branch: "04-start"
---


