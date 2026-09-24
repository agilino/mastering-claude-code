# Setup — do this before the workshop starts

Everything here is a one-time install. Do it on a network you trust, not on the
workshop wifi. If something fails, see the table at the end.

---

## 1. Tools

| Tool | How to check | How to install |
|---|---|---|
| Node.js 20 or newer | `node --version` | https://nodejs.org |
| git | `git --version` | https://git-scm.com |
| Claude Code | `claude --version` | See "Install Claude Code" below, then `claude` and log in |
| agent-browser | `agent-browser --version` | `npm install -g agent-browser && agent-browser install`, then see "Add the agent-browser skill" below |
| GitHub CLI (Part II, IV) | `gh --version` | https://cli.github.com then `gh auth login` |

Claude Code must be **2.1.252 or newer**. Older builds miss `/workflow-authoring` and `/skill-doctor`.

### Install Claude Code

Use the native installer. It keeps itself up to date.

macOS, Linux or WSL:

```bash
curl -fsSL https://claude.ai/install.sh | bash
```

Windows, in PowerShell:

```powershell
irm https://claude.ai/install.ps1 | iex
```

If `claude` is not found afterwards, open a new terminal and try again.
Windows CMD, Homebrew and WinGet are in the official quickstart:
https://code.claude.com/docs/en/quickstart#step-1-install-claude-code

npm works too and installs the same program: `npm install -g @anthropic-ai/claude-code`, without `sudo`.
On Node older than 22 it prints an `EBADENGINE` warning. That is harmless.

### Add the agent-browser skill

The CLI is the tool. The skill is what tells Claude the tool exists and how to drive it.

```bash
npx skills add vercel-labs/agent-browser -g
```

This writes the skill to `~/.agents/skills/agent-browser/` and links it into
`~/.claude/skills/agent-browser/`. Claude Code reads only `~/.claude/skills/`.

Start Claude Code and check:

```
/skills
```

`agent-browser` should be listed.

## 2. Get CLASH

Parts I and II start with an **empty** CLASH repository that holds only the product spec.

```bash
git clone https://github.com/pawsaw/clash
cd clash
git checkout 01-start
```

Parts III and IV work on the **reference** CLASH. You switch to it at the end of Part II:

```bash
git checkout 06-start
npm install
npm run db:migrate
npm run db:seed
npm run dev          # confirm CLASH loads on http://localhost:3000
```

> `npm install` runs `prisma generate`, which writes the Prisma client to `lib/generated/prisma`.
> That folder is gitignored. Nothing type-checks until this has run.

## 3. Create CLASH's `.env`

CLASH's `.env` is gitignored, so it never arrives with your CLASH clone. CLASH throws on start
without it.

```bash
cat > .env <<'EOT'
DATABASE_URL="file:./dev.db"
SESSION_SECRET="workshop-secret"
EOT
```

You need this on CLASH's `01-start` as soon as you add Prisma (task 02), and on every later
CLASH branch.

## 4. Seeded logins

The seed creates 8 users. All have the password **`test`**.

| Email | Name |
|---|---|
| `anna.schmidt@example.com` | Anna Schmidt |
| `lukas.mueller@example.com` | Lukas Müller |
| `sophie.weber@example.com` | Sophie Weber |
| `max.fischer@example.com` | Max Fischer |
| `emma.wagner@example.com` | Emma Wagner |
| `leon.becker@example.com` | Leon Becker |
| `mia.hoffmann@example.com` | Mia Hoffmann |
| `noah.schneider@example.com` | Noah Schneider |

Use **Anna** unless a task says otherwise.

## 5. Two settings people forget

Both are off by default. Both fail silently if you skip them.

### 5a. Turn dynamic workflows on

Inside Claude Code:

```
/config
```

Find the **Dynamic workflows** row and turn it **on**. Task 12 depends on it.

Also in `/config`, on Pro: set **Dynamic workflow size** to **small**. From v2.1.271 that is
the default. Keep `/effort` at your usual level, not `ultracode`.

### 5b. Turn agent teams on

Agent teams are experimental. Add this to `~/.claude/settings.json`:

```json
{
  "env": {
    "CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS": "1"
  }
}
```

If the file already has an `env` block, add the key inside it. Restart Claude Code.
Without this flag, task 12 silently spawns ordinary subagents instead of a team.
If you would rather not enable an experimental flag, you can watch that part.

## 6. Pre-install the MCP servers

Task 14 uses two MCP servers. Install them now so nothing downloads during the workshop.

```bash
claude mcp add playwright -- npx -y @playwright/mcp@latest
claude mcp add chrome-devtools -- npx -y chrome-devtools-mcp@latest
npx -y playwright install chromium
claude mcp list
```

`claude mcp list` should show `playwright` and `chrome-devtools`.

Task 19 builds its own MCP server inside your CLASH clone. Its package is in step 9.

## 7. Know CLASH's catch-up branches

Every task has a branch in your CLASH clone with the state at its **start**. If you fall behind,
do not debug. Reset and rejoin.

```bash
git checkout 04-start      # example: rejoin at task 04
```

Your own work stays with you: commit, or `git stash -u` before you switch (plain `git stash`
skips new files Claude created).
The full list is in [`BRANCHES.md`](BRANCHES.md).

## 8. One naming trap

CLASH has a folder `hooks/`. Those are **React hooks** (one file, `hooks/use-mobile.ts`).
**Claude Code hooks** are shell commands bound to events, configured in a project's
`.claude/settings.json`. Here that file is always CLASH's.
Both appear in this workshop. We always say which one we mean.

## 9. The MCP server package and clash-conference

Task 19 designs an MCP server inside your CLASH clone and connects a second app,
`clash-conference`, to it. CLASH's `19-start` already lists both MCP packages in its
`package.json`.

Fetch them once, in your CLASH clone, so the `npm install` in task 19 needs no network.
`--no-save` leaves `package.json` and the lock file untouched, so you can still switch
branches afterwards:

```bash
git checkout 06-start
npm install --no-save @modelcontextprotocol/server@2.1.0 @modelcontextprotocol/client@2.1.0
```

`@modelcontextprotocol/server` is the server SDK. `@modelcontextprotocol/client` is used only by
the smoke test, `mcp/smoke.ts`. Both are pinned to 2.1.0, the version the answer key was built
and tested with, and CLASH's `19-start` pins the same version. The older
`@modelcontextprotocol/sdk` is a different package. Do not install it.

**The second app comes later.** `clash-conference` is published once it is finished, and the
trainer tells you when. Until then the clash-conference repository holds no app: no
`package.json` and no `19-start` branch of its own, so the commands below stop at
clash-conference's `git checkout 19-start`. Skip them for now.

When clash-conference is out, clone it **next to** your CLASH clone, in the same parent folder:

```bash
cd ..                                                 # the folder that holds your CLASH clone
git clone https://github.com/agilino/clash-conference.git
cd clash-conference
git checkout 19-start                                 # clash-conference's 19-start
npm install
```

---

## Checklist

- [ ] `node --version` is 20 or newer
- [ ] `claude --version` is 2.1.252 or newer, and you are logged in
- [ ] `agent-browser --version` prints a version
- [ ] `/skills` lists `agent-browser`
- [ ] `git checkout 01-start` works in your clone of `pawsaw/clash`
- [ ] CLASH's `.env` exists with `DATABASE_URL` and `SESSION_SECRET`
- [ ] `/config` shows Dynamic workflows **on**
- [ ] `CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1` is set, or you plan to watch that part
- [ ] `claude mcp list` shows `playwright` and `chrome-devtools`
- [ ] `node_modules/@modelcontextprotocol/server` exists in your CLASH clone
- [ ] Once clash-conference is published (step 9): it is cloned next to your CLASH clone, on clash-conference's `19-start`, and `npm install` ran there

## Trouble?

| Symptom | Fix |
|---|---|
| Anything not covered below | Run `/doctor` inside Claude Code (or `claude doctor` in your terminal if Claude Code does not start at all) — it checks your installation and settings, reports what it finds, and asks before it fixes anything |
| `Shift+Tab` does nothing (Windows) | Known Node/Bun quirk. Use `Alt+M` to cycle permission modes instead |
| `SESSION_SECRET environment variable is not set.` | Step 3: create CLASH's `.env` |
| `Cannot find module '@/lib/generated/prisma'` | Run `npm install` again (it runs `prisma generate`) |
| `npx tsc --noEmit` fails right after a checkout | Same: the Prisma client has not been generated yet |
| Login fails for every user | Run `npm run db:seed` |
| Map tiles are blank | Expected without network. The rest of CLASH works offline |
| No workflow option in `/config` | Upgrade Claude Code to 2.1.252 or newer |
| Agent team behaves like plain subagents | Step 5b: set the flag and restart Claude Code |
| `/skills` does not list `agent-browser` | The link into `~/.claude/skills/` is missing. macOS, Linux or WSL: `ln -s ~/.agents/skills/agent-browser ~/.claude/skills/agent-browser`. Windows, in PowerShell: `New-Item -ItemType Junction -Path $HOME\.claude\skills\agent-browser -Target $HOME\.agents\skills\agent-browser` (a junction, not a symlink — no Developer Mode or admin shell needed) |

## A note on usage limits

Agent teams and dynamic workflows use many tokens. If you are on a Pro plan you may hit a
limit during task 12. That is not a setup problem. Stop the fan-out, watch the trainer's
screen, and rejoin at the next branch. Nothing later depends on your own run finishing.
