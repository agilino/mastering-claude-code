<script setup lang="ts">
// G10 — Orchestration ladder compared across four axes. Revealed row by row,
// as if being filled in from the evidence gathered live, not shown finished.
const cols = ['Subagent', 'Agent team', 'Workflow'] as const
const rows = [
  { axis: 'Who decides next', values: ['Claude, turn by turn', 'The lead', 'The script'] },
  { axis: 'Parallelism', values: ['One or a few', 'Several peers at once', 'Up to 16 at once'] },
  { axis: 'Token cost', values: ['Low', 'Moderate to high', 'Highest'] },
  { axis: 'Main-thread context', values: ['Summary only', 'Own session', 'Runs in background'] },
] as const
</script>

<template>
  <div class="w-full na-card overflow-hidden">
    <div
      class="grid text-sm font-semibold px-4 py-2"
      style="grid-template-columns: 13rem repeat(3, 1fr); background: var(--na-zinc-900); color: var(--na-fg-muted)"
    >
      <div></div>
      <div v-for="c in cols" :key="c" class="text-center" style="color: var(--na-fg)">{{ c }}</div>
    </div>
    <div
      v-for="row in rows"
      :key="row.axis"
      v-click
      class="grid px-4 py-3 text-sm items-center"
      style="grid-template-columns: 13rem repeat(3, 1fr); border-top: 1px solid var(--na-border)"
    >
      <div class="font-semibold" style="color: var(--na-fg)">{{ row.axis }}</div>
      <div v-for="(v, i) in row.values" :key="i" class="text-center px-2 whitespace-nowrap" style="color: var(--na-fg-muted)">{{ v }}</div>
    </div>
  </div>
</template>
