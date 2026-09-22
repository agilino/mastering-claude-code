<!-- @note: mcp-has-three-primitives-not-one -->
Sagen:
- Jeder MCP-Server, den wir bisher benutzt haben, hat nur Tools angeboten
- [click] Resources sind, wie ein Server Daten übergibt, ohne einen Tool-Call
- [click] Prompts sind ein vom Server vorgefertigter Ausgangspunkt für die Conversation
- Nichts davon ist Claude-Code-spezifisch — das ist der MCP-Standard, jeder Client bekommt dieselben drei

<!-- @note: a-remote-server-needs-its-own-login -->
> Tun:
> - VOLLSTÄNDIGE LÖSUNG (nur für Trainer): claude mcp add --transport http sentry https://mcp.sentry.dev/mcp
>   dann /mcp in einer Session, dem Browser-Prompt folgen
> - Docs-Link: öffnen, bis "Authenticate with remote MCP servers" scrollen, dann zurück zu den Folien

Sagen:
- [click] http ist die Standardwahl für einen Server, den du nicht selbst betreibst
- [click] sse funktioniert noch, ist aber auf dem Weg raus
- Claude Code speichert den Token — du loggst dich nur einmal pro Server ein
