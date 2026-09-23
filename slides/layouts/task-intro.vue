<script setup lang="ts">
// layout: task-intro — the FIRST slide of a task block, and the routeAlias
// target (task-NN). Says what is coming before any concept slide: the
// skills the block teaches (learn) next to what gets built (outcome).
// The task layout still closes the block as the recap that stays on
// screen while participants work — it carries goal/mode/success/branch,
// not this one. No docs: field — a task slide carries no URL (CLAUDE.md).
//
// Frontmatter:
//   number: string           e.g. "04"
//   routeAlias: string        "task-04" — must match number
//   heading: string            e.g. "Task 04 — Venues, map, people"
//   branch: string             reset branch, e.g. "04-start"
//   learn: string[]            Claude Code skills this block teaches
//   outcome: string[]          what gets built in CLASH
//   outcomeHeading?: string    default "You end up with"; Part II tasks use "You build"
defineProps<{
  number?: string
  heading?: string
  branch?: string
  learn?: string[]
  outcome?: string[]
  outcomeHeading?: string
}>()
</script>

<template>
  <div class="slidev-layout w-full h-full flex flex-col px-16 py-12">
    <div class="flex items-center gap-3 mb-8 shrink-0">
      <span
        class="font-mono text-sm px-2 py-1 rounded whitespace-nowrap"
        style="background: var(--na-primary-700); color: var(--na-primary-100)"
      >TASK {{ number }}</span>
      <span v-if="branch" class="font-mono text-sm whitespace-nowrap" style="color: var(--na-fg-muted)">git checkout {{ branch }}</span>
    </div>
    <h1 class="mb-10 shrink-0" style="font-size: 2.5rem">{{ heading }}</h1>
    <div class="flex-1 grid grid-cols-2 gap-10 max-w-5xl">
      <div>
        <div class="text-sm font-semibold mb-3" style="color: var(--na-accent-500)">You learn</div>
        <ul class="space-y-2">
          <li v-for="item in learn" :key="item" class="text-lg flex items-start gap-2">
            <span style="color: var(--na-accent-500)">·</span>
            <span>{{ item }}</span>
          </li>
        </ul>
      </div>
      <div>
        <div class="text-sm font-semibold mb-3" style="color: var(--na-accent-500)">{{ outcomeHeading ?? "You end up with" }}</div>
        <ul class="space-y-2">
          <li v-for="item in outcome" :key="item" class="text-lg flex items-start gap-2">
            <span style="color: var(--na-success-500)">·</span>
            <span>{{ item }}</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
