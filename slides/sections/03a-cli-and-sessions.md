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
