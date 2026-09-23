---
layout: section
heading: "Path-scoped rules"
---

<template #map>
  <ToolkitMap current="rule" />
</template>

---
layout: concept
heading: "Rules scoped to a path"
routeAlias: theory-path-scoped-rules
docs: https://code.claude.com/docs/en/memory
lines:
  - "paths is the only field a rule's frontmatter reads — the rest is ignored."
  - "No paths: loads every session. With it: loads only on a matching Read."
---

---
layout: task-intro
number: "10"
routeAlias: task-10
heading: "Task 10 — Path-scoped rules"
branch: "10-start"
learn:
  - "Scope a project rule to matching files with paths: frontmatter"
  - "Tell a project rule apart from a personal, unconditional one"
outcome:
  - "A project rule: .claude/rules/server-actions.md"
---

---
layout: code-live
heading: "A rule that only loads when it matters"
filePath: ".claude/rules/server-actions.md"
success: "/context lists the rule only after Claude reads a file under app/actions/."
---

```markdown
---
paths:
  - "app/actions/**"
---

# Server Action rules

⟵ LIVE: state the rule from task 08's audit — every action that
     mutates an EXISTING row must check ownership, not just that
     requireUser() ran.
```

---
layout: task
number: "10"
heading: "The ownership rule"
goal: "Write a project rule scoped to app/actions/**, verify it loads only on a matching Read."
mode: "you do"
success: "/context shows the rule only after Claude reads a file under app/actions/, and a sketch cites it unprompted."
branch: "10-start"
---
