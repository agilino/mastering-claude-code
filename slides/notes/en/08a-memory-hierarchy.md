<!-- @note: claude-md-files-add-up-they-don-t-compete -->
> Do:
> - Docs link: open it, scroll to "How CLAUDE.md files load", then back to the slides

Say:
- [click] ~/.claude/CLAUDE.md — your personal instructions, every project
- [click] CLAUDE.md at the repository root — read first, closest to launch
- [click] CLAUDE.local.md — gitignored, appended right after CLAUDE.md at the same level
- [click] A subdirectory's CLAUDE.md loads when Claude reads a file there — read last, closest to the work
- [click] .claude/rules/*.md loads the same way, on demand
- [click] All of it lands in one context — nothing is dropped, nothing is chosen
- [click] Two files disagree? Claude picks one. That is a bug you created, not a feature

<!-- @note: rules-can-load-only-for-matching-files -->
Say:
- A rule with no paths: field loads for every session, like an extra CLAUDE.md
- [click] ~/.claude/rules/ — yours, every project, for things that are not this repo's business
- Symlink a shared rules folder into multiple repos to keep one copy in sync
