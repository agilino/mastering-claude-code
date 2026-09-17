# Answer key — task 10 (hooks)

The four hooks task 10 builds, as they land on `11-start`:

| File | Hook | What it does |
|---|---|---|
| `settings.json` | all four, wired up | `PostToolUse` typecheck on `app/actions/**`, the `PreToolUse` deny set, the `PostToolUse` build-log replacement, the `Stop` gate |
| `typecheck-actions.sh` | PostToolUse · Edit/Write | runs `npx tsc --noEmit`; exit 2 with the errors on stderr when it fails |
| `build-summary.sh` | PostToolUse · Bash(npm run build*) | replaces the build log with a pass/fail line, an error count and the last five lines (`hookSpecificOutput.updatedToolOutput`) |
| `build-gate.sh` | Stop | refuses to end the turn while `npm run build` fails |

Install into a CLASH clone: copy `settings.json` to `.claude/settings.json` and the three scripts to
`.claude/hooks/`, then `chmod +x .claude/hooks/*.sh`. `jq` must be on the PATH.
