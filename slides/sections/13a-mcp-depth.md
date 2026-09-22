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
