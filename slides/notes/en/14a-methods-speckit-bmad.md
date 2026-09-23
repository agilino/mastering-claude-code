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
> - FULL WORKING SOLUTION (trainer only, install if demoing):
>   npx skills add bmad-code-org/BMAD-METHOD

Say:
- The delivery loop: clarify, plan, build and verify, learn and adjust — loops back to plan
- [click] PM — product priorities and scope
- [click] Architect — the technical shape of the solution
- [click] Developer — implementation
- [click] UX — the interface and the experience
- [click] Party Mode: every installed agent in one conversation, in character
