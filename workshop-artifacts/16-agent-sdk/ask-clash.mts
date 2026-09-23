// Task 16 answer key — the same agent loop, hosted inside your own program.
//
// Run from the CLASH clone:
//   npm install @anthropic-ai/claude-agent-sdk tsx
//   npx tsx ask-clash.mts "find me something outdoors in Kreuzberg this evening"
//
// The agent may only read files (Read, Grep, Glob). It cannot edit or run commands.
// A PreToolUse hook logs every tool call, so you can watch the harness work.
import { query, type HookCallbackMatcher } from "@anthropic-ai/claude-agent-sdk";

const question = process.argv.slice(2).join(" ") || "find me something outdoors in Kreuzberg this evening";

const logToolCalls: HookCallbackMatcher = {
  hooks: [
    async (input) => {
      if (input.hook_event_name === "PreToolUse") {
        console.error(`[tool] ${input.tool_name} ${JSON.stringify(input.tool_input).slice(0, 120)}`);
      }
      return {};
    },
  ],
};

const run = query({
  prompt: [
    "You answer questions about CLASH, a meetup app for Berlin.",
    "The demo data lives in prisma/seed.ts. Read it, then answer the question below.",
    "Answer in three short sentences. Name the clash, the place and the time.",
    "",
    `Question: ${question}`,
  ].join("\n"),
  options: {
    cwd: process.cwd(),
    allowedTools: ["Read", "Grep", "Glob"],
    disallowedTools: ["Bash", "Edit", "Write", "WebFetch", "WebSearch"],
    permissionMode: "default",
    maxTurns: 12,
    hooks: { PreToolUse: [logToolCalls] },
  },
});

for await (const message of run) {
  if (message.type === "result") {
    if (message.subtype === "success") {
      console.log("\n" + message.result);
      console.error(`\n[turns ${message.num_turns}] [cost $${message.total_cost_usd.toFixed(4)}]`);
    } else {
      console.error(`Run ended: ${message.subtype}`);
      process.exitCode = 1;
    }
  }
}
