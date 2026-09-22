---
layout: section
heading: "Hooks: rules the agent cannot cross"
routeAlias: theory-hooks
---

<template #map>
  <ToolkitMap current="hook" />
</template>

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
layout: task
number: "10"
routeAlias: task-10
heading: "Hooks"
goal: "Build a typecheck hook slowly, get the matcher wrong once, then add a deny set, an output replacement and a Stop gate."
mode: "you do"
success: "All four hooks fire, you watched the agent fix a blocked edit, and you can say why only exit 2 blocks."
branch: "10-start"
---


