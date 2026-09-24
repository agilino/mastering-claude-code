<script setup lang="ts">
// G8 — Agent team topology. Lead + one peer per CLASH domain, messaging by
// name via SendMessage (NOT @-mentions — that syntax does not exist between
// team peers). Payoff: two peers reach different conclusions about the same
// file; the lead reconciles. Callouts sit beside the message paths, never on them.
const peers = [
  { key: 'clashes', label: 'clashes peer', x: 140 },
  { key: 'venues', label: 'venues peer', x: 380 },
  { key: 'participations', label: 'participations peer', x: 580 },
  { key: 'profile', label: 'profile peer', x: 820 },
] as const
const leadX = 480
const leadY = 90
const peerY = 400

// still: the small graphic for a flow-ways slide. All three stages at once (no
// v-click), laid out upright in a narrow viewBox so the text stays readable in a
// column about 40% of the slide wide: the two peers that disagree above the lead,
// each with what it reported, the lead's verdict in its box, the two quiet peers
// below. Off by default: the full slide is unchanged.
defineProps<{ still?: boolean }>()
</script>

<template>
  <svg v-if="still" viewBox="0 0 440 384" width="440" height="384" class="w-full h-auto max-h-full" font-family="Inter, sans-serif">
    <defs>
      <marker id="g08-still-arrow-idle" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
        <path d="M0,0 L10,5 L0,10 z" fill="var(--na-zinc-600)" />
      </marker>
      <marker id="g08-still-arrow-accent" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
        <path d="M0,0 L10,5 L0,10 z" fill="var(--na-accent-500)" />
      </marker>
      <marker id="g08-still-arrow-primary" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
        <path d="M0,0 L10,5 L0,10 z" fill="var(--na-primary-400)" />
      </marker>
    </defs>

    <!-- the two peers that disagree, each with what it sent the lead -->
    <rect x="10" y="10" width="200" height="70" rx="10" fill="var(--na-zinc-900)" stroke="var(--na-zinc-700)" stroke-width="2" />
    <text x="110" y="39" text-anchor="middle" fill="var(--na-fg-muted)" style="font-size:18px">venues peer</text>
    <text x="110" y="64" text-anchor="middle" fill="var(--na-accent-500)" style="font-size:16px">"looks safe"</text>
    <rect x="230" y="10" width="200" height="70" rx="10" fill="var(--na-zinc-900)" stroke="var(--na-zinc-700)" stroke-width="2" />
    <text x="330" y="39" text-anchor="middle" fill="var(--na-fg-muted)" style="font-size:18px">participations peer</text>
    <text x="330" y="64" text-anchor="middle" fill="var(--na-accent-500)" style="font-size:16px">"missing a check"</text>

    <!-- SendMessage up to the lead (accent), the lead's reply back down (primary) -->
    <line x1="140" y1="82" x2="140" y2="156" stroke="var(--na-accent-500)" stroke-width="3" marker-end="url(#g08-still-arrow-accent)" />
    <line x1="300" y1="82" x2="300" y2="156" stroke="var(--na-accent-500)" stroke-width="3" marker-end="url(#g08-still-arrow-accent)" />
    <line x1="180" y1="158" x2="180" y2="84" stroke="var(--na-primary-400)" stroke-width="3" marker-end="url(#g08-still-arrow-primary)" />
    <line x1="260" y1="158" x2="260" y2="84" stroke="var(--na-primary-400)" stroke-width="3" marker-end="url(#g08-still-arrow-primary)" />

    <!-- the lead, with its verdict -->
    <rect x="110" y="160" width="220" height="72" rx="10" fill="var(--na-primary-700)" stroke="var(--na-primary-400)" stroke-width="2" />
    <text x="220" y="191" text-anchor="middle" fill="var(--na-fg)" font-weight="700" style="font-size:20px">Lead</text>
    <text x="220" y="217" text-anchor="middle" fill="var(--na-primary-200)" style="font-size:16px">"confirmed missing"</text>

    <!-- the two quiet peers, idle links both ways -->
    <line x1="160" y1="234" x2="160" y2="318" stroke="var(--na-zinc-600)" stroke-width="2" marker-start="url(#g08-still-arrow-idle)" marker-end="url(#g08-still-arrow-idle)" />
    <line x1="280" y1="234" x2="280" y2="318" stroke="var(--na-zinc-600)" stroke-width="2" marker-start="url(#g08-still-arrow-idle)" marker-end="url(#g08-still-arrow-idle)" />
    <rect x="10" y="320" width="200" height="56" rx="10" fill="var(--na-zinc-900)" stroke="var(--na-zinc-700)" stroke-width="2" />
    <text x="110" y="354" text-anchor="middle" fill="var(--na-fg-muted)" style="font-size:18px">clashes peer</text>
    <rect x="230" y="320" width="200" height="56" rx="10" fill="var(--na-zinc-900)" stroke="var(--na-zinc-700)" stroke-width="2" />
    <text x="330" y="354" text-anchor="middle" fill="var(--na-fg-muted)" style="font-size:18px">profile peer</text>
  </svg>

  <svg v-else viewBox="0 20 960 420" width="960" height="420" class="w-full max-w-4xl h-auto max-h-full" font-family="Inter, sans-serif">
    <defs>
      <marker id="arrow-idle" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
        <path d="M0,0 L10,5 L0,10 z" fill="var(--na-zinc-600)" />
      </marker>
      <marker id="arrow-accent" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
        <path d="M0,0 L10,5 L0,10 z" fill="var(--na-accent-500)" />
      </marker>
      <marker id="arrow-primary" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
        <path d="M0,0 L10,5 L0,10 z" fill="var(--na-primary-400)" />
      </marker>
    </defs>

    <!-- stage 1: lead + peers with idle bidirectional links -->
    <g v-click>
      <rect :x="leadX - 90" :y="leadY - 30" width="180" height="60" rx="10"
        fill="var(--na-primary-700)" stroke="var(--na-primary-400)" stroke-width="2" />
      <text :x="leadX" :y="leadY + 6" text-anchor="middle" fill="var(--na-fg)" font-weight="700" style="font-size:18px">Lead</text>

      <g v-for="p in peers" :key="p.key">
        <line :x1="leadX" :y1="leadY + 30" :x2="p.x" :y2="peerY - 32"
          stroke="var(--na-zinc-600)" stroke-width="2" marker-end="url(#arrow-idle)" marker-start="url(#arrow-idle)" />
        <rect :x="p.x - 88" :y="peerY - 30" width="176" height="55" rx="10" fill="var(--na-zinc-900)" stroke="var(--na-zinc-700)" />
        <text :x="p.x" :y="peerY + 3" text-anchor="middle" fill="var(--na-fg-muted)" style="font-size:14px">{{ p.label }}</text>
      </g>
    </g>

    <!-- stage 2: two peers raise conflicting findings via SendMessage -->
    <g v-click>
      <line :x1="380" :y1="peerY - 32" :x2="leadX - 20" :y2="leadY + 32"
        stroke="var(--na-accent-500)" stroke-width="3" marker-end="url(#arrow-accent)" />
      <line :x1="580" :y1="peerY - 32" :x2="leadX + 20" :y2="leadY + 32"
        stroke="var(--na-accent-500)" stroke-width="3" marker-end="url(#arrow-accent)" />
      <!-- left callout: right-aligned, left of the venues→lead path. The idle lead→clashes
           and lead→profile lines cross the callouts; a background-coloured halo keeps the
           text on top of them -->
      <text x="332" y="272" text-anchor="end" fill="var(--na-accent-500)" stroke="var(--na-bg)" stroke-width="5" paint-order="stroke" stroke-linejoin="round" font-family="'JetBrains Mono', monospace" style="font-size:13px">SendMessage(lead):</text>
      <text x="332" y="292" text-anchor="end" fill="var(--na-fg)" stroke="var(--na-bg)" stroke-width="5" paint-order="stroke" stroke-linejoin="round" style="font-size:13px">"venue delete looks safe"</text>
      <!-- right callout: left-aligned, right of the participations→lead path -->
      <text x="612" y="272" fill="var(--na-accent-500)" stroke="var(--na-bg)" stroke-width="5" paint-order="stroke" stroke-linejoin="round" font-family="'JetBrains Mono', monospace" style="font-size:13px">SendMessage(lead):</text>
      <text x="612" y="292" fill="var(--na-fg)" stroke="var(--na-bg)" stroke-width="5" paint-order="stroke" stroke-linejoin="round" style="font-size:13px">"venue delete is missing a check"</text>
      <text :x="leadX - 110" :y="leadY + 6" text-anchor="end" fill="var(--na-accent-500)" font-weight="700" style="font-size:16px">⚠ disagreement</text>
    </g>

    <!-- stage 3: lead reconciles -->
    <g v-click>
      <line :x1="leadX - 55" :y1="leadY + 32" :x2="340" :y2="peerY - 36"
        stroke="var(--na-primary-400)" stroke-width="3" marker-end="url(#arrow-primary)" />
      <line :x1="leadX + 55" :y1="leadY + 32" :x2="620" :y2="peerY - 36"
        stroke="var(--na-primary-400)" stroke-width="3" marker-end="url(#arrow-primary)" />
      <text :x="leadX + 110" :y="leadY - 4" fill="var(--na-primary-400)" font-weight="600" style="font-size:13px">"confirmed missing:</text>
      <text :x="leadX + 110" :y="leadY + 14" fill="var(--na-primary-400)" font-weight="600" style="font-size:13px">reviewed the diff myself"</text>
    </g>
  </svg>
</template>
