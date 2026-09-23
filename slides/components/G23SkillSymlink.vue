<script setup lang="ts">
// G23 — where Claude Code actually finds a skill. It reads exactly two
// folders: ~/.claude/skills/<name>/ and .claude/skills/<name>/. The
// community installer (npx skills add) writes its canonical copy to
// .agents/skills/ and links it into .claude/skills/ — a skill entry is
// allowed to be a symlink to a directory elsewhere on disk. Miss that link
// and the skill is silently invisible: no error, nothing in /skills.
</script>

<template>
  <svg viewBox="0 0 900 320" class="w-full max-w-3xl h-auto max-h-full" font-family="Inter, sans-serif"
       role="img" aria-label="npx skills add writes the real copy to .agents/skills, then links it into .claude/skills, the only place Claude Code reads">
    <g v-click>
      <rect x="150" y="10" width="600" height="44" rx="22" fill="var(--na-zinc-900)" stroke="var(--na-zinc-700)" stroke-width="1.5" />
      <text x="450" y="38" text-anchor="middle" fill="var(--na-accent-500)" font-family="var(--font-mono, monospace)" style="font-size:15px; font-variant-ligatures:none">npx skills add vercel-labs/agent-browser -g</text>
    </g>

    <g v-click>
      <line x1="450" y1="54" x2="450" y2="106" stroke="var(--na-zinc-600)" stroke-width="1.5" stroke-dasharray="3 3" />

      <rect x="30" y="110" width="360" height="100" rx="10" fill="var(--na-bg-raised)" stroke="var(--na-zinc-600)" stroke-width="2" stroke-dasharray="6 4" />
      <text x="50" y="142" fill="var(--na-fg)" font-weight="700" font-family="var(--font-mono, monospace)" style="font-size:14px">~/.agents/skills/</text>
      <text x="50" y="164" fill="var(--na-fg)" font-weight="700" font-family="var(--font-mono, monospace)" style="font-size:14px">agent-browser/</text>
      <text x="50" y="190" fill="var(--na-fg-muted)" style="font-size:13px">the real copy</text>

      <text x="450" y="150" text-anchor="middle" fill="var(--na-accent-500)" font-weight="600" style="font-size:13px">symlink</text>
      <line x1="392" y1="160" x2="506" y2="160" stroke="var(--na-accent-500)" stroke-width="2.5" marker-end="url(#arrowG23)" />

      <rect x="510" y="110" width="360" height="100" rx="10" fill="var(--na-primary-900)" stroke="var(--na-accent-500)" stroke-width="2.5" />
      <text x="530" y="142" fill="var(--na-fg)" font-weight="700" font-family="var(--font-mono, monospace)" style="font-size:14px">~/.claude/skills/</text>
      <text x="530" y="164" fill="var(--na-fg)" font-weight="700" font-family="var(--font-mono, monospace)" style="font-size:14px">agent-browser</text>
      <text x="530" y="190" fill="var(--na-accent-500)" style="font-size:13px">the only place Claude reads</text>
    </g>

    <g v-click>
      <text x="450" y="256" text-anchor="middle" fill="var(--na-error-500)" font-weight="600" style="font-size:14px">no link → the skill is invisible, and nothing warns you</text>
      <text x="450" y="282" text-anchor="middle" fill="var(--na-fg-muted)" style="font-size:13px">check inside Claude Code with /skills</text>
    </g>

    <defs>
      <marker id="arrowG23" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto">
        <path d="M0,0 L8,4 L0,8 Z" fill="var(--na-accent-500)" />
      </marker>
    </defs>
  </svg>
</template>
