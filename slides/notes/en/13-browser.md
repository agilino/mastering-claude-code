<!-- @note: the-browser-closes-the-loop -->
- MCP: for when the agent needs to reach outside the repo
- Browser is the clearest case — can't verify a user flow by reading source, has to click through it
- Two servers, two jobs: Playwright MCP for correctness, Chrome DevTools MCP for performance

<!-- @note: your-systems-as-tools -->
- Both servers added during setup (docs/SETUP.md)
- Confirm with `claude mcp list` before starting
- [click:2] MCP server = bridge between Claude Code and something external
- [click] Playwright MCP drives a real browser against localhost:3000
- Chrome DevTools MCP speaks the DevTools protocol
- Neither one is "the tool" itself

<!-- @note: register-the-servers -->
- FULL WORKING SOLUTION (trainer only; should already be done during setup):
  claude mcp add playwright -- npx -y @playwright/mcp@latest
  claude mcp add chrome-devtools -- npx -y chrome-devtools-mcp@latest
  npx -y playwright install chromium
  claude mcp list
- Say: registration is usually a one-time terminal command — for project scope it can also be a `.mcp.json` file you hand-edit and commit

<!-- @note: drive-first-then-test -->
- FULL WORKING SOLUTION (trainer only, verbatim from tasks/11-browser-loop.md):
"Now write that flow as a Playwright test file: request to join, host accepts, joining user is
notified. Add a second test for the host rejecting instead. Use the seeded accounts and passwords
from docs/SETUP.md."
- Only makes sense AFTER the manual walkthrough: "Using the Playwright MCP tools, log in as anna.schmidt@example.com / test, open a clash she doesn't host, and request to join it…"
- Drive it by hand and narrate first, confirm the flow works, THEN ask for the test file
- Writing test code before confirming the flow is exactly the blind generation this loop avoids

<!-- @note: measure-fix-measure-again -->
- Bug is real, read it before measuring: prisma/schema.prisma (User.avatar String?)
- app/actions/profile.ts (MAX_AVATAR_LENGTH = 1_500_000)
- lib/auth.ts (getCurrentUser selects avatar: true, wrapped in cache())
- app/(app)/layout.tsx (requireUser on every page)
- Up to 1.5 MB rides in the payload on every page load, for a value the layout never renders
- [click] Prompts in tasks/11-browser-loop.md steps 7-9: measure with Chrome DevTools MCP, fix, measure again
- Measure before touching code

<!-- @note: the-loop-that-matters -->
- [click] Change the code, verify in a REAL browser
- [click] Observe what happened: screenshot, payload, console
- [click] Fix from evidence — loop closes without a human re-checking every step
- [click:5] This is what "MCP reaches outside the repo" buys you

<!-- @note: four-browser-tools-one-comparison -->
- Four tools, different jobs
- [click:4] agent-browser (Vercel, Rust CLI, accessibility-tree snapshots) — the one participants installed during setup and used while building
- State its advantage qualitatively: compact snapshots vs an MCP server's tool schemas plus DOM — tool search defers full schema loading by default
- Do not quote a percentage — the often-cited "90% fewer tokens" is not an official claim, third-party estimates disagree
- Measure it if there is time

<!-- @note: the-browser-closes-the-loop-2 -->
- Starting point: 11-start, with npm run dev running and the eight seeded logins
- Anna hosts, another seeded user joins
- Two halves: tests, then performance
