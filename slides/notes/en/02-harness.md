<!-- @note: the-model-alone-is-a-function -->
Say:
- Model = a pure function: a list of tokens in, a list of tokens out
- No files, no terminal, no memory of its own
- [click] Everything you experience as "Claude Code" — reading your repo, editing files, running tests, asking for permission, remembering your rules — is done by a program wrapped around that function
- We call that program the harness
- This section covers every part of the harness — each part is a lever you control

<!-- @note: the-loop -->
> Do:
> - Walk the ring click by click
> - Say it twice
> - Docs link: open it, scroll to "The agentic loop", then back to the slides

Say:
- [click] you type "fix the bell" — harness builds the full prompt (next slide shows what's in it)
- [click] harness calls the model; the model reasons, then either asks for a tool or answers
- [click] the tool request hits the permission gate
- [click] harness runs the tool — the model never runs anything itself
- [click] the result is appended to the prompt, ring goes round again — call model
- [click] at some point the model answers with text instead of a tool request — that's the exit, the turn ends, you read it
- The model chooses, the harness executes
- Every result stays in the window from now on

<!-- @note: what-is-in-the-prompt-every-turn -->
> Do:
> - Open the box, one block per click

Say:
- [click] the system prompt Claude Code writes
- [click] your CLAUDE.md files — project and personal
- [click] the list of tools, with their descriptions
- [click] a short index of skills, one line each
- [click] the whole history of this session — every file it read, every command output — already sent in the previous call, so the provider serves it from cache: much cheaper and faster
- [click] your newest message and the newest tool result — that tail is the only part paid in full
- The history block is the one that grows
- Later: /context shows these blocks with real numbers

<!-- @note: the-tools -->
Say:
- Core tool set is small and boring on purpose
- Read, Edit, Write — files
- Bash — anything a terminal can do: tests, builds, git
- [click] Grep and Glob — searching
- [click:3] Agent — starts another loop with its own context (subagents, covered later)
- [click] WebFetch — pulls a page in
- MCP — adds tools from outside: a browser, a database, your ticket system
- Model sees each tool's name, description, and input schema; it picks from the description and fills arguments from the schema
- That's why tool descriptions and skill descriptions are written so carefully

<!-- @note: permissions -->
Say:
- A tool call arrives at the gate
- [click] harness checks your rules in settings first
- [click] a rule can allow it ("npm test is always fine") or deny it ("never rm") — harness runs the tool, or nothing runs and the model is told why
- [click] no rule? the permission prompt asks you — your yes or no takes the same two paths
- The modes, one per click:
  - [click] Manual — asks before edits and commands
  - [click] Accept edits — file edits go through, plus common filesystem commands (mkdir, rm, mv, cp...); other shell commands still ask
  - [click] Plan mode — read only: the model can look but not touch; edits stay blocked until you approve the plan — good for thinking before building
  - [click] Auto — a classifier reviews each action and blocks the risky ones instead of asking you
  - [click] Bypass — skips almost every prompt (use only in a sandbox); a few things still ask, like rm -rf on your home or project folder
- The gate is the whole point: nothing dangerous happens without a decision — a rule's or yours

<!-- @note: hooks -->
Say:
- Same ring, now three places where the harness lets you in
- [click] PreToolUse — runs your shell command before the tool; exit code 2 blocks the call, and what you print to stderr is handed to the model as the reason
- [click] PostToolUse — runs after the tool; the tool already ran, so exit 2 can't undo it — instead the stderr goes to the model, which then fixes its own work
  - Example: after every edit under app/actions, a hook runs the type checker; it fails; the model sees the error and repairs the code
- [click] Stop — runs when the model wants to end the turn; exit code 2 refuses, and the model keeps working
- Any other exit code only logs — only exit code 2 blocks a hook
- A rule in CLAUDE.md is advice. A hook is law
- Part four builds these

<!-- @note: subagents -->
Say:
- Reminder: every tool result stays in the window — reading twenty files to answer one question fills the main window with twenty files
- A subagent is the harness starting a second loop with its own window
- [click] it reads and greps in there — that window fills up, yours barely moves
- [click] only its final report crosses back — one message
- You can give a subagent fewer tools, a different model, its own instructions
- [click] a fork is the same idea, but it starts with a copy of your conversation so far — cheaper when it needs what you already know
- Part three uses a subagent to audit CLASH

<!-- @note: skills-and-mcp -->
Say:
- Two more parts of the harness, both built in later parts
- A skill is a recipe you write once: "how we add a feature in this repo"
- Only its name and description sit in every prompt; the full text loads when the description matches your request — keeps the window cheap
- [click] MCP is a standard for tool servers — Claude Code lists their tool names like its own, but by default keeps full schemas deferred until needed
- Install a browser MCP server and the model can click through your app
- Install a database one and it can query production — exactly why permissions and hooks matter

<!-- @note: where-cost-and-control-come-from -->
> Do:
> - Pull it together

Say:
- Cost is tokens
- Input tokens every call, output tokens every answer
- The cached front part is much cheaper than the rest — long sessions with a stable front and a short tail are the cheap ones
- Control is three questions you keep coming back to:
  - What is in the window right now?
  - Which tools can the model call?
  - Which rules are enforced by a hook rather than hoped for in a prompt?
- One of those questions, right now: what happens when the window fills up

<!-- @note: when-the-window-fills-compact-or-clear -->
> Do:
> - Nobody has installed anything yet — name the commands, don't run them
> - Say plainly that the real, live version comes right after this section

Say:
- Three tanks — first: a session near the limit — files read, tool output, chat
- [click] /compact — asks the model to summarise the conversation, then replaces the history with that summary
  - Claude Code does this on its own near the limit: first drops old tool outputs, then summarises
  - It works, and it loses detail; compacting is itself a large request, because the model reads everything it summarises
- [click] /clear — empties the window and starts a new session with the same CLAUDE.md; the old conversation stays on disk, /resume reopens it
- For a new job, /clear is usually better: nothing from the old job leaks in
- Habit to build: one job per session

<!-- @note: a-question-that-skips-the-loop -->
> Do:
> - Nobody has installed anything yet — describe it, don't run it
> - Same "we'll do this for real in a moment" framing as the last slide

Say:
- Same loop as before — nothing about it changes
- [click] A side question goes straight to the model — a /btw square next to You, a direct line to Model, no trip around the ring
- A side question answers only from what's already in the conversation: your messages, Claude's replies, the tool results already gathered
- No tools, no permission gate, no new turn — it can't read a new file or run a command
- If a turn is already running, it keeps going underneath — asking a side question does not interrupt it
- Good for: "what was that config file called again?" — without losing your place

<!-- @note: install-and-log-in -->
> Do:
> - Paste the install link from the top of the slide into the Teams chat, so people can click it directly
> - Everyone installed this before the workshop (docs/SETUP.md) — say so plainly, this is a recap, not asking for a fresh install
> - Open your own terminal live in an empty folder and start it
> - Now make the last two slides real, in this order: /context (see the tank), a side question with /btw about what you see, then /clear (empty it)
> - Close with the line on the next slide

Say:
- One global install, one command to start
- The docs lead with a native installer (curl or PowerShell one-liner) — that is the link on the slide, and what the pre-flight in docs/SETUP.md uses. npm installs the same native binary and works on every OS — it is the fallback shown below
- First start opens a login in the browser
- Claude Code runs in your terminal, inside the folder you start it in
- That folder is its world — it reads and edits there
- CLAUDE.md files in that folder are picked up automatically

<!-- @note: the-model-is-the-same-for-everyone-the-harness-is-where-you-win -->
> Do:
> - Leave it up for a moment

Say:
- Everyone in this workshop has access to the same model — nobody gets a smarter one
- The difference between "it drifted off track" and "it shipped the feature with tests" is entirely in the harness: the context you gave it, the tools you allowed, the rules you enforced
- That is what the rest of the workshop teaches
