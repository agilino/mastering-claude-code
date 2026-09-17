<script setup lang="ts">
// D03 — It picks from probabilities. The same candidates at low and high
// temperature: peaked vs flat. Three sample picks under each.
const cands = ['notify.ts', 'notifications.ts', 'notifier.ts', 'bell.ts', 'alerts.ts']
const low = [85, 8, 4, 2, 1]
const high = [30, 25, 20, 15, 10]
const lowPicks = ['notify.ts', 'notify.ts', 'notify.ts']
const highPicks = ['notify.ts', 'bell.ts', 'notifications.ts']
</script>

<template>
  <div class="grid grid-cols-2 gap-8 w-full max-w-4xl">
    <div v-for="side in [{ title: 'Low temperature', p: low, picks: lowPicks, color: 'var(--na-primary-500)', click: 0 }, { title: 'High temperature', p: high, picks: highPicks, color: 'var(--na-secondary-500)', click: 1 }]" :key="side.title" class="na-card p-5" v-click="side.click">
      <div class="font-bold text-lg mb-1">{{ side.title }}</div>
      <div class="text-sm mb-4" style="color: var(--na-fg-muted)">prompt: "Name the file."</div>
      <div class="flex flex-col gap-2">
        <div v-for="(c, i) in cands" :key="c" class="flex items-center gap-3">
          <span class="font-mono text-sm w-32 text-right truncate" style="color: var(--na-fg-muted)">{{ c }}</span>
          <div class="flex-1 h-4 rounded" style="background: var(--na-zinc-800)">
            <div class="h-4 rounded" :style="{ width: side.p[i] + '%', background: side.color }" />
          </div>
          <span class="font-mono text-sm w-10" style="color: var(--na-fg-muted)">{{ side.p[i] }}%</span>
        </div>
      </div>
      <div class="mt-4 pt-3 flex items-center gap-2 text-sm flex-wrap" style="border-top: 1px solid var(--na-border)">
        <span class="whitespace-nowrap" style="color: var(--na-fg-muted)">3 runs:</span>
        <span v-for="(pk, i) in side.picks" :key="i" v-click="side.click + 2" class="px-2 py-0.5 rounded font-mono" :style="{ background: pk === 'notify.ts' ? 'var(--na-primary-700)' : 'var(--na-secondary-600)', color: 'var(--na-fg)' }">{{ pk }}</span>
      </div>
    </div>
  </div>
</template>
