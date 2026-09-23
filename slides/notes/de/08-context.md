<!-- @note: control-the-context -->
> Tun:
> - Hier beginnt Teil III — alle wechseln zur Referenz-CLASH: `git checkout 06-start`
> - Einmal klar sagen

Sagen:
- Nicht mehr bauen, jetzt kontrollieren
- Drei Tasks: Context, Skills, Subagents
- Jede ist eine andere Art zu entscheiden, was ins Fenster kommt

<!-- @note: eight-tools-one-constraint -->
> Tun:
> - Karte vor Gelände — die acht Zeilen von oben nach unten durchgehen
> - Die Karte stehen lassen — sie kommt bei jedem Divider wieder, mit der aktuellen Zeile hervorgehoben

Sagen:
- Die eine Randbedingung: das Context Window. Jede Zeile dieser Tabelle ist eine andere Art, zu steuern, was hineinkommt
- [click] Context: immer an, die Randbedingung, um die alles andere herumarbeitet
- [click] Skill: für wiederholbare Arbeit, die du immer wieder neu erklärst
- [click] Projektregel: für eine Konvention, die nur in einem Teil der Codebasis gilt
- [click] Subagent: für laute Arbeit, die deinen Thread verschmutzen würde
- [click] Agent-Team: wenn Worker miteinander reden müssen
- [click] Workflow: wenn der Fan-out größer ist, als ein Gespräch steuern kann
- [click] Hook: wenn eine Regel gelten muss, egal ob der Agent zustimmt oder nicht
- [click] MCP: wenn der Agent über das Repo hinaus muss

<!-- @note: context -->
> Tun:
> - Divider: Context-Zeile hervorgehoben
> - Den Moment kurz halten

Sagen:
- "Wir starten hier, weil das die Zeile ist, die immer im Spiel ist."

<!-- @note: task-06-context-and-claude-md -->
> Tun:
> - Branch: 06-start ist die Referenz-CLASH, geseedet, CLAUDE.md ist noch immer nur `@AGENTS.md`

Sagen:
- Fünf Dinge zu lernen, vier Ergebnisse — ausgehend von einer CLAUDE.md mit 11 Byte

<!-- @note: context-is-an-instrument -->
> Tun:
> - Demo: `/context` live in einer frischen Session auf der Referenz-CLASH ausführen
> - Die Zeilen laut vorlesen — nicht zusammenfassen, die Leute die echten Zahlen hören lassen
> - Docs-Link: öffnen, oben die interaktive Timeline abspielen, bis "What the timeline shows" scrollen, dann zurück zu den Folien

Sagen:
- Ab jetzt nach jeder Task auf genau diesen Befehl zurückkommen
- [click] Das Diagramm ist dasselbe Bild, das der Befehl als Text zeichnet

<!-- @note: budget-or-dumping-ground -->
> Tun:
> - Demo: beide Dateien live öffnen
> - Klar sagen
> - Den Import in der CLAUDE.md behalten, die wir schreiben

Sagen:
- Das ist der gesamte Inhalt, nichts versteckt
- Es gibt nichts zu kürzen
- Die Übung: eine gute Context-Datei aus dem Nichts schreiben, verankert in echten Regeln
- Das ist die schwierigere, nützlichere Fähigkeit
- Die meisten Repos, die du anfasst, sehen so aus: nichts, oder fast nichts
- Gut zu wissen: seit Claude Code v2.1.277 liest Claude AGENTS.md von selbst — aber nur, wenn das Repo keine CLAUDE.md hat. CLASH hat eine, also lädt weiterhin der @AGENTS.md-Import die AGENTS.md.

<!-- @note: the-shape-underneath-the-rules -->
> Tun:
> - Die Struktur zeigen, bevor eine einzige Regel geschrieben wird
> - Falls nicht alle schon Next.js kennen: "RSC page" heißt nur, dass die Page ihre Daten selbst auf dem Server holt, kein separater API-Call nötig
> - Genau diese Struktur fehlt später in deleteClash und deleteVenue — das deckt das Audit in Task 08 auf. Jetzt richtig zeigen, damit sie dann auf den ersten Blick erkennbar ist, statt einer blinden Suche

Sagen:
- Dieselbe Fünf-Boxen-Struktur steckt hinter jedem Feature in CLASH — einmal verstehen, überall wiedererkennen
- [click] Reads: Browser → Page → Helper in lib/data → Prisma → SQLite
- [click] Writes: Client → eine Server Action — sieht aus wie ein normaler Funktionsaufruf, ist aber ein öffentlicher Server-Endpoint
- [click] requireUser() plus ein Ownership-Check, dann zurück durch denselben Prisma Client — hervorgehoben, weil genau dieser Knoten in Task 08 an zwei Stellen fehlt
- [click] Die gestrichelte Linie ist kein Funktionsaufruf wie die anderen — revalidatePath markiert die Page nur als veraltet, die RSC-Page auf der Read-Seite holt sich von selbst neue Daten

<!-- @note: claude-md-from-real-rules -->
> Tun:
> - VOLLSTÄNDIGE LÖSUNG (nur für Trainer — nicht zeigen, bevor die Leute ihre eigene geschrieben haben): `workshop-artifacts/06-context-and-claude-md/CLAUDE.md` im Workshop-Repository
> - Beim Aufbauen: auf die genaue Zeile in `app/actions/clashes.ts` mit dem Ownership-Check zeigen
> - Auf dem Bildschirm zeigen: `if (clash.creatorId !== user.id)`
> - Wenn ein Entwurf vor allem aus Prosa und Bauchgefühl besteht, dagegenhalten
> - Das ist die Saat für Task 13

Sagen:
- Die sechs Regeln:
  - Reads in `lib/data/*`
  - Writes in `app/actions/*`, und jede Action prüft die Autorisierung selbst noch einmal (eine Server Action ist ein öffentlicher POST-Endpoint mit einer generierten id; der Layout-Guard schützt die Page, nicht die Action)
  - `lib/validation.ts` ist der einzige Ort für Zod-Schemas
  - Prisma-Client wird nach `lib/generated/prisma` generiert
  - Status-Felder sind Strings mit Werten in `lib/constants.ts`
  - Next-16-`params` und -`searchParams` sind Promises
- "Könnte ein Hook das erzwingen? Wenn nicht, ist es eine Regel oder eine Präferenz?"

<!-- @note: plan-mode-review-first -->
> Tun:
> - Demo: live in den Plan Mode wechseln (Shift+Tab, bis plan dasteht)
> - Das nächste Feature beschreiben
> - Den Plan gemeinsam laut lesen
> - Unter `docs/plans/realtime-notifications.md` speichern
> - Docs-Link: öffnen, bis "Analyze before you edit with plan mode" scrollen, dann zurück zu den Folien

Sagen:
- Echtzeit-Benachrichtigungen — laden aktuell beim Rendern über `getNotifications` und `getUnreadCount` in `lib/data/notifications.ts`
- "Don't write any code yet. Propose an approach and the files it touches."
- Plan Mode ist unter den Permission Modes dokumentiert

<!-- @note: a-reviewed-plan-is-not-a-guarantee -->
> Tun:
> - Als echte Geschichte erzählen, locker im Ton — der Punkt dahinter ist ernst
> - Landen auf: jede Zeile lesen, nicht nur nach dem erwarteten Feature suchen

Sagen:
- Ein Kollege bat Claude einmal, eine BCC zu seinem eigenen E-Mail-Versand-Self-Service-Tool hinzuzufügen
- Der Plan schlug auch vor, die GDPR- und Privacy-Seiten umzuschreiben — mit einer Warnung, dass er die privaten E-Mails aller mitliest
- Offensichtlich Unsinn — aber genau so stand es im Plan
- Zum Glück hat er den Plan ganz gelesen und es vor dem Ausrollen abgefangen

<!-- @note: skill-doctor-what-it-costs -->
> Tun:
> - Auf diesem Branch schon kopiert — .claude/skills/ enthält acht der neun .agents/skills/-Ordner; agent-browser bleibt persönlich (Task 01)
> - Demo: `/skill-doctor` live ausführen
> - Die beiden Ordner nebeneinander zeigen — die Überlappung ist auf den ersten Blick klar

Sagen:
- Claude Code liest .claude/skills/ auf Projektebene — dieser Referenz-Build kopiert acht der neun .agents/skills/-Ordner hinein; agent-browser ist schon ein persönlicher Skill aus Task 01
- Ungenutzte Skills kosten dich jede Session — aber nur ihre kurze Beschreibung lädt, nicht der ~100-KB-Body. Der Body lädt, wenn der Skill benutzt wird
- Nicht in einer aufgeblähten CLAUDE.md (die gibt es nicht) — sondern in `.agents/skills/react-best-practices` und `.agents/skills/vercel-react-best-practices`
- Zwei echte, fast identische Regelwerke, je etwa 100 KB

<!-- @note: claude-md-files-add-up-they-don-t-compete -->
> Tun:
> - Docs-Link: öffnen, bis "How CLAUDE.md files load" scrollen, dann zurück zu den Folien

Sagen:
- [click] ~/.claude/CLAUDE.md — deine persönlichen Instruktionen, jedes Projekt
- [click] CLAUDE.md im Repo-Root — wird zuerst gelesen, am nächsten zum Start
- [click] CLAUDE.local.md — gitignored, direkt nach CLAUDE.md auf derselben Ebene angehängt
- [click] Das CLAUDE.md eines Unterordners lädt, wenn Claude dort eine Datei liest — zuletzt gelesen, am nächsten an der Arbeit
- [click] .claude/rules/*.md lädt genauso, on demand
- [click] Alles landet in einem Context — nichts wird verworfen, nichts wird ausgewählt
- [click] Zwei Dateien widersprechen sich? Claude wählt eine. Das ist ein Bug, den du gebaut hast, kein Feature

<!-- @note: rules-can-load-only-for-matching-files -->
Sagen:
- Eine Regel ohne paths:-Feld lädt in jeder Session, wie ein zusätzliches CLAUDE.md
- [click] ~/.claude/rules/ — deine eigenen, jedes Projekt, für Dinge, die nicht Sache dieses Repos sind
- Einen gemeinsamen Rules-Ordner in mehrere Repos symlinken, um eine Kopie synchron zu halten

<!-- @note: references-beat-grep-and-guess -->
> Tun:
> - Klar sagen

Sagen:
- Links (unachtsam), ein Schritt pro Klick:
  - [click] grep -r "notif" app/
  - [click] 40 Dateien lesen
  - [click] das Notification-Modell raten
  - [click] die Server-Action-Form raten
  - [click] Code schreiben, hoffen, dass er kompiliert
  - [click] Context-Balken: ~85 % verbraucht
- Rechts (gezielt), ein Schritt pro Klick:
  - [click] @lib/data/notifications.ts
  - [click] @app/actions/clashes.ts
  - [click] @prisma/schema.prisma
  - [click] Plan Mode: erst prüfen, bevor sich ein Byte bewegt
  - [click] Context-Balken: ~18 % verbraucht
- Der Unterschied zwischen den beiden Spalten ist kein schlaueres Modell — es ist dasselbe Modell, gezielt eingesetzt

<!-- @note: context-and-claude-md -->
> Tun:
> - Task-Folie: Reset-Branch nennen und wo die Task-Datei liegt
> - Alles hier stammt aus `tasks/06-context-and-claude-md.md`
> - Die Checkliste nicht anders umformulieren
