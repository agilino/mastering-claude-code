---
layout: concept
heading: "A plugin bundles your setup"
docs: https://code.claude.com/docs/en/plugins
lines:
  - "One folder: skills, agents, hooks, an MCP server — one shared name."
  - "commands/ became skills/. Old command files still work."
---

<div class="grid grid-cols-3 gap-4 w-full max-w-3xl">
  <div class="na-card p-4"><div class="font-mono text-sm font-semibold mb-1" style="color: var(--na-accent-500)">.claude-plugin/</div><div class="text-sm" style="color: var(--na-fg-muted)">plugin.json — name, version</div></div>
  <div class="na-card p-4" v-click><div class="font-mono text-sm font-semibold mb-1" style="color: var(--na-accent-500)">skills/</div><div class="text-sm" style="color: var(--na-fg-muted)">one SKILL.md per skill</div></div>
  <div class="na-card p-4" v-click><div class="font-mono text-sm font-semibold mb-1" style="color: var(--na-accent-500)">agents/</div><div class="text-sm" style="color: var(--na-fg-muted)">subagent definitions</div></div>
  <div class="na-card p-4" v-click><div class="font-mono text-sm font-semibold mb-1" style="color: var(--na-accent-500)">hooks/</div><div class="text-sm" style="color: var(--na-fg-muted)">hooks.json</div></div>
  <div class="na-card p-4" v-click><div class="font-mono text-sm font-semibold mb-1" style="color: var(--na-accent-500)">.mcp.json</div><div class="text-sm" style="color: var(--na-fg-muted)">MCP servers the plugin ships</div></div>
  <div class="na-card p-4" v-click><div class="font-mono text-sm font-semibold mb-1" style="color: var(--na-accent-500)">/plugin-name:skill</div><div class="text-sm" style="color: var(--na-fg-muted)">namespaced, so plugins never collide</div></div>
</div>

---
layout: code-live
heading: "Install from a marketplace"
filePath: "inside a running claude session"
success: "/plugin lists the installed plugin, and its skill runs namespaced."
---

```bash
# ⟵ LIVE: add a marketplace, then install one plugin from it.
/plugin marketplace add ___
/plugin install ___
```
