# Task 05 — Finish and ship

> Part: Build CLASH · Reset branch: `05-start`

## You will end up with

The complete app: profile with avatar, public profiles, search, dashboard, theme and settings.
A pull request reviewed by Claude. And a look at the reference build, which you use from here on.

## Why

The last slices are independent of each other. That is a chance to learn batching: one brief,
several jobs, work running in the background while you review. Then you ship the way a team ships:
branch, commit, pull request, review.

## Do this

1. Start on a branch.
   ```bash
   git checkout 05-start
   git checkout -b finish
   claude
   ```
2. One brief, four independent jobs. Read it: each job names its files, so they do not collide.
   ```
   Four independent jobs from @docs/SPEC.md. Do them one after the other and run the quality gates at the end.

   1. Profile: app/(app)/profile with name and bio editable, email read-only, avatar upload with crop
      and zoom using react-easy-crop, stored as a base64 data URL on User.avatar. Actions in app/actions/profile.ts.
      Public profile app/(app)/users/[id] with the person's hosted clashes and venues.
   2. Search: a ⌘K command palette (cmdk via shadcn command) in the top bar and a results page
      app/(app)/search grouped into clashes, venues, people. Reads in lib/data/search.ts.
   3. Dashboard: app/(app)/dashboard with the four counts, upcoming clashes, popular venues
      and recent activity. Reads in lib/data/dashboard.ts.
   4. Theme and settings: next-themes with light, dark and system, a toggle in the top bar,
      app/(app)/settings with the theme choice and a logout button.
   ```
3. While it works, do not wait. Open a second terminal and read your own code. Note anything you want changed.
4. Run the build in the background so you can keep talking.
   ```
   Run npm run build in the background and tell me when it is done.
   ```
   Ask something else in the meantime, for example "list every page in app/(app)".
5. Check the cost so far.
   ```
   /cost
   ```
6. Remember something for next time. Start a message with `#`:
   ```
   # Always use the UserAvatar component for avatars, never a raw img tag.
   ```
   Claude saves this to memory. Open `/memory` to see where it went.
7. Commit and open a pull request.
   ```
   Commit the work in sensible commits, push the branch, and open a pull request with gh.
   The description lists what was built and how to test it.
   ```
   If `gh` is not installed or not logged in, ask Claude to only write the description to `PR.md`.
8. Review your own pull request with Claude, as a stranger would.
   ```
   Review the diff of this branch against 05-start like a strict senior engineer.
   Look for: missing ownership checks in actions, Prisma calls outside lib/data,
   Zod schemas outside lib/validation.ts, params not awaited. List findings with file and line.
   Fix nothing yet.
   ```
9. Fix what you agree with.
   ```
   Fix findings 1 and 3. Leave the others.
   ```
10. Compare with the reference build.
    ```bash
    git fetch origin 06-start
    git diff --stat 06-start
    ```
    Ask Claude:
    ```
    Compare my app with the branch 06-start. What did the reference do differently in
    lib/data and app/actions? Three differences, no judgement.
    ```
11. Retrospective. Answer these in your own words, to yourself or your neighbour:
    - Which prompt worked best today, and why?
    - When did the context get too full, and how did you notice?
    - Which rule in `CLAUDE.md` saved you time?
12. Switch to the reference. From here on, every task runs on the reference CLASH.
    ```bash
    git checkout 06-start
    npm install
    npm run db:reset
    ```

## Now you

- Ask Claude to use agent-browser to walk through register, create a clash, join it as another user, and report every step.
- Add one thing from your review notes that Claude did not find.

## Check

- [ ] Profile with avatar crop works and the avatar shows in the top bar
- [ ] ⌘K opens search and the results page groups the hits
- [ ] The dashboard shows four counts
- [ ] Light and dark theme switch
- [ ] A pull request exists, or `PR.md` holds its description
- [ ] You are on `06-start` and `npm run dev` works there

## Stuck?

`git checkout 05-start` — the state at the start of this task: venues, map, participation and notifications
(the reference result of task 04). The complete reference CLASH is `06-start`, where Part III starts anyway.

## Go further

Ask Claude for a list of everything in your build that is missing compared with `docs/SPEC.md`. Pick one and finish it.

## Links

- Costs and `/cost` — https://code.claude.com/docs/en/costs
- Memory — https://code.claude.com/docs/en/memory
- GitHub CLI — https://cli.github.com/
- react-easy-crop — https://github.com/ValentinH/react-easy-crop
