#!/usr/bin/env bash
# Creates the catch-up branches 01-start .. 17-start on a LOCAL clone of
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
#   06-start  reference CLASH + vendored skills copied into .claude/skills/
#   07-start  + authored CLAUDE.md
#   08-start  + clash-feature skill, SEEDED missing ownership checks
#   09-start  == 08-start
#   10-start  ownership checks restored; + discover skill and its resolved spec
#   11-start  + path-scoped app/actions/** rule; + vitest, one trivial test, the capacity stub
#   12-start  + finished tdd skill and passing capacity.ts (end of task 11); ownership
#             checks RE-SEEDED for the audit (same seeding as 08-start)
#   13-start  ownership checks restored again
#   14-start  + hook set
#   15..17    == 14-start
#
# Every branch with code is gated: npm install, tsc, lint, test (if present), build.

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
ART_HOOKS_BUILD_SUMMARY="$(find_one '*hook*/build-summary.sh')"
ART_DISCOVER_SKILL="$(find_one '*example-mapping*/SKILL.md')"
ART_DISCOVER_REFERENCE="$(find_one '*example-mapping*/example-mapping-reference.md')"
ART_DISCOVER_SPEC="$(find_one '*example-mapping*/clash-capacity-spec.md')"
ART_RULES_FILE="$(find_one '*path-scoped-rules*/server-actions.md')"
ART_TDD_VITEST_CONFIG="$(find_one '*tdd-inner-loop*/vitest.config.ts')"
ART_TDD_CAPACITY_STUB="$(find_one '*tdd-inner-loop*/capacity.stub.ts')"
ART_TDD_FORMAT_TEST="$(find_one '*tdd-inner-loop*/format.test.ts')"
ART_TDD_SKILL="$(find_one '*tdd-inner-loop*/SKILL.md')"
ART_TDD_CAPACITY_TS="$(find_one '*tdd-inner-loop*/capacity.ts')"
ART_TDD_CAPACITY_TEST="$(find_one '*tdd-inner-loop*/capacity.test.ts')"

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
      line="${line%$'\r'}"
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
  rm -rf .next
  echo "   gate: tsc";         npx tsc --noEmit >>"$log" 2>&1 || { echo "GATE FAILED on $b (tsc). Log: $log" >&2; tail -n 40 "$log" >&2; exit 1; }
  echo "   gate: lint";        npm run lint >>"$log" 2>&1 || { echo "GATE FAILED on $b (lint). Log: $log" >&2; tail -n 40 "$log" >&2; exit 1; }
  local gate_desc="tsc lint build ok"
  if node -e "process.exit(require('./package.json').scripts.test ? 0 : 1)" 2>/dev/null; then
    echo "   gate: test";      npm run test >>"$log" 2>&1 || { echo "GATE FAILED on $b (test). Log: $log" >&2; tail -n 40 "$log" >&2; exit 1; }
    gate_desc="tsc lint test build ok"
  fi
  echo "   gate: build";       npm run build >>"$log" 2>&1 || { echo "GATE FAILED on $b (build). Log: $log" >&2; tail -n 40 "$log" >&2; exit 1; }
  SUMMARY+=("$b|$(git rev-parse --short HEAD)|$(git ls-files | wc -l | tr -d ' ')|$gate_desc")
}

note() { echo "== $1 == $2"; }

# --- 01-start: empty repo ---------------------------------------------------
for b in 01-start 02-start 03-start 04-start 05-start 06-start 07-start 08-start 09-start 10-start 11-start 12-start 13-start 14-start 15-start 16-start 17-start; do
  git branch -D "$b" >/dev/null 2>&1 || true
done
git checkout --orphan 01-start --quiet
git rm -rf --quiet . >/dev/null 2>&1 || true
git clean -fdq -e node_modules -e .env -e dev.db -e lib/generated
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

# --- 06-start: reference CLASH, vendored skills copied ------------------------
git checkout -B 06-start origin/main --quiet
mkdir -p .claude/skills
for d in .agents/skills/*/; do
  n=$(basename "$d")
  # agent-browser is skipped: task 01 already installs it as a personal skill
  # (~/.claude/skills/agent-browser), which always shadows a project-level copy
  # of the same name — a .claude/skills/agent-browser here would never run, only
  # cost context.
  if [[ "$n" != "agent-browser" ]]; then
    cp -r "$d" ".claude/skills/$n"
  fi
done
commit_all 06-start "workshop: copy vendored skills into .claude/skills/

.agents/skills/ ships nine vendored skills, but Claude Code only reads
.claude/skills/ at the project level, never .agents/skills/ directly.
Copied, not symlinked — a git-committed symlink checks out as a broken
text file on a Windows clone with core.symlinks=false, and a real
symlink would not survive this script regenerating the branch anyway.
agent-browser itself is skipped: task 01 already installs it as a
personal skill, which always shadows a project-level copy of the same
name, so copying it here would only cost context, never run."
note 06-start "reference CLASH + 8 of 9 vendored skills copied into .claude/skills/ (agent-browser stays personal-only)"
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

node <<'JS'
const fs = require('fs')
const path = 'app/actions/clashes.ts'
const raw = fs.readFileSync(path, 'utf8')
const crlf = raw.includes('\r\n')
const src = crlf ? raw.replace(/\r\n/g, '\n') : raw
const needle = '  if (!clash) return { ok: false, error: "Clash not found." };\n' +
  '  if (clash.creatorId !== user.id) {\n' +
  '    return { ok: false, error: "You can only delete clashes you created." };\n' +
  '  }\n'
if (!src.includes(needle)) { console.error(`error: expected deleteClash guard not found verbatim in ${path}`); process.exit(1) }
const out = src.replace(needle, '  if (!clash) return { ok: false, error: "Clash not found." };\n')
fs.writeFileSync(path, crlf ? out.replace(/\n/g, '\r\n') : out)
JS
node <<'JS'
const fs = require('fs')
const path = 'app/actions/venues.ts'
const raw = fs.readFileSync(path, 'utf8')
const crlf = raw.includes('\r\n')
const src = crlf ? raw.replace(/\r\n/g, '\n') : raw
const needle = '  if (!venue) return { ok: false, error: "Venue not found." };\n' +
  '  if (venue.creatorId !== user.id) {\n' +
  '    return { ok: false, error: "You can only delete venues you created." };\n' +
  '  }\n'
if (!src.includes(needle)) { console.error(`error: expected deleteVenue guard not found verbatim in ${path}`); process.exit(1) }
const out = src.replace(needle, '  if (!venue) return { ok: false, error: "Venue not found." };\n')
fs.writeFileSync(path, crlf ? out.replace(/\n/g, '\r\n') : out)
JS
commit_all 08-start "workshop: clash-feature skill (end of task 07); seed missing ownership checks for the audit

deleteClash and deleteVenue no longer verify creatorId before deleting.
This is intentional workshop content, not a CLASH bug. The audit tasks
find it; task 09 restores the guard."
note 08-start "+ clash-feature skill; deleteClash/deleteVenue missing ownership check (seeded)"
gate 08-start


# --- 09-start: nothing new ----------------------------------------------------
# Task 08 is a read-only audit; it commits no artifact of its own.
git checkout -B 09-start 08-start --quiet
note 09-start "identical to 08-start"
SUMMARY+=("09-start|$(git rev-parse --short HEAD)|$(git ls-files | wc -l | tr -d ' ')|== 08-start")

# --- 10-start: ownership checks restored; + discover skill -------------------
# Task 12 (team-and-workflow-audit) needs the ownership bug live again — it is
# re-seeded at 12-start below, using the exact same removal this script already
# runs at 08-start. Restoring it here first keeps task 10's path-scoped rule
# consistent with the code Claude reads in the meantime: the rule says every
# mutation of an existing row must check ownership, and at this point in the
# chain every action still does.
git checkout -B 10-start 09-start --quiet
git checkout origin/main --quiet -- app/actions/clashes.ts app/actions/venues.ts
mkdir -p .claude/skills/discover/references docs/specs
cp "$ART_DISCOVER_SKILL" .claude/skills/discover/SKILL.md
cp "$ART_DISCOVER_REFERENCE" .claude/skills/discover/references/example-mapping.md
cp "$ART_DISCOVER_SPEC" docs/specs/clash-capacity.md
commit_all 10-start "workshop: restore the creatorId ownership checks; add the discover skill and its resolved spec (end of task 09)"
note 10-start "ownership checks restored; + discover skill and its resolved spec"
gate 10-start

# --- 11-start: + path-scoped rule; + vitest, a trivial test, the capacity stub ---
git checkout -B 11-start 10-start --quiet
mkdir -p .claude/rules
cp "$ART_RULES_FILE" .claude/rules/server-actions.md
cp "$ART_TDD_VITEST_CONFIG" vitest.config.ts
cp "$ART_TDD_CAPACITY_STUB" lib/capacity.ts
cp "$ART_TDD_FORMAT_TEST" lib/format.test.ts
node <<'JS'
const fs = require('fs')
const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'))
pkg.scripts.test = 'vitest run'
pkg.devDependencies.vitest = '^3.0.0'
fs.writeFileSync('package.json', JSON.stringify(pkg, null, 2) + '\n')
JS
npm install --package-lock-only --no-audit --no-fund --loglevel=error
commit_all 11-start "workshop: add the path-scoped app/actions/** ownership rule; install vitest, a trivial passing test, and the capacity stub (end of task 10)

lib/capacity.ts ships deliberately wrong (always \"waitlisted\") so the
first test a participant writes against it fails on an assertion, not
a missing import. docs/specs/clash-capacity.md already arrived at
10-start, so this branch works standalone from a reset too."
note 11-start "+ path-scoped rule; + vitest, one trivial test, the capacity stub"
gate 11-start

# --- 12-start: + task 11's finished artifacts; ownership bug re-seeded -------
# Same exact-string-replacement this script runs at 08-start, run again here
# because 10-start restored the guards from main.
git checkout -B 12-start 11-start --quiet
mkdir -p .claude/skills/tdd
cp "$ART_TDD_SKILL" .claude/skills/tdd/SKILL.md
cp "$ART_TDD_CAPACITY_TS" lib/capacity.ts
cp "$ART_TDD_CAPACITY_TEST" lib/capacity.test.ts
node <<'JS'
const fs = require('fs')
const path = 'app/actions/clashes.ts'
const raw = fs.readFileSync(path, 'utf8')
const crlf = raw.includes('\r\n')
const src = crlf ? raw.replace(/\r\n/g, '\n') : raw
const needle = '  if (!clash) return { ok: false, error: "Clash not found." };\n' +
  '  if (clash.creatorId !== user.id) {\n' +
  '    return { ok: false, error: "You can only delete clashes you created." };\n' +
  '  }\n'
if (!src.includes(needle)) { console.error(`error: expected deleteClash guard not found verbatim in ${path}`); process.exit(1) }
const out = src.replace(needle, '  if (!clash) return { ok: false, error: "Clash not found." };\n')
fs.writeFileSync(path, crlf ? out.replace(/\n/g, '\r\n') : out)
JS
node <<'JS'
const fs = require('fs')
const path = 'app/actions/venues.ts'
const raw = fs.readFileSync(path, 'utf8')
const crlf = raw.includes('\r\n')
const src = crlf ? raw.replace(/\r\n/g, '\n') : raw
const needle = '  if (!venue) return { ok: false, error: "Venue not found." };\n' +
  '  if (venue.creatorId !== user.id) {\n' +
  '    return { ok: false, error: "You can only delete venues you created." };\n' +
  '  }\n'
if (!src.includes(needle)) { console.error(`error: expected deleteVenue guard not found verbatim in ${path}`); process.exit(1) }
const out = src.replace(needle, '  if (!venue) return { ok: false, error: "Venue not found." };\n')
fs.writeFileSync(path, crlf ? out.replace(/\n/g, '\r\n') : out)
JS
commit_all 12-start "workshop: add the finished tdd skill and capacity.ts; re-seed the missing ownership checks for the audit (end of task 11)

lib/capacity.ts and lib/capacity.test.ts are task 11's own answer key,
carried forward the same way every other branch carries its previous
task's result. deleteClash and deleteVenue lose their creatorId check
again, same as 08-start. This is workshop content, not a CLASH bug —
task 12 finds it, task 13 restores the guard."
note 12-start "+ finished tdd skill and capacity.ts; ownership checks re-seeded"
gate 12-start

# --- 13-start: ownership checks restored again -------------------------------
git checkout -B 13-start 12-start --quiet
git checkout origin/main --quiet -- app/actions/clashes.ts app/actions/venues.ts
commit_all 13-start "workshop: restore the creatorId ownership checks (end of task 12)"
note 13-start "ownership checks restored"
gate 13-start

# --- 14-start: + hook set -----------------------------------------------------
git checkout -B 14-start 13-start --quiet
mkdir -p .claude/hooks
cp "$ART_HOOKS_TYPECHECK" .claude/hooks/typecheck-actions.sh
cp "$ART_HOOKS_BUILD_GATE" .claude/hooks/build-gate.sh
cp "$ART_HOOKS_BUILD_SUMMARY" .claude/hooks/build-summary.sh
chmod +x .claude/hooks/typecheck-actions.sh .claude/hooks/build-gate.sh .claude/hooks/build-summary.sh
cp "$ART_HOOKS_SETTINGS" .claude/settings.json
commit_all 14-start "workshop: install the hook set — typecheck, deny rules, Stop gate (end of task 13)"
note 14-start "+ hook set"
gate 14-start

for b in 15-start 16-start 17-start; do
  git checkout -B "$b" 14-start --quiet
  note "$b" "identical to 14-start"
  SUMMARY+=("$b|$(git rev-parse --short HEAD)|$(git ls-files | wc -l | tr -d ' ')|== 14-start")
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
    08-start 09-start 10-start 11-start 12-start 13-start 14-start 15-start \
    16-start 17-start
EOT
