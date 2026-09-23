<!-- @note: orchestrate-and-let-go -->
> Tun:
> - Teil IV beginnt hier — neuer Gürtel, neue JourneyMap-Zeile aktiv
> - Einmal klar sagen

Sagen:
- Nicht mehr Kontext kontrollieren, jetzt Arbeit abgeben und dem Ergebnis vertrauen
- Sieben Tasks von hier bis zum Capstone

<!-- @note: tdd -->
> Tun:
> - Divider: Skill-Zeile wieder hervorgehoben — /tdd ist ein Skill, dasselbe Primitive wie /discover
> - Den Moment kurz halten

Sagen:
- "Der letzte Brown-Belt-Task hat eine Spec gebaut. Dieser baut daraus den Code, eine Regel nach der anderen."

<!-- @note: task-11-the-tdd-inner-loop -->
> Tun:
> - Branch: 11-start hat vitest schon installiert, einen trivialen Test, der läuft, und einen absichtlich falschen capacity.ts-Stub

Sagen:
- Vier Dinge zu lernen, zwei Dinge, mit denen man rauskommt, und ein Moment, den man nur beobachtet

<!-- @note: a-skill-that-stops-itself -->
> Tun:
> - Docs-Link: öffnen, zur SKILL.md-Frontmatter-Referenz scrollen, auf disable-model-invocation zeigen, dann zurück zu den Slides

Sagen:
- disable-model-invocation blockiert, dass Claude von sich aus nach diesem Skill greift
- Man führt ihn trotzdem namentlich aus, wann immer man entscheidet, dass ein Zyklus beginnt — eine bewusste Zeremonie, nicht automatisch

<!-- @note: the-spec-is-the-goalpost -->
> Tun:
> - Kontrast zum Chat-Gedächtnis: fragen, was passieren würde, hätte man docs/specs/clash-capacity.md nie gespeichert

Sagen:
- Ein Test, der gegen eine gespeicherte Spec geprüft wird, ist ein Vertrag
- Aufgefordert, einen Test grün zu machen, ändert ein Modell die Datei, die einfacher zu ändern ist — manchmal ist das der Test selbst

<!-- @note: one-cycle-red-green-stop -->
> Tun:
> - Live-Bau-Referenz — der genaue Body steht in tasks/11-tdd-inner-loop.md, Schritt 7
> - Wieder auf disable-model-invocation zeigen — sagen, warum es hier steht, nicht nur, was es tut

Sagen:
- RED muss an einer Assertion scheitern — ein Compile-Fehler heißt, der Test prüft die Verkabelung, nicht die Regel
- STOP heißt berichten und warten, nicht durch jede verbleibende Regel durchrauschen

<!-- @note: update-the-test-or-fix-the-code -->
> Tun:
> - Stop-Slide — den nachlässigen Prompt live senden, einmal, auf der eigenen Maschine, dann /rewind vor der Übergabe
> - [click] "den Test aktualisieren, damit die Suite besteht"
> - [click] Claude ändert die Assertion, nicht den Code
> - [click] die Suite ist grün
> - [click] die Regel, die der Test beweisen sollte, ist jetzt nachweislich falsch
> - [click] Careless-Balken
> - [click] "nur lib/capacity.ts ändern, nicht den Test"
> - [click] die Stub-Logik ändert sich
> - [click] der Test sagt immer noch dasselbe
> - [click] grün, weil die Regel jetzt wirklich stimmt
> - [click] Engineered-Balken und Schlusszeile

Sagen:
- Derselbe fehlschlagende Test, zwei verschiedene Lösungen
- Der Unterschied ist, welche Datei sich ändern durfte

<!-- @note: the-tdd-inner-loop -->
> Tun:
> - Recap: jede Regel in der Spec hat jetzt einen bestehenden Test, keine davon durch Ändern des Tests

Sagen:
- "Die Spec aus Task 09 war das Einzige, was hier entschieden hat, was 'richtig' bedeutet"
