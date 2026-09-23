---
layout: concept
heading: "Settings override each other"
docs: https://code.claude.com/docs/en/settings
lines:
  - "Five files, highest wins: managed, command line, project local, shared, user."
  - "Same key in two files? The higher one applies. Always."
---

<G21SettingsPrecedence />

---
layout: concept
heading: "The sandbox limits what a command touches"
docs: https://code.claude.com/docs/en/sandboxing
lines:
  - "A sandboxed command writes only inside your project, reaches only allowed hosts."
  - "macOS and Linux only. On Windows, run it inside WSL2."
---

<div class="flex gap-6 w-full max-w-3xl">
  <div class="na-card p-5 flex-1">
    <div class="font-semibold mb-2" style="color: var(--na-accent-500)">Filesystem</div>
    <div class="text-base" style="color: var(--na-fg-muted)">Write access: your project only. Read access: the machine, minus paths you deny.</div>
  </div>
  <div class="na-card p-5 flex-1" v-click>
    <div class="font-semibold mb-2" style="color: var(--na-accent-500)">Network</div>
    <div class="text-base" style="color: var(--na-fg-muted)">Nothing is allowed by default. A new host asks once, then is remembered.</div>
  </div>
</div>

---
layout: concept
heading: "Your org can lock settings down"
docs: https://code.claude.com/docs/en/managed-settings
lines:
  - "managed-settings.json, MDM, or the claude.ai console — deployed by an admin."
  - "Nothing you set in your own files overrides it."
---

<div class="na-card p-6 max-w-2xl text-center">
  <div class="text-lg" style="color: var(--na-fg)">Run <span class="font-mono" style="color: var(--na-accent-500)">/status</span> — the "Setting sources" line names the managed source in force.</div>
</div>
