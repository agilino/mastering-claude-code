---
layout: section
heading: "Hooks: rules the agent cannot cross"
routeAlias: theory-hooks
---

<template #map>
  <ToolkitMap current="hook" />
</template>

---
layout: task-intro
number: "13"
routeAlias: task-13
heading: "Task 13 — Hooks"
branch: "13-start"
learn:
  - "Wire an event, a matcher, an exit code"
  - "Scope a hook to one path with if"
  - "Only exit code 2 blocks the agent"
  - "A hook is law; a skill is advice"
outcome:
  - "A typecheck hook, fires after edits in app/actions/"
  - "A deny set: migrations, rm, .env reads"
  - "A build log, collapsed to one line"
  - "A Stop gate blocks ending on a red build"
---

---
layout: concept
heading: "Event · matcher · exit code"
routeAlias: theory-hook-events
docs: https://code.claude.com/docs/en/hooks-guide
lines:
  - "PreToolUse, PostToolUse, Stop — three of more than thirty events."
  - "Only exit code 2 blocks — and only on events that can block"
  - "After a tool it cannot block: the tool already ran"
---

<G11HookLifecycle />

---
layout: code-live
heading: "One hook, slowly"
filePath: ".claude/settings.json"
success: "Editing app/actions/clashes.ts triggers npx tsc --noEmit, and a failure reaches the agent as an error it then fixes."
---

```json
{
  "hooks": {
    "PostToolUse": [
      {
        // ⟵ LIVE: write it the way it looks like it should work first:
        // a path glob directly in "matcher". Watch it silently never fire.
        "matcher": "app/actions/*.ts",
        "hooks": [
          { "type": "command", "command": "npx tsc --noEmit" }
        ]
      }
    ]
  }
}
```

---
layout: concept
heading: "Three more, fast"
lines:
  - "PreToolUse deny: prisma/migrations/*, rm, .env reads"
  - "PostToolUse output replacement: collapse the build log"
  - "Stop: keep the turn open while npm run build is red"
---

<div class="grid grid-cols-3 gap-6 w-full max-w-4xl">
  <div v-click class="na-card p-6">
    <div class="text-sm font-semibold mb-2" style="color: var(--na-accent-500)">PreToolUse · deny</div>
    <div class="text-lg">Stop a call before it runs.</div>
  </div>
  <div v-click class="na-card p-6">
    <div class="text-sm font-semibold mb-2" style="color: var(--na-accent-500)">PostToolUse · replace output</div>
    <div class="text-lg">Shrink a noisy result before it enters the window.</div>
  </div>
  <div v-click class="na-card p-6">
    <div class="text-sm font-semibold mb-2" style="color: var(--na-accent-500)">Stop · gate</div>
    <div class="text-lg">Refuse to end the turn while the build is red.</div>
  </div>
</div>

---
layout: code-live
heading: "PreToolUse deny rules"
filePath: ".claude/settings.json"
success: "Editing prisma/migrations/*, running rm, or reading .env* is denied with a clear reason before the tool runs."
---

```json
{
  "hooks": {
    "PreToolUse": [{
      "matcher": "Edit|Write",
      "hooks": [{
        "type": "command",
        // ⟵ LIVE: deny writes under prisma/migrations/** — it is
        // generated; use npm run db:migrate instead of hand-editing.
        "if": "___",
        "command": "___"
      }]
    }]
  }
}
```

---
layout: code-live
heading: "Gate the turn"
filePath: ".claude/hooks/build-gate.sh"
success: "The turn cannot end while npm run build fails. The agent sees the last lines and keeps working."
---

```bash
#!/usr/bin/env bash
set -euo pipefail

# ⟵ LIVE: run the build; exit 2 with the failure tail on stderr if it is red.
# This is a Stop hook: it gates the END of the turn, not one tool call.
```

---
layout: concept
heading: "Advice vs. law"
routeAlias: theory-advice-vs-law
---

<G12SkillsVsHooks />

---
layout: concept
heading: "Settings override each other"
docs: https://code.claude.com/docs/en/settings
lines:
  - "Five files, highest wins: managed, command line, project local, shared, user."
  - "Same key in two files? The higher one applies. Always."
---

<G21SettingsPrecedence />

---
layout: concept
heading: "The sandbox limits what a command touches"
docs: https://code.claude.com/docs/en/sandboxing
lines:
  - "A sandboxed command writes only inside your project, reaches only allowed hosts."
  - "macOS and Linux only. On Windows, run it inside WSL2."
---

<div class="flex gap-6 w-full max-w-3xl">
  <div class="na-card p-5 flex-1">
    <div class="font-semibold mb-2" style="color: var(--na-accent-500)">Filesystem</div>
    <div class="text-base" style="color: var(--na-fg-muted)">Write access: your project only. Read access: the machine, minus paths you deny.</div>
  </div>
  <div class="na-card p-5 flex-1" v-click>
    <div class="font-semibold mb-2" style="color: var(--na-accent-500)">Network</div>
    <div class="text-base" style="color: var(--na-fg-muted)">Nothing is allowed by default. A new host asks once, then is remembered.</div>
  </div>
</div>

---
layout: concept
heading: "Your org can lock settings down"
docs: https://code.claude.com/docs/en/managed-settings
lines:
  - "managed-settings.json, MDM, or the claude.ai console — deployed by an admin."
  - "Nothing you set in your own files overrides it."
---

<div class="na-card p-6 max-w-2xl text-center">
  <div class="text-lg" style="color: var(--na-fg)">Run <span class="font-mono" style="color: var(--na-accent-500)">/status</span> — the "Setting sources" line names the managed source in force.</div>
</div>

---
layout: task
number: "13"
heading: "Hooks"
goal: "Build a typecheck hook slowly, get the matcher wrong once, then add a deny set, an output replacement and a Stop gate."
mode: "you do"
success: "All four hooks fire, you watched the agent fix a blocked edit, and you can say why only exit 2 blocks."
branch: "13-start"
---




---
layout: concept
heading: "Ignored by Git is not hidden"
docs: https://code.claude.com/docs/en/env-vars
lines:
  - ".gitignore stops Git. Claude's Glob still includes ignored files by default."
  - "Dotfiles are included too. A deny rule is the security boundary."
---

<div class="grid grid-cols-3 gap-5 w-full max-w-4xl text-center">
  <div class="na-card p-5"><div class="font-mono font-semibold">.gitignore</div><div class="text-sm mt-2" style="color: var(--na-fg-muted)">not committed</div></div>
  <div class="na-card p-5" v-click><div class="font-mono font-semibold">Glob</div><div class="text-sm mt-2" style="color: var(--na-error-500)">still discoverable by default</div></div>
  <div class="na-card p-5" v-click><div class="font-semibold">permission deny</div><div class="text-sm mt-2" style="color: var(--na-success-500)">actual boundary</div></div>
</div>

---
layout: concept
heading: "Tool output becomes local history"
docs: https://code.claude.com/docs/en/claude-directory
lines:
  - "File contents, command output and pasted text enter plaintext transcripts."
  - "If a tool reads a secret, assume the transcript now contains it."
  - "Deny credential reads; choose retention deliberately."
---

<div class="flex items-center gap-4 w-full max-w-4xl justify-center text-sm">
  <div class="na-card px-4 py-3">Read .env</div><span>→</span><div class="na-card px-4 py-3">tool result</div><span>→</span><div class="na-card px-4 py-3" style="border-color: var(--na-error-500)">session.jsonl</div>
</div>


---
layout: concept
heading: "Security: three rules"
routeAlias: theory-security-rules
docs: https://code.claude.com/docs/en/security
lines:
  - "Anything a model reads can be an instruction."
  - "Quarantine: readers of untrusted text cannot write."
  - "Least privilege: the smallest tool list that works."
---
