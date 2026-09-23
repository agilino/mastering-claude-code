<!-- @note: path-scoped-rules -->
> Do:
> - Divider: rule row highlighted — a new row on the map
> - Keep the beat short

Say:
- "A rule that only shows up when it's actually relevant."

<!-- @note: rules-scoped-to-a-path -->
> Do:
> - Point back at task 06's ~/.claude/rules/tone.md — that one had no paths: field
> - Docs link: open it, scroll to path-specific rules, then back to the slides

Say:
- paths is the only field Claude Code reads from a rule file — everything else in the frontmatter is silently ignored
- No paths: field means it loads every session, same priority as CLAUDE.md itself

<!-- @note: task-10-path-scoped-rules -->
> Do:
> - Branch: 10-start already has the discover skill from task 09

Say:
- Two things to learn, one thing to end up with

<!-- @note: a-rule-that-only-loads-when-it-matters -->
> Do:
> - Live-build reference — the exact body is in tasks/10-path-scoped-rules.md step 1
> - Demo: run /context before and after Claude reads a file under app/actions/

Say:
- The rule states the ownership check from task 08's audit — now standing, not a one-off
- Ask about a file outside app/actions/ — the rule stays absent

<!-- @note: the-ownership-rule -->
> Do:
> - Recap: this rule is the durable version of what task 08's subagent found once

Say:
- "Same finding, now enforced every time, not just the one time someone thought to audit"
