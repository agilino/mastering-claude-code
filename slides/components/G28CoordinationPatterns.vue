<script setup lang="ts">
// G28 — Coordination patterns. The five multi-agent patterns from the Claude
// blog post "Multi-agent coordination patterns"
// (https://claude.com/blog/multi-agent-coordination-patterns). Each value of
// `pattern` redraws that post's diagram — same nodes, same edges and arrow
// directions, same layout — in the deck's own SVG language. Nothing is traced
// from the post's images. Colours follow the post: its blue coordinator/source
// boxes -> primary, its green workers -> zinc cards, its orange queue, bus and
// store -> accent. Staging: actors, then arrows, then the caption that carries
// the point, with one line on what Claude Code has for it (from the docs).
import { computed } from 'vue'

type Pattern = 'generator-verifier' | 'orchestrator-subagent' | 'agent-teams' | 'message-bus' | 'shared-state'
const props = defineProps<{ pattern: Pattern }>()

const captions: Record<Pattern, { point: string; claudeCode: string }> = {
  'generator-verifier': {
    point: 'Loop until the verifier accepts, or the round limit is reached',
    claudeCode: 'In Claude Code: /goal. A small model checks each turn until the condition holds.',
  },
  'orchestrator-subagent': {
    point: 'The orchestrator hands out subtasks and merges the results',
    claudeCode: 'In Claude Code: subagents. The main session is the orchestrator.',
  },
  'agent-teams': {
    point: 'Workers claim tasks and work on their own, keeping context across steps',
    claudeCode: 'Claude Code agent teams: this queue is the task list, plus direct messages.',
  },
  'message-bus': {
    point: 'Agents publish events and subscribe to the topics they care about',
    claudeCode: 'In Claude Code: no built-in feature. SendMessage goes to one named agent.',
  },
  'shared-state': {
    point: 'No coordinator. Agents read and write the store. Everyone sees findings at once.',
    claudeCode: 'In Claude Code: no built-in feature. A shared file works, but a team keeps its lead.',
  },
}
const caption = computed(() => captions[props.pattern])
const arrow = computed(() => `g28-${props.pattern}-arrow`)
const arrowAccent = computed(() => `g28-${props.pattern}-arrow-accent`)
// generator-verifier draws nothing above y 40: crop it so the diagram scales up
const top = computed(() => (props.pattern === 'generator-verifier' ? 40 : 0))

// shared geometry
const W = 180
const H = 64
const workerYs = [70, 182, 294] as const

// message bus: three agents above the bus, three below
const busTop = [
  { label: 'Alert source', x: 140, source: true },
  { label: 'Triage agent', x: 480, source: false },
  { label: 'Enrichment', x: 820, source: false },
] as const
const busBottom = [
  { label: 'Network agent', x: 140 },
  { label: 'Identity agent', x: 480 },
  { label: 'Response agent', x: 820 },
] as const

// shared state: four agents in the corners, elbow arrows into the store's sides
const corners = [
  { label: 'Academic agent', x: 130, y: 52, top: true, left: true },
  { label: 'Industry agent', x: 830, y: 52, top: true, left: false },
  { label: 'Patent agent', x: 130, y: 294, top: false, left: true },
  { label: 'News agent', x: 830, y: 294, top: false, left: false },
] as const
const elbow = (c: (typeof corners)[number]) => {
  const yStart = c.top ? c.y + H / 2 + 2 : c.y - H / 2 - 2
  const yJoin = c.top ? 172 : 200
  const xEnd = c.left ? 348 : 612
  return `M${c.x},${yStart} V${yJoin} H${xEnd}`
}
</script>

<template>
  <svg :viewBox="`0 ${top} 960 ${400 - top}`" width="960" :height="400 - top" class="w-full max-w-4xl h-auto max-h-full" font-family="Inter, sans-serif">
    <defs>
      <marker :id="arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
        <path d="M0,0 L10,5 L0,10 z" fill="var(--na-zinc-500)" />
      </marker>
      <marker :id="arrowAccent" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
        <path d="M0,0 L10,5 L0,10 z" fill="var(--na-accent-500)" />
      </marker>
    </defs>

    <!-- ── Generator-verifier: one row, a return loop underneath ── -->
    <template v-if="pattern === 'generator-verifier'">
      <!-- stage 1: generator, verifier, accepted -->
      <g v-click>
        <rect x="40" y="150" :width="W" :height="H" rx="10" fill="var(--na-primary-700)" stroke="var(--na-primary-400)" stroke-width="2" />
        <text x="130" y="188" text-anchor="middle" fill="var(--na-fg)" font-weight="700" style="font-size:16px">Generator</text>
        <rect x="330" y="150" :width="W" :height="H" rx="10" fill="var(--na-zinc-900)" stroke="var(--na-zinc-700)" stroke-width="2" />
        <text x="420" y="188" text-anchor="middle" fill="var(--na-fg)" font-weight="600" style="font-size:16px">Verifier</text>
        <rect x="720" y="58" :width="W" :height="H" rx="10" fill="var(--na-bg-raised)" stroke="var(--na-zinc-700)" stroke-width="2" />
        <text x="810" y="96" text-anchor="middle" fill="var(--na-fg-muted)" font-weight="600" style="font-size:16px">Accepted</text>
      </g>
      <!-- stage 2: check, pass or fail, feedback loops back to the generator -->
      <g v-click>
        <line x1="222" y1="182" x2="328" y2="182" stroke="var(--na-zinc-500)" stroke-width="2" :marker-end="`url(#${arrow})`" />
        <line x1="510" y1="182" x2="600" y2="182" stroke="var(--na-zinc-500)" stroke-width="2" />
        <line x1="600" y1="182" x2="600" y2="110" stroke="var(--na-zinc-500)" stroke-width="2" :marker-end="`url(#${arrow})`" />
        <line x1="600" y1="182" x2="600" y2="254" stroke="var(--na-zinc-500)" stroke-width="2" :marker-end="`url(#${arrow})`" />
        <line x1="620" y1="90" x2="718" y2="90" stroke="var(--na-zinc-500)" stroke-width="2" :marker-end="`url(#${arrow})`" />
        <circle cx="600" cy="90" r="18" fill="var(--na-primary-900)" stroke="var(--na-primary-400)" stroke-width="2" />
        <path d="M592,90 L598,97 L609,83" fill="none" stroke="var(--na-primary-400)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" />
        <text x="600" y="60" text-anchor="middle" fill="var(--na-fg-muted)" style="font-size:13px">Output</text>
        <circle cx="600" cy="274" r="18" fill="var(--na-primary-900)" stroke="var(--na-accent-500)" stroke-width="2" />
        <path d="M593,267 L607,281 M607,267 L593,281" stroke="var(--na-accent-500)" stroke-width="2.5" stroke-linecap="round" />
        <text x="600" y="312" text-anchor="middle" fill="var(--na-fg-muted)" style="font-size:13px">Feedback (if failed)</text>
        <path d="M580,274 H130 V218" fill="none" stroke="var(--na-accent-500)" stroke-width="2.5" :marker-end="`url(#${arrowAccent})`" />
      </g>
    </template>

    <!-- ── Orchestrator-subagent: hub on the left, bracket fan-out to three workers ── -->
    <template v-else-if="pattern === 'orchestrator-subagent'">
      <!-- stage 1: orchestrator and subagents -->
      <g v-click>
        <rect x="60" y="150" :width="W" :height="H" rx="10" fill="var(--na-primary-700)" stroke="var(--na-primary-400)" stroke-width="2" />
        <text x="150" y="188" text-anchor="middle" fill="var(--na-fg)" font-weight="700" style="font-size:16px">Orchestrator</text>
        <g v-for="(y, i) in workerYs" :key="y">
          <rect x="700" :y="y - H / 2" :width="W" :height="H" rx="10" fill="var(--na-zinc-900)" stroke="var(--na-zinc-700)" stroke-width="2" />
          <text x="790" :y="y + 6" text-anchor="middle" fill="var(--na-fg)" font-weight="600" style="font-size:16px">Subagent {{ 'ABC'[i] }}</text>
        </g>
      </g>
      <!-- stage 2: dispatch out along the bracket, results back into the orchestrator -->
      <g v-click>
        <line x1="460" y1="182" x2="243" y2="182" stroke="var(--na-zinc-500)" stroke-width="2" :marker-end="`url(#${arrow})`" />
        <line x1="460" :y1="workerYs[0]" x2="460" :y2="workerYs[2]" stroke="var(--na-zinc-500)" stroke-width="2" />
        <line v-for="y in workerYs" :key="y" x1="460" :y1="y" x2="698" :y2="y" stroke="var(--na-zinc-500)" stroke-width="2" :marker-end="`url(#${arrow})`" />
      </g>
    </template>

    <!-- ── The blog's agent teams: coordinator -> task queue -> persistent workers ── -->
    <template v-else-if="pattern === 'agent-teams'">
      <!-- stage 1: coordinator, queue, workers -->
      <g v-click>
        <rect x="30" y="150" width="170" :height="H" rx="10" fill="var(--na-primary-700)" stroke="var(--na-primary-400)" stroke-width="2" />
        <text x="115" y="188" text-anchor="middle" fill="var(--na-fg)" font-weight="700" style="font-size:16px">Coordinator</text>
        <rect x="290" y="136" width="270" height="92" rx="10" fill="var(--na-bg-raised)" stroke="var(--na-zinc-700)" stroke-width="2" />
        <text x="425" y="162" text-anchor="middle" fill="var(--na-fg)" font-weight="600" style="font-size:15px">Task queue</text>
        <rect v-for="i in 6" :key="i" :x="305 + (i - 1) * 42" y="180" width="26" height="26" rx="4"
          :fill="i <= 4 ? 'var(--na-accent-500)' : 'none'" :stroke="i <= 4 ? 'var(--na-accent-500)' : 'var(--na-zinc-600)'" stroke-width="1.5" />
        <g v-for="(y, i) in workerYs" :key="y">
          <rect x="740" :y="y - H / 2" :width="W" :height="H" rx="10" fill="var(--na-zinc-900)" stroke="var(--na-zinc-700)" stroke-width="2" />
          <text x="830" :y="y - 3" text-anchor="middle" fill="var(--na-fg)" font-weight="600" style="font-size:16px">Worker {{ i + 1 }}</text>
          <text x="830" :y="y + 17" text-anchor="middle" fill="var(--na-fg-muted)" style="font-size:13px">(persistent)</text>
        </g>
      </g>
      <!-- stage 2: one way only — into the queue, out to the workers; no arrow between workers -->
      <g v-click>
        <line x1="202" y1="182" x2="288" y2="182" stroke="var(--na-zinc-500)" stroke-width="2" :marker-end="`url(#${arrow})`" />
        <line x1="560" y1="182" x2="640" y2="182" stroke="var(--na-zinc-500)" stroke-width="2" />
        <line x1="640" :y1="workerYs[0]" x2="640" :y2="workerYs[2]" stroke="var(--na-zinc-500)" stroke-width="2" />
        <line v-for="y in workerYs" :key="y" x1="640" :y1="y" x2="738" :y2="y" stroke="var(--na-zinc-500)" stroke-width="2" :marker-end="`url(#${arrow})`" />
      </g>
    </template>

    <!-- ── Message bus: a bar in the middle, three agents above, three below ── -->
    <template v-else-if="pattern === 'message-bus'">
      <!-- stage 1: the source, the agents, the bus -->
      <g v-click>
        <g v-for="a in busTop" :key="a.label">
          <rect :x="a.x - 100" y="16" width="200" height="60" rx="10"
            :fill="a.source ? 'var(--na-primary-700)' : 'var(--na-zinc-900)'" :stroke="a.source ? 'var(--na-primary-400)' : 'var(--na-zinc-700)'" stroke-width="2" />
          <text :x="a.x" y="52" text-anchor="middle" fill="var(--na-fg)" :font-weight="a.source ? 700 : 600" style="font-size:16px">{{ a.label }}</text>
        </g>
        <rect x="40" y="148" width="880" height="54" rx="10" fill="var(--na-bg-raised)" stroke="var(--na-accent-500)" stroke-width="2" />
        <text x="480" y="181" text-anchor="middle" fill="var(--na-accent-500)" font-weight="700" style="font-size:16px">Message bus (publish/subscribe)</text>
        <g v-for="a in busBottom" :key="a.label">
          <rect :x="a.x - 100" y="272" width="200" height="60" rx="10" fill="var(--na-zinc-900)" stroke="var(--na-zinc-700)" stroke-width="2" />
          <text :x="a.x" y="308" text-anchor="middle" fill="var(--na-fg)" font-weight="600" style="font-size:16px">{{ a.label }}</text>
        </g>
      </g>
      <!-- stage 2: every edge goes through the bus; the source only publishes -->
      <g v-click>
        <g v-for="a in busTop" :key="a.label">
          <line :x1="a.x - 16" y1="78" :x2="a.x - 16" y2="146" stroke="var(--na-zinc-500)" stroke-width="2" :marker-end="`url(#${arrow})`" />
          <text :x="a.x - 24" y="120" text-anchor="end" fill="var(--na-fg-muted)" style="font-size:13px">Publish</text>
          <template v-if="!a.source">
            <line :x1="a.x + 16" y1="146" :x2="a.x + 16" y2="78" stroke="var(--na-accent-500)" stroke-width="2" :marker-end="`url(#${arrowAccent})`" />
            <text :x="a.x + 24" y="120" fill="var(--na-accent-500)" style="font-size:13px">Subscribe</text>
          </template>
        </g>
        <g v-for="a in busBottom" :key="a.label">
          <line :x1="a.x - 16" y1="270" :x2="a.x - 16" y2="204" stroke="var(--na-zinc-500)" stroke-width="2" :marker-end="`url(#${arrow})`" />
          <text :x="a.x - 24" y="242" text-anchor="end" fill="var(--na-fg-muted)" style="font-size:13px">Publish</text>
          <line :x1="a.x + 16" y1="204" :x2="a.x + 16" y2="270" stroke="var(--na-accent-500)" stroke-width="2" :marker-end="`url(#${arrowAccent})`" />
          <text :x="a.x + 24" y="242" fill="var(--na-accent-500)" style="font-size:13px">Subscribe</text>
        </g>
      </g>
    </template>

    <!-- ── Shared state: a store in the middle, four agents in the corners, no coordinator ── -->
    <template v-else-if="pattern === 'shared-state'">
      <!-- stage 1: the store and the agents -->
      <g v-click>
        <rect x="350" y="128" width="260" height="116" rx="10" fill="var(--na-bg-raised)" stroke="var(--na-zinc-700)" stroke-width="2" />
        <text x="480" y="156" text-anchor="middle" fill="var(--na-fg)" font-weight="700" style="font-size:16px">Shared state store</text>
        <text x="480" y="178" text-anchor="middle" fill="var(--na-fg-muted)" style="font-size:13px">(database, file system, document)</text>
        <rect x="474" y="196" width="24" height="32" rx="3" fill="var(--na-accent-500)" stroke="var(--na-bg-raised)" stroke-width="1.5" />
        <rect x="468" y="200" width="24" height="32" rx="3" fill="var(--na-accent-500)" stroke="var(--na-bg-raised)" stroke-width="1.5" />
        <rect x="462" y="204" width="24" height="32" rx="3" fill="var(--na-accent-500)" stroke="var(--na-bg-raised)" stroke-width="1.5" />
        <g v-for="c in corners" :key="c.label">
          <rect :x="c.x - W / 2" :y="c.y - H / 2" :width="W" :height="H" rx="10" fill="var(--na-zinc-900)" stroke="var(--na-zinc-700)" stroke-width="2" />
          <text :x="c.x" :y="c.y + 6" text-anchor="middle" fill="var(--na-fg)" font-weight="600" style="font-size:16px">{{ c.label }}</text>
        </g>
      </g>
      <!-- stage 2: every agent reads and writes the store; no agent-to-agent edge -->
      <g v-click>
        <path v-for="c in corners" :key="c.label" :d="elbow(c)" fill="none" stroke="var(--na-zinc-500)" stroke-width="2"
          :marker-start="`url(#${arrow})`" :marker-end="`url(#${arrow})`" />
      </g>
    </template>

    <!-- stage 3: the caption that carries the point, and what Claude Code has for it -->
    <g v-click>
      <text x="480" y="362" text-anchor="middle" fill="var(--na-fg)" font-weight="600" style="font-size:16px">{{ caption.point }}</text>
      <text x="480" y="388" text-anchor="middle" fill="var(--na-accent-500)" style="font-size:14px">{{ caption.claudeCode }}</text>
    </g>
  </svg>
</template>
