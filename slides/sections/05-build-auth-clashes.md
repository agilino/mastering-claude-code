---
layout: concept
heading: "Small steps beat big asks"
lines:
  - "One feature per message. One message per thing you can check."
  - "Big ask: build the app. Small step: build login."
  - "Each step ends with something you can click."
---

<svg viewBox="0 0 960 220" class="w-full max-w-4xl h-auto" role="img" aria-label="small steps">
  <g v-click="1">
    <rect x="40" y="40" width="880" height="50" rx="8" fill="var(--na-zinc-800)" stroke="var(--na-error-500)" stroke-width="2" />
    <text x="480" y="72" text-anchor="middle" fill="var(--na-fg)" style="font-size:17px">"Build auth, the shell, and clashes."   →   40 files, nothing to click for a long time</text>
  </g>
  <g v-click="2">
    <rect x="40" y="130" width="270" height="50" rx="8" fill="var(--na-primary-900)" stroke="var(--na-primary-500)" stroke-width="2" />
    <text x="175" y="162" text-anchor="middle" fill="var(--na-fg)" style="font-size:17px">login</text>
    <rect x="345" y="130" width="270" height="50" rx="8" fill="var(--na-primary-900)" stroke="var(--na-primary-500)" stroke-width="2" />
    <text x="480" y="162" text-anchor="middle" fill="var(--na-fg)" style="font-size:17px">shell</text>
    <rect x="650" y="130" width="270" height="50" rx="8" fill="var(--na-primary-900)" stroke="var(--na-primary-500)" stroke-width="2" />
    <text x="785" y="162" text-anchor="middle" fill="var(--na-fg)" style="font-size:17px">clashes</text>
    <text x="480" y="208" text-anchor="middle" fill="var(--na-fg-muted)" style="font-size:15px">check · commit · next</text>
  </g>
</svg>

<!--
Task 03 is the longest build. The lesson is pacing. Show the one-line big ask, then
break it into three. Each of the three ends with something you can try in the browser.
Say: if you cannot check it, the step is too big.
-->

---
layout: concept
heading: "Undo a step: /rewind"
lines:
  - "Claude saves a checkpoint before every change"
  - "/rewind shows them — pick one, files go back"
  - "Then give a better instruction. Cheaper than by hand."
---

<!--
Demo: after the shell step, run /rewind, show the list of checkpoints, pick the one
before the last step, show that the files are back. Then press Esc to cancel if you did
not really want it. Say: this is git for the conversation. Use it early, before you try
to patch a wrong direction.
-->

---
layout: concept
heading: "Watch the window fill"
lines:
  - "/context — what is in the window right now"
  - "Every file Claude read is still there"
  - "/compact keeps a summary and drops the rest"
---

<G02ContextBudget />

<!--
Run /context live after the auth and shell steps. Read the bands: system prompt,
CLAUDE.md, tool results, conversation. Say: the tool results band is the files Claude
read. It never shrinks on its own. Then /compact and run /context again. This is the
first time the group sees the window as a thing they can manage. Part III makes it a
discipline.
-->

---
layout: concept
heading: "Point, don't let it guess"
---

<G03CarelessVsEngineered />

<!--
Left: "build clashes" — Claude greps around, reads whatever it finds, guesses at the
pattern. Right: the same ask with @app/actions/auth.ts and @lib/validation.ts — Claude
reads exactly those and copies the pattern. Same model. Pointed on purpose. This is why
the clashes prompt in Task 03 is full of @ references.
-->

---
layout: code-live
heading: "The safety moment"
filePath: "prompt to Claude Code — after clashes work"
success: "Claude explains that the layout guards the page and not the action, and the ownership rule lands in CLAUDE.md."
---

```txt
requireUser() runs in app/(app)/layout.tsx.
Does that protect the deleteClash action in app/actions/clashes.ts
from being called by someone who is not the creator?

⟵ LIVE: ask for the explanation first. Then, in a second message,
        ask for the fix and the CLAUDE.md rule.
```

<!--
FULL WORKING PROMPTS (verbatim from tasks/03-auth-and-clashes.md):

1) requireUser() runs in app/(app)/layout.tsx. Does that protect the deleteClash action
   in app/actions/clashes.ts from being called by someone who is not the creator? Explain.

2) Make sure every action that changes an existing clash checks that the current user is
   the creator (creatorId === user.id) and returns an error if not.
   Then add this rule to CLAUDE.md under "Rules":
   - Every Server Action calls requireUser() and checks ownership before it changes an existing row.

Say the sentence the group must keep: a Server Action is a public endpoint with a
generated id. The layout guards the page, not the action. Zod checks shape, not
permission. Part III and IV spend a long time on exactly this rule — plant it here.
-->

---
layout: task
number: "03"
heading: "Auth and clashes"
goal: "Build login and the app shell in small steps, then clashes end to end, and make the ownership rule permanent."
mode: "you do"
success: "Login, logout and clash CRUD work, deleteClash refuses a stranger, and you used /rewind, /context and /compact."
branch: "03-start"
---

<!--
Task 03 recap. Reset: 03-start is the scaffold plus data; 04-start is auth, shell and
clashes finished. Say out loud that this is the longest task of the part and that
finishing "Now you" is optional. Watch for people who send the whole task as one prompt —
walk over and split it with them.
-->
