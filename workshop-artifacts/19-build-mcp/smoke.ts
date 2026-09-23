// Smoke test for mcp/server.ts. Starts the server as a child process, then
// calls every tool once and checks the answers. Run: npx tsx mcp/smoke.ts
import path from "node:path";
import { fileURLToPath } from "node:url";
import { Client } from "@modelcontextprotocol/client";
import { StdioClientTransport } from "@modelcontextprotocol/client/stdio";
import { PrismaClient } from "../lib/generated/prisma/client";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";

const here = path.dirname(fileURLToPath(import.meta.url));

// Direct database access, only to remove the clash this test creates.
const dbFile = path.join(here, "..", "dev.db");
const prisma = new PrismaClient({ adapter: new PrismaBetterSqlite3({ url: `file:${dbFile}` }) });

// Start from the mcp/ folder, not the clash root, on purpose: the server must
// still find <clash root>/dev.db, because it resolves the path from its own file.
const transport = new StdioClientTransport({
  command: "npx",
  args: ["tsx", path.join(here, "server.ts")],
  cwd: here,
  stderr: "inherit",
});
const client = new Client({ name: "clash-smoke", version: "1.0.0" });

let failures = 0;

// Call one tool and return its text answer.
async function call(name: string, args: Record<string, unknown>): Promise<string> {
  const result = await client.callTool({ name, arguments: args });
  const first = (result.content as Array<{ type: string; text?: string }>)[0];
  const text = first?.text ?? JSON.stringify(result);
  console.log(`\n> ${name}(${JSON.stringify(args)})\n${text}`);
  return text;
}

function expect(label: string, ok: boolean) {
  console.log(ok ? `PASS ${label}` : `FAIL ${label}`);
  if (!ok) failures += 1;
}

async function main() {
await client.connect(transport);

const { tools } = await client.listTools();
expect("three tools registered", tools.length === 3);
expect(
  "tool names",
  ["create_clash", "find_venue", "list_upcoming_clashes"].every((n) => tools.some((t) => t.name === n)),
);

const venues = await call("find_venue", { query: "holzmarkt" });
const venue = (JSON.parse(venues) as Array<{ id: string; title: string }>)[0];
expect("find_venue finds Holzmarkt 25 (case does not matter)", venue?.title === "Holzmarkt 25");

const none = await call("find_venue", { query: "nowhere" });
expect("find_venue with no match answers with text, not an error", none.startsWith("No venue matches"));

const upcoming = await call("list_upcoming_clashes", { area: "Holzmarkt" });
expect("list_upcoming_clashes never shows a past clash", !upcoming.includes("Open Source Hacknight"));

const all = await call("list_upcoming_clashes", {});
expect("list_upcoming_clashes without area lists the seeded upcoming clashes", all.includes("React Berlin Clash"));

// Far ahead, computed now, so the test never goes stale.
const farAhead = new Date();
farAhead.setFullYear(farAhead.getFullYear() + 1);
farAhead.setHours(19, 0, 0, 0);
const draft = {
  title: "MCP Hacknight",
  description: "Build MCP servers together. Created by the smoke test.",
  dateTime: farAhead.toISOString(),
  venueId: venue.id,
  hostEmail: "anna.schmidt@example.com",
};

const created = await call("create_clash", draft);
expect("create_clash creates the clash", created.startsWith("Created clash"));

const again = await call("create_clash", draft);
expect("create_clash refuses the same title at the same time", again.startsWith("Duplicate:"));

const unknownHost = await call("create_clash", { ...draft, hostEmail: "nobody@example.com" });
expect("create_clash refuses an unknown host", unknownHost.startsWith("No CLASH user with email"));

const unknownVenue = await call("create_clash", { ...draft, title: "Elsewhere", venueId: "not-a-venue" });
expect("create_clash refuses an unknown venue", unknownVenue.startsWith("Unknown venue"));

const longAgo = new Date();
longAgo.setFullYear(longAgo.getFullYear() - 1);
const past = await call("create_clash", { ...draft, title: "Long ago", dateTime: longAgo.toISOString() });
expect("create_clash refuses a past date", past.startsWith("dateTime must be"));

const garbage = await call("create_clash", { ...draft, title: "No date", dateTime: "someday" });
expect("create_clash refuses an invalid date", garbage.startsWith("dateTime must be"));

const listed = await call("list_upcoming_clashes", { area: "Holzmarkt" });
expect("the new clash shows up in list_upcoming_clashes", listed.includes("MCP Hacknight"));

// Clean up: remove the test clash so the database looks like before.
const createdId = created.match(/^Created clash (\S+):/)?.[1];
if (createdId) await prisma.clash.delete({ where: { id: createdId } });
await prisma.$disconnect();

await client.close();
console.log(failures === 0 ? "\nAll checks passed." : `\n${failures} check(s) failed.`);
process.exit(failures === 0 ? 0 : 1);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
