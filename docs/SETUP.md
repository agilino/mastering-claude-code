# Setup — do this before the workshop starts

Everything here is a one-time install. Do it on a network you trust, not on the
workshop wifi. If something fails, see the table at the end.

---

## 1. Tools

| Tool | How to check | How to install |
|---|---|---|
| Node.js 20 or newer | `node --version` | https://nodejs.org |
| git | `git --version` | https://git-scm.com |
| Claude Code | `claude --version` | `npm install -g @anthropic-ai/claude-code` then `claude` and log in |
| agent-browser | `agent-browser --version` | `npm install -g agent-browser && agent-browser install` |
| GitHub CLI (Part II, IV) | `gh --version` | https://cli.github.com then `gh auth login` |

Claude Code must be **2.1.252 or newer**. Older builds miss `/workflow-authoring` and `/skill-doctor`.

## 2. Get the codebase

Parts I and II start with an **empty** repository that holds only the product spec.

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
npm run dev          # confirm http://localhost:3000 loads
```

> `npm install` runs `prisma generate`, which writes the Prisma client to `lib/generated/prisma`.
> That folder is gitignored. Nothing type-checks until this has run.

## 3. Create `.env`

`.env` is gitignored, so it never arrives with the clone. The app throws on start without it.

```bash
cat > .env <<'EOT'
DATABASE_URL="file:./dev.db"
SESSION_SECRET="workshop-secret"
EOT
```

You need this on `01-start` as soon as you add Prisma (task 02), and on every later branch.

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

Find the **Dynamic workflows** row and turn it **on**. Task 09 depends on it.

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
Without this flag, task 09 silently spawns ordinary subagents instead of a team.
If you would rather not enable an experimental flag, you can watch that part.

## 6. Pre-install the MCP servers

Task 11 uses two MCP servers. Install them now so nothing downloads during the workshop.

```bash
claude mcp add playwright -- npx -y @playwright/mcp@latest
claude mcp add chrome-devtools -- npx -y chrome-devtools-mcp@latest
npx -y playwright install chromium
claude mcp list
```

`claude mcp list` should show `playwright` and `chrome-devtools`.

## 7. Know the catch-up branches

Every task has a branch with the state at its **start**. If you fall behind, do not debug. Reset and rejoin.

```bash
git checkout 04-start      # example: rejoin at task 04
```

Your own work stays with you: commit, or `git stash -u` before you switch (plain `git stash`
skips new files Claude created).
The full list is in [`BRANCHES.md`](BRANCHES.md).

## 8. One naming trap

CLASH has a folder `hooks/`. Those are **React hooks** (one file, `hooks/use-mobile.ts`).
**Claude Code hooks** are shell commands bound to events, configured in `.claude/settings.json`.
Both appear in this workshop. We always say which one we mean.

---

## Checklist

- [ ] `node --version` is 20 or newer
- [ ] `claude --version` is 2.1.252 or newer, and you are logged in
- [ ] `agent-browser --version` prints a version
- [ ] `git checkout 01-start` works in your clone of `pawsaw/clash`
- [ ] `.env` exists with `DATABASE_URL` and `SESSION_SECRET`
- [ ] `/config` shows Dynamic workflows **on**
- [ ] `CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1` is set, or you plan to watch that part
- [ ] `claude mcp list` shows `playwright` and `chrome-devtools`

## Trouble?

| Symptom | Fix |
|---|---|
| `SESSION_SECRET environment variable is not set.` | Step 3: create `.env` |
| `Cannot find module '@/lib/generated/prisma'` | Run `npm install` again (it runs `prisma generate`) |
| `npx tsc --noEmit` fails right after a checkout | Same: the Prisma client has not been generated yet |
| Login fails for every user | Run `npm run db:seed` |
| Map tiles are blank | Expected without network. The rest of the app works offline |
| No workflow option in `/config` | Upgrade Claude Code to 2.1.252 or newer |
| Agent team behaves like plain subagents | Step 5b: set the flag and restart Claude Code |

## A note on usage limits

Agent teams and dynamic workflows use many tokens. If you are on a Pro plan you may hit a
limit during task 09. That is not a setup problem. Stop the fan-out, watch the trainer's
screen, and rejoin at the next branch. Nothing later depends on your own run finishing.
