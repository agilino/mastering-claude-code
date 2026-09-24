<!-- @note: three-levers-one-responsibility -->
> Do:
> - Pause on each word. Ask for one course example: context, reasoning, evidence.

Say:
- These are three different engineering problems. Do not solve one by turning another knob.
- Missing facts are a context problem. A difficult trade-off can be a reasoning problem. Trust is an evidence problem.
- You own the boundary between all three.

<!-- @note: autonomy-is-earned-by-verification -->
> Do:
> - Walk the staircase from left to right. The height is autonomy, not model intelligence.

Say:
- Every step away from the keyboard removes an immediate human correction loop.
- Replace that lost supervision with stronger evidence, isolation, limits and recovery.
- Autonomy is not the goal by itself. Reliable completion is the goal.

<!-- @note: context-is-king-you-push-it-you-own-it -->
> Do:
> - The close — two lines, no diagram

Say:
- One throughline: careless context fills the window with noise and the agent drifts
- Context engineered as a resource is the biggest lever you have
- Skills, subagents, hooks, MCP, workflows: every row of the map managed that one constraint
- You push the agent's context. You own what happens because of it.


<!-- @note: further-paths -->
> Do:
> - This is the stop point for optional reserve material. The workshop already closed on the previous slide.
> - Continue only when the group has room or asks about process frameworks.

Say:
- Everything after this divider is reserve material, not another required part of the learning path.

<!-- @note: spec-kit-six-steps-one-constitution -->
> Do:
> - FULL WORKING SOLUTION (trainer only, install if demoing):
>   uv tool install specify-cli --from git+https://github.com/github/spec-kit.git
>   specify init my-project
> - Repeat implement -> converge until convergence reports "Converged"

Say:
- GitHub's own tool, MIT, agent-agnostic — not tied to Claude Code
- On Claude Code every step installs as a namespaced skill: speckit-constitution, not a bare /constitution
- [click] /speckit-specify — a plain-language feature description
- [click] /speckit-plan — a technical plan from the spec
- [click] /speckit-tasks — the plan broken into a checklist
- [click] /speckit-implement — build against the task list
- [click] /speckit-converge — checks the build against the spec, loops back to implement until it reports Converged
- [click] The constitution runs once — principles every later step reads

<!-- @note: bmad-five-agents-one-party-mode -->
> Do:
> - Docs link: the BMAD repo README on GitHub — point at the five agents and the install line, then back to the slides
> - FULL WORKING SOLUTION (trainer only, install if demoing):
>   npx skills add bmad-code-org/BMAD-METHOD

Say:
- The delivery loop: clarify, plan, build and verify, learn and adjust — loops back to plan
- [click] PM — product priorities and scope
- [click] Architect — the technical shape of the solution
- [click] Developer — implementation
- [click] UX — the interface and the experience
- [click] Party Mode: every installed agent in one conversation, in character
- [click] bmad-build: the skill that turns one story into code — it clarifies the intent, plans, writes a spec, implements, then reviews; the link opens "Build a Change" at "Run bmad-build"

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
- [click] Honest note: both shine on greenfield, but work on existing code too. CLASH is both — greenfield in Part II, brownfield ever since — and clash-conference was a greenfield BMAD build

<!-- @note: what-we-did-not-cover -->
> Do:
> - Keep it short. /goal and /batch are no longer on this list because the course now teaches them.

Say:
- Channels push events into an open session. Computer use lets Claude interact with native apps.
- Both are adjacent capabilities, not prerequisites for the engineering model you learned here.
