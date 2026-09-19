<!-- @note: batch-what-does-not-touch -->
- Die letzten Scheiben teilen sich keine Dateien, ein Briefing kann also alle vier tragen
- [click] Zeigen: das Briefing aus Task 05 — jeder Job hat seine eigenen Pfade
- [click:4] Sagen: die Pfade sind es, die die Jobs auseinanderhalten
- Abschicken, dann zur nächsten Folie weiter, während es läuft

<!-- @note: do-not-wait -->
- Demo: den Build im Hintergrund anfragen, dann etwas anderes fragen
- /cost ausführen, die Zahl laut sagen
- Leute sind in beide Richtungen überrascht
- Punkt: den Preis der eigenen Arbeitsweise kennen, dann entscheiden

<!-- @note: remember-it -->
- Demo: sagen "Remember for next time: always use UserAvatar, never a raw img tag" — warten, bis Claude das Speichern bestätigt
- /memory zeigen — den Auto-Memory-Ordner auswählen
- Das alte #-Kürzel gibt es nicht mehr (entfernt in v2.0.70) — um gezielt zu speichern, in Worten bitten: "Remember …". Von selbst speichert Claude Korrekturen auch, aber nicht jedes Mal
- CLAUDE.md ist das, was du aufschreibst; Auto Memory ist das, was Claude selbst bemerkt und speichert
- Beides wird zu Beginn jedes Gesprächs gelesen

<!-- @note: review-like-a-stranger -->
- Zeigen: vollständiger Prompt (wörtlich aus tasks/05-finish-and-ship.md):

Review the diff of this branch against 05-start like a strict senior engineer.
Look for: missing ownership checks in actions, Prisma calls outside lib/data,
Zod schemas outside lib/validation.ts, params not awaited. List findings with file and line.
Fix nothing yet.

- Danach wörtlich sagen: "Fix findings 1 and 3. Leave the others."
- Review und Fix sind absichtlich zwei Messages — du bleibst die Person, die entscheidet

<!-- @note: ship-then-look-at-the-reference -->
- Live den PR öffnen (oder PR.md schreiben, falls gh nicht eingerichtet ist)
- 06-start fetchen und diffen
- Claude nach drei Unterschieden in lib/data und app/actions fragen, ohne Bewertung
- Retro-Fragen aus Task 05 — der Gruppe einen Moment geben, sie einer Nachbarin oder einem Nachbarn zu beantworten
- Dann: git checkout 06-start, npm install, npm run db:reset
- Klar sagen: dein Build bleibt auf deinem Branch; die nächsten Teile brauchen eine gemeinsame Codebase, also wechseln alle zur Referenz

<!-- @note: finish-and-ship -->
- Task-05-Rückblick
- Reset: 05-start ist alles bis zu Benachrichtigungen; 06-start ist die Referenz-CLASH und der Start von Teil III
- Alle müssen bei 06-start enden — das vor dem nächsten Divider prüfen
