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
