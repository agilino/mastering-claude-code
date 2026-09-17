<script setup lang="ts">
// The journey map — the deck's spine. Four parts, shown in full on the
// welcome section and re-shown on every section divider with the
// current part highlighted.
const props = withDefaults(
  defineProps<{ current?: 'foundations' | 'build' | 'control' | 'orchestrate'; reveal?: boolean }>(),
  { reveal: false },
)

const parts = [
  { key: 'foundations', belt: 'White belt', title: 'Foundations', modules: ['What a model is', 'The harness', 'First steps'] },
  { key: 'build', belt: 'Blue belt', title: 'Build CLASH', modules: ['Foundation', 'Auth and clashes', 'Venues, map, people', 'Finish and ship'] },
  { key: 'control', belt: 'Brown belt', title: 'Control the context', modules: ['Context', 'Skills', 'Subagents'] },
  { key: 'orchestrate', belt: 'Black belt', title: 'Orchestrate and let go', modules: ['Teams and workflows', 'Hooks', 'The browser', 'Letting go', 'Agent SDK', 'Capstone'] },
] as const

const beltColor: Record<string, string> = {
  foundations: 'var(--na-zinc-100)',
  build: 'var(--na-primary-400)',
  control: 'var(--na-accent-600)',
  orchestrate: 'var(--na-zinc-950)',
}
</script>

<template>
  <div class="w-full grid grid-cols-4 gap-4 items-start">
    <div
      v-for="(p, i) in parts"
      :key="p.key"
      v-click="reveal ? i + 1 : false"
      class="na-card p-4 flex flex-col gap-3 journey-part"
      :class="{ 'journey-part--active': current === p.key }"
    >
      <div class="flex items-center gap-2">
        <span class="inline-block w-8 h-3 rounded-sm" :style="{ background: beltColor[p.key], border: '1px solid var(--na-zinc-600)' }" />
        <span class="text-xs font-semibold uppercase tracking-wide" style="color: var(--na-fg-muted)">{{ p.belt }}</span>
      </div>
      <div class="text-base font-bold leading-snug" :style="{ color: current === p.key ? 'var(--na-accent-500)' : 'var(--na-fg)' }">{{ p.title }}</div>
      <ul class="text-sm space-y-1" style="color: var(--na-fg-muted)">
        <li v-for="m in p.modules" :key="m">{{ m }}</li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.journey-part { transition: border-color var(--na-duration-normal) var(--na-ease-out); }
.journey-part--active { border-color: var(--na-accent-500); box-shadow: var(--na-shadow-accent); }
</style>
