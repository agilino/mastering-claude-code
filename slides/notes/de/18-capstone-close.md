<!-- @note: task-17-capstone -->
> Tun:
> - Branch: 17-start hat bereits CLAUDE.md, den Skill, den Fix und das Hook-Set

Sagen:
- Ein frei gewähltes Briefing, Ende-zu-Ende ausgeliefert mit jedem Werkzeug aus dem Workshop

<!-- @note: capstone -->
> Tun:
> - Herumgehen, sich die /context-Werte ansehen
> - Leute fragen, wohin ihr Budget gegangen ist

Sagen:
- Drei Briefings in workshop-artifacts/17-capstone/README.md: Clash-Kommentare, Venue-Favoriten richtig umgesetzt, wöchentlicher Digest
- Keine Prompts vorgegeben — die Checkliste ist das Ergebnis

<!-- @note: security-three-rules -->
> Tun:
> - Optional: auf "Protect against prompt injection" zeigen — dieselben drei Regeln, als eigene Liste der Docs

Sagen:
- Prompt Injection in einem Satz: ein Modell kann Daten und Anweisungen nicht durch Hinsehen unterscheiden
- CLASH steckt voller nutzergenerierter Titel und Bios — klassische Angriffsfläche für Injection
- Der Workflow aus Task 12 hat die Regel schon angewendet: Leser nicht vertrauenswürdiger Inhalte bekommen keine Schreib-Tools
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
> - Docs-Link: das BMAD-Repo-README auf GitHub — auf die fünf Agenten und die Install-Zeile zeigen, dann zurück zu den Slides
> - VOLLSTÄNDIGE LÖSUNG (nur für Trainer, bei Demo installieren):
>   npx skills add bmad-code-org/BMAD-METHOD

Sagen:
- Die Delivery-Loop: clarify, plan, build and verify, learn and adjust — zurück zu plan
- [click] PM — Produktprioritäten und Scope
- [click] Architect — die technische Form der Lösung
- [click] Developer — die Umsetzung
- [click] UX — die Oberfläche und das Erlebnis
- [click] Party Mode: jeder installierte Agent in einem Gespräch, in character
- [click] bmad-build: der Skill, der aus einer Story Code macht — er klärt die Absicht, plant, schreibt eine Spec, implementiert, dann reviewt er; der Link öffnet "Build a Change" bei "Run bmad-build"

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
- [click] Ehrliche Einordnung: beide glänzen auf der grünen Wiese, taugen aber auch für bestehenden Code. CLASH ist beides — Greenfield in Teil II, seitdem Brownfield — und clash-conference war ein Greenfield-Bau mit BMAD

