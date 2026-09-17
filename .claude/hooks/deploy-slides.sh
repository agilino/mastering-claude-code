#!/usr/bin/env bash
# Claude Code Stop hook: when anything under slides/ changed since the last
# deploy, push the current state to Vercel production in the background.
# Never blocks the turn (always exits 0). Log: .claude/.deploy-slides.log
set -uo pipefail
ROOT="${CLAUDE_PROJECT_DIR:-$(cd "$(dirname "$0")/../.." && pwd)}"
SLIDES="$ROOT/slides"
STAMP="$ROOT/.claude/.slides-deploy-hash"
LOG="$ROOT/.claude/.deploy-slides.log"
LOCK="$ROOT/.claude/.deploy-slides.lock"

command -v vercel >/dev/null 2>&1 || exit 0
[ -f "$SLIDES/.vercel/project.json" ] || exit 0

# Hash of everything that reaches the deployment (sources, not build output).
hash="$(cd "$SLIDES" && find . -type f \
  -not -path './node_modules/*' -not -path './dist/*' -not -path './.check/*' \
  -not -path './.vercel/*' -not -path './.slidev/*' -print0 \
  | sort -z | xargs -0 shasum | shasum | cut -d' ' -f1)"

[ -f "$STAMP" ] && [ "$(cat "$STAMP")" = "$hash" ] && exit 0
[ -f "$LOCK" ] && kill -0 "$(cat "$LOCK" 2>/dev/null)" 2>/dev/null && exit 0

(
  echo "$$" > "$LOCK"
  echo "=== $(date '+%Y-%m-%d %H:%M:%S') deploying slides ($hash)" >> "$LOG"
  if (cd "$SLIDES" && vercel deploy --prod --yes >> "$LOG" 2>&1); then
    echo "$hash" > "$STAMP"
    echo "=== deployed" >> "$LOG"
  else
    echo "=== deploy FAILED" >> "$LOG"
  fi
  rm -f "$LOCK"
) >/dev/null 2>&1 &
disown
exit 0
