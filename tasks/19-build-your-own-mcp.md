# Task 19 — Build your own MCP

> Part: Orchestrate and let go · Reset branch: `19-start` in your CLASH clone and in clash-conference
> Slides: https://mastering-claude-code.vercel.app/task-19

## Theory

- [A server is four registered tools](https://mastering-claude-code.vercel.app/theory-mcp-server-anatomy)
- [Register it, then trust it selectively](https://mastering-claude-code.vercel.app/theory-mcp-json)
- [Another app, same server](https://mastering-claude-code.vercel.app/theory-mcp-from-sdk)

> **Reminder:** A good MCP server is designed, not just written: small tools, descriptions the model can act on, refusals a person can read, checks before every write, and no more power than it needs.

## You will end up with

Your own MCP server, `mcp/server.ts` in your CLASH clone, with four tools over the CLASH
database: `list_upcoming_clashes`, `find_venue`, `create_clash` and `cancel_clash`. CLASH's
`19-start` gives you the server with the first tool already working. You design the other
three. At the end, `npx tsx mcp/smoke.ts` in your CLASH clone says `All checks passed.` The
two read tools run without asking. The two write tools ask every time.

Then a second app, clash-conference, uses the same server through the Agent SDK. One click
turns a talk into a clash on CLASH's map, the next click takes it off again.

## Why

In task 14 you used other people's MCP servers. In task 16 you put the agent loop inside
your own program. This task is the third side: CLASH itself as a tool, and the design that
makes a tool server good.

The plumbing is done for you on CLASH's `19-start`. The server talks over stdio, finds
`dev.db` from its own file, logs only to stderr, and answers through `reply()` and
`refuse()`. What is left is design. Five decisions make the difference:

1. **Small tools.** `find_venue` looks a venue up. `create_clash` writes. The id for the
   write comes from the lookup, never from a guess.
2. **Descriptions are the interface.** Claude reads a tool's description and every input's
   `.describe()` before it calls anything. `venueId` described as "id from find_venue" tells
   Claude which tool to call first.
3. **Refusals are product text.** A refusal is plain text, marked with `isError`. A person
   reads it later, for example as the reason a talk in clash-conference failed. "No venue
   matches" is a normal answer, not an error: nothing went wrong, there is just no match.
4. **Check before you write.** `create_clash` checks host, venue, date and duplicate before
   it writes. `cancel_clash` checks host, clash and owner before it deletes.
5. **No more power than needed.** The one tool that deletes, `cancel_clash`, deletes only a
   clash its own host created. No tool creates venues or users. Reads are allowed, both
   writes ask.

A server in `.mcp.json` is a program that runs on your machine. So Claude Code asks once
before it starts one. Until you say yes, `claude mcp list` shows it as
``⏸ Pending approval (run `claude` to approve)``.

## Do this

**Your CLASH clone: design the server**

1. Check out CLASH's `19-start`, put the seed data back and register the server.
   ```bash
   git checkout 19-start                        # CLASH's 19-start: mcp/server.ts with one tool
   npm install
   npm run db:seed                              # the smoke test in step 4 counts on the seed data
   claude mcp add --scope project --transport stdio clash -- npx tsx mcp/server.ts
   ```
   You see the seed end with `Seed complete`, and a new `.mcp.json` at the root of your
   CLASH clone. It registers one server, `clash`, started with `npx tsx mcp/server.ts`. Now
   start `claude` in your CLASH clone. If it asks whether to use the `clash` server from
   `.mcp.json`, say yes. Then ask the one tool that already works.
   ```
   Use the clash server: what is coming up?
   ```
   You see Claude call `clash - list_upcoming_clashes (MCP)` and list the seeded clashes that
   are still ahead, each with date, title, venue and id. Approve the call if Claude Code asks.
   Open `mcp/server.ts` and find what is already there: the path to `dev.db` built from the
   file, `log()` writing to stderr, `reply()` and `refuse()`, the `registerTool` call for
   `list_upcoming_clashes` with its description and schema, and the three comments
   `Step 2 of task 19`, `Step 3 of task 19` and `Step 4 of task 19`. Your tools go there.
2. Design the lookup tool, `find_venue`. Send this prompt.
   ```
   In mcp/server.ts, register a second tool, find_venue. Input: query, a string with at
   least one character. Description: "Find venues whose title contains the query (case
   does not matter). At most 5." Use a plain Prisma contains: on SQLite it already ignores
   case. Return at most 5 venues ordered by title, each with id, title, latitude and
   longitude, as a JSON array through reply(). When nothing matches, answer through
   reply(), not refuse(), exactly: No venue matches "<query>". Change nothing else in the
   file.
   ```
   You see a second `registerTool` call in `mcp/server.ts`, where the comment
   `Step 2 of task 19` was, with no `refuse()` in it. Exit Claude Code and start `claude` again in your CLASH clone, so the
   server starts with its new tool. Then look a venue up.
   ```
   Use the clash server: which venues match holzmarkt?
   ```
   You see Claude call `clash - find_venue (MCP)` and answer with Holzmarkt 25, its id and its
   coordinates, although you typed the name in lower case.
3. Design the write tool, `create_clash`. Send this prompt.
   ```
   In mcp/server.ts, register a third tool, create_clash. Description: "Create a clash at
   a known venue, hosted by an existing CLASH user. Refuses unknown hosts, unknown venues,
   past or invalid dates, and duplicates."
   Inputs, each with this .describe(): title, a string with at least one character;
   description, a string; dateTime, "ISO date-time in the future"; venueId, "id from
   find_venue"; hostEmail, "email of the CLASH user who hosts the clash".
   Check in this order and stop at the first failure, each time through refuse() with
   exactly this text:
   1. No user has hostEmail: No CLASH user with email <hostEmail>. Nothing was created.
   2. No venue has venueId: Unknown venue <venueId>. Use find_venue to get a valid id.
   3. isIsoDateTime(dateTime) is false, or the date is not in the future: dateTime must be an ISO date-time in the future.
   4. A clash with the same title and the same dateTime exists: Duplicate: "<title>" already exists at <its dateTime as toISOString()> (id <its id>).
   Only then create the clash with the venue's latitude, longitude and id, and the host as
   creator. Log it with log() and answer through reply() exactly:
   Created clash <id>: "<title>" at <dateTime as toISOString()>.
   Change nothing else in the file.
   ```
   You see a third `registerTool` call in `mcp/server.ts`, where the comment
   `Step 3 of task 19` was: four checks, each ending in `refuse()`, and only after them the
   one `prisma.clash.create`.
4. Design the delete tool, `cancel_clash`. Send this prompt.
   ```
   In mcp/server.ts, register a fourth tool, cancel_clash. Description: "Cancel a clash:
   delete it from CLASH. Only the CLASH user who created the clash can cancel it."
   Inputs, each with this .describe(): clashId, "id from create_clash or
   list_upcoming_clashes"; hostEmail, "email of the CLASH user who created the clash".
   Check in this order and stop at the first failure, each time through refuse() with
   exactly this text:
   1. No user has hostEmail: No CLASH user with email <hostEmail>. Nothing was deleted.
   2. No clash has clashId: Unknown clash <clashId>. Use list_upcoming_clashes to find it.
   3. That user did not create the clash: <hostEmail> did not create clash <clashId>. Nothing was deleted.
   Only then delete the clash. Log it with log() and answer through reply() exactly:
   Cancelled clash <id>: "<title>".
   Change nothing else in the file.
   ```
   You see a fourth `registerTool` call in `mcp/server.ts`, where the comment
   `Step 4 of task 19` was: three checks, each ending in `refuse()`, and only after them the
   one `prisma.clash.delete`. Now run the smoke test in a terminal, in your CLASH clone.
   ```bash
   npx tsx mcp/smoke.ts                         # in your CLASH clone
   ```
   You see 19 lines that start with `PASS`, then `All checks passed.` The smoke test starts
   your server on its own, calls every tool and every refusal, cancels its test clash and
   makes sure it is gone. A line that starts with `FAIL` names the check that broke: paste
   that line into Claude Code and ask it to fix exactly that.
5. Write through Claude Code. First start CLASH in a second terminal, in your CLASH clone,
   and leave it running.
   ```bash
   npm run dev                                  # in your CLASH clone, in a second terminal
   ```
   You see CLASH start on `localhost:3000`. Exit Claude Code and start `claude` again in your
   CLASH clone, so the server starts with all four tools. Then send this prompt.
   ```
   Create a clash "MCP Hacknight" at Holzmarkt 25, hosted by anna.schmidt@example.com. Pick any date and time in the future.
   ```
   You see Claude call `clash - find_venue (MCP)` first, because the description of `venueId`
   sent it there, then `clash - create_clash (MCP)`. Approve that one call, not for good. The
   server answers `Created clash <id>: "MCP Hacknight" at <ISO date-time>.` Open CLASH's map
   on `localhost:3000/map`: the new clash sits at Holzmarkt 25. Now ask for it once more.
   ```
   Create the clash "MCP Hacknight" at Holzmarkt 25 once more, at exactly the same date and time as before, hosted by anna.schmidt@example.com
   ```
   You see the server refuse with `Duplicate: "MCP Hacknight" already exists at <ISO
   date-time> (id <id>).` and Claude pass that text on to you. Nothing was written: CLASH on
   `localhost:3000/clashes` still shows the clash once.
6. Trust the server selectively. On CLASH's `19-start`, `.claude/settings.json` in your CLASH
   clone holds only `hooks`. Send this prompt.
   ```
   Add a permissions.allow list to .claude/settings.json with mcp__clash__find_venue and mcp__clash__list_upcoming_clashes. Keep the hooks key exactly as it is.
   ```
   You see `.claude/settings.json` in your CLASH clone with two keys, `hooks` and
   `permissions`, and the two full tool names under `allow`. Exit Claude Code and start
   `claude` again in your CLASH clone. Then ask a read question.
   ```
   Use the clash server: what is coming up at Holzmarkt 25?
   ```
   You see `clash - find_venue (MCP)` and `clash - list_upcoming_clashes (MCP)` run with no
   permission prompt, and "MCP Hacknight" in the answer. Now take the clash off again.
   ```
   Cancel the clash "MCP Hacknight" at Holzmarkt 25, hosted by anna.schmidt@example.com.
   ```
   You see Claude look the clash up with `clash - list_upcoming_clashes (MCP)`, without a
   prompt, then call `clash - cancel_clash (MCP)` and wait for your permission: `cancel_clash`
   is not on the allow list. Approve that one call. The server answers
   `Cancelled clash <id>: "MCP Hacknight".` Reload CLASH's map on `localhost:3000/map`: the
   clash is gone. Reads are free. Writes ask.

### The second app: clash-conference

Clone [clash-conference](https://github.com/agilino/clash-conference) to a new folder.

7. Set up clash-conference next to your CLASH clone, so that the two folders are siblings.
   If you already cloned clash-conference during setup, skip `git clone`.
   ```bash
   cd ..                                                 # the folder that holds your CLASH clone
   git clone https://github.com/agilino/clash-conference.git
   cd clash-conference
   git checkout 19-start                                 # clash-conference's 19-start
   cp .env.example .env
   npm install
   npm run db:migrate
   npm run db:seed
   ```
   You see the seed finish with one settings record and three draft talks, in the `dev.db`
   of clash-conference. The new `.env` in clash-conference holds `CLASH_DIR=../clash`:
   change it if your CLASH clone has another folder name. Then start clash-conference in a
   terminal of its own, in clash-conference.
   ```bash
   npm run dev                                           # in clash-conference, in a terminal of its own
   ```
   You see clash-conference on `localhost:3001`, next to CLASH on `localhost:3000`: three
   draft talks, each with a "Publish to CLASH" button. clash-conference's settings hold the
   CLASH venue name, Holzmarkt 25, and the host email, anna.schmidt@example.com. Publishing
   cannot work yet: `app/api/publish/route.ts` is missing on clash-conference's `19-start`.
   Click "Publish to CLASH" on a talk anyway: you see the message
   `Publishing failed: /api/publish answered 404.` Unpublishing is already built in:
   `app/api/unpublish/route.ts` in clash-conference calls your `cancel_clash`. Read it: it is
   the finished twin of the route you write next.
8. Write the route. Start `claude` in clash-conference and send this prompt.
   ```
   Create app/api/publish/route.ts: a POST route that takes a talk id and publishes that
   talk into CLASH through the Agent SDK. Load the talk, the CLASH venue name and the host
   email from clash-conference's own data. Then call query() from @anthropic-ai/claude-agent-sdk
   with mcpServers: one stdio server named clash, command npx, args tsx and
   `${process.env.CLASH_DIR}/mcp/server.ts`; tools: [], so no built-in tool exists;
   settingSources: [], so no settings, skills or CLAUDE.md load; strictMcpConfig: true, so
   clash is the only MCP server; allowedTools: exactly mcp__clash__find_venue and
   mcp__clash__create_clash; permissionMode: dontAsk, so every other call is denied;
   maxTurns: 8. The prompt asks the agent to find that venue
   by name and create the clash there, and to answer with the new clash id or with the
   reason it could not. Read the run's first message, the system/init: when the clash
   server's status is failed or needs-auth, mark the talk failed with that status and stop
   reading the run. The route decides nothing else itself: store what the agent answers on
   the talk — published with the clash id, or failed with the message — and return that.
   ```
   You see one new file in clash-conference, `app/api/publish/route.ts`. Read it and find
   six things: the one `query()` call; `tools: []`, `settingSources: []` and
   `strictMcpConfig: true`, which leave the agent nothing but the clash server; the two
   `mcp__clash__…` names in `allowedTools`; `permissionMode: "dontAsk"`; the `maxTurns`
   ceiling; and the `system/init` check that ends the publish before any tool runs.
9. In clash-conference on `localhost:3001`, pick a talk and click "Publish to CLASH". You
   see the talk turn `published` and carry a `clashId`, and the button turn into
   "Unpublish from CLASH". Open CLASH's map on `localhost:3000/map`: the talk is there as a
   clash at Holzmarkt 25, hosted by the host email. Your `find_venue` and your
   `create_clash` did that, called by an agent inside another app. Now click "Unpublish from
   CLASH". You see the talk go back to draft, without a `clashId`. Reload CLASH's map: the
   clash is gone. Your `cancel_clash` did that.
10. Now make it fail. In clash-conference on `localhost:3001`, change the CLASH venue name in
    clash-conference's settings to one CLASH does not know, then publish a second talk. You
    see it end as `failed` with the agent's message: your `find_venue` answered
    `No venue matches …`, so `create_clash` was never called. Nothing was written to CLASH.

## Now you

- Design a fifth tool, `list_venues`, with no input. Give it a description that tells Claude
  when to use it instead of `find_venue`. Restart Claude Code in your CLASH clone and check
  that `/mcp` shows five tools.
- Point `ask-clash.mts` from task 16, in your CLASH clone, at the server: `mcpServers` and
  `allowedTools` in its options. The question is now answered from `dev.db` in your CLASH
  clone, not from CLASH's `prisma/seed.ts`.
- Pick one refusal text of the server and make it good enough that Claude can recover on its
  own, without asking you. Change the smoke test to match.
- CLASH's own `createClash` in `app/actions/clashes.ts` notifies the venue's creator when a
  clash is scheduled at their venue. Your `create_clash` writes straight to the database and
  skips that. Add the notification, and make the smoke test remove it again.

## Check

- [ ] `claude mcp list` in your CLASH clone prints `clash: npx tsx mcp/server.ts - ✔ Connected`.
- [ ] `mcp/server.ts` in your CLASH clone has exactly four `registerTool` calls and no `console.log`.
- [ ] `venueId` in `create_clash` is described as "id from find_venue", and Claude called `find_venue` before `create_clash`.
- [ ] `find_venue` answers `No venue matches …` through `reply()`, not `refuse()`.
- [ ] `cancel_clash` refuses a host who did not create the clash.
- [ ] `npx tsx mcp/smoke.ts` in your CLASH clone ends with `All checks passed.`
- [ ] "MCP Hacknight" appeared on CLASH's map once, and the second create was refused with `Duplicate: …`.
- [ ] `.claude/settings.json` in your CLASH clone has `hooks` and `permissions`, allows the two read tools, and `cancel_clash` still asked before it took "MCP Hacknight" off the map.

Only once clash-conference is published and you did steps 7 to 10:

- [ ] A talk published from clash-conference shows up on CLASH's map, and unpublishing it takes it off again.
- [ ] A talk with an unknown venue ends as `failed` in clash-conference, and CLASH is unchanged.

## Stuck?

In your CLASH clone, `git checkout 19-start` gives CLASH's `19-start`: `14-start` plus the
starter server, `mcp/server.ts` with one working tool and three marked places, the smoke test
`mcp/smoke.ts`, and the two MCP packages. `19-solution` in your CLASH clone is the finished
server, `.mcp.json` and the two allowed read tools. If your server does not pass the smoke
test, take the finished one before the clash-conference steps. The stash parks your own
files, because the same files are tracked on CLASH's `19-solution`; `git stash pop` on
CLASH's `19-start` brings them back later.

```bash
git stash -u                 # in your CLASH clone: parks mcp/server.ts, .mcp.json and .claude/settings.json
git checkout 19-solution     # CLASH's 19-solution: the finished server
npm install
```

In clash-conference, `git checkout 19-start`
gives clash-conference's `19-start`: clash-conference without `app/api/publish/route.ts`
and without `lib/clash-agent.ts`, the file that holds the `query()` call on its `main`.
Unpublishing is already there on clash-conference's `19-start`.
`git checkout 19-solution` in clash-conference gives clash-conference with the finished
route. The starter, the finished server, `.mcp.json`, `settings.allow.json` and the smoke
test are in `workshop-artifacts/19-build-mcp/` in the workshop repository. Its `README.md`
says where each file goes.

## Go further

Serve the same four tools over HTTP from a route inside CLASH instead of a stdio process,
so another machine can register it with `claude mcp add --transport http`.

## Links

- MCP — https://code.claude.com/docs/en/mcp
- Agent SDK: MCP — https://code.claude.com/docs/en/agent-sdk/mcp
- Agent SDK: Configure permissions — https://code.claude.com/docs/en/agent-sdk/permissions
- Build an MCP server — https://modelcontextprotocol.io/docs/develop/build-server
