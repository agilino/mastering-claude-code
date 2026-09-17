<script setup lang="ts">
// G18 — Worktree parallelism. One repo, N isolated agent worktrees, converging
// at merge. Ground truth: `claude --worktree <name>` (alias -w) creates an
// isolated worktree under .claude/worktrees/<name>/ on its own branch
// (worktree-<name>), so parallel agents don't collide on the same files.
const worktrees = [
  { x: 110, label: 'worktree-notifications', file: 'lib/notify.ts' },
  { x: 350, label: 'worktree-avatar-fix', file: 'app/actions/profile.ts' },
  { x: 590, label: 'worktree-tests', file: 'e2e/join-flow.spec.ts' },
]
</script>

<template>
  <svg viewBox="0 0 900 540" width="900" height="540" class="w-full max-w-4xl h-auto max-h-full" font-family="Inter, sans-serif">
    <!-- main repo -->
    <g v-click>
      <rect x="320" y="10" width="260" height="62" rx="10" fill="var(--na-primary-700)" stroke="var(--na-primary-400)" stroke-width="1.5" />
      <text x="450" y="36" text-anchor="middle" fill="var(--na-fg)" font-weight="700" style="font-size:16px">pawsaw/clash</text>
      <text x="450" y="58" text-anchor="middle" fill="var(--na-fg-muted)" style="font-size:13px">one repo, one working tree, until now</text>
    </g>

    <!-- branch lines from repo to each worktree -->
    <g v-click>
      <path
        v-for="wt in worktrees" :key="'line-' + wt.label"
        :d="`M 450 72 C 450 140, ${wt.x + 100} 130, ${wt.x + 100} 185`"
        fill="none" stroke="var(--na-zinc-600)" stroke-width="2" stroke-dasharray="4 4"
      />
    </g>

    <!-- isolated worktree boxes -->
    <g v-click>
      <g v-for="wt in worktrees" :key="wt.label">
        <rect :x="wt.x" y="185" width="200" height="140" rx="10" fill="var(--na-bg-raised)" stroke="var(--na-border)" stroke-width="1.5" />
        <circle :cx="wt.x + 28" cy="218" r="10" fill="var(--na-secondary-500)" />
        <text :x="wt.x + 46" y="223" fill="var(--na-fg)" font-weight="600" style="font-size:13px">agent</text>
        <text :x="wt.x + 100" y="258" text-anchor="middle" fill="var(--na-fg)" font-weight="600" style="font-size:13px">{{ wt.label }}</text>
        <text :x="wt.x + 100" y="280" text-anchor="middle" fill="var(--na-fg-muted)" font-family="JetBrains Mono, monospace" style="font-size:13px">{{ wt.file }}</text>
        <rect :x="wt.x + 20" y="298" width="160" height="10" rx="3" fill="var(--na-zinc-800)" />
        <rect :x="wt.x + 20" y="298" width="100" height="10" rx="3" fill="var(--na-primary-400)" />
      </g>
    </g>

    <!-- convergence at merge -->
    <g v-click>
      <path
        v-for="wt in worktrees" :key="'merge-' + wt.label"
        :d="`M ${wt.x + 100} 325 C ${wt.x + 100} 400, 450 400, 450 440`"
        fill="none" stroke="var(--na-accent-500)" stroke-width="2.5"
      />
      <rect x="360" y="440" width="180" height="50" rx="10" fill="var(--na-accent-500)" />
      <text x="450" y="471" text-anchor="middle" fill="var(--na-zinc-950)" font-weight="700" style="font-size:15px">merge</text>
      <text x="450" y="525" text-anchor="middle" fill="var(--na-fg-muted)" style="font-size:15px">
        isolated working directories: no file collisions, no shared lock
      </text>
    </g>
  </svg>
</template>
