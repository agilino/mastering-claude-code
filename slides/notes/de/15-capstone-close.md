<!-- @note: capstone -->
- Drei Briefings in workshop-artifacts/14-capstone/README.md: Clash-Kommentare, Venue-Favoriten richtig umgesetzt, wöchentlicher Digest
- Keine Prompts vorgegeben — die Checkliste ist das Ergebnis
- Herumgehen, sich die /context-Werte ansehen
- Leute fragen, wohin ihr Budget gegangen ist

<!-- @note: security-three-rules -->
- Prompt Injection in einem Satz: ein Modell kann Daten und Anweisungen nicht durch Hinsehen unterscheiden
- CLASH steckt voller nutzergenerierter Titel und Bios — klassische Angriffsfläche für Injection
- Der Workflow aus Task 09 hat die Regel schon angewendet: Leser nicht vertrauenswürdiger Inhalte bekommen keine Schreib-Tools
- Hooks machen diese Regel zum Gesetz
- Subagent-Tool-Listen machen die Angriffsfläche klein

<!-- @note: spec-kit-vs-bmad -->
- [click:2] Spec Kit — GitHub, MIT, agent-agnostisch, `specify init`, wenig Zeremonie
- Specs als versionierte Markdown-Dateien, die jeder Agent lesen kann
- Python/uv-Tool, kein npm: `uv tool install specify-cli --from git+https://github.com/github/spec-kit.git`
- Echte Voraussetzung, falls jemand nur Node hat
- [click] BMAD v6 liefert fünf benannte Agents (Analyst, PM, Architect, Developer, UX Designer) — nicht "12+ Personas" (das ist eine v4-Zahl)
- Schwergewichtig: berichtete Praxiskosten von einigen Hundert bis zu ein paar Tausend Dollar pro Entwickler und Monat bei Frontier-Modellen
- Repo: bmad-code-org/BMAD-METHOD
- Faustregel: Spec Kit, wenn du Spec-Disziplin willst, ohne Prozess-Overhead; BMAD, wenn die Organisation diese Rollen schon hat
- BMAD zaubert dir keinen Prozess herbei, den du nicht hast
- [click] Ehrliche Einordnung: beide sind Greenfield-Methoden, CLASH ist Brownfield — deshalb kommen sie zuletzt, und deshalb ging es vorher immer um Kontrolle statt um Zeremonie

<!-- @note: what-we-did-not-cover -->
- Kurz halten
- Diese Dinge zu nennen, respektiert die Gruppe und nimmt das "Warum hast du X nicht gezeigt" vorweg

<!-- @note: context-is-king-you-push-it-you-own-it -->
- Der Schluss — zwei Zeilen, kein Diagramm
- Ein roter Faden: Context sorglos behandelt → das Fenster füllt sich mit Rauschen, der Agent driftet ab
- Context als Ressource behandelt, die du gezielt gestaltest → der größte Hebel, den du hast
- Skills, Subagents, Hooks, MCP, Workflows: jede Zeile der Karte war ein anderer Weg, diese eine Randbedingung zu managen
- Du schiebst dem Agenten den Context zu. Du trägst die Verantwortung für das, was daraus wird.
