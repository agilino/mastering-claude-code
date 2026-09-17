<script setup lang="ts">
// G17 — Browser tool comparison, positioned by purpose and QUALITATIVE cost only.
// Do NOT put a numeric token-savings figure on Agent Browser — not an official claim.
const tools = [
  { name: 'Playwright MCP', x: 240, y: 90, purpose: 'E2E test authoring', cost: 'heavier: full DOM + schemas' },
  { name: 'Chrome DevTools MCP', x: 720, y: 90, purpose: 'perf and network debugging', cost: 'moderate' },
  { name: 'Claude in Chrome', x: 720, y: 270, purpose: 'authenticated visual checks', cost: 'moderate to heavy' },
  { name: 'Agent Browser', x: 240, y: 270, purpose: 'general automation', cost: 'leaner snapshots, not DOM dumps' },
]
</script>

<template>
  <div class="w-full flex justify-center">
    <svg viewBox="0 0 960 380" width="960" height="380" class="w-full max-w-4xl h-auto max-h-full">
      <line x1="480" y1="40" x2="480" y2="360" stroke="var(--na-border)" stroke-width="1" />
      <line x1="60" y1="200" x2="920" y2="200" stroke="var(--na-border)" stroke-width="1" />
      <text x="24" y="200" fill="var(--na-fg-muted)" text-anchor="middle" transform="rotate(-90 24 200)" style="font-size:13px">cost: lean ↔ heavy</text>

      <g v-for="t in tools" :key="t.name" v-click>
        <circle :cx="t.x" :cy="t.y" r="10" fill="var(--na-accent-500)" />
        <rect :x="t.x - 130" :y="t.y + 16" width="260" height="70" rx="8" style="fill: var(--na-bg-raised); stroke: var(--na-border)" />
        <text :x="t.x" :y="t.y + 38" font-weight="700" fill="var(--na-fg)" text-anchor="middle" style="font-size:15px">{{ t.name }}</text>
        <text :x="t.x" :y="t.y + 58" fill="var(--na-fg-muted)" text-anchor="middle" style="font-size:13px">{{ t.purpose }}</text>
        <text :x="t.x" :y="t.y + 76" fill="var(--na-fg-muted)" text-anchor="middle" style="font-size:13px">{{ t.cost }}</text>
      </g>
    </svg>
  </div>
</template>
