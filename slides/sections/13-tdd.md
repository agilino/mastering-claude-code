---
layout: section
heading: "Orchestrate and let go"
---

<template #map>
  <JourneyMap current="orchestrate" />
</template>

---
layout: section
heading: "TDD"
---

<template #map>
  <ToolkitMap current="skill" />
</template>

---
layout: concept
heading: "A skill that stops itself"
routeAlias: theory-tdd-cycle
docs: https://code.claude.com/docs/en/skills
lines:
  - "disable-model-invocation: true blocks Claude from reaching for it unasked."
  - "Explicit /name invocation still works — a deliberate ceremony, not automatic."
---

---
layout: concept
heading: "The spec is the goalpost"
routeAlias: theory-goalpost-not-target
lines:
  - "A test that has never failed hasn't proven it can catch the bug."
  - "A test checked against a saved spec is a contract, not a guess."
  - "Told to make a test pass, a model edits whichever file is easier."
---

---
layout: task-intro
number: "11"
routeAlias: task-11
heading: "Task 11 — The TDD inner loop"
branch: "11-start"
learn:
  - "Drive one rule at a time: red, green, refactor, stop"
  - "Tell a spec-grounded test apart from one that proves nothing"
  - "Design a skill that stops itself: disable-model-invocation"
outcome:
  - "lib/capacity.ts, correct against every rule in the spec"
  - "The tdd skill: .claude/skills/tdd/SKILL.md"
---

---
layout: code-live
heading: "One cycle: red, green, stop"
filePath: ".claude/skills/tdd/SKILL.md"
success: "A test that fails on a compile error gets rejected before GREEN even starts."
---

```yaml
---
name: tdd
description: One red-green-refactor cycle for a rule from docs/specs/
argument-hint: "<rule from docs/specs/*.md>"
allowed-tools: Read, Write, Edit, Bash
disable-model-invocation: true
---

⟵ LIVE: RED must fail on an assertion, not a compile error. GREEN
     touches the target file only, never the test. STOP: report and
     wait — don't start another cycle uninvited.
```

---
layout: concept
heading: "Update the test, or fix the code?"
---

<G03CarelessVsEngineered
  :careless="['“update the test so the suite passes”', 'Claude edits the assertion, not the code', 'the suite is green', 'the rule the test proved is now provably false']"
  :engineered="['“change lib/capacity.ts only, not the test”', 'the stub logic changes', 'the test still says what it said', 'green because the rule is actually true']"
  :careless-pct="60"
  :engineered-pct="15"
  closing-line="Same failing test. The difference is which file was allowed to change."
/>

---
layout: task
number: "11"
heading: "The TDD inner loop"
goal: "Drive lib/capacity.ts through red-green-refactor, one rule at a time, and watch a careless prompt break a test's point."
mode: "you do"
success: "Every rule in the spec has a passing test, and none of them were made to pass by editing the test."
branch: "11-start"
---
