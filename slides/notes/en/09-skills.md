<!-- @note: skills -->
> Do:
> - Divider, Skill row highlighted

Say:
- "You do not start cold here either. CLASH ships nine vendored skills. We add one that is ours."

<!-- @note: loaded-only-when-needed -->
> Do:
> - Point back at /skill-doctor
> - Docs link: open it, scroll to "Skill content lifecycle", then back to the slides

Say:
- Makes skills cheap at scale
- [click] A skill's description sits in context every turn, used or not — unless disable-model-invocation is set
- [click] A loaded body normally stays for the session — after a compaction, older skill bodies can be dropped
- [click] That is what it measures — how many descriptions you pay for versus how many bodies ever get pulled in

<!-- @note: commands-became-skills-nothing-broke -->
> Do:
> - Point back at the /new-page command from Task 04 — same mechanism, this is the folder version
> - Correct a common misconception

Say:
- Commands merging into skills does not break .claude/commands/*.md files
- They still produce the same /command
- Prefer skills for new work: a skill is a folder, so it can carry supporting files. Command files take the same frontmatter — allowed-tools, context: fork — except name and paths

<!-- @note: write-the-clash-feature-skill -->
> Do:
> - Full working solution (trainer only): workshop-artifacts/07-clash-feature-skill/SKILL.md
> - Build it on screen step by step, not pasted whole
> - At the Server Action step, stop and explain
> - Most important sentence in the whole skill — it lands again in task 08

Say:
- It insists on its own ownership check even though requireUser() runs in the layout
- Why: a Server Action is a public POST endpoint with a generated id — the layout guard never sees a direct call

<!-- @note: a-skill-is-advice -->
> Do:
> - Foreshadow only

Say:
- [click] "a skill is what you would tell a new colleague. It is advice, not law."

<!-- @note: ship-something-small-end-to-end -->
> Do:
> - Invoke the skill for real
> - Let it run
> - When done, run /context and put the two numbers side by side

Say:
- "/clash-feature Add venue favourites: a user can favourite a venue from its detail page and see a list of their favourites on their profile."
- Feature touched maybe six files
- Contrast is the whole pitch for skills, made visible

<!-- @note: the-clash-feature-skill -->
> Do:
> - Task 07 recap
> - Hand off to tasks/07-clash-feature-skill.md, full 7 steps — no more slides until Task 08
> - Watch the chat while they work

Say:
- Reset branch 07-start already has the task 06 CLAUDE.md — nobody restarts from zero
- Done when: one feature ships end to end through the skill, and tsc, lint and build pass
