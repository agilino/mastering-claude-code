<script setup lang="ts">
// G20 — Spec Kit vs BMAD, positioned on ceremony (x) and org-role-fit (y).
// Ground truth: Spec Kit — GitHub, MIT, ~134k stars, agent-agnostic,
// `specify init` (Python/uv, not npm), low ceremony. BMAD v6 (v6.12.0) —
// 5 named agent personas (Analyst/Mary, PM/John, Architect/Winston,
// Developer/Amelia, UX/Sally) — NOT "12+ personas" (that's stale v4).
// Heavyweight, MIT, canonical repo bmad-code-org/BMAD-METHOD.
</script>

<template>
  <svg viewBox="0 0 1000 470" width="1000" height="470" class="w-full max-w-5xl h-auto max-h-full" font-family="Inter, sans-serif">
    <!-- axes -->
    <g v-click>
      <line x1="90" y1="400" x2="960" y2="400" stroke="var(--na-zinc-600)" stroke-width="2" />
      <line x1="90" y1="400" x2="90" y2="70" stroke="var(--na-zinc-600)" stroke-width="2" />
      <text x="525" y="432" text-anchor="middle" fill="var(--na-fg-muted)" style="font-size:14px">ceremony →</text>
      <text x="525" y="454" text-anchor="middle" fill="var(--na-fg-muted)" style="font-size:13px">low: specs as markdown  ·  high: many artifacts, gated phases</text>
      <text x="40" y="235" text-anchor="middle" fill="var(--na-fg-muted)" transform="rotate(-90 40 235)" style="font-size:14px">fit to existing roles →</text>
      <text x="100" y="392" fill="var(--na-fg-muted)" style="font-size:13px">generic</text>
      <text x="100" y="88" fill="var(--na-fg-muted)" style="font-size:13px">matches your org chart</text>
    </g>

    <!-- Spec Kit: low ceremony, generic fit -->
    <g v-click>
      <circle cx="230" cy="330" r="14" fill="var(--na-primary-400)" />
      <rect x="260" y="255" width="270" height="118" rx="10" fill="var(--na-bg-raised)" stroke="var(--na-primary-400)" stroke-width="1.5" />
      <text x="395" y="281" text-anchor="middle" fill="var(--na-fg)" font-weight="700" style="font-size:16px">Spec Kit</text>
      <text x="395" y="303" text-anchor="middle" fill="var(--na-fg-muted)" style="font-size:13px">GitHub · MIT · ~134k ★</text>
      <text x="395" y="323" text-anchor="middle" fill="var(--na-fg-muted)" style="font-size:13px">agent-agnostic · specify init</text>
      <text x="395" y="343" text-anchor="middle" fill="var(--na-fg-muted)" style="font-size:13px">Python / uv, not npm</text>
      <text x="395" y="363" text-anchor="middle" fill="var(--na-accent-500)" font-weight="600" style="font-size:13px">low ceremony</text>
    </g>

    <!-- BMAD: high ceremony, role fit -->
    <g v-click>
      <circle cx="830" cy="120" r="14" fill="var(--na-secondary-500)" />
      <rect x="560" y="140" width="330" height="160" rx="10" fill="var(--na-bg-raised)" stroke="var(--na-secondary-500)" stroke-width="1.5" />
      <text x="725" y="166" text-anchor="middle" fill="var(--na-fg)" font-weight="700" style="font-size:16px">BMAD v6</text>
      <text x="725" y="188" text-anchor="middle" fill="var(--na-fg-muted)" style="font-size:13px">bmad-code-org/BMAD-METHOD · MIT</text>
      <text x="725" y="210" text-anchor="middle" fill="var(--na-fg)" font-weight="600" style="font-size:13px">5 named agents: Analyst · PM · Architect · Dev · UX</text>
      <text x="725" y="232" text-anchor="middle" fill="var(--na-fg-muted)" style="font-size:13px">not "12+ personas", that was v4</text>
      <text x="725" y="256" text-anchor="middle" fill="var(--na-secondary-500)" font-weight="600" style="font-size:13px">heavyweight · maps onto real org roles</text>
      <text x="725" y="280" text-anchor="middle" fill="var(--na-fg-muted)" style="font-size:13px">reproduces your process, does not invent one</text>
    </g>

    <!-- closing honesty banner -->
    <g v-click>
      <rect x="130" y="10" width="740" height="44" rx="10" fill="var(--na-accent-500)" />
      <text x="500" y="38" text-anchor="middle" fill="var(--na-zinc-950)" font-weight="700" style="font-size:15px">
        Both shine on greenfield, but not only there. CLASH is both.
      </text>
    </g>
  </svg>
</template>
