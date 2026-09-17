<script setup lang="ts">
// D05 — The context window as a tank that fills upward. Five segments, a
// limit line and a drift zone near the top. Prop `mode`:
//   'fill'    one tank, one segment per click (default)
//   'compare' three tanks: full · after /compact · after /clear
const props = withDefaults(defineProps<{ mode?: 'fill' | 'compare' }>(), { mode: 'fill' })

const segs = [
  { label: 'system', h: 34, color: 'var(--na-zinc-600)' },
  { label: 'CLAUDE.md', h: 30, color: 'var(--na-zinc-500)' },
  { label: 'files read', h: 110, color: 'var(--na-primary-600)' },
  { label: 'tool output', h: 90, color: 'var(--na-primary-500)' },
  { label: 'chat', h: 70, color: 'var(--na-primary-400)' },
]
const W = 180, H = 420, PAD = 10, BOTTOM = H - PAD
const limitY = 60, driftY = 110
const yOf = (i: number) => BOTTOM - segs.slice(0, i + 1).reduce((a, s) => a + s.h, 0)

const tanks = [
  { title: 'full', fill: segs.map((s) => s.h) },
  { title: 'after /compact', fill: [34, 30, 0, 0, 0], extra: { label: 'summary', h: 48, color: 'var(--na-accent-500)' } },
  { title: 'after /clear', fill: [34, 30, 0, 0, 0] },
]
</script>

<template>
  <div v-if="props.mode === 'fill'" class="flex items-center gap-12 w-full justify-center h-full" style="max-height: 100%">
    <svg :viewBox="`0 0 ${W + 40} ${H}`" style="height: 100%; max-height: 24rem; width: auto" role="img" aria-label="context window filling">
      <rect :x="20" :y="PAD" :width="W" :height="H - 2 * PAD" rx="14" fill="var(--na-bg-raised)" stroke="var(--na-zinc-600)" stroke-width="3" />
      <rect :x="22" :y="limitY" :width="W - 4" :height="driftY - limitY" fill="var(--na-error-500)" opacity="0.18" />
      <text :x="20 + W / 2" :y="limitY + 30" text-anchor="middle" fill="var(--na-error-500)" font-weight="700" style="font-size: 14px">drift zone</text>
      <line :x1="14" :x2="W + 26" :y1="limitY" :y2="limitY" stroke="var(--na-error-500)" stroke-width="3" stroke-dasharray="8 6" />
      <text :x="20 + W / 2" :y="limitY - 14" text-anchor="middle" fill="var(--na-error-500)" font-weight="700" style="font-size: 14px">window limit</text>
      <g v-for="(s, i) in segs" :key="s.label" v-click="i === 0 ? false : i">
        <rect :x="24" :y="yOf(i)" :width="W - 8" :height="s.h - 3" rx="6" :fill="s.color" />
        <text :x="20 + W / 2" :y="yOf(i) + s.h / 2 + 4" text-anchor="middle" fill="var(--na-fg)" font-weight="600" style="font-size: 14px">{{ s.label }}</text>
      </g>
    </svg>
    <div class="flex flex-col gap-3 max-w-xs">
      <div class="na-card p-4">
        <div class="font-semibold">Fixed part</div>
        <div class="text-sm" style="color: var(--na-fg-muted)">system, CLAUDE.md: the same every call</div>
      </div>
      <div class="na-card p-4" v-click="2">
        <div class="font-semibold">Grows while you work</div>
        <div class="text-sm" style="color: var(--na-fg-muted)">every file read, every command output, every message</div>
      </div>
      <div class="na-card p-4" v-click="5" style="border-color: var(--na-error-500)">
        <div class="font-semibold" style="color: var(--na-error-500)">Near the top: drift</div>
        <div class="text-sm" style="color: var(--na-fg-muted)">rules from early on get forgotten, files get re-read</div>
      </div>
    </div>
  </div>

  <div v-else class="flex items-end gap-14 w-full justify-center h-full">
    <div v-for="(t, ti) in tanks" :key="t.title" class="flex flex-col items-center gap-3" v-click="ti === 0 ? false : ti">
      <svg :viewBox="`0 0 ${W + 40} ${H}`" style="height: 100%; max-height: 19rem; width: auto" role="img" :aria-label="t.title">
        <rect :x="20" :y="PAD" :width="W" :height="H - 2 * PAD" rx="14" fill="var(--na-bg-raised)" stroke="var(--na-zinc-600)" stroke-width="3" />
        <line :x1="14" :x2="W + 26" :y1="limitY" :y2="limitY" stroke="var(--na-error-500)" stroke-width="3" stroke-dasharray="8 6" />
        <template v-for="(s, i) in segs" :key="s.label">
          <g v-if="t.fill[i] > 0">
            <rect :x="24" :y="BOTTOM - t.fill.slice(0, i + 1).reduce((a, b) => a + b, 0)" :width="W - 8" :height="t.fill[i] - 3" rx="6" :fill="s.color" />
            <text :x="20 + W / 2" :y="BOTTOM - t.fill.slice(0, i + 1).reduce((a, b) => a + b, 0) + t.fill[i] / 2 + 4" text-anchor="middle" fill="var(--na-fg)" font-weight="600" style="font-size: 14px">{{ s.label }}</text>
          </g>
        </template>
        <g v-if="t.extra">
          <rect :x="24" :y="BOTTOM - 64 - t.extra.h" :width="W - 8" :height="t.extra.h - 3" rx="6" :fill="t.extra.color" />
          <text :x="20 + W / 2" :y="BOTTOM - 64 - t.extra.h / 2 + 4" text-anchor="middle" fill="var(--na-zinc-950)" font-weight="700" style="font-size: 14px">{{ t.extra.label }}</text>
        </g>
      </svg>
      <div class="font-mono text-base" :style="{ color: ti === 0 ? 'var(--na-fg-muted)' : 'var(--na-fg)' }">{{ t.title }}</div>
    </div>
  </div>
</template>
