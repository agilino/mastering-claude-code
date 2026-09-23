<!-- @note: subagents -->
> Do:
> - Divider, Subagent row
> - Say plainly

Say:
- One problem, three strategies: a subagent, an agent team, a dynamic workflow
- This task runs the first — a single subagent auditing on its own
- Task 12 runs the other two, agent team and dynamic workflow, on the exact same problem

<!-- @note: task-08-subagent-audit -->
> Do:
> - Branch: 08-start is reference CLASH plus tasks 06 and 07, with a seeded bug

Say:
- One subagent, one narrow brief — your own context barely moves while it does the noisy reading

<!-- @note: page-guard-action-guard -->
> Do:
> - Do not skip this: many strong React developers don't know it — if it doesn't land, the rest of the part is people watching agents audit a danger they don't understand.
> - Open the real file: show requireUser() guarding the page.
> - Open app/actions/clashes.ts. Ask directly

Say:
- Does the action itself check auth? It does not.
- A Server Action compiles to a public POST endpoint with a generated id — anyone with a session cookie can call any action directly, with any arguments, without loading the page.
- Authorization must be re-established inside every action.
- Zod checks shape, not permission.

<!-- @note: the-attack-surface -->
> Do:
> - Centrepiece graphic.

Say:
- [click] Left: the safe-looking path — browser → guarded page → requireUser() → button → action.
- [click] Right: the bypass — a direct POST to the action's generated id, arriving at the same Server Action, never having loaded the guarded page.
- [click:4] "Zod validates shape, not permission."

<!-- @note: find-it -->
> Do:
> - Say the Say-section correction out loud before anyone starts auditing — otherwise people assume they're about to find a real bug in public CLASH
> - The flaw only exists on 08-start, seeded on purpose: ownership check removed from deleteClash (app/actions/clashes.ts) and deleteVenue (app/actions/venues.ts). Workshop content, not a CLASH bug.
> - Answer key: workshop-artifacts/12-team-and-workflow-audit/AUTH-FIX.md.
> - Don't reveal this now: npm run lint on 08-start reports an unused `user` variable in deleteVenue — the guard that used it is gone. That's the task's own "Go further" — it's there so you know the claim is true, not to say here

Say:
- The public CLASH main branch has NO missing checks — all 18 exported actions are guarded.
- Green gates do not mean safe code.

<!-- @note: the-auditor-subagent -->
> Do:
> - Live-build reference — the exact body is in tasks/08-subagent-audit.md step 5

Say:
- The tools: line matters — Read, Grep, Glob only.
- This agent reads and reports; it does not fix.
- Narrowing tools is itself a control — and it only holds for a fresh subagent. A fork ignores a tools: line.
- Contrast with a vague "find security bugs": a falsifiable property is what makes the report checkable, not a wall of prose.

<!-- @note: agent-subagent-fork-which-is-which -->
> Do:
> - Say the three words once, slowly — the rest of the part depends on them
> - Demo in task step 6: run the security-auditor, then point at the panel under the prompt — a row appears, indented under main
> - Demo again with /subtask in the "Now you" step: a second row, this one a fork
> - Say plainly that the coloured labels on the slide are ours (schematic) — the real panel shows the rows, not our labels

Say:
- An agent is one running loop. Your own session is one too: it is the top row, main.
- A subagent is a loop that main starts with the Agent tool. It gets its own context window.
- A fork is a subagent that starts as a copy of your conversation, so it already knows everything you said.
- [click] A subagent built from a definition file: fresh context, and only the tools its tools: line allows. Our security-auditor, Explore, and any agent a plugin ships all work this way.
- [click] A fork: same system prompt, same tools, same history. A tools: line does not apply to it.
- [click] A skill never gets a row. It is instructions loaded into whichever conversation runs it — the discover skill in task 09 can talk to you for exactly that reason.
- The indented rows under the prompt are the subagents and forks main started, nothing else. /tasks lists the same rows.

<!-- @note: two-ways-to-isolate -->
> Do:
> - Docs link: open it, scroll to "Fork the current conversation", then back to the slides

Say:
- [click] Left: the subagent's own window fills with noisy tool calls — only a thin summary crosses back, which is why the main thread barely moves.
- [click:3] Right: fork vs fresh.
- Fork branches off the parent, inherits the whole conversation and the parent's prompt cache — cheap when shared context is really needed.
- [click] Fresh subagent starts cold: no history, only the tools its definition allows, no shared cache — first call costs more.
- Fork mode is on by default in interactive sessions, off under -p and the Agent SDK. On means Claude may choose a fork when it names no agent. A named agent from a definition file, like security-auditor, stays a fresh subagent.
- You start a fork yourself with /subtask followed by the task.
- Neither is better — know which one you invoked and why.
- `/tasks` lists this session's background work: running subagents and forks. A finished one stays listed, marked done, only briefly — open it while it runs, or right after it returns.

<!-- @note: six-agents-ship-with-claude-code -->
> Do:
> - The subagent audit task (08) wrote a custom one — these are the ones already on your machine
> - Docs link: open it, scroll to "Built-in subagents", then back to the slides

Say:
- These run without any file in .claude/agents/ — nothing to write, nothing to check in
- [click] Plan is what runs, invisibly, every time you use plan mode
- [click] general-purpose is the default a task delegates to when nothing more specific fits
- [click] claude is the fallback of the fallback — every tool, no restriction
- [click] statusline-setup only fires from /statusline
- [click] claude-code-guide is what answers "can Claude Code do X" questions like this one

<!-- @note: or-install-one-that-exists -->
> Do:
> - Docs link: open the OWASP repo README, the install section, then back to the slides
> - Task steps 9 to 11: install it, /clear, run the reviewer, compare with your own auditor

Say:
- What it is: a plugin, an installable bundle. This one ships 5 subagents and 11 skills. Task 07's marketplace slide again: add the catalog, then install one plugin by name.
- [click] The second command installs it. code-security-skills is the plugin, agent-security-playbook is the marketplace: plugin@marketplace.
- Only sca-audit and dependency-auditor are about CVEs. The reviewers read code.
- Compare, don't crown a winner: ours is narrow and falsifiable, PASS or FAIL with a cited line. Theirs is broad. Different jobs.
- A plugin can carry hooks and MCP servers, and it runs on your machine. Read what you install. This one is OWASP's, but the habit is the point.

<!-- @note: one-subagent-or-read-it-yourself -->
> Do:
> - Handoff: FACILITATOR.md, Rhythm for every task. Manual read-through is step 4 (they watched it) — hand off at step 1, the subagent starts at step 5
> - Left (careless), one step per click:
>   - [click] one prompt: read every file in app/actions/ yourself
>   - [click] every action file lands in the main thread
>   - [click] your own /context climbs with every file
>   - [click] a wall of prose back, nothing falsifiable
>   - [click] context bar: ~50% consumed
> FULL PROMPT (verbatim from tasks/08-subagent-audit.md step 4, trainer only, do not send it from a participant machine):
>
> Read every file in app/actions/ yourself, in this conversation, and report
> which exported actions are missing an ownership check before mutating an
> existing row.
> - Right (engineered), when they are back — one step per click:
>   - [click] a security-auditor subagent: Read, Grep, Glob
>   - [click] one falsifiable brief: PASS or FAIL, cited line
>   - [click] the reads happen in its window, not yours
>   - [click] your own /context barely moves
>   - [click] context bar: ~5% consumed

Say:
- Same audit, same two bugs. The difference is whose context window fills up

<!-- @note: subagent-audit -->
> Do:
> - Note the /context reading before launching.
> - Launch one subagent with the narrow brief; let it read every file in app/actions/.
> - Read /context again
> - Steps 9 to 11: the OWASP plugin, /clear, then compare its report with your own auditor's
> - Part ends on a cliffhanger: two findings, not fixed yet.

Say:
- It moved only slightly — that IS the point.
- Part IV fixes them.
