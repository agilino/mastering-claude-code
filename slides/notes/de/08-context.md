<!-- @note: control-the-context -->
> Tun:
> - Hier beginnt Teil III — alle wechseln zur Referenz-CLASH: `git checkout 06-start`
> - Einmal klar sagen

Sagen:
- Nicht mehr bauen, jetzt kontrollieren
- Drei Tasks: Context, Skills, Subagents
- Jede ist eine andere Art zu entscheiden, was ins Fenster kommt

<!-- @note: seven-tools-one-constraint -->
> Tun:
> - Karte vor Gelände — die sieben Zeilen von oben nach unten durchgehen
> - Die Karte stehen lassen — sie kommt bei jedem Divider wieder, mit der aktuellen Zeile hervorgehoben

Sagen:
- [click] Context: immer an, die Randbedingung, um die alles andere herumarbeitet
- [click] Skill: für wiederholbare Arbeit, die du immer wieder neu erklärst
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

<!-- @note: context-is-an-instrument -->
> Tun:
> - Demo: `/context` live in einer frischen Session auf der Referenz-CLASH ausführen
> - Die Zeilen laut vorlesen — nicht zusammenfassen, die Leute die echten Zahlen hören lassen

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
> - Task 08 verbringt viel Zeit damit, dass dieser Knoten an zwei Stellen fehlt — jetzt pflanzen

Sagen:
- [click] Reads: Browser → Page → Helper in lib/data → Prisma → SQLite
- [click] Writes: Client → Server Action in app/actions → requireUser() plus ein Ownership-Check → Prisma → revalidatePath zurück zur Page
- [click] Auf den Auth-Check-Knoten zeigen — absichtlich hervorgehoben

<!-- @note: claude-md-from-real-rules -->
> Tun:
> - VOLLSTÄNDIGE LÖSUNG (nur für Trainer — nicht zeigen, bevor die Leute ihre eigene geschrieben haben): `workshop-artifacts/06-context-and-claude-md/CLAUDE.md` im Workshop-Repository
> - Beim Aufbauen: auf die genaue Zeile in `app/actions/clashes.ts` mit dem Ownership-Check zeigen
> - Auf dem Bildschirm zeigen: `if (clash.creatorId !== user.id)`
> - Wenn ein Entwurf vor allem aus Prosa und Bauchgefühl besteht, dagegenhalten
> - Das ist die Saat für Task 10

Sagen:
- Die sechs Regeln:
  - Reads in `lib/data/*`
  - Writes in `app/actions/*`, und jede Action prüft die Autorisierung selbst noch einmal (eine Server Action ist ein öffentlicher POST-Endpoint mit einer generierten id; der Layout-Guard schützt die Page, nicht die Action)
  - `lib/validation.ts` ist der einzige Ort für Zod-Schemas
  - Prisma-Client wird nach `lib/generated/prisma` generiert
  - Status-Felder sind Strings mit Werten in `lib/constants.ts`
  - Next-16-`params` und -`searchParams` sind Promises
- "Könnte ein Hook das erzwingen? Wenn nicht, ist es eine Regel oder eine Präferenz?"

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

<!-- @note: plan-mode-review-first -->
> Tun:
> - Demo: live in den Plan Mode wechseln (Shift+Tab, bis plan dasteht)
> - Das nächste Feature beschreiben
> - Den Plan gemeinsam laut lesen
> - Unter `docs/plans/realtime-notifications.md` speichern

Sagen:
- Echtzeit-Benachrichtigungen — laden aktuell beim Rendern über `getNotifications` und `getUnreadCount` in `lib/data/notifications.ts`
- "Don't write any code yet. Propose an approach and the files it touches."
- Plan Mode ist unter den Permission Modes dokumentiert

<!-- @note: skill-doctor-what-it-costs -->
> Tun:
> - Demo: `/skill-doctor` live ausführen
> - Die beiden Ordner nebeneinander zeigen — die Überlappung ist auf den ersten Blick klar

Sagen:
- Ungenutzte Skills kosten dich jede Session — aber nur ihre kurze Beschreibung lädt, nicht der ~100-KB-Body. Der Body lädt, wenn der Skill benutzt wird
- Nicht in einer aufgeblähten CLAUDE.md (die gibt es nicht) — sondern in `.agents/skills/react-best-practices` und `.agents/skills/vercel-react-best-practices`
- Zwei echte, fast identische Regelwerke, je etwa 100 KB

<!-- @note: context-and-claude-md -->
> Tun:
> - Task-Folie: Reset-Branch nennen und wo die Task-Datei liegt
> - Alles hier stammt aus `tasks/06-context-and-claude-md.md`
> - Die Checkliste nicht anders umformulieren
