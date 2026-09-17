<script setup lang="ts">
// D04 — It has no memory. Nested boxes: each turn sends everything before it.
</script>

<template>
  <div class="flex flex-col items-center gap-6 w-full">
    <div class="relative flex items-center justify-center" style="width: 44rem; height: 17rem">
      <!-- turn 3 (outer) -->
      <div v-click="2" class="absolute inset-0 rounded-xl flex items-end justify-start p-3" style="border: 2px dashed var(--na-secondary-500)">
        <span class="font-mono text-sm px-2 py-1 rounded" style="background: var(--na-secondary-600); color: var(--na-fg)">turn 3 sends: 1 + 2 + 3</span>
      </div>
      <!-- turn 2 -->
      <div v-click="1" class="absolute rounded-xl flex items-end justify-start p-3" style="left: 3.5rem; right: 3.5rem; top: 2.2rem; bottom: 3.6rem; border: 2px dashed var(--na-accent-500)">
        <span class="font-mono text-sm px-2 py-1 rounded" style="background: var(--na-accent-600); color: var(--na-zinc-950)">turn 2 sends: 1 + 2</span>
      </div>
      <!-- turn 1 (inner) -->
      <div class="absolute rounded-xl flex flex-col items-center justify-center gap-1 na-card" style="left: 8rem; right: 8rem; top: 4.4rem; bottom: 7.2rem; border-color: var(--na-primary-400)">
        <span class="font-mono text-sm" style="color: var(--na-primary-300)">turn 1 sends: 1</span>
        <span class="text-sm" style="color: var(--na-fg-muted)">system · "fix the bell" · files read</span>
      </div>
    </div>
    <div v-click="2" class="text-lg font-semibold" style="color: var(--na-accent-500)">every turn sends everything again</div>
  </div>
</template>
