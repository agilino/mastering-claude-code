<!-- @note: flags-change-how-a-session-starts -->
Say:
- Two different kinds of flag: what a session can do, and which session opens
- [click] --settings stacks above your own files, below managed — good for a one-off experiment
- [click] -p answers and exits. No conversation left running
- [click] --resume and --continue are the next two slides

<!-- @note: print-mode-no-interaction-just-an-answer -->
> Do:
> - FULL WORKING SOLUTION (trainer only): claude -p "what does package.json say the app is called?"
>   claude -p "list every route under app/(app)/" --output-format json

Say:
- This is what a script or another program calls — no terminal UI, no back-and-forth
- --output-format json gives you something you can pipe into another tool
- The "never claude -p in CI" rule from the GitHub Actions module is about that one YAML step, not this

<!-- @note: pick-up-where-you-left-off -->
Say:
- Most days you want --continue: same folder, pick straight back up
- [click] --resume is for choosing: a different session, or one you left running in the background
