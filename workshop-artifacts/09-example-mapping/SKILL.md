---
name: discover
description: Run Example Mapping on a user story to surface rules, examples,
  counter-examples and open questions, resolve the questions with the user,
  and save the finished spec. Use at the start of a new feature, before any
  code or tests exist for it.
argument-hint: "<user story in quotes>"
allowed-tools: Read, Write, AskUserQuestion
---

Read CLAUDE.md first, so the rules and examples you propose fit this codebase's actual domain
instead of a generic one.

## Story

$ARGUMENTS

## Task

Run Example Mapping on the story above:

1. Identify the rules. Each one is a single testable business constraint, stated as
   "Should..." or "Must...". If a rule needs "and" to hold two different constraints
   together, split it into two rules.
2. Give at least one example per rule, in "The one where..." form, with real numbers — a
   second only for a boundary or a genuinely different outcome.
3. Give at least one counter-example per rule where a meaningful edge case exists — a valid
   boundary or exclusion, never a bug.
4. List any open question that only the user can resolve.

Read `references/example-mapping.md` (relative to this skill) for the full method and the
quality bar before you draft anything.

## Resolve

Ask every open question one at a time with `AskUserQuestion`, offering a handful of sensible
options. Fold each answer back into the rule it affects, then drop the question — the saved
spec carries no open questions.

## Save

Once every question is resolved, write the spec to `docs/specs/<feature>.md` (kebab-case the
feature name from the story), structured as:

```markdown
# <Feature Title>

**As a <role>, I want <capability> so that <benefit>.**

## Rules

### Rule: <Should/Must statement>

- The one where <concrete example, real numbers, the outcome>.
- Counter-example: The one where <boundary or exclusion, and the outcome>.
```
