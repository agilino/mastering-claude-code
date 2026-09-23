<!-- @note: letting-go-of-the-wheel -->
Say:
- Three ideas, each done properly
- Worktrees: the thing people use most afterward
- Headless CI: turns the audit into permanent infrastructure
- Agent SDK: every control from this workshop carries over unchanged when the agent lives inside your own software

<!-- @note: task-15-letting-go -->
> Do:
> - Branch: 15-start already has CLAUDE.md, the skill, the fix and the hook set

Say:
- Two ideas: worktrees keep parallel agents from colliding, headless CI runs the same audit with nobody watching

<!-- @note: one-repo-n-isolated-agents -->
> Do:
> - Give it time
> - Mention without demoing

Say:
- [click] Every strategy so far shared one working tree
- [click] Worktrees: run several agents on separate branches of the same repo in parallel — no risk of one agent's half-finished edit breaking another's
- `isolation: worktree` in a subagent's frontmatter, and the EnterWorktree/ExitWorktree tools
- At home: `claude --worktree "#<pr-number>"` starts from a PR

<!-- @note: headless-in-ci -->
Say:
- Headless = no human watching: the same agent that just paired with you, running unattended, triggered by an event
- [click] Fill the empty Actions tab with the security audit from task 08, running on every PR
- The centrepiece becomes permanent infrastructure
- Don't put `claude -p` in the YAML — use anthropics/claude-code-action@v1 with `prompt` and `claude_args`
- v1 dropped the `mode` input (auto-detected now) — @beta still has it.

<!-- @note: audit-on-every-pr -->
> Do:
> - FULL WORKING SOLUTION (trainer only):
>       - uses: anthropics/claude-code-action@v1
>         with:
>           prompt: |
>             Audit every exported Server Action in app/actions/ changed by
>             this PR for missing ownership checks on mutations of existing
>             rows. Comment the findings on the PR.
>           claude_args: |
>             --model claude-sonnet-5
>             --allowedTools "Bash(gh pr comment:*),Bash(gh pr diff:*),Bash(gh pr view:*)"
>           claude_code_oauth_token: ${{ secrets.CLAUDE_CODE_OAUTH_TOKEN }}
> - A live token is not needed to check that the YAML is valid

Say:
- Without --allowedTools the findings only land in the run log — `Bash(gh pr comment:*)` is what lets Claude post the comment
- Authenticate through the `claude_code_oauth_token` action input, fed from a named repository secret (created with `claude setup-token`) — never a hardcoded key
- `id-token: write` is required

<!-- @note: drive-a-session-from-your-phone -->
> Do:
> - Needs a subscription plan, not an API key — and /login first
> - Show the connection panel live if the projector setup allows it

Say:
- Nothing moves to the cloud — your machine still runs every tool call, the phone is just a window
- [click] claude --rc is for starting already connected, useful before you leave your desk
- [click] /loop is a different tool for a similar itch: automation without a human present, but no remote device at all

<!-- @note: letting-go -->
> Do:
> - Two terminals for the worktree half
> - CI half needs no live token to verify the YAML shape

<!-- @note: task-16-the-agent-sdk -->
> Do:
> - Branch: 16-start already has CLAUDE.md, the skill, the fix and the hook set

Say:
- The same agent loop, now hosted inside a small program instead of a terminal session

<!-- @note: same-loop-inside-your-program -->
Say:
- [click:2] Just ran the agent headless in a pipeline
- [click] Agent SDK: same idea one level further in — the agent lives inside your application
- Imagine CLASH answering "find me something outdoors in Kreuzberg this evening" over its own map
- [click] Build the smallest version: a script that answers that question from the seed data, with read-only tools and a hook

<!-- @note: ask-clash-mts -->
> Do:
> - FULL WORKING SOLUTION (trainer only): workshop-artifacts/16-agent-sdk/ask-clash.mts
> - Run with `npx tsx ask-clash.mts "find me something outdoors in Kreuzberg this evening"` after `npm install @anthropic-ai/claude-agent-sdk tsx`
> - Point at the three controls
> - Then the result message: the answer, num_turns, total_cost_usd
> - Say the cost out loud

Say:
- allowedTools (auto-approves, does not restrict) + disallowedTools (actually blocks), hooks.PreToolUse, maxTurns

<!-- @note: the-agent-sdk -->
> Do:
> - Finished program: workshop-artifacts/16-agent-sdk/

Say:
- "Now you" part: removes tools and adds a system prompt
- Stretch: turns it into an API route
