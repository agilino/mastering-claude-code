<!-- @note: task-04-venues-map-people -->
> Tun:
> - Branch: 04-start hat schon Auth, Shell und Clashes

Sagen:
- Vier Dinge zu lernen, vier Dinge zu bauen — Venues folgen genau dem Muster, das du schon kennst

<!-- @note: do-it-like-x -->
> Tun:
> - Dreimal auf dasselbe Muster zeigen, dann einmal aufschreiben
> - Schritt 3 machen die Teilnehmenden selbst

Sagen:
- Venues-Prompt in Task 04 ist ein Drittel des Clashes-Prompts — das Muster liegt schon im Repo, also kannst du einfach darauf zeigen
- Der günstigste Weg zu Konsistenz

<!-- @note: your-first-slash-command -->
> Tun:
> - Kurz erwähnen: Commands sind in Skills aufgegangen — diese Datei funktioniert weiterhin, Task 07 zeigt den bevorzugten Weg, einen zu schreiben
> - Schritt 4 machen die Teilnehmenden selbst
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
> - Schritte 6 und 8 machen die Teilnehmenden selbst
> - Die Leaflet-Karte geht fast immer einmal kaputt ("window is not defined" beim Server-Rendering) — gut so, nutzen
> - Demo: die drei Wege, Claude die Evidenz zu geben — Terminal lesen lassen, Fehlertext einfügen, Screenshot mit Ctrl+V einfügen

Sagen:
- Je genauer die Evidenz, desto kleiner der Fix
- Den Bug nicht in eigenen Worten beschreiben, wenn du ihn zeigen kannst

<!-- @note: let-claude-look-at-the-page -->
> Tun:
> - Schritt 7 machen die Teilnehmenden selbst
> - [click] Demo: Claude bitten, mit agent-browser die Karte zu öffnen, sich als Anna einzuloggen, einen Screenshot zu machen und zu sagen, ob Pins sichtbar sind
> - Die Befehle zeigen, die es ausführt

Sagen:
- [click:4] Schließt eine Schleife, die die meisten offenlassen: Claude ändert den Code UND Claude prüft das Ergebnis
- Teil IV macht dasselbe mit Playwright MCP und Chrome DevTools MCP

<!-- @note: one-big-ask-or-four-small-ones -->
> Tun:
> - Übergabe: FACILITATOR.md, Rhythm for every task. Big Ask ist Schritt 2 (haben sie gesehen) — Übergabe bei Schritt 1, kleine Schritte ab 3
> - Links (unachtsam), ein Schritt pro Klick:
>   - [click] Venues, Karte, Teilnahme, Benachrichtigungen — eine Message
>   - [click] Claude fasst 40+ Dateien an, bevor du irgendetwas prüfen kannst
>   - [click] nichts zum Anklicken, bis alles gelandet ist
>   - [click] eine falsche Vermutung früh ist falsch für alles danach
>   - [click] Context-Balken: ~80 % verbraucht — HIER STEHEN BLEIBEN, zur Task-Datei wechseln
> VOLLSTÄNDIGER PROMPT (wörtlich aus tasks/04-venues-map-people.md, nur für Trainer, nicht von einer Teilnehmer-Maschine senden):
>
> Build venues exactly like clashes, a full-screen map of Berlin with pins for
> clashes and venues and click-to-create, join/leave/accept/reject for clashes
> with a People panel on the clash detail page, and notifications with a bell
> that shows unread requests in the top bar. Follow the existing patterns in
> the app everywhere they apply.
> - Rechts (gezielt), wenn sie zurück sind — ein Schritt pro Klick:
>   - [click] Venues — wie bei den Clashes
>   - [click] die Karte — ein gezielter Auftrag, erst die Docs
>   - [click] Teilnahme — beitreten, verlassen, annehmen, ablehnen
>   - [click] Benachrichtigungen — die Glocke, zuletzt
>   - [click] Context-Balken: ~20 % verbraucht

Sagen:
- Dieselben vier Features so oder so. Der Unterschied ist, ob jedes davon mit etwas Prüfbarem endet

<!-- @note: venues-map-people -->
> Tun:
> - Task-04-Rückblick — bleibt auf dem Bildschirm, während gearbeitet wird
> - Übergabe an tasks/04-venues-map-people.md bei Schritt 1, alle 12 Schritte — Schritt 2 überspringen, haben sie gesehen — eine Folie übrig, wenn sie zurück sind
> - Beim Karten-Schritt bleiben die Leute hängen — daran erinnern
> - Join-Flow braucht zwei Browser: einer als Anna, einer als Lukas

Sagen:
- Reset-Branches: 04-start = Auth, Shell, Clashes; 05-start fügt Venues, Karte, Teilnahme und Benachrichtigungen hinzu
- Claude den Fehler geben, nicht von Hand fixen

<!-- @note: quality-gates-said-once -->
> Tun:
> - Jetzt, wo sie den Nutzen gespürt haben: fragen, was kaputtgegangen ist oder was sie von Hand nachprüfen mussten
> - Live den Abschnitt "Quality gates" zu CLAUDE.md hinzufügen und die drei Befehle ausführen
> - Achten auf: eine Änderung an CLAUDE.md mitten in der Session wird erst nach /clear, /compact oder einem Neustart neu geladen

Sagen:
- Ihr habt gerade vier Features ausgeliefert, ohne dass bis jetzt irgendetwas eure Arbeit geprüft hat — genau diese Lücke schließt das
- Ab jetzt führt Claude sie am Ende jeder Task aus — hier, weil du es gerade gesagt hast, in jeder neuen Session, weil CLAUDE.md zu Beginn geladen wird
- Das ist eine Regel in einer Datei — Claude folgt ihr meistens
- Teil IV zeigt, wie man daraus eine Regel macht, die Claude nicht überspringen kann
