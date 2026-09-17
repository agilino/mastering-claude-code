<script setup lang="ts">
// G13 — CLASH request architecture. Real names throughout: lib/data/*,
// app/actions/*, requireUser, revalidatePath. Sets up G14's point that the
// layout guard and an action's own check are different things.
</script>

<template>
  <div class="w-full h-full flex items-center justify-center">
    <svg viewBox="0 0 1100 345" width="1100" height="345" class="w-full max-w-5xl h-auto max-h-full">
      <defs>
        <marker id="a13" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="var(--na-fg-muted)" />
        </marker>
      </defs>

      <text x="10" y="28" font-weight="700" fill="var(--na-fg-muted)" style="font-size:14px">READ PATH</text>
      <!-- read path, stage 1 -->
      <g v-click="1" font-family="Inter, sans-serif">
        <g v-for="(n, i) in [
          { x: 10, label: 'Browser' },
          { x: 220, label: 'RSC page' },
          { x: 430, label: 'lib/data/*.ts', mono: true },
          { x: 660, label: 'Prisma Client', sub: 'lib/generated/prisma' },
          { x: 890, label: 'SQLite', sub: 'dev.db' },
        ]" :key="i">
          <rect :x="n.x" y="40" width="180" height="58" rx="8" fill="var(--na-bg-raised)" stroke="var(--na-primary-500)" stroke-width="2" />
          <text :x="n.x + 90" :y="n.sub ? 64 : 74" text-anchor="middle" fill="var(--na-fg)" :font-family="n.mono ? 'JetBrains Mono, monospace' : 'Inter, sans-serif'" style="font-size:15px">{{ n.label }}</text>
          <text v-if="n.sub" :x="n.x + 90" y="84" text-anchor="middle" fill="var(--na-fg-muted)" font-family="JetBrains Mono, monospace" style="font-size:13px">{{ n.sub }}</text>
        </g>
        <line v-for="x in [190, 400, 630, 860]" :key="x" :x1="x" y1="69" :x2="x+25" y2="69" stroke="var(--na-fg-muted)" stroke-width="2" marker-end="url(#a13)" />
      </g>

      <text x="10" y="168" font-weight="700" fill="var(--na-fg-muted)" style="font-size:14px">WRITE PATH</text>
      <!-- write path up to Server Action, stage 2 -->
      <g v-click="2" font-family="Inter, sans-serif">
        <rect x="10" y="180" width="180" height="70" rx="8" fill="var(--na-bg-raised)" stroke="var(--na-secondary-500)" stroke-width="2" />
        <text x="100" y="220" text-anchor="middle" fill="var(--na-fg)" style="font-size:15px">Client (form submit)</text>

        <rect x="220" y="180" width="200" height="70" rx="8" fill="var(--na-bg-raised)" stroke="var(--na-secondary-500)" stroke-width="2" />
        <text x="320" y="209" text-anchor="middle" fill="var(--na-fg)" style="font-size:15px">Server Action</text>
        <text x="320" y="230" text-anchor="middle" fill="var(--na-fg-muted)" font-family="JetBrains Mono, monospace" style="font-size:13px">app/actions/*.ts</text>

        <line x1="190" y1="215" x2="215" y2="215" stroke="var(--na-fg-muted)" stroke-width="2" marker-end="url(#a13)" />
      </g>

      <!-- auth-check node, stage 3, accent -->
      <g v-click="3" font-family="Inter, sans-serif">
        <rect x="450" y="180" width="230" height="70" rx="8" fill="var(--na-bg)" stroke="var(--na-accent-500)" stroke-width="3" />
        <text x="565" y="205" text-anchor="middle" fill="var(--na-accent-500)" font-weight="700" style="font-size:14px">requireUser +</text>
        <text x="565" y="223" text-anchor="middle" fill="var(--na-accent-500)" font-weight="700" style="font-size:14px">creatorId check</text>
        <text x="565" y="241" text-anchor="middle" fill="var(--na-fg-muted)" style="font-size:13px">the action's OWN check</text>
        <line x1="420" y1="215" x2="445" y2="215" stroke="var(--na-fg-muted)" stroke-width="2" marker-end="url(#a13)" />
        <!-- from the top edge of the check box to the bottom edge of the Prisma box -->
        <line x1="640" y1="180" x2="720" y2="104" stroke="var(--na-fg-muted)" stroke-width="2" marker-end="url(#a13)" />
      </g>

      <!-- revalidatePath loop-back, stage 4 -->
      <g v-click="4" font-family="Inter, sans-serif">
        <path d="M 980,98 C 980,200 900,300 400,300 C 260,300 220,290 220,255" fill="none" stroke="var(--na-primary-400)" stroke-width="2" stroke-dasharray="4,4" marker-end="url(#a13)" />
        <text x="600" y="325" text-anchor="middle" fill="var(--na-primary-400)" font-family="JetBrains Mono, monospace" style="font-size:14px">revalidatePath &#8594; the RSC page refreshes</text>
      </g>
    </svg>
  </div>
</template>
