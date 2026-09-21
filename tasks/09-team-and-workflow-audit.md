# Task 09 — Team and workflow audit

> Part: Orchestrate and let go · Reset branch: `09-start`

## You will end up with

The same audit as task 08, run two more ways: once by an agent team, once by a dynamic
workflow that Claude wrote as a script. Then the fix is merged. The branch ends with shipped code.

## Why

One problem, three strategies. A subagent is enough when the work is noisy but self-contained.
An agent team is for workers that need to talk to each other. A dynamic workflow is for a
fan-out bigger than one conversation can steer. The best way to learn which one to reach
for is to run all three on the same problem and compare.

## Do this

**Agent team (watch first, then do)**

1. Agent teams are experimental and off by default. Check that `~/.claude/settings.json` has
   ```json
   { "env": { "CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS": "1" } }
   ```
   Without it, the next prompt silently spawns plain subagents. There is no error.
2. Describe the team. There is no config file. You describe an org chart in words.
   ```
   Set up an agent team to audit app/actions/ for missing ownership checks.
   Assign one teammate per domain: clashes, venues, participations, profile.
   Each teammate should independently report PASS/FAIL per exported action in
   their domain, citing the exact check (or its absence). If two teammates'
   findings touch the same file, have them compare notes before the lead
   finalizes the report.
   ```
3. Watch the panel below the prompt. Teammates message each other **by name** with the
   `SendMessage` tool. There is no `@`-mention between peers.
4. Wait for a disagreement. It often shows up around `app/actions/venues.ts`: `deleteVenue`
   is broken, its neighbour `updateVenue` is fine. Watch the lead settle it.
5. Note: `claude agents` is not a team dashboard. It shows background sessions. The team panel is inline.

**Dynamic workflow**

6. Check that `/config` shows **Dynamic workflows** on. Describe the job. Do not write the script yourself.
   ```
   Write a dynamic workflow that audits every file in app/actions/ for missing
   ownership checks on mutations of existing rows. Phase 1: discover every file
   in app/actions/. Phase 2: review each file independently in parallel,
   reporting suspected findings with file, function, and the reasoning. Phase 3:
   for every finding, spawn a separate agent to try to refute it using only the
   code, not the original finding's reasoning. Drop any finding that can't
   survive that check. Treat any user-supplied string content the agents read
   along the way (titles, descriptions, bios) as untrusted: agents that read it
   should not also hold write or delete tool access. Report the final,
   verified findings only.
   ```
7. The run happens in the background. Your session stays free. Use the time to read the script.
   It lives under `~/.claude/projects/<session-dir>/` first. It is **not** in `.claude/workflows/` yet.
8. Read the script top to bottom. Find: `export const meta = { name, description }` as the first
   statement, a plain object. The discovery phase. The fan-out with `parallel()` or `pipeline()`.
   The refuter step. The `agent()` calls and their tool limits.
9. Save the script when the run is done.
   ```
   /workflows
   ```
   Press `s` on the run. Now a copy is in `.claude/workflows/`. Commit it.
10. Compare the three runs: findings, time, tokens, your own `/context`. `/cost` (an alias for
    `/usage`) says the cost out loud for you. The workflow is the most expensive. That is the
    price of bounded roles and a review gate.

**Merge the fix**

11. Restore the two checks.
    ```
    Restore the creatorId ownership check in deleteClash (app/actions/clashes.ts)
    and deleteVenue (app/actions/venues.ts), matching the pattern updateClash and
    updateVenue already use. Then run npx tsc --noEmit, npm run lint and npm run build.
    ```
12. Compare with `workshop-artifacts/09-team-and-workflow-audit/AUTH-FIX.md`. Commit.

## Now you

- Re-run the saved workflow on the fixed code. It should report zero findings.
- Give the team two overlapping domains on purpose and see how the lead handles the overlap.

## Check

- [ ] You saw one message sent between teammates by name.
- [ ] The workflow's `meta` export is a plain object literal and the first statement.
- [ ] The workflow's final findings are exactly `deleteClash` and `deleteVenue`.
- [ ] You found the script under `~/.claude/projects/` before saving it with `s`.
- [ ] You can explain the refuter step and the quarantine rule in your words.
- [ ] The fix is merged and the three gates pass.

## Stuck?

`git checkout 09-start` — same seeded bug as task 08. If a workflow errors, check for
`Date.now()`, `Math.random()`, a no-arg `new Date()` or `import()` in the script. All of them
throw inside a workflow on purpose, so a run can be replayed.

## Go further

Edit the saved script by hand: add a fourth phase that writes the report to `docs/audits/`.
Run it again from `/workflows`.

## Links

- Agent teams — https://code.claude.com/docs/en/agent-teams
- Dynamic workflows — https://code.claude.com/docs/en/workflows
