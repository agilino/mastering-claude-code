# Task 09 — Example Mapping and the `discover` skill

> Part: Control the context · Reset branch: `09-start`
> Slides: https://mastering-claude-code.vercel.app/task-09

## Theory

- [Story, rule, example, question](https://mastering-claude-code.vercel.app/theory-example-mapping)
- [Progressive disclosure in a skill](https://mastering-claude-code.vercel.app/theory-skill-references)

> **Reminder:** Turn a vague story into rules with real numbers before any code gets written, and let a skill package the discipline so it repeats.

## You will end up with

A `.claude/skills/discover/` folder with three parts: `SKILL.md` (the steps),
`references/example-mapping.md` (the method) and `templates/spec-template.md` (the format the
spec is saved in). And a saved, fully settled spec at `docs/specs/clash-capacity.md` — no open
questions left in the file.

## Why

"As a host, I want to cap how many people can join my clash" sounds simple until you ask what
happens right at the cap, or with no cap set at all. Ambiguity like this is normal — the
discipline is turning it into rules with real numbers, real examples, and real edge cases
before anyone writes code. Example Mapping does this with four kinds of statement: a story,
its rules, examples for each rule, and the open questions nobody's answered yet.

A skill packages the discipline so it's repeatable on the next feature, not just this one. This
one runs as an interview inside your own conversation, so it can ask you questions and wait for
the answers. The method and the save format live in their own files. The skill only reads them
when it needs them.

## Do this

1. Send this by hand first, in chat, no skill yet.
   ```
   You are a domain expert in social apps. Run an Example Mapping session on
   this story: "As a host, I want to cap how many people can join my clash, so
   the venue doesn't get overcrowded." Ask me your questions one at a time
   before you draft anything. Then, for each rule, stated as "Should..." or
   "Must...", give several examples as "The one where..." with real numbers,
   the normal case first and then cases near the edge, and give at least one
   counter-example. List any open questions. Plain business language, no code.
   ```
   See how much of that scaffolding you'd have to retype for the next story.
2. Create `.claude/skills/discover/SKILL.md`. This is the whole file.
   ```markdown
   ---
   name: discover
   description: Run an Example Mapping interview on a user story. Interview first, then draft rules with examples and counter-examples, settle the open questions with the user, and save the finished spec. Use at the start of a new feature, before any code or tests exist for it.
   argument-hint: "<user story in quotes>"
   allowed-tools: Read, Write, AskUserQuestion
   ---

   You are a domain expert running a short Example Mapping session with the user. Your job is to
   find the rules behind the story, pin each rule down with concrete examples, and get every open
   question answered. You do not write code, tests or Gherkin.

   Read CLAUDE.md first, so the rules and examples fit this codebase's real domain.

   ## Story

   $ARGUMENTS

   ## How to run the session

   Read `references/example-mapping.md` for the method and the checklists. Then follow these steps
   in order. Do not skip ahead.

   1. **Interview first.** Before you draft anything, ask 3 to 5 short questions, one at a time,
      about what the story leaves open: who is affected, what happens right at a limit, what
      happens when a value is missing or zero, what is out of scope. Use `AskUserQuestion` and
      offer 3 or 4 options each. After every answer, say in one sentence what you understood.
   2. **Draft the map.** From the story and the answers, write the rules. One rule is one testable
      constraint, stated as "Should..." or "Must...". Split any rule that needs an "and".
   3. **Hunt for examples.** For every rule, work through the example-hunting list in the
      reference. Give several examples with real numbers: the normal case first, then the cases
      near the edge. Give at least one counter-example per rule, or say why none exists.
   4. **Show the draft** in the format below and ask the user to react before you go on.
   5. **Settle every open question**, one at a time, with `AskUserQuestion` and 3 or 4 options
      each. Fold each answer into the rule it affects, then delete the question.
   6. **Check coverage.** Run the checklist from the reference. Fix whatever fails.
   7. **Show the complete spec. Do not save yet.** Ask whether it is ready.
   8. **Save on approval.** Write the spec to `docs/specs/<feature>.md`, with a kebab-case name
      taken from the story, using `templates/spec-template.md`. Then stop. Do not write code or
      tests: the saved spec is the deliverable.

   ## Format for the draft

   - Rule: Must or Should ...
       - Example: The one where ...
       - Counter-example: The one where ...
       - Question: ...

   Plain business language. No screens, endpoints or class names.
   ```
   `$ARGUMENTS` is what you type after `/discover`. `allowed-tools` includes `AskUserQuestion`:
   that is how a skill asks you a multiple-choice question and waits. The eight steps are the
   interview. Read them once, they are the point.
3. Create `.claude/skills/discover/references/example-mapping.md`. Step 1 of the skill says to
   read it, so it only enters context when the skill opens it.
   ```markdown
   # Example Mapping

   A short, structured conversation that turns a story into rules you can build and test against.
   Four kinds of card:

   | Card | What it is | In a spec |
   |---|---|---|
   | Story | The story under discussion | The `As a... I want... so that...` line |
   | Rule | One testable business constraint | `### Rule: Should/Must ...` |
   | Example | A concrete case that makes a rule unambiguous | `The one where ...` |
   | Question | An unknown only the user can settle | Asked live, then deleted from the saved spec |

   A healthy map has a handful of rules, several examples each, and no questions left. Many open
   questions mean the story is not ready to build.

   ## Rules

   - One rule, one constraint. Split anything joined by "and".
   - State every rule as "Should..." or "Must...".
   - A rule describes business behavior, not mechanism. No endpoints, screens or class names.

   ## Hunting for examples

   Walk this list for every rule. Keep a case only if it changes the outcome or the reason.

   - The normal case, with real numbers.
   - Just below the limit.
   - Exactly at the limit.
   - Just above the limit.
   - Zero, empty or missing.
   - Unlimited, or no limit set.
   - The same thing twice, or two things at once.
   - The same case for a different person or role.

   Drop an example that changes only a name or a number and gives the same outcome.

   ## Counter-examples

   A counter-example is a valid case the rule deliberately does not cover, or where the outcome
   flips. It is never a bug report. To find one, ask: "When would this rule not apply, and what
   happens instead?" Good places to look: the edge of a limit, an empty value, an exempt role.

   ## Tables

   When a rule has inputs that vary independently, use a table: one column per input, one for the
   outcome, and a row for the boundary. A table shows gaps a list of sentences hides.

   ## Questions

   Raise one whenever a rule depends on a decision only the business can make. Settle each with
   `AskUserQuestion`, one at a time, offering 3 or 4 sensible options. Fold the answer into the
   rule it affects, then delete the question. The saved spec has none left.

   ## Checklist

   - [ ] Every rule starts with Should or Must and states one constraint.
   - [ ] Every rule has several examples, the normal case first, none that differ only in a name
         or a number.
   - [ ] Every rule has at least one counter-example, or a note on why none exists.
   - [ ] Plain business language throughout.
   - [ ] No open question left.

   ## A small worked example

   A made-up story, unrelated to CLASH: "As a librarian, I want to limit how many books a member
   can borrow, so that popular books circulate."

   Rule: Must refuse a new loan once a member has 3 open loans.

   | Open loans | New loan |
   |---|---|
   | 0 | allowed |
   | 2 | allowed |
   | 3 | refused |
   | 4 | refused, possible after a limit was lowered |

   - Counter-example: The one where a member with 3 open loans renews one of them. A renewal is
     not a new loan, so it is allowed.
   ```
4. Create `.claude/skills/discover/templates/spec-template.md`. The last step of the skill reads
   it to write the spec.
   ```markdown
   # <Feature title>

   **As a <role>, I want <capability> so that <benefit>.**

   ## Rules

   ### Rule: Must <one testable constraint>

   - The one where <the normal case, with real numbers, and the outcome>.
   - The one where <a case near the edge, and the outcome>.
   - Counter-example: The one where <a valid case the rule does not cover, and the outcome>.

   ### Rule: Must <a constraint whose inputs vary independently>

   | <Input A> | <Input B> | <Outcome> |
   |---|---|---|
   | <normal> | <normal> | <result> |
   | <near the edge> | <normal> | <result> |
   | <the boundary> | <the boundary> | <result> |

   ## Resolved decisions

   - **<Decision>:** <the answer the user chose during the interview>.
   - **Out of scope:** <anything left out on purpose>.
   ```
5. Run it for real.
   ```
   /discover "As a host, I want to cap how many people can join my clash, so
   the venue doesn't get overcrowded."
   ```
   Expect this order: a few questions from it, one at a time; a draft with rules, examples and
   counter-examples; the remaining open questions; then the complete spec, shown but not saved.
   Answer the question about lowering a capacity after people already joined. Say the spec is
   ready. Confirm it saves to `docs/specs/clash-capacity.md`.

## Now you

- Run `/discover` on a second CLASH story of your own — something that doesn't already exist
  and isn't already spoken for by a later task. Save its spec too.
- Add a `Checklist` item to `references/example-mapping.md` for something you had to fix by hand
  in the first spec.

## Check

- [ ] `.claude/skills/discover/` holds `SKILL.md`, `references/example-mapping.md` and
      `templates/spec-template.md`.
- [ ] `SKILL.md` has `argument-hint` and `allowed-tools`, and points at the other two files
      instead of repeating them.
- [ ] The skill called `AskUserQuestion` during the run — you answered questions, not just
      read them, and it asked before it drafted.
- [ ] The complete spec was shown to you before it was saved.
- [ ] `docs/specs/clash-capacity.md` has every rule with several examples and at least one
      counter-example, and no open question left in it.
- [ ] A second spec exists from "Now you".

## Stuck?

`git checkout 09-start` — the reference CLASH with tasks 06–08's files (`CLAUDE.md`, the
`clash-feature` skill), no `discover` skill yet.

## Go further

Compare your skill with `workshop-artifacts/09-example-mapping/` in the workshop repository.

## Links

- Skills — https://code.claude.com/docs/en/skills
- Memory — https://code.claude.com/docs/en/memory
