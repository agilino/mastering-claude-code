<script setup lang="ts">
// G22 — CLAUDE.md memory does NOT override like settings (see
// G21SettingsPrecedence). Every discovered file is concatenated into
// context, root directory first, working directory last, CLAUDE.local.md
// appended right after CLAUDE.md at each level. Verified against
// code.claude.com/docs/en/memory — do not redraw this as a precedence
// stack, that is a different mechanism (G21).
const sources = [
  { name: '~/.claude/CLAUDE.md', note: 'user, every project' },
  { name: 'CLAUDE.md (repo root)', note: 'read first' },
  { name: 'CLAUDE.local.md (root)', note: 'gitignored, appended after' },
  { name: 'foo/CLAUDE.md', note: 'closer to your working dir' },
  { name: '.claude/rules/*.md', note: 'on demand — repo-wide or paths:-scoped' },
]
</script>

<template>
  <svg viewBox="0 0 900 420" class="w-full h-auto max-h-full" role="img" aria-label="CLAUDE.md files concatenate into one context, they do not override each other">
    <g v-for="(s, i) in sources" :key="s.name" v-click="i + 1">
      <rect x="40" :y="30 + i * 58" width="380" height="46" rx="8" fill="var(--na-bg-raised)" stroke="var(--na-primary-400)" stroke-width="1.5" />
      <text x="58" :y="30 + i * 58 + 20" fill="var(--na-fg)" font-weight="700" font-family="var(--font-mono, monospace)" style="font-size: 14px">{{ s.name }}</text>
      <text x="58" :y="30 + i * 58 + 38" fill="var(--na-fg-muted)" style="font-size: 13px">{{ s.note }}</text>
      <path
        :d="`M 420 ${30 + i * 58 + 23} C 520 ${30 + i * 58 + 23}, 560 ${210} 620 ${210}`"
        fill="none" stroke="var(--na-zinc-400)" stroke-width="1.5"
      />
    </g>
    <g v-click="6">
      <rect x="620" y="150" width="240" height="120" rx="10" fill="var(--na-primary-900)" stroke="var(--na-accent-500)" stroke-width="2.5" />
      <text x="740" y="200" text-anchor="middle" fill="var(--na-fg)" font-weight="700" style="font-size: 16px">one context</text>
      <text x="740" y="222" text-anchor="middle" fill="var(--na-fg-muted)" style="font-size: 13px">all concatenated —</text>
      <text x="740" y="240" text-anchor="middle" fill="var(--na-fg-muted)" style="font-size: 13px">nothing "wins"</text>
    </g>
    <text v-click="7" x="740" y="310" text-anchor="middle" fill="var(--na-error-500)" font-weight="600" style="font-size: 13px">contradiction? Claude picks either — keep them consistent</text>
  </svg>
</template>
