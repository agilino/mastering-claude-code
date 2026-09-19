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

---
layout: concept
heading: "What you will build"
lines:
  - "CLASH: a small social app for Berlin. Clashes happen at a place and a time."
---

<img src="/screens/hero-dashboard.png" alt="CLASH dashboard" class="rounded-lg h-full w-auto max-w-full object-contain" style="border: 1px solid var(--na-border)" />

---
layout: concept
heading: "…and a live map"
lines:
  - "Pins for clashes and venues. Click the map to start a new clash there."
---

<img src="/screens/screenshot-map.png" alt="CLASH map" class="rounded-lg h-full w-auto max-w-full object-contain" style="border: 1px solid var(--na-border)" />

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

---
layout: concept
heading: "The road"
---

<JourneyMap reveal />

---
layout: section
heading: "Foundations"
---

<template #map>
  <JourneyMap current="foundations" />
</template>

