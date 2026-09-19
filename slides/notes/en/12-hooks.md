<!-- @note: hooks-rules-the-agent-cannot-cross -->
- Assume nobody has written a hook yet
- Build one slowly, then show three fast
- Naming trap: CLASH's `hooks/` folder is React hooks (one file, `use-mobile.ts`)
- Claude Code hooks live in `.claude/settings.json` — different things

<!-- @note: event-matcher-exit-code -->
- Open `.claude/settings.json`
- A hook needs three things: the EVENT, the MATCHER (which tool), the EXIT CODE — everything else is detail
- Critical rule: only exit code 2 blocks
- [click] On PreToolUse/PostToolUse, plain exit-0 stdout goes only to the debug log — Claude never sees it
- [click] What reaches the agent: stderr on exit 2, or structured JSON on stdout at exit 0
- Matcher matches the TOOL NAME, not a file path
- Next slide turns that into a lesson, on purpose

<!-- @note: one-hook-slowly -->
- This is the DELIBERATE mistake — write it exactly as shown
- Edit a file under `app/actions/` through Claude Code — nothing fires. Let it sit. Ask why.
- Answer: matcher matches the TOOL NAME (Edit, Write, Bash), not a path — a path glob there is parsed as an unanchored regex against the tool name and never matches
- Fix live with the sibling "if" field:
  "matcher": "Edit|Write",
  "hooks": [{ "type": "command",
    "if": "Edit(app/actions/**)",
    "command": "${CLAUDE_PROJECT_DIR}/.claude/hooks/typecheck-actions.sh",
    "timeout": 60 }]
- `if` holds exactly one permission rule — no `or`, no list. An `Edit(...)` rule covers every file-editing tool, so it catches Write too
- Then write `.claude/hooks/typecheck-actions.sh` (reference: `workshop-artifacts/10-hooks/`)
- Introduce a type error into `app/actions/venues.ts` on purpose, through Claude Code, so the hook fires
- Watch `tsc` fail, watch Claude get the failure on stderr, watch it fix its own code — the moment people remember

<!-- @note: three-more-fast -->
- Move quickly — the idea is already in their heads
- [click:2] Output replacement: PostToolUse supports `hookSpecificOutput.updatedToolOutput` for ALL tools, not only MCP
- Use it to collapse a noisy `npm run build` log into one pass/fail line before it reaches context
- Same "context is a budget" argument, now applied to a hook instead of a CLAUDE.md rule

<!-- @note: pretooluse-deny-rules -->
- FULL WORKING SOLUTION (trainer only): `workshop-artifacts/10-hooks/settings.json`
- Three separate matcher blocks, one per tool: Edit/Write for migrations, Bash for `rm`, Read for `.env`
- `hookSpecificOutput.permissionDecision` values: allow/deny/ask — the plain exit-2 form works the same
- Demo: try editing a file under `prisma/migrations/`, watch the denial on screen

<!-- @note: gate-the-turn -->
- FULL WORKING SOLUTION (trainer only): `workshop-artifacts/10-hooks/build-gate.sh`
- Wired under "Stop" with no matcher — Stop has no tool to match on
- Demo: break the build on purpose, try to end the turn, watch Stop refuse and hand the failure tail to the agent
- Fix, end the turn, watch it succeed
- Stop gates the end of a TURN, not a tool call — name that distinction

<!-- @note: advice-vs-law -->
- Foreshadow from the skills part pays off: skills are advice, hooks are law
- [click] A skill is what you tell a new colleague; a hook is what CI rejects
- If a CLAUDE.md rule keeps getting repeated and the agent keeps drifting past it, that rule wanted to be a hook
- Mention `hard_deny` in passing, get the subsystem right: it's `settings.autoMode.hard_deny`, part of auto mode where a classifier reviews actions instead of you — not a PreToolUse decision
- Name it, don't configure it

<!-- @note: hooks -->
- Confirm people reproduced the broken matcher version before moving on
- The "why didn't it fire" beat only lands if they saw the silence themselves
