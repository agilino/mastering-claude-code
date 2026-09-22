<!-- @note: text-becomes-tokens -->
> Do:
> - Click through the examples
> - platform.openai.com/tokenizer — open it live if there is time, let people paste their own name
> - One more click reveals the video link, bottom right — point at it, tell the group not to watch it now

Say:
- Model never sees letters or words — text is cut into tokens first
- [click] "Add" is one token, "to" is one token; "notifications" and "CLASH" are rare enough to break into two pieces each
- [click:6] Four words, six tokens
- Rule of thumb: a token is about three quarters of a word in English — newer Claude models cut the same text into more tokens
- Why care: everything is counted and paid in tokens — size of what you send, size of what comes back, the limit of what fits

<!-- @note: one-token-at-a-time -->
> Do:
> - Note the blinking cursor
> - Say it twice: no plan is written down anywhere

Say:
- This is the whole machine: left = what goes in, right = candidates for the next token, each with a chance
- [click] it picks "Sure", that token joins the input
- [click] new candidates for the token after it, the pick joins the input
- No plan is written down anywhere — the answer appears one piece at a time, each piece depends on everything before it
- Why a bad first sentence tends to become a bad paragraph
- No hidden pause to think silently — "Thinking" (on by default in Claude Code) is the same one-token-at-a-time trick, just writing reasoning tokens before the answer tokens

<!-- @note: it-picks-from-probabilities -->
Say:
- [click] Same prompt, same candidates, two settings — this is temperature
- [click] Low temperature: the top pick almost always wins, so three runs give the same file name
- [click] High temperature: the chances are spread out, so three runs give three different names
- Consequence 1: ask the same thing twice, get two different answers — not a bug
- Consequence 2: once a less likely token is picked, the rest of the answer follows it
- Verify outputs; do not assume they are stable

<!-- @note: where-the-knowledge-comes-from -->
Say:
- Two very different phases: training and use
- Training happened once, on a huge pile of text, stopped at a cutoff date — everything the model "knows" on its own is from then
- [click] When you use it: nothing is learned, nothing is looked up by itself
- Example: it knows an old version of Next.js from training
- Doesn't know your repo, your team's conventions or current news — unless that text is put into the prompt
- That's the harness's job, next section

<!-- @note: it-has-no-memory -->
> Do:
> - Slow down — single most important idea of the workshop

Say:
- The model itself keeps nothing between calls
- What feels like memory is the program around it sending the whole conversation again
- Turn one sends the system message, your request and the files it read
- [click] turn two sends all of that plus the new message
- [click] turn three wraps both
- Consequence 1: cost grows with the length of the conversation
- Consequence 2: everything old competes for attention with everything new
- Why "start a fresh session for a new job" is advice you'll hear throughout the workshop

<!-- @note: the-context-window-is-a-budget -->
> Do:
> - Click through the stack

Say:
- Every model has a maximum number of tokens per call: the context window — picture a tank
- [click] Bottom part is fixed: system prompt and CLAUDE.md, the same every call
- [click] Files read, tool output and chat pile on top while you work
- A big window is not free: the more that's in it, the more the model has to weigh, details in the middle get less attention
- [click:5] Near the top: the drift zone — the agent forgets a rule given early, or re-reads a file it already saw. Claude Code auto-compacts before the window is full; early instructions can get lost then too
- Later: use /context to watch this tank live
- What goes into it is your decision, and it matters more than the prompt wording

<!-- @note: three-roles-same-tokens -->
Say:
- A chat is just tokens with labels
- System message comes first and sets the rules — in Claude Code it's written by the tool; your CLAUDE.md loads after it, as a user message
- [click] Then user and assistant messages alternate
- Model was trained to follow the system message strongly, the user message next, its own earlier words after that
- Why a rule in CLAUDE.md beats a rule buried in a long chat — it's reloaded fresh every session, and it survives /compact

<!-- @note: what-it-is-bad-at -->
> Do:
> - Be concrete about the limits

Say:
- Counting letters fails — it never sees letters
- Arithmetic on long numbers fails for the same reason
- [click] Can't execute code mentally, so "does this loop terminate" is a guess
- [click] Doesn't know what changed in a library since training
- [click] Asking it to double-check itself mostly produces confident agreement
- Every one of these has the same fix: give it a tool — a calculator, a test runner, the docs, a browser
- That's what Claude Code is: a model with tools

<!-- @note: fluent-is-not-the-same-as-true -->
Say:
- The word people use: hallucination — a better word: fluency without grounding
- Model makes text that fits the pattern, whether or not it's true
- The cure is not a better model — it's putting the truth in front of it
- Left side: a question answered from memory
- [click] Right side: the same question after the file is in the window
- Pattern for the whole workshop: files, test output, browser screenshots into the window — then the answer is checkable

<!-- @note: a-model-can-ask-for-a-tool -->
Say:
- Bridge to the next section: the model has two ways to answer
- [click] output A, a plain answer, a guess from training
- [click] output B, a structured request — run the tool "ls" on "lib/"
- Modern models are trained to write these
- [click] then it stops — it cannot run anything
- [click] someone has to execute the call, collect the output, and send it back in as the next message — that someone is the harness
- Without it: a model is a very good autocomplete
- With it: the model becomes an agent that reads, edits and runs code
