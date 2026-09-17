---
layout: concept
heading: "Do it like X"
lines:
  - "The pattern exists now. Point at it."
  - "Venues like clashes: follow @app/actions/clashes.ts"
  - "Short brief, same result"
---

<!--
The venues prompt in Task 04 is a third of the clashes prompt, because the pattern lives
in the repo and you can point at it. Say: this is the cheapest way to get consistency.
Then show the next slide — when you point at the same pattern three times, write it
down once.
-->

---
layout: code-live
heading: "Your first slash command"
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

<!--
FULL WORKING FILE (verbatim from tasks/04-venues-map-people.md):

Add a new page to this app for: $ARGUMENTS
Follow these rules:
- reads in lib/data/, writes in app/actions/ with requireUser() and an ownership check
- Zod schemas in lib/validation.ts
- shadcn components, existing layout, existing card style
- run npx tsc --noEmit at the end

Say: a file in .claude/commands/ becomes a slash command. $ARGUMENTS is what you type
after it. This is the small version of a skill — Part III makes it bigger.
-->

---
layout: concept
heading: "Let Claude read the error"
lines:
  - "Do not fix the map yourself"
  - "\"The dev server shows an error. Read it and fix it.\""
  - "Or paste the error. Or paste a screenshot."
---

<!--
The Leaflet map almost always breaks once (window is not defined during server
rendering). Good. Demo the three ways to hand Claude the evidence: let it read the
terminal, paste the error text, paste a screenshot with Ctrl+V. Say: the more exact the
evidence, the smaller the fix. Do not describe the bug in your words if you can show it.
-->

---
layout: concept
heading: "Let Claude look at the page"
lines:
  - "agent-browser open http://localhost:3000/map"
  - "snapshot -i — the page as a short list of elements"
  - "screenshot — what a user would see"
---

<G16VerificationLoop />

<!--
Demo: ask Claude to use agent-browser to open the map, log in as Anna, take a
screenshot and say whether pins are visible. Show the commands it runs. This closes a
loop that most people leave open: Claude changes code, and Claude checks the result.
Part IV does the same with Playwright MCP and Chrome DevTools MCP.
-->

---
layout: concept
heading: "Quality gates, said once"
lines:
  - "npx tsc --noEmit · npm run lint · npm run build"
  - "\"Before you say done, run all three and fix what fails\""
  - "Claude runs them without being asked, every time"
---

<!--
Add the "Quality gates" section to CLAUDE.md live and run the three commands. From now
on Claude runs them at the end of every task. Say: this is a rule in a file. Claude
follows it most of the time. Part IV shows how to make it a rule Claude cannot skip.
-->

---
layout: task
number: "04"
heading: "Venues, map, people"
goal: "Reuse the pattern for venues, add the live map, join and accept flows, notifications, a slash command, and quality gates."
mode: "you do"
success: "Venues, map with click-to-create, join/leave/accept/reject and the bell all work, and all three quality gates pass."
branch: "04-start"
---

<!--
Task 04 recap. Reset: 04-start is auth, shell and clashes; 05-start adds venues, map,
participation and notifications. The map step is where people get stuck — remind them:
hand Claude the error, do not fix it by hand. Two browsers for the join flow: one as
Anna, one as Lukas.
-->
