<script setup lang="ts">
// G15 — MCP topology. Claude Code <-> MCP servers <-> browser / external systems.
</script>

<template>
  <div class="w-full flex justify-center">
    <svg viewBox="0 0 960 400" width="960" height="400" class="w-full max-w-4xl h-auto max-h-full">
      <!-- Claude Code hub -->
      <g v-click>
        <rect x="390" y="30" width="180" height="60" rx="10" fill="var(--na-primary-700)" stroke="var(--na-primary-400)" stroke-width="2" />
        <text x="480" y="66" font-weight="700" fill="var(--na-fg)" text-anchor="middle" style="font-size:18px">Claude Code</text>
      </g>

      <!-- MCP servers -->
      <g v-click>
        <line x1="430" y1="90" x2="260" y2="180" stroke="var(--na-zinc-500)" stroke-width="2" marker-end="url(#arrowM)" />
        <line x1="260" y1="180" x2="430" y2="90" stroke="var(--na-zinc-500)" stroke-width="2" marker-end="url(#arrowM)" />
        <rect x="150" y="180" width="220" height="56" rx="10" style="fill: var(--na-bg-raised); stroke: var(--na-border)" />
        <text x="260" y="213" font-weight="600" fill="var(--na-fg)" text-anchor="middle" style="font-size:15px">Playwright MCP</text>

        <line x1="530" y1="90" x2="700" y2="180" stroke="var(--na-zinc-500)" stroke-width="2" marker-end="url(#arrowM)" />
        <line x1="700" y1="180" x2="530" y2="90" stroke="var(--na-zinc-500)" stroke-width="2" marker-end="url(#arrowM)" />
        <rect x="590" y="180" width="220" height="56" rx="10" style="fill: var(--na-bg-raised); stroke: var(--na-border)" />
        <text x="700" y="213" font-weight="600" fill="var(--na-fg)" text-anchor="middle" style="font-size:15px">Chrome DevTools MCP</text>
      </g>

      <!-- Onward connections -->
      <g v-click>
        <line x1="260" y1="236" x2="260" y2="315" stroke="var(--na-accent-500)" stroke-width="2" marker-end="url(#arrowA)" />
        <rect x="130" y="318" width="260" height="52" rx="10" fill="var(--na-primary-900)" stroke="var(--na-accent-500)" stroke-width="1.5" />
        <text x="260" y="349" fill="var(--na-fg)" text-anchor="middle" style="font-size:14px">localhost:3000 (CLASH)</text>

        <line x1="700" y1="236" x2="700" y2="315" stroke="var(--na-accent-500)" stroke-width="2" marker-end="url(#arrowA)" />
        <rect x="570" y="318" width="260" height="52" rx="10" fill="var(--na-primary-900)" stroke="var(--na-accent-500)" stroke-width="1.5" />
        <text x="700" y="349" fill="var(--na-fg)" text-anchor="middle" style="font-size:14px">Chrome / DevTools protocol</text>
      </g>

      <defs>
        <marker id="arrowM" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
          <path d="M0,0 L8,4 L0,8 Z" fill="var(--na-zinc-500)" />
        </marker>
        <marker id="arrowA" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
          <path d="M0,0 L8,4 L0,8 Z" fill="var(--na-accent-500)" />
        </marker>
      </defs>
    </svg>
  </div>
</template>
