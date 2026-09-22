---
layout: section
heading: "Skills"
---

<template #map>
  <ToolkitMap current="skill" />
</template>

---
layout: concept
heading: "Loaded only when needed"
routeAlias: theory-skills
docs: https://code.claude.com/docs/en/skills
lines:
  - "Every skill's name and description is scanned every session. Cheap."
  - "The body loads when the description matches — or right away via /skill-name."
---

<G05SkillLoading />

---
layout: concept
heading: "Commands became skills. Nothing broke."
routeAlias: theory-commands-and-skills
lines:
  - ".claude/commands/deploy.md → /deploy"
  - ".claude/skills/deploy/SKILL.md → /deploy"
  - "Old command files keep working."
---


---
layout: code-live
heading: "Write the clash-feature skill"
filePath: ".claude/skills/clash-feature/SKILL.md"
success: "Every step of the skill points at a real CLASH file. No invented paths."
---

```md
---
name: clash-feature
description: ⟵ LIVE: one sentence, specific enough that Claude's matching
  has something real to key off — /skill-doctor shows if it ever fires
allowed-tools: Read, Edit, Write, Grep, Glob, Bash(npm run *) Bash(npx prisma *) Bash(npx tsc *)
---

## Steps

⟵ LIVE: the ten-step recipe — Prisma model, migration, constants,
     Zod schema, lib/data/ read helper, Server Action WITH ITS OWN
     OWNERSHIP CHECK, page, shadcn component, revalidatePath, notification
```

---
layout: concept
heading: "A skill is advice"
routeAlias: theory-skill-advice
lines:
  - "Nothing stops an agent from skipping a step in a skill."
  - "Hold that thought. Task 10 comes back to it."
---

<G12SkillsVsHooks />

---
layout: concept
heading: "Ship something small, end to end"
lines:
  - "Venue favourites: model, toggle action, profile list."
  - "Then /context. Compare with task 06."
---


---
layout: task
number: "07"
routeAlias: task-07
heading: "The clash-feature skill"
goal: "Write a skill that holds CLASH's end-to-end feature recipe, then use it to ship venue favourites."
mode: "you do"
success: "One feature ships end to end through the skill, and tsc, lint and build pass."
branch: "07-start"
---


