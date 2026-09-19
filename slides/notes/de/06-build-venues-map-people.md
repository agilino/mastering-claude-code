<!-- @note: do-it-like-x -->
- Venues-Prompt in Task 04 ist ein Drittel des Clashes-Prompts — das Muster liegt schon im Repo, also kannst du einfach darauf zeigen
- Sagen: der günstigste Weg zu Konsistenz
- Nächste Folie zeigen: dreimal auf dasselbe Muster zeigen → einmal aufschreiben

<!-- @note: your-first-slash-command -->
VOLLSTÄNDIGE DATEI (wörtlich aus tasks/04-venues-map-people.md):

Add a new page to this app for: $ARGUMENTS
Follow these rules:
- reads in lib/data/, writes in app/actions/ with requireUser() and an ownership check
- Zod schemas in lib/validation.ts
- shadcn components, existing layout, existing card style
- run npx tsc --noEmit at the end

- Sagen: eine Datei in .claude/commands/ wird zu einem Slash-Command
- $ARGUMENTS ist das, was du danach eintippst
- Das ist die kleine Version eines Skills — Teil III macht sie größer

<!-- @note: let-claude-read-the-error -->
- Die Leaflet-Karte geht fast immer einmal kaputt ("window is not defined" beim Server-Rendering) — gut so, nutzen
- Demo: die drei Wege, Claude die Evidenz zu geben — Terminal lesen lassen, Fehlertext einfügen, Screenshot mit Ctrl+V einfügen
- Sagen: je genauer die Evidenz, desto kleiner der Fix
- Den Bug nicht in eigenen Worten beschreiben, wenn du ihn zeigen kannst

<!-- @note: let-claude-look-at-the-page -->
- [click] Demo: Claude bitten, mit agent-browser die Karte zu öffnen, sich als Anna einzuloggen, einen Screenshot zu machen und zu sagen, ob Pins sichtbar sind
- Die Befehle zeigen, die es ausführt
- [click:4] Schließt eine Schleife, die die meisten offenlassen: Claude ändert den Code UND Claude prüft das Ergebnis
- Teil IV macht dasselbe mit Playwright MCP und Chrome DevTools MCP

<!-- @note: quality-gates-said-once -->
- Live den Abschnitt "Quality gates" zu CLAUDE.md hinzufügen und die drei Befehle ausführen
- Ab jetzt führt Claude sie am Ende jeder Task aus — hier, weil du es gerade gesagt hast, in jeder neuen Session, weil CLAUDE.md zu Beginn geladen wird
- Achten auf: eine Änderung an CLAUDE.md mitten in der Session wird erst nach /clear, /compact oder einem Neustart neu geladen
- Sagen: das ist eine Regel in einer Datei — Claude folgt ihr meistens
- Teil IV zeigt, wie man daraus eine Regel macht, die Claude nicht überspringen kann

<!-- @note: venues-map-people -->
- Task-04-Rückblick
- Reset-Branches: 04-start = Auth, Shell, Clashes; 05-start fügt Venues, Karte, Teilnahme und Benachrichtigungen hinzu
- Beim Karten-Schritt bleiben die Leute hängen — daran erinnern: Claude den Fehler geben, nicht von Hand fixen
- Join-Flow braucht zwei Browser: einer als Anna, einer als Lukas
