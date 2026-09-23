---
layout: task-intro
number: "01"
routeAlias: task-01
heading: "Task 01 — Setup and first conversation"
branch: "01-start"
learn:
  - "Point Claude at files with @"
  - "Read the permission prompt before answering"
  - "Run /init, /clear, /context for real"
  - "Keep CLAUDE.md short"
outcome:
  - "CLASH cloned on the 01-start branch"
  - "Three questions answered about the spec"
  - "A first CLAUDE.md, from /init"
---

---
layout: concept
heading: "The prompt is a chat in your terminal"
lines:
  - "Type a request. Watch it read, edit, run."
  - "Esc stops it. Ctrl+C twice quits — once idle."
---

<div class="na-card p-5 font-mono text-sm w-full max-w-2xl" style="color: var(--na-fg-muted)">
  <div style="color: var(--na-fg)">› What does this project do?</div>
  <div class="mt-2">⏺ Read(README.md)</div>
  <div>⏺ Glob(**/*.ts)</div>
  <div class="mt-2" style="color: var(--na-fg)">It is a small Next.js app that …</div>
</div>

---
layout: concept
heading: "Point at files with @"
lines:
  - "@docs/SPEC.md puts that file into the window"
  - "Better than \"look for the spec somewhere\""
---

```text
Read @docs/SPEC.md. Which screens does it describe?

Look at @lib/validation.ts and explain the clash schema.
```

---
layout: concept
heading: "Slash commands"
routeAlias: theory-slash-commands
docs: https://code.claude.com/docs/en/commands
lines:
  - "/help · /init · /clear · /context · /usage · /rewind"
  - "Most commands talk to the harness — a few, like /init, ask the model"
---

<div class="grid grid-cols-3 gap-3 w-full max-w-3xl text-sm">
  <div class="na-card p-3"><span class="font-mono">/help</span> <span style="color: var(--na-fg-muted)">— what exists</span></div>
  <div class="na-card p-3"><span class="font-mono">/init</span> <span style="color: var(--na-fg-muted)">— first CLAUDE.md</span></div>
  <div class="na-card p-3"><span class="font-mono">/clear</span> <span style="color: var(--na-fg-muted)">— fresh session</span></div>
  <div class="na-card p-3" v-click><span class="font-mono">/context</span> <span style="color: var(--na-fg-muted)">— what is loaded</span></div>
  <div class="na-card p-3" v-click><span class="font-mono">/usage</span> <span style="color: var(--na-fg-muted)">— tokens spent</span></div>
  <div class="na-card p-3" v-click><span class="font-mono">/rewind</span> <span style="color: var(--na-fg-muted)">— undo a step</span></div>
</div>

---
layout: concept
heading: "The permission prompt"
lines:
  - "Yes · yes, and do not ask again for this · no"
  - "Shift+Tab cycles: auto → manual → accept edits → plan → auto"
---

<div class="na-card p-5 font-mono text-sm w-full max-w-2xl" style="color: var(--na-fg-muted)">
  <div style="color: var(--na-fg)">Bash command</div>
  <div class="mt-1">npm install zod</div>
  <div class="mt-3">Do you want to proceed?</div>
  <div class="mt-1" style="color: var(--na-accent-500)">› 1. Yes</div>
  <div>  2. Yes, and don't ask again for npm install commands</div>
  <div>  3. No, and tell Claude what to do differently</div>
</div>

---
layout: concept
heading: "CLAUDE.md is your standing instruction"
routeAlias: theory-claude-md
docs: https://code.claude.com/docs/en/memory
lines:
  - "Read at session start — sent as a message after the system prompt, not folded in"
  - "Short. Rules, not a tour."
---

```md
# CLASH
Small social app for Berlin. Spec in docs/SPEC.md.
- Next.js 16, Prisma 7 + SQLite, shadcn, Tailwind v4.
- Run `npx tsc --noEmit` before saying a change is done.
```

---
layout: concept
heading: "In your editor"
lines:
  - "VS Code and JetBrains extensions show diffs inline"
  - "Same Claude Code, a second window onto it"
---

<div class="flex gap-4 w-full max-w-2xl justify-center">
  <div class="na-card p-4 flex-1 text-center">Terminal</div>
  <div v-click="1" class="na-card p-4 flex-1 text-center">VS Code extension</div>
  <div v-click="1" class="na-card p-4 flex-1 text-center">JetBrains plugin</div>
</div>

---
layout: concept
heading: "Keys worth knowing"
docs: https://code.claude.com/docs/en/interactive-mode
lines:
  - "Esc stop · Shift+Tab mode · Tab complete a path"
  - "Up arrow history · Ctrl+R search history · ? more shortcuts"
---


---
layout: code-live
heading: "Your first conversation"
filePath: "prompt to Claude Code — inside your clone of clash on 01-start"
success: "Claude answers from the spec file, not from guesses, and names the five kinds of records."
---

```text
Read @docs/SPEC.md.

⟵ LIVE: ask three things in a row — what the app does in one sentence,
        which five kinds of records it needs and how they connect,
        which screen looks hardest to build and why.
```

---
layout: task
number: "01"
heading: "Setup and first conversation"
goal: "Install Claude Code, clone the empty CLASH repo, and have your first conversation about the spec."
mode: "you do"
success: "Claude Code runs in your clone, it answered your questions about docs/SPEC.md, and CLAUDE.md exists."
branch: "01-start"
---

---
layout: concept
heading: "Flags change how a session starts"
docs: https://code.claude.com/docs/en/cli-reference
lines:
  - "--model, --settings — one-off overrides, nothing saved."
  - "Session flags are different: they change WHICH conversation opens."
---

<div class="grid grid-cols-2 gap-4 w-full max-w-3xl">
  <div class="na-card p-4"><div class="font-mono text-sm font-semibold mb-1" style="color: var(--na-accent-500)">--model</div><div class="text-sm" style="color: var(--na-fg-muted)">sonnet, opus, haiku — this session only</div></div>
  <div class="na-card p-4" v-click><div class="font-mono text-sm font-semibold mb-1" style="color: var(--na-accent-500)">--settings</div><div class="text-sm" style="color: var(--na-fg-muted)">JSON, inline or a file — above your own files</div></div>
  <div class="na-card p-4" v-click><div class="font-mono text-sm font-semibold mb-1" style="color: var(--na-accent-500)">-p / --print</div><div class="text-sm" style="color: var(--na-fg-muted)">answer, then exit — no prompt left open</div></div>
  <div class="na-card p-4" v-click><div class="font-mono text-sm font-semibold mb-1" style="color: var(--na-accent-500)">--resume / --continue</div><div class="text-sm" style="color: var(--na-fg-muted)">reopen a past conversation</div></div>
</div>

---
layout: code-live
heading: "Print mode: no interaction, just an answer"
filePath: "terminal"
success: "The command exits with an answer, no prompt, no session left open."
---

```bash
# ⟵ LIVE: ask a one-off question, then ask for it as JSON.
claude -p "___"
claude -p "___" --output-format json
```

---
layout: concept
heading: "Pick up where you left off"
lines:
  - "--continue reopens the most recent conversation in this folder."
  - "--resume shows a picker, or reopens one session by name."
---

<div class="flex gap-6 w-full max-w-3xl">
  <div class="na-card p-5 flex-1">
    <div class="font-mono text-sm font-semibold mb-2" style="color: var(--na-accent-500)">claude --continue</div>
    <div class="text-sm" style="color: var(--na-fg-muted)">The fast path: same folder, most recent conversation, no picker.</div>
  </div>
  <div class="na-card p-5 flex-1" v-click>
    <div class="font-mono text-sm font-semibold mb-2" style="color: var(--na-accent-500)">claude --resume</div>
    <div class="text-sm" style="color: var(--na-fg-muted)">Shows every session to choose from, including a finished background one.</div>
  </div>
</div>


