<!-- @note: letting-go-of-the-wheel -->
Sagen:
- Drei Ideen, jede richtig umgesetzt
- Worktrees: das, was die Leute danach am meisten nutzen
- Headless CI: macht aus dem Audit dauerhafte Infrastruktur
- Agent SDK: jede Kontrolle aus diesem Workshop gilt unverändert weiter, wenn der Agent in deiner eigenen Software lebt

<!-- @note: task-15-letting-go -->
> Tun:
> - Branch: 15-start hat bereits CLAUDE.md, den Skill, den Fix und das Hook-Set

Sagen:
- Zwei Ideen: Worktrees verhindern Kollisionen zwischen parallelen Agents, Headless CI lässt denselben Audit laufen, ohne dass jemand zuschaut

<!-- @note: one-repo-n-isolated-agents -->
> Tun:
> - Zeit lassen
> - Erwähnen, ohne es vorzuführen

Sagen:
- [click] Jede Strategie bisher hat sich einen Working Tree geteilt
- [click] Worktrees: mehrere Agents laufen parallel auf getrennten Branches desselben Repos — keine Gefahr, dass die halbfertige Änderung des einen die des anderen kaputt macht
- `isolation: worktree` im Frontmatter eines Subagents, und die Tools EnterWorktree/ExitWorktree
- Zuhause: `claude --worktree "#<pr-number>"` startet von einem PR aus

<!-- @note: headless-in-ci -->
Sagen:
- Headless = kein Mensch schaut zu: derselbe Agent, der gerade mit dir gepairt hat, läuft unbeaufsichtigt, ausgelöst durch ein Event
- [click] Den leeren Actions-Tab mit dem Security-Audit aus Task 08 füllen, das bei jedem PR läuft
- Das Herzstück wird zu dauerhafter Infrastruktur
- Nicht `claude -p` ins YAML packen — anthropics/claude-code-action@v1 mit `prompt` und `claude_args` verwenden
- v1 hat den `mode`-Input gestrichen (wird jetzt automatisch erkannt) — @beta hat ihn noch.

<!-- @note: audit-on-every-pr -->
> Tun:
> - VOLLSTÄNDIGE LÖSUNG (nur für Trainer):
>       - uses: anthropics/claude-code-action@v1
>         with:
>           prompt: |
>             Audit every exported Server Action in app/actions/ changed by
>             this PR for missing ownership checks on mutations of existing
>             rows. Comment the findings on the PR.
>           claude_args: |
>             --model claude-sonnet-5
>             --allowedTools "Bash(gh pr comment:*),Bash(gh pr diff:*),Bash(gh pr view:*)"
>           claude_code_oauth_token: ${{ secrets.CLAUDE_CODE_OAUTH_TOKEN }}
> - Um zu prüfen, ob das YAML gültig ist, braucht es keinen echten Token

Sagen:
- Ohne --allowedTools landen die Findings nur im Run-Log — erst `Bash(gh pr comment:*)` erlaubt Claude, den Kommentar zu posten
- Authentifizierung über den Action-Input `claude_code_oauth_token`, gespeist aus einem benannten Repository-Secret (erstellt mit `claude setup-token`) — niemals ein fest codierter Key
- `id-token: write` ist erforderlich

<!-- @note: drive-a-session-from-your-phone -->
> Tun:
> - Braucht einen Subscription-Plan, keinen API-Key — und vorher /login
> - Bei passendem Beamer-Setup live das Verbindungs-Panel zeigen

Sagen:
- Nichts wandert in die Cloud — deine Maschine führt weiter jeden Tool-Call aus, das Handy ist nur ein Fenster
- [click] claude --rc ist zum bereits verbunden starten, nützlich bevor du vom Schreibtisch weggehst
- [click] /loop ist ein anderes Tool für ein ähnliches Bedürfnis: Automatisierung ohne Menschen, aber ganz ohne Fremdgerät

<!-- @note: letting-go -->
> Tun:
> - Zwei Terminals für die Worktree-Hälfte
> - CI-Hälfte braucht keinen echten Token, um die YAML-Struktur zu prüfen

<!-- @note: task-16-the-agent-sdk -->
> Tun:
> - Branch: 16-start hat bereits CLAUDE.md, den Skill, den Fix und das Hook-Set

Sagen:
- Derselbe Agent-Loop, jetzt in einem kleinen Programm statt in einer Terminal-Sitzung

<!-- @note: same-loop-inside-your-program -->
Sagen:
- [click:2] Gerade den Agent headless in einer Pipeline laufen lassen
- [click] Agent SDK: dieselbe Idee, eine Stufe weiter innen — der Agent lebt in deiner Anwendung
- Stell dir vor, CLASH beantwortet "find me something outdoors in Kreuzberg this evening" über seiner eigenen Karte
- [click] Die kleinste Version bauen: ein Skript, das diese Frage aus den Seed-Daten beantwortet, mit Read-only-Tools und einem Hook

<!-- @note: ask-clash-mts -->
> Tun:
> - VOLLSTÄNDIGE LÖSUNG (nur für Trainer): workshop-artifacts/16-agent-sdk/ask-clash.mts
> - Starten mit `npx tsx ask-clash.mts "find me something outdoors in Kreuzberg this evening"` nach `npm install @anthropic-ai/claude-agent-sdk tsx`
> - Auf die drei Controls zeigen
> - Dann auf die Result-Message: die Antwort, num_turns, total_cost_usd
> - Die Kosten laut sagen

Sagen:
- allowedTools (bewilligt automatisch, schränkt nicht ein) + disallowedTools (blockiert tatsächlich), hooks.PreToolUse, maxTurns

<!-- @note: the-agent-sdk -->
> Tun:
> - Fertiges Programm: workshop-artifacts/16-agent-sdk/

Sagen:
- "Now you"-Teil: entfernt Tools und fügt einen System-Prompt hinzu
- Erweiterung: macht daraus eine API-Route
