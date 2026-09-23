# Catch-up branches on `pawsaw/clash`

Every task has a branch named `NN-start`. It holds the state at the **start** of task NN,
so `git checkout NN-start` lets you rejoin at that task without debugging your own build.

The branches are created by [`scripts/prepare-branches.sh`](../scripts/prepare-branches.sh)
on a local clone. The script never pushes. Every branch with code passes
`npx tsc --noEmit`, `npm run lint` and `npm run build` before the script prints its summary.

## What each branch holds

| Branch | Adds, compared with the branch before | How it is built |
|---|---|---|
| `01-start` | An empty repository: `README.md`, `docs/SPEC.md`, `.gitignore`. No code. | Orphan branch from `scripts/checkpoints/01/` plus this repo's `docs/SPEC.md`. |
| `02-start` | A curated `CLAUDE.md` v0 for the empty repo + spec stage. Current `/init` output can vary by Claude Code version, so this checkpoint is intentionally stable rather than byte-for-byte generated. | `scripts/checkpoints/02/CLAUDE.md`. |
| `03-start` | The Next.js 16 scaffold (Tailwind v4, shadcn/ui primitives, theme provider), the Prisma schema with all five models, the migration and the seed. A placeholder home page. `CLAUDE.md` with the first invariants. | Files listed in `scripts/checkpoints/03/manifest.txt` are taken from `main`; `overrides/` replaces `app/page.tsx` and `CLAUDE.md`. |
| `04-start` | Register, login, logout, the session cookie, `requireUser`, the `(auth)` and `(app)` route groups, sidebar and top bar, and the clashes list, detail, new, edit and delete. Also the map components (`components/map/*`, `lib/data/map.ts`) and the location picker, because the clash form uses them; the map page is not there yet. | Manifest 04 from `main`; overrides trim the sidebar to Dashboard, Clashes and My Clashes, give the top bar no bell and no search, replace the dashboard with a placeholder, remove the join, leave, accept and reject actions and the notification emit from `app/actions/clashes.ts`, and remove the join controls and the requests tab from the clash detail page. |
| `05-start` | Venues (list, detail, new, edit, delete, "host a clash here"), the map page, join, leave, accept and reject, `lib/notify.ts` and the notification bell. | Manifest 05 from `main` restores the full clashes actions and detail page; overrides keep the dashboard placeholder, keep Profile and Settings out of the sidebar, and give the top bar the bell but no search. |
| `06-start` | The reference CLASH. Profile with avatar crop, public profiles, search, dashboard, theme, settings, the vendored skills in `.agents/skills/`, 8 of the 9 copied into `.claude/skills/` so Claude Code actually loads them. | `main`, plus one workshop commit copying `.agents/skills/*` into `.claude/skills/*`, except `agent-browser` — task 01 already installs that one as a personal skill, which always shadows a project copy of the same name. |
| `07-start` | `CLAUDE.md` authored around the real invariants (the answer key of task 06). | `workshop-artifacts/06-context-and-claude-md/CLAUDE.md`. |
| `08-start` | The `clash-feature` skill (answer key of task 07). **Seeded vulnerability**: the `creatorId` ownership check is removed from `deleteClash` and `deleteVenue`. | `workshop-artifacts/07-clash-feature-skill/SKILL.md`; the two guards are removed by an exact string replacement, which aborts if the code has changed. |
| `09-start` | Nothing. | Identical to `08-start`. |
| `10-start` | The ownership checks are back, plus the `discover` skill (`SKILL.md`, `references/`, `templates/`) and its resolved `docs/specs/clash-capacity.md` spec (both answer keys of task 09). | `app/actions/clashes.ts` and `app/actions/venues.ts` restored from `main`; `workshop-artifacts/09-example-mapping/`. |
| `11-start` | The path-scoped `app/actions/**` ownership rule (answer key of task 10), plus vitest, one trivial passing test, and a deliberately wrong `lib/capacity.ts` stub — task 11 needs all of this to work standalone from a reset. | `workshop-artifacts/10-path-scoped-rules/server-actions.md` and `workshop-artifacts/11-tdd-inner-loop/`; `vitest` added to `package.json` by script. |
| `12-start` | The finished `.claude/skills/tdd/SKILL.md` and a passing `lib/capacity.ts` and `lib/capacity.test.ts` (answer key of task 11). **Ownership checks re-seeded** for the audit — the same exact-string removal `08-start` used, run again against the restored code. | `workshop-artifacts/11-tdd-inner-loop/`; the ownership guards are removed by the same Node script `08-start` uses. |
| `13-start` | The ownership checks are back again (the fix merged in task 12). | `app/actions/clashes.ts` and `app/actions/venues.ts` restored from `main`. |
| `14-start` | The hook set: `.claude/settings.json`, `.claude/hooks/typecheck-actions.sh`, `.claude/hooks/build-gate.sh` (answer key of task 13). | `workshop-artifacts/13-hooks/`. |
| `15-start`, `16-start`, `17-start` | Nothing. Worktrees, CI, the Agent SDK and the capstone add files outside the app or in your own worktree. | Identical to `14-start`. |

## Notes on the build stages (03 to 05)

- The map components (`components/map/*`, `lib/data/map.ts`) are already on `04-start`, because the
  clash form uses the location picker. The map **page** arrives on `05-start`.
- `package.json` is the same on every branch from `03-start` on. A participant who builds by hand adds
  dependencies over time; the checkpoints carry them all from the start.
- The seed on `03-start` already creates 8 users, 8 venues and 8 clashes, so a participant who resets
  to any build stage has data to look at.
- The vendored skills in CLASH's `.agents/skills/` and `skills-lock.json` are not on the build stages.
  They arrive with the reference on `06-start`, with 8 of the 9 copied into `.claude/skills/` at
  the project level — `agent-browser` is skipped since task 01 already installs it as a personal
  skill, and a project copy of the same name would just be shadowed. Real data for task 06's
  `/skill-doctor` step from the first checkout.

## Seeded vulnerability, said plainly

Upstream CLASH `main` has **no** missing ownership check. All exported Server Actions are guarded.
The guard on `deleteClash` and `deleteVenue` is removed and restored three times across the branch
chain — restore, reseed, refix — and each move is deliberate:

- `08-start` **removes** it, so task 08's subagent has something real to audit.
- `10-start` **restores** it from `main`. Task 10 writes a project rule stating this exact
  ownership-check convention, scoped to `app/actions/**` — if the bug were still live while that
  task reads the file, the rule would contradict the code Claude is reading and could get "fixed"
  early, spoiling task 12's find. Restoring one branch ahead of task 10, at `10-start`, keeps the
  two consistent through tasks 10–11.
- `12-start` **removes** it again — the same exact-string replacement `08-start` used, run a
  second time — so task 12's audit (agent team, then dynamic workflow) has something to find.
- `13-start` **restores** it from `main` a second time, as the merged fix.

This is workshop content, not a CLASH bug.
See `workshop-artifacts/12-team-and-workflow-audit/AUTH-FIX.md` for the diff and a proof-of-concept call.

## Create and publish

```bash
git clone https://github.com/pawsaw/clash /tmp/clash-branches
./scripts/prepare-branches.sh /tmp/clash-branches
```

Review, then push in a separate, explicit step:

```bash
git -C /tmp/clash-branches push origin \
  01-start 02-start 03-start 04-start 05-start 06-start 07-start \
  08-start 09-start 10-start 11-start 12-start 13-start 14-start \
  15-start 16-start 17-start
```

The existing `wk/*` branches on `pawsaw/clash` belong to another workshop and are not touched.
