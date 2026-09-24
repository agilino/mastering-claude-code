# Task 19 answer key — the CLASH MCP server

`server.ts` is an MCP server. It offers four tools over the CLASH database and talks to Claude Code over stdio.
Claude Code starts it, asks it for its tool list, and calls a tool when it needs one.

| Tool | Input | What it does |
|---|---|---|
| `list_upcoming_clashes` | `area?` | Upcoming clashes, earliest first, at most 20. `area` filters by title, description or venue name. |
| `find_venue` | `query` | Venues whose title contains the query, case does not matter, at most 5. |
| `create_clash` | `title`, `description`, `dateTime`, `venueId`, `hostEmail` | Creates a clash. Refuses an unknown host, an unknown venue, a past or invalid date, and a duplicate (same title, same time). |
| `cancel_clash` | `clashId`, `hostEmail` | Deletes a clash. Refuses an unknown host, an unknown clash, and a host who did not create the clash. clash-conference's "Unpublish from CLASH" calls it. |

Inside Claude Code the tools are named `mcp__clash__list_upcoming_clashes`, `mcp__clash__find_venue`, `mcp__clash__create_clash` and `mcp__clash__cancel_clash`.

`server.start.ts` is the starter participants begin with. It is `server.ts` without `find_venue`, `create_clash` and `cancel_clash`: the same plumbing, `list_upcoming_clashes` as the finished model tool, and three marked places, `Step 2 of task 19`, `Step 3 of task 19` and `Step 4 of task 19`. Task 19 steps 2 to 4 fill them. The rest of the file is identical, so the diff between the two files is exactly what a participant designs.

## Where each file goes

| `workshop-artifacts/19-build-mcp/` in the workshop repository | Your CLASH clone | Branch |
|---|---|---|
| `server.start.ts` | `mcp/server.ts` | CLASH's `19-start` |
| `server.ts` | `mcp/server.ts` | CLASH's `19-solution` |
| `smoke.ts` | `mcp/smoke.ts` | both |
| `.mcp.json` | `.mcp.json` (at the root of your CLASH clone) | CLASH's `19-solution`; on CLASH's `19-start` task 19 step 1 creates it with `claude mcp add` |
| `settings.allow.json` | merge the `permissions.allow` list into `.claude/settings.json` | CLASH's `19-solution`; on CLASH's `19-start` task 19 step 5 adds it |

`scripts/prepare-branches.sh` in the workshop repository builds both branches from these files.

## Install

CLASH's `19-start` already has `@modelcontextprotocol/server` 2.1.0 and `@modelcontextprotocol/client` 2.1.0 in its `package.json`. To put the finished server on it by hand:

```bash
cd clash                                     # your CLASH clone
git checkout 19-start                        # CLASH's 19-start
npm install
cp <workshop repository>/workshop-artifacts/19-build-mcp/server.ts mcp/server.ts
cp <workshop repository>/workshop-artifacts/19-build-mcp/.mcp.json .mcp.json
```

Or check out CLASH's `19-solution`, which is exactly that plus the two allowed read tools. The answer key was built with `@modelcontextprotocol/server` 2.1.0 and `@modelcontextprotocol/client` 2.1.0.

## Run the smoke test

The server reads the real CLASH database, so `dev.db` in your CLASH clone has to exist, be migrated and hold the seed data. Run these in your CLASH clone:

```bash
npx prisma migrate deploy
npx prisma db seed
npx tsx mcp/smoke.ts
```

It starts the server, lists the tools, calls each one, and prints `PASS` or `FAIL` per check. The last line must be `All checks passed.`
It creates one clash, "MCP Hacknight", cancels it through `cancel_clash`, and removes anything left over at the end. The seed data in `dev.db` of your CLASH clone stays as it was.

## Connect it to Claude Code

1. Start `claude` in your CLASH clone. Claude Code finds `.mcp.json` and asks whether to use the `clash` server. Say yes.
2. In the session, `/mcp` lists the server and its four tools.
3. From a terminal in your CLASH clone, check the health:

```bash
claude mcp list
```

Expected line:

```txt
clash: npx tsx mcp/server.ts - ✔ Connected
```

Before you approve the server the same line ends with `⏸ Pending approval (run \`claude\` to approve)`.

## Least privilege

`settings.allow.json` allows only the two read tools. `create_clash` stays behind a permission prompt.
Merge the list into `.claude/settings.json` in your CLASH clone. On CLASH's `19-start` that file already holds `hooks`, so it ends up with two keys, `hooks` and `permissions` — merge, never paste over the file:

```json
{
  "permissions": {
    "allow": ["mcp__clash__find_venue", "mcp__clash__list_upcoming_clashes"]
  }
}
```

## What to look at in `server.ts`

The five design decisions task 19 teaches, and where each one shows:

1. **Small tools.** `find_venue` looks up, `create_clash` writes, and the write takes a `venueId` that only the lookup provides.
2. **Descriptions are the interface.** The tool descriptions and `.describe("id from find_venue")` steer Claude before any code runs.
3. **Refusals are product text.** `refuse()` returns text with `isError: true`; clash-conference shows that text to the organiser as the reason a publish failed. `No venue matches "…"` goes through `reply()`: no match is an answer, not an error.
4. **Check before you write.** `create_clash`: host, venue, ISO date in the future, duplicate — in that order, all before the one `prisma.clash.create`. `cancel_clash`: host, clash, owner — all before the one `prisma.clash.delete`.
5. **No more power than needed.** The one tool that deletes, `cancel_clash`, deletes only a clash its own host created, like CLASH's own `deleteClash`. No create-venue or create-user tool. `settings.allow.json` allows the two reads; both writes keep asking.

A known gap, on purpose: CLASH's own `createClash` in `app/actions/clashes.ts` notifies the venue's creator when someone schedules a clash at their venue (`docs/SPEC.md`). `create_clash` writes straight to the database and skips that side effect. Task 19 keeps the prompts short and turns this into a "Now you" exercise: add the notification, and make the smoke test remove it again.

And the plumbing the starter already has:

- `registerTool(name, { description, inputSchema }, handler)` — the whole tool contract in one call. The description is what Claude reads.
- `dbFile` is built from `import.meta.url`, not from `process.cwd()`. clash-conference can start this server from its own folder and still hit the same `dev.db` in your CLASH clone.
- `PrismaClient` comes from `../lib/generated/prisma/client`, a relative path, never the `@/` alias. Started from clash-conference, `@/` would mean clash-conference's own folder and its own generated client, which has no clashes or venues.
- `log()` writes to `stderr`. `stdout` carries the protocol. One `console.log` breaks the connection.
- `isIsoDateTime()` accepts only a real ISO date-time: `new Date()` alone would also take `12/31/2099` and roll `2099-02-29` over to March 1.
