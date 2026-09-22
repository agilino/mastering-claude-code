<!-- @note: mcp-has-three-primitives-not-one -->
Say:
- Every MCP server we've used so far only exposed tools
- [click] Resources are how a server hands over data without a tool call
- [click] Prompts are a server-authored starting point you can pull into the conversation
- None of this is Claude-Code-specific — it's the MCP spec, any client gets the same three

<!-- @note: a-remote-server-needs-its-own-login -->
> Do:
> - FULL WORKING SOLUTION (trainer only): claude mcp add --transport http sentry https://mcp.sentry.dev/mcp
>   then /mcp inside a session, follow the browser prompt
> - Docs link: open it, scroll to "Authenticate with remote MCP servers", then back to the slides

Say:
- [click] http is the default choice for a server you do not run yourself
- [click] sse still works but is on its way out
- Claude Code stores the token — you only log in once per server
