<!-- @note: task-03-auth-and-clashes -->
> Tun:
> - Branch: 03-start hat schon das Scaffold, das Schema und die Seed-Daten — das Ergebnis von Task 02

Sagen:
- Fünf Dinge zu lernen, vier Dinge zu bauen — die längste Task in diesem Teil, hier zählen kleine Schritte am meisten

<!-- @note: small-steps-beat-big-asks -->
> Tun:
> - Schritte 2-4 machen die Teilnehmenden selbst
> - [click] Zeigen, wie die große Anfrage in einer Zeile scheitert oder abdriftet, dann dieselbe Arbeit in drei Schritten

Sagen:
- Task 03 ist der längste Build — die Lektion ist Pacing
- [click] Jeder der drei endet mit etwas, das sich im Browser ausprobieren lässt
- Wenn du es nicht prüfen kannst, ist der Schritt zu groß

<!-- @note: undo-a-step-rewind -->
> Tun:
> - Schritte 6-7 machen die Teilnehmenden selbst
> - Demo: nach dem Shell-Schritt /rewind ausführen, die Liste der Checkpoints zeigen
> - Den Checkpoint vor dem letzten Schritt auswählen, zeigen, dass die Dateien zurück sind
> - Esc drücken, um abzubrechen, falls es doch nicht gewollt war
> - Optional: auf den Abschnitt "Limitations" in den Docs zeigen — Checkpoints erfassen nur Claudes eigene Dateiänderungen, keine Änderungen durch einen Bash-Befehl

Sagen:
- Das ist Undo fürs Gespräch — es ersetzt Git nicht
- Früh benutzen, bevor du versuchst, eine falsche Richtung zu flicken

<!-- @note: compact-is-a-lossy-reset -->
> Do:
> - Führe /context nach Auth und Shell live aus und lies die echten Bereiche.
> - Führe /compact und danach erneut /context aus. Vergleiche vorher und nachher, statt nur wieder einen Tank zu füllen.
> - Optional: Zeige in der Doku /clear versus /compact.

Say:
- Compaction schafft Platz, indem Details durch eine Zusammenfassung ersetzt werden. Diese Zusammenfassung ist verlustbehaftet.
- Nutze /compact, wenn der aktuelle Thread noch wertvoll ist; /clear, wenn die alte Richtung nicht mehr nützt.
- Part III macht daraus statt eines Rettungsbefehls eine Context-Disziplin.

<!-- @note: the-safety-moment -->
> Tun:
> - Schritte 11-12 machen die Teilnehmenden selbst
> - VOLLSTÄNDIGE PROMPTS (wörtlich aus tasks/03-auth-and-clashes.md):
>
> 1) requireUser() runs in app/(app)/layout.tsx. Does that protect the deleteClash action
>    in app/actions/clashes.ts from being called by someone who is not the creator? Explain.
>
> 2) Make sure every action that changes an existing clash checks that the current user is
>    the creator (creatorId === user.id) and returns an error if not.
>    Then add this rule to CLAUDE.md under "Rules":
>    - Every Server Action calls requireUser() and checks ownership before it changes an existing row.
>
> - Den Satz sagen, den die Gruppe behalten muss
> - Teil III und IV verbringen viel Zeit mit genau dieser Regel — sie hier pflanzen

Sagen:
- Eine Server Action ist ein öffentlicher Endpoint mit einer generierten id
- Das Layout schützt die Seite, nicht die Action
- Zod prüft die Form, nicht die Berechtigung

<!-- @note: point-don-t-let-it-guess -->
> Tun:
> - Bereitet tasks/03-auth-and-clashes.md Schritt 10 vor, den Clash-Bau-Schritt
> - Links (unachtsam), ein Schritt pro Klick:
>   - [click] grep -r "notif" app/
>   - [click] 40 Dateien lesen
>   - [click] das Notification-Modell raten
>   - [click] die Server-Action-Form raten
>   - [click] Code schreiben, hoffen, dass er kompiliert
>   - [click] Context-Balken: ~85 % verbraucht
> - Rechts (gezielt), ein Schritt pro Klick:
>   - [click] @lib/data/notifications.ts
>   - [click] @app/actions/clashes.ts
>   - [click] @prisma/schema.prisma
>   - [click] Plan Mode: erst prüfen, bevor sich ein Byte bewegt
>   - [click] Context-Balken: ~18 % verbraucht — dieselbe Aufgabe, dasselbe Modell, gezielt eingesetzt

Sagen:
- Deshalb ist der Clashes-Prompt in Task 03 voller @-Referenzen

<!-- @note: auth-and-clashes -->
> Tun:
> - Task-03-Rückblick
> - Übergabe an tasks/03-auth-and-clashes.md, alle 13 Schritte — keine Folien mehr bis Task 04
> - Den Chat beobachten, während gearbeitet wird
> - Auf Leute achten, die die ganze Task als einen Prompt schicken — ihnen schreiben und live gemeinsam aufteilen

Sagen:
- Reset: 03-start ist das Scaffold plus Daten; 04-start ist Auth, Shell und Clashes fertig
- Das ist die längste Task des Teils, und "Now you" fertigzustellen ist optional
