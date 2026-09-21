<!-- @note: do-it-like-x -->
> Tun:
> - tasks/04-venues-map-people.md Schritt 2, dann zurück zu den Folien
> - Nächste Folie zeigen: dreimal auf dasselbe Muster zeigen → einmal aufschreiben

Sagen:
- Venues-Prompt in Task 04 ist ein Drittel des Clashes-Prompts — das Muster liegt schon im Repo, also kannst du einfach darauf zeigen
- Der günstigste Weg zu Konsistenz

<!-- @note: your-first-slash-command -->
> Tun:
> - Kurz erwähnen: Commands sind in Skills aufgegangen — diese Datei funktioniert weiterhin, Task 07 zeigt den bevorzugten Weg, einen zu schreiben
> - tasks/04-venues-map-people.md Schritt 3, dann zurück zu den Folien
> VOLLSTÄNDIGE DATEI (wörtlich aus tasks/04-venues-map-people.md):
>
> Add a new page to this app for: $ARGUMENTS
> Follow these rules:
>   - reads in lib/data/, writes in app/actions/ with requireUser() and an ownership check
>   - Zod schemas in lib/validation.ts
>   - shadcn components, existing layout, existing card style
>   - run npx tsc --noEmit at the end

Sagen:
- Eine Datei in .claude/commands/ wird zu einem Slash-Command
- $ARGUMENTS ist das, was du danach eintippst
- Das ist die kleine Version eines Skills — Teil III macht sie größer

<!-- @note: let-claude-read-the-error -->
> Tun:
> - tasks/04-venues-map-people.md Schritte 5 und 7, dann zurück zu den Folien
> - Die Leaflet-Karte geht fast immer einmal kaputt ("window is not defined" beim Server-Rendering) — gut so, nutzen
> - Demo: die drei Wege, Claude die Evidenz zu geben — Terminal lesen lassen, Fehlertext einfügen, Screenshot mit Ctrl+V einfügen

Sagen:
- Je genauer die Evidenz, desto kleiner der Fix
- Den Bug nicht in eigenen Worten beschreiben, wenn du ihn zeigen kannst

<!-- @note: let-claude-look-at-the-page -->
> Tun:
> - tasks/04-venues-map-people.md Schritt 6, dann zurück zu den Folien
> - [click] Demo: Claude bitten, mit agent-browser die Karte zu öffnen, sich als Anna einzuloggen, einen Screenshot zu machen und zu sagen, ob Pins sichtbar sind
> - Die Befehle zeigen, die es ausführt

Sagen:
- [click:4] Schließt eine Schleife, die die meisten offenlassen: Claude ändert den Code UND Claude prüft das Ergebnis
- Teil IV macht dasselbe mit Playwright MCP und Chrome DevTools MCP

<!-- @note: quality-gates-said-once -->
> Tun:
> - tasks/04-venues-map-people.md Schritt 10, dann zurück zu den Folien
> - Live den Abschnitt "Quality gates" zu CLAUDE.md hinzufügen und die drei Befehle ausführen
> - Achten auf: eine Änderung an CLAUDE.md mitten in der Session wird erst nach /clear, /compact oder einem Neustart neu geladen

Sagen:
- Ab jetzt führt Claude sie am Ende jeder Task aus — hier, weil du es gerade gesagt hast, in jeder neuen Session, weil CLAUDE.md zu Beginn geladen wird
- Das ist eine Regel in einer Datei — Claude folgt ihr meistens
- Teil IV zeigt, wie man daraus eine Regel macht, die Claude nicht überspringen kann

<!-- @note: venues-map-people -->
> Tun:
> - Task-04-Rückblick
> - Übergabe an tasks/04-venues-map-people.md, alle 11 Schritte — keine Folien mehr bis Task 05
> - Beim Karten-Schritt bleiben die Leute hängen — daran erinnern
> - Join-Flow braucht zwei Browser: einer als Anna, einer als Lukas

Sagen:
- Reset-Branches: 04-start = Auth, Shell, Clashes; 05-start fügt Venues, Karte, Teilnahme und Benachrichtigungen hinzu
- Claude den Fehler geben, nicht von Hand fixen
