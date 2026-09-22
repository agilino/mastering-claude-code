# Task 04 — Venues, map, people

> Part: Build CLASH · Reset branch: `04-start`
> Slides: https://mastering-claude-code.vercel.app/task-04

## You will end up with

Venues, a live map of Berlin with pins and click-to-create, join and leave for clashes,
accept and reject for hosts, and a notification bell.

## Why

You already know the pattern. Now you reuse it: "do it like clashes". You also learn what
to do when things break: let Claude read the error, give it a screenshot, let it look at the
page itself. And you add quality gates so Claude checks its own work.

## Do this

1. Start.
   ```bash
   git checkout 04-start
   claude
   ```
2. Reuse the pattern for venues. Short brief, because the pattern exists.
   ```
   Build venues exactly like clashes: lib/data/venues.ts, app/actions/venues.ts
   (createVenue, updateVenue, deleteVenue with the ownership check),
   pages app/(app)/venues, venues/[id], venues/new, venues/[id]/edit, my-venues,
   components in components/venues/. A venue detail lists the clashes hosted there
   and has a button "Host a clash here" that opens clashes/new with the venue preselected.
   Follow @app/actions/clashes.ts and @lib/data/clashes.ts.
   ```
3. Turn the repeated brief into a command. Create `.claude/commands/new-page.md`:
   ```
   Create the file .claude/commands/new-page.md with this content:

   Add a new page to this app for: $ARGUMENTS
   Follow these rules:
   - reads in lib/data/, writes in app/actions/ with requireUser() and an ownership check
   - Zod schemas in lib/validation.ts
   - shadcn components, existing layout, existing card style
   - run npx tsc --noEmit at the end
   ```
   Now `/new-page` is a slash command. Try it:
   ```
   /new-page a page /participations that lists my join requests grouped into Going, Awaiting approval, Declined
   ```
   It will not work fully yet, because participation does not exist. Watch what Claude does with a task that is too early. Then say:
   ```
   Stop. We will build participation first.
   ```
4. The map. Let Claude read the docs first.
   ```
   Fetch https://react-leaflet.js.org/docs/start-installation/ and read how to use react-leaflet in Next.js.
   Then extend the map starter that is already on 04-start:
   - keep components/map/leaflet-map.tsx and components/map/map.tsx; reuse or extend them, do not rebuild them
   - components/map/explore-map.tsx already has the interactive map shell; use it for a full-screen
     app/(app)/map page with pins for clashes and venues, popups with links, and click-to-create
   - keep the existing location picker in the clash form and add the same pattern to the venue form
   ```
5. The map will probably break once. Common: a window-is-not-defined error. Do not fix it yourself.
   ```
   The dev server shows an error. Read the terminal output, find the cause, and fix it.
   ```
   If Claude cannot see the terminal, paste the error text into the prompt.
6. Let Claude look at the page. Keep `npm run dev` running in another terminal.
   ```
   Use agent-browser to open http://localhost:3000/map, log in as anna.schmidt@example.com
   with password test, take a screenshot, and tell me if the pins are visible.
   ```
   Claude runs `agent-browser open`, `snapshot -i`, `screenshot`. It reads the page like a user.
7. If something looks wrong to you, take a screenshot yourself and paste it into the prompt (`Ctrl+V` on most terminals). Describe what is wrong in one sentence.
8. Participation.
   ```
   Add participation from @docs/SPEC.md:
   - model exists already; add actions joinClash, leaveClash, acceptRequest, rejectRequest to app/actions/clashes.ts
   - a host cannot join their own clash; only the host can accept or reject
   - clash detail shows a People panel: Going and Requests, with join/leave for visitors and accept/reject for the host
   - a page app/(app)/participations grouped into Going, Awaiting approval, Declined
   Use lib/data/participations.ts for reads.
   ```
9. Notifications.
   ```
   Add notifications: lib/notify.ts with createNotification, called from joinClash (to the host),
   acceptRequest and rejectRequest (to the requester), and createClash when the clash is at a venue
   (to the venue creator, type venue_clash). Reads in lib/data/notifications.ts.
   A bell in the top bar with an unread dot, a menu that lists them, mark one and mark all as read
   in app/actions/notifications.ts. A click opens the related clash or venue.
   ```
10. Quality gates. Add them to `CLAUDE.md` so Claude runs them without being asked.
    ```
    Add a section "Quality gates" to CLAUDE.md:
    Before you say a task is done, run all three and fix what fails:
    npx tsc --noEmit
    npm run lint
    npm run build
    Then run all three now.
    ```
11. Commit.
    ```
    Commit in three commits: venues and map, participation, notifications.
    ```

## Now you

- Log in as two different users in two browsers. Request to join, accept, and check that the bell shows it.
- Ask Claude to use agent-browser to do the same check on its own and report what it saw.
- Use `/new-page` for a page you think is missing.

## Check

- [ ] Venues can be created, edited, deleted, and "Host a clash here" works
- [ ] The map shows pins and a click on the map starts a new clash there
- [ ] A visitor can join and leave; a host can accept and reject; a host cannot join their own clash
- [ ] The bell shows an unread dot after a join request
- [ ] `CLAUDE.md` has a "Quality gates" section and all three gates pass
- [ ] `.claude/commands/new-page.md` exists

## Stuck?

`git checkout 04-start` — the state at the start of this task: auth, the app shell and clashes (the
reference result of task 03). It already contains the map components and the location picker, because the
reference clash form uses them; the map page is yours to build. The next task starts from `05-start`.

## Go further

Ask Claude to look at the map page with agent-browser on a phone-sized window and fix what does not fit.

## Links

- Commands — https://code.claude.com/docs/en/commands
- Images and screenshots in prompts — https://code.claude.com/docs/en/common-workflows
- react-leaflet — https://react-leaflet.js.org/
- agent-browser — https://github.com/vercel-labs/agent-browser
