<!-- @note: flags-change-how-a-session-starts -->
Sagen:
- Zwei verschiedene Arten von Flag: was eine Session darf, und welche Session sich öffnet
- [click] --settings stapelt sich über deinen eigenen Dateien, unter managed — gut für ein einmaliges Experiment
- [click] -p antwortet und beendet sich. Keine Conversation bleibt laufen
- [click] --resume und --continue sind die nächsten zwei Folien

<!-- @note: print-mode-no-interaction-just-an-answer -->
> Tun:
> - VOLLSTÄNDIGE LÖSUNG (nur für Trainer): claude -p "what does package.json say the app is called?"
>   claude -p "list every route under app/(app)/" --output-format json

Sagen:
- Das ist es, was ein Script oder ein anderes Programm aufruft — keine Terminal-UI, kein Hin und Her
- --output-format json gibt dir etwas, das du in ein anderes Tool pipen kannst
- Die Regel "nie claude -p in CI" aus dem GitHub-Actions-Modul betrifft genau den einen YAML-Schritt, nicht das hier

<!-- @note: pick-up-where-you-left-off -->
Sagen:
- An den meisten Tagen willst du --continue: gleicher Ordner, direkt weitermachen
- [click] --resume ist zum Auswählen da: eine andere Session, oder eine, die im Hintergrund weiterlief
