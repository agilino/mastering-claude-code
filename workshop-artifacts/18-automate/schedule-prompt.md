# The spec-drift guard — a routine (trainer demo)

Participants watch. The trainer types this in Claude Code, in their clone of their own CLASH fork, as one message.
A routine runs in the Anthropic cloud, so it needs a claude.ai subscription and GitHub access to your CLASH fork.

```txt
/schedule weekly spec-drift guard for CLASH. Compare the rules in docs/SPEC.md (the "Rules" and "Data" sections) with prisma/schema.prisma and with the exported Server Actions in app/actions/. When a rule and the code disagree, open a pull request that names the rule, the file and a proposed fix. One pull request per run. When nothing drifted, do nothing: no pull request, no issue, no commit.
```

Claude Code turns the description into a routine: the prompt, your CLASH fork and the schedule. Confirm the summary it shows.

## Afterwards

```txt
/schedule list
```

Shows the routine with its name and schedule. `/schedule update` changes it, `/schedule run` fires it now instead of waiting.

Open the same list in the browser:

```txt
https://claude.ai/code/routines
```

A run clones your CLASH fork fresh and pushes its branch with a `claude/` prefix. The pull request appears on GitHub, not on your machine.

## Before the demo

- `docs/SPEC.md` must be committed on the fork's default branch before the routine runs, because the routine clones the default branch. On `pawsaw/clash` it is on the build branches `01-start` to `05-start` only, not on `main` and not on `06-start` or later. Copy it from this workshop repo into your fork of CLASH. Without the file the routine has nothing to compare and does nothing.
- Use your own fork. A routine that opens pull requests on `pawsaw/clash` opens them for everyone.
- Nothing has drifted on the reference code, so the honest outcome of the first run is: no pull request. To show a pull request, change one rule in `docs/SPEC.md` on the fork first, for example "A host can join their own clash."
