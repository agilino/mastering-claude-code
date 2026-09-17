---
layout: section
heading: "Skills"
---

<template #map>
  <ToolkitMap current="skill" />
</template>

<!--
Divider, Skill row highlighted. "You do not start cold here either. CLASH ships nine vendored
skills. We add one that is ours."
-->

---
layout: concept
heading: "Loaded only when needed"
lines:
  - "Every skill's name and description is scanned every session. Cheap."
  - "The body loads only when the description matches what you asked."
---

<G05SkillLoading />

<!--
This is what makes skills cheap at scale. The description sits in context whether or not you use
the skill. The much larger body loads on a match and then stays for the session. Point back at
/skill-doctor: that is what it measures, how many descriptions you pay for versus how many bodies
ever get pulled in.
-->

---
layout: concept
heading: "Commands became skills. Nothing broke."
lines:
  - ".claude/commands/deploy.md → /deploy"
  - ".claude/skills/deploy/SKILL.md → /deploy"
  - "Old command files keep working."
---

<!--
Correct a common misconception: custom commands merging into skills does not mean
.claude/commands/*.md files stop working. They still produce the same /command. Skills are the
richer format for new work: bundled files, allowed-tools, context: fork.
-->

---
layout: code-live
heading: "Write the clash-feature skill"
filePath: ".claude/skills/clash-feature/SKILL.md"
success: "Every step of the skill points at a real CLASH file. No invented paths."
---

```md
---
name: clash-feature
description: ⟵ LIVE: one sentence, specific enough that
  /skill-doctor's matching has something real to key off
allowed-tools: Read, Edit, Write, Grep, Glob, Bash(npm run *) Bash(npx prisma *) Bash(npx tsc *)
---

## Steps

⟵ LIVE: the ten-step recipe — Prisma model, migration, constants,
     Zod schema, lib/data/ read helper, Server Action WITH ITS OWN
     OWNERSHIP CHECK, page, shadcn component, revalidatePath, notification
```

<!--
FULL WORKING SOLUTION (trainer only): workshop-artifacts/07-clash-feature-skill/SKILL.md. Build it on screen
step by step rather than pasting it whole. When you reach the Server Action step, stop and say
why it insists on its own ownership check even though requireUser() runs in the layout: a Server
Action is a public POST endpoint with a generated id; the layout guard never sees a direct call.
This is the most important sentence in the whole skill. It lands again in task 08.
-->

---
layout: concept
heading: "A skill is advice"
lines:
  - "Nothing stops an agent from skipping a step in a skill."
  - "Hold that thought. Task 10 comes back to it."
---

<G12SkillsVsHooks />

<!--
Foreshadow only. One line: "a skill is what you would tell a new colleague. It is advice, not law."
-->

---
layout: concept
heading: "Ship something small, end to end"
lines:
  - "Venue favourites: model, toggle action, profile list."
  - "Then /context. Compare with task 06."
---

<!--
Invoke the skill for real: "/clash-feature Add venue favourites: a user can favourite a venue from
its detail page and see a list of their favourites on their profile." Let it run. When it is done,
run /context and put the two numbers side by side. This feature touched maybe six files. The
contrast is the whole pitch for skills, made visible.
-->

---
layout: task
number: "07"
heading: "The clash-feature skill"
goal: "Write a skill that holds CLASH's end-to-end feature recipe, then use it to ship venue favourites."
mode: "you do"
success: "One feature ships end to end through the skill, and tsc, lint and build pass."
branch: "07-start"
---

<!--
Task slide. Reset branch 07-start already has the task 06 CLAUDE.md, so nobody restarts from zero.
-->
