<script setup lang="ts">
// G19 — Interactive → headless → embedded. Same agent, three levels of
// autonomy, same control primitives carried across unchanged.
const stages = [
  { x: 30, title: 'Interactive', sub: 'you, in the loop', detail: 'a human drives every turn' },
  { x: 320, title: 'Headless', sub: 'no human present', detail: 'claude-code-action@v1 in CI' },
  { x: 610, title: 'Embedded', sub: 'inside your app', detail: 'Agent SDK: the agent is a feature' },
]
</script>

<template>
  <svg viewBox="0 0 900 480" width="900" height="480" class="w-full max-w-4xl h-auto max-h-full" font-family="Inter, sans-serif">
    <g v-for="(s, i) in stages" :key="s.title" v-click>
      <path v-if="i > 0" :d="`M ${s.x - 30} 105 L ${s.x} 105`" stroke="var(--na-zinc-600)" stroke-width="2.5" marker-end="url(#arrow)" />
      <rect :x="s.x" y="30" width="260" height="150" rx="12" fill="var(--na-bg-raised)" stroke="var(--na-primary-400)" stroke-width="2" />
      <text :x="s.x + 130" y="72" text-anchor="middle" fill="var(--na-fg)" font-weight="700" style="font-size:20px">{{ s.title }}</text>
      <text :x="s.x + 130" y="98" text-anchor="middle" fill="var(--na-accent-500)" style="font-size:13px">{{ s.sub }}</text>
      <text :x="s.x + 130" y="142" text-anchor="middle" fill="var(--na-fg-muted)" style="font-size:13px">{{ s.detail }}</text>
    </g>

    <!-- persistent band: same primitives carry over -->
    <g v-click>
      <path d="M 160 180 L 160 340" stroke="var(--na-zinc-700)" stroke-width="1.5" stroke-dasharray="3 3" />
      <path d="M 450 180 L 450 340" stroke="var(--na-zinc-700)" stroke-width="1.5" stroke-dasharray="3 3" />
      <path d="M 740 180 L 740 340" stroke="var(--na-zinc-700)" stroke-width="1.5" stroke-dasharray="3 3" />
      <rect x="30" y="340" width="840" height="120" rx="12" fill="var(--na-primary-900)" stroke="var(--na-accent-500)" stroke-width="2" />
      <text x="450" y="372" text-anchor="middle" fill="var(--na-accent-500)" font-weight="700" style="font-size:15px">
        every control primitive carries over unchanged
      </text>
      <g fill="var(--na-fg)" style="font-size:14px">
        <text x="180" y="410" text-anchor="middle">Context budget</text>
        <text x="450" y="410" text-anchor="middle">Subagent isolation</text>
        <text x="720" y="410" text-anchor="middle">Hooks as hard limits</text>
      </g>
      <text x="450" y="440" text-anchor="middle" fill="var(--na-fg-muted)" style="font-size:13px">
        same tools, new host
      </text>
    </g>

    <defs>
      <marker id="arrow" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
        <path d="M0,0 L8,4 L0,8 Z" fill="var(--na-zinc-600)" />
      </marker>
    </defs>
  </svg>
</template>
