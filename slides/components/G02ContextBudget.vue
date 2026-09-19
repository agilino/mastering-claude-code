<script setup lang="ts">
// G2 — Context window as a budget. A filling vertical bar, bottom to top:
// system prompt, CLAUDE.md, skill descriptions, tool results, conversation,
// free room, then the drift zone where things go wrong.
const bands = [
  { key: 'system', label: 'System prompt', h: 34, color: 'var(--na-zinc-600)' },
  { key: 'claude-md', label: 'CLAUDE.md', h: 30, color: 'var(--na-zinc-500)' },
  { key: 'skills', label: 'Skill descriptions', h: 46, color: 'var(--na-primary-700)' },
  { key: 'tool-results', label: 'Tool results', h: 110, color: 'var(--na-primary-500)' },
  { key: 'conversation', label: 'Conversation', h: 130, color: 'var(--na-primary-400)' },
] as const
const barWidth = 260
const barX = 330
const topY = 40
const bottomY = 480
const driftH = 46
const filled = bands.reduce((s, b) => s + b.h, 0)
const freeTop = topY + driftH
const freeH = bottomY - filled - freeTop
</script>

<template>
  <div class="w-full flex flex-col items-center">
    <svg viewBox="0 0 960 500" width="960" height="500" class="w-full max-w-2xl h-auto max-h-full" role="img" aria-label="Context window as a budget">
      <!-- outer container -->
      <rect :x="barX" :y="topY" :width="barWidth" :height="bottomY - topY" fill="none" stroke="var(--na-zinc-700)" stroke-width="2" rx="6" />

      <!-- free room, labelled -->
      <text :x="barX + barWidth / 2" :y="freeTop + freeH / 2 + 5" text-anchor="middle" fill="var(--na-zinc-500)" style="font-size:14px">free</text>

      <!-- drift zone at the very top -->
      <g v-click="5">
        <rect :x="barX" :y="topY" :width="barWidth" :height="driftH" fill="var(--na-error-500)" opacity="0.85" rx="4" />
        <text :x="barX + barWidth / 2" :y="topY + 29" text-anchor="middle" font-weight="700" fill="white" style="font-size:15px">drift zone</text>
      </g>

      <!-- bands, bottom to top -->
      <g v-for="(band, i) in bands" :key="band.key" v-click="i + 1">
        <rect
          :x="barX"
          :y="bottomY - bands.slice(0, i + 1).reduce((s, b) => s + b.h, 0)"
          :width="barWidth"
          :height="band.h"
          :fill="band.color"
        />
        <text
          :x="barX - 16"
          :y="bottomY - bands.slice(0, i).reduce((s, b) => s + b.h, 0) - band.h / 2 + 5"
          text-anchor="end"
          fill="var(--na-fg)"
          style="font-size:15px"
        >{{ band.label }}</text>
      </g>

      <!-- variable-size callout on the two growth bands -->
      <g v-click="5">
        <text :x="barX + barWidth + 24" y="300" fill="var(--na-fg-muted)" style="font-size:15px">tool results and conversation grow.</text>
        <text :x="barX + barWidth + 24" y="322" fill="var(--na-fg-muted)" style="font-size:15px">Everything else is fixed.</text>
        <text :x="barX + barWidth + 24" y="360" fill="var(--na-error-500)" font-weight="700" style="font-size:15px">Uncontrolled, they push you</text>
        <text :x="barX + barWidth + 24" y="382" fill="var(--na-error-500)" font-weight="700" style="font-size:15px">into the drift zone.</text>
      </g>
    </svg>
  </div>
</template>
