<script setup lang="ts">
// layout: flow-ways — the companion to a coordination-flow slide. Same heading as
// the flow slide before it; the flow's small, click-free graphic on the left, and
// on the right a table of ways to make that flow happen in Claude Code, each with
// the prompt that starts it.
// Frontmatter:
//   heading: string                            the flow slide's heading, repeated
//   ways: { way: string; prompt: string }[]    2 to 4 rows (checked by lint-slides.mjs)
//   footnote?: string                          one short muted line under the table,
//                                              e.g. for a flow with no built-in feature
// Slot: the graphic, in its still form, e.g. <G28CoordinationPatterns pattern="…" still />.
// No docs link: the flow slide before this one carries it.
withDefaults(defineProps<{ heading?: string; ways?: { way: string; prompt: string }[]; footnote?: string }>(), {
  ways: () => [],
})
</script>

<template>
  <div class="slidev-layout relative w-full h-full flex flex-col px-16 py-12">
    <h1 v-if="heading" class="mb-6 shrink-0">{{ heading }}</h1>
    <div class="na-flow-ways flex-1 min-h-0">
      <div class="na-flow-graphic min-h-0 flex items-center justify-center">
        <slot />
      </div>
      <div class="min-w-0 flex flex-col justify-center">
        <table class="na-ways">
          <colgroup>
            <col class="na-col-way" />
            <col />
          </colgroup>
          <thead>
            <tr><th>Way</th><th>Prompt</th></tr>
          </thead>
          <tbody>
            <tr v-for="(w, i) in ways" :key="i">
              <td class="na-way">{{ w.way }}</td>
              <td class="na-prompt"><code>{{ w.prompt }}</code></td>
            </tr>
          </tbody>
        </table>
        <p v-if="footnote" class="na-footnote">{{ footnote }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.na-flow-ways {
  display: grid;
  grid-template-columns: 2fr 3fr;
  gap: 2.5rem;
}
/* the graphic fills its column; the still SVGs scale to fit width and height */
.na-flow-graphic :deep(svg) {
  width: 100%;
  height: auto;
  max-width: 100%;
  max-height: 100%;
}
.na-ways {
  width: 100%;
  table-layout: fixed;
  border-collapse: collapse;
}
.na-col-way { width: 30%; }
.na-ways th {
  text-align: left;
  font-size: 0.8rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--na-fg-muted);
  padding: 0 0 0.5rem;
  border-bottom: 1px solid var(--na-zinc-700);
}
/* sizes here feed the fit budget in scripts/lint-slides.mjs (FLOW_WAYS): change both together */
.na-ways td {
  vertical-align: top;
  padding: 0.6rem 0;
  border-bottom: 1px solid var(--na-border);
}
.na-ways tbody tr:last-child td { border-bottom: none; }
/* first line level with the prompt's first line inside its chip (0.25rem padding) */
.na-ways td.na-way {
  padding: 0.85rem 1rem 0.6rem 0;
  font-size: 1.125rem;
  line-height: 1.4;
  font-weight: 600;
  color: var(--na-fg);
  overflow-wrap: anywhere;
}
/* the prompt as a quiet chip: raised surface, the deck's code font, accent text */
.na-prompt code {
  display: block;
  padding: 0.25rem 0.6rem;
  border-radius: var(--na-radius-lg);
  background: var(--na-bg-raised);
  font-size: 1.125rem;
  line-height: 1.4;
  color: var(--na-accent-400);
  white-space: pre-wrap;
  overflow-wrap: anywhere;
}
.na-footnote {
  margin-top: 1rem;
  font-size: 1rem;
  line-height: 1.4;
  color: var(--na-fg-muted);
}
</style>
