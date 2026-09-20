---
name: subagents
description: List every subagent available to the Agent tool right now — built-in types plus this repo's custom ones in `.claude/agents/` and `~/.claude/agents/`. Use when the user asks to list, show, or enumerate available (sub)agents, or invokes `/subagents`.
---

# List subagents

Produce one Markdown table, columns `Name | Scope | Tools | Description`:

1. **Built-in** — read the "Available agent types for the Agent tool" system reminder already in
   context (it lists each type with its tool access). Mark these rows `built-in`.
2. **Project** — Glob `.claude/agents/*.md` in this repo. Read each file and pull its `name`,
   `tools`, and `description` frontmatter fields. Mark these rows `project`.
3. **User** — Glob `.claude/agents/*.md` under the user's home directory (`~/.claude/agents/`,
   resolved to the actual home path). Read each file found and pull the same frontmatter fields.
   Mark these rows `user`. Omit the section entirely if none exist — no empty row.

A name that shows up in both the built-in reminder and a project/user file (this happens — the
reminder merges every available type into one list) is `project` or `user`, not `built-in`; file
presence wins.

Sort rows built-in, then project, then user; alphabetically by name within each group. Keep
descriptions to one line — trim, don't paraphrase away distinguishing detail. Glob and Read only —
no shell command (`ls`, `find`, `cat`, etc.) to do this listing, per this repo's file-work rule.

After the table, add one line naming the file to edit to add a new project subagent
(`.claude/agents/<name>.md`) and the two-field frontmatter shape it needs (`name`, `tools` at
minimum).
