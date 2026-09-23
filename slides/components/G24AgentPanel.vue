<script setup lang="ts">
// G24 — The subagent panel that sits below the prompt input. Schematic:
// `main` on top, a fresh subagent and a fork indented under it. The
// right-hand labels are ours, not text Claude Code prints.
</script>

<template>
  <svg viewBox="0 0 700 330" width="700" height="330" class="w-full h-auto max-h-full" font-family="Inter, sans-serif">
    <!-- the prompt input, always visible -->
    <rect x="20" y="16" width="660" height="44" rx="10" fill="var(--na-bg-raised)" stroke="var(--na-zinc-700)" stroke-width="2" />
    <text x="40" y="44" fill="var(--na-fg-muted)" style="font-size:15px">&gt; your prompt input</text>

    <!-- the panel under it -->
    <rect x="20" y="76" width="660" height="180" rx="10" fill="var(--na-bg-raised)" stroke="var(--na-zinc-700)" stroke-width="2" />

    <!-- main, always visible -->
    <text x="44" y="112" font-weight="700" fill="var(--na-fg)" style="font-size:16px">main</text>
    <text x="250" y="112" fill="var(--na-fg-muted)" style="font-size:13px">the agent you talk to: your session</text>

    <!-- stage 1: fresh subagent from a definition file -->
    <g v-click>
      <path d="M 56 122 L 56 158 L 76 158" fill="none" stroke="var(--na-secondary-600)" stroke-width="2.5" />
      <text x="86" y="163" font-weight="700" fill="var(--na-fg)" style="font-size:16px">security-auditor</text>
      <text x="250" y="163" fill="var(--na-secondary-600)" style="font-size:13px">subagent, fresh · own context · tools: Read, Grep, Glob</text>
    </g>

    <!-- stage 2: fork -->
    <g v-click>
      <path d="M 56 172 L 56 208 L 76 208" fill="none" stroke="var(--na-success-500)" stroke-width="2.5" />
      <text x="86" y="213" font-weight="700" fill="var(--na-fg)" style="font-size:16px">run unit tests</text>
      <text x="250" y="213" fill="var(--na-success-500)" style="font-size:13px">fork · copy of your chat · every tool main has</text>
    </g>

    <!-- stage 3: a skill is not a row -->
    <g v-click>
      <text x="44" y="288" font-weight="700" fill="var(--na-accent-500)" style="font-size:14px">A skill never gets a row.</text>
      <text x="44" y="308" fill="var(--na-fg-muted)" style="font-size:13px">It is text loaded into whichever conversation runs it. No loop of its own.</text>
    </g>
  </svg>
</template>
