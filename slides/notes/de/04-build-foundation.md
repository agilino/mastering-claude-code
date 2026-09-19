<!-- @note: build-clash -->
- Divider für Teil II.
- Sagen: "Ab jetzt baust du. Ich zeige einen Schritt, du machst ihn auf deiner
Maschine. Die Spec ist docs/SPEC.md. Claude schreibt den Code. Du entscheidest, was gut ist."
- Auf die vier Module dieses Teils zeigen.
- Jedes ist eine Task; jede Task hat einen Reset-Branch.

<!-- @note: a-brief-has-three-parts -->
- Ein Prompt ist ein Wunsch; ein Briefing ist ein Vertrag.
- [click] Die drei Teile am echten Scaffold-Briefing aus Task 02 zeigen.
- [click:3] Kernpunkt: die "done when"-Zeile ist die, die Leute vergessen — genau sie hält Claude davon ab, abzuschweifen.
- Kontrastieren mit dem kalten Prompt "set up a Next.js app": funktioniert auch, aber niemand — weder du noch Claude — weiß, wann es fertig ist.

<!-- @note: plan-mode-read-think-propose -->
- Live demonstrieren: Shift+Tab, bis die Statusleiste "plan mode on" zeigt (zweimal ab Manual-Modus, dreimal ab Auto — Pro/Max/Team-Sessions starten im Auto-Modus).
- Den Datenmodell-Prompt aus Task 02 schicken, den Plan erscheinen lassen.
- Einen Teil davon laut vorlesen, der Gruppe eine Frage stellen ("warum lib/generated/prisma?").
- Zurückschalten und "do it" sagen.
- [click] Punkt: das Datenmodell ist später schwer zu ändern — das ist der Moment, hinzuschauen, bevor Claude schreibt.

<!-- @note: read-the-diff-not-the-summary -->
- Gewohnheit früh aufbauen: nach jedem Schritt in die Dateien schauen.
- Claudes Zusammenfassung liegt meistens richtig — der Diff liegt immer richtig.
- git status nach dem Scaffold zeigen.
- Claude bitten zu committen, die Commit-Message lesen, die Claude geschrieben hat.
- Das ist eine gute erste Stelle, um Claude eine Routineaufgabe übernehmen zu lassen.

<!-- @note: plan-the-data-model -->
- VOLLSTÄNDIGER PROMPT (wörtlich aus tasks/02-foundation.md):

Read @docs/SPEC.md, section "Data". Plan a Prisma 7 schema for SQLite using the
better-sqlite3 adapter. Five models. Status and type fields are strings, not enums.
Generate the client into lib/generated/prisma. Also plan a seed with 8 users
(password "test", hashed with bcryptjs), 8 venues and 8 clashes in Berlin,
some past, some upcoming. Show the plan, do not write files.

- Die Regeln live eintippen, eine nach der anderen — sagen, warum es jede gibt:
  - SQLite hat keine Enums
  - der generierte Client-Pfad hält den Import stabil
  - der Seed ist das, womit sich jede spätere Task einloggt

<!-- @note: foundation -->
- Task-02-Rückblick.
- Reset-Branch nennen und wo die Task-Datei liegt: 02-start ist die Spec plus eine erste CLAUDE.md; 03-start ist der Landepunkt, falls diese Task schiefgeht.
- Durch die Gruppe gehen, während gearbeitet wird.
- Häufigster Stolperstein: create-next-app stellt interaktive Fragen — die Flags im Briefing vermeiden die meisten davon.
- Sagen: "antworte bei allem, wo du dir nicht sicher bist, mit Ja."
