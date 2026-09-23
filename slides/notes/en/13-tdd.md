<!-- @note: orchestrate-and-let-go -->
> Do:
> - Part IV starts here — new belt, new JourneyMap row lit up
> - Say it once, clearly

Say:
- Not controlling context anymore, now handing work off and trusting the result
- Six tasks from here to the capstone

<!-- @note: tdd -->
> Do:
> - Divider: skill row highlighted again — /tdd is a skill, same primitive as /discover
> - Keep the beat short

Say:
- "The last brown-belt task built a spec. This one builds the code from it, one rule at a time."

<!-- @note: a-skill-that-stops-itself -->
> Do:
> - Docs link: open it, scroll to the SKILL.md frontmatter reference, point at disable-model-invocation, then back to the slides

Say:
- disable-model-invocation blocks Claude from reaching for this skill on its own
- You still run it by name whenever you decide a cycle starts — a deliberate ceremony, not automatic

<!-- @note: the-spec-is-the-goalpost -->
> Do:
> - Contrast with chat memory: ask what happens if you'd never saved docs/specs/clash-capacity.md

Say:
- A test checked against a saved spec is a contract
- Told to make a test pass, a model edits whichever file is easier — sometimes that's the test itself

<!-- @note: task-11-the-tdd-inner-loop -->
> Do:
> - Branch: 11-start already has vitest installed, one trivial test passing, and a deliberately wrong capacity.ts stub

Say:
- Four things to learn, two things to end up with, and one moment you only watch

<!-- @note: one-cycle-red-green-stop -->
> Do:
> - Live-build reference — the exact body is in tasks/11-tdd-inner-loop.md step 7
> - Point at disable-model-invocation again — say why it's here, not just what it does

Say:
- RED must fail on an assertion — a compile error means the test is checking plumbing, not the rule
- STOP means report and wait, not cascade through every remaining rule

<!-- @note: update-the-test-or-fix-the-code -->
> Do:
> - Stop slide — send the careless prompt live, once, on your own machine, then /rewind before handing over
> - [click] "update the test so the suite passes"
> - [click] Claude edits the assertion, not the code
> - [click] the suite is green
> - [click] the rule the test proved is now provably false
> - [click] careless bar
> - [click] "change lib/capacity.ts only, not the test"
> - [click] the stub logic changes
> - [click] the test still says what it said
> - [click] green because the rule is actually true
> - [click] engineered bar and closing line

Say:
- Same failing test, two different fixes
- The difference is which file was allowed to change

<!-- @note: the-tdd-inner-loop -->
> Do:
> - Recap: every rule in the spec now has a passing test, none of them by editing the test

Say:
- "The spec from task 09 is the only thing that decided what 'correct' means here"
