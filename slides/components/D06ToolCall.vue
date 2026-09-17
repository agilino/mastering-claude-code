<script setup lang="ts">
// D06 — A model can ask for a tool. Left: your message → the model.
// Right: two possible outputs. Output A is a plain answer. Output B is a
// structured request, then STOP, then an empty slot someone else must fill.
</script>

<template>
  <div class="grid w-full max-w-4xl gap-6 items-center" style="grid-template-columns: 12rem 1fr">
    <div class="flex flex-col items-center gap-3">
      <div class="na-card px-4 py-3 text-base text-center" style="color: var(--na-fg-muted)">you: "what is in lib/?"</div>
      <span class="text-2xl" style="color: var(--na-zinc-600)">↓</span>
      <div class="na-card px-8 py-4 text-2xl font-bold" style="border-color: var(--na-primary-400)">model</div>
    </div>
    <div class="flex flex-col gap-5 min-w-0">
      <div class="flex items-center gap-3" v-click="1">
        <span class="text-xs font-mono uppercase tracking-wide w-20 shrink-0" style="color: var(--na-fg-muted)">output A</span>
        <div class="na-card px-4 py-3 text-base flex-1 min-w-0">"Probably auth, data helpers and a Prisma client."</div>
        <span class="text-sm w-24 shrink-0" style="color: var(--na-fg-muted)">guessed</span>
      </div>
      <div class="flex items-center gap-3">
        <span class="text-xs font-mono uppercase tracking-wide w-20 shrink-0" v-click="2" style="color: var(--na-fg-muted)">output B</span>
        <div class="na-card px-3 py-3 font-mono text-sm whitespace-nowrap" v-click="2" style="border-color: var(--na-accent-500)">{ "tool": "ls", "path": "lib/" }</div>
        <div v-click="3" class="px-3 py-2 rounded-lg font-bold text-sm tracking-wide shrink-0" style="background: var(--na-error-500); color: var(--na-fg)">STOP</div>
        <div v-click="4" class="rounded-lg px-3 py-2 flex items-center gap-2 flex-1 min-w-0" style="border: 2px dashed var(--na-zinc-600)">
          <span class="text-xl font-bold" style="color: var(--na-accent-500)">?</span>
          <span class="text-sm" style="color: var(--na-fg-muted)">someone must run it</span>
        </div>
      </div>
    </div>
  </div>
</template>
