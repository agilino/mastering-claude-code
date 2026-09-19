<!-- @note: hooks-rules-the-agent-cannot-cross -->
- Davon ausgehen, dass noch niemand einen Hook geschrieben hat
- Einen langsam aufbauen, dann drei schnell zeigen
- Namensfalle: CLASHs `hooks/`-Ordner sind React Hooks (eine Datei, `use-mobile.ts`)
- Claude Code Hooks liegen in `.claude/settings.json` — zwei verschiedene Dinge

<!-- @note: event-matcher-exit-code -->
- `.claude/settings.json` öffnen
- Ein Hook braucht drei Dinge: das EVENT, der MATCHER (welches Tool), der EXIT CODE — der Rest ist Detail
- Kritische Regel: nur Exit-Code 2 blockiert
- [click] Bei PreToolUse/PostToolUse geht reines stdout bei Exit 0 nur ins Debug-Log — Claude sieht es nie
- [click] Was den Agent erreicht: stderr bei Exit 2, oder strukturiertes JSON auf stdout bei Exit 0
- Matcher matcht den TOOL-NAMEN, nicht einen Dateipfad
- Nächste Folie macht daraus absichtlich eine Lektion

<!-- @note: one-hook-slowly -->
- Das ist der ABSICHTLICHE Fehler — genau so schreiben, wie gezeigt
- Über Claude Code eine Datei unter `app/actions/` bearbeiten — nichts feuert. So stehen lassen. Nach dem Warum fragen.
- Antwort: der Matcher matcht den TOOL-NAMEN (Edit, Write, Bash), nicht einen Pfad — ein Pfad-Glob wird dort als unverankerter Regex gegen den Tool-Namen geparst und matcht nie
- Live fixen mit dem Geschwister-Feld "if":
  "matcher": "Edit|Write",
  "hooks": [{ "type": "command",
    "if": "Edit(app/actions/**)",
    "command": "${CLAUDE_PROJECT_DIR}/.claude/hooks/typecheck-actions.sh",
    "timeout": 60 }]
- `if` enthält genau eine Permission-Regel — kein `or`, keine Liste. Eine `Edit(...)`-Regel deckt jedes Datei-Edit-Tool ab, fängt also auch Write
- Dann `.claude/hooks/typecheck-actions.sh` schreiben (Referenz: `workshop-artifacts/10-hooks/`)
- Absichtlich, über Claude Code, einen Typfehler in `app/actions/venues.ts` einbauen, damit der Hook feuert
- Zuschauen, wie `tsc` scheitert, wie Claude den Fehler über stderr bekommt, wie es seinen eigenen Code repariert — der Moment, den sich alle merken

<!-- @note: three-more-fast -->
- Zügig weitermachen — die Idee sitzt schon
- [click:2] Output-Replacement: PostToolUse unterstützt `hookSpecificOutput.updatedToolOutput` für ALLE Tools, nicht nur MCP
- Damit das laute Log von `npm run build` auf eine Pass/Fail-Zeile eindampfen, bevor es den Context erreicht
- Dasselbe "Context ist ein Budget"-Argument, jetzt auf einen Hook angewendet statt auf eine CLAUDE.md-Regel

<!-- @note: pretooluse-deny-rules -->
- VOLLSTÄNDIGE LÖSUNG (nur für Trainer): `workshop-artifacts/10-hooks/settings.json`
- Drei getrennte Matcher-Blöcke, einer pro Tool: Edit/Write für Migrations, Bash für `rm`, Read für `.env`
- Decision-Werte für `hookSpecificOutput.permissionDecision`: allow/deny/ask — die einfache Exit-2-Form funktioniert genauso
- Demo: versuchen, eine Datei unter `prisma/migrations/` zu bearbeiten, die Ablehnung auf dem Bildschirm beobachten

<!-- @note: gate-the-turn -->
- VOLLSTÄNDIGE LÖSUNG (nur für Trainer): `workshop-artifacts/10-hooks/build-gate.sh`
- Verdrahtet unter "Stop", ohne Matcher — Stop hat kein Tool, gegen das es matchen könnte
- Demo: den Build absichtlich kaputt machen, versuchen den Turn zu beenden, zuschauen wie Stop verweigert und dem Agent das Ende des Fehler-Logs übergibt
- Fixen, Turn beenden, zuschauen, wie es klappt
- Stop gatet das Ende eines TURNS, nicht einen Tool-Call — diesen Unterschied benennen

<!-- @note: advice-vs-law -->
- Das Vorausdeuten aus dem Skills-Teil zahlt sich jetzt aus: Skills sind Ratschlag, Hooks sind Gesetz
- [click] Ein Skill ist, was du einem neuen Kollegen sagst; ein Hook ist, was die CI ablehnt
- Wenn eine Regel in CLAUDE.md immer wieder wiederholt wird und der Agent trotzdem daran vorbeidriftet, wollte diese Regel ein Hook sein
- `hard_deny` kurz erwähnen und das Subsystem richtig benennen: `settings.autoMode.hard_deny`, Teil vom Auto-Modus, wo ein Classifier Aktionen prüft statt du selbst — keine PreToolUse-Entscheidung
- Nur benennen, nicht konfigurieren

<!-- @note: hooks -->
- Bestätigen, dass die Leute die kaputte Matcher-Version nachgebaut haben, bevor es weitergeht
- Der "warum hat's nicht gefeuert"-Moment funktioniert nur, wenn sie die Stille selbst erlebt haben
