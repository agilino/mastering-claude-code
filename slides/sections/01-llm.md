---
layout: concept
heading: "Text becomes tokens"
lines:
  - "A model does not see words. It sees tokens."
  - "A token is a piece of text: a word, part of a word, a symbol."
---

<D01TokenChips />

<!--
Start with the smallest fact. A model never sees letters or words. Text is cut into tokens
first. Click through: "Add" is one token, "to" is one. "notifications" is rare enough to
break into two pieces, "CLASH" too. Four words, six tokens. Rule of thumb: a token is about
three quarters of a word in English. Why care? Everything is counted and paid in tokens:
the size of what you send, the size of what comes back, the limit of what fits.
-->

---
layout: concept
heading: "One token at a time"
lines:
  - "The model predicts the next token. Then the next. Then the next."
  - "Everything so far goes back in for every new token."
---

<D02NextToken />

<!--
This is the whole machine. Left: what goes in. Right: for the next token, the model has a
list of candidates with a chance each. Click: it picks "Sure", and that token joins the
input. Click again: new candidates for the token after it, and the pick joins the input.
There is no plan written down anywhere. The answer appears one piece at a time, and each
piece depends on everything before it. This is why a bad first sentence tends to become a
bad paragraph. Note the blinking cursor: it never stops to think ahead.
-->

---
layout: concept
heading: "It picks from probabilities"
lines:
  - "For every step there are many possible next tokens, each with a chance."
  - "Same prompt, different runs, different answers. That is normal."
---

<D03Temperature />

<!--
Same prompt, same candidates, two settings. Low temperature: the top pick almost always
wins, so three runs give the same file name. High temperature: the chances are spread out,
so three runs give three different names. That setting is what people call temperature.
Two things follow. First: ask the same thing twice and you may get two different answers,
and that is not a bug. Second: once a less likely token is picked, the rest of the answer
follows it. Verify outputs; do not assume they are stable.
-->

---
layout: concept
heading: "Where the knowledge comes from"
lines:
  - "Training: it read a huge amount of text, once, in the past."
  - "Using it: it reads nothing new unless you put it in front of it."
---

<div class="flex items-center gap-10 w-full justify-center">
  <div class="na-card p-6 w-80">
    <div class="text-lg font-bold mb-2">Training</div>
    <div class="text-base" style="color: var(--na-fg-muted)">Books, code, the web. Read once. Frozen after a cutoff.</div>
  </div>
  <span class="text-3xl" style="color: var(--na-zinc-600)">→</span>
  <div class="na-card p-6 w-80" style="border-color: var(--na-accent-500)">
    <div class="text-lg font-bold mb-2">Inference</div>
    <div class="text-base" style="color: var(--na-fg-muted)">Your prompt in, tokens out. No learning. No memory of yesterday.</div>
  </div>
</div>

<!--
Two very different phases. Training happened once, on a huge pile of text, and stopped at a
cutoff date. Everything the model "knows" on its own is from then. When you use it, nothing
is learned and nothing is looked up by itself. It knows an old version of Next.js from
training. It does not know your repo, your team's conventions or today's news — unless that
text is put into the prompt. That is the job of the harness, next section.
-->

---
layout: concept
heading: "It has no memory"
lines:
  - "Every turn, the whole conversation is sent again."
  - "The model reads it all from the start, every time."
---

<D04Resend />

<!--
The model itself keeps nothing between calls. What feels like memory is the program around
it sending the whole conversation again. Turn one sends the system message, your request and
the files it read. Click: turn two sends all of that plus the new message. Click: turn three
wraps both. Two consequences: cost grows with the length of the conversation, and everything
old competes for attention with everything new. This is why "start a fresh session for a
new job" is advice you will hear all week.
-->

---
layout: concept
heading: "The context window is a budget"
lines:
  - "There is a hard limit on how many tokens fit in one call."
  - "Long before the limit, quality drops. Old details get lost."
---

<D05ContextTank />

<!--
Every model has a maximum number of tokens per call: the context window. Picture a tank.
The bottom part is fixed: system prompt and CLAUDE.md, the same every call. Click through:
files read, tool output and chat pile on top while you work. A big window is not free: the
more that is in it, the more the model has to weigh, and details in the middle get less
attention. Near the top is the drift zone: the agent forgets a rule you gave early or
re-reads a file it already saw. Later you will use /context to watch this tank live.
What goes into it is your decision, and it matters more than the prompt wording.
-->

---
layout: concept
heading: "Three roles, same tokens"
lines:
  - "System: the rules of the game. Written by the harness."
  - "User: your message. Assistant: the model's answer."
---

<div class="flex flex-col gap-3 w-full max-w-2xl">
  <div class="na-card px-5 py-3 flex gap-4 items-center"><span class="font-mono text-sm w-24" style="color: var(--na-accent-500)">system</span><span style="color: var(--na-fg-muted)">You are Claude Code. Here are your tools and rules.</span></div>
  <div class="na-card px-5 py-3 flex gap-4 items-center" v-click><span class="font-mono text-sm w-24" style="color: var(--na-primary-400)">user</span><span style="color: var(--na-fg-muted)">Add a bell for notifications.</span></div>
  <div class="na-card px-5 py-3 flex gap-4 items-center" v-click><span class="font-mono text-sm w-24" style="color: var(--na-secondary-500)">assistant</span><span style="color: var(--na-fg-muted)">I will read the top bar first.</span></div>
</div>

<!--
A chat is just tokens with labels. The system message comes first and sets the rules; in
Claude Code it is written by the tool, and your CLAUDE.md is folded into it. Then user and
assistant messages alternate. The model was trained to follow the system message strongly,
the user message next, and its own earlier words after that. Knowing this, you understand
why a rule in CLAUDE.md beats a rule buried in a long chat.
-->

---
layout: concept
heading: "What it is bad at"
lines:
  - "Counting, exact arithmetic, anything with hidden state"
  - "Facts after the cutoff, and checking its own work"
---

<div class="grid grid-cols-2 gap-4 w-full max-w-3xl">
  <div class="na-card p-4"><div class="font-semibold mb-1">Counting</div><div class="text-sm" style="color: var(--na-fg-muted)">Letters hide inside tokens.</div></div>
  <div class="na-card p-4" v-click><div class="font-semibold mb-1">Hidden state</div><div class="text-sm" style="color: var(--na-fg-muted)">It cannot run code. It guesses.</div></div>
  <div class="na-card p-4" v-click><div class="font-semibold mb-1">Current facts</div><div class="text-sm" style="color: var(--na-fg-muted)">A version, a price, today's date: unknown.</div></div>
  <div class="na-card p-4" v-click><div class="font-semibold mb-1">Self-checking</div><div class="text-sm" style="color: var(--na-fg-muted)">"Are you sure?" gets a confident yes.</div></div>
</div>

<!--
Be concrete. Counting letters fails because it never sees letters. Arithmetic on long
numbers fails for the same reason. It cannot execute code mentally, so "does this loop
terminate" is a guess. It does not know what changed in a library since training. And
asking it to double-check itself mostly produces confident agreement. Every one of these
has a fix, and the fix is always the same: give it a tool. A calculator, a test runner, the
docs, a browser. That is what Claude Code is: a model with tools.
-->

---
layout: concept
heading: "Fluent is not the same as true"
lines:
  - "The model always produces something that reads well."
  - "Grounding beats guessing: show it the file, do not ask it to recall."
---

<div class="flex gap-6 w-full max-w-3xl">
  <div class="na-card p-5 flex-1" style="border-color: var(--na-error-500)">
    <div class="font-mono text-xs mb-2" style="color: var(--na-error-500)">guessing</div>
    <div class="text-base">"What does lib/notify.ts export?"</div>
    <div class="text-sm mt-2" style="color: var(--na-fg-muted)">Answer from training. Plausible. Maybe wrong.</div>
  </div>
  <div class="na-card p-5 flex-1" v-click style="border-color: var(--na-success-500)">
    <div class="font-mono text-xs mb-2" style="color: var(--na-success-500)">grounded</div>
    <div class="text-base">"Read @lib/notify.ts. What does it export?"</div>
    <div class="text-sm mt-2" style="color: var(--na-fg-muted)">Answer from the file. Checkable.</div>
  </div>
</div>

<!--
The word people use is hallucination. A better word is fluency without grounding: the model
makes text that fits the pattern, whether or not it is true. The cure is not a better model.
It is putting the truth in front of it. Left side: a question answered from memory. Right
side: the same question after the file is in the window. All week the pattern is the same —
files, test output, browser screenshots into the window; then the answer is checkable.
-->

---
layout: concept
heading: "A model can ask for a tool"
lines:
  - "Instead of an answer, it can write a request: run this tool, with these inputs."
  - "Then it stops. Something else has to run it."
---

<D06ToolCall />

<!--
Here is the bridge to the next section. The model has two ways to answer. Click: output A,
a plain answer, a guess from training. Click: output B, a structured request: run the tool
"ls" on "lib/". Modern models are trained to write these. Click: then it stops. It cannot
run anything. Click: someone has to execute the call, collect the output, and send it back
in as the next message. That someone is the harness. Without it, a model is a very good
autocomplete. With it, the model becomes an agent that reads, edits and runs code.
-->

