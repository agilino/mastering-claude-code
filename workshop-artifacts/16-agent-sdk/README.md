# Task 16 answer key — the Agent SDK

`ask-clash.mts` is a small program that hosts the Claude Code agent loop.
It answers a question about CLASH by reading `prisma/seed.ts`. It can read, search and list files. Nothing else.

```bash
cd clash                                     # your CLASH clone
npm install @anthropic-ai/claude-agent-sdk tsx
cp <this folder>/ask-clash.mts .
npx tsx ask-clash.mts "find me something outdoors in Kreuzberg this evening"
```

What to look at:

- `allowedTools` and `disallowedTools` — the tool list is the first control you have.
- `hooks.PreToolUse` — the same hook idea as in `.claude/settings.json`, now as a function.
- `maxTurns` — a hard stop for the loop.
- The `result` message — the answer, the number of turns, and the cost.

Every idea from the workshop is here: a context you control, tools you limit, hooks you enforce.
