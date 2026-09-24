# Task 19 — Build your own MCP

> Part: Orchestrate and let go · Reset branch: `19-start` in your CLASH clone and in clash-conference
> Slides: https://mastering-claude-code.vercel.app/task-19

## Theory

- [A server is three registered tools](https://mastering-claude-code.vercel.app/theory-mcp-server-anatomy)
- [Register it, then trust it selectively](https://mastering-claude-code.vercel.app/theory-mcp-json)
- [Another app, same server](https://mastering-claude-code.vercel.app/theory-mcp-from-sdk)

> **Reminder:** An MCP tool is a name, a description and a schema; the server does the work, and every caller still needs permission to use it.

## You will end up with

Your own MCP server, `mcp/server.ts` in your CLASH clone. It offers three tools over the
CLASH database: `list_upcoming_clashes`, `find_venue` and `create_clash`. Claude Code finds
it through `.mcp.json` at the root of your CLASH clone. The two read tools run without
asking. The write tool asks every time.

Then a second app, clash-conference, uses the same server through the Agent SDK. One click
turns a talk into a clash in CLASH.

## Why

In task 14 you used other people's MCP servers. In task 16 you put the agent loop inside
your own program. This task is the third side: CLASH itself as a tool.

A tool is small. A name, a description, a schema, a function. Claude reads the description
and decides when to call it. The server decides what it allows. It refuses an unknown host,
an unknown venue, a past date, a duplicate. That logic lives in one place and every caller
gets it: Claude Code at your keyboard, and a route in clash-conference. One server, two hosts.

A server in `.mcp.json` is a program that runs on your machine. So Claude Code asks once
before it starts one. Until you say yes, `claude mcp list` shows it as
``⏸ Pending approval (run `claude` to approve)``.

## Do this

**One tool, end to end**

1. In your CLASH clone, reset to CLASH's `19-start`, install the server package and register
   the server. `zod` is already a CLASH dependency.
   ```bash
   git checkout 19-start                        # CLASH's 19-start
   npm install --save-exact @modelcontextprotocol/server@2.1.0
   claude mcp add --scope project --transport stdio clash -- npx tsx mcp/server.ts
   ```
   You see `npm` add one package, and a new `.mcp.json` at the root of your CLASH clone. It
   registers one server, `clash`, started with `npx tsx mcp/server.ts`. That file does not
   exist yet.
2. Start `claude` in your CLASH clone. If it asks whether to use the `clash` server from
   `.mcp.json`, say yes. Then ask for the server with one tool only.
   ```
   Create mcp/server.ts: an MCP server over stdio using McpServer from
   "@modelcontextprotocol/server", StdioServerTransport from
   "@modelcontextprotocol/server/stdio" and zod.
   Build the Prisma client like lib/prisma.ts, but resolve dev.db from import.meta.url,
   never process.cwd(). Import PrismaClient by relative path,
   ../lib/generated/prisma/client, never the @/ alias, because clash-conference starts
   this file from its own folder. Add two helpers, reply(text) and refuse(text), where
   refuse sets isError. Name the server "clash". Register one tool, find_venue(query): at
   most 5 venues whose title contains the query, case does not matter. Answer as a JSON
   array of objects with id, title, latitude and longitude. When nothing matches, answer
   exactly: No venue matches "<query>". Add main() that connects a StdioServerTransport.
   Log with console.error, never console.log, because stdout carries the protocol.
   ```
   You see Claude Code report `clash` as failed first, because `mcp/server.ts` did not exist
   when the session started. Then you see one new file, `mcp/server.ts`. Read it and find
   five things: the relative import of `PrismaClient`, the line that builds the path to
   `dev.db`, the single `registerTool` call, the `main()` that connects the transport, and
   no `console.log` anywhere.
3. Connect the server, now that its file exists.
   ```
   /mcp
   ```
   You see `clash` in the panel. Select it and choose Reconnect: it connects, with one tool,
   `find_venue`.
4. Ask the server something only `dev.db` in your CLASH clone can answer.
   ```
   Use the clash server: which venues match Holzmarkt?
   ```
   You see Claude call `clash - find_venue (MCP)` and answer with Holzmarkt 25 and its
   coordinates. Approve the call if Claude Code asks. You wrote that server, and it is
   answering from `dev.db` in your CLASH clone.

**Two more tools, fast**

5. Same file, one more tool.
   ```
   Add a second tool to mcp/server.ts: list_upcoming_clashes(area?). Future clashes
   only, earliest first, at most 20. area filters by title, description or venue
   title. One line per clash: ISO date-time, title, venue title, id. Plain text when
   the list is empty. Leave find_venue as it is.
   ```
   You see a second `registerTool` call in `mcp/server.ts`. `find_venue` is unchanged.
6. Exit Claude Code and start `claude` again in your CLASH clone, so the server starts with
   the new tool. Then ask what is coming up at that venue.
   ```
   Use the clash server: what is coming up at Holzmarkt 25?
   ```
   You see Claude call `clash - find_venue (MCP)`, then `clash - list_upcoming_clashes (MCP)`.
   The answer is "nothing": the only seeded clash at Holzmarkt 25 is in the past. That is
   the server talking, not Claude's memory.
7. The write tool. Every refusal is part of the contract.
   ```
   Add a third tool to mcp/server.ts: create_clash(title, description, dateTime,
   venueId, hostEmail). Refuse with refuse() in four cases, with exactly these texts:
   hostEmail is not a CLASH user: No CLASH user with email <hostEmail>. Nothing was created.
   venueId is unknown: Unknown venue <venueId>. Use find_venue to get a valid id.
   dateTime is not an ISO date-time in the future: dateTime must be an ISO date-time in the future.
   a clash with the same title and the same dateTime already exists: Duplicate: "<title>" already exists at <ISO date-time> (id <id>).
   Otherwise create the clash with the venue's latitude and longitude and the host as
   creator, and answer exactly: Created clash <id>: "<title>" at <ISO date-time>.
   Leave the two read tools as they are.
   ```
   You see a third `registerTool` call, `create_clash`, with four refusals that each go
   through `refuse()`.
8. Start CLASH in a second terminal, in your CLASH clone, and leave it running.
   ```bash
   npm run dev   # in your CLASH clone, in a second terminal
   ```
   You see CLASH start on `localhost:3000`. Keep that terminal open for the rest of this task.
9. Exit Claude Code and start `claude` again in your CLASH clone. Then write through the
   server.
   ```
   Create a clash "MCP Hacknight" at Holzmarkt 25, hosted by anna.schmidt@example.com. Pick any date and time in the future.
   ```
   You see a permission prompt for `create_clash`. Approve this one call, not for good. The
   server answers `Created clash <id>: "MCP Hacknight" at <ISO date-time>.` Open CLASH on
   `localhost:3000/clashes`: the new clash is on the list.
10. Ask for the same clash again, same title, same time.
    ```
    Create the clash "MCP Hacknight" at Holzmarkt 25 once more, at exactly the same date and time as before, hosted by anna.schmidt@example.com
    ```
    You see the server compare title and time and refuse:
    `Duplicate: "MCP Hacknight" already exists at <ISO date-time> (id <id>).` Nothing was
    written. Open CLASH on `localhost:3000/clashes`: it still shows the clash once.
11. Trust it selectively. On CLASH's `19-start`, `.claude/settings.json` in your CLASH clone
    holds only `hooks`. Ask Claude to add the allow list next to it.
    ```
    Add a permissions.allow list to .claude/settings.json with mcp__clash__find_venue and mcp__clash__list_upcoming_clashes. Keep the hooks key exactly as it is.
    ```
    You see `.claude/settings.json` in your CLASH clone with two keys, `hooks` and
    `permissions`, and the two full tool names under `allow`.
12. Exit Claude Code and start `claude` again in your CLASH clone. Ask the question from
    step 6 again.
    ```
    Use the clash server: what is coming up at Holzmarkt 25?
    ```
    You see both read tools run with no permission prompt.
13. Send the write prompt from step 9 again.
    ```
    Create a clash "MCP Hacknight" at Holzmarkt 25, hosted by anna.schmidt@example.com. Pick any date and time in the future.
    ```
    You see the permission prompt for `create_clash` come back, because it is not on the
    allow list. Choose No. Nothing is written. Open CLASH on `localhost:3000/clashes`: it
    still shows "MCP Hacknight" once. Reads are free. Writes ask.

**The second app: clash-conference**

If clash-conference is not published yet, this task ends after step 13, and the trainer
says when the second half is on.

The rest of this task needs a server that answers. If yours does not, park your own work and
switch to the finished one, in your CLASH clone:

```bash
git stash -u                 # parks mcp/, .mcp.json, .claude/settings.json and package.json in your CLASH clone
git checkout 19-solution
npm install
```

`19-solution` in your CLASH clone is CLASH's `19-start` plus `mcp/`, `.mcp.json`, the two
MCP packages and the two allowed read tools. The stash comes first because those same files
are tracked on `19-solution` in your CLASH clone, and git refuses to overwrite your
versions. `git stash pop` on CLASH's `19-start`, in your CLASH clone, brings your own server
back later.

14. Clone clash-conference next to your CLASH clone, so that the two folders are siblings,
    and check out clash-conference's `19-start`. If you already cloned clash-conference
    during setup, skip `git clone` and only run `git checkout 19-start` in clash-conference.
    ```bash
    cd ..                                                 # the folder that holds your CLASH clone
    git clone https://github.com/agilino/clash-conference.git
    cd clash-conference
    git checkout 19-start                                 # clash-conference's 19-start
    ```
    You see git switch clash-conference to its own `19-start`.
15. In clash-conference, create its `.env` from the example, then install and seed its own
    database.
    ```bash
    cp .env.example .env
    npm install
    npm run db:migrate
    npm run db:seed
    ```
    You see the seed finish with one settings record and three draft talks, in the `dev.db`
    of clash-conference. The new `.env` in clash-conference holds `CLASH_DIR=../clash`:
    change it if your CLASH clone has another folder name.
16. Start clash-conference in a terminal of its own, in clash-conference.
    ```bash
    npm run dev
    ```
    You see clash-conference on `localhost:3001`, next to CLASH on `localhost:3000`: three
    draft talks, each with a "Publish to CLASH" button. clash-conference's settings hold the
    CLASH venue name, Holzmarkt 25, and the host email, anna.schmidt@example.com. The
    "Publish to CLASH" button in clash-conference does nothing yet:
    `app/api/publish/route.ts` is missing on clash-conference's `19-start`.
17. Write the route. Start `claude` in clash-conference and send this prompt.
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
18. In clash-conference on `localhost:3001`, pick a talk and click "Publish to CLASH". You
    see the talk turn `published` and carry a `clashId`. Open CLASH on
    `localhost:3000/clashes`: the talk is there as a clash, at the venue from
    clash-conference's settings, hosted by the host email.
19. Now make it fail. In clash-conference on `localhost:3001`, change the CLASH venue name in
    clash-conference's settings to one CLASH does not know, then publish a second talk. You
    see it end as `failed` with the agent's message: the server found no such venue, so
    `create_clash` was never called. Nothing was written to CLASH.

## Now you

- Add a fourth tool, `list_venues`, with no input. Restart Claude Code in your CLASH clone
  and check that `/mcp` shows four tools.
- Point `ask-clash.mts` from task 16, in your CLASH clone, at the server: `mcpServers` and
  `allowedTools` in its options. The question is now answered from `dev.db` in your CLASH
  clone, not from CLASH's `prisma/seed.ts`.
- Pick one refusal message of the server and make it good enough that Claude can recover
  on its own, without asking you.

## Check

- [ ] `claude mcp list` in your CLASH clone prints `clash: npx tsx mcp/server.ts - ✔ Connected`.
- [ ] With one tool registered, `/mcp` listed `clash` with only `find_venue`.
- [ ] `find_venue` answered with a venue from `dev.db` in your CLASH clone, not from Claude's memory.
- [ ] `mcp/server.ts` now has exactly three `registerTool` calls and no `console.log`.
- [ ] `/mcp` lists `clash` with three tools.
- [ ] Every call to your server shows as `clash - <tool> (MCP)`, and step 11 allowed two of them by their names `mcp__clash__…`.
- [ ] "MCP Hacknight" is on CLASH at `localhost:3000/clashes` once, not twice.
- [ ] The second create was refused with `Duplicate: …`.
- [ ] `.claude/settings.json` in your CLASH clone has `hooks` and `permissions`, allows the two read tools, and a write still asks.
- [ ] A talk published from clash-conference shows up in CLASH as a clash.
- [ ] A talk with an unknown venue ends as `failed` and CLASH is unchanged.

## Stuck?

In your CLASH clone, `git checkout 19-start` gives CLASH's `19-start`, identical to
`14-start`: the reference CLASH with the hook set, no `mcp/` folder, no `.mcp.json`.
`git checkout 19-solution` in your CLASH clone gives CLASH's `19-start` plus the finished
server, for anyone who wants the second half of this task anyway — run `git stash -u` first
if you already wrote your own `mcp/server.ts`. In clash-conference, `git checkout 19-start`
gives clash-conference's `19-start`: clash-conference without `app/api/publish/route.ts`
and without `lib/clash-agent.ts`, the file that holds the `query()` call on its `main`.
The finished server, `.mcp.json`, `settings.allow.json` and a smoke test are in
`workshop-artifacts/19-build-mcp/` in the workshop repository. Its `README.md` says where
each file goes. The smoke test, `npx tsx mcp/smoke.ts` in your CLASH clone, calls every tool
and every refusal and cleans up after itself. It checks the exact answer texts the prompts
in steps 2 and 7 ask for, and it expects exactly three tools. `19-solution` in your CLASH
clone already has `mcp/smoke.ts`. On your own work in your CLASH clone, the smoke test also
needs `npm install --save-dev --save-exact @modelcontextprotocol/client@2.1.0`.

## Go further

Serve the same three tools over HTTP from a route inside CLASH instead of a stdio process,
so another machine can register it with `claude mcp add --transport http`.

## Links

- MCP — https://code.claude.com/docs/en/mcp
- Agent SDK: MCP — https://code.claude.com/docs/en/agent-sdk/mcp
- Agent SDK: Configure permissions — https://code.claude.com/docs/en/agent-sdk/permissions
- Build an MCP server — https://modelcontextprotocol.io/docs/develop/build-server
