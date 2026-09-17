<script setup lang="ts">
// layout: task — one per entry in tasks/. Number, heading, goal, success
// criterion and the reset branch. No link or QR: the trainer decides how
// participants open the task file.
//
// Frontmatter:
//   number: string        e.g. "03"
//   heading: string
//   goal: string           one sentence
//   mode: string            "you do" | "watch first"
//   success: string         one-line success criterion
//   branch: string          reset branch, e.g. "03-start"
defineProps<{
  number?: string
  heading?: string
  goal?: string
  mode?: string
  success?: string
  branch?: string
}>()
</script>

<template>
  <div class="slidev-layout w-full h-full flex flex-col px-16 py-12">
    <div class="flex items-center gap-3 mb-6 shrink-0">
      <span
        class="font-mono text-sm px-2 py-1 rounded whitespace-nowrap"
        style="background: var(--na-primary-700); color: var(--na-primary-100)"
      >TASK {{ number }}</span>
      <span
        v-if="mode"
        class="text-sm px-2 py-1 rounded whitespace-nowrap"
        :style="mode === 'watch first'
          ? 'background: var(--na-accent-600); color: var(--na-zinc-950)'
          : 'background: var(--na-zinc-800); color: var(--na-fg-muted)'"
      >{{ mode }}</span>
      <span v-if="branch" class="font-mono text-sm whitespace-nowrap" style="color: var(--na-fg-muted)">git checkout {{ branch }}</span>
    </div>
    <div class="flex-1 flex flex-col justify-center max-w-4xl">
      <h1 class="mb-6" style="font-size: 2.75rem">{{ heading }}</h1>
      <p class="text-xl mb-8" style="color: var(--na-fg)">{{ goal }}</p>
      <div v-if="success" class="flex items-start gap-2 text-lg">
        <span style="color: var(--na-success-500)">✓</span>
        <span>{{ success }}</span>
      </div>
    </div>
  </div>
</template>
