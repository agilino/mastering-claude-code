<!-- @note: three-levers-one-responsibility -->
> Do:
> - Pausiere bei jedem Begriff. Frage nach je einem Kursbeispiel für Kontext, Reasoning und Evidence.

Say:
- Das sind drei verschiedene Engineering-Probleme. Löse nicht eines davon, indem du einfach einen anderen Regler hochdrehst.
- Fehlende Fakten sind ein Kontextproblem. Ein schwieriger Trade-off kann ein Reasoning-Problem sein. Vertrauen ist ein Evidence-Problem.
- Du verantwortest die Grenze zwischen allen drei.

<!-- @note: autonomy-is-earned-by-verification -->
> Do:
> - Gehe die Treppe von links nach rechts. Die Höhe steht für Autonomie, nicht Modell-Intelligenz.

Say:
- Jeder Schritt weg von der Tastatur entfernt eine unmittelbare menschliche Korrekturschleife.
- Ersetze diese verlorene Aufsicht durch stärkere Belege, Isolation, Limits und Recovery.
- Autonomie ist nicht das Ziel an sich. Zuverlässige Fertigstellung ist das Ziel.

<!-- @note: context-is-king-you-push-it-you-own-it -->
> Tun:
> - Der Schluss — zwei Zeilen, kein Diagramm

Sagen:
- Ein roter Faden: sorglos behandelter Context füllt das Fenster mit Rauschen, der Agent driftet ab
- Context als Ressource gestaltet ist der größte Hebel, den du hast
- Skills, Subagents, Hooks, MCP, Workflows: jede Zeile der Karte hat diese eine Randbedingung gemanagt
- Du schiebst dem Agenten den Context zu. Was daraus wird, verantwortest du.


<!-- @note: further-paths -->
> Do:
> - Das ist der Einstieg in optionales Reserve-Material. Der Kurs ist auf der vorherigen Folie bereits geschlossen.
> - Fahre nur weiter, wenn die Gruppe Platz hat oder nach Prozess-Frameworks fragt.

Say:
- Alles nach diesem Trenner ist Reserve-Material und kein weiterer Pflichtteil des Lernpfads.

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

<!-- @note: what-we-did-not-cover -->
> Do:
> - Halte es kurz. /goal und /batch stehen nicht mehr hier, weil der Kurs sie jetzt behandelt.

Say:
- Channels pushen Events in eine offene Session. Computer Use lässt Claude native Apps bedienen.
- Beides sind angrenzende Fähigkeiten, aber keine Voraussetzung für das Engineering-Modell aus diesem Kurs.
