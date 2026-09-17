<script setup lang="ts">
// D11 — Three window tanks: before, after /compact, after /clear.
type Seg = { label: string; h: number; fill: string }
const base: Seg[] = [
  { label: 'system', h: 30, fill: 'var(--na-zinc-600)' },
  { label: 'CLAUDE.md', h: 24, fill: 'var(--na-zinc-500)' },
]
const before: Seg[] = [
  ...base,
  { label: 'files read', h: 108, fill: 'var(--na-primary-700)' },
  { label: 'tool output', h: 90, fill: 'var(--na-primary-600)' },
  { label: 'chat', h: 66, fill: 'var(--na-primary-500)' },
]
const compact: Seg[] = [...base, { label: 'summary', h: 40, fill: 'var(--na-accent-500)' }]
const clear: Seg[] = [...base]
const tanks = [
  { key: 'before', title: 'before', segs: before, click: 0 },
  { key: 'compact', title: 'after /compact', segs: compact, click: 1 },
  { key: 'clear', title: 'after /clear', segs: clear, click: 2 },
]
const TW = 200, TH = 340, TOP = 70, xs = [80, 380, 680]
const stackOf = (segs: Seg[]) => { let y = TOP + TH; return segs.map((s) => { y -= s.h; return { ...s, y } }) }
</script>

<template>
  <svg viewBox="0 0 960 470" class="w-full h-auto max-h-full" role="img" aria-label="Compact or clear">
    <line x1="60" x2="900" :y1="TOP + 12" :y2="TOP + 12" stroke="var(--na-error-500)" stroke-width="2" stroke-dasharray="7 6" />
    <text x="60" :y="TOP - 2" fill="var(--na-error-500)" font-weight="600" style="font-size: 14px">window limit</text>

    <g v-for="(t, i) in tanks" :key="t.key" v-click="t.click || false">
      <rect :x="xs[i]" :y="TOP" :width="TW" :height="TH" rx="10" fill="none" stroke="var(--na-zinc-600)" stroke-width="2" />
      <g v-for="s in stackOf(t.segs)" :key="s.label">
        <rect :x="xs[i] + 4" :y="s.y" :width="TW - 8" :height="s.h - 3" rx="5" :fill="s.fill" />
        <text :x="xs[i] + TW / 2" :y="s.y + s.h / 2 + 3" text-anchor="middle" fill="var(--na-zinc-50)" font-weight="600" style="font-size: 14px">{{ s.label }}</text>
      </g>
      <text v-if="t.key !== 'before'" :x="xs[i] + TW / 2" :y="TOP + 150" text-anchor="middle" fill="var(--na-fg-muted)" style="font-size: 15px">room</text>
      <text :x="xs[i] + TW / 2" :y="TOP + TH + 34" text-anchor="middle" fill="var(--na-fg)" font-weight="700" style="font-size: 17px">{{ t.title }}</text>
      <text v-if="t.key === 'compact'" :x="xs[i] + TW / 2" :y="TOP + TH + 56" text-anchor="middle" fill="var(--na-fg-muted)" style="font-size: 13px">detail is lost, the thread continues</text>
      <text v-if="t.key === 'clear'" :x="xs[i] + TW / 2" :y="TOP + TH + 56" text-anchor="middle" fill="var(--na-fg-muted)" style="font-size: 13px">nothing from the old job leaks in</text>
    </g>
  </svg>
</template>
