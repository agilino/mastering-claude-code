---
layout: section
heading: "Build your own MCP"
---

<template #map>
  <ToolkitMap current="mcp" />
</template>

---
layout: task-intro
number: "19"
routeAlias: task-19
heading: "Task 19 — Build your own MCP"
branch: "19-start (in your CLASH clone)"
learn:
  - "Start from a running server: stdio, dev.db, reply() and refuse() are done"
  - "Design two tools: small, well described, checks before the one write"
  - "Register it in .mcp.json; reads run freely, the write still asks"
  - "Call the same server from clash-conference through the Agent SDK"
outcome:
  - "mcp/server.ts in CLASH: find_venue and create_clash added to the starter"
  - "npx tsx mcp/smoke.ts in your CLASH clone: All checks passed."
  - "A clash created from a prompt; the duplicate refused by the server"
  - "clash-conference publishes a talk into CLASH through your server"
---

---
layout: concept
heading: "A server is three registered tools"
routeAlias: theory-mcp-server-anatomy
docs: https://modelcontextprotocol.io/docs/develop/build-server
lines:
  - "registerTool(name, { description, inputSchema }, handler): one call per tool."
  - "stdio: stdout carries the protocol. Logs go to stderr only."
  - "CLASH's dev.db is found from the server file, not the working directory."
---

<G26McpServerAnatomy />

---
layout: concept
heading: "Five decisions behind a good tool server"
routeAlias: theory-mcp-design
lines:
  - "CLASH's 19-start brings the plumbing. What is left is design."
  - "Claude reads names, descriptions and answers, never your handler."
---

<G30McpDesign />

---
layout: code-live
heading: "mcp/server.ts"
filePath: "mcp/server.ts (in your CLASH clone)"
success: "find_venue and create_clash added; mcp/smoke.ts says All checks passed."
---

```ts
import { z } from "zod";
import { McpServer } from "@modelcontextprotocol/server";
import { StdioServerTransport } from "@modelcontextprotocol/server/stdio";
// done for you: dev.db from import.meta.url, log() on stderr, reply(), refuse(), isIsoDateTime()
const server = new McpServer({ name: "clash", version: "1.0.0" });
server.registerTool("list_upcoming_clashes", {
  description: "List upcoming clashes, earliest first, at most 20. Optional area: …",
  inputSchema: z.object({ area: z.string().optional() }),
}, async ({ area }) => { // prisma.clash.findMany(…) → clashes
  if (clashes.length === 0) return reply("No upcoming clashes found.");
  return reply(lines.join("\n"));
});
// Step 2 of task 19: register find_venue here.   ⟵ LIVE: no match is a reply()
// Step 3 of task 19: register create_clash here. ⟵ LIVE: four refuse() checks, then one create
```

---
layout: concept
heading: "Register it, then trust it selectively"
routeAlias: theory-mcp-json
docs: https://code.claude.com/docs/en/mcp
lines:
  - ".mcp.json at the root of your CLASH clone: checked in, approved once."
  - "claude mcp list → clash: npx tsx mcp/server.ts - ✔ Connected"
  - "Allow both read tools in CLASH's .claude/settings.json; create_clash asks."
---

<div class="flex flex-col gap-3 w-full max-w-2xl">
  <div class="na-card px-5 py-3 flex gap-4 items-center"><span class="font-mono text-sm w-44 shrink-0" style="color: var(--na-accent-500)">.mcp.json</span><span style="color: var(--na-fg-muted)">project scope: checked into your CLASH clone</span></div>
  <div class="na-card px-5 py-3 flex gap-4 items-center" v-click><span class="font-mono text-sm w-44 shrink-0" style="color: var(--na-accent-500)">claude mcp list</span><span style="color: var(--na-fg-muted)">✔ Connected, or ⏸ Pending approval until you say yes</span></div>
  <div class="na-card px-5 py-3 flex gap-4 items-center" v-click><span class="font-mono text-sm w-44 shrink-0" style="color: var(--na-accent-500)">permissions.allow</span><span style="color: var(--na-fg-muted)">the two read tools, nothing else</span></div>
</div>

---
layout: concept
heading: "Every tool, or two named tools?"
---

<G03CarelessVsEngineered
  :careless="['allowedTools: mcp__clash__*', 'permissionMode: bypassPermissions', 'never reads system/init', 'wrong venue? the agent improvises']"
  :engineered="['allowedTools: two named tools', 'maxTurns: a hard ceiling', 'init says failed? mark the talk failed', 'store the answer, decide nothing']"
  closingLine="Same server. The difference is what clash-conference may call, and whether it looks first."
/>

---
layout: concept
heading: "Another app, same server"
routeAlias: theory-mcp-from-sdk
docs: https://code.claude.com/docs/en/agent-sdk/mcp
lines:
  - "query() gets mcpServers: the same server, started from clash-conference."
  - "allowedTools names two tools. acceptEdits would not free them."
  - "The clash-conference route stores the answer. It decides nothing itself."
---

<G26McpServerAnatomy mode="both" />

---
layout: code-live
heading: "route.ts"
filePath: "app/api/publish/route.ts (in clash-conference)"
success: "Only find_venue and create_clash are allowed, the init status is checked, the talk stores the outcome."
---

```ts
import { query } from "@anthropic-ai/claude-agent-sdk";
const server = `${process.env.CLASH_DIR}/mcp/server.ts`; // ../clash, in clash-conference/.env
export async function POST(req: Request) {
  const { talkId } = await req.json(); // ⟵ LIVE: load that talk, venue name, host email
  const run = query({
    prompt: `Publish this talk as a clash in CLASH: ___`,
    options: {
      mcpServers: { clash: { command: "npx", args: ["tsx", server] } },
      allowedTools: ["mcp__clash__find_venue", "mcp__clash__create_clash"],
      permissionMode: "dontAsk", // every other tool is denied
      // ⟵ LIVE: tools, settingSources, strictMcpConfig; maxTurns; check system/init
    },
  });
}
```

---
layout: task
number: "19"
heading: "Build your own MCP"
goal: "Design two tools into the starter server in your CLASH clone, then call them from Claude Code and clash-conference."
mode: "you do"
success: "mcp/smoke.ts in your CLASH clone ends with All checks passed, and a talk published from clash-conference shows up in CLASH."
branch: "19-start (in your CLASH clone)"
---

