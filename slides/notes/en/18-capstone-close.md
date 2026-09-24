<!-- @note: task-17-capstone -->
> Do:
> - Branch: 17-start already has CLAUDE.md, the skill, the fix and the hook set

Say:
- One brief, picked freely, and shipped end to end with every tool from the workshop

<!-- @note: capstone -->
> Do:
> - Walk around, look at /context readings
> - Ask people where their budget went

Say:
- Three briefs in workshop-artifacts/17-capstone/README.md: clash comments, venue favourites done properly, weekly digest
- No prompts given — the checklist is the deliverable

<!-- @note: security-three-rules -->
> Do:
> - Optional: point at "Protect against prompt injection" — the same three rules, as the docs' own core protections list

Say:
- Prompt injection in one sentence: a model cannot tell data from instructions by looking
- CLASH is full of user-supplied titles and bios — prime injection surface
- Task 12's workflow already applied the rule: readers of untrusted content do not hold write tools
- Hooks make that rule law
- Subagent tool lists make the attack surface small
