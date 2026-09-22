<!-- @note: task-14-capstone -->
> Tun:
> - Branch: 14-start hat bereits CLAUDE.md, den Skill, den Fix und das Hook-Set

Sagen:
- Ein frei gewähltes Briefing, Ende-zu-Ende ausgeliefert mit jedem Werkzeug aus dem Workshop

<!-- @note: capstone -->
> Tun:
> - Herumgehen, sich die /context-Werte ansehen
> - Leute fragen, wohin ihr Budget gegangen ist

Sagen:
- Drei Briefings in workshop-artifacts/14-capstone/README.md: Clash-Kommentare, Venue-Favoriten richtig umgesetzt, wöchentlicher Digest
- Keine Prompts vorgegeben — die Checkliste ist das Ergebnis

<!-- @note: security-three-rules -->
Sagen:
- Prompt Injection in einem Satz: ein Modell kann Daten und Anweisungen nicht durch Hinsehen unterscheiden
- CLASH steckt voller nutzergenerierter Titel und Bios — klassische Angriffsfläche für Injection
- Der Workflow aus Task 09 hat die Regel schon angewendet: Leser nicht vertrauenswürdiger Inhalte bekommen keine Schreib-Tools
- Hooks machen diese Regel zum Gesetz
- Subagent-Tool-Listen machen die Angriffsfläche klein

<!-- @note: spec-kit-six-steps-one-constitution -->
> Tun:
> - VOLLSTÄNDIGE LÖSUNG (nur für Trainer, bei Demo installieren):
>   uv tool install specify-cli --from git+https://github.com/github/spec-kit.git
>   specify init my-project
> - Implement -> converge wiederholen, bis convergence "Converged" meldet

Sagen:
- Das eigene Tool von GitHub, MIT, agent-agnostisch — nicht an Claude Code gebunden
- Auf Claude Code installiert sich jeder Schritt als namensraumgetrennter Skill: speckit-constitution, nicht ein blankes /constitution
- [click] /speckit-specify — eine Feature-Beschreibung in normaler Sprache
- [click] /speckit-plan — ein technischer Plan aus der Spec
- [click] /speckit-tasks — der Plan aufgeteilt in eine Checkliste
- [click] /speckit-implement — gegen die Task-Liste bauen
- [click] /speckit-converge — prüft den Build gegen die Spec, springt zurück zu implement, bis Converged gemeldet wird
- [click] Die Constitution läuft einmal — Prinzipien, die jeder spätere Schritt liest

<!-- @note: bmad-five-agents-one-party-mode -->
> Tun:
> - VOLLSTÄNDIGE LÖSUNG (nur für Trainer, bei Demo installieren):
>   npx skills add bmad-code-org/BMAD-METHOD

Sagen:
- Die Delivery-Loop: clarify, plan, build and verify, learn and adjust — zurück zu plan
- [click] PM — Produktprioritäten und Scope
- [click] Architect — die technische Form der Lösung
- [click] Developer — die Umsetzung
- [click] UX — die Oberfläche und das Erlebnis
- [click] Party Mode: jeder installierte Agent in einem Gespräch, in character

<!-- @note: spec-kit-vs-bmad -->
> Tun:
> - Echte Voraussetzung, falls jemand nur Node hat

Sagen:
- [click:2] Spec Kit — GitHub, MIT, agent-agnostisch, `specify init`, wenig Zeremonie
- Specs als versionierte Markdown-Dateien, die jeder Agent lesen kann
- Python/uv-Tool, kein npm: `uv tool install specify-cli --from git+https://github.com/github/spec-kit.git`
- [click] BMAD v6 liefert fünf benannte Agents (Analyst, PM, Architect, Developer, UX Designer) — nicht "12+ Personas" (das ist eine v4-Zahl)
- Schwergewichtig: berichtete Praxiskosten von einigen Hundert bis zu ein paar Tausend Dollar pro Entwickler und Monat bei Frontier-Modellen
- Repo: bmad-code-org/BMAD-METHOD
- Faustregel: Spec Kit, wenn du Spec-Disziplin willst, ohne Prozess-Overhead; BMAD, wenn die Organisation diese Rollen schon hat
- BMAD zaubert dir keinen Prozess herbei, den du nicht hast
- [click] Ehrliche Einordnung: beide sind Greenfield-Methoden, CLASH ist Brownfield — deshalb kommen sie zuletzt, und deshalb ging es vorher immer um Kontrolle statt um Zeremonie

<!-- @note: what-we-did-not-cover -->
> Tun:
> - Kurz halten
> - Diese Dinge zu nennen, respektiert die Gruppe und nimmt das "Warum hast du X nicht gezeigt" vorweg

<!-- @note: context-is-king-you-push-it-you-own-it -->
> Tun:
> - Der Schluss — zwei Zeilen, kein Diagramm

Sagen:
- Ein roter Faden: Context sorglos behandelt → das Fenster füllt sich mit Rauschen, der Agent driftet ab
- Context als Ressource behandelt, die du gezielt gestaltest → der größte Hebel, den du hast
- Skills, Subagents, Hooks, MCP, Workflows: jede Zeile der Karte war ein anderer Weg, diese eine Randbedingung zu managen
- Du schiebst dem Agenten den Context zu. Du trägst die Verantwortung für das, was daraus wird.
