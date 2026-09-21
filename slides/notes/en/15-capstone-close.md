<!-- @note: capstone -->
> Do:
> - Walk around, look at /context readings
> - Ask people where their budget went

Say:
- Three briefs in workshop-artifacts/14-capstone/README.md: clash comments, venue favourites done properly, weekly digest
- No prompts given — the checklist is the deliverable

<!-- @note: security-three-rules -->
Say:
- Prompt injection in one sentence: a model cannot tell data from instructions by looking
- CLASH is full of user-supplied titles and bios — prime injection surface
- Task 09's workflow already applied the rule: readers of untrusted content do not hold write tools
- Hooks make that rule law
- Subagent tool lists make the attack surface small

<!-- @note: spec-kit-vs-bmad -->
> Do:
> - Real prerequisite if someone only has Node

Say:
- [click:2] Spec Kit — GitHub, MIT, agent-agnostic, `specify init`, low ceremony
- Specs as version-controlled markdown any agent can consume
- Python/uv tool, not npm: `uv tool install specify-cli --from git+https://github.com/github/spec-kit.git`
- [click] BMAD v6 ships five named agents (Analyst, PM, Architect, Developer, UX Designer) — not "12+ personas" (that's a v4 figure)
- Heavyweight: reported real-world costs of hundreds to a couple of thousand dollars per developer per month on frontier models
- Repo: bmad-code-org/BMAD-METHOD
- Rule of thumb: Spec Kit when you want spec discipline without process overhead; BMAD when the organisation already has those roles
- BMAD will not conjure a process you do not have
- [click] Honest note: both are greenfield methods, CLASH is brownfield — that's why they come last, and why everything before was about control rather than ceremony

<!-- @note: what-we-did-not-cover -->
> Do:
> - Keep it short
> - Naming these respects the group and pre-empts "why didn't you show X"

<!-- @note: context-is-king-you-push-it-you-own-it -->
> Do:
> - The close — two lines, no diagram

Say:
- One throughline: context treated carelessly → window fills with noise, agent drifts
- Context treated as a resource you engineer → biggest lever you have
- Skills, subagents, hooks, MCP, workflows: every row of the map was a different way of managing that one constraint
- You push the agent's context. You own what happens because of it.
