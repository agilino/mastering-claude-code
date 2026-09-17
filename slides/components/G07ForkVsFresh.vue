<script setup lang="ts">
// G7 — Subagent fork vs fresh. Fork inherits conversation + prompt cache;
// fresh starts clean. Compact 700x440 viewBox shared with G6.
</script>

<template>
  <svg viewBox="0 0 700 440" width="700" height="440" class="w-full h-auto max-h-full" font-family="Inter, sans-serif">
    <!-- parent conversation, always visible -->
    <rect x="200" y="20" width="300" height="60" rx="10" fill="var(--na-bg-raised)" stroke="var(--na-zinc-700)" stroke-width="2" />
    <text x="350" y="45" text-anchor="middle" font-weight="700" fill="var(--na-fg)" style="font-size:15px">Parent conversation</text>
    <text x="350" y="66" text-anchor="middle" fill="var(--na-fg-muted)" style="font-size:13px">full history + prompt cache</text>

    <!-- stage 1: fork branches off, inherits everything, cheap -->
    <g v-click>
      <path d="M 260 80 C 220 110, 200 120, 180 138" fill="none" stroke="var(--na-success-500)" stroke-width="3" marker-end="url(#arrowG7a)" />
      <rect x="20" y="150" width="300" height="250" rx="14" fill="var(--na-bg-raised)" stroke="var(--na-success-500)" stroke-width="2" />
      <text x="40" y="184" font-weight="700" fill="var(--na-fg)" style="font-size:18px">Fork</text>
      <text x="40" y="206" fill="var(--na-fg-muted)" style="font-size:13px">on by default in interactive sessions</text>
      <rect x="40" y="222" width="260" height="22" rx="11" fill="var(--na-success-500)" opacity="0.85" />
      <text x="170" y="237" text-anchor="middle" font-weight="700" fill="var(--na-zinc-950)" style="font-size:13px">inherits history, tools, model</text>
      <rect x="40" y="254" width="260" height="22" rx="11" fill="var(--na-success-500)" opacity="0.6" />
      <text x="170" y="269" text-anchor="middle" font-weight="700" fill="var(--na-zinc-950)" style="font-size:13px">inherits the prompt cache</text>
      <text x="40" y="360" font-weight="800" fill="var(--na-success-500)" style="font-size:28px">$</text>
      <text x="72" y="350" fill="var(--na-fg-muted)" style="font-size:13px">cache hit: cheap when shared</text>
      <text x="72" y="368" fill="var(--na-fg-muted)" style="font-size:13px">context is really needed</text>
    </g>

    <!-- stage 2: fresh subagent starts clean, cold, more expensive -->
    <g v-click>
      <path d="M 440 80 C 480 110, 500 120, 520 138" fill="none" stroke="var(--na-secondary-600)" stroke-width="3" marker-end="url(#arrowG7b)" />
      <rect x="380" y="150" width="300" height="250" rx="14" fill="var(--na-bg-raised)" stroke="var(--na-secondary-600)" stroke-width="2" />
      <text x="400" y="184" font-weight="700" fill="var(--na-fg)" style="font-size:18px">Fresh subagent</text>
      <text x="400" y="206" fill="var(--na-fg-muted)" style="font-size:13px">explicit, or fork mode disabled</text>
      <rect x="400" y="222" width="260" height="22" rx="11" fill="var(--na-zinc-800)" stroke="var(--na-zinc-600)" stroke-width="1" />
      <text x="530" y="237" text-anchor="middle" fill="var(--na-fg-muted)" style="font-size:13px">clean context, own system prompt</text>
      <rect x="400" y="254" width="260" height="22" rx="11" fill="var(--na-zinc-800)" stroke="var(--na-zinc-600)" stroke-width="1" />
      <text x="530" y="269" text-anchor="middle" fill="var(--na-fg-muted)" style="font-size:13px">no cache inheritance: cold start</text>
      <text x="400" y="360" font-weight="800" fill="var(--na-secondary-600)" style="font-size:28px">$$</text>
      <text x="446" y="350" fill="var(--na-fg-muted)" style="font-size:13px">full-price first call: worth it</text>
      <text x="446" y="368" fill="var(--na-fg-muted)" style="font-size:13px">when isolation matters more</text>
    </g>

    <defs>
      <marker id="arrowG7a" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 Z" fill="var(--na-success-500)" /></marker>
      <marker id="arrowG7b" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 Z" fill="var(--na-secondary-600)" /></marker>
    </defs>
  </svg>
</template>
