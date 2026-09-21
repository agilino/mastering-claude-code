#!/usr/bin/env bash
# PreToolUse hook, matcher "Bash|PowerShell" — non-Windows / no-PowerShell fallback
# path. settings.json tries PowerShell first (no-shell-file-reads.ps1); this only
# runs when neither pwsh nor powershell.exe is on PATH, or on a plain POSIX clone
# of this repo. See CLAUDE.md rule 8. Parsing logic lives in no-shell-file-reads.mjs
# — quote-, escape- and heredoc/here-string-aware, so text inside a quoted string
# or a heredoc body (e.g. a commit message) is never mistaken for a command to run.
#
# Invoked as `bash script.sh` (not executed directly), so this file's own
# executable bit doesn't matter even if it's lost on a future commit.
#
# Exit 2 blocks and puts the reason on stderr. Exit 0 otherwise — including when
# node itself is unavailable (fail open rather than block on our own error).
set -uo pipefail

command -v node >/dev/null 2>&1 || exit 0
exec node "${CLAUDE_PROJECT_DIR}/.claude/hooks/no-shell-file-reads.mjs"
