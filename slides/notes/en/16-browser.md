<!-- @note: the-browser-closes-the-loop -->
Say:
- MCP: for when the agent needs to reach outside the repo
- Browser is the clearest case — can't verify a user flow by reading source, has to click through it
- Two servers, two jobs: Playwright MCP for correctness, Chrome DevTools MCP for performance

<!-- @note: task-14-the-browser-closes-the-loop -->
> Do:
> - Branch: 14-start already has the skill, CLAUDE.md and the hook set from Task 13

Say:
- Four things to learn, three to end up with — a test suite, a smaller payload, a first remote server

<!-- @note: your-systems-as-tools -->
> Do:
> - Confirm with `claude mcp list` before starting
> - Docs link: open it, scroll to "What you can do with MCP", then back to the slides

Say:
- Both servers added during setup (docs/SETUP.md)
- [click:2] MCP server = bridge between Claude Code and something external
- [click] Playwright MCP drives a real browser against localhost:3000
- Chrome DevTools MCP speaks the DevTools protocol
- Neither one is "the tool" itself

<!-- @note: register-the-servers -->
> Do:
> - FULL WORKING SOLUTION (trainer only; should already be done during setup):
>   claude mcp add playwright -- npx -y @playwright/mcp@latest
>   claude mcp add chrome-devtools -- npx -y chrome-devtools-mcp@latest
>   npx -y playwright install chromium
>   claude mcp list

Say:
- Registration is usually a one-time terminal command — for project scope it can also be a `.mcp.json` file you hand-edit and commit
- `/mcp` shows the same connection status from inside a running session — no need to drop out to the terminal

<!-- @note: drive-first-then-test -->
> Do:
> - FULL WORKING SOLUTION (trainer only, verbatim from tasks/14-browser-loop.md):
> "Now write that flow as a Playwright test file: request to join, host accepts, joining user is
> notified. Add a second test for the host rejecting instead. Use the seeded accounts and passwords
> from docs/SETUP.md."
> - Only makes sense AFTER the manual walkthrough: "Using the Playwright MCP tools, log in as anna.schmidt@example.com / test, open a clash she doesn't host, and request to join it…"
> - Drive it by hand and narrate first, confirm the flow works, THEN ask for the test file

Say:
- Writing test code before confirming the flow is exactly the blind generation this loop avoids

<!-- @note: measure-fix-measure-again -->
> Do:
> - Bug is real, read it before measuring: prisma/schema.prisma (User.avatar String?)
> - app/actions/profile.ts (MAX_AVATAR_LENGTH = 1_500_000)
> - lib/auth.ts (getCurrentUser selects avatar: true, wrapped in cache())
> - app/(app)/layout.tsx (requireUser on every page)
> - [click] Prompts in tasks/14-browser-loop.md steps 7-9: measure with Chrome DevTools MCP, fix, measure again

Say:
- Up to 1.5 MB rides in the payload on every page load, for a value the layout never renders
- Measure before touching code

<!-- @note: the-loop-that-matters -->
Say:
- [click] Change the code, verify in a REAL browser
- [click] Observe what happened: screenshot, payload, console
- [click] Fix from evidence — loop closes without a human re-checking every step
- [click:5] This is what "MCP reaches outside the repo" buys you

<!-- @note: mcp-has-three-primitives-not-one -->
Say:
- Every MCP server we've used so far only exposed tools
- [click] Resources are how a server hands over data without a tool call
- [click] Prompts are a server-authored starting point you can pull into the conversation
- None of this is Claude-Code-specific — it's the MCP spec, any client gets the same three

<!-- @note: a-remote-server-needs-its-own-login -->
> Do:
> - FULL WORKING SOLUTION (trainer only): claude mcp add --transport http sentry https://mcp.sentry.dev/mcp
>   then /mcp inside a session, follow the browser prompt
> - Docs link: open it, scroll to "Authenticate with remote MCP servers", then back to the slides

Say:
- [click] http is the default choice for a server you do not run yourself
- [click] sse still works but is on its way out
- Claude Code stores the token — you only log in once per server

<!-- @note: the-browser-closes-the-loop-2 -->
> Do:
> - Starting point: 14-start, with npm run dev running and the eight seeded logins
> - Anna hosts, another seeded user joins
> - Two halves: tests, then performance
> - Hand off to tasks/14-browser-loop.md — one slide left when they are back

<!-- @note: four-browser-tools-one-comparison -->
> Do:
> - Debrief, after the recap — they have used two of these four hands-on by now
> - State its advantage qualitatively
> - Do not quote a percentage — the often-cited "90% fewer tokens" is not an official claim, third-party estimates disagree
> - Measure it if there is time

Say:
- Four tools, different jobs
- [click:4] agent-browser (Vercel, Rust CLI, accessibility-tree snapshots) — the one participants installed during setup and used while building
- Compact snapshots vs an MCP server's tool schemas plus DOM — tool search defers full schema loading by default
