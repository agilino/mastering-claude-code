<!-- @note: build-clash -->
> Tun:
> - Divider für Teil II
> - Auf die vier Module dieses Teils zeigen

Sagen:
- "Ab jetzt baust du. Ich zeige einen Schritt, du machst ihn auf deiner
Maschine. Die Spec ist docs/SPEC.md. Claude schreibt den Code. Du entscheidest, was gut ist."
- Jedes ist eine Task; jede Task hat einen Reset-Branch

<!-- @note: task-02-foundation -->
> Tun:
> - Branch: 02-start hat die Spec plus eine erste CLAUDE.md

Sagen:
- Vom Briefing zur laufenden App: Scaffold aufsetzen, Datenmodell planen, dann bauen

<!-- @note: a-brief-has-three-parts -->
> Tun:
> - Schritt 1-2 machen die Teilnehmenden selbst
> - Im Manual-Modus starten, die Gruppe die ersten zwei, drei Permission-Prompts sehen lassen
> - Das Repo ist absichtlich nicht leer. Darauf hinweisen, dass das Briefing die Workshop-Dateien vor create-next-app schützen lässt
> - Dann zu Auto wechseln — ein Next.js-Scaffold aufzusetzen ist Standard, geringes Risiko
> - [click] Die drei Teile am echten Scaffold-Briefing aus Task 02 zeigen
> - Kontrastieren mit dem kalten Prompt "set up a Next.js app"

Sagen:
- Ein Prompt ist ein Wunsch; ein Briefing ist ein Vertrag
- [click:3] Kernpunkt: die "done when"-Zeile ist die, die Leute vergessen — genau sie hält Claude davon ab, abzuschweifen
- Funktioniert auch, aber niemand — weder du noch Claude — weiß, wann es fertig ist

<!-- @note: read-the-diff-not-the-summary -->
> Tun:
> - Schritt 3-4 machen die Teilnehmenden selbst
> - Nach `git status` fragen, dann `/diff` nach dem Scaffold live zeigen — nur Scaffold-Änderungen sollten da sein, bevor Plan Mode irgendwas anderes anfasst
> - Das Panel meldet manchmal, dass Dateien "not shown" sind, und brandneue Dateien aus einem Shell-Befehl können dazugehören — `git status` ist die vollständige Liste, deshalb kommt es zuerst
> - Claude bitten zu committen, die Commit-Message lesen, die Claude geschrieben hat

Sagen:
- Gewohnheit früh aufbauen: nach jedem Schritt `/diff` lesen — im Fullscreen bleibt das Panel offen und aktualisiert sich selbst, und `/diff` noch einmal schließt es
- Claudes Zusammenfassung liegt meistens richtig — der Diff liegt immer richtig
- Das ist eine gute erste Stelle, um Claude eine Routineaufgabe übernehmen zu lassen

<!-- @note: plan-mode-read-think-propose -->
> Tun:
> - Schritt 5, 7-8 machen die Teilnehmenden selbst — Schritt 6 (der eigentliche Prompt) kommt als Nächstes, auf seiner eigenen Live-Coding-Folie
> - Live demonstrieren: Shift+Tab, bis die Statusleiste "plan mode on" zeigt (zweimal ab Manual-Modus, dreimal ab Auto — Pro/Max/Team-Sessions starten im Auto-Modus)
> - Den Plan erscheinen lassen, sobald der Prompt von der nächsten Folie geschickt ist
> - Einen Teil davon laut vorlesen, der Gruppe eine Frage stellen ("warum lib/generated/prisma?")
> - Zurückschalten und "do it" sagen

Sagen:
- [click] Punkt: das Datenmodell ist später schwer zu ändern — das ist der Moment, hinzuschauen, bevor Claude schreibt



<!-- @note: when-a-plan-earns-its-cost -->
> Do:
> - Frage nach einem Beispiel, das einen Plan verdient, und einem, das keinen braucht.
> - Halte die Grenze praktisch: Unsicherheit, Auswirkungsradius, Umkehrbarkeit.

Say:
- Planung ist nicht gratis. Sie liest Code, erzeugt Text und schafft ein weiteres Artefakt für den Review.
- Bezahle diesen Aufwand, wenn eine falsche Richtung teuer ist oder der Ansatz wirklich unklar ist.
- Wenn du den Diff in einem Satz beschreiben und günstig verifizieren kannst, ist direkte Umsetzung oft der bessere erste Schritt.

<!-- @note: a-good-plan-has-an-exit -->
> Do:
> - Gehe die acht Felder von links nach rechts durch.
> - Stoppe bei Verifikation und Done. Sie machen aus einem Plan ein ausführbares Arbeitspaket.

Say:
- Ein guter Plan ist keine Repository-Führung. Er nennt die Entscheidungsgrenze und wie riskante Schritte geprüft werden.
- Evidence bedeutet echte Dateien, Contracts und beobachtetes Verhalten. Risks nennen, was den Ansatz ungültig machen würde.
- Done ist beobachtbar. Ein Plan ohne Exit-Kriterium wächst oft noch während der Umsetzung.

<!-- @note: plan-or-roadmap -->
> Do:
> - Frage: Könnten zwei mittlere Teile unabhängig reviewed, gemerged oder zurückgerollt werden? Dann sind es Work Packages.

Say:
- Ein Plan beschreibt eine zusammenhängende Änderung mit einer Acceptance-Grenze.
- Sobald mehrere Ergebnisse unabhängig wertvoll, mergebar oder revertierbar sind, hilft eine Roadmap mit kleineren Plänen darunter.
- Kleinere Grenzen machen Review, Delegation, Rollback und Verifikation günstiger.

<!-- @note: upgrade-the-planner-not-the-run -->
> Do:
> - Zeige opusplan in der Model-Doku: Opus beim Planen, Sonnet bei der Ausführung.
> - Erkläre das Reviewer-Muster, ohne einen zweiten Anbieter oder ein zweites Tool vorzuschreiben.

Say:
- Nutze das teure Modell für die Entscheidung, wenn die Entscheidung der schwierige Teil ist; Routine-Ausführung braucht es nicht automatisch.
- Ein frischer Reviewer greift Annahmen, fehlende Constraints und Verifikationslücken an.
- Schicke nicht den kompletten Plan endlos zwischen Reviewern hin und her. Kläre die Differenzen, friere das Work Package ein, setze um und verifiziere.

<!-- @note: plan-the-data-model -->
> Tun:
> - Schritt 6 machen die Teilnehmenden selbst
> - Den Prompt mit den Regeln als Bullet Points einfügen — mit "\" am Zeilenende weiter in einer neuen Zeile, ohne abzuschicken

Sagen:
- SQLite hat keine Enums
- der generierte Client-Pfad hält den Import stabil
- tsx macht den TypeScript-Seed über die im Workshop unterstützten Node-Versionen reproduzierbar
- Prisma 7.10+ kann prisma7.config.ts erzeugen; ältere 7.x-Projekte können weiterhin prisma.config.ts verwenden
- der Seed ist das, womit sich jede spätere Task einloggt

<!-- @note: foundation -->
> Tun:
> - Task-02-Rückblick
> - Übergabe an tasks/02-foundation.md, alle 11 Schritte — keine Folien mehr bis Task 03
> - Den Chat beobachten, während gearbeitet wird
> - Häufigster Stolperstein: create-next-app und lokale Package-Manager-Präferenzen. Das Briefing erzwingt npm, kein src/-Verzeichnis, nicht-interaktive Antworten und schützt die Workshop-Dateien

Sagen:
- 02-start ist die Spec plus eine erste CLAUDE.md; 03-start ist der Landepunkt, falls diese Task schiefgeht
- "antworte bei allem, wo du dir nicht sicher bist, mit Ja."
