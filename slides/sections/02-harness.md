---
layout: concept
heading: "The model alone is a function"
lines:
  - "Text in, text out. Nothing else."
  - "The harness is the program around it. Claude Code is a harness."
---

<div class="flex flex-col items-center gap-8 w-full">
  <div class="flex items-center gap-6 justify-center">
    <div class="na-card px-6 py-4 text-lg whitespace-nowrap">tokens in</div>
    <span class="text-3xl" style="color: var(--na-zinc-600)">→</span>
    <div class="na-card px-10 py-6 text-2xl font-bold" style="border-color: var(--na-primary-400)">model</div>
    <span class="text-3xl" style="color: var(--na-zinc-600)">→</span>
    <div class="na-card px-6 py-4 text-lg whitespace-nowrap">tokens out</div>
  </div>
  <div v-click class="na-card px-8 py-4 text-lg text-center w-full max-w-2xl" style="border-color: var(--na-accent-500)">
    harness: builds the input, runs the tools, keeps the loop going
  </div>
</div>

---
layout: concept
heading: "The loop"
docs: https://code.claude.com/docs/en/how-claude-code-works
lines:
  - "You write. The harness builds the prompt. The model chooses a tool or answers."
  - "The harness runs the tool and feeds the result back. Until the model answers."
---

<D07HarnessLoop />

---
layout: concept
heading: "What is in the prompt, every turn"
lines:
  - "Sent top to bottom on every call. The cached part was sent last time already."
  - "Only the new tail costs full price. You control most of these blocks."
---

<D08PromptStack />

---
layout: concept
heading: "The tools"
lines:
  - "Each tool is a small program the harness runs for the model"
  - "More tools later: subagents, web, browser, your own via MCP"
---

<div class="grid grid-cols-4 gap-3 w-full max-w-3xl">
  <div class="na-card p-3 text-center"><div class="font-mono font-semibold">Read</div><div class="text-xs mt-1" style="color: var(--na-fg-muted)">a file</div></div>
  <div class="na-card p-3 text-center"><div class="font-mono font-semibold">Edit</div><div class="text-xs mt-1" style="color: var(--na-fg-muted)">replace text</div></div>
  <div class="na-card p-3 text-center"><div class="font-mono font-semibold">Write</div><div class="text-xs mt-1" style="color: var(--na-fg-muted)">a new file</div></div>
  <div class="na-card p-3 text-center"><div class="font-mono font-semibold">Bash</div><div class="text-xs mt-1" style="color: var(--na-fg-muted)">a shell command</div></div>
  <div class="na-card p-3 text-center" v-click><div class="font-mono font-semibold">Grep</div><div class="text-xs mt-1" style="color: var(--na-fg-muted)">search text</div></div>
  <div class="na-card p-3 text-center" v-click><div class="font-mono font-semibold">Glob</div><div class="text-xs mt-1" style="color: var(--na-fg-muted)">find files</div></div>
  <div class="na-card p-3 text-center" v-click><div class="font-mono font-semibold">Agent</div><div class="text-xs mt-1" style="color: var(--na-fg-muted)">a helper loop</div></div>
  <div class="na-card p-3 text-center" v-click><div class="font-mono font-semibold">WebFetch</div><div class="text-xs mt-1" style="color: var(--na-fg-muted)">a web page</div></div>
</div>

---
layout: concept
heading: "Permissions"
lines:
  - "The model asks. The harness decides: a rule from settings, or you."
  - "The mode sets how often the gate asks you."
---

<D09PermissionGate />

---
layout: concept
heading: "Hooks"
lines:
  - "Your own shell command on the ring: before a tool, after it, or at the exit"
  - "Before a tool, exit 2 blocks it. After a tool, exit 2 gives the model the error."
---

<D07HarnessLoop hooks />

---
layout: concept
heading: "Subagents"
lines:
  - "A second loop with its own window. It does the noisy work."
  - "Only one message comes back. A fork starts with a copy of your window."
---

<D10Subagents />

---
layout: concept
heading: "Skills and MCP"
lines:
  - "Skill: instructions loaded only when they match what you ask"
  - "MCP: tools from outside the repo, spoken through one protocol"
---

<div class="grid grid-cols-2 gap-8 w-full max-w-3xl">
  <div class="na-card p-5">
    <div class="font-bold text-lg mb-2">Skill</div>
    <div class="text-sm" style="color: var(--na-fg-muted)">A folder with a SKILL.md. Its one-line description is in the prompt. The body loads when needed.</div>
  </div>
  <div class="na-card p-5" v-click>
    <div class="font-bold text-lg mb-2">MCP server</div>
    <div class="text-sm" style="color: var(--na-fg-muted)">A program that offers tools: a browser, a database, an issue tracker. Claude Code lists them like its own tools.</div>
  </div>
</div>

---
layout: concept
heading: "Where cost and control come from"
lines:
  - "Cost: tokens in, tokens out, how much of the front is cached"
  - "Control: what enters the window, which tools exist, what hooks enforce"
---

<div class="flex flex-col items-center gap-6 w-full">
  <G02ContextBudget />
</div>

---
layout: concept
heading: "When the window fills: compact or clear"
lines:
  - "Fold the history into a summary and continue. Or start fresh — often better."
---

<D11CompactClear />

---
layout: concept
heading: "A question that skips the loop"
lines:
  - "Answered from what is already in the window. No tool call, no new turn."
---

<D07HarnessLoop btw />

---
layout: concept
heading: "Install and log in"
lines:
  - "One global install. One command to start. The first start opens a login."
  - "The folder you start in is its world."
---

<div class="flex flex-col items-center gap-4 w-full max-w-3xl mx-auto">

<div class="flex items-center gap-2 text-lg font-semibold" style="color: var(--na-accent-500)">
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.07 0l2.83-2.83a5 5 0 0 0-7.07-7.07l-1.5 1.5" /><path d="M14 11a5 5 0 0 0-7.07 0L4.1 13.83a5 5 0 0 0 7.07 7.07l1.5-1.5" /></svg>
  <a href="https://code.claude.com/docs/en/quickstart#step-1-install-claude-code" target="_blank" rel="noopener" style="color: var(--na-accent-500)">Install Claude Code</a>
</div>

```bash
npm install -g @anthropic-ai/claude-code
claude --version
cd your-project
claude
```

</div>

---
layout: concept
heading: "Claude Code is a harness, not the only one"
lines:
  - "Cursor, Copilot, Codex, Aider — other harnesses, same basic loop."
  - "What differs: the tools, the autonomy, how transparent the loop is."
---

<div class="grid grid-cols-2 gap-4 w-full max-w-3xl">
  <div class="na-card p-4"><div class="font-semibold mb-1" style="color: var(--na-accent-500)">Tool access</div><div class="text-sm" style="color: var(--na-fg-muted)">What can it read, run, change?</div></div>
  <div class="na-card p-4" v-click><div class="font-semibold mb-1" style="color: var(--na-accent-500)">Autonomy</div><div class="text-sm" style="color: var(--na-fg-muted)">How much runs without you watching?</div></div>
  <div class="na-card p-4" v-click><div class="font-semibold mb-1" style="color: var(--na-accent-500)">Transparency</div><div class="text-sm" style="color: var(--na-fg-muted)">Can you see what it did, and why?</div></div>
  <div class="na-card p-4" v-click><div class="font-semibold mb-1" style="color: var(--na-accent-500)">Extensibility</div><div class="text-sm" style="color: var(--na-fg-muted)">Can you add your own tools?</div></div>
</div>

---
layout: concept
heading: "The model is the same for everyone. The harness is where you win."
---


