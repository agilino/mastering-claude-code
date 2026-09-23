# Task 11 — The TDD inner loop

> Part: Orchestrate and let go · Reset branch: `11-start`
> Slides: https://mastering-claude-code.vercel.app/task-11

## Theory

- [A skill that stops itself](https://mastering-claude-code.vercel.app/theory-tdd-cycle)
- [The spec is the goalpost](https://mastering-claude-code.vercel.app/theory-goalpost-not-target)

> **Reminder:** A test written against a saved spec is a contract; a test written from chat memory drifts — drive the implementation, never the test.

## You will end up with

`lib/capacity.ts` implementing `decideParticipation` correctly against every rule in
`docs/specs/clash-capacity.md`, one rule at a time, driven by a `.claude/skills/tdd/SKILL.md`
skill — and one moment where you watched a careless prompt quietly break the point of a test.

## Why

Told "make the failing test pass," a model will edit whichever file is easier to change —
sometimes that's the test, and the suite goes green for nothing. Real TDD makes the constraint
explicit: drive the implementation, never the test. A saved spec is what makes this possible —
the test is checked against the spec's rule, not against whatever the model remembers from
earlier in the conversation.

This branch already has vitest installed, one trivial passing test, and a deliberately wrong
`lib/capacity.ts` stub. Fighting test-runner configuration live is a detour, not the lesson.

## Do this

1. Confirm the harness already works.
   ```bash
   npm run test
   ```
   One green test. Nothing to configure.
2. Read the spec together: `@docs/specs/clash-capacity.md`.
3. Look at `lib/capacity.ts`. `decideParticipation` always returns `"waitlisted"` — deliberately
   wrong, so the first real test fails for the right reason: an assertion, not a missing import.
4. Write one failing test by hand for the first rule.
   ```
   Write ONE failing test in lib/capacity.test.ts for the rule "must accept a
   join while accepted participants are below capacity", from
   @docs/specs/clash-capacity.md. Do not implement decideParticipation or
   change lib/capacity.ts — it must still fail.
   ```
   Run `npm run test`. Confirm it's red on an assertion, not a compile error.
5. Watch. Your trainer sends this once, live, on their own machine. Do not send it yourself —
   you run the real version starting at the next step.
   ```
   The test in lib/capacity.test.ts is failing. Update the test so the suite passes.
   ```
   Watch what happens: Claude edits the assertion, not `lib/capacity.ts` — the suite goes
   green, and the rule the test was supposed to prove now proves nothing.
6. Send the engineered version yourself.
   ```
   Make the failing test pass by changing lib/capacity.ts only. Do not edit
   the test file.
   ```
   Watch: the stub's logic changes, the test still says what it said, and it's green because
   the rule is now actually true.
7. Package the discipline.
   ```yaml
   ---
   name: tdd
   description: Run one red-green-refactor cycle for a rule from a spec in
     docs/specs/. Writes one failing test, the minimum code to pass it,
     refactors, then stops. Never edits an existing test.
   argument-hint: "<rule from docs/specs/*.md>"
   allowed-tools: Read, Write, Edit, Bash
   disable-model-invocation: true
   ---
   ```
   `disable-model-invocation: true` keeps this a call you make on purpose — Claude never
   reaches for it on its own.

   Body: RED (one failing test, must fail on an assertion, not a compile or import error) →
   GREEN (minimum code, the target file only, never the test) → REFACTOR (clean up, rerun
   everything) → STOP (report the rule, the test name, pass or fail, then wait).
8. Run `/tdd` for the second rule — at capacity, a join is waitlisted — end to end.
9. Run `/tdd` again for the boundary: one join *below* capacity still accepts, it doesn't
   waitlist early. A separate invocation. Confirm it stops after one cycle instead of cascading
   through every remaining rule.
10. Run the gates.
    ```bash
    npx tsc --noEmit && npm run lint && npm run test && npm run build
    ```

## Now you

Drive the remaining rule from the spec through `/tdd` on your own.

## Check

- [ ] The first red test failed on an assertion, not a compile or import error.
- [ ] You watched the careless prompt edit the test — you didn't send it yourself.
- [ ] The engineered prompt's fix never touched `lib/capacity.test.ts`.
- [ ] Every rule in `docs/specs/clash-capacity.md` has a passing test.
- [ ] You can say why `/tdd` sets `disable-model-invocation: true`.
- [ ] `npx tsc --noEmit`, `npm run lint`, `npm run test` and `npm run build` are all green.

## Stuck?

`git checkout 11-start` — the reference CLASH with tasks 06–10's files, vitest configured, one
trivial test passing, the capacity stub and the spec answer key in place, no rule
implementations yet.

## Go further

Compare with `workshop-artifacts/11-tdd-inner-loop/` in the workshop repository. Then sketch a
`spec-coverage` subagent (tools: Read, Grep, Glob) that checks every rule in `docs/specs/*.md`
has a passing test — read-only, same shape as task 08's `security-auditor`.

## Links

- Skills — https://code.claude.com/docs/en/skills
