<script setup lang="ts">
// G29 — Four ways to start a workflow: what you type, what it covers, and what it costs.
// Cost is words from the workflows docs, not a measured ratio: any workflow run can use
// more tokens than the same task in conversation; ultracode adds more on every request.
type Row = { type: string; covers: string; cost: string; costly?: boolean }
const rows: Row[] = [
  { type: 'use a workflow to …', covers: 'this task', cost: 'more than chat' },
  { type: 'ultracode: …', covers: 'this task', cost: 'more than chat' },
  { type: '/effort ultracode', covers: 'every big task', cost: 'more on every request', costly: true },
  { type: '/deep-research · /<name>', covers: 'a bundled or saved workflow', cost: 'more than chat' },
]
const col = { type: 40, covers: 340, cost: 650 }
const rowH = 62
const rowY = (i: number) => 40 + i * (rowH + 12)
</script>

<template>
  <svg viewBox="0 0 960 330" width="960" height="330" class="w-full max-w-4xl h-auto max-h-full" font-family="Inter, sans-serif" role="img" aria-label="Four ways to start a workflow and what each one costs">
    <!-- column headers -->
    <text :x="col.type" y="26" fill="var(--na-fg-muted)" font-weight="600" style="font-size:14px">you type</text>
    <text :x="col.covers" y="26" fill="var(--na-fg-muted)" font-weight="600" style="font-size:14px">covers</text>
    <text :x="col.cost" y="26" fill="var(--na-fg-muted)" font-weight="600" style="font-size:14px">tokens</text>

    <!-- one row per way in; the ultracode row carries the warning colour -->
    <g v-for="(r, i) in rows" :key="r.type">
      <rect
        x="10" :y="rowY(i)" width="940" :height="rowH" rx="10"
        fill="var(--na-bg-raised)"
        :stroke="r.costly ? 'var(--na-error-500)' : 'var(--na-zinc-700)'"
        :stroke-width="r.costly ? 2.5 : 2"
      />
      <text
        :x="col.type" :y="rowY(i) + rowH / 2 + 6"
        fill="var(--na-fg)" font-weight="600"
        font-family="'JetBrains Mono', monospace" style="font-size:17px"
      >{{ r.type }}</text>
      <text
        :x="col.covers" :y="rowY(i) + rowH / 2 + 6"
        :fill="r.costly ? 'var(--na-error-500)' : 'var(--na-fg)'"
        :font-weight="r.costly ? 700 : 400"
        style="font-size:17px"
      >{{ r.covers }}</text>
      <text
        :x="col.cost" :y="rowY(i) + rowH / 2 + 6"
        :fill="r.costly ? 'var(--na-error-500)' : 'var(--na-fg-muted)'"
        :font-weight="r.costly ? 700 : 400"
        style="font-size:17px"
      >{{ r.cost }}</text>
    </g>
  </svg>
</template>
