<script setup lang="ts">
// G30 — Five decisions behind a good MCP tool server (task 19's "Why").
// One static card per decision: a number, the decision's title (the bold labels in
// tasks/19-build-your-own-mcp.md) and one tiny example, written with the names and
// texts of CLASH's finished server (workshop-artifacts/19-build-mcp/server.ts). No clicks.
//
// Geometry: every example sits in a pill of the same width, so no text width is
// estimated. The longest example line (55 monospace characters at 15px, 0.6em each)
// needs 495 units; the pill has 526 inside its padding. Card 4 holds two lines, one per
// write tool, so its row is taller; every other row is one line.
const decisions = [
  { title: 'Small tools', example: ['find_venue → id → create_clash'] },
  { title: 'Descriptions are the interface', example: ['venueId: "id from find_venue"'] },
  { title: 'Refusals are product text', example: ['refuse("Duplicate: …") · reply("No venue matches …")'] },
  { title: 'Check before you write', example: ['create: host → venue → date → duplicate', 'cancel: host → clash → owner'] },
  { title: 'No more power than needed', example: ['cancel_clash: own clash only · reads free · writes ask'] },
]
const lineGap = 21
const rowH = (d: (typeof decisions)[number]) => 48 + (d.example.length - 1) * 24
const gap = 10
const rowY = (i: number) => 2 + decisions.slice(0, i).reduce((y, d) => y + rowH(d) + gap, 0)
const mid = (i: number) => rowY(i) + rowH(decisions[i]) / 2
const height = rowY(decisions.length) - gap + 2
const pill = { x: 380, w: 550 }
const pillH = (d: (typeof decisions)[number]) => 32 + (d.example.length - 1) * lineGap
// baseline of line j: the block of lines is centred on the row's middle
const lineY = (i: number, j: number) => mid(i) + 5 + (j - (decisions[i].example.length - 1) / 2) * lineGap
const mono = "'JetBrains Mono', monospace"
</script>

<template>
  <svg :viewBox="`0 0 960 ${height}`" width="960" :height="height" class="w-full max-w-4xl h-auto max-h-full" font-family="Inter, sans-serif" role="img" aria-label="Five decisions behind a good tool server, each with one example from the CLASH server">
    <g v-for="(d, i) in decisions" :key="d.title">
      <rect x="10" :y="rowY(i)" width="940" :height="rowH(d)" rx="10" fill="var(--na-bg-raised)" stroke="var(--na-zinc-700)" stroke-width="2" />

      <!-- the number -->
      <circle cx="46" :cy="mid(i)" r="15" fill="var(--na-primary-900)" stroke="var(--na-accent-500)" stroke-width="1.5" />
      <text x="46" :y="mid(i) + 5" text-anchor="middle" fill="var(--na-accent-500)" font-weight="700" style="font-size:15px">{{ i + 1 }}</text>

      <!-- the decision -->
      <text x="80" :y="mid(i) + 6" fill="var(--na-fg)" font-weight="600" style="font-size:17px">{{ d.title }}</text>

      <!-- one tiny example -->
      <rect :x="pill.x" :y="mid(i) - pillH(d) / 2" :width="pill.w" :height="pillH(d)" rx="8" fill="var(--na-primary-900)" />
      <text v-for="(line, j) in d.example" :key="line" :x="pill.x + 12" :y="lineY(i, j)" fill="var(--na-fg)" :font-family="mono" style="font-size:15px">{{ line }}</text>
    </g>
  </svg>
</template>
