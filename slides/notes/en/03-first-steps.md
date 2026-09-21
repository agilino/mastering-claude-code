<!-- @note: install-and-log-in -->
> Do:
> - tasks/01-setup-first-conversation.md step 2, then back to the slides
> - Demo live in an empty folder
> - Say once

Say:
- One global install, one command to start
- The docs now lead with a native installer (curl or PowerShell one-liner); npm installs the same program and works on every OS, so the workshop uses npm
- First start opens a login in the browser
- Claude Code runs in your terminal, inside the folder you start it in
- That folder is its world — it reads and edits there
- CLAUDE.md files in that folder are picked up automatically

<!-- @note: the-prompt-is-a-chat-in-your-terminal -->
> Do:
> - Show a real turn in Claude, in the Clash repo
> - Point at the tool lines as they appear — the loop from the last section, live
> - Tool choice varies run to run — same probabilities lesson as two slides ago. If it picks Bash, the permission prompt is the gate from that section, live too
> - Press Esc while it works — stops the turn, keeps the conversation
> - Esc twice on an idle prompt opens the rewind menu instead — don't double-tap it right after stopping a turn
> - Ctrl+C twice from an idle prompt exits — mid-turn, the first press interrupts instead, like Esc

Say:
- Whatever tools appear — Read, Glob, Grep, Bash — is the loop from the last section, live

<!-- @note: point-at-files-with -->
> Do:
> - Previews tasks/01-setup-first-conversation.md step 6

Say:
- Type @ and a path; tab completes it
- File goes straight into the prompt
- Contrast: "find the spec and read it" — model greps around, reads a few wrong files, all of it lands in context too
- Pointing is cheaper and more precise
- First context-engineering habit — starts right away

<!-- @note: slash-commands -->
> Do:
> - tasks/01-setup-first-conversation.md steps 9-10 run /init, /clear and /help now — read the lines aloud
> - /context, /usage and /rewind are only named here — /context is demoed later in this task, /usage in "Now you", /rewind in Task 03

Say:
- Slash command = instruction to Claude Code itself
- /help lists them
- /init reads the project, writes a starter CLAUDE.md
- /clear empties the session
- [click] /context draws the bars from the harness section with real numbers
- [click] /usage shows what this session spent
- [click] /rewind takes files and conversation back to an earlier point — Claude Code checkpoints before every change

<!-- @note: the-permission-prompt -->
> Do:
> - Trigger one live — ask it to install a package
> - Press Shift+Tab once to reach manual first
> - Read the three options
> - Name it, don't pick it

Say:
- In auto mode no prompt appears
- Option two writes a rule into settings — allows this class of command from now on
- Option three lets you type a correction
- Bash prompts can show one more choice, "Yes, and switch to auto mode"
- Shift+Tab cycles the modes: auto → manual → accept edits → plan → back to auto. Pro, Max and Team sessions start in auto; API-key and Enterprise sessions start in manual — and so can the first session right after installing
- Accept-edits stops asking for file edits; plan mode is read-only
- Plan mode gets used a lot from the next part on

<!-- @note: claude-md-is-your-standing-instruction -->
> Do:
> - Open the file /init produced
> - Keep it short — every line is in every prompt

Say:
- Starting point, not the final word
- Rule of thumb: telling Claude the same thing again in a new session → it belongs in CLAUDE.md
- Build part: add a rule each time the app teaches you one

<!-- @note: in-your-editor -->
> Do:
> - Mention only, don't demo at length

Say:
- [click] IDE extensions run the same Claude Code
- Edits show as inline diffs; current file and selection passed as context
- Everyone can pick their own surface
- Workshop uses the terminal — same everywhere

<!-- @note: keys-worth-knowing -->
> Do:
> - Demo: Esc during a turn, Shift+Tab for the mode, Tab after @ to complete a path

Say:
- "?" on an empty prompt line shows the rest of the shortcuts
- No keystroke saves to CLAUDE.md directly — the old # shortcut for that is gone. Ask Claude in words, or edit the file yourself

<!-- @note: your-first-conversation -->
> Do:
> - FULL WORKING PROMPT (trainer), three separate messages:
>   - Read @docs/SPEC.md. In one sentence, what does this app do?
>   - Which five kinds of records does the app need? Say how they connect to each other.
>   - Which screen looks hardest to build, and why?
> - Then run /init and open the CLAUDE.md it writes
> - Show it's short and that it points at the spec
> - Then /context: point at the CLAUDE.md line and the spec line — first time the group sees the bars with real numbers

Say:
- CLAUDE.md and the spec line are already inside every prompt — the budget from Part I, now with real numbers

<!-- @note: setup-and-first-conversation -->
> Do:
> - Everyone installs, clones pawsaw/clash, checks out 01-start — repo with only the spec in it
> - Then the first conversation and /init
> - Watch the chat while people work
> - Watch for people who never press Enter on the permission prompt, or who type in the terminal while Claude works
> - Usual blockers: Node version (CLASH needs 20+), login. An EBADENGINE warning while npm installs Claude Code is harmless — it still runs
> - Nobody moves on until Claude Code runs in their clone and CLAUDE.md exists

Say:
- Install, clone, first questions about the spec, then /init
- Done when: Claude Code runs in your clone, it answered your questions, and CLAUDE.md exists
