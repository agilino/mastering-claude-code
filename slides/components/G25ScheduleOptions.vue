<script setup lang="ts">
// G25 — Where automated work runs: a cloud routine, a Desktop scheduled task,
// or /loop inside a session. Rows and values verified against
// code.claude.com/docs/en/scheduled-tasks#compare-scheduling-options (the
// table lives on the scheduled-tasks page, not on /routines). Deliberately
// no "minimum interval" row and no number with a time unit anywhere: the
// deck's lint forbids durations, and these four rows decide the choice.
const columns = ['Cloud routine', 'Desktop task', '/loop']
const firstRow = { label: 'Runs on', values: ['The cloud, Anthropic-managed', 'Your machine', 'Your machine'] }
const clickRows = [
  { label: 'Needs your machine on', values: ['No', 'Yes', 'Yes'] },
  { label: 'Needs an open session', values: ['No', 'No', 'Yes'] },
  { label: 'Sees local files', values: ['No, a fresh clone', 'Yes', 'Yes'] },
]
</script>

<template>
  <div class="na-card w-full max-w-4xl overflow-hidden" role="table" aria-label="Where automated work runs">
    <div class="g25-row g25-head" role="row">
      <div class="g25-label" role="columnheader"></div>
      <div
        v-for="c in columns"
        :key="c"
        class="g25-cell font-semibold"
        :class="{ 'font-mono': c.startsWith('/') }"
        role="columnheader"
        style="color: var(--na-accent-500)"
      >{{ c }}</div>
    </div>
    <div class="g25-row" role="row">
      <div class="g25-label" role="rowheader">{{ firstRow.label }}</div>
      <div v-for="(v, i) in firstRow.values" :key="i" class="g25-cell" role="cell">{{ v }}</div>
    </div>
    <div v-for="r in clickRows" :key="r.label" v-click class="g25-row" role="row">
      <div class="g25-label" role="rowheader">{{ r.label }}</div>
      <div v-for="(v, i) in r.values" :key="i" class="g25-cell" role="cell">{{ v }}</div>
    </div>
  </div>
</template>

<style scoped>
.g25-row {
  display: flex;
  align-items: center;
  border-top: 1px solid var(--na-border);
}
.g25-head {
  border-top: none;
  background: var(--na-primary-900);
}
.g25-label {
  flex: 0 0 15rem;
  padding: 0.85rem 1.25rem;
  font-size: 15px;
  color: var(--na-fg-muted);
}
.g25-cell {
  flex: 1 1 0;
  padding: 0.85rem 1.25rem;
  font-size: 16px;
  color: var(--na-fg);
}
</style>
