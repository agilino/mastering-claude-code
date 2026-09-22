<!-- @note: settings-override-each-other -->
> Do:
> - Docs link: open it, scroll to "Settings precedence", then back to the slides

Say:
- Five places hold settings. For any one key, only one of them wins
- [click] Managed — your organization deploys it, nothing overrides it
- [click] Command line — `claude --settings`, one session only
- [click] Project local — `.claude/settings.local.json`, yours, never committed
- [click] Shared project — `.claude/settings.json`, committed, the whole team gets it
- [click] User — `~/.claude/settings.json`, every project on your machine

<!-- @note: the-sandbox-limits-what-a-command-touches -->
> Do:
> - Run `/sandbox` live if there is time — show the Mode and Config tabs
> - Docs link: open it, scroll to "How sandboxing works", then back to the slides

Say:
- A sandboxed Bash command still runs — the operating system enforces the limit, not a prompt
- [click] Filesystem: write access stays inside the project. Read access is wide, minus what you deny
- Network: nothing is reachable until you approve a host, once, then it is remembered
- Windows has no native sandbox — run Claude Code inside WSL2 to get one

<!-- @note: your-org-can-lock-settings-down -->
Say:
- `managed-settings.json`, MDM, or the claude.ai console — an administrator deploys it, not you
- It sits above every other file. Nothing you set overrides it
- `/status` names the managed source in force, so you always know what applies
