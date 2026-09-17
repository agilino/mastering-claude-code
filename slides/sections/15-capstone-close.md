---
layout: task
number: "14"
heading: "Capstone"
goal: "Pick one brief and ship it as a pull request using every tool from this workshop."
mode: "you do"
success: "Every box on the capstone checklist is ticked and the PR description was written by Claude and edited by you."
branch: "14-start"
---

<!--
Three briefs in workshop-artifacts/14-capstone/README.md: clash comments, venue favourites done
properly, weekly digest. No prompts given. The checklist is the deliverable. Walk around, look at
/context readings, ask people where their budget went.
-->

---
layout: concept
heading: "Security: three rules"
lines:
  - "Anything a model reads can be an instruction."
  - "Quarantine: readers of untrusted text cannot write."
  - "Least privilege: the smallest tool list that works."
---

<!--
Prompt injection in one sentence: a model cannot tell data from instructions by looking. CLASH is
full of user-supplied titles and bios. The workflow in task 09 already applied the rule: readers of
untrusted content do not hold write tools. Hooks make it law. Subagent tool lists make it small.
-->

---
layout: concept
heading: "Spec Kit vs BMAD"
lines:
  - "Spec Kit: low ceremony, agent-agnostic, a Python/uv tool."
  - "BMAD v6: five named agents, heavyweight, maps onto roles you already have."
  - "Both are greenfield methods. CLASH is brownfield."
---

<G20SpecKitVsBmad />

<!--
Spec Kit — GitHub, MIT, agent-agnostic, `specify init`, low ceremony. Specs as version-controlled
markdown any agent can consume. It is a Python/uv tool, not npm: `uv tool install specify-cli
--from git+https://github.com/github/spec-kit.git`. A real prerequisite if someone only has Node.

BMAD v6 ships five named agents (Analyst, PM, Architect, Developer, UX Designer), not "12+
personas" (that is a v4 figure). Heavyweight: reported real-world costs of hundreds to a couple of
thousand dollars per developer per month on frontier models. Repo: bmad-code-org/BMAD-METHOD.

Rule of thumb: Spec Kit when you want spec discipline without process overhead. BMAD when your
organisation already has those roles. BMAD will not conjure a process you do not have.

Say the honest thing: both are greenfield methods and CLASH is brownfield. That is why they come
last, and why everything before was about control rather than ceremony.
-->

---
layout: concept
heading: "What we did not cover"
lines:
  - "/loop, Remote Control, routines, output styles"
  - "claude agents, and building your own MCP server"
---

<!--
Keep it short. Naming these respects the group and pre-empts "why didn't you show X".
-->

---
layout: concept
heading: "Context is king. You push it, you own it."
---

<!--
The close. Two lines, no diagram. Everything was one throughline: treated carelessly, the window
fills with noise until the agent drifts; treated as a resource you engineer, it is the biggest
lever you have. Skills, subagents, hooks, MCP, workflows: every row of the map was a different way
of managing that one constraint. You push the agent's context. You own what happens because of it.
-->
