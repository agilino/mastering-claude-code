<script setup lang="ts">
// G14 — THE centrepiece graphic. requireUser guards the page; a direct
// POST to the action's generated ID bypasses the PAGE's guard, not
// authentication itself. Ground truth: app/(app)/layout.tsx calls
// requireUser for every page under it, but app/actions/*.ts Server
// Actions (e.g. deleteClash, deleteVenue) are their own public POST
// endpoints, reachable without ever loading a guarded page — each action
// calls requireUser again on its own, so the bypass is still
// authenticated. What it does NOT re-establish is ownership.
</script>

<template>
  <div class="w-full h-full flex items-center justify-center">
    <svg viewBox="0 0 1000 400" width="1000" height="400" class="w-full max-w-5xl h-auto max-h-full">
      <defs>
        <marker id="a14" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="var(--na-fg-muted)" />
        </marker>
        <marker id="a14-danger" markerWidth="12" markerHeight="12" refX="9" refY="4" orient="auto">
          <path d="M0,0 L9,4 L0,8 Z" fill="var(--na-error-500)" />
        </marker>
      </defs>

      <!-- safe path, stage 1 -->
      <g v-click="1" font-family="Inter, sans-serif">
        <text x="20" y="30" font-weight="700" fill="var(--na-primary-400)" style="font-size:14px">THE INTENDED ROUTE</text>
        <rect x="20" y="45" width="150" height="62" rx="8" fill="var(--na-bg-raised)" stroke="var(--na-primary-500)" stroke-width="2" />
        <text x="95" y="82" text-anchor="middle" fill="var(--na-fg)" style="font-size:15px">Browser</text>

        <rect x="230" y="45" width="210" height="62" rx="8" fill="var(--na-bg-raised)" stroke="var(--na-primary-500)" stroke-width="2" />
        <text x="335" y="70" text-anchor="middle" fill="var(--na-fg)" style="font-size:15px">Page 🛡️ requireUser</text>
        <text x="335" y="92" text-anchor="middle" fill="var(--na-fg-muted)" font-family="JetBrains Mono, monospace" style="font-size:13px">app/(app)/layout.tsx</text>

        <line x1="170" y1="76" x2="225" y2="76" stroke="var(--na-fg-muted)" stroke-width="2" marker-end="url(#a14)" />
      </g>

      <!-- shared action node -->
      <g font-family="Inter, sans-serif">
        <rect x="380" y="180" width="260" height="78" rx="8" fill="var(--na-bg)" stroke="var(--na-primary-500)" stroke-width="2" />
        <text x="510" y="205" text-anchor="middle" fill="var(--na-fg)" font-weight="700" style="font-size:15px">Server Action</text>
        <text x="510" y="226" text-anchor="middle" fill="var(--na-fg-muted)" font-family="JetBrains Mono, monospace" style="font-size:13px">deleteClash / deleteVenue</text>
        <text x="510" y="246" text-anchor="middle" fill="var(--na-fg-muted)" style="font-size:13px">a public POST endpoint, generated id</text>
      </g>

      <g v-click="1">
        <path d="M 335,107 C 335,150 400,150 470,178" fill="none" stroke="var(--na-primary-400)" stroke-width="2" marker-end="url(#a14)" />
      </g>

      <!-- bypass path, stage 2, dramatic -->
      <g v-click="2" font-family="Inter, sans-serif">
        <text x="770" y="30" font-weight="700" fill="var(--na-error-500)" style="font-size:14px">THE BYPASS</text>
        <rect x="760" y="45" width="220" height="62" rx="8" fill="var(--na-bg-raised)" stroke="var(--na-error-500)" stroke-width="2" />
        <text x="870" y="70" text-anchor="middle" fill="var(--na-fg)" style="font-size:15px">Any authenticated user</text>
        <text x="870" y="92" text-anchor="middle" fill="var(--na-fg-muted)" style="font-size:13px">valid session cookie only</text>

        <path d="M 870,107 C 870,150 650,140 560,178" fill="none" stroke="var(--na-error-500)" stroke-width="3" stroke-dasharray="6,4" marker-end="url(#a14-danger)" />
        <rect x="670" y="190" width="310" height="58" rx="6" fill="var(--na-bg)" stroke="var(--na-error-500)" stroke-width="2" />
        <text x="825" y="214" text-anchor="middle" fill="var(--na-error-500)" font-weight="700" style="font-size:14px">the PAGE's requireUser never runs</text>
        <text x="825" y="236" text-anchor="middle" fill="var(--na-fg-muted)" style="font-size:13px">the action checks auth itself, but checks WHAT?</text>
      </g>

      <!-- convergence + closing label, stage 3 -->
      <g v-click="3" font-family="Inter, sans-serif">
        <text x="510" y="288" text-anchor="middle" fill="var(--na-accent-500)" font-weight="700" style="font-size:15px">both routes reach the same code</text>
        <text x="510" y="308" text-anchor="middle" fill="var(--na-fg-muted)" style="font-size:13px">only the action's OWN check decides what happens next</text>
      </g>

      <g v-click="4" font-family="Inter, sans-serif">
        <rect x="240" y="328" width="540" height="62" rx="8" fill="var(--na-bg)" stroke="var(--na-accent-500)" stroke-width="2" />
        <text x="510" y="353" text-anchor="middle" fill="var(--na-accent-500)" font-weight="700" style="font-size:17px">Zod validates shape, not permission.</text>
        <text x="510" y="376" text-anchor="middle" fill="var(--na-fg-muted)" style="font-size:13px">the ownership check is the only thing between the two paths</text>
      </g>
    </svg>
  </div>
</template>
