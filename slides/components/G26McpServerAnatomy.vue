<script setup lang="ts">
// G26 — Anatomy of the CLASH MCP server.
// client <-> stdio <-> mcp/server.ts (four tools) <-> Prisma <-> dev.db
//
// Prop `mode`:
//   'claude-code' (default) — builds up in three clicks: the client and its stdio
//                             link, the server with its four tools, Prisma + dev.db.
//   'both'                  — the whole chain on the first click, then clash-conference
//                             appears as a second client of the same server on the next.
// A note's [click] markers must match: three for 'claude-code', two for 'both'.
//
// Geometry: the client boxes sit at the left edge. In 'both' mode the server, Prisma
// and dev.db shift right by `dx` so each arrow label fits between a client box and the
// server. The viewBox grows in width, never in height: the graphic is height-bound on
// the slide, so extra width costs no text size while extra height would shrink it.
const props = withDefaults(defineProps<{ mode?: 'claude-code' | 'both' }>(), { mode: 'claude-code' })

const both = props.mode === 'both'
const clicks = both ? { client: 1, server: 1, db: 1, second: 2 } : { client: 1, server: 2, db: 3, second: 0 }

const dx = both ? 100 : 0
const viewW = 1000 + dx
const serverX = 340 + dx // left edge of the server box: where every client arrow lands
const serverMidX = serverX + 160
const prismaX = serverX + 390
const dbX = serverX + 600 // centre of the dev.db cylinder
const arrowLabelX = (220 + serverX) / 2

// Client boxes are 200 wide at x=20. Alone: centred on the server's midline (y=200).
// Stacked: Claude Code above, clash-conference below, both arrows inside the server's height.
const clientY = both ? 88 : 168
const clientMidY = clientY + 32
const secondY = 208
const secondMidY = secondY + 32

const tools = ['list_upcoming_clashes', 'find_venue', 'create_clash', 'cancel_clash']
// The server box: 68..332, centred on y=200 like every arrow that lands on it. Four pills,
// 32 high with 8 between, from y=118; the registerTool caption sits below the last one.
const pillY = (i: number) => 118 + i * 40
const mono = "'JetBrains Mono', monospace"
</script>

<template>
  <div class="w-full flex justify-center">
    <svg :viewBox="`0 0 ${viewW} 400`" :width="viewW" height="400" class="w-full max-w-4xl h-auto max-h-full" font-family="Inter, sans-serif">
      <!-- Claude Code: the client. It starts the server and talks to it over stdin / stdout. -->
      <g v-click="clicks.client">
        <rect x="20" :y="clientY" width="200" height="64" rx="10" fill="var(--na-primary-700)" stroke="var(--na-primary-400)" stroke-width="2" />
        <text x="120" :y="clientMidY + 6" font-weight="700" fill="var(--na-fg)" text-anchor="middle" style="font-size:18px">Claude Code</text>

        <line x1="220" :y1="clientMidY" :x2="serverX" :y2="clientMidY" stroke="var(--na-zinc-500)" stroke-width="2" marker-end="url(#g26ArrowM)" />
        <line :x1="serverX" :y1="clientMidY" x2="220" :y2="clientMidY" stroke="var(--na-zinc-500)" stroke-width="2" marker-end="url(#g26ArrowM)" />
        <template v-if="both">
          <text :x="arrowLabelX" :y="clientMidY + 24" fill="var(--na-fg-muted)" text-anchor="middle" style="font-size:13px"><tspan font-weight="600" fill="var(--na-accent-500)">stdio</tspan> · stdin / stdout</text>
        </template>
        <template v-else>
          <text x="280" :y="clientMidY - 10" font-weight="600" fill="var(--na-accent-500)" text-anchor="middle" style="font-size:15px">stdio</text>
          <text x="280" :y="clientMidY + 24" fill="var(--na-fg-muted)" text-anchor="middle" style="font-size:13px">stdin / stdout</text>
        </template>
      </g>

      <!-- The server: one file, four registered tools -->
      <g v-click="clicks.server">
        <rect :x="serverX" y="68" width="320" height="264" rx="12" style="fill: var(--na-bg-raised); stroke: var(--na-border)" stroke-width="2" />
        <text :x="serverMidX" y="100" font-weight="700" fill="var(--na-fg)" text-anchor="middle" :font-family="mono" style="font-size:18px">mcp/server.ts</text>
        <g v-for="(tool, i) in tools" :key="tool">
          <rect :x="serverX + 25" :y="pillY(i)" width="270" height="32" rx="8" fill="var(--na-primary-900)" stroke="var(--na-accent-500)" stroke-width="1.5" />
          <text :x="serverMidX" :y="pillY(i) + 21" fill="var(--na-fg)" text-anchor="middle" :font-family="mono" style="font-size:15px">{{ tool }}</text>
        </g>
        <text :x="serverMidX" y="308" fill="var(--na-fg-muted)" text-anchor="middle" style="font-size:13px">registerTool(name, schema, handler)</text>
      </g>

      <!-- Prisma and the database file -->
      <g v-click="clicks.db">
        <line :x1="serverX + 320" y1="200" :x2="prismaX" y2="200" stroke="var(--na-accent-500)" stroke-width="2" marker-end="url(#g26ArrowA)" />
        <line :x1="prismaX" y1="200" :x2="serverX + 320" y2="200" stroke="var(--na-accent-500)" stroke-width="2" marker-end="url(#g26ArrowA)" />
        <rect :x="prismaX" y="168" width="120" height="64" rx="10" style="fill: var(--na-bg-raised); stroke: var(--na-border)" stroke-width="2" />
        <text :x="prismaX + 60" y="206" font-weight="600" fill="var(--na-fg)" text-anchor="middle" style="font-size:16px">Prisma</text>

        <line :x1="prismaX + 120" y1="200" :x2="prismaX + 160" y2="200" stroke="var(--na-accent-500)" stroke-width="2" marker-end="url(#g26ArrowA)" />
        <!-- a database cylinder: body, bottom rim, top lid -->
        <path :d="`M ${dbX - 48} 168 L ${dbX - 48} 232 A 48 12 0 0 0 ${dbX + 48} 232 L ${dbX + 48} 168`" fill="var(--na-primary-900)" stroke="var(--na-accent-500)" stroke-width="1.5" />
        <ellipse :cx="dbX" cy="168" rx="48" ry="12" fill="var(--na-primary-900)" stroke="var(--na-accent-500)" stroke-width="1.5" />
        <text :x="dbX" y="212" fill="var(--na-fg)" text-anchor="middle" :font-family="mono" style="font-size:15px">dev.db</text>
      </g>

      <!-- A second client of the same server: the clash-conference app, through the Agent SDK -->
      <g v-if="both" v-click="clicks.second">
        <rect x="20" :y="secondY" width="200" height="64" rx="10" fill="var(--na-primary-900)" stroke="var(--na-accent-500)" stroke-width="2" stroke-dasharray="6 4" />
        <text x="120" :y="secondMidY + 6" font-weight="700" fill="var(--na-fg)" text-anchor="middle" style="font-size:18px">clash-conference</text>

        <line x1="220" :y1="secondMidY" :x2="serverX" :y2="secondMidY" stroke="var(--na-zinc-500)" stroke-width="2" marker-end="url(#g26ArrowM)" />
        <line :x1="serverX" :y1="secondMidY" x2="220" :y2="secondMidY" stroke="var(--na-zinc-500)" stroke-width="2" marker-end="url(#g26ArrowM)" />
        <text :x="arrowLabelX" :y="secondMidY + 24" fill="var(--na-fg-muted)" text-anchor="middle" style="font-size:13px">Agent SDK · query() · <tspan font-weight="600" fill="var(--na-accent-500)">stdio</tspan></text>

        <!-- What the route may call. Left-aligned under the box: the line is wider than the box, so centring would push it off the left edge. -->
        <text x="20" :y="secondY + 88" fill="var(--na-fg-muted)" :font-family="mono" style="font-size:13px">allowedTools: find_venue, create_clash</text>
      </g>

      <defs>
        <marker id="g26ArrowM" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
          <path d="M0,0 L8,4 L0,8 Z" fill="var(--na-zinc-500)" />
        </marker>
        <marker id="g26ArrowA" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
          <path d="M0,0 L8,4 L0,8 Z" fill="var(--na-accent-500)" />
        </marker>
      </defs>
    </svg>
  </div>
</template>
