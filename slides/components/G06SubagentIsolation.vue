<script setup lang="ts">
// G6 — Subagent isolation. Parent thread and child with separate context
// windows; only a summary crosses back. Compact 700x440 viewBox shared
// with G7 so the two sit side by side at the same size.
const noise = ['read', 'grep', 'read', 'read', 'edit', 'read']
</script>

<template>
  <svg viewBox="0 0 700 440" width="700" height="440" class="w-full h-auto max-h-full" font-family="Inter, sans-serif">
    <!-- parent frame -->
    <rect x="20" y="20" width="300" height="380" rx="14" fill="var(--na-bg-raised)" stroke="var(--na-zinc-700)" stroke-width="2" />
    <text x="40" y="55" font-weight="700" fill="var(--na-fg)" style="font-size:18px">Parent session</text>
    <rect x="40" y="70" width="260" height="18" rx="9" fill="var(--na-zinc-800)" />
    <rect x="40" y="70" width="28" height="18" rx="9" fill="var(--na-primary-500)" />

    <!-- subagent frame -->
    <rect x="380" y="20" width="300" height="380" rx="14" fill="var(--na-bg-raised)" stroke="var(--na-zinc-700)" stroke-width="2" />
    <text x="400" y="55" font-weight="700" fill="var(--na-fg)" style="font-size:18px">Subagent</text>
    <text x="400" y="76" fill="var(--na-fg-muted)" style="font-size:13px">its own context window</text>

    <!-- stage 1: subagent fills with noisy tool calls -->
    <g v-click>
      <rect x="400" y="90" width="260" height="18" rx="9" fill="var(--na-zinc-800)" />
      <rect x="400" y="90" width="244" height="18" rx="9" fill="var(--na-secondary-600)" />
      <g v-for="(n, i) in noise" :key="i">
        <rect
          :x="400 + (i % 3) * 90" :y="130 + Math.floor(i / 3) * 50"
          width="80" height="38" rx="6"
          fill="var(--na-zinc-800)" stroke="var(--na-zinc-600)" stroke-width="1.5"
        />
        <text :x="440 + (i % 3) * 90" :y="154 + Math.floor(i / 3) * 50" text-anchor="middle" fill="var(--na-fg-muted)" style="font-size:13px">{{ n }}</text>
      </g>
      <text x="400" y="256" fill="var(--na-fg-muted)" style="font-size:13px">40 files read, dead ends, retries:</text>
      <text x="400" y="276" fill="var(--na-fg-muted)" style="font-size:13px">all of it stays in here</text>
    </g>

    <!-- stage 2: thin summary crosses back, parent barely moves -->
    <g v-click>
      <path d="M 380 380 L 262 380" fill="none" stroke="var(--na-accent-500)" stroke-width="3" marker-end="url(#arrowG6)" />
      <rect x="70" y="365" width="180" height="30" rx="15" fill="var(--na-accent-500)" />
      <text x="160" y="385" text-anchor="middle" font-weight="700" fill="var(--na-zinc-950)" style="font-size:13px">summary only</text>

      <!-- parent context bar barely moves -->
      <text x="40" y="304" fill="var(--na-fg-muted)" style="font-size:13px">/context on the main thread:</text>
      <text x="40" y="322" fill="var(--na-fg-muted)" style="font-size:13px">barely moved</text>
      <rect x="40" y="332" width="260" height="18" rx="9" fill="var(--na-zinc-800)" />
      <rect x="40" y="332" width="40" height="18" rx="9" fill="var(--na-primary-500)" />
    </g>

    <defs>
      <marker id="arrowG6" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto">
        <path d="M0,0 L8,4 L0,8 Z" fill="var(--na-accent-500)" />
      </marker>
    </defs>
  </svg>
</template>
