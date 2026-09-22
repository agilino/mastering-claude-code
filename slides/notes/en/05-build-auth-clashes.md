<!-- @note: task-03-auth-and-clashes -->
> Do:
> - Branch: 03-start already has the scaffold, schema and seed data — task 02's result

Say:
- Five things to learn, four things to build — the longest task in the part, so small steps matter most here

<!-- @note: small-steps-beat-big-asks -->
> Do:
> - Participants do this in steps 2-4
> - [click] Show the one-line big ask fail or drift, then the same work in three steps

Say:
- Task 03 is the longest build — lesson is pacing
- [click] Each of the three ends with something you can try in the browser
- If you cannot check it, the step is too big

<!-- @note: undo-a-step-rewind -->
> Do:
> - Participants do this in steps 6-7
> - Demo: after the shell step, run /rewind, show the list of checkpoints
> - Pick the checkpoint before the last step, show the files are back
> - Press Esc to cancel if you did not really want it

Say:
- This is undo for the conversation — it does not replace git
- Use it early, before you try to patch a wrong direction

<!-- @note: watch-the-window-fill -->
> Do:
> - Participants do this in steps 8-9
> - Run /context live after the auth and shell steps
> - [click] Read the bands: system prompt, CLAUDE.md, tool results, conversation
> - Then run /compact, then /context again

Say:
- [click:4] The tool results band is the files Claude read — it keeps growing. When the window is almost full, Claude Code clears older tool outputs first, then compacts
- First time the group sees the context window as something they can manage
- Part III makes it a discipline

<!-- @note: the-safety-moment -->
> Do:
> - Participants do this in steps 11-12
> - FULL WORKING PROMPTS (verbatim from tasks/03-auth-and-clashes.md):
>
> 1) requireUser() runs in app/(app)/layout.tsx. Does that protect the deleteClash action
>    in app/actions/clashes.ts from being called by someone who is not the creator? Explain.
>
> 2) Make sure every action that changes an existing clash checks that the current user is
>    the creator (creatorId === user.id) and returns an error if not.
>    Then add this rule to CLAUDE.md under "Rules":
>    - Every Server Action calls requireUser() and checks ownership before it changes an existing row.
>
> - Say the sentence the group must keep
> - Part III and IV spend a long time on exactly this rule — plant it here

Say:
- A Server Action is a public endpoint with a generated id
- The layout guards the page, not the action
- Zod checks shape, not permission

<!-- @note: point-don-t-let-it-guess -->
> Do:
> - Sets up tasks/03-auth-and-clashes.md step 10, the clash-building step
> - Left (careless), one step per click:
>   - [click] grep -r "notif" app/
>   - [click] read 40 files
>   - [click] guess the notification model
>   - [click] guess the Server Action shape
>   - [click] write code, hope it compiles
>   - [click] context bar: ~85% consumed
> - Right (engineered), one step per click:
>   - [click] @lib/data/notifications.ts
>   - [click] @app/actions/clashes.ts
>   - [click] @prisma/schema.prisma
>   - [click] Plan Mode: review before a byte moves
>   - [click] context bar: ~18% consumed — same task, same model, pointed on purpose

Say:
- Why the clashes prompt in Task 03 is full of @ references

<!-- @note: auth-and-clashes -->
> Do:
> - Task 03 recap
> - Hand off to tasks/03-auth-and-clashes.md, full 13 steps — no more slides until Task 04
> - Watch the chat while they work
> - Watch for people who send the whole task as one prompt — message them and help split it live

Say:
- Reset: 03-start is the scaffold plus data; 04-start is auth, shell and clashes finished
- This is the longest task of the part, and finishing "Now you" is optional
