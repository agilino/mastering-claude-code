<script setup lang="ts">
// D08 — What is in the prompt, every call: a stack in send order. The top
// five blocks were already sent in the previous call and come from the
// cache; only the newest message is new and paid in full.
const blocks = [
  { label: 'system prompt', h: 58, click: 1, note: 'written by Claude Code' },
  { label: 'CLAUDE.md', h: 42, click: 2, note: 'your rules, project + personal' },
  { label: 'tool list', h: 50, click: 3, note: 'name + description of every tool' },
  { label: 'skills index', h: 40, click: 4, note: 'one line per skill' },
  { label: 'history + tool results', h: 160, click: 5, note: 'every file read, every output' },
]
const GAP = 8, X = 240, W = 340, TOP = 24
let y = TOP
const placed = blocks.map((b) => { const r = { ...b, y }; y += b.h + GAP; return r })
const cachedEnd = y - GAP
const newY = y
</script>

<template>
  <svg viewBox="0 0 900 480" class="w-full h-auto max-h-full" role="img" aria-label="What is in the prompt">
    <g v-for="b in placed" :key="b.label" v-click="b.click">
      <rect :x="X" :y="b.y" :width="W" :height="b.h" rx="8" fill="var(--na-primary-800)" stroke="var(--na-primary-600)" stroke-width="1.5" />
      <text :x="X + W / 2" :y="b.y + b.h / 2 + 6" text-anchor="middle" fill="var(--na-fg)" font-weight="600" style="font-size: 16px">{{ b.label }}</text>
      <text :x="X - 16" :y="b.y + b.h / 2 + 5" text-anchor="end" fill="var(--na-fg-muted)" style="font-size: 13px">{{ b.note }}</text>
    </g>

    <!-- cached bracket -->
    <g v-click="5">
      <path :d="`M ${X + W + 18} ${TOP} h 14 V ${cachedEnd} h -14`" fill="none" stroke="var(--na-accent-500)" stroke-width="2.5" />
      <text :x="X + W + 46" :y="(TOP + cachedEnd) / 2 - 4" fill="var(--na-accent-500)" font-weight="700" style="font-size: 16px">cached</text>
      <text :x="X + W + 46" :y="(TOP + cachedEnd) / 2 + 16" fill="var(--na-fg-muted)" style="font-size: 13px">sent in the last call already</text>
    </g>

    <!-- the new tail -->
    <g v-click="6">
      <rect :x="X" :y="newY" :width="W" height="56" rx="8" fill="var(--na-primary-500)" stroke="var(--na-primary-300)" stroke-width="2" />
      <text :x="X + W / 2" :y="newY + 34" text-anchor="middle" fill="var(--na-zinc-50)" font-weight="700" style="font-size: 16px">your message</text>
      <text :x="X - 16" :y="newY + 33" text-anchor="end" fill="var(--na-fg-muted)" style="font-size: 13px">and the newest tool result</text>
      <text :x="X + W + 32" :y="newY + 26" fill="var(--na-primary-300)" font-weight="700" style="font-size: 16px">new</text>
      <text :x="X + W + 32" :y="newY + 46" fill="var(--na-fg-muted)" style="font-size: 13px">paid in full</text>
    </g>

  </svg>
</template>
