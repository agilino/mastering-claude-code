<!-- @note: a-plugin-bundles-your-setup -->
> Tun:
> - Docs-Link: öffnen, bis "Plugin structure overview" scrollen, dann zurück zu den Folien

Sagen:
- Ein einzelner Skill oder Hook lebt in .claude/ und bleibt lokal für ein Projekt
- Ein Plugin ist die verpackte, teilbare Version derselben Idee
- [click] skills/ — ein SKILL.md pro Skill, genau wie .claude/skills/
- [click] agents/ — Subagent-Dateien, gleiche Form wie .claude/agents/
- [click] hooks/ — eine hooks.json statt Einträgen in settings.json
- [click] .mcp.json — das Plugin kann eigene MCP-Server mitbringen
- [click] Jeder Skill ist mit dem Plugin-Namen namensraumgetrennt, zwei Plugins kollidieren nie

<!-- @note: install-from-a-marketplace -->
> Tun:
> - VOLLSTÄNDIGE LÖSUNG (nur für Trainer): /plugin marketplace add anthropics/claude-plugins-community
>   dann /plugin install <ein kleines Plugin aus der Liste>@claude-community
> - Danach /plugin ausführen, um den Tab Installed zu zeigen

Sagen:
- Ein Marketplace ist nur ein Katalog — einen hinzufügen, dann per Namen installieren
- Die Install-Zusammenfassung sagt, ob ein Neustart oder /reload-plugins nötig ist
