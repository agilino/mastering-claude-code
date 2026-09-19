<!-- @note: subagents -->
- Divider, Subagent row.
- Strategy one of three on one problem.
- Say plainly: "one problem, three strategies. Now the first. Next part, the other two."

<!-- @note: page-guard-action-guard -->
- Do not skip this: many strong React developers don't know it — if it doesn't land, the rest of the part is people watching agents audit a danger they don't understand.
- Open the real file: show requireUser() guarding the page.
- Open app/actions/clashes.ts. Ask directly: does the action itself check auth? It does not.
- A Server Action compiles to a public POST endpoint with a generated id — anyone with a session cookie can call any action directly, with any arguments, without loading the page.
- Authorization must be re-established inside every action.
- Zod checks shape, not permission.

<!-- @note: the-attack-surface -->
- Centrepiece graphic.
- [click] Left: the safe-looking path — browser → guarded page → requireUser() → button → action.
- [click] Right: the bypass — a direct POST to the action's generated id, arriving at the same Server Action, never having loaded the guarded page.
- [click:4] Close on: "Zod validates shape, not permission."

<!-- @note: find-it -->
- Say the correction out loud before anyone starts: the public CLASH main branch has NO missing checks — all 18 exported actions are guarded.
- The flaw is seeded on 08-start: ownership check removed from deleteClash (app/actions/clashes.ts) and deleteVenue (app/actions/venues.ts).
- Workshop content, not a CLASH bug.
- Answer key: workshop-artifacts/09-team-and-workflow-audit/AUTH-FIX.md.
- Tell for a sharp auditor: npm run lint on 08-start reports an unused `user` variable in deleteVenue — the guard that used it is gone.
- Green gates do not mean safe code.

<!-- @note: the-auditor-subagent -->
- FULL WORKING SOLUTION (trainer only): body is in tasks/08-subagent-audit.md step 4.
- Talking point: the tools: line matters — Read, Grep, Glob only.
- This agent reads and reports; it does not fix.
- Narrowing tools is itself a control.
- Contrast with a vague "find security bugs": a falsifiable property is what makes the report checkable, not a wall of prose.

<!-- @note: two-ways-to-isolate -->
- [click] Left: the subagent's own window fills with noisy tool calls — only a thin summary crosses back, which is why the main thread barely moves.
- [click:3] Right: fork vs fresh.
- Fork branches off the parent, inherits the whole conversation and the parent's prompt cache — cheap when shared context is really needed.
- [click] Fresh subagent starts cold: no history, filtered tools, no cache — first call costs more.
- Fork is on by default in interactive sessions, off under -p and the Agent SDK.
- Neither is better — know which one you invoked and why.

<!-- @note: subagent-audit -->
- Note the /context reading before launching.
- Launch one subagent with the narrow brief; let it read every file in app/actions/.
- Read /context again: it moved only slightly — that IS the point.
- Part ends on a cliffhanger: two findings, not fixed yet.
- Part IV fixes them.
