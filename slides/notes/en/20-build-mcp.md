<!-- @note: build-your-own-mcp -->
Say:
- Task 14: we only used other people's servers — Playwright, Chrome DevTools, a remote one
- Now CLASH is the system another agent reaches. We design the server ourselves
- Four tools, one file, and at the end clash-conference calls the same server: publish and unpublish

<!-- @note: task-19-build-your-own-mcp -->
> Do:
> - Branch: CLASH's 19-start in your CLASH clone — 14-start plus the starter mcp/server.ts (one working tool, three marked places), mcp/smoke.ts and the two MCP packages
> - No install step for the packages: CLASH's 19-start already pins @modelcontextprotocol/server and @modelcontextprotocol/client at 2.1.0. Setup still pre-fetches both (docs/SETUP.md), so `npm install` in step 1 needs no network; zod is already a CLASH dependency
> - Trap: the package is @modelcontextprotocol/server, never the older @modelcontextprotocol/sdk
> - clash-conference is a second clone next to your CLASH clone, with a 19-start of its own — say now that it comes at the end

Say:
- Four things: start from a running server, design three tools, trust it selectively, call it from clash-conference
- The write tools are the interesting ones: the server refuses bad input, the model cannot improvise

<!-- @note: a-server-is-four-registered-tools -->
> Do:
> - Docs link: the TypeScript tab, the imports, one registerTool call
> - Stay on the diagram; the five design decisions come next, then the code

Say:
- [click] Claude Code is the client: it starts the server, JSON-RPC over stdin and stdout
- One console.log writes into that channel and breaks it. Logs go to console.error
- [click] Four registerTool calls: name, description, zod schema, handler. The description tells Claude when
- [click] Behind the tools: Prisma and CLASH's dev.db, resolved from import.meta.url, never process.cwd()
- Inside Claude Code a tool is mcp__clash__find_venue: server name, double underscore, tool name

<!-- @note: five-decisions-behind-a-good-tool-server -->
> Do:
> - Static slide, no clicks: read the five titles, then point at the example on each card
> - Each card is a line in the prompts of steps 2 to 4 in tasks/19-build-your-own-mcp.md

Say:
- CLASH's 19-start brings the plumbing: stdio, dev.db, log(), reply(), refuse(). What you add is design
- venueId described as "id from find_venue": Claude calls find_venue first and never guesses an id
- A refusal is text with isError, read later by a person in clash-conference. "No venue matches" is a reply: nothing went wrong
- Checks before both writes: create_clash checks host, venue, date, duplicate; cancel_clash checks host, clash, owner. The only delete touches the host's own clash. Reads run freely, both writes ask

<!-- @note: mcp-server-ts -->
> Do:
> - FULL WORKING SOLUTION (trainer only): workshop-artifacts/19-build-mcp/server.ts, the finished mcp/server.ts on CLASH's 19-solution. What goes in at the three ⟵ LIVE places:
>   At "Step 2 of task 19", find_venue: inputSchema: z.object({ query: z.string().min(1) }); prisma.venue.findMany({ where: { title: { contains: query } }, orderBy: { title: "asc" }, take: 5 }); no match → reply(`No venue matches "${query}".`), else reply(JSON.stringify(venues, null, 2))
>   At "Step 3 of task 19", create_clash: venueId: z.string().describe("id from find_venue"), dateTime: z.string().describe("ISO date-time in the future"); four refuse() checks in this order: no user with hostEmail, no venue with venueId, !isIsoDateTime(dateTime) or not in the future, same title and dateTime; then the one prisma.clash.create({ data: { …, venueId: venue.id, creatorId: host.id } }), log(), reply(`Created clash ${clash.id}: "${clash.title}" at ${clash.dateTime.toISOString()}.`)
>   At "Step 4 of task 19", cancel_clash: clashId: z.string().describe("id from create_clash or list_upcoming_clashes"), hostEmail; three refuse() checks in this order: no user with hostEmail, no clash with clashId, clash.creatorId !== host.id; then the one prisma.clash.delete, log(), reply(`Cancelled clash ${clash.id}: "${clash.title}".`)
> - Send the prompts from steps 2 to 4 of tasks/19-build-your-own-mcp.md, then read Claude's diff against the key
> - Smoke test at the end of step 4: mcp/smoke.ts is already on CLASH's 19-start. `npx tsx mcp/smoke.ts` in your CLASH clone prints 19 PASS lines, then `All checks passed.`
> - Trap: CLASH has no "type": "module", so tsx runs CommonJS — no top-level await, hence main()

Say:
- registerTool is the whole contract: Claude gets name, description, schema; the handler runs on the server
- The writes hold the rules: create_clash refuses an unknown host, an unknown venue, a past date, a duplicate; cancel_clash refuses an unknown host, an unknown clash, a host who is not the owner
- A refusal is plain text with isError: true. Nothing was written, and the model reads why
- The server is a plain Node process. Nothing in it knows about Claude Code

<!-- @note: register-it-then-trust-it-selectively -->
> Do:
> - Docs link: the scope table (local, project, user) and the `.mcp.json` example
> - Live, as in step 1: `claude mcp add --scope project --transport stdio clash -- npx tsx mcp/server.ts` in your CLASH clone writes `.mcp.json`; start `claude` again, say yes
> - Then `/mcp` in the session and `claude mcp list` from the shell
> - Said no by mistake? `claude mcp reset-project-choices`
> - Step 6 demo: with the two read tools allowed, "Cancel the clash …" still asks before cancel_clash runs. Approve once, reload CLASH's map on localhost:3000/map: the clash is gone

Say:
- local and user live in ~/.claude.json; project is `.mcp.json` at the root of your CLASH clone, checked in
- [click] A project server asks once before it may launch in your CLASH clone. Until then: ⏸ Pending approval
- Edited `.mcp.json`? Exit and restart. ✘ Failed to connect while npx downloads? Run it again
- [click] Full name, no parentheses: mcp__clash__find_venue. mcp__clash alone would allow every tool
- acceptEdits does not cover MCP tools; only bypassPermissions skips the prompt, and all the others too

<!-- @note: every-tool-or-two-named-tools -->
> Do:
> - [click] allowedTools: mcp__clash__* — cancel_clash too, the delete tool · [click] permissionMode: bypassPermissions — allowedTools limits nothing
> - [click] never reads system/init — a failed server throws nothing · [click] wrong venue? the agent improvises · [click] careless bar
> - [click] allowedTools: two named tools — find_venue and create_clash · [click] maxTurns: a hard ceiling
> - [click] init says failed? mark the talk failed · [click] store the answer, decide nothing · [click] engineered bar, closing line

Say:
- The publish route in clash-conference, sketched before anyone writes it
- allowedTools pre-approves, it does not restrict. With bypassPermissions Bash, Write and Edit are approved too
- The locked-down pattern: allowedTools plus permissionMode dontAsk — listed tools run, everything else is denied
- dontAsk still runs what loaded settings allow and what needs no approval, like file reads. So isolate too: tools: [], settingSources: [], strictMcpConfig: true
- system/init carries mcp_servers with a status. failed or needs-auth is the check; pending is fine
- Least privilege, like the hook and the subagent brief: the rule holds either way

<!-- @note: another-app-same-server -->
> Do:
> - Docs link: mcpServers with a stdio entry, allowedTools with server wildcards
> - Second clone: clash-conference next to your CLASH clone; clash-conference/.env holds CLASH_DIR=../clash — that is how the clash-conference route finds mcp/server.ts

Say:
- [click] Same chain as before: Claude Code, stdio, the server, Prisma, dev.db
- [click] Second client: clash-conference through the Agent SDK. query() gets mcpServers, `.mcp.json` inside the program
- Started from clash-conference, the server still finds CLASH's dev.db — that is import.meta.url
- A cold npx download can hit MCP_TIMEOUT. Treat failed in system/init as a failed publish
- The toggle: "Unpublish from CLASH" is already built on clash-conference's 19-start and calls your cancel_clash. Participants write only the publish route

<!-- @note: route-ts -->
> Do:
> - FULL WORKING SOLUTION (trainer only): the query() options are mcpServers clash, tools: [], settingSources: [], strictMcpConfig: true, the two allowedTools, permissionMode: "dontAsk", maxTurns: 8
> - On its main, clash-conference keeps the query() call in lib/clash-agent.ts and app/api/publish/route.ts calls it; the 19-start of clash-conference has neither file
> - Until clash-conference sits next to your CLASH clone, show the shape only: the three isolation options, maxTurns, a system/init check, the stored outcome

Say:
- Without settingSources: [] the agent loads your ~/.claude: your skills, your allow rules, even your language

<!-- @note: build-your-own-mcp-2 -->
> Do:
> - Starting point: CLASH's 19-start in your CLASH clone, then `npm run db:seed` — the smoke test and the Holzmarkt 25 prompts count on the seed data
> - Hand off to tasks/19-build-your-own-mcp.md: steps 1 to 6 the server in your CLASH clone, 7 to 10 clash-conference on localhost:3001
> - Watch for: a console.log in the server, a refuse() when find_venue finds nothing, a write before its checks, a delete without the owner check, a skipped restart after a new tool
> - Map demo: CLASH's map on localhost:3000/map, reload after every change. Create → the clash appears; the same create again → Duplicate, still one; cancel or unpublish → it disappears

Say:
- "Now you": a fifth tool list_venues, ask-clash.mts from Task 16 pointed at this server, a refusal Claude can recover from on its own
- Also in "Now you": create_clash writes straight to the database and skips the venue_clash notification that CLASH's own createClash in app/actions/clashes.ts sends to the venue's creator
- Go further: the same four tools over HTTP as a Next.js route inside CLASH
