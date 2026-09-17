<script setup lang="ts">
// G9 — Dynamic workflow fan-out. The centrepiece graphic: script -> phases ->
// parallel review agents -> verifier/refuter gate -> convergence. Findings
// mirror the workshop's real seeded bug (deleteClash / deleteVenue), so the
// diagram and the live demo tell the same story.
const boxW = 140
const gap = 18
const files = ['auth', 'clashes', 'notifications', 'profile', 'search', 'venues'].map((key, i) => ({
  key,
  label: `${key}.ts`,
  x: 15 + i * (boxW + gap),
}))
const confirmed = new Set(['clashes', 'venues'])
</script>

<template>
  <svg viewBox="0 0 960 578" width="960" height="578" class="w-full max-w-4xl h-auto max-h-full" font-family="Inter, sans-serif">
    <defs>
      <marker id="wf-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
        <path d="M0,0 L10,5 L0,10 z" fill="var(--na-zinc-500)" />
      </marker>
      <marker id="wf-arrow-accent" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
        <path d="M0,0 L10,5 L0,10 z" fill="var(--na-accent-500)" />
      </marker>
    </defs>

    <!-- stage 1: the script -->
    <g v-click>
      <rect x="370" y="8" width="220" height="50" rx="8" fill="var(--na-primary-700)" stroke="var(--na-primary-400)" stroke-width="2" />
      <text x="480" y="29" text-anchor="middle" fill="var(--na-fg)" font-weight="700" style="font-size:14px">script</text>
      <text x="480" y="48" text-anchor="middle" fill="var(--na-primary-100)" font-family="'JetBrains Mono', monospace" style="font-size:13px">
        agent · parallel · phase
      </text>
    </g>

    <!-- stage 2: phase Review, parallel fan-out to one agent per action file -->
    <g v-click>
      <rect x="6" y="82" width="948" height="120" rx="8" fill="none" stroke="var(--na-zinc-700)" stroke-dasharray="4 3" />
      <text x="20" y="101" fill="var(--na-fg-muted)" font-weight="600" style="font-size:13px">Phase: Review</text>
      <g v-for="f in files" :key="f.key">
        <line x1="480" y1="58" :x2="f.x + boxW / 2" y2="122" stroke="var(--na-zinc-600)" stroke-width="1.5" marker-end="url(#wf-arrow)" />
        <rect :x="f.x" y="122" :width="boxW" height="62" rx="6" fill="var(--na-zinc-900)" stroke="var(--na-zinc-700)" />
        <text :x="f.x + boxW / 2" y="148" text-anchor="middle" fill="var(--na-fg)" font-family="'JetBrains Mono', monospace" style="font-size:13px">{{ f.label }}</text>
        <text :x="f.x + boxW / 2" y="170" text-anchor="middle" fill="var(--na-fg-muted)" style="font-size:13px">review agent</text>
      </g>
    </g>

    <!-- stage 3: phase Verify, one verifier per finding -->
    <g v-click>
      <rect x="6" y="232" width="948" height="120" rx="8" fill="none" stroke="var(--na-zinc-700)" stroke-dasharray="4 3" />
      <text x="20" y="251" fill="var(--na-fg-muted)" font-weight="600" style="font-size:13px">Phase: Verify (refuter)</text>
      <g v-for="f in files" :key="f.key">
        <line :x1="f.x + boxW / 2" y1="184" :x2="f.x + boxW / 2" y2="272" stroke="var(--na-zinc-600)" stroke-width="1.5" marker-end="url(#wf-arrow)" />
        <rect :x="f.x" y="272" :width="boxW" height="62" rx="6" fill="var(--na-zinc-900)" stroke="var(--na-zinc-700)" />
        <text :x="f.x + boxW / 2" y="298" text-anchor="middle" fill="var(--na-fg)" style="font-size:13px">verify finding</text>
        <text :x="f.x + boxW / 2" y="320" text-anchor="middle" fill="var(--na-fg-muted)" style="font-size:13px">try to refute it</text>
      </g>
    </g>

    <!-- stage 4: results — most findings dropped, two survive with code evidence -->
    <g v-click>
      <g v-for="f in files" :key="f.key">
        <template v-if="confirmed.has(f.key)">
          <rect :x="f.x" y="364" :width="boxW" height="50" rx="6" fill="var(--na-primary-900)" stroke="var(--na-accent-500)" stroke-width="2" />
          <text :x="f.x + boxW / 2" y="385" text-anchor="middle" fill="var(--na-accent-500)" font-weight="700" style="font-size:13px">CONFIRMED</text>
          <text :x="f.x + boxW / 2" y="404" text-anchor="middle" fill="var(--na-fg)" style="font-size:13px">no owner check</text>
        </template>
        <template v-else>
          <rect :x="f.x" y="364" :width="boxW" height="50" rx="6" fill="var(--na-zinc-900)" stroke="var(--na-zinc-800)" />
          <text :x="f.x + boxW / 2" y="394" text-anchor="middle" fill="var(--na-zinc-600)" text-decoration="line-through" style="font-size:13px">dropped</text>
        </template>
      </g>
    </g>

    <!-- stage 5: convergence into the merge; caption below the merge box, off the arrows -->
    <g v-click>
      <line :x1="files[1].x + boxW / 2" y1="414" x2="430" y2="478" stroke="var(--na-accent-500)" stroke-width="2.5" marker-end="url(#wf-arrow-accent)" />
      <line :x1="files[5].x + boxW / 2" y1="414" x2="530" y2="478" stroke="var(--na-accent-500)" stroke-width="2.5" marker-end="url(#wf-arrow-accent)" />
      <rect x="330" y="482" width="300" height="52" rx="8" fill="var(--na-primary-700)" stroke="var(--na-primary-400)" stroke-width="2" />
      <text x="480" y="504" text-anchor="middle" fill="var(--na-fg)" font-weight="700" style="font-size:14px">merge</text>
      <text x="480" y="524" text-anchor="middle" fill="var(--na-primary-100)" font-family="'JetBrains Mono', monospace" style="font-size:13px">app/actions/clashes.ts · venues.ts</text>
      <text x="480" y="564" text-anchor="middle" fill="var(--na-fg-muted)" style="font-size:14px">6 findings reviewed → 2 confirmed with code evidence</text>
    </g>
  </svg>
</template>
