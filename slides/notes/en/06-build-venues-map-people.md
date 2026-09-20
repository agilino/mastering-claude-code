<!-- @note: do-it-like-x -->
> Do:
> - tasks/04-venues-map-people.md step 2, then back to the slides
> - Show next slide: point at the same pattern three times → write it down once

Say:
- Venues prompt in Task 04 is a third of the clashes prompt — the pattern already lives in the repo, so you can just point at it
- Cheapest way to get consistency

<!-- @note: your-first-slash-command -->
> Do:
> - tasks/04-venues-map-people.md step 3, then back to the slides
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
> - tasks/04-venues-map-people.md steps 5 and 7, then back to the slides
> - Leaflet map almost always breaks once ("window is not defined" during server rendering) — good, use it
> - Demo the three ways to hand Claude the evidence: let it read the terminal, paste the error text, paste a screenshot with Ctrl+V

Say:
- The more exact the evidence, the smaller the fix
- Don't describe the bug in your own words if you can show it

<!-- @note: let-claude-look-at-the-page -->
> Do:
> - tasks/04-venues-map-people.md step 6, then back to the slides
> - [click] Demo: ask Claude to use agent-browser to open the map, log in as Anna, take a screenshot, say whether pins are visible
> - Show the commands it runs

Say:
- [click:4] Closes a loop most people leave open: Claude changes the code AND Claude checks the result
- Part IV does the same with Playwright MCP and Chrome DevTools MCP

<!-- @note: quality-gates-said-once -->
> Do:
> - tasks/04-venues-map-people.md step 10, then back to the slides
> - Add the "Quality gates" section to CLAUDE.md live, run the three commands
> - Watch for: a CLAUDE.md edit made mid-session is not reloaded until /clear, /compact or a restart

Say:
- From now on Claude runs them at the end of every task — here because you just said it, in every new session because CLAUDE.md loads at the start
- This is a rule in a file — Claude follows it most of the time
- Part IV shows how to make it a rule Claude cannot skip

<!-- @note: venues-map-people -->
> Do:
> - Task 04 recap
> - Hand off to tasks/04-venues-map-people.md, full 11 steps — no more slides until Task 05
> - Map step is where people get stuck — remind them
> - Join flow needs two browsers: one as Anna, one as Lukas

Say:
- Reset branches: 04-start = auth, shell, clashes; 05-start adds venues, map, participation, notifications
- Hand Claude the error, don't fix it by hand
