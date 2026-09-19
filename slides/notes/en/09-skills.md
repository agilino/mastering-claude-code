<!-- @note: skills -->
- Divider, Skill row highlighted
- Say: "You do not start cold here either. CLASH ships nine vendored skills. We add one that is ours."

<!-- @note: loaded-only-when-needed -->
- Makes skills cheap at scale
- [click] A skill's description sits in context every turn, used or not — unless disable-model-invocation is set
- [click] A loaded body normally stays for the session — after a compaction, older skill bodies can be dropped
- [click] Point back at /skill-doctor: that is what it measures — how many descriptions you pay for versus how many bodies ever get pulled in

<!-- @note: commands-became-skills-nothing-broke -->
- Correct a common misconception: commands merging into skills does not break .claude/commands/*.md files
- They still produce the same /command
- Prefer skills for new work: a skill is a folder, so it can carry supporting files. Command files take the same frontmatter — allowed-tools, context: fork — except name and paths

<!-- @note: write-the-clash-feature-skill -->
- Full working solution (trainer only): workshop-artifacts/07-clash-feature-skill/SKILL.md
- Build it on screen step by step, not pasted whole
- At the Server Action step, stop and explain: it insists on its own ownership check even though requireUser() runs in the layout
- Why: a Server Action is a public POST endpoint with a generated id — the layout guard never sees a direct call
- Most important sentence in the whole skill — it lands again in task 08

<!-- @note: a-skill-is-advice -->
- Foreshadow only
- [click] Say: "a skill is what you would tell a new colleague. It is advice, not law."

<!-- @note: ship-something-small-end-to-end -->
- Invoke the skill for real: "/clash-feature Add venue favourites: a user can favourite a venue from its detail page and see a list of their favourites on their profile."
- Let it run
- When done, run /context and put the two numbers side by side
- Feature touched maybe six files
- Contrast is the whole pitch for skills, made visible

<!-- @note: the-clash-feature-skill -->
- Task slide
- Reset branch 07-start already has the task 06 CLAUDE.md — nobody restarts from zero
