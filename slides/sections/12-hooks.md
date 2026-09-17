---
layout: section
heading: "Hooks: rules the agent cannot cross"
---

<template #map>
  <ToolkitMap current="hook" />
</template>

<!--
Assume nobody has written a hook. Build one slowly, then show three fast. Say the naming trap
again: CLASH's hooks/ folder is React hooks (one file, use-mobile.ts). Claude Code hooks live in
.claude/settings.json. Different things.
-->

---
layout: concept
heading: "Event · matcher · exit code"
lines:
  - "PreToolUse, PostToolUse, Stop — three of more than thirty events."
  - "Only exit code 2 blocks, and only before a tool or at Stop."
---

<G11HookLifecycle />

<!--
Open .claude/settings.json. Name the three things a hook needs: the EVENT, the MATCHER (which
tool), the EXIT CODE. Everything else is detail.

Get this exactly right: only exit code 2 blocks. On PreToolUse and PostToolUse, plain exit-0
stdout goes to the debug log only; Claude never sees it. What reaches the agent is stderr on exit
2, or structured JSON on stdout at exit 0. And: matcher matches the TOOL NAME, not a file path.
The next slide turns that into a lesson on purpose.
-->

---
layout: code-live
heading: "One hook, slowly"
filePath: ".claude/settings.json"
success: "Editing app/actions/clashes.ts triggers npx tsc --noEmit, and a failure blocks with the error visible to the agent."
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

<!--
This is the DELIBERATE mistake. Write it exactly as shown. Edit a file under app/actions/ through
Claude Code. Nothing fires. Let it sit. Ask why.

Answer: matcher matches the TOOL NAME (Edit, Write, Bash), not a path. A path glob there is parsed
as an unanchored regex against the tool name and never matches.

Fix live with the sibling "if" field:
  "matcher": "Edit|Write",
  "hooks": [{ "type": "command",
    "if": "Edit(app/actions/**) or Write(app/actions/**)",
    "command": "${CLAUDE_PROJECT_DIR}/.claude/hooks/typecheck-actions.sh",
    "timeout": 60 }]

Then write .claude/hooks/typecheck-actions.sh (reference: workshop-artifacts/10-hooks/). Introduce
a type error into app/actions/venues.ts on purpose, through Claude Code, so the hook fires. Watch
tsc fail, watch Claude get the failure on stderr, watch it fix its own code. This is the moment
people remember.
-->

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

<!--
Move quickly; the idea is already in their heads. Output replacement: PostToolUse supports
hookSpecificOutput.updatedToolOutput for ALL tools, not only MCP. Use it to collapse a noisy npm
run build log into one pass/fail line before it reaches context. Same "context is a budget"
argument, applied to a hook instead of a CLAUDE.md rule.
-->

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
      "matcher": "Edit|Write|MultiEdit",
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

<!--
FULL WORKING SOLUTION (trainer only): workshop-artifacts/10-hooks/settings.json. Three separate
matcher blocks, one per tool: Edit/Write for migrations, Bash for rm, Read for .env. Decision
values for hookSpecificOutput.permissionDecision are allow/deny/ask; the plain exit-2 form works
the same. Demo: try editing a file under prisma/migrations/, watch the denial on screen.
-->

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

<!--
FULL WORKING SOLUTION (trainer only): workshop-artifacts/10-hooks/build-gate.sh, wired under
"Stop" with no matcher (Stop has no tool to match on). Demo: break the build on purpose, try to end
the turn, watch Stop refuse and hand the failure tail to the agent. Fix, end the turn, watch it
succeed. This is the one hook that gates a TURN rather than a tool call. Name that distinction.
-->

---
layout: concept
heading: "Advice vs. law"
---

<G12SkillsVsHooks />

<!--
The foreshadow from the skills part pays off. Skills are advice. Hooks are law. A skill is what
you tell a new colleague; a hook is what CI rejects. If you keep repeating a rule in CLAUDE.md and
the agent keeps drifting past it, that rule wanted to be a hook.

Mention hard_deny in passing and get the subsystem right: it is settings.autoMode.hard_deny, part
of auto mode where a classifier reviews actions instead of you. Not a PreToolUse decision. Name
it, do not configure it.
-->

---
layout: task
number: "10"
heading: "Hooks"
goal: "Build a typecheck hook slowly, get the matcher wrong once, then add a deny set, an output replacement and a Stop gate."
mode: "you do"
success: "All four hooks fire, you watched the agent fix a blocked edit, and you can say why only exit 2 blocks."
branch: "10-start"
---

<!--
Confirm people reproduced the broken matcher version before moving on. The "why didn't it fire"
beat only lands if they saw the silence themselves.
-->
