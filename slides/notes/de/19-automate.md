<!-- @note: nobody-at-the-keyboard -->
> Tun:
> - Opener für den Block. Noch keine Demo

Sagen:
- Bisher saßt du an der Tastatur: du hast getippt, Claude hat gearbeitet, du hast zugeschaut
- Vier Wege, sich zu entfernen, jeder klein und echt
- Die ersten drei machst du selbst; der vierte braucht ein claude.ai-Abo und GitHub-Zugriff

<!-- @note: task-18-automate -->
> Tun:
> - Branch: 18-start in deinem CLASH-Clone, identisch mit 14-start; die Hooks aus Task 13 liegen in .claude/settings.json
> - Jetzt warnen: jeder Turn endet mit npm run build (Stop-Hook aus Task 13), der Loop wirkt langsam

Sagen:
- Vier Mechanismen, ein Task: Style, Loop, Background-Session, Routine
- Der Routine-Schritt ist eine Demo; auf dem eigenen CLASH-Fork mitmachen, wenn möglich

<!-- @note: an-output-style-sets-the-voice -->
> Tun:
> - Docs-Link: die Tabelle "Built-in output styles" — was Proactive, Explanatory und Learning ergänzen
> - Live: /output-style ohne Argument listet die Styles und markiert den aktiven
> - Dann /output-style concise und eine Frage; dann /output-style default zum Zurückschalten

Sagen:
- Concise lässt Einleitung und Schluss weg; die Arbeit darunter bleibt so gründlich wie zuvor
- Mitten in der Session umschalten: der neue Style gilt ab deiner nächsten Nachricht
- Die Wahl landet in .claude/settings.local.json als outputStyle; der Befehl ignoriert Groß- und Kleinschreibung, der Wert nicht
- Ein Style ist eine Anweisung, keine Garantie; was immer passieren muss, ist ein Hook
- Ein frischer Subagent läuft mit eigenem System-Prompt, ihn erreicht kein Style

<!-- @note: host-notes-md -->
> Tun:
> - VOLLSTÄNDIGE LÖSUNG (nur für Trainer): workshop-artifacts/18-automate/host-notes.md
>       ---
>       description: Ends every answer with one plain line for a CLASH host.
>       keep-coding-instructions: true
>       ---
>
>       Work as usual. Then end every answer with exactly one extra line.
>       That line starts with "Host note:" and says, in plain words, what changed for a CLASH host (a person who creates clashes).
>       No code, no file names and no jargon in that line. When nothing changed for a host, write: Host note: nothing changed for hosts.
> - Die LIVE-Zeile tippen, speichern, Claude Code neu starten: Style-Dateien werden beim Start gelesen
> - Nach dem Neustart: /output-style host-notes, gelistet neben den Built-ins
> - Fragen: What does joinClash in app/actions/clashes.ts do? Die letzte Zeile beginnt mit "Host note:"

Sagen:
- keep-coding-instructions: true behält die Coding-Anweisungen von Claude Code unter deinem Style; Standard ist false
- Kein name-Feld, also ist der Dateiname der Style-Name: /output-style host-notes
- Ein falsch geschriebenes Frontmatter-Feld wird ohne Fehler ignoriert: nach dem Neustart die Liste prüfen

<!-- @note: loop-the-prompt-comes-back -->
> Tun:
> - Docs-Link: "Let Claude choose the interval", dann "Stop a loop". Live in deinem CLASH-Clone, zuerst:
>   Run npm run build in the background and tell me when it is done.
> - Dann, absichtlich ohne Intervall:
>   /loop tell me whether the background build has finished and whether it passed; if it failed, name the first error
> - Jede Runde endet mit dem Build des Stop-Hooks, dann nennt Claude die gewählte Pause
> - Esc, während er wartet, dann fragen: what scheduled tasks do I have?

Sagen:
- [click] Runde eins: Claude berichtet, dann wählt er die Pause nach dem Gesehenen
- [click] Kommt wieder, bis Esc beim Warten, oder bis Claude die Aufgabe für erledigt erklärt
- Claude beobachtet vielleicht mit Monitor statt Loop, oder der Loop endet vor Esc
- So oder so lautet der Check "lief mindestens einmal, nicht mehr gelistet"
- .claude/loop.md zählt nur für ein nacktes /loop, nie mit Prompt — das ist "Now you"

<!-- @note: background-the-session-keeps-working -->
> Tun:
> - Docs-Link: "How file edits are isolated". Einmal vorher trocken durchspielen: der Stop-Hook feuert im Worktree
> - Live, aus einem Terminal im Root deines CLASH-Clones, nicht in einer Session: der Befehl `claude --bg --name audit …` aus tasks/18-automate.md Schritt 15
> - Kehrt sofort zurück: kurze id, dann claude agents, claude attach <id>, claude logs <id>, claude stop <id>
> - Dann claude agents: Zeile audit wählen, Space zeigt die Vorschau, Enter hängt an, ← auf leerem Prompt trennt die Session

Sagen:
- [click] claude --bg nimmt den Prompt als positionales Argument, nicht -p; --name benennt die Zeile
- [click] claude agents listet Background-Sessions über alle deine Projekte; Subagents sind keine Zeilen
- Vor dem ersten Edit zieht die Session nach .claude/worktrees/ um, dort landet docs/audit.md
- Der frische Worktree hat keine node_modules, der Build des Stop-Hooks scheitert bis npm install

<!-- @note: routines-the-cloud-runs-it -->
> Tun:
> - Docs-Link: die drei Trigger-Typen, dann "Create from the CLI"
> - Die Tabelle auf dem Slide ist "Compare scheduling options" von der scheduled-tasks-Seite, auf vier Zeilen gekürzt

Sagen:
- [click] Cloud: dein Rechner kann aus sein
- [click] Cloud- und Desktop-Tasks brauchen keine offene Session; nur /loop braucht eine
- [click] Cloud sieht keine lokalen Dateien: jeder Lauf klont CLASH frisch von dessen Default-Branch
- Eine Routine gehört zu einem claude.ai-Account; was sie auf GitHub tut, erscheint unter deinem Namen
- Keine Permission-Prompts im Lauf: der Prompt selbst muss sagen, was nicht zu tun ist

<!-- @note: the-spec-drift-routine -->
> Tun:
> - VOLLSTÄNDIGE LÖSUNG (nur für Trainer), in deinem CLASH-Clone als eine Nachricht getippt:
>   /schedule weekly spec-drift guard for CLASH. Compare the rules in docs/SPEC.md (the "Rules" and "Data" sections) with prisma/schema.prisma and with the exported Server Actions in app/actions/. When a rule and the code disagree, open a pull request that names the rule, the file and a proposed fix. One pull request per run. When nothing drifted, do nothing: no pull request, no issue, no commit.
> - Vor der Demo: docs/SPEC.md muss auf dem CLASH-Fork-Branch liegen, den die Routine klont
> - Nur der eigene CLASH-Fork, mit dem claude.ai-Login in der CLI, nicht mit einem API-Key
> - Dann /schedule list und https://claude.ai/code/routines; eine Regel in docs/SPEC.md ändern, um einen Pull Request zu sehen

Sagen:
- Den Prompt laut vorlesen, beim letzten Satz innehalten: "do nothing" zählt, wenn niemand zuschaut
- Ein Pull Request je Lauf begrenzt einen falschen Lauf, wie maxTurns in Task 16
- Ein GitHub-Trigger braucht die Claude GitHub App auf dem CLASH-Fork — das ist "Now you"
- Connectors sind claude.ai-Integrationen: kein lokaler Server aus claude mcp add, aber ein committetes .mcp.json

<!-- @note: automate -->
> Tun:
> - Übergabe an tasks/18-automate.md; der Routine-Schritt ist die Trainer-Demo
> - Answer Key: workshop-artifacts/18-automate/ mit host-notes.md, loop.md, schedule-prompt.md und den Smoke-Tests im README

Sagen:
- Fragen: welcher der vier braucht eine offene Session, welcher läuft bei ausgeschaltetem Rechner?
- Go further: Capstone-Brief B mit claude --bg starten, Brief A im Vordergrund bauen
