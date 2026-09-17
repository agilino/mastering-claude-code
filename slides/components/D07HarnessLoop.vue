<script setup lang="ts">
// D07 — The harness loop as a cycle. The model sits in the middle and only
// reasons and chooses; the harness ring around it does everything else:
// build prompt → call model → permission? → run tool → append result → call
// model again, until the model answers with text (exit to You).
// Prop `hooks`: clip PreToolUse / PostToolUse / Stop badges onto the ring.
const props = withDefaults(defineProps<{ hooks?: boolean }>(), { hooks: false })

const CX = 480, CY = 290, R = 195
const pt = (deg: number, r = R) => ({ x: CX + r * Math.cos((deg * Math.PI) / 180), y: CY + r * Math.sin((deg * Math.PI) / 180) })
// stations on the ring (clockwise, angle in degrees, 0 = right)
const stations = [
  { key: 'call', label: 'call model', deg: -90, click: 2 },
  { key: 'perm', label: 'permission?', deg: 0, click: 3 },
  { key: 'run', label: 'run tool', deg: 90, click: 4 },
  { key: 'append', label: 'append result', deg: 180, click: 5 },
]
const arc = (a: number, b: number) => {
  // arc along the ring from station a to station b (clockwise), trimmed so
  // arrowheads stop at the station boxes
  const s = pt(a + 24), e = pt(b - 24)
  return `M ${s.x} ${s.y} A ${R} ${R} 0 0 1 ${e.x} ${e.y}`
}
const lit = (n: number) => (props.hooks ? false : n)
</script>

<template>
  <svg viewBox="0 0 960 560" class="w-full h-auto max-h-full" role="img" aria-label="The harness loop">
    <defs>
      <marker id="d7-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
        <path d="M0,0 L0,6 L8,3 z" fill="var(--na-zinc-400)" />
      </marker>
      <marker id="d7-arrow-accent" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
        <path d="M0,0 L0,6 L8,3 z" fill="var(--na-accent-500)" />
      </marker>
    </defs>

    <!-- the ring = the harness -->
    <circle :cx="CX" :cy="CY" :r="R" fill="none" stroke="var(--na-primary-700)" stroke-width="3" stroke-dasharray="6 8" />
    <text :x="CX + R * 0.72" :y="CY - R * 0.72 - 6" fill="var(--na-primary-300)" font-weight="700" style="font-size: 16px">HARNESS</text>

    <!-- ring arrows between stations -->
    <g fill="none" stroke="var(--na-zinc-400)" stroke-width="2.5" marker-end="url(#d7-arrow)">
      <path :d="arc(-90, 0)" />
      <path :d="arc(0, 90)" />
      <path :d="arc(90, 180)" />
      <path :d="arc(180, 270)" />
    </g>

    <!-- entry: You → build prompt → call model -->
    <g>
      <rect x="40" y="62" width="90" height="46" rx="8" fill="var(--na-bg-raised)" stroke="var(--na-zinc-500)" stroke-width="2" />
      <text x="85" y="91" text-anchor="middle" fill="var(--na-fg)" font-weight="700" style="font-size: 16px">You</text>
      <line x1="132" y1="85" x2="182" y2="85" stroke="var(--na-zinc-400)" stroke-width="2.5" marker-end="url(#d7-arrow)" />
      <text x="157" y="56" text-anchor="middle" fill="var(--na-fg-muted)" style="font-size: 13px">message</text>
      <rect x="186" y="62" width="130" height="46" rx="8" fill="var(--na-bg-raised)" stroke="var(--na-zinc-600)" stroke-width="2" />
      <g v-click="lit(1)"><rect x="186" y="62" width="130" height="46" rx="8" fill="var(--na-primary-900)" stroke="var(--na-accent-500)" stroke-width="2.5" /></g>
      <text x="251" y="91" text-anchor="middle" fill="var(--na-fg)" font-weight="600" style="font-size: 15px">build prompt</text>
      <line x1="318" y1="85" x2="400" y2="85" stroke="var(--na-zinc-400)" stroke-width="2.5" marker-end="url(#d7-arrow)" />
    </g>

    <!-- stations -->
    <g v-for="s in stations" :key="s.key">
      <rect :x="pt(s.deg).x - 72" :y="pt(s.deg).y - 22" width="144" height="44" rx="8" fill="var(--na-bg-raised)" stroke="var(--na-zinc-600)" stroke-width="2" />
      <g v-click="lit(s.click)">
        <rect :x="pt(s.deg).x - 72" :y="pt(s.deg).y - 22" width="144" height="44" rx="8" fill="var(--na-primary-900)" stroke="var(--na-accent-500)" stroke-width="2.5" />
      </g>
      <text :x="pt(s.deg).x" :y="pt(s.deg).y + 6" text-anchor="middle" fill="var(--na-fg)" font-weight="600" style="font-size: 15px">{{ s.label }}</text>
    </g>

    <!-- the model in the centre -->
    <rect :x="CX - 105" :y="CY - 42" width="210" height="84" rx="12" fill="var(--na-bg-raised)" stroke="var(--na-primary-400)" stroke-width="3" />
    <text :x="CX" :y="CY - 6" text-anchor="middle" fill="var(--na-fg)" font-weight="700" style="font-size: 20px">Model</text>
    <text :x="CX" :y="CY + 20" text-anchor="middle" fill="var(--na-fg-muted)" style="font-size: 14px">reasons, then chooses</text>

    <!-- exit: text answer → You (turn ends) -->
    <g v-click="lit(6)">
      <path d="M 590 262 Q 700 150 800 105" fill="none" stroke="var(--na-accent-500)" stroke-width="2.5" stroke-dasharray="7 5" marker-end="url(#d7-arrow-accent)" />
      <rect x="800" y="62" width="120" height="46" rx="8" fill="var(--na-bg-raised)" stroke="var(--na-accent-500)" stroke-width="2" />
      <text x="860" y="91" text-anchor="middle" fill="var(--na-fg)" font-weight="700" style="font-size: 16px">You</text>
      <text x="760" y="165" fill="var(--na-accent-500)" font-weight="600" style="font-size: 14px">text answer = turn ends</text>
    </g>

    <!-- hooks: badges clipped onto the ring -->
    <template v-if="hooks">
      <g v-click="1">
        <rect :x="pt(45).x - 52" :y="pt(45).y - 14" width="104" height="28" rx="14" fill="var(--na-accent-500)" />
        <text :x="pt(45).x" :y="pt(45).y + 5" text-anchor="middle" fill="var(--na-zinc-950)" font-weight="700" style="font-size: 13px">PreToolUse</text>
        <text x="700" y="520" fill="var(--na-accent-400)" font-weight="600" style="font-size: 14px">exit 2 → blocks the call</text>
        <line :x1="pt(45).x + 30" :y1="pt(45).y + 16" x2="720" y2="505" stroke="var(--na-accent-500)" stroke-width="1.5" />
      </g>
      <g v-click="2">
        <rect :x="pt(135).x - 56" :y="pt(135).y - 14" width="112" height="28" rx="14" fill="var(--na-secondary-500)" />
        <text :x="pt(135).x" :y="pt(135).y + 5" text-anchor="middle" fill="var(--na-zinc-50)" font-weight="700" style="font-size: 13px">PostToolUse</text>
        <text x="20" y="520" fill="var(--na-secondary-500)" font-weight="600" style="font-size: 14px">exit 2 → tool already ran, error goes to the model</text>
        <line :x1="pt(135).x - 30" :y1="pt(135).y + 16" x2="250" y2="505" stroke="var(--na-secondary-500)" stroke-width="1.5" />
      </g>
      <g v-click="3">
        <rect x="660" y="180" width="60" height="28" rx="14" fill="var(--na-error-500)" />
        <text x="690" y="199" text-anchor="middle" fill="var(--na-zinc-50)" font-weight="700" style="font-size: 13px">Stop</text>
        <text x="730" y="199" fill="var(--na-error-500)" font-weight="600" style="font-size: 14px">exit 2 → turn cannot end</text>
      </g>
    </template>
  </svg>
</template>
