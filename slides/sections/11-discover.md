---
layout: section
heading: "Example Mapping"
---

<template #map>
  <ToolkitMap current="skill" />
</template>

---
layout: task-intro
number: "09"
routeAlias: task-09
heading: "Task 09 — Example Mapping and the `discover` skill"
branch: "09-start"
learn:
  - "Run Example Mapping: rules, examples, counter-examples, questions"
  - "Move method detail into a skill's references/ folder"
  - "Resolve open questions live with AskUserQuestion"
outcome:
  - "The discover skill: .claude/skills/discover/SKILL.md"
  - "A resolved spec: docs/specs/clash-capacity.md"
---

---
layout: concept
heading: "Story, rule, example, question"
routeAlias: theory-example-mapping
lines:
  - "A story hides decisions: what happens right at the cap, or with none set?"
  - "Four kinds of statement make it buildable: story, rule, example, question."
---

---
layout: concept
heading: "Progressive disclosure in a skill"
routeAlias: theory-skill-references
docs: https://code.claude.com/docs/en/skills
lines:
  - "Skill body stays short. references/ loads only when the skill opens it."
  - "Same idea as a subagent's isolated context, one size smaller."
---

---
layout: code-live
heading: "Anatomy of /discover"
filePath: ".claude/skills/discover/SKILL.md"
success: "Every rule has at least one example; no Questions section is left in the saved spec."
---

```yaml
---
name: discover
description: Example Mapping on a story → rules, examples, questions
argument-hint: "<user story in quotes>"
allowed-tools: Read, Write, AskUserQuestion
---

Read CLAUDE.md first — fit this codebase's real domain.
## Story
$ARGUMENTS

⟵ LIVE: rules, ≥1 example each, a counter-example wherever a real
     edge case exists, open questions. Point at references/ — don't
     inline the method.
```

---
layout: task
number: "09"
heading: "The `discover` skill"
goal: "Build the discover skill, run it on the capacity story, resolve every question, and save a clean spec."
mode: "you do"
success: "docs/specs/clash-capacity.md has every rule, examples, and no open questions left in it."
branch: "09-start"
---
