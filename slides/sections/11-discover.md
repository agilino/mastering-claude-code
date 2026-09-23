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
  - "Split a skill: references/ for the method, templates/ for the format"
  - "Run an interview live with AskUserQuestion"
outcome:
  - "The discover skill: SKILL.md, references/, templates/"
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
  - "Skill body stays short. references/ and templates/ load only when opened."
  - "Same idea as a subagent's isolated context, one size smaller."
---

---
layout: code-live
heading: "Anatomy of /discover"
filePath: ".claude/skills/discover/SKILL.md"
success: "It interviews you before it drafts, and shows the spec before it saves it."
---

```yaml
---
name: discover
description: Example Mapping interview on a story → rules, examples, spec
argument-hint: "<user story in quotes>"
allowed-tools: Read, Write, AskUserQuestion
---

Domain expert. Read CLAUDE.md first — fit this codebase's real domain.
## Story
$ARGUMENTS

⟵ LIVE: the numbered steps — interview first, draft, hunt for examples
     and counter-examples, settle questions, show the spec (don't save
     yet), save with templates/. Point at references/, don't inline it.
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
