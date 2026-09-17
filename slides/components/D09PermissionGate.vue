<script setup lang="ts">
// D09 — Permissions as a gate. A tool call reaches the harness; a rule
// decides, or you do. The five modes change how often you are asked.
const modes = [
  { key: 'manual', label: 'manual', meaning: 'asks before edits and commands' },
  { key: 'accept', label: 'accept edits', meaning: 'file edits pass, commands still ask' },
  { key: 'plan', label: 'plan', meaning: 'read only: look, never touch' },
  { key: 'auto', label: 'auto', meaning: 'a classifier blocks the risky actions instead of asking' },
  { key: 'bypass', label: 'bypass', meaning: 'nothing asks — sandbox only' },
]
</script>

<template>
  <svg viewBox="0 0 960 500" class="w-full h-auto max-h-full" role="img" aria-label="Permissions gate">
    <defs>
      <marker id="d9-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
        <path d="M0,0 L0,6 L8,3 z" fill="var(--na-zinc-400)" />
      </marker>
    </defs>

    <!-- tool call -->
    <rect x="30" y="118" width="150" height="50" rx="8" fill="var(--na-bg-raised)" stroke="var(--na-accent-500)" stroke-width="2" />
    <text x="105" y="140" text-anchor="middle" fill="var(--na-fg)" font-weight="700" style="font-size: 15px">tool call</text>
    <text x="105" y="158" text-anchor="middle" fill="var(--na-fg-muted)" style="font-size: 13px">from the model</text>
    <line x1="182" y1="143" x2="262" y2="143" stroke="var(--na-zinc-400)" stroke-width="2.5" marker-end="url(#d9-arrow)" />

    <!-- rule diamond -->
    <g v-click="1">
      <polygon points="390,88 520,143 390,198 260,143" fill="var(--na-bg-raised)" stroke="var(--na-primary-400)" stroke-width="2.5" />
      <text x="390" y="138" text-anchor="middle" fill="var(--na-fg)" font-weight="700" style="font-size: 15px">a rule</text>
      <text x="390" y="158" text-anchor="middle" fill="var(--na-fg-muted)" style="font-size: 13px">in settings?</text>
    </g>

    <!-- allow / deny straight from the rule -->
    <g v-click="2">
      <path d="M 522 143 L 660 143 L 660 70 L 700 70" fill="none" stroke="var(--na-zinc-400)" stroke-width="2.5" marker-end="url(#d9-arrow)" />
      <text x="600" y="60" text-anchor="middle" fill="var(--na-success-500)" font-weight="600" style="font-size: 14px">allow</text>
      <path d="M 660 143 L 660 218 L 700 218" fill="none" stroke="var(--na-zinc-400)" stroke-width="2.5" marker-end="url(#d9-arrow)" />
      <text x="600" y="236" text-anchor="middle" fill="var(--na-error-500)" font-weight="600" style="font-size: 14px">deny</text>
    </g>

    <!-- no rule → ask you -->
    <g v-click="3">
      <line x1="390" y1="200" x2="390" y2="262" stroke="var(--na-zinc-400)" stroke-width="2.5" marker-end="url(#d9-arrow)" />
      <text x="405" y="238" fill="var(--na-fg-muted)" style="font-size: 13px">no rule</text>
      <rect x="315" y="266" width="150" height="50" rx="8" fill="var(--na-bg-raised)" stroke="var(--na-zinc-200)" stroke-width="2.5" />
      <text x="390" y="288" text-anchor="middle" fill="var(--na-fg)" font-weight="700" style="font-size: 15px">ask you</text>
      <text x="390" y="306" text-anchor="middle" fill="var(--na-fg-muted)" style="font-size: 13px">the permission prompt</text>
      <path d="M 467 291 L 560 291 L 560 92 L 700 92" fill="none" stroke="var(--na-zinc-400)" stroke-width="2.5" marker-end="url(#d9-arrow)" />
      <text x="520" y="280" fill="var(--na-success-500)" font-weight="600" style="font-size: 14px">yes</text>
      <path d="M 560 291 L 560 240 L 700 240" fill="none" stroke="var(--na-zinc-400)" stroke-width="2.5" marker-end="url(#d9-arrow)" />
      <text x="570" y="262" fill="var(--na-error-500)" font-weight="600" style="font-size: 14px">no</text>
    </g>

    <!-- outcomes -->
    <rect x="702" y="46" width="200" height="70" rx="8" fill="var(--na-primary-900)" stroke="var(--na-success-500)" stroke-width="2" />
    <text x="802" y="76" text-anchor="middle" fill="var(--na-fg)" font-weight="700" style="font-size: 15px">harness runs the tool</text>
    <text x="802" y="98" text-anchor="middle" fill="var(--na-fg-muted)" style="font-size: 13px">result goes back to the model</text>
    <rect x="702" y="194" width="200" height="70" rx="8" fill="var(--na-bg-raised)" stroke="var(--na-error-500)" stroke-width="2" />
    <text x="802" y="224" text-anchor="middle" fill="var(--na-fg)" font-weight="700" style="font-size: 15px">nothing runs</text>
    <text x="802" y="246" text-anchor="middle" fill="var(--na-fg-muted)" style="font-size: 13px">the model is told why</text>

    <!-- modes -->
    <text x="30" y="380" fill="var(--na-fg-muted)" font-weight="600" style="font-size: 13px">MODE  ·  how often the gate asks you</text>
    <g v-for="(m, i) in modes" :key="m.key">
      <rect :x="30 + i * 184" y="394" width="170" height="40" rx="20" fill="var(--na-bg-raised)" stroke="var(--na-zinc-600)" stroke-width="1.5" />
      <g v-click="4 + i"><rect :x="30 + i * 184" y="394" width="170" height="40" rx="20" fill="var(--na-primary-900)" stroke="var(--na-accent-500)" stroke-width="2.5" /></g>
      <text :x="115 + i * 184" y="420" text-anchor="middle" fill="var(--na-fg)" font-weight="600" style="font-size: 15px">{{ m.label }}</text>
      <text v-click="[4 + i, 5 + i]" x="30" y="472" fill="var(--na-accent-400)" style="font-size: 15px">{{ m.label }}: {{ m.meaning }}</text>
    </g>
  </svg>
</template>
