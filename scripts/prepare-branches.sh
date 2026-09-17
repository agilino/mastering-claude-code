#!/usr/bin/env bash
# Creates the catch-up branches 01-start .. 14-start on a LOCAL clone of
# pawsaw/clash. Never pushes. Run from anywhere:
#
#   ./scripts/prepare-branches.sh /path/to/clash-clone
#
# NN-start is the state at the START of task NN. See docs/BRANCHES.md.
#
#   01-start  empty repo: README, docs/SPEC.md, .gitignore
#   02-start  + CLAUDE.md v0
#   03-start  scaffold + Prisma schema + migration + seed        (from main, manifest 03)
#   04-start  + auth, app shell, clashes                          (manifest 04)
#   05-start  + venues, map, participation, notifications        (manifest 05)
#   06-start  reference CLASH (== main)
#   07-start  + authored CLAUDE.md
#   08-start  + clash-feature skill, SEEDED missing ownership checks
#   09-start  == 08-start
#   10-start  ownership checks restored
#   11-start  + hook set
#   12..14    == 11-start
#
# Every branch with code is gated: npm install, tsc, lint, build.

set -euo pipefail

CLASH_DIR="${1:?usage: prepare-branches.sh /path/to/clash-clone}"
ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
CK="$ROOT/scripts/checkpoints"
ARTIFACTS="$ROOT/workshop-artifacts"
LOG_DIR="${PREPARE_LOG_DIR:-$(mktemp -d)}"
SKIP_GATE="${SKIP_GATE:-0}"

# Answer keys, located by shape so a renamed folder still resolves.
find_one() { local hit; hit="$(find "$ARTIFACTS" -path "$1" -type f | head -n 1)"; [[ -n "$hit" ]] || { echo "error: no artifact matches $1" >&2; exit 1; }; echo "$hit"; }
ART_CLAUDE_MD="$(find_one '*context*/CLAUDE.md')"
ART_SKILL_MD="$(find_one '*skill*/SKILL.md')"
ART_HOOKS_SETTINGS="$(find_one '*hook*/settings.json')"
ART_HOOKS_TYPECHECK="$(find_one '*hook*/typecheck-actions.sh')"
ART_HOOKS_BUILD_GATE="$(find_one '*hook*/build-gate.sh')"

cd "$CLASH_DIR"
if [[ -n "$(git status --porcelain)" ]]; then
  echo "error: $CLASH_DIR has uncommitted changes. Commit, stash, or use a fresh clone." >&2
  exit 1
fi
git fetch origin --quiet

if [[ ! -f .env ]]; then
  printf 'DATABASE_URL="file:./dev.db"\nSESSION_SECRET="workshop-secret"\n' > .env
fi

declare -a SUMMARY=()
START_TS=$(date +%s)

commit_all() {           # commit_all <branch> <message>
  git add -A
  git -c user.name="workshop" -c user.email="workshop@nextacademy.io" commit --quiet --allow-empty -m "$2"
}

apply_checkpoint() {     # apply_checkpoint <NN>  — manifest from main, then overrides
  local n="$1"
  if [[ -f "$CK/$n/manifest.txt" ]]; then
    while IFS= read -r line; do
      [[ -z "$line" || "$line" == \#* ]] && continue
      git checkout origin/main --quiet -- "$line"
    done < "$CK/$n/manifest.txt"
  fi
  if [[ -d "$CK/$n/overrides" ]]; then
    (cd "$CK/$n/overrides" && find . -type f) | while IFS= read -r f; do
      mkdir -p "$(dirname "$f")"
      cp "$CK/$n/overrides/$f" "$f"
    done
  fi
}

gate() {                 # gate <branch>
  local b="$1" log="$LOG_DIR/$1.log"
  if [[ "$SKIP_GATE" == "1" ]]; then SUMMARY+=("$b|$(git rev-parse --short HEAD)|$(git ls-files | wc -l | tr -d ' ')|skipped"); return; fi
  echo "   gate: npm install"; npm install --no-audit --no-fund --loglevel=error >"$log" 2>&1 || { echo "GATE FAILED on $b (npm install). Log: $log" >&2; tail -n 30 "$log" >&2; exit 1; }
  echo "   gate: tsc";         npx tsc --noEmit >>"$log" 2>&1 || { echo "GATE FAILED on $b (tsc). Log: $log" >&2; tail -n 40 "$log" >&2; exit 1; }
  echo "   gate: lint";        npm run lint >>"$log" 2>&1 || { echo "GATE FAILED on $b (lint). Log: $log" >&2; tail -n 40 "$log" >&2; exit 1; }
  echo "   gate: build";       npm run build >>"$log" 2>&1 || { echo "GATE FAILED on $b (build). Log: $log" >&2; tail -n 40 "$log" >&2; exit 1; }
  SUMMARY+=("$b|$(git rev-parse --short HEAD)|$(git ls-files | wc -l | tr -d ' ')|tsc lint build ok")
}

note() { echo "== $1 == $2"; }

# --- 01-start: empty repo ---------------------------------------------------
git checkout --orphan 01-start --quiet
git rm -rf --quiet . >/dev/null 2>&1 || true
git clean -fdq -e node_modules -e .env -e dev.db -e .next -e lib/generated
mkdir -p docs
cp "$CK/01/README.md" README.md
cp "$CK/01/.gitignore" .gitignore
cp "$ROOT/docs/SPEC.md" docs/SPEC.md
commit_all 01-start "workshop: empty start — README, docs/SPEC.md, .gitignore"
note 01-start "empty repo with the product spec"
SUMMARY+=("01-start|$(git rev-parse --short HEAD)|$(git ls-files | wc -l | tr -d ' ')|no code")

# --- 02-start: + CLAUDE.md v0 -----------------------------------------------
git checkout -B 02-start 01-start --quiet
cp "$CK/02/CLAUDE.md" CLAUDE.md
commit_all 02-start "workshop: CLAUDE.md v0 from /init"
note 02-start "+ CLAUDE.md v0"
SUMMARY+=("02-start|$(git rev-parse --short HEAD)|$(git ls-files | wc -l | tr -d ' ')|no code")

# --- 03..05: build stages assembled from main --------------------------------
git checkout -B 03-start 02-start --quiet
apply_checkpoint 03
commit_all 03-start "workshop: scaffold + Prisma data model + seed (end of task 02)"
note 03-start "scaffold, Prisma schema, migration, seed"
gate 03-start

git checkout -B 04-start 03-start --quiet
apply_checkpoint 04
commit_all 04-start "workshop: auth, app shell, clashes (end of task 03)"
note 04-start "+ auth, app shell, clashes"
gate 04-start

git checkout -B 05-start 04-start --quiet
apply_checkpoint 05
commit_all 05-start "workshop: venues, map, participation, notifications (end of task 04)"
note 05-start "+ venues, map, participation, notifications"
gate 05-start

# --- 06-start: reference CLASH ----------------------------------------------
git checkout -B 06-start origin/main --quiet
note 06-start "reference CLASH (identical to main)"
gate 06-start

# --- 07-start: + authored CLAUDE.md -----------------------------------------
git checkout -B 07-start 06-start --quiet
cp "$ART_CLAUDE_MD" CLAUDE.md
commit_all 07-start "workshop: CLAUDE.md authored around the real invariants (end of task 06)"
note 07-start "+ authored CLAUDE.md"
gate 07-start

# --- 08-start: + skill, seeded missing ownership checks ---------------------
git checkout -B 08-start 07-start --quiet
mkdir -p .claude/skills/clash-feature
cp "$ART_SKILL_MD" .claude/skills/clash-feature/SKILL.md

python3 - "app/actions/clashes.ts" <<'PY'
import sys
path = sys.argv[1]; src = open(path).read()
needle = ('  if (!clash) return { ok: false, error: "Clash not found." };\n'
          '  if (clash.creatorId !== user.id) {\n'
          '    return { ok: false, error: "You can only delete clashes you created." };\n'
          '  }\n')
if needle not in src: sys.exit(f"error: expected deleteClash guard not found verbatim in {path}")
open(path, "w").write(src.replace(needle, '  if (!clash) return { ok: false, error: "Clash not found." };\n', 1))
PY
python3 - "app/actions/venues.ts" <<'PY'
import sys
path = sys.argv[1]; src = open(path).read()
needle = ('  if (!venue) return { ok: false, error: "Venue not found." };\n'
          '  if (venue.creatorId !== user.id) {\n'
          '    return { ok: false, error: "You can only delete venues you created." };\n'
          '  }\n')
if needle not in src: sys.exit(f"error: expected deleteVenue guard not found verbatim in {path}")
open(path, "w").write(src.replace(needle, '  if (!venue) return { ok: false, error: "Venue not found." };\n', 1))
PY
commit_all 08-start "workshop: clash-feature skill (end of task 07); seed missing ownership checks for the audit

deleteClash and deleteVenue no longer verify creatorId before deleting.
This is intentional workshop content, not a CLASH bug. The audit tasks
find it; task 09 restores the guard."
note 08-start "+ clash-feature skill; deleteClash/deleteVenue missing ownership check (seeded)"
gate 08-start

git checkout -B 09-start 08-start --quiet
note 09-start "identical to 08-start"
SUMMARY+=("09-start|$(git rev-parse --short HEAD)|$(git ls-files | wc -l | tr -d ' ')|== 08-start")

# --- 10-start: ownership checks restored -------------------------------------
git checkout -B 10-start 09-start --quiet
git checkout origin/main --quiet -- app/actions/clashes.ts app/actions/venues.ts
commit_all 10-start "workshop: restore the creatorId ownership checks (end of task 09)"
note 10-start "ownership checks restored"
gate 10-start

# --- 11-start: + hook set ----------------------------------------------------
git checkout -B 11-start 10-start --quiet
mkdir -p .claude/hooks
cp "$ART_HOOKS_TYPECHECK" .claude/hooks/typecheck-actions.sh
cp "$ART_HOOKS_BUILD_GATE" .claude/hooks/build-gate.sh
chmod +x .claude/hooks/typecheck-actions.sh .claude/hooks/build-gate.sh
cp "$ART_HOOKS_SETTINGS" .claude/settings.json
commit_all 11-start "workshop: install the hook set — typecheck, deny rules, Stop gate (end of task 10)"
note 11-start "+ hook set"
gate 11-start

for b in 12-start 13-start 14-start; do
  git checkout -B "$b" 11-start --quiet
  note "$b" "identical to 11-start"
  SUMMARY+=("$b|$(git rev-parse --short HEAD)|$(git ls-files | wc -l | tr -d ' ')|== 11-start")
done

git checkout main --quiet

END_TS=$(date +%s)
echo
echo "branch    | commit  | files | gate"
echo "----------|---------|-------|-------------------"
for row in "${SUMMARY[@]}"; do
  IFS='|' read -r b c f g <<<"$row"
  printf '%-9s | %-7s | %5s | %s\n' "$b" "$c" "$f" "$g"
done
echo
echo "Elapsed: $((END_TS - START_TS))s. Logs: $LOG_DIR"
cat <<'EOT'

All branches created LOCALLY. Nothing has been pushed.

Review:
  git log --oneline --all --graph | head -40
  git diff 07-start 08-start -- app/actions/

To publish (separate, explicit step):
  git push origin 01-start 02-start 03-start 04-start 05-start 06-start 07-start \
    08-start 09-start 10-start 11-start 12-start 13-start 14-start
EOT
