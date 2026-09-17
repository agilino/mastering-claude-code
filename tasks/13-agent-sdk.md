# Task 13 — Agent SDK

> Part: Orchestrate and let go · Reset branch: `13-start`

## You will end up with

A small program, `ask-clash.mts`, that hosts the Claude Code agent loop inside your own
code. It answers "find me something outdoors in Kreuzberg this evening" by reading CLASH's
seed data. It may read files. It may not change anything.

## Why

You ran the agent next to your app all workshop. The Agent SDK is the same loop one level
down: the agent lives inside your program. Same context budget, same tool limits, same hooks.
Only the host changes.

## Do this

1. Install the SDK and a TypeScript runner in your CLASH clone.
   ```bash
   npm install @anthropic-ai/claude-agent-sdk tsx
   ```
2. Create `ask-clash.mts` at the repo root. Start with the loop and nothing else.
   ```ts
   import { query } from "@anthropic-ai/claude-agent-sdk";

   const question = process.argv.slice(2).join(" ");

   const run = query({
     prompt: `The demo data lives in prisma/seed.ts. Read it, then answer: ${question}`,
     options: {
       cwd: process.cwd(),
       allowedTools: ["Read", "Grep", "Glob"],
       disallowedTools: ["Bash", "Edit", "Write", "WebFetch", "WebSearch"],
       maxTurns: 12,
     },
   });

   for await (const message of run) {
     if (message.type === "result" && message.subtype === "success") {
       console.log(message.result);
       console.error(`[turns ${message.num_turns}] [cost $${message.total_cost_usd.toFixed(4)}]`);
     }
   }
   ```
3. Run it.
   ```bash
   npx tsx ask-clash.mts "find me something outdoors in Kreuzberg this evening"
   ```
4. Add a hook. Log every tool call to stderr so you can watch the loop.
   ```
   Add a PreToolUse hook to the options in ask-clash.mts that prints the tool
   name and the first 120 characters of its input to stderr. Keep everything
   else the same.
   ```
5. Run it again. Count the tool calls. Compare with `/context` in an interactive session.

## Now you

- Remove `Grep` and `Glob` from `allowedTools`. Run again. What changes?
- Give the program a system prompt that makes it answer in German.
- Turn it into a tiny HTTP endpoint at `/api/ask` in CLASH. Keep the tool limits.

## Check

- [ ] `npx tsx ask-clash.mts "…"` prints an answer that names a clash, a place and a time.
- [ ] The program never edits a file or runs a command. The tool log proves it.
- [ ] You can name the three controls in the options: tools, hooks, turn limit.
- [ ] The cost of one question is printed and you can say it out loud.

## Stuck?

`git checkout 13-start` — the reference CLASH with `CLAUDE.md`, the skill, the fix and the hook set.
The finished program is in `workshop-artifacts/13-agent-sdk/` in the workshop repository.

## Go further

Give the agent one tool of your own through an MCP server: `getUpcomingClashes(area)`
that queries the database instead of reading the seed file.

## Links

- Agent SDK overview — https://docs.claude.com/en/api/agent-sdk/overview
- Agent SDK TypeScript reference — https://docs.claude.com/en/api/agent-sdk/typescript
