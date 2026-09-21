<!-- @note: build-clash -->
> Tun:
> - Divider für Teil II
> - Auf die vier Module dieses Teils zeigen

Sagen:
- "Ab jetzt baust du. Ich zeige einen Schritt, du machst ihn auf deiner
Maschine. Die Spec ist docs/SPEC.md. Claude schreibt den Code. Du entscheidest, was gut ist."
- Jedes ist eine Task; jede Task hat einen Reset-Branch

<!-- @note: a-brief-has-three-parts -->
> Tun:
> - tasks/02-foundation.md Schritte 1-2, dann zurück zu den Folien
> - Im Manual-Modus starten, die Gruppe die ersten zwei, drei Permission-Prompts sehen lassen
> - Dann zu Auto wechseln — ein Next.js-Scaffold aufzusetzen ist Standard, geringes Risiko
> - [click] Die drei Teile am echten Scaffold-Briefing aus Task 02 zeigen
> - Kontrastieren mit dem kalten Prompt "set up a Next.js app"

Sagen:
- Ein Prompt ist ein Wunsch; ein Briefing ist ein Vertrag
- [click:3] Kernpunkt: die "done when"-Zeile ist die, die Leute vergessen — genau sie hält Claude davon ab, abzuschweifen
- Funktioniert auch, aber niemand — weder du noch Claude — weiß, wann es fertig ist

<!-- @note: read-the-diff-not-the-summary -->
> Tun:
> - tasks/02-foundation.md Schritte 3-4, dann zurück zu den Folien
> - Nach `git status` fragen, dann `/diff` nach dem Scaffold live zeigen — nur Scaffold-Änderungen sollten da sein, bevor Plan Mode irgendwas anderes anfasst
> - Das Panel meldet manchmal, dass Dateien "not shown" sind, und brandneue Dateien aus einem Shell-Befehl können dazugehören — `git status` ist die vollständige Liste, deshalb kommt es zuerst
> - Claude bitten zu committen, die Commit-Message lesen, die Claude geschrieben hat

Sagen:
- Gewohnheit früh aufbauen: nach jedem Schritt `/diff` lesen — im Fullscreen bleibt das Panel offen und aktualisiert sich selbst, und `/diff` noch einmal schließt es
- Claudes Zusammenfassung liegt meistens richtig — der Diff liegt immer richtig
- Das ist eine gute erste Stelle, um Claude eine Routineaufgabe übernehmen zu lassen

<!-- @note: plan-mode-read-think-propose -->
> Tun:
> - tasks/02-foundation.md Schritte 5, 7-8, dann zurück zu den Folien — Schritt 6 (der eigentliche Prompt) kommt als Nächstes, auf seiner eigenen Live-Coding-Folie
> - Live demonstrieren: Shift+Tab, bis die Statusleiste "plan mode on" zeigt (zweimal ab Manual-Modus, dreimal ab Auto — Pro/Max/Team-Sessions starten im Auto-Modus)
> - Den Plan erscheinen lassen, sobald der Prompt von der nächsten Folie geschickt ist
> - Einen Teil davon laut vorlesen, der Gruppe eine Frage stellen ("warum lib/generated/prisma?")
> - Zurückschalten und "do it" sagen

Sagen:
- [click] Punkt: das Datenmodell ist später schwer zu ändern — das ist der Moment, hinzuschauen, bevor Claude schreibt

<!-- @note: plan-the-data-model -->
> Tun:
> - tasks/02-foundation.md Schritt 6, dann zurück zu den Folien
> - Den Prompt mit den Regeln als Bullet Points einfügen — mit "\" am Zeilenende weiter in einer neuen Zeile, ohne abzuschicken

Sagen:
- SQLite hat keine Enums
- der generierte Client-Pfad hält den Import stabil
- der Seed ist das, womit sich jede spätere Task einloggt

<!-- @note: foundation -->
> Tun:
> - Task-02-Rückblick
> - Übergabe an tasks/02-foundation.md, alle 11 Schritte — keine Folien mehr bis Task 03
> - Den Chat beobachten, während gearbeitet wird
> - Häufigster Stolperstein: create-next-app stellt interaktive Fragen — die Flags im Briefing vermeiden die meisten davon

Sagen:
- 02-start ist die Spec plus eine erste CLAUDE.md; 03-start ist der Landepunkt, falls diese Task schiefgeht
- "antworte bei allem, wo du dir nicht sicher bist, mit Ja."
