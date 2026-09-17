# Task 11 — The browser closes the loop

> Part: Orchestrate and let go · Reset branch: `11-start`

## You will end up with

A Playwright test file for the join flow (request, accept, reject, notification), and a
measured performance fix for avatars. Both verified by an agent in a real browser.

## Why

MCP lets Claude reach outside the repo. A browser is the clearest case. Claude cannot check
a user flow by reading source. It has to click through it. The loop is: change the code,
look in a real browser, fix, repeat. No human in between.

Two MCP servers, two jobs. Playwright MCP for correctness. Chrome DevTools MCP for performance.

## Do this

**Setup**

1. Both servers were added during setup (`docs/SETUP.md`). Check.
   ```bash
   claude mcp list
   ```
   You should see `playwright` and `chrome-devtools`. If not:
   ```bash
   claude mcp add playwright -- npx -y @playwright/mcp@latest
   claude mcp add chrome-devtools -- npx -y chrome-devtools-mcp@latest
   npx -y playwright install chromium
   ```
2. Start the app: `npm run dev`. Keep it running.

**Tests**

3. Drive the flow by hand first. No test code yet.
   ```
   Using the Playwright MCP tools, log in at localhost:3000 as
   anna.schmidt@example.com / test, open a clash she doesn't host, and request
   to join it. Then log in as the host in a second context, accept the request,
   and confirm the joining user sees a notification. Narrate each step before
   writing any test code.
   ```
4. Now write it down.
   ```
   Now write that flow as a Playwright test file: request to join, host accepts,
   joining user is notified. Add a second test for the host rejecting instead.
   Use the seeded accounts and passwords from docs/SETUP.md.
   ```
5. Run the tests. Fix timing and selector problems first. Only then believe a failure is an app bug.

**Performance**

6. Read the bug before you measure it.
   - `prisma/schema.prisma`: `User.avatar` is a `String?`, a base64 data URL.
   - `app/actions/profile.ts`: `MAX_AVATAR_LENGTH = 1_500_000`.
   - `lib/auth.ts`: `getCurrentUser()` selects `avatar: true` on every call.
   - `app/(app)/layout.tsx`: calls `requireUser()` on every page.
   Together: up to 1.5 MB rides along on every page load, for a value the layout never shows.
7. Measure.
   ```
   Using the Chrome DevTools MCP tools, log in at localhost:3000 and load the
   dashboard. Capture the network payload size for the initial page load and
   identify how much of it is the avatar field on the User selected via
   getCurrentUser in lib/auth.ts.
   ```
8. Fix.
   ```
   getCurrentUser() in lib/auth.ts selects avatar on every call, and it's called
   by requireUser() on every authenticated page via app/(app)/layout.tsx, even
   though most pages never render the user's own avatar as an image. Fix this:
   stop selecting avatar in the identity/session check, and load it separately
   only where it's actually displayed.
   ```
9. Measure again.
   ```
   Re-measure the same page load with Chrome DevTools MCP and confirm the
   payload size dropped.
   ```
10. Run the three gates. The hooks from task 10 will help.

## Now you

- Add a third test: a host tries to join their own clash. CLASH already refuses this in
  `joinClash` with "You host this clash — you're already in." Check that the page shows it.
- Use agent-browser instead of Playwright MCP for the same walkthrough. Compare the size
  of what lands in your context.

## Check

- [ ] Playwright MCP drove a real browser before any test was written.
- [ ] A test covers request, accept and notification. A second one covers reject.
- [ ] Both pass against the seeded database.
- [ ] Chrome DevTools MCP captured a "before" number, not a guess.
- [ ] `avatar` is gone from the every-page path and still shows where it is used.
- [ ] Chrome DevTools MCP confirms the payload dropped.
- [ ] `npx tsc --noEmit`, `npm run lint`, `npm run build` pass.

## Stuck?

`git checkout 11-start` — the reference CLASH with the fix, the skill, `CLAUDE.md` and the hook set.

## Go further

Four browser tools, four jobs: Playwright MCP for end-to-end tests, Chrome DevTools MCP for
performance and network, Claude in Chrome for checks in your own logged-in browser, agent-browser
for lean automation with accessibility-tree snapshots. Try the same login with each and compare.

## Links

- MCP — https://code.claude.com/docs/en/mcp
- Playwright MCP — https://github.com/microsoft/playwright-mcp
- Chrome DevTools MCP — https://github.com/ChromeDevTools/chrome-devtools-mcp
- Agent Browser — https://github.com/vercel-labs/agent-browser
