---
layout: concept
heading: "Text becomes tokens"
lines:
  - "A model does not see words. It sees tokens."
  - "A token is a piece of text: a word, part of a word, a symbol."
---

<D01TokenChips />

<a v-click="7" href="https://www.youtube.com/watch?v=zduSFxRajkE" target="_blank" rel="noopener noreferrer" title="Karpathy — Let's build the GPT Tokenizer (2h13m)" style="position: absolute; right: 4rem; bottom: 2.25rem; display: inline-flex; align-items: center; gap: 0.4rem; font-size: 0.875rem; font-weight: 500; color: var(--na-fg-muted); text-decoration: none; opacity: 0.8;">🎥 video</a>

---
layout: concept
heading: "One token at a time"
lines:
  - "The model predicts the next token. Then the next. Then the next."
  - "Everything so far goes back in for every new token."
---

<D02NextToken />

---
layout: concept
heading: "It picks from probabilities"
lines:
  - "For every step there are many possible next tokens, each with a chance."
  - "Same prompt, different runs, different answers. That is normal."
---

<D03Temperature />

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
  <span v-click="1" class="text-3xl" style="color: var(--na-zinc-600)">→</span>
  <div v-click="1" class="na-card p-6 w-80" style="border-color: var(--na-accent-500)">
    <div class="text-lg font-bold mb-2">Inference</div>
    <div class="text-base" style="color: var(--na-fg-muted)">Your prompt in, tokens out. No learning. No memory of yesterday.</div>
  </div>
</div>

---
layout: concept
heading: "It has no memory"
lines:
  - "Every turn, the whole conversation is sent again."
  - "The model reads it all from the start, every time."
---

<D04Resend />

---
layout: concept
heading: "The context window is a budget"
lines:
  - "There is a hard limit on how many tokens fit in one call."
  - "Long before the limit, quality drops. Old details get lost."
---

<D05ContextTank />

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

---
layout: concept
heading: "A model can ask for a tool"
lines:
  - "Instead of an answer, it can write a request: run this tool, with these inputs."
  - "Then it stops. Something else has to run it."
---

<D06ToolCall />

