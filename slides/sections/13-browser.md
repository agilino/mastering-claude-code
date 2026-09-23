---
layout: section
heading: "The browser closes the loop"
---

<template #map>
  <ToolkitMap current="mcp" />
</template>

---
layout: task-intro
number: "11"
routeAlias: task-11
heading: "Task 11 — The browser closes the loop"
branch: "11-start"
learn:
  - "Reach a real browser through MCP"
  - "Drive a flow by hand, then generate the test"
  - "Measure a payload before and after a fix"
  - "Local MCP is stdio; remote is http"
outcome:
  - "A Playwright test: join, accept, reject"
  - "A smaller avatar payload, measured"
  - "A remote MCP server, login flow seen"
---

---
layout: concept
heading: "Your systems, as tools"
routeAlias: theory-mcp-tools
docs: https://code.claude.com/docs/en/mcp
lines:
  - "Claude Code ↔ MCP servers ↔ browser and other systems"
  - "MCP is the protocol boundary, not the tool itself."
---

<G15McpTopology />

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

---
layout: code-live
heading: "Drive first, then test"
routeAlias: theory-browser-drive
filePath: "prompt to Claude Code — after the manual walkthrough is confirmed"
success: "The prompt names both outcomes, accept and reject, and points at the real seeded accounts."
---

```txt
Now write that flow as a Playwright test file: request to join, host
accepts, joining user is notified.

⟵ LIVE: add the second case and the account source before sending:
        a reject path, and where the seeded credentials live.
```

---
layout: concept
heading: "Measure, fix, measure again"
routeAlias: theory-measure-fix
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

---
layout: concept
heading: "The loop that matters"
lines:
  - "Change → browser → observe → fix"
  - "No human in the loop."
---

<G16VerificationLoop />

---
layout: concept
heading: "MCP has three primitives, not one"
lines:
  - "Tools are only one primitive. Resources and prompts are the other two."
  - "The server tells Claude Code what it has — nothing is hardcoded."
---

<div class="flex gap-6 w-full max-w-4xl">
  <div class="na-card p-5 flex-1" style="border-color: var(--na-accent-500)">
    <div class="font-mono text-sm font-semibold mb-2" style="color: var(--na-accent-500)">tools</div>
    <div class="text-sm" style="color: var(--na-fg-muted)">Actions the model can call, with a schema.</div>
  </div>
  <div class="na-card p-5 flex-1" v-click>
    <div class="font-mono text-sm font-semibold mb-2" style="color: var(--na-accent-500)">resources</div>
    <div class="text-sm" style="color: var(--na-fg-muted)">Data Claude Code can read, like a file.</div>
  </div>
  <div class="na-card p-5 flex-1" v-click>
    <div class="font-mono text-sm font-semibold mb-2" style="color: var(--na-accent-500)">prompts</div>
    <div class="text-sm" style="color: var(--na-fg-muted)">Ready-made prompt templates the server offers.</div>
  </div>
</div>

---
layout: concept
heading: "A remote server needs its own login"
docs: https://code.claude.com/docs/en/mcp
lines:
  - "HTTP is the transport for a remote server. stdio stays local."
  - "/mcp opens a browser login the first time, then Claude Code remembers you."
---

<div class="flex flex-col gap-3 w-full max-w-2xl">
  <div class="na-card px-5 py-3 flex gap-4 items-center"><span class="font-mono text-sm w-16" style="color: var(--na-accent-500)">stdio</span><span style="color: var(--na-fg-muted)">a local process — what playwright and chrome-devtools use</span></div>
  <div class="na-card px-5 py-3 flex gap-4 items-center" v-click><span class="font-mono text-sm w-16" style="color: var(--na-accent-500)">http</span><span style="color: var(--na-fg-muted)">a remote server — recommended for anything cloud-based</span></div>
  <div class="na-card px-5 py-3 flex gap-4 items-center" v-click><span class="font-mono text-sm w-16" style="color: var(--na-error-500)">sse</span><span style="color: var(--na-fg-muted)">deprecated — use http where the server supports it</span></div>
</div>

---
layout: task
number: "11"
heading: "The browser closes the loop"
goal: "Write the join-flow test suite with Playwright MCP, then measure and fix the avatar payload with Chrome DevTools MCP."
mode: "you do"
success: "Both tests pass against the seeded database, and the payload drop is measured, not assumed."
branch: "11-start"
---

---
layout: concept
heading: "Four browser tools, one comparison"
lines:
  - "Playwright MCP: end-to-end tests. Chrome DevTools MCP: performance and network."
  - "Claude in Chrome: your own logged-in browser. agent-browser: lean snapshots."
---

<G17BrowserToolComparison />


