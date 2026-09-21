#!/usr/bin/env bash
# Collects every http(s) URL in the workshop's markdown and checks it is live.
# Writes docs/LINK-AUDIT.md. Exit 1 if any URL fails.
set -uo pipefail
cd "$(dirname "$0")/.."
OUT=docs/LINK-AUDIT.md
# --exclude: the report itself lives in docs/, so without it a URL that was removed from
# the content would be read back from the old report and never leave it
urls="$(grep -rhoE --exclude=LINK-AUDIT.md 'https?://[A-Za-z0-9./_#?=&%+~:@-]+' README.md FACILITATOR.md docs tasks slides/sections slides/notes slides/BRAND.md slides/scripts/generate-qr.mjs workshop-artifacts 2>/dev/null \
  | sed -E 's/[.,;:]+$//' | grep -v '://localhost' | sort -u)"
{
  echo "# Link audit"
  echo
  echo "Every external URL in README, FACILITATOR, docs, tasks, slides and answer keys, checked live by \`scripts/audit-links.sh\`."
  echo
  echo "| Status | URL |"
  echo "|---|---|"
} > "$OUT"
fail=0
while IFS= read -r u; do
  [ -z "$u" ] && continue
  code="$(curl -s -o /dev/null -L -A 'Mozilla/5.0 (link-audit)' --max-time 25 -w '%{http_code}' "$u" || echo 000)"
  case "$code" in 2*|3*) st="ok $code" ;; *) st="FAIL $code"; fail=$((fail+1)) ;; esac
  echo "| $st | $u |" >> "$OUT"
  echo "$st  $u"
done <<< "$urls"
echo "" >> "$OUT"; echo "$fail failing URL(s)." >> "$OUT"
echo "$fail failing URL(s). Written to $OUT"
[ "$fail" -eq 0 ]
