<!-- @note: path-scoped-rules -->
> Do:
> - Divider: rule row highlighted — a new row on the map
> - Keep the beat short

Say:
- "A rule that only shows up when it's actually relevant."

<!-- @note: task-10-path-scoped-rules -->
> Do:
> - Branch: 10-start already has the discover skill from task 09

Say:
- Two things to learn, one thing to end up with

<!-- @note: rules-scoped-to-a-path -->
> Do:
> - Point back at task 06's ~/.claude/rules/tone.md — that one had no paths: field
> - Docs link: open it, scroll to path-specific rules, then back to the slides

Say:
- paths is the only field Claude Code reads from a rule file — everything else in the frontmatter is silently ignored
- No paths: field means it loads every session, same priority as CLAUDE.md itself

<!-- @note: a-rule-that-only-loads-when-it-matters -->
> Do:
> - Live-build reference — the exact body is in tasks/10-path-scoped-rules.md step 1
> - Demo, in this order: /context (absent), read lib/data/venues.ts, /context again (still
>   absent) — then read app/actions/venues.ts, /context once more (now listed)

Say:
- Outside app/actions/ first — the rule stays absent, it hasn't loaded yet. Once it has, a
  later unrelated read won't unload it, so this check only proves anything done first
- Then the matching read — the rule appears: the ownership check from task 08's audit, now
  standing, not a one-off

<!-- @note: the-ownership-rule -->
> Do:
> - Recap: this rule is the durable version of what task 08's subagent found once

Say:
- "Same finding, surfaced every time now, not just the one time someone thought to audit — still guidance, not enforcement"
