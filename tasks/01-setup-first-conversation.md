# Task 01 — Setup and first conversation

> Part: Foundations · Reset branch: `01-start`

## You will end up with

Claude Code running inside an almost empty CLASH repository. You have asked it
questions about the product spec, and a first `CLAUDE.md` exists.

## Why

Everything in this workshop happens in one terminal, in one repository, with one tool.
Before you build anything, you get comfortable talking to Claude Code about code that
does not exist yet. That is the safest place to learn how it thinks.

## Do this

1. Check Node and git. You need Node 20 or newer.
   ```bash
   node --version
   git --version
   ```
2. Install Claude Code and log in. You need version 2.1.252 or newer. Part II also uses the
   GitHub CLI (`gh`); install it now if you do not have it.

   On macOS, Linux or WSL:
   ```bash
   curl -fsSL https://claude.ai/install.sh | bash
   ```
   On Windows, in PowerShell:
   ```powershell
   irm https://claude.ai/install.ps1 | iex
   ```
   Then, on every system:
   ```bash
   claude --version
   claude
   ```
   If `claude` is not found, open a new terminal and try again. The first start opens a browser window for login. Come back to the terminal when it says you are logged in. Type `/exit` to leave.
   If the installer does not work for you, `npm install -g @anthropic-ai/claude-code` installs the same program.
3. Install agent-browser. Claude will use it later to look at your app.
   ```bash
   npm install -g agent-browser
   agent-browser install
   ```
4. Clone CLASH and switch to the empty starting branch.
   ```bash
   git clone https://github.com/pawsaw/clash
   cd clash
   git checkout 01-start
   ls
   ```
   You should see only `README.md`, `docs/`, and `.gitignore`. Nothing else. That is correct.
5. Start Claude Code inside the repository.
   ```bash
   claude
   ```
6. Ask about the spec. Type this as your first message:
   ```
   Read @docs/SPEC.md. In one sentence, what does this app do?
   ```
   Watch the screen. Claude first reads the file (you see a `Read` line), then answers.
7. Ask about the data.
   ```
   Which five kinds of records does the spec describe, and how do they point to each other?
   Answer as a short list.
   ```
8. Ask for an opinion.
   ```
   Which screen in the spec will be the hardest to build, and why? Two sentences.
   ```
9. Let Claude write its own notes file.
   ```
   /init
   ```
   Claude creates `CLAUDE.md`. This file is read at the start of every conversation.
   Open it in your editor. It is short because the repository is almost empty.
10. Clear the conversation and look at the help.
    ```
    /clear
    /help
    ```
    `/clear` forgets the conversation. `CLAUDE.md` stays. Scroll through `/help` once. You do not need to remember it.

## Now you

- Ask Claude two more questions about the spec that you really want answered.
- Open `/config` and look at the options. Change nothing yet.
- Run `/usage` and read what it shows.

## Check

- [ ] `claude --version` prints a version
- [ ] `git branch` shows `01-start` in your `clash` folder
- [ ] Claude answered a question about `docs/SPEC.md` and you saw it read the file first
- [ ] `CLAUDE.md` exists in the repository root
- [ ] You ran `/clear` and `/help`

## Stuck?

`git checkout 01-start` — README, `docs/SPEC.md`, `.gitignore`. Nothing else.

## Go further

Ask Claude to find a gap or a contradiction in the spec. Decide if it is right.

## Links

- Quickstart — https://code.claude.com/docs/en/quickstart
- How Claude Code works — https://code.claude.com/docs/en/how-claude-code-works
- Setup — https://code.claude.com/docs/en/setup
- Memory and CLAUDE.md — https://code.claude.com/docs/en/memory
- Commands — https://code.claude.com/docs/en/commands
- Keyboard shortcuts — https://code.claude.com/docs/en/interactive-mode
- agent-browser — https://github.com/vercel-labs/agent-browser
