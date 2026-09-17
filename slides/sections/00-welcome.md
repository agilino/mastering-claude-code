---
layout: concept
---

<div class="flex flex-col items-center gap-8 text-center">
  <img src="/brand/nalogo.png" alt="nextacademy.io" class="w-20 h-20" />
  <div>
    <h1 class="!mb-2">Mastering Claude Code</h1>
    <p class="text-2xl" style="color: var(--na-fg-muted)">
      Learn What's Next. <span style="color: var(--na-primary-400); font-weight: 700">Today.</span>
    </p>
  </div>
  <div class="text-lg" style="color: var(--na-fg-muted)">
    <div>Adam Furmanczuk · nextacademy.io</div>
    <div class="mt-2">From your first prompt to black belt. One real app.</div>
  </div>
</div>

<!--
Welcome. Say the promise in one breath: you arrive as a beginner, you leave able to run
Claude Code like a senior engineer runs a team. Everything happens on one real app, CLASH,
which you will build yourself first and then push to its limits. Nothing here is a slideshow
you watch — every part ends with you at your own keyboard.
-->

---
layout: concept
heading: "Your trainer"
---

<div class="flex items-center gap-10 w-full justify-center">
  <img
    src="/brand/adam-furmanczuk.webp"
    alt="Adam Furmanczuk"
    class="w-40 h-40 rounded-lg object-cover shrink-0"
    style="border: 2px solid var(--na-accent-500)"
  />
  <div class="max-w-xl">
    <div class="text-3xl font-bold" style="color: var(--na-fg)">Adam Furmanczuk</div>
    <div class="text-lg font-semibold mt-1" style="color: var(--na-accent-500)">
      Software Architect &amp; Pragmatic Engineering Coach
    </div>
    <p class="text-lg mt-4" style="color: var(--na-fg-muted)">
      15+ years building systems in banking, healthcare and robotics.
      Trains teams in agentic coding with Claude Code, spec first.
    </p>
  </div>
  <div class="flex flex-col items-center gap-2 shrink-0">
    <div class="na-card p-2">
      <img src="/diagrams/qr/linkedin.svg" alt="QR code linking to LinkedIn" class="w-28 h-28" />
    </div>
    <span class="font-mono text-xs" style="color: var(--na-fg-muted)">linkedin.com/in/adam-agilino</span>
  </div>
</div>

<!--
One breath: who you are. Fifteen-plus years as a software architect in banking, healthcare
and robotics, systems from first commit to enterprise scale, teams up to 120 developers.
Today you train engineering teams in agentic coding with Claude Code, spec first, treating
the agent like a guided junior developer. Then move on — the group is here for the tools.
-->

---
layout: concept
heading: "nextacademy.io"
---

<div class="flex flex-col items-center gap-6 text-center">
  <img src="/brand/nalogo.png" alt="nextacademy.io" class="w-24 h-24" />
  <p class="text-2xl" style="color: var(--na-fg-muted)">
    Learn What's Next. <span style="color: var(--na-primary-400); font-weight: 700">Today.</span>
  </p>
  <p class="text-lg max-w-2xl" style="color: var(--na-fg)">
    Hands-on training on what is next in software. Small groups. Real code.
  </p>
</div>

<!--
Keep it short. nextacademy.io runs hands-on trainings on the tools that are changing software
work right now. This workshop is one of them. If people want more after this, the site is
where to look.
-->

---
layout: concept
heading: "What you will build"
lines:
  - "CLASH: a small social app for Berlin. Clashes happen at a place and a time."
---

<img src="/screens/hero-dashboard.png" alt="CLASH dashboard" class="rounded-lg h-full w-auto max-w-full object-contain" style="border: 1px solid var(--na-border)" />

<!--
This is CLASH: a small social app for Berlin. A clash is an activity at a place and a time.
A venue is a place that can host many clashes. People join, hosts accept or reject, everyone
gets notified. This is the dashboard: counts, upcoming clashes, popular venues, activity.
You build all of this with Claude Code from a plain-language spec — no starter code.
-->

---
layout: concept
heading: "…and a live map"
lines:
  - "Pins for clashes and venues. Click the map to start a new clash there."
---

<img src="/screens/screenshot-map.png" alt="CLASH map" class="rounded-lg h-full w-auto max-w-full object-contain" style="border: 1px solid var(--na-border)" />

<!--
The map is the heart of the app. Every clash and venue is a pin. Clicking empty map starts a
new clash at that spot. Later you work on the finished reference app and push Claude Code
much harder on it. Hold the picture: this is what "done" looks like at the end of the build.
-->

---
layout: concept
heading: "How this works"
lines:
  - "I explain and show it"
  - "You do it on your own machine"
  - "Stuck? git checkout NN-start and carry on"
---

<div class="flex items-center gap-8 justify-center w-full">
  <div class="na-card px-8 py-6 text-2xl font-semibold">Explain</div>
  <span class="text-3xl" style="color: var(--na-zinc-600)">→</span>
  <div class="na-card px-8 py-6 text-2xl font-semibold">Show</div>
  <span class="text-3xl" style="color: var(--na-zinc-600)">→</span>
  <div class="na-card px-8 py-6 text-2xl font-semibold" style="border-color: var(--na-accent-500)">You do</div>
</div>

<!--
Every task has the same rhythm: a short explanation, a live demo, then you work through the
task file on your own machine. Each task has a branch named NN-start with the state you need
at the start of that task. Falling behind is fine — check out the branch and rejoin. Ask early,
ask often.
-->

---
layout: concept
heading: "The road"
---

<JourneyMap reveal />

<!--
Four parts, four belts. Foundations: what a language model really is and what the program
around it — the harness — does. Build: you build CLASH with Claude Code, learning the basics
as the app needs them. Control: you take charge of what the model sees. Orchestrate: teams,
workflows, hooks, the browser, CI, the SDK. Click through the four parts, one sentence each.
This map comes back at every part boundary.
-->

---
layout: section
heading: "Foundations"
---

<template #map>
  <JourneyMap current="foundations" />
</template>

<!--
Part one. Before touching the tool we build the mental model: what a model is, what it is
not, and what Claude Code adds around it. Everything later is easier when this is solid.
-->
