# Task 17 — capstone briefs

Pick one brief. Ship it on the reference CLASH using the tools from the whole workshop.
Each brief fits one working session. The checklist at the bottom is the same for all three.

## Brief A — Clash comments

People who are *going* to a clash can leave short comments on its detail page.
The host can delete any comment. Everyone else can delete only their own.
The host gets a notification for every new comment.

- New record: `Comment` (clash, author, text, createdAt).
- New Server Actions: `createComment`, `deleteComment`. Both check ownership themselves.
- A comment list under the **People** panel on the clash detail page.
- New notification type `comment` in `lib/constants.ts`.

## Brief B — Venue favourites, done properly

A user can favourite a venue from its detail page and from the venues list.
"My venues" gets a **Favourites** tab. The dashboard's popular venues list gets a heart count.

- New record: `Favourite` (user, venue, unique pair).
- New Server Action: `toggleFavourite`. Scoped to the current user by construction.
- A favourites read helper in `lib/data/venues.ts`.
- The heart works without a full page reload.

## Brief C — Weekly digest

A page at `/digest` shows the current user a summary for the coming seven days:
clashes they host, clashes they attend, pending requests on their clashes, and new
clashes at their venues. A "copy as text" button produces a plain-text version.

- No new records. Read helpers only, in `lib/data/dashboard.ts` or a new `lib/data/digest.ts`.
- Dates through `date-fns`, in the user's local time.
- The page must render in under one second with the seed data.

## Checklist (all briefs)

- [ ] Work happens in a worktree: `claude --worktree capstone-<letter>`
- [ ] The feature is built with `/clash-feature`
- [ ] Every new Server Action has its own ownership or user-scoping check
- [ ] A `security-auditor` subagent reviewed `app/actions/` and reported PASS for the new actions
- [ ] The typecheck hook and the Stop hook fired at least once and you fixed what they caught
- [ ] The flow was clicked through in a real browser by an agent (Playwright MCP or agent-browser)
- [ ] `npx tsc --noEmit`, `npm run lint`, `npm run build` all pass
- [ ] A pull request exists with a description Claude wrote and you edited
- [ ] `/context` was checked before and after; you can say where the budget went

## Optional

- Run `/loop` on a prompt that checks the PR for new review comments and answers them.
- Or create a scheduled routine that runs the security audit on the branch every day.
