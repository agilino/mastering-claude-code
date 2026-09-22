# Task 03 — Auth and clashes

> Part: Build CLASH · Reset branch: `03-start`

## You will end up with

Register, login and logout. An app shell with a sidebar and a top bar that only logged-in
people see. And the first real feature: clashes you can list, open, create, edit and delete.

## Why

This is the longest build task. You learn to work in small steps, to undo a step that
went wrong, and to watch how full the context window gets. You also meet the one rule
that keeps this app safe: every action checks who is allowed to do it.

## Do this

1. Start fresh.
   ```bash
   git checkout 03-start
   claude
   ```
2. Ask for options before code. This is a habit worth keeping.
   ```
   I want email and password login with a session cookie. No third-party auth.
   Give me two ways to do it in Next.js 16 with Server Actions, with one pro and one con each.
   Do not write code yet.
   ```
3. Pick the JWT cookie option and give a small brief.
   ```
   Build option with the signed JWT cookie:
   - jose for the token, bcryptjs for passwords, cookie is httpOnly.
   - lib/session.ts: createSession, getSessionUserId, destroySession.
   - lib/auth.ts: getCurrentUser and requireUser. requireUser redirects to /login.
   - Server Actions in app/actions/auth.ts: register, login, logout.
   - Zod schemas in lib/validation.ts. Forms use shadcn components.
   - Pages: app/(auth)/login and app/(auth)/register.
   Done when: I can register, log in, and see my name on a page.
   ```
4. Try it in the browser. Register a new user. Log in.
5. Ask what changed, in plain words.
   ```
   Explain what you changed, file by file, in one line each.
   ```
6. Build the app shell. One step, not the whole app.
   ```
   Create the route group app/(app) with a layout that calls requireUser().
   Add a sidebar (shadcn sidebar) with links Dashboard, Clashes, Venues, and a top bar
   with the user's name and a logout button. Add a placeholder dashboard page.
   Move nothing else.
   ```
7. Inspect the last step with `/rewind`:
   ```
   /rewind
   ```
   Open the checkpoint before the last step. If the app shell needs a correction, restore it and give a better instruction. If everything is correct, press `Esc` without restoring and continue.
8. Look at the context window.
   ```
   /context
   ```
   Read the numbers. Every file Claude read is still in there.
9. Compact, then continue with clashes.
   ```
   /compact
   ```
   Claude keeps a summary and drops the rest.
10. Build clashes with `@` references, so Claude looks at the right files instead of guessing.
    ```
    Build the clash feature from @docs/SPEC.md:
    - reads in lib/data/clashes.ts (list with search, filter upcoming/past/all, sort soonest/newest/popular; one detail query)
    - writes in app/actions/clashes.ts: createClash, updateClash, deleteClash
    - Zod schemas in @lib/validation.ts
    - pages: app/(app)/clashes (list), clashes/[id], clashes/new, clashes/[id]/edit
    - a clash-card component and a clash-form component in components/clashes/
    Use the pattern from @app/actions/auth.ts for actions and forms. Skip the map for now: latitude and longitude are two number inputs.
    Done when: I can create, open, edit and delete a clash from the browser.
    ```
11. The safety moment. Ask this and read the answer twice.
    ```
    requireUser() runs in app/(app)/layout.tsx. Does that protect the deleteClash action
    in app/actions/clashes.ts from being called by someone who is not the creator? Explain.
    ```
    A Server Action is a public endpoint. The layout guards the page, not the action.
12. Make the rule permanent.
    ```
    Make sure every action that changes an existing clash checks that the current user is
    the creator (creatorId === user.id) and returns an error if not.
    Then add this rule to CLAUDE.md under "Rules":
    - Every Server Action calls requireUser() and checks ownership before it changes an existing row.
    ```
13. Commit.
    ```
    Commit in two commits: one for auth and the shell, one for clashes.
    ```

## Now you

- Add the "My clashes" page: the clashes I host. Same pattern, own query in `lib/data/clashes.ts`.
- Add a `loading.tsx` and an `error.tsx` to `app/(app)`.
- Run `/context` again. Is it fuller or emptier than before? Why?

## Check

- [ ] Register, login and logout work in the browser
- [ ] A logged-out visit to `/clashes` redirects to `/login`
- [ ] You can create, open, edit and delete a clash
- [ ] `deleteClash` refuses to delete a clash you did not create
- [ ] `CLAUDE.md` has the ownership rule
- [ ] You used `/rewind`, `/context` and `/compact` at least once

## Stuck?

`git checkout 03-start` — the state at the start of this task: the scaffold, the schema, the migration and
the seed (the reference result of task 02). The next task starts from `04-start`.

## Go further

Ask Claude to write a small script that calls `deleteClash` directly, without the page, as another user. Watch it fail because of your rule.

## Links

- Checkpoints and rewind — https://code.claude.com/docs/en/checkpointing
- Managing context — https://code.claude.com/docs/en/costs
- Server Actions — https://nextjs.org/docs/app/api-reference/functions/server-actions
