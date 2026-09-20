#!/usr/bin/env bash
# PreToolUse hook, matcher "Bash|PowerShell": blocks the shell used as a substitute
# for the built-in file tools (Read/Grep/Glob) — not the shell in general. Build and
# check commands (npm, node, git, npx, the project's own scripts) are never touched.
# See CLAUDE.md rule 8. Logic lives in no-shell-file-reads.mjs — quote-, escape- and
# heredoc/here-string-aware, so text inside a quoted string or a heredoc body (e.g.
# a commit message) is never mistaken for a command to run.
#
# Exit 2 blocks and puts the reason on stderr. Exit 0 otherwise — including when
# node itself is unavailable (fail open rather than block on our own error).
set -uo pipefail

command -v node >/dev/null 2>&1 || exit 0

node "$(dirname "$0")/no-shell-file-reads.mjs"
exit $?
