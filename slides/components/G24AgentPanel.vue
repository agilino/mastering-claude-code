<script setup lang="ts">
// G24 — The subagent panel that sits below the prompt input. Schematic:
// `main` on top, a fresh subagent and a fork indented under it. The
// right-hand labels are ours, not text Claude Code prints.
</script>

<template>
  <svg viewBox="0 0 700 330" width="700" height="330" class="w-full h-auto max-h-full" font-family="Inter, sans-serif">
    <!-- the prompt input, always visible -->
    <rect x="20" y="16" width="660" height="44" rx="10" fill="var(--na-bg-raised)" stroke="var(--na-zinc-700)" stroke-width="2" />
    <text x="40" y="45" fill="var(--na-fg-muted)" style="font-size:17px">&gt; your prompt input</text>

    <!-- the panel under it -->
    <rect x="20" y="76" width="660" height="180" rx="10" fill="var(--na-bg-raised)" stroke="var(--na-zinc-700)" stroke-width="2" />

    <!-- main, always visible -->
    <text x="44" y="114" font-weight="700" fill="var(--na-fg)" style="font-size:20px">main</text>
    <text x="290" y="114" fill="var(--na-fg-muted)" style="font-size:16px">the agent you talk to: your session</text>

    <!-- stage 1: fresh subagent from a definition file -->
    <g v-click>
      <path d="M 56 124 L 56 164 L 76 164" fill="none" stroke="var(--na-secondary-600)" stroke-width="2.5" />
      <text x="86" y="170" font-weight="700" fill="var(--na-fg)" style="font-size:19px">security-auditor</text>
      <text x="290" y="170" fill="var(--na-secondary-600)" style="font-size:16px">fresh subagent · Read, Grep, Glob</text>
    </g>

    <!-- stage 2: fork -->
    <g v-click>
      <path d="M 56 176 L 56 222 L 76 222" fill="none" stroke="var(--na-success-500)" stroke-width="2.5" />
      <text x="86" y="228" font-weight="700" fill="var(--na-fg)" style="font-size:19px">run unit tests</text>
      <text x="290" y="228" fill="var(--na-success-500)" style="font-size:16px">fork · copy of your chat · every tool</text>
    </g>

    <!-- stage 3: a skill is not a row -->
    <g v-click>
      <text x="44" y="288" font-weight="700" fill="var(--na-accent-500)" style="font-size:17px">A skill never gets a row.</text>
      <text x="44" y="312" fill="var(--na-fg-muted)" style="font-size:15px">It is text loaded into whichever conversation runs it.</text>
    </g>
  </svg>
</template>
