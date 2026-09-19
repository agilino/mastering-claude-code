<!-- @note: install-and-log-in -->
- Demo live in an empty folder
- One global install, one command to start
- The docs now lead with a native installer (curl or PowerShell one-liner); npm installs the same program and works on every OS, so the workshop uses npm
- First start opens a login in the browser
- Say once: Claude Code runs in your terminal, inside the folder you start it in
- That folder is its world — it reads and edits there
- CLAUDE.md files in that folder are picked up automatically

<!-- @note: the-prompt-is-a-chat-in-your-terminal -->
- Show a real turn
- Point at the tool lines as they appear — the loop from the last section, live
- Read, then Glob, then an answer
- Press Esc while it works — stops the turn, keeps the conversation
- Ctrl+C twice quits Claude Code entirely

<!-- @note: point-at-files-with -->
- Type @ and a path; tab completes it
- File goes straight into the prompt
- Contrast: "find the spec and read it" — model greps around, reads a few wrong files, all of it lands in context too
- Pointing is cheaper and more precise
- First context-engineering habit — starts right away

<!-- @note: slash-commands -->
- Slash command = instruction to Claude Code itself
- /help lists them
- /init reads the project, writes a starter CLAUDE.md
- /clear empties the session
- [click] /context draws the bars from the harness section with real numbers — run it now, on the tiny session you just had, read the lines aloud
- [click] /cost shows what this session spent
- [click] /rewind takes files and conversation back to an earlier point — Claude Code checkpoints before every change

<!-- @note: the-permission-prompt -->
- Trigger one live — ask it to install a package
- In auto mode no prompt appears — press Shift+Tab once to reach manual first
- Read the three options
- Option two writes a rule into settings — allows this class of command from now on
- Option three lets you type a correction
- Bash prompts can show one more choice, "Yes, and switch to auto mode" — name it, don't pick it
- Shift+Tab cycles the modes: auto → manual → accept edits → plan → back to auto. Pro, Max and Team sessions start in auto; API-key and Enterprise sessions start in manual — and so can the first session right after installing
- Accept-edits stops asking for file edits; plan mode is read-only
- Plan mode gets used a lot from the next part on

<!-- @note: claude-md-is-your-standing-instruction -->
- Open the file /init produced
- Starting point, not the final word
- Rule of thumb: telling Claude the same thing again in a new session → it belongs in CLAUDE.md
- Keep it short — every line is in every prompt
- Build part: add a rule each time the app teaches you one

<!-- @note: in-your-editor -->
- Mention only, don't demo at length
- [click] IDE extensions run the same Claude Code
- Edits show as inline diffs; current file and selection passed as context
- Everyone can pick their own surface
- Workshop uses the terminal — same everywhere

<!-- @note: keys-worth-knowing -->
- Demo: Esc during a turn, Shift+Tab for the mode, Tab after @ to complete a path
- "?" on an empty prompt line shows the rest of the shortcuts
- No keystroke saves to CLAUDE.md — ask Claude to add a line, or edit the file yourself

<!-- @note: your-first-conversation -->
- FULL WORKING PROMPT (trainer):

Read @docs/SPEC.md. In one sentence, what does this app do?

Which five kinds of records does the app need? Say how they connect to each other.

Which screen looks hardest to build, and why?

- Then run /init and open the CLAUDE.md it writes
- Show it's short and that it points at the spec
- Then /context: point at the CLAUDE.md line and the spec line — first time the group sees the bars with real numbers

<!-- @note: setup-and-first-conversation -->
- Task 01
- Everyone installs, clones pawsaw/clash, checks out 01-start — repo with only the spec in it
- Then the first conversation and /init
- Walk the group while people work
- Usual blockers: Node version (CLASH needs 20+), login. An EBADENGINE warning while npm installs Claude Code is harmless — it still runs
- Nobody moves on until Claude Code runs in their clone and CLAUDE.md exists
