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

<!--
Strip it down. The model is a pure function: a list of tokens goes in, a list of tokens
comes out. No files, no terminal, no memory. Everything you experience as "Claude Code" —
reading your repo, editing files, running tests, asking for permission, remembering your
rules — is done by a program wrapped around that function. We call it the harness. This
section is about every part of that program, because every part is a lever you control.
-->

---
layout: concept
heading: "The loop"
lines:
  - "You write. The harness builds the prompt. The model chooses a tool or answers."
  - "The harness runs the tool and feeds the result back. Until the model answers."
---

<D07HarnessLoop />

<!--
Walk the ring click by click. Click 1: you type "fix the bell" and the harness builds the
full prompt (next slide shows what is in it). Click 2: the harness calls the model. The
model, in the middle, does one thing: it reasons and either asks for a tool or answers.
Click 3: the tool request hits the permission gate. Click 4: the harness runs the tool.
The model never runs anything. Click 5: the result is appended to the prompt and the ring
goes round again: call model. Click 6: at some point the model answers with text instead
of a tool request. That is the exit. The turn ends and you read it. Say it twice: the
model chooses, the harness executes. Every result stays in the window from now on.
-->

---
layout: concept
heading: "What is in the prompt, every turn"
lines:
  - "Sent top to bottom on every call. The cached part was sent last time already."
  - "Only the new tail costs full price. You control most of these blocks."
---

<D08PromptStack />

<!--
Open the box, one block per click. Click 1: the system prompt Claude Code writes. Click 2:
your CLAUDE.md files, project and personal. Click 3: the list of tools with their
descriptions. Click 4: a short index of skills, one line each. Click 5: the whole history
of this session, every file it read and every command output, plus the bracket: all of
this was sent in the previous call already, so the provider serves it from cache, much
cheaper and faster. Click 6: your newest message and the newest tool result. That tail is
the only part paid in full. The history block is the one that grows. Later: /context
shows these blocks with real numbers.
-->

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

<!--
The core set is small and boring on purpose. Read, Edit, Write for files. Bash for anything
a terminal can do: tests, builds, git. Grep and Glob for searching. Agent starts another loop
with its own context — subagents, later. WebFetch pulls a page in. MCP adds tools from
outside: a browser, a database, your ticket system. The model only sees each tool's name
and description in the prompt; it decides which to call from those descriptions. That is
why tool descriptions and skill descriptions are written so carefully.
-->

---
layout: concept
heading: "Permissions"
lines:
  - "The model asks. The harness decides: a rule from settings, or you."
  - "The mode sets how often the gate asks you."
---

<D09PermissionGate />

<!--
A tool call arrives at the gate. Click 1: first the harness checks your rules in settings.
Click 2: a rule can allow it ("npm test is always fine") or deny it ("never rm"). Then the
harness runs the tool, or nothing runs and the model is told why. Click 3: no rule? Then
the permission prompt asks you, and your yes or no takes the same two paths. Clicks 4 to
8 walk the modes: manual asks before edits and commands. Accept edits lets file edits
through and still asks for commands. Plan mode is read only: the model can look but not
touch, great for thinking before building. Auto lets a classifier review each action and
block the risky ones instead of asking you. Bypass never asks; use it only in a sandbox.
The gate is the whole point: nothing dangerous happens without a decision, a rule's or yours.
-->

---
layout: concept
heading: "Hooks"
lines:
  - "Your own shell command on the ring: before a tool, after it, or at the exit"
  - "Before a tool, exit 2 blocks it. After a tool, exit 2 gives the model the error."
---

<D07HarnessLoop hooks />

<!--
Same ring, now with three places where the harness lets you in. Click 1: PreToolUse runs
your shell command before the tool. Exit code 2 blocks the call, and what you print to
stderr is handed to the model as the reason. Click 2: PostToolUse runs after the tool.
The tool already ran, so exit 2 cannot undo it; instead the stderr goes to the model,
which then fixes its own work. Example: after every edit under app/actions, a hook runs
the type checker; it fails; the model sees the error and repairs the code. Click 3: Stop
runs when the model wants to end the turn; exit 2 refuses, and the model keeps working.
Any other exit code only logs. A rule in CLAUDE.md is advice. A hook is law. Part four
builds these.
-->

---
layout: concept
heading: "Subagents"
lines:
  - "A second loop with its own window. It does the noisy work."
  - "Only one message comes back. A fork starts with a copy of your window."
---

<D10Subagents />

<!--
Remember: every tool result stays in the window. Reading twenty files to answer one
question fills the main window with twenty files. A subagent is the harness starting a
second loop with its own window. Click 1: it reads and greps in there; that window fills
up, yours barely moves. Click 2: only its final report crosses back, one message. You can
give a subagent fewer tools, a different model, its own instructions. Click 3: a fork is
the same idea, but it starts with a copy of your conversation so far, which is cheaper
when it needs what you already know. Part three uses a subagent to audit CLASH.
-->

---
layout: concept
heading: "When the window fills: compact or clear"
lines:
  - "/compact folds the history into one summary and continues"
  - "/clear starts fresh. Often the better choice."
---

<D11CompactClear />

<!--
Three tanks. The first is a session near the limit: files read, tool output, chat. Click 1:
/compact asks the model to summarise the conversation, then replaces the history with
that summary. Claude Code does this on its own near the limit: it first drops old tool
outputs, then summarises. It works, and it loses detail; compacting is itself a large
request, because the model reads everything it summarises. Click 2: /clear throws the
history away and starts a new session with the same CLAUDE.md. For a new job, /clear is
usually better: nothing from the old job leaks in. Habit to build: one job per session.
-->

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
    <div class="text-sm" style="color: var(--na-fg-muted)">A folder with a SKILL.md. Its one-line description is always in the prompt. The body loads when needed.</div>
  </div>
  <div class="na-card p-5" v-click>
    <div class="font-bold text-lg mb-2">MCP server</div>
    <div class="text-sm" style="color: var(--na-fg-muted)">A program that offers tools: a browser, a database, an issue tracker. Claude Code lists them like its own tools.</div>
  </div>
</div>

<!--
Two more parts of the harness, both built in later parts. A skill is a recipe you write
once: "how we add a feature in this repo". Only its name and description sit in every
prompt; the full text loads when the description matches your request. That keeps the
window cheap. MCP is a standard for tool servers. Install a browser MCP server and the
model can click through your app. Install a database one and it can query production —
which is exactly why permissions and hooks matter.
-->

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

<!--
Pull it together. Cost is tokens. Input tokens every call, output tokens every answer,
and the cached front part is much cheaper than the rest — long sessions with a stable
front and a short tail are the cheap ones. Control is three questions you will ask all
week: what is in the window right now, which tools can the model call, and which rules are
enforced by a hook rather than hoped for in a prompt. Close with the line: the model is the
same for everyone. The harness is where you win.
-->

---
layout: concept
heading: "The model is the same for everyone. The harness is where you win."
---

<!--
Leave it up for a moment. Everyone in this workshop has access to the same model. Nobody
gets a smarter one. The difference between "it drifted after ten minutes" and "it shipped
the feature with tests" is entirely in the harness: the context you gave it, the tools you
allowed, the rules you enforced. That is what the rest of the workshop teaches.
-->
