<script setup lang="ts">
// D01 — Text becomes tokens. A sentence shown as coloured token chips;
// rare words visibly split into pieces. One chip per click.
const tokens = [
  { text: 'Add', color: 'var(--na-primary-400)' },
  { text: 'notif', color: 'var(--na-accent-500)' },
  { text: 'ications', color: 'var(--na-accent-400)' },
  { text: 'to', color: 'var(--na-primary-300)' },
  { text: 'CL', color: 'var(--na-secondary-500)' },
  { text: 'ASH', color: 'var(--na-secondary-600)' },
]
</script>

<template>
  <div class="flex flex-col items-center gap-10 w-full">
    <div class="na-card px-8 py-4 text-2xl" style="color: var(--na-fg)">
      Add notifications to CLASH
    </div>
    <div class="text-3xl" style="color: var(--na-zinc-600)">↓</div>
    <div class="flex items-end gap-2">
      <template v-for="(t, i) in tokens" :key="i">
        <span
          v-click="i + 1"
          class="px-4 py-2 rounded-lg text-2xl font-mono font-semibold"
          :style="{ background: t.color, color: 'var(--na-zinc-950)', marginLeft: i === 2 || i === 5 ? '-4px' : '0' }"
        >{{ t.text }}</span>
      </template>
    </div>
    <div v-click="6" class="text-lg font-semibold" style="color: var(--na-fg-muted)">
      4 words · <span style="color: var(--na-fg)">6 tokens</span>
    </div>
  </div>
</template>
