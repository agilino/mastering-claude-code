<!-- @note: subagents -->
- Divider, Subagent-Zeile.
- Strategie eins von drei für ein Problem.
- Klar sagen: "ein Problem, drei Strategien. Jetzt die erste. Im nächsten Teil die anderen beiden."

<!-- @note: page-guard-action-guard -->
- Nicht überspringen: viele starke React-Devs kennen das nicht — wenn es nicht sitzt, besteht der Rest des Teils aus Leuten, die Agents beim Auditieren einer Gefahr zuschauen, die sie nicht verstehen.
- Die echte Datei öffnen: requireUser() zeigen, wie es die Seite schützt.
- app/actions/clashes.ts öffnen. Direkt fragen: prüft die Action selbst die Auth? Nein.
- Eine Server Action wird zu einem öffentlichen POST-Endpoint mit einer generierten id kompiliert — wer einen Session-Cookie hat, kann jede Action direkt aufrufen, mit beliebigen Argumenten, ohne die Seite zu laden.
- Autorisierung muss innerhalb jeder Action neu hergestellt werden.
- Zod prüft die Form, nicht die Berechtigung.

<!-- @note: the-attack-surface -->
- Die zentrale Grafik.
- [click] Links: der sicher aussehende Weg — Browser → geschützte Seite → requireUser() → Button → Action.
- [click] Rechts: der Bypass — ein direkter POST auf die generierte id der Action, der in derselben Server Action landet, ohne je die geschützte Seite geladen zu haben.
- [click:4] Schluss mit: "Zod validiert die Form, nicht die Berechtigung."

<!-- @note: find-it -->
- Die Korrektur laut sagen, bevor jemand anfängt: der öffentliche CLASH-main-Branch hat KEINE fehlenden Checks — alle 18 exportierten Actions sind geschützt.
- Der Fehler ist auf 08-start eingebaut: Ownership-Check entfernt aus deleteClash (app/actions/clashes.ts) und deleteVenue (app/actions/venues.ts).
- Workshop-Inhalt, kein CLASH-Bug.
- Musterlösung: workshop-artifacts/09-team-and-workflow-audit/AUTH-FIX.md.
- Indiz für einen scharfen Auditor: npm run lint auf 08-start meldet eine unbenutzte `user`-Variable in deleteVenue — der Guard, der sie benutzt hat, ist weg.
- Grüne Gates heißen nicht, dass der Code sicher ist.

<!-- @note: the-auditor-subagent -->
- VOLLSTÄNDIGE LÖSUNG (nur für Trainer): der Body steht in tasks/08-subagent-audit.md Schritt 4.
- Talking Point: die tools:-Zeile zählt — nur Read, Grep, Glob.
- Dieser Agent liest und berichtet; er fixt nicht.
- Tools einzuschränken ist selbst eine Kontrolle.
- Kontrast zu einem vagen "find security bugs": eine falsifizierbare Eigenschaft macht den Bericht überprüfbar, nicht eine Wand aus Prosa.

<!-- @note: two-ways-to-isolate -->
- [click] Links: das eigene Fenster des Subagents füllt sich mit lauten Tool-Calls — nur eine dünne Zusammenfassung kommt zurück, deshalb bewegt sich der Hauptthread kaum.
- [click:3] Rechts: Fork vs. Fresh.
- Ein Fork zweigt vom Parent ab, erbt das ganze Gespräch und den Prompt-Cache des Parents — günstig, wenn der geteilte Context wirklich gebraucht wird.
- [click] Ein frischer Subagent startet kalt: keine Historie, gefilterte Tools, kein Cache — der erste Call kostet mehr.
- Fork ist in interaktiven Sessions standardmäßig an, unter -p und im Agent SDK aus.
- Keins von beiden ist besser — wissen, welches du aufgerufen hast und warum.

<!-- @note: subagent-audit -->
- Den /context-Stand vor dem Start notieren.
- Einen Subagent mit dem engen Briefing starten; ihn jede Datei in app/actions/ lesen lassen.
- /context noch einmal lesen: es hat sich nur leicht bewegt — das IST der Punkt.
- Der Teil endet mit einem Cliffhanger: zwei Findings, noch nicht behoben.
- Teil IV behebt sie.
