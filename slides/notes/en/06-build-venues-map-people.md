<!-- @note: task-04-venues-map-people -->
> Do:
> - Branch: 04-start already has auth, the shell and clashes

Say:
- Four things to learn, four things to build — venues follow the exact pattern you already know

<!-- @note: do-it-like-x -->
> Do:
> - Point at the same pattern three times, then write it down once
> - Participants do this in step 3

Say:
- Venues prompt in Task 04 is a third of the clashes prompt — the pattern already lives in the repo, so you can just point at it
- Cheapest way to get consistency

<!-- @note: your-first-slash-command -->
> Do:
> - Flag in passing: commands merged into skills — this file still works, task 07 shows the preferred way to write one
> - Participants do this in step 4
> - Optional: point at the docs page's own note: "To add your own commands, see skills"
> FULL WORKING FILE (verbatim from tasks/04-venues-map-people.md):
>
> Add a new page to this app for: $ARGUMENTS
> Follow these rules:
>   - reads in lib/data/, writes in app/actions/ with requireUser() and an ownership check
>   - Zod schemas in lib/validation.ts
>   - shadcn components, existing layout, existing card style
>   - run npx tsc --noEmit at the end

Say:
- A file in .claude/commands/ becomes a slash command
- $ARGUMENTS is what you type after it
- This is the small version of a skill — Part III makes it bigger

<!-- @note: let-claude-read-the-error -->
> Do:
> - Participants do this in steps 6 and 8
> - Leaflet map almost always breaks once ("window is not defined" during server rendering) — good, use it
> - Demo the three ways to hand Claude the evidence: let it read the terminal, paste the error text, paste a screenshot with Ctrl+V

Say:
- The more exact the evidence, the smaller the fix
- Don't describe the bug in your own words if you can show it

<!-- @note: let-claude-look-at-the-page -->
> Do:
> - Participants do this in step 7
> - [click] Demo: ask Claude to use agent-browser to open the map, log in as Anna, take a screenshot, say whether pins are visible
> - Show the commands it runs
> - Optional: point at the docs page's "Work with images" section — the same idea, pasted instead of taken by agent-browser

Say:
- [click:4] Closes a loop most people leave open: Claude changes the code AND Claude checks the result
- Part IV does the same with Playwright MCP and Chrome DevTools MCP

<!-- @note: one-big-ask-or-four-small-ones -->
> Do:
> - Handoff: FACILITATOR.md, Rhythm for every task. Big ask is step 2 (they watched it) — hand off at step 1, small steps start at 3
> - Left (careless), one step per click:
>   - [click] venues, map, participation, notifications — one message
>   - [click] Claude touches 40+ files before you can check anything
>   - [click] nothing to click until it all lands
>   - [click] one wrong guess early is wrong for everything after it
>   - [click] context bar: ~80% consumed — STOP HERE, switch to the task file
> FULL WORKING PROMPT (verbatim from tasks/04-venues-map-people.md, trainer only, do not send it from a participant machine):
>
> Build venues exactly like clashes, a full-screen map of Berlin with pins for
> clashes and venues and click-to-create, join/leave/accept/reject for clashes
> with a People panel on the clash detail page, and notifications with a bell
> that shows unread requests in the top bar. Follow the existing patterns in
> the app everywhere they apply.
> - Right (engineered), when they are back — one step per click:
>   - [click] venues — do it like clashes
>   - [click] the map — a focused brief, docs first
>   - [click] participation — join, leave, accept, reject
>   - [click] notifications — the bell, last
>   - [click] context bar: ~20% consumed

Say:
- Same four features either way. The difference is whether each one ends with something you can check

<!-- @note: venues-map-people -->
> Do:
> - Task 04 recap — stays on screen while they work
> - Hand off to tasks/04-venues-map-people.md at step 1, full 12 steps — skip step 2, they watched it — one slide left when they are back
> - Map step is where people get stuck — remind them
> - Join flow needs two browsers: one as Anna, one as Lukas

Say:
- Reset branches: 04-start = auth, shell, clashes; 05-start adds venues, map, participation, notifications
- Hand Claude the error, don't fix it by hand

<!-- @note: verify-cheap-first-full-gate-last -->
> Do:
> - Ask what failed during the task and which check would have caught it earliest.
> - Show the three layers. Keep the exact full gates from the existing task: npx tsc --noEmit, npm run lint, npm run build.

Say:
- Verification has a cost too. The fastest useful feedback belongs closest to the edit.
- A one-file change should not wait for the most expensive whole-app gate before learning it is wrong.
- Run the full delivery gates before you call the work done. Part IV turns some of these checks into enforcement.
- If the same gate is always needed, wrap it in one repository script so humans, Claude and CI run the same thing.
