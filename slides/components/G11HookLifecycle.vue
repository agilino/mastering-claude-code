<script setup lang="ts">
// G11 — the hook lifecycle. PreToolUse -> Tool -> PostToolUse -> Stop, with
// the exit-code branches. Only exit code 2 does anything special: before a
// tool it blocks the call; after a tool it cannot block (the tool already
// ran) and its stderr goes to the agent; on Stop it keeps the turn open.
// Exit-0 stdout on PreToolUse/PostToolUse never reaches the agent.
</script>

<template>
  <div class="w-full h-full flex items-center justify-center">
    <svg viewBox="0 0 1000 420" width="1000" height="420" class="w-full max-w-5xl h-auto max-h-full">
      <defs>
        <marker id="arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="var(--na-fg-muted)" />
        </marker>
        <marker id="arrow-error" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="var(--na-error-500)" />
        </marker>
      </defs>

      <g font-family="Inter, sans-serif">
        <!-- Agent -->
        <rect x="10" y="90" width="130" height="60" rx="10" fill="var(--na-bg-raised)" stroke="var(--na-primary-500)" stroke-width="2" />
        <text x="75" y="125" text-anchor="middle" fill="var(--na-fg)" font-weight="600" style="font-size:18px">Agent</text>

        <!-- PreToolUse -->
        <rect x="210" y="90" width="170" height="60" rx="10" fill="var(--na-bg-raised)" stroke="var(--na-zinc-600)" stroke-width="2" />
        <text x="295" y="125" text-anchor="middle" fill="var(--na-fg)" font-weight="600" style="font-size:17px">PreToolUse</text>

        <!-- Tool -->
        <rect x="450" y="90" width="130" height="60" rx="10" fill="var(--na-bg-raised)" stroke="var(--na-zinc-600)" stroke-width="2" />
        <text x="515" y="125" text-anchor="middle" fill="var(--na-fg)" font-weight="600" style="font-size:18px">Tool</text>

        <!-- PostToolUse -->
        <rect x="650" y="90" width="180" height="60" rx="10" fill="var(--na-bg-raised)" stroke="var(--na-zinc-600)" stroke-width="2" />
        <text x="740" y="125" text-anchor="middle" fill="var(--na-fg)" font-weight="600" style="font-size:17px">PostToolUse</text>

        <!-- Stop -->
        <rect x="870" y="90" width="110" height="60" rx="10" fill="var(--na-bg-raised)" stroke="var(--na-zinc-600)" stroke-width="2" />
        <text x="925" y="125" text-anchor="middle" fill="var(--na-fg)" font-weight="600" style="font-size:18px">Stop</text>

        <!-- connecting arrows, always visible -->
        <line x1="140" y1="120" x2="205" y2="120" stroke="var(--na-fg-muted)" stroke-width="2" marker-end="url(#arrow)" />
        <line x1="380" y1="120" x2="445" y2="120" stroke="var(--na-fg-muted)" stroke-width="2" marker-end="url(#arrow)" />
        <line x1="580" y1="120" x2="645" y2="120" stroke="var(--na-fg-muted)" stroke-width="2" marker-end="url(#arrow)" />
        <line x1="830" y1="120" x2="865" y2="120" stroke="var(--na-fg-muted)" stroke-width="2" marker-end="url(#arrow)" />

        <!-- exit-0 continues labels, stage 1 -->
        <g v-click="1">
          <text x="295" y="70" text-anchor="middle" fill="var(--na-primary-400)" style="font-size:14px">exit 0 → continues</text>
          <text x="740" y="70" text-anchor="middle" fill="var(--na-primary-400)" style="font-size:14px">exit 0 → continues</text>
          <text x="295" y="172" text-anchor="middle" fill="var(--na-fg-muted)" style="font-size:13px">stdout: debug log only</text>
          <text x="740" y="172" text-anchor="middle" fill="var(--na-fg-muted)" style="font-size:13px">stdout: debug log only</text>
        </g>

        <!-- PreToolUse block branch, stage 2 -->
        <g v-click="2">
          <line x1="295" y1="185" x2="295" y2="240" stroke="var(--na-error-500)" stroke-width="2" marker-end="url(#arrow-error)" />
          <rect x="170" y="245" width="250" height="60" rx="8" fill="var(--na-bg)" stroke="var(--na-error-500)" stroke-width="2" />
          <text x="295" y="270" text-anchor="middle" fill="var(--na-error-500)" font-weight="700" style="font-size:15px">exit 2 → BLOCKS the call</text>
          <text x="295" y="292" text-anchor="middle" fill="var(--na-fg-muted)" style="font-size:13px">stderr goes to the agent</text>
          <path d="M 170,275 C 110,275 75,230 75,155" fill="none" stroke="var(--na-error-500)" stroke-width="2" stroke-dasharray="5,4" marker-end="url(#arrow-error)" />
        </g>

        <!-- PostToolUse branch, stage 3: not blocking, tool already ran -->
        <g v-click="3">
          <line x1="740" y1="185" x2="740" y2="325" stroke="var(--na-error-500)" stroke-width="2" marker-end="url(#arrow-error)" />
          <rect x="600" y="330" width="280" height="80" rx="8" fill="var(--na-bg)" stroke="var(--na-error-500)" stroke-width="2" />
          <text x="740" y="355" text-anchor="middle" fill="var(--na-error-500)" font-weight="700" style="font-size:15px">exit 2 → does NOT block</text>
          <text x="740" y="377" text-anchor="middle" fill="var(--na-fg-muted)" style="font-size:13px">the tool already ran</text>
          <text x="740" y="396" text-anchor="middle" fill="var(--na-fg-muted)" style="font-size:13px">stderr goes to the agent as a warning</text>
          <path d="M 600,370 C 420,410 40,410 40,155" fill="none" stroke="var(--na-error-500)" stroke-width="2" stroke-dasharray="5,4" marker-end="url(#arrow-error)" />
        </g>

        <!-- Stop's own gate, stage 4 -->
        <g v-click="4">
          <line x1="925" y1="150" x2="925" y2="205" stroke="var(--na-error-500)" stroke-width="2" marker-end="url(#arrow-error)" />
          <rect x="760" y="210" width="230" height="60" rx="8" fill="var(--na-bg)" stroke="var(--na-accent-500)" stroke-width="2" />
          <text x="875" y="235" text-anchor="middle" fill="var(--na-accent-500)" font-weight="700" style="font-size:15px">exit 2 → turn cannot end</text>
          <text x="875" y="257" text-anchor="middle" fill="var(--na-fg-muted)" style="font-size:13px">the agent keeps working</text>
        </g>
      </g>
    </svg>
  </div>
</template>
