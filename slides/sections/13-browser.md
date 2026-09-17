---
layout: section
heading: "The browser closes the loop"
---

<template #map>
  <ToolkitMap current="mcp" />
</template>

<!--
MCP is for when the agent needs to reach outside the repo. A browser is the clearest case: it
cannot verify a user flow by reading source, it has to click through it. Two servers, two jobs:
Playwright MCP for correctness, Chrome DevTools MCP for performance.
-->

---
layout: concept
heading: "Your systems, as tools"
lines:
  - "Claude Code ↔ MCP servers ↔ browser and other systems"
  - "MCP is the protocol boundary, not the tool itself."
---

<G15McpTopology />

<!--
Both servers were added during setup (docs/SETUP.md). Confirm with `claude mcp list` before starting. An MCP server
is a bridge between Claude Code and something external. Playwright MCP drives a real browser
against localhost:3000; Chrome DevTools MCP speaks the DevTools protocol. Neither is "the tool".
-->

---
layout: code-live
heading: "Register the servers"
filePath: "terminal — claude mcp add"
success: "claude mcp list shows both playwright and chrome-devtools."
---

```bash
# ⟵ LIVE: register both servers, then confirm they are listed.
claude mcp add playwright -- ___
claude mcp add chrome-devtools -- ___

claude mcp list
```

<!--
FULL WORKING SOLUTION (trainer only; should already be done during setup):
claude mcp add playwright -- npx -y @playwright/mcp@latest
claude mcp add chrome-devtools -- npx -y chrome-devtools-mcp@latest
npx -y playwright install chromium
claude mcp list

Say: registration is a one-time terminal command, not a config file you hand-author.
-->

---
layout: code-live
heading: "Drive first, then test"
filePath: "prompt to Claude Code — after the manual walkthrough is confirmed"
success: "The prompt names both outcomes, accept and reject, and points at the real seeded accounts."
---

```txt
Now write that flow as a Playwright test file: request to join, host
accepts, joining user is notified.

⟵ LIVE: add the second case and the account source before sending:
        a reject path, and where the seeded credentials live.
```

<!--
FULL WORKING SOLUTION (trainer only, verbatim from tasks/11-browser-loop.md):
"Now write that flow as a Playwright test file: request to join, host accepts, joining user is
notified. Add a second test for the host rejecting instead. Use the seeded accounts and passwords
from docs/SETUP.md."

This prompt only makes sense AFTER the manual walkthrough ("Using the Playwright MCP tools, log in
as anna.schmidt@example.com / test, open a clash she doesn't host, and request to join it…").
Drive it by hand and narrate first, confirm the flow works, THEN ask for the test file. Writing
test code before confirming the flow is exactly the blind generation this loop avoids.
-->

---
layout: concept
heading: "Measure, fix, measure again"
lines:
  - "User.avatar is a base64 string, up to 1.5 MB."
  - "getCurrentUser() selects it on every page. The layout never shows it."
---

<div class="grid grid-cols-3 gap-6 w-full max-w-4xl">
  <div v-click class="na-card p-6">
    <div class="text-sm font-semibold mb-2" style="color: var(--na-accent-500)">1 · Measure</div>
    <div class="text-lg">Chrome DevTools MCP: payload size of the dashboard load.</div>
  </div>
  <div v-click class="na-card p-6">
    <div class="text-sm font-semibold mb-2" style="color: var(--na-accent-500)">2 · Fix</div>
    <div class="text-lg">Stop selecting avatar in the session check.</div>
  </div>
  <div v-click class="na-card p-6">
    <div class="text-sm font-semibold mb-2" style="color: var(--na-accent-500)">3 · Measure again</div>
    <div class="text-lg">Same page, same tool. The number must drop.</div>
  </div>
</div>

<!--
The bug is real, read it before measuring: prisma/schema.prisma (User.avatar String?),
app/actions/profile.ts (MAX_AVATAR_LENGTH = 1_500_000), lib/auth.ts (getCurrentUser selects
avatar: true, wrapped in cache()), app/(app)/layout.tsx (requireUser on every page). Up to 1.5 MB
rides in the payload on every page load for a value the layout never renders.

Prompts are in tasks/11-browser-loop.md steps 7 to 9: measure with Chrome DevTools MCP, fix, measure
again. Measure before touching code.
-->

---
layout: concept
heading: "The loop that matters"
lines:
  - "Change → browser → observe → fix"
  - "No human in the loop."
---

<G16VerificationLoop />

<!--
Step back. Change the code, verify in a REAL browser, observe what happened (screenshot, payload,
console), fix from evidence, and the loop closes without a human re-checking every step. This is
what "MCP reaches outside the repo" buys you.
-->

---
layout: concept
heading: "Four browser tools, one comparison"
lines:
  - "Playwright MCP: end-to-end tests. Chrome DevTools MCP: performance and network."
  - "Claude in Chrome: your own logged-in browser. agent-browser: lean snapshots."
---

<G17BrowserToolComparison />

<!--
Four tools, different jobs. agent-browser (Vercel, Rust CLI, accessibility-tree snapshots) is the
one participants installed during setup and used while building. State its advantage qualitatively:
compact snapshots versus full MCP tool schemas plus DOM. Do not quote a percentage; the often-cited
"90% fewer tokens" is not an official claim and third-party estimates disagree. Measure it if there
is time.
-->

---
layout: task
number: "11"
heading: "The browser closes the loop"
goal: "Write the join-flow test suite with Playwright MCP, then measure and fix the avatar payload with Chrome DevTools MCP."
mode: "you do"
success: "Both tests pass against the seeded database, and the payload drop is measured, not assumed."
branch: "11-start"
---

<!--
Starting point 11-start with npm run dev running and the eight seeded logins. Anna hosts, another
seeded user joins. Two halves: tests, then performance.
-->
