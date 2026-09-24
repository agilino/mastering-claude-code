---
layout: concept
heading: "Nobody at the keyboard"
lines:
  - "A style: every answer in the session, one voice."
  - "A loop and a background session: work goes on while you look away."
  - "A routine: the cloud runs it, your laptop closed."
---

---
layout: task-intro
number: "18"
routeAlias: task-18
heading: "Task 18 — Automate"
branch: "18-start (in your CLASH clone)"
learn:
  - "Set the voice of every answer with an output style"
  - "Run a self-paced /loop and stop it with Esc"
  - "Send a session to the background, watch it in claude agents"
  - "See a routine run in the cloud, created with /schedule"
outcome:
  - "host-notes.md: every answer ends with one line for a host"
  - "A loop that reports on the background build"
  - "docs/audit.md, written by a background session in a worktree"
  - "A spec-drift routine in the cloud, seen in the trainer demo"
---

---
layout: concept
heading: "An output style sets the voice"
routeAlias: theory-output-styles
docs: https://code.claude.com/docs/en/output-styles
lines:
  - "One set of instructions for every response: role, tone, format."
  - "Each built-in keeps the Default instructions and adds its own."
  - "Yours: a Markdown file in .claude/output-styles/. Restart to load it."
---

<div class="grid grid-cols-2 gap-6 w-full max-w-3xl">
  <div class="na-card p-5">
    <div class="text-lg font-semibold mb-1" style="color: var(--na-accent-500)">Proactive</div>
    <div class="font-mono text-sm mb-2" style="color: var(--na-fg-muted)">/output-style proactive</div>
    <div class="text-base">Starts right away and assumes instead of asking.</div>
  </div>
  <div class="na-card p-5" style="border-color: var(--na-accent-500)">
    <div class="text-lg font-semibold mb-1" style="color: var(--na-accent-500)">Concise</div>
    <div class="font-mono text-sm mb-2" style="color: var(--na-fg-muted)">/output-style concise</div>
    <div class="text-base">The result first. No lead-in, no recap.</div>
  </div>
  <div class="na-card p-5">
    <div class="text-lg font-semibold mb-1" style="color: var(--na-accent-500)">Explanatory</div>
    <div class="font-mono text-sm mb-2" style="color: var(--na-fg-muted)">/output-style explanatory</div>
    <div class="text-base">Short Insight blocks that explain its choices.</div>
  </div>
  <div class="na-card p-5">
    <div class="text-lg font-semibold mb-1" style="color: var(--na-accent-500)">Learning</div>
    <div class="font-mono text-sm mb-2" style="color: var(--na-fg-muted)">/output-style learning</div>
    <div class="text-base">Insights, plus code you write yourself.</div>
  </div>
</div>

---
layout: code-live
heading: "host-notes.md"
filePath: ".claude/output-styles/host-notes.md (in your CLASH clone)"
success: "After a restart, /output-style lists host-notes, and every answer ends with one plain line for a host."
---

```md
---
description: Ends every answer with one plain line for a CLASH host.
keep-coding-instructions: true
---

Work as usual. Then end every answer with exactly one extra line.
⟵ LIVE  what that line starts with, who it is for, what it must not contain
```

---
layout: concept
heading: "/loop: the prompt comes back"
routeAlias: theory-loop
docs: https://code.claude.com/docs/en/scheduled-tasks
lines:
  - "/loop <prompt> with no interval: Claude picks the pause and prints why."
  - "Esc stops it while it waits. It fires only while the session runs and is idle."
  - ".claude/loop.md replaces the built-in prompt of a bare /loop."
---

<div class="flex gap-6 w-full max-w-4xl">
  <div class="na-card p-5 flex-1">
    <div class="text-sm font-semibold mb-2" style="color: var(--na-accent-500)">1 · Type</div>
    <div class="text-lg font-mono">/loop &lt;your prompt&gt;</div>
  </div>
  <div v-click class="na-card p-5 flex-1">
    <div class="text-sm font-semibold mb-2" style="color: var(--na-accent-500)">2 · Run</div>
    <div class="text-lg">The prompt runs. Claude reports, picks a pause, says why.</div>
  </div>
  <div v-click class="na-card p-5 flex-1">
    <div class="text-sm font-semibold mb-2" style="color: var(--na-accent-500)">3 · Again</div>
    <div class="text-lg">It runs again, until Esc or until Claude ends it: job done.</div>
  </div>
</div>

---
layout: concept
heading: "Background: the session keeps working"
routeAlias: theory-background-sessions
docs: https://code.claude.com/docs/en/agent-view
lines:
  - "A background session is a full conversation with no terminal attached."
  - "Before its first edit it moves into a worktree under .claude/worktrees/."
  - "Space peeks, Enter attaches, ← detaches. Detaching never stops it."
---

<div class="flex flex-col gap-3 w-full max-w-2xl">
  <div class="na-card px-5 py-3 flex gap-4 items-center"><span class="font-mono text-sm w-44 shrink-0" style="color: var(--na-accent-500)">/bg</span><span style="color: var(--na-fg-muted)">send this conversation to the background, from inside it</span></div>
  <div class="na-card px-5 py-3 flex gap-4 items-center" v-click><span class="font-mono text-sm w-44 shrink-0" style="color: var(--na-accent-500)">claude --bg "…"</span><span style="color: var(--na-fg-muted)">start a session that goes straight to the background</span></div>
  <div class="na-card px-5 py-3 flex gap-4 items-center" v-click><span class="font-mono text-sm w-44 shrink-0" style="color: var(--na-accent-500)">claude agents</span><span style="color: var(--na-fg-muted)">one screen for all your background sessions</span></div>
</div>

---
layout: concept
heading: "Routines: the cloud runs it"
routeAlias: theory-routines
docs: https://code.claude.com/docs/en/routines
lines:
  - "A saved prompt, repositories and connectors. Anthropic's cloud runs it."
  - "Triggers: a schedule, an HTTP POST, or a GitHub event. Research preview."
  - "/schedule in the CLI or claude.ai/code/routines. Needs a claude.ai plan."
---

<G25ScheduleOptions />

---
layout: code-live
heading: "The spec-drift routine"
filePath: "/schedule (trainer demo)"
success: "Claude Code shows the routine summary to confirm, and /schedule list names the routine afterwards."
---

```txt
/schedule ___ spec-drift guard for CLASH. Compare the rules in docs/SPEC.md
(the "Rules" and "Data" sections) with prisma/schema.prisma and with the
exported Server Actions in app/actions/. When a rule and the code disagree,
open a pull request that names the rule, the file and a proposed fix.
One pull request per run.

⟵ LIVE: the cadence in the blank, then one sentence for the no-drift case.
```

---
layout: task
number: "18"
heading: "Automate"
goal: "Set an output style, run a self-paced loop, send an audit to the background, then watch a routine run in the cloud."
mode: "you do"
success: "Every answer ends with a host line, the loop ran and stopped, docs/audit.md sits in a worktree, and the routine is listed."
branch: "18-start (in your CLASH clone)"
---
