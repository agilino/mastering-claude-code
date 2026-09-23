<!-- @note: a-plugin-bundles-your-setup -->
> Do:
> - Docs link: open it, scroll to "Plugin structure overview", then back to the slides

Say:
- A skill or a hook alone lives in .claude/ and stays local to one project
- A plugin is the packaged, shareable version of the same idea
- [click] skills/ — one SKILL.md per skill, same as .claude/skills/
- [click] agents/ — subagent files, same shape as .claude/agents/
- [click] hooks/ — one hooks.json instead of settings.json entries
- [click] .mcp.json — the plugin can ship its own MCP servers
- [click] Every skill is namespaced by the plugin name, so two plugins never collide

<!-- @note: install-from-a-marketplace -->
> Do:
> - FULL WORKING SOLUTION (trainer only): /plugin marketplace add anthropics/claude-plugins-community
>   then /plugin install <a small plugin from the list>@claude-community
> - Run /plugin afterward to show the Installed tab

Say:
- A marketplace is just a catalog — add one, then install by name
- The install summary says whether a restart or /reload-plugins is needed
