<!-- @note: letting-go-of-the-wheel -->
- Drei Ideen, jede richtig umgesetzt
- Worktrees: das, was die Leute danach am meisten nutzen
- Headless CI: macht aus dem Audit dauerhafte Infrastruktur
- Agent SDK: jede Kontrolle aus diesem Workshop gilt unverändert weiter, wenn der Agent in deiner eigenen Software lebt

<!-- @note: one-repo-n-isolated-agents -->
- [click] Jede Strategie bisher hat sich einen Working Tree geteilt
- [click] Worktrees: mehrere Agents laufen parallel auf getrennten Branches desselben Repos — keine Gefahr, dass die halbfertige Änderung des einen die des anderen kaputt macht
- Zeit lassen
- Erwähnen, ohne es vorzuführen: `isolation: worktree` im Frontmatter eines Subagents, und die Tools EnterWorktree/ExitWorktree
- Zuhause: `claude --worktree "#<pr-number>"` startet von einem PR aus

<!-- @note: headless-in-ci -->
- Headless = kein Mensch schaut zu: derselbe Agent, der gerade mit dir gepairt hat, läuft unbeaufsichtigt, ausgelöst durch ein Event
- [click] Den leeren Actions-Tab mit dem Security-Audit aus Task 08 füllen, das bei jedem PR läuft
- Das Herzstück wird zu dauerhafter Infrastruktur
- Nicht `claude -p` ins YAML packen — anthropics/claude-code-action@v1 mit `prompt` und `claude_args` verwenden
- v1 hat den `mode`-Input gestrichen (wird jetzt automatisch erkannt) — @beta hat ihn noch.

<!-- @note: audit-on-every-pr -->
- VOLLSTÄNDIGE LÖSUNG (nur für Trainer):
      - uses: anthropics/claude-code-action@v1
        with:
          prompt: |
            Audit every exported Server Action in app/actions/ changed by
            this PR for missing ownership checks on mutations of existing
            rows. Comment the findings on the PR.
          claude_args: |
            --model claude-sonnet-5
            --allowedTools "Bash(gh pr comment:*),Bash(gh pr diff:*),Bash(gh pr view:*)"
          claude_code_oauth_token: ${{ secrets.CLAUDE_CODE_OAUTH_TOKEN }}
- Ohne --allowedTools landen die Findings nur im Run-Log — erst `Bash(gh pr comment:*)` erlaubt Claude, den Kommentar zu posten
- Authentifizierung über den Action-Input `claude_code_oauth_token`, gespeist aus einem benannten Repository-Secret (erstellt mit `claude setup-token`) — niemals ein fest codierter Key
- `id-token: write` ist erforderlich
- Um zu prüfen, ob das YAML gültig ist, braucht es keinen echten Token

<!-- @note: letting-go -->
- Zwei Terminals für die Worktree-Hälfte
- CI-Hälfte braucht keinen echten Token, um die YAML-Struktur zu prüfen

<!-- @note: same-loop-inside-your-program -->
- [click:2] Gerade den Agent headless in einer Pipeline laufen lassen
- [click] Agent SDK: dieselbe Idee, eine Stufe weiter innen — der Agent lebt in deiner Anwendung
- Stell dir vor, CLASH beantwortet "find me something outdoors in Kreuzberg this evening" über seiner eigenen Karte
- [click] Die kleinste Version bauen: ein Skript, das diese Frage aus den Seed-Daten beantwortet, mit Read-only-Tools und einem Hook

<!-- @note: ask-clash-mts -->
- VOLLSTÄNDIGE LÖSUNG (nur für Trainer): workshop-artifacts/13-agent-sdk/ask-clash.mts
- Starten mit `npx tsx ask-clash.mts "find me something outdoors in Kreuzberg this evening"` nach `npm install @anthropic-ai/claude-agent-sdk tsx`
- Auf die drei Controls zeigen: allowedTools (bewilligt automatisch, schränkt nicht ein) + disallowedTools (blockiert tatsächlich), hooks.PreToolUse, maxTurns
- Dann auf die Result-Message: die Antwort, num_turns, total_cost_usd
- Die Kosten laut sagen

<!-- @note: the-agent-sdk -->
- Fertiges Programm: workshop-artifacts/13-agent-sdk/
- "Now you"-Teil: entfernt Tools und fügt einen System-Prompt hinzu
- Erweiterung: macht daraus eine API-Route
