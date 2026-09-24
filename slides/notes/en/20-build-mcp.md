<!-- @note: build-your-own-mcp -->
Say:
- Task 14: we only used other people's servers — Playwright, Chrome DevTools, a remote one
- Now CLASH is the system another agent reaches. We write the server ourselves
- Three tools, one file, and at the end clash-conference calls the same server

<!-- @note: task-19-build-your-own-mcp -->
> Do:
> - Branch: 19-start in your CLASH clone, identical to 14-start — CLAUDE.md, the skill, the fix, the hook set
> - `npm install --save-exact @modelcontextprotocol/server@2.1.0` in your CLASH clone, fetched at setup; zod is already a CLASH dependency
> - Trap: the package is @modelcontextprotocol/server, never the older @modelcontextprotocol/sdk
> - clash-conference is a second clone next to your CLASH clone, with a 19-start of its own — say now that it comes at the end

Say:
- Four things: write a server, register it, trust it selectively, call it from clash-conference
- The write tool is the interesting one: the server refuses bad input, the model cannot improvise

<!-- @note: a-server-is-three-registered-tools -->
> Do:
> - Docs link: the TypeScript tab, the imports, one registerTool call
> - Stay on the diagram; the code comes on the next slide

Say:
- [click] Claude Code is the client: it starts the server, JSON-RPC over stdin and stdout
- One console.log writes into that channel and breaks it. Logs go to console.error
- [click] Three registerTool calls: name, description, zod schema, handler. The description tells Claude when
- [click] Behind the tools: Prisma and CLASH's dev.db, resolved from import.meta.url, never process.cwd()
- Inside Claude Code a tool is mcp__clash__find_venue: server name, double underscore, tool name

<!-- @note: mcp-server-ts -->
> Do:
> - FULL WORKING SOLUTION (trainer only): workshop-artifacts/19-build-mcp/server.ts → mcp/server.ts in your CLASH clone. The ⟵ LIVE parts:
>   const clashRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
>   const dbFile = path.join(clashRoot, "dev.db");
>   const adapter = new PrismaBetterSqlite3({ url: `file:${dbFile}` });
>   async function main() { await server.connect(new StdioServerTransport()); }
> - Send the prompt from tasks/19-build-your-own-mcp.md step 2, then read Claude's diff against the key
> - Smoke test in your CLASH clone: `npm install --save-dev --save-exact @modelcontextprotocol/client@2.1.0`, then workshop-artifacts/19-build-mcp/smoke.ts → mcp/smoke.ts, `npx tsx mcp/smoke.ts` ends with `All checks passed.`
> - Trap: CLASH has no "type": "module", so tsx runs CommonJS — no top-level await, hence main()

Say:
- registerTool is the whole contract: Claude gets name, description, schema; the handler runs on the server
- create_clash holds the rules: unknown host, unknown venue, past date, duplicate — the server refuses
- A refusal is plain text with isError: true. Nothing was written, and the model reads why
- The server is a plain Node process. Nothing in it knows about Claude Code

<!-- @note: register-it-then-trust-it-selectively -->
> Do:
> - Docs link: the scope table (local, project, user) and the `.mcp.json` example
> - Live: `.mcp.json` from workshop-artifacts/19-build-mcp/.mcp.json into your CLASH clone, exit, start `claude` again, say yes
> - Then `/mcp` in the session and `claude mcp list` from the shell
> - Said no by mistake? `claude mcp reset-project-choices`

Say:
- local and user live in ~/.claude.json; project is `.mcp.json` at the root of your CLASH clone, checked in
- [click] A project server asks once before it may launch in your CLASH clone. Until then: ⏸ Pending approval
- Edited `.mcp.json`? Exit and restart. ✘ Failed to connect while npx downloads? Run it again
- [click] Full name, no parentheses: mcp__clash__find_venue. mcp__clash alone would allow every tool
- acceptEdits does not cover MCP tools; only bypassPermissions skips the prompt, and all the others too

<!-- @note: every-tool-or-two-named-tools -->
> Do:
> - [click] allowedTools: mcp__clash__* — later tools too · [click] permissionMode: bypassPermissions — allowedTools limits nothing
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

<!-- @note: route-ts -->
> Do:
> - FULL WORKING SOLUTION (trainer only): the query() options are mcpServers clash, tools: [], settingSources: [], strictMcpConfig: true, the two allowedTools, permissionMode: "dontAsk", maxTurns: 8
> - On its main, clash-conference keeps the query() call in lib/clash-agent.ts and app/api/publish/route.ts calls it; the 19-start of clash-conference has neither file
> - Until clash-conference sits next to your CLASH clone, show the shape only: the three isolation options, maxTurns, a system/init check, the stored outcome

Say:
- Without settingSources: [] the agent loads your ~/.claude: your skills, your allow rules, even your language

<!-- @note: build-your-own-mcp-2 -->
> Do:
> - Starting point: 19-start in your CLASH clone, `npm run dev` on localhost:3000, the eight seeded logins
> - Hand off to tasks/19-build-your-own-mcp.md: steps 1 to 13 the server, 14 to 19 clash-conference on localhost:3001
> - Watch for: a console.log in the server, a process.cwd() path, a skipped restart after `.mcp.json`
> - Duplicate demo: the same create prompt twice; the second answer is the server's Duplicate refusal

Say:
- "Now you": a fourth tool list_venues, then ask-clash.mts from Task 16 pointed at this server
- Go further: the same three tools over HTTP as a Next.js route inside CLASH
