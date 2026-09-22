---
layout: concept
heading: "CLAUDE.md files add up, they don't compete"
docs: https://code.claude.com/docs/en/memory
lines:
  - "Every CLAUDE.md above your working directory loads — none of them wins."
  - "A contradiction? Claude picks one arbitrarily. Keep your rules consistent."
---

<G22MemoryConcatenation />

---
layout: concept
heading: "Rules can load only for matching files"
lines:
  - ".claude/rules/*.md — one topic per file, loaded only when it is relevant."
  - "A paths: field scopes a rule to the files it is about."
---

<div class="flex gap-6 w-full max-w-4xl">
  <div class="na-card p-5 flex-1">
    <div class="font-mono text-xs mb-2" style="color: var(--na-fg-muted)">.claude/rules/testing.md</div>
    <div class="font-mono text-xs" style="color: var(--na-fg-muted)">paths: ["**/*.test.ts"]</div>
    <div class="text-sm mt-2">Mock the database, never hit it.</div>
  </div>
  <div class="na-card p-5 flex-1" v-click>
    <div class="font-semibold mb-2" style="color: var(--na-accent-500)">~/.claude/rules/</div>
    <div class="text-sm" style="color: var(--na-fg-muted)">Personal rules, every project on your machine — for preferences that are not this project's business.</div>
  </div>
</div>
