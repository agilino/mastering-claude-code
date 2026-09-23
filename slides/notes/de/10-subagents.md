<!-- @note: subagents -->
> Tun:
> - Divider, Subagent-Zeile
> - Klar sagen

Sagen:
- Ein Problem, drei Strategien: ein Subagent, ein Agent-Team, ein Dynamic Workflow
- Diese Task läuft mit der ersten — ein einzelner Subagent, der allein auditiert
- Task 12 läuft mit den anderen beiden, Agent-Team und Dynamic Workflow, am exakt gleichen Problem

<!-- @note: task-08-subagent-audit -->
> Tun:
> - Branch: 08-start ist das Referenz-CLASH plus Task 06 und 07, mit einem eingebauten Bug

Sagen:
- Ein Subagent, ein enges Briefing — dein eigener Context bewegt sich kaum, während er die laute Leserei übernimmt

<!-- @note: page-guard-action-guard -->
> Tun:
> - Nicht überspringen: viele starke React-Devs kennen das nicht — wenn es nicht sitzt, besteht der Rest des Teils aus Leuten, die Agents beim Auditieren einer Gefahr zuschauen, die sie nicht verstehen.
> - Die echte Datei öffnen: requireUser() zeigen, wie es die Seite schützt.
> - app/actions/clashes.ts öffnen. Direkt fragen

Sagen:
- Prüft die Action selbst die Auth? Nein.
- Eine Server Action wird zu einem öffentlichen POST-Endpoint mit einer generierten id kompiliert — wer einen Session-Cookie hat, kann jede Action direkt aufrufen, mit beliebigen Argumenten, ohne die Seite zu laden.
- Autorisierung muss innerhalb jeder Action neu hergestellt werden.
- Zod prüft die Form, nicht die Berechtigung.

<!-- @note: the-attack-surface -->
> Tun:
> - Die zentrale Grafik.

Sagen:
- [click] Links: der sicher aussehende Weg — Browser → geschützte Seite → requireUser() → Button → Action.
- [click] Rechts: der Bypass — ein direkter POST auf die generierte id der Action, der in derselben Server Action landet, ohne je die geschützte Seite geladen zu haben.
- [click:4] "Zod validiert die Form, nicht die Berechtigung."

<!-- @note: find-it -->
> Tun:
> - Die Korrektur aus Sagen laut sagen, bevor irgendjemand zu auditieren anfängt — sonst denken alle, sie finden gleich einen echten Bug im öffentlichen CLASH
> - Der Fehler existiert nur auf 08-start, absichtlich eingebaut: Ownership-Check entfernt aus deleteClash (app/actions/clashes.ts) und deleteVenue (app/actions/venues.ts). Workshop-Inhalt, kein CLASH-Bug.
> - Musterlösung: workshop-artifacts/12-team-and-workflow-audit/AUTH-FIX.md.
> - Jetzt nicht verraten: npm run lint auf 08-start meldet eine unbenutzte `user`-Variable in deleteVenue — der Guard, der sie benutzt hat, ist weg. Das ist das eigene "Go further" der Task — nur damit du weißt, dass es stimmt, nicht zum Sagen hier

Sagen:
- Der öffentliche CLASH-main-Branch hat KEINE fehlenden Checks — alle 18 exportierten Actions sind geschützt.
- Grüne Gates heißen nicht, dass der Code sicher ist.

<!-- @note: the-auditor-subagent -->
> Tun:
> - Referenz zum Live-Aufbauen — der genaue Body steht in tasks/08-subagent-audit.md Schritt 5

Sagen:
- Die tools:-Zeile zählt — nur Read, Grep, Glob.
- Dieser Agent liest und berichtet; er fixt nicht.
- Tools einzuschränken ist selbst eine Kontrolle — und sie gilt nur für einen frischen Subagent. Ein Fork ignoriert eine tools:-Zeile.
- Kontrast zu einem vagen "find security bugs": eine falsifizierbare Eigenschaft macht den Bericht überprüfbar, nicht eine Wand aus Prosa.

<!-- @note: agent-subagent-fork-which-is-which -->
> Tun:
> - Die drei Wörter einmal langsam sagen — der Rest des Teils hängt daran
> - Demo in Task-Schritt 6: den security-auditor laufen lassen, dann auf das Panel unter dem Prompt zeigen — eine Zeile erscheint, eingerückt unter main
> - Noch einmal mit /subtask in Task-Schritt 9: eine zweite Zeile, diesmal ein Fork
> - Klar sagen, dass die farbigen Beschriftungen auf der Folie von uns sind (schematisch) — das echte Panel zeigt die Zeilen, nicht unsere Labels

Sagen:
- Ein Agent ist eine laufende Schleife. Deine eigene Session ist auch einer: die oberste Zeile, main.
- Ein Subagent ist eine Schleife, die main mit dem Agent-Tool startet. Er bekommt ein eigenes Context-Fenster.
- Ein Fork ist ein Subagent, der als Kopie deines Gesprächs startet und deshalb schon alles weiß, was du gesagt hast.
- [click] Ein Subagent aus einer Definitionsdatei: frischer Context, und nur die Tools, die seine tools:-Zeile erlaubt. Unser security-auditor, Explore und jeder Agent, den ein Plugin mitbringt, funktionieren so.
- [click] Ein Fork: derselbe System-Prompt, dieselben Tools, dieselbe Historie. Eine tools:-Zeile gilt für ihn nicht.
- [click] Ein Skill bekommt normalerweise keine Zeile. Er ist Anleitung, die in das Gespräch geladen wird, das ihn ausführt. Die Ausnahme ist ein Skill, der context: fork setzt: der läuft als Subagent, mit eigener Zeile. Der discover-Skill aus Task 09 setzt dieses Feld nicht, bleibt also in main und kann mit dir reden.
- Die eingerückten Zeilen unter dem Prompt sind die Subagents und Forks, die main gestartet hat, sonst nichts. /tasks listet dieselben Zeilen.

<!-- @note: two-ways-to-isolate -->
> Tun:
> - Docs-Link: öffnen, bis "Fork the current conversation" scrollen, dann zurück zu den Folien

Sagen:
- [click] Links: das eigene Fenster des Subagents füllt sich mit lauten Tool-Calls — nur eine dünne Zusammenfassung kommt zurück, deshalb bewegt sich der Hauptthread kaum.
- [click:3] Rechts: Fork vs. Fresh.
- Ein Fork zweigt vom Parent ab, erbt das ganze Gespräch und den Prompt-Cache des Parents — günstig, wenn der geteilte Context wirklich gebraucht wird.
- [click] Ein frischer Subagent startet kalt: keine Historie, nur die Tools, die seine Definition erlaubt, kein geteilter Cache — der erste Call kostet mehr.
- Der Fork-Modus ist in interaktiven Sessions standardmäßig an, unter -p und im Agent SDK aus. An heißt: Claude darf einen Fork wählen, wenn es keinen Agent nennt. Ein benannter Agent aus einer Definitionsdatei, wie security-auditor, bleibt ein frischer Subagent.
- Einen Fork startest du selbst mit /subtask und der Aufgabe dahinter.
- Keins von beiden ist besser — wissen, welches du aufgerufen hast und warum.
- `/tasks` listet die Hintergrundarbeit dieser Session: laufende Subagents und Forks. Ein fertiger bleibt nur kurz in der Liste, als erledigt markiert — also reinschauen, solange er läuft oder direkt nachdem er zurückkommt.

<!-- @note: six-agents-ship-with-claude-code -->
> Tun:
> - Die Subagent-Audit-Aufgabe (08) hat einen eigenen geschrieben — diese sind schon auf der Maschine
> - Docs-Link: öffnen, bis "Built-in subagents" scrollen, dann zurück zu den Folien

Sagen:
- Die laufen ohne jede Datei in .claude/agents/ — nichts zu schreiben, nichts einzuchecken
- [click] Plan ist das, was unsichtbar läuft, jedes Mal, wenn du den Plan-Modus benutzt
- [click] general-purpose ist der Standard, an den eine Aufgabe delegiert, wenn nichts Spezifischeres passt
- [click] claude ist der Fallback des Fallbacks — jedes Tool, keine Einschränkung
- [click] statusline-setup feuert nur bei /statusline
- [click] claude-code-guide beantwortet Fragen wie "kann Claude Code X" — genau wie diese hier

<!-- @note: or-install-one-that-exists -->
> Tun:
> - Docs-Link: das README des OWASP-Repos öffnen, den Install-Abschnitt, dann zurück zu den Folien
> - Task-Schritte 11 bis 17: Marketplace hinzufügen, installieren, /clear, den Reviewer laufen lassen, mit dem eigenen Auditor vergleichen

Sagen:
- Was es ist: ein Plugin, ein installierbares Bündel. Dieses bringt 5 Subagents und 11 Skills mit. Noch einmal die Marketplace-Folie aus Task 07: den Katalog hinzufügen, dann ein Plugin per Namen installieren.
- [click] Der zweite Befehl installiert es. code-security-skills ist das Plugin, agent-security-playbook der Marketplace: plugin@marketplace.
- Nur sca-audit und dependency-auditor drehen sich um CVEs. Die Reviewer lesen Code.
- Vergleichen, keinen Sieger küren: unserer ist eng und falsifizierbar, PASS oder FAIL mit Zeile. Ihrer ist breit. Verschiedene Aufgaben.
- Ein Plugin kann Hooks und MCP-Server mitbringen und läuft auf deiner Maschine. Lies, was du installierst. Dieses ist von OWASP, aber die Gewohnheit ist der Punkt.

<!-- @note: one-subagent-or-read-it-yourself -->
> Tun:
> - Handoff: FACILITATOR.md, Rhythm for every task. Manueller Durchgang ist Schritt 4 (haben sie gesehen) — Übergabe bei Schritt 1, der Subagent startet bei Schritt 5
> - Links (unbedacht), ein Schritt pro Klick:
>   - [click] ein Prompt: alle Dateien in app/actions/ selbst lesen
>   - [click] jede Action-Datei landet im Haupt-Thread
>   - [click] der eigene /context steigt mit jeder Datei
>   - [click] eine Wand aus Prosa zurück, nichts Falsifizierbares
>   - [click] Context-Balken: ~50% verbraucht
> VOLLSTÄNDIGER PROMPT (wortwörtlich aus tasks/08-subagent-audit.md Schritt 4, nur für den Trainer, nicht von einer Teilnehmer-Maschine senden):
>
> Read every file in app/actions/ yourself, in this conversation, and report
> which exported actions are missing an ownership check before mutating an
> existing row.
> - Rechts (durchdacht), sobald sie zurück sind — ein Schritt pro Klick:
>   - [click] ein security-auditor-Subagent: Read, Grep, Glob
>   - [click] ein falsifizierbares Briefing: PASS oder FAIL, mit Zeile
>   - [click] die Reads passieren in seinem Fenster, nicht in deinem
>   - [click] der eigene /context bewegt sich kaum
>   - [click] Context-Balken: ~5% verbraucht

Sagen:
- Gleiches Audit, gleiche zwei Bugs. Der Unterschied: wessen Context-Fenster sich füllt

<!-- @note: subagent-audit -->
> Tun:
> - Den /context-Stand vor dem Start notieren.
> - Einen Subagent mit dem engen Briefing starten; ihn jede Datei in app/actions/ lesen lassen.
> - /context noch einmal lesen
> - Schritte 9 und 10: dasselbe Audit als Fork mit /subtask
> - Schritte 11 bis 17: das OWASP-Plugin, /clear, dann seinen Bericht mit dem des eigenen Auditors vergleichen
> - Der Teil endet mit einem Cliffhanger: zwei Findings, noch nicht behoben.

Sagen:
- Es hat sich nur leicht bewegt — das IST der Punkt.
- Teil IV behebt sie.
