<script setup lang="ts">
// D10 — Subagents: a second loop with its own window. The noisy work fills
// the subagent's window; only one message crosses back. A fork starts with
// a copy of the main window instead of an empty one.
const chips = ['read', 'grep', 'read', 'read', 'edit', 'read']
</script>

<template>
  <svg viewBox="0 0 960 460" class="w-full h-auto max-h-full" role="img" aria-label="Subagents">
    <defs>
      <marker id="d10-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
        <path d="M0,0 L0,6 L8,3 z" fill="var(--na-zinc-400)" />
      </marker>
      <marker id="d10-arrow-accent" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
        <path d="M0,0 L0,6 L8,3 z" fill="var(--na-accent-500)" />
      </marker>
    </defs>

    <!-- main loop -->
    <g>
      <circle cx="150" cy="180" r="64" fill="none" stroke="var(--na-primary-400)" stroke-width="4" stroke-dasharray="300 40" />
      <path d="M 200 140 l 10 12 l -16 4" fill="var(--na-primary-400)" />
      <text x="150" y="176" text-anchor="middle" fill="var(--na-fg)" font-weight="700" style="font-size: 17px">Main</text>
      <text x="150" y="196" text-anchor="middle" fill="var(--na-fg-muted)" style="font-size: 13px">loop</text>
      <!-- gauge -->
      <text x="262" y="28" text-anchor="middle" fill="var(--na-fg-muted)" style="font-size: 13px">window</text>
      <text x="262" y="46" text-anchor="middle" fill="var(--na-fg-muted)" style="font-size: 13px">barely moves</text>
      <rect x="240" y="60" width="44" height="240" rx="8" fill="none" stroke="var(--na-zinc-600)" stroke-width="2" />
      <rect x="240" y="262" width="44" height="38" rx="6" fill="var(--na-primary-600)" />
    </g>

    <!-- spawn arrow -->
    <line x1="300" y1="150" x2="500" y2="150" stroke="var(--na-zinc-400)" stroke-width="2.5" marker-end="url(#d10-arrow)" />
    <text x="400" y="138" text-anchor="middle" fill="var(--na-fg)" font-weight="600" style="font-size: 14px">Agent: "audit app/actions"</text>

    <!-- subagent loop -->
    <g>
      <circle cx="580" cy="180" r="64" fill="none" stroke="var(--na-accent-500)" stroke-width="4" stroke-dasharray="300 40" />
      <path d="M 630 140 l 10 12 l -16 4" fill="var(--na-accent-500)" />
      <text x="580" y="176" text-anchor="middle" fill="var(--na-fg)" font-weight="700" style="font-size: 17px">Subagent</text>
      <text x="580" y="196" text-anchor="middle" fill="var(--na-fg-muted)" style="font-size: 13px">own loop</text>
      <text x="692" y="46" text-anchor="middle" fill="var(--na-fg-muted)" style="font-size: 13px">own window</text>
      <rect x="670" y="60" width="44" height="240" rx="8" fill="none" stroke="var(--na-zinc-600)" stroke-width="2" />
    </g>
    <!-- window fills with noisy work -->
    <g v-click="1">
      <rect x="670" y="80" width="44" height="220" rx="6" fill="var(--na-secondary-600)" opacity="0.85" />
      <g v-for="(c, i) in chips" :key="i">
        <rect :x="740" :y="66 + i * 38" width="70" height="28" rx="6" fill="var(--na-bg-raised)" stroke="var(--na-secondary-500)" stroke-width="1.5" />
        <text :x="775" :y="85 + i * 38" text-anchor="middle" fill="var(--na-fg)" style="font-size: 13px">{{ c }}</text>
      </g>
      <text x="838" y="300" text-anchor="end" fill="var(--na-fg-muted)" style="font-size: 13px">stays here</text>
    </g>

    <!-- one message back -->
    <g v-click="2">
      <path d="M 555 240 Q 365 410 175 240" fill="none" stroke="var(--na-accent-500)" stroke-width="2" marker-end="url(#d10-arrow-accent)" />
      <text x="365" y="352" text-anchor="middle" fill="var(--na-accent-500)" font-weight="700" style="font-size: 15px">one message: the report</text>
    </g>

    <!-- fork note -->
    <g v-click="3">
      <rect x="30" y="400" width="900" height="44" rx="8" fill="var(--na-bg-raised)" stroke="var(--na-zinc-700)" stroke-width="1.5" />
      <text x="480" y="428" text-anchor="middle" fill="var(--na-fg)" style="font-size: 15px">A fork is the same, but its window starts as a copy of yours — cheaper when it needs what you already know.</text>
    </g>
  </svg>
</template>
