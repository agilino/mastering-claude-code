<!-- @note: settings-override-each-other -->
> Tun:
> - Docs-Link: öffnen, bis "Settings precedence" scrollen, dann zurück zu den Folien

Sagen:
- Fünf Orte halten Einstellungen. Für einen Schlüssel gewinnt nur einer davon
- [click] Managed — deine Organisation stellt es bereit, nichts überschreibt es
- [click] Command line — `claude --settings`, nur für eine Session
- [click] Project local — `.claude/settings.local.json`, deine eigene, nie committet
- [click] Shared project — `.claude/settings.json`, committet, das ganze Team bekommt es
- [click] User — `~/.claude/settings.json`, jedes Projekt auf deiner Maschine

<!-- @note: the-sandbox-limits-what-a-command-touches -->
> Tun:
> - Bei Zeit live `/sandbox` ausführen — die Tabs Mode und Config zeigen
> - Docs-Link: öffnen, bis "How sandboxing works" scrollen, dann zurück zu den Folien

Sagen:
- Ein sandboxed Bash-Befehl läuft trotzdem — das Betriebssystem erzwingt die Grenze, kein Prompt
- [click] Dateisystem: Schreibzugriff bleibt im Projekt. Lesezugriff ist weit, minus was du verbietest
- Netzwerk: nichts ist erreichbar, bis du einen Host einmal erlaubst — danach wird er gemerkt
- Windows hat keine native Sandbox — Claude Code in WSL2 laufen lassen, um eine zu bekommen

<!-- @note: your-org-can-lock-settings-down -->
Sagen:
- `managed-settings.json`, MDM, oder die claude.ai-Konsole — ein Admin stellt es bereit, nicht du
- Es steht über jeder anderen Datei. Nichts, was du setzt, überschreibt es
- `/status` nennt die aktive Managed-Quelle, du weißt also immer, was gilt
