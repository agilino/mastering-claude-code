<!-- @note: small-steps-beat-big-asks -->
- Task 03 ist der längste Build — die Lektion ist Pacing
- [click] Die große Anfrage in einer Zeile zeigen, dann in drei zerlegen
- [click] Jeder der drei endet mit etwas, das sich im Browser ausprobieren lässt
- Sagen: wenn du es nicht prüfen kannst, ist der Schritt zu groß

<!-- @note: undo-a-step-rewind -->
- Demo: nach dem Shell-Schritt /rewind ausführen, die Liste der Checkpoints zeigen
- Den Checkpoint vor dem letzten Schritt auswählen, zeigen, dass die Dateien zurück sind
- Esc drücken, um abzubrechen, falls es doch nicht gewollt war
- Sagen: das ist Undo fürs Gespräch — es ersetzt Git nicht
- Früh benutzen, bevor du versuchst, eine falsche Richtung zu flicken

<!-- @note: watch-the-window-fill -->
- Nach den Auth- und Shell-Schritten live /context ausführen
- [click] Die Bänder lesen: System-Prompt, CLAUDE.md, Tool-Ergebnisse, Gespräch
- [click:4] Sagen: das Tool-Ergebnisse-Band sind die Dateien, die Claude gelesen hat — es wächst immer weiter. Ist das Fenster fast voll, räumt Claude Code zuerst ältere Tool-Ausgaben weg, dann komprimiert es
- Dann /compact ausführen, dann noch mal /context
- Das erste Mal, dass die Gruppe das Context Window als etwas sieht, das sie managen kann
- Teil III macht daraus eine Disziplin

<!-- @note: point-don-t-let-it-guess -->
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
  - [click] Context-Balken: ~18 % verbraucht — dieselbe Aufgabe, dasselbe Modell, gezielt eingesetzt
- Deshalb ist der Clashes-Prompt in Task 03 voller @-Referenzen

<!-- @note: the-safety-moment -->
- VOLLSTÄNDIGE PROMPTS (wörtlich aus tasks/03-auth-and-clashes.md):

1) requireUser() runs in app/(app)/layout.tsx. Does that protect the deleteClash action
   in app/actions/clashes.ts from being called by someone who is not the creator? Explain.

2) Make sure every action that changes an existing clash checks that the current user is
   the creator (creatorId === user.id) and returns an error if not.
   Then add this rule to CLAUDE.md under "Rules":
   - Every Server Action calls requireUser() and checks ownership before it changes an existing row.

- Den Satz sagen, den die Gruppe behalten muss: eine Server Action ist ein öffentlicher Endpoint mit einer generierten id
- Das Layout schützt die Seite, nicht die Action
- Zod prüft die Form, nicht die Berechtigung
- Teil III und IV verbringen viel Zeit mit genau dieser Regel — sie hier pflanzen

<!-- @note: auth-and-clashes -->
- Task-03-Rückblick
- Reset: 03-start ist das Scaffold plus Daten; 04-start ist Auth, Shell und Clashes fertig
- Laut sagen: das ist die längste Task des Teils, und "Now you" fertigzustellen ist optional
- Auf Leute achten, die die ganze Task als einen Prompt schicken — hingehen und sie gemeinsam aufteilen
