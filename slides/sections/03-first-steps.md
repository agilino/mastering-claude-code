---
layout: concept
heading: "Install and log in"
lines:
  - "One global install. One command to start. The first start opens a login."
  - "The folder you start in is its world."
---

```bash
npm install -g @anthropic-ai/claude-code
claude --version
cd your-project
claude
```

---
layout: concept
heading: "The prompt is a chat in your terminal"
lines:
  - "Type a request. Watch it read, edit, run."
  - "Esc stops it. Ctrl+C twice quits."
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
lines:
  - "/help · /init · /clear · /context · /cost · /rewind"
  - "Most commands talk to the harness — a few, like /init, ask the model"
---

<div class="grid grid-cols-3 gap-3 w-full max-w-3xl text-sm">
  <div class="na-card p-3"><span class="font-mono">/help</span> <span style="color: var(--na-fg-muted)">— what exists</span></div>
  <div class="na-card p-3"><span class="font-mono">/init</span> <span style="color: var(--na-fg-muted)">— first CLAUDE.md</span></div>
  <div class="na-card p-3"><span class="font-mono">/clear</span> <span style="color: var(--na-fg-muted)">— fresh session</span></div>
  <div class="na-card p-3" v-click><span class="font-mono">/context</span> <span style="color: var(--na-fg-muted)">— what is loaded</span></div>
  <div class="na-card p-3" v-click><span class="font-mono">/cost</span> <span style="color: var(--na-fg-muted)">— tokens spent</span></div>
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


