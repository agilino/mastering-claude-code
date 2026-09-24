<script setup lang="ts">
// G30 — Five decisions behind a good MCP tool server (task 19's "Why").
// One static card per decision: a number, the decision's title (the bold labels in
// tasks/19-build-your-own-mcp.md) and one tiny example, written with the names and
// texts of CLASH's finished server (workshop-artifacts/19-build-mcp/server.ts). No clicks.
//
// Geometry: every example sits in a pill of the same width, so no text width is
// estimated. The longest example (51 monospace characters at 15px, 0.6em each) needs
// 459 units; the pill has 506 inside its padding.
const decisions = [
  { title: 'Small tools', example: 'find_venue → id → create_clash' },
  { title: 'Descriptions are the interface', example: 'venueId: "id from find_venue"' },
  { title: 'Refusals are product text', example: 'refuse("Duplicate: …") · reply("No venue matches …")' },
  { title: 'Check before you write', example: 'host → venue → date → duplicate → create' },
  { title: 'No more power than needed', example: 'no delete tool · reads allowed · create_clash asks' },
]
const rowH = 48
const gap = 10
const rowY = (i: number) => 2 + i * (rowH + gap)
const mid = (i: number) => rowY(i) + rowH / 2
const pill = { x: 400, w: 530, h: 32 }
const mono = "'JetBrains Mono', monospace"
</script>

<template>
  <svg viewBox="0 0 960 284" width="960" height="284" class="w-full max-w-4xl h-auto max-h-full" font-family="Inter, sans-serif" role="img" aria-label="Five decisions behind a good tool server, each with one example from the CLASH server">
    <g v-for="(d, i) in decisions" :key="d.title">
      <rect x="10" :y="rowY(i)" width="940" :height="rowH" rx="10" fill="var(--na-bg-raised)" stroke="var(--na-zinc-700)" stroke-width="2" />

      <!-- the number -->
      <circle cx="46" :cy="mid(i)" r="15" fill="var(--na-primary-900)" stroke="var(--na-accent-500)" stroke-width="1.5" />
      <text x="46" :y="mid(i) + 5" text-anchor="middle" fill="var(--na-accent-500)" font-weight="700" style="font-size:15px">{{ i + 1 }}</text>

      <!-- the decision -->
      <text x="80" :y="mid(i) + 6" fill="var(--na-fg)" font-weight="600" style="font-size:17px">{{ d.title }}</text>

      <!-- one tiny example -->
      <rect :x="pill.x" :y="mid(i) - pill.h / 2" :width="pill.w" :height="pill.h" rx="8" fill="var(--na-primary-900)" />
      <text :x="pill.x + 12" :y="mid(i) + 5" fill="var(--na-fg)" :font-family="mono" style="font-size:15px">{{ d.example }}</text>
    </g>
  </svg>
</template>
