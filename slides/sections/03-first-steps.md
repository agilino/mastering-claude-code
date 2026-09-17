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

<!--
Demo it live in an empty folder. One global install, one command to start. The first start
opens a login in the browser. Say once: Claude Code runs in your terminal, inside the folder
you start it in. That folder is its world: it reads and edits there, and CLAUDE.md files in
that folder are picked up automatically.
-->

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

<!--
Show a real turn. Point at the tool lines as they appear: this is the loop from the last
section, live. Read, then Glob, then an answer. Press Esc while it works to show you can
stop it at any time; the turn ends and you keep the conversation. Ctrl+C twice quits
Claude Code entirely.
-->

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

<!--
Type @ and a path; tab completes it. The file goes straight into the prompt. Contrast with
"find the spec and read it": the model then greps around, reads a few wrong files, and all
of those land in the window too. Pointing is cheaper and more precise. This is the first
context-engineering habit, and it starts on the first day.
-->

---
layout: concept
heading: "Slash commands"
lines:
  - "/help · /init · /clear · /context · /cost · /rewind"
  - "Commands talk to the harness, not to the model"
---

<div class="grid grid-cols-3 gap-3 w-full max-w-3xl text-sm">
  <div class="na-card p-3"><span class="font-mono">/help</span> <span style="color: var(--na-fg-muted)">— what exists</span></div>
  <div class="na-card p-3"><span class="font-mono">/init</span> <span style="color: var(--na-fg-muted)">— first CLAUDE.md</span></div>
  <div class="na-card p-3"><span class="font-mono">/clear</span> <span style="color: var(--na-fg-muted)">— fresh session</span></div>
  <div class="na-card p-3" v-click><span class="font-mono">/context</span> <span style="color: var(--na-fg-muted)">— what is loaded</span></div>
  <div class="na-card p-3" v-click><span class="font-mono">/cost</span> <span style="color: var(--na-fg-muted)">— tokens spent</span></div>
  <div class="na-card p-3" v-click><span class="font-mono">/rewind</span> <span style="color: var(--na-fg-muted)">— undo a step</span></div>
</div>

<!--
A slash command is an instruction to Claude Code itself. /help lists them. /init reads the
project and writes a starter CLAUDE.md. /clear empties the session. /context draws the
bars from the harness section with real numbers — run it now, on the tiny session you just
had, and read the lines aloud. /cost shows what this session spent. /rewind takes files and
conversation back to an earlier point; Claude Code checkpoints before every change.
-->

---
layout: concept
heading: "The permission prompt"
lines:
  - "Yes · yes, and do not ask again for this · no"
  - "Shift+Tab switches mode: manual → accept edits → plan"
---

<div class="na-card p-5 font-mono text-sm w-full max-w-2xl" style="color: var(--na-fg-muted)">
  <div style="color: var(--na-fg)">Bash command</div>
  <div class="mt-1">npm install zod</div>
  <div class="mt-3">Do you want to proceed?</div>
  <div class="mt-1" style="color: var(--na-accent-500)">› 1. Yes</div>
  <div>  2. Yes, and don't ask again for npm install commands</div>
  <div>  3. No, and tell Claude what to do differently</div>
</div>

<!--
Trigger one live by asking it to install a package. Read the three options. Option two
writes a rule into settings so this class of command is allowed from now on. Option three
lets you type a correction. Then press Shift+Tab: the mode label at the bottom changes.
Accept-edits stops asking for file edits. Plan mode is read-only. We use plan mode a lot
from the next part on.
-->

---
layout: concept
heading: "CLAUDE.md is your standing instruction"
lines:
  - "Read at the start of every session, folded into the system prompt"
  - "Short. Rules, not a tour."
---

```md
# CLASH
Small social app for Berlin. Spec in docs/SPEC.md.
- Next.js 16, Prisma 7 + SQLite, shadcn, Tailwind v4.
- Run `npx tsc --noEmit` before saying a change is done.
```

<!--
Open the file /init produced. It is a starting point, not the final word. The rule of
thumb: if you find yourself telling Claude the same thing in a second session, it belongs
here. Keep it short — every line is in every prompt. In the build part you will add a rule
each time the app teaches you one.
-->

---
layout: concept
heading: "In your editor"
lines:
  - "VS Code and JetBrains extensions show diffs inline"
  - "Same Claude Code, a second window onto it"
---

<div class="flex gap-4 w-full max-w-2xl justify-center">
  <div class="na-card p-4 flex-1 text-center">Terminal</div>
  <div class="na-card p-4 flex-1 text-center">VS Code extension</div>
  <div class="na-card p-4 flex-1 text-center">JetBrains plugin</div>
</div>

<!--
Mention, do not demo at length: the IDE extensions run the same Claude Code and show its
edits as inline diffs, with the current file and selection passed as context. Everyone can
pick their own surface. The workshop uses the terminal because it is the same everywhere.
-->

---
layout: concept
heading: "Keys worth knowing"
lines:
  - "Esc stop · Shift+Tab mode · Tab complete a path"
  - "Up arrow history · Ctrl+R search history · # remember"
---

<!--
Show three of these live. Esc during a turn. Shift+Tab for the mode. Tab after @ to complete
a path. Then say the rest exist and are in /help. The "#" prefix writes a line straight into
CLAUDE.md — useful when the model just did something you never want again.
-->

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

<!--
FULL WORKING PROMPT (trainer):

Read @docs/SPEC.md. In one sentence, what does this app do?

Which five kinds of records does the app need? Say how they connect to each other.

Which screen looks hardest to build, and why?

Then run /init and open the CLAUDE.md it writes. Show that it is short and that it points
at the spec. Then /context: point at the CLAUDE.md line and the spec line. This is the
first time the group sees the bars with real numbers.
-->

---
layout: task
number: "01"
heading: "Setup and first conversation"
goal: "Install Claude Code, clone the empty CLASH repo, and have your first conversation about the spec."
mode: "you do"
success: "Claude Code runs in your clone, it answered your questions about docs/SPEC.md, and CLAUDE.md exists."
branch: "01-start"
---

<!--
Task 01. Everyone installs, clones pawsaw/clash and checks out 01-start — a repo with only
the spec in it. Then the first conversation and /init. Walk the group while people work; the
usual blockers are Node version and login. Nobody moves on until Claude Code runs in their
clone and CLAUDE.md exists.
-->
