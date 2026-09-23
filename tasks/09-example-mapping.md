# Task 09 — Example Mapping and the `discover` skill

> Part: Control the context · Reset branch: `09-start`
> Slides: https://mastering-claude-code.vercel.app/task-09

## Theory

- [Story, rule, example, question](https://mastering-claude-code.vercel.app/theory-example-mapping)
- [Progressive disclosure in a skill](https://mastering-claude-code.vercel.app/theory-skill-references)

> **Reminder:** Turn a vague story into rules with real numbers before any code gets written, and let a skill package the discipline so it repeats.

## You will end up with

A `.claude/skills/discover/SKILL.md` that runs Example Mapping on a user story, with the
method itself in `references/example-mapping.md`, and a saved, fully-resolved spec at
`docs/specs/clash-capacity.md` — no open questions left in the file.

## Why

"As a host, I want to cap how many people can join my clash" sounds simple until you ask what
happens right at the cap, or with no cap set at all. Ambiguity like this is normal — the
discipline is turning it into rules with real numbers, real examples, and real edge cases
before anyone writes code. Example Mapping does this with four kinds of statements: a story,
its rules, an example for each rule, and the open questions nobody's answered yet.

A skill packages the discipline so it's repeatable on the next feature, not just this one. The
method detail belongs in a `references/` file, not the skill body — the skill only loads the
reference when it actually needs it.

## Do this

1. Send this by hand first, in chat, no skill yet.
   ```
   You are a domain expert in social apps. Run Example Mapping on this story:
   "As a host, I want to cap how many people can join my clash, so the venue
   doesn't get overcrowded." For each rule, state it as "Should..." or
   "Must...", give at least two examples as "The one where...", give at
   least one counter-example, and list any open questions. Don't write code
   or Gherkin — plain business language only.
   ```
   See how much of that scaffolding you'd have to retype for the next story.
2. Create `.claude/skills/discover/SKILL.md`.
   ```yaml
   ---
   name: discover
   description: Run Example Mapping on a user story to surface rules, examples,
     counter-examples and open questions, resolve the questions with the user,
     and save the finished spec. Use at the start of a new feature, before any
     code or tests exist for it.
   argument-hint: "<user story in quotes>"
   allowed-tools: Read, Write, AskUserQuestion
   ---
   ```
   Body: a role line that reads CLAUDE.md for domain context instead of hard-coding one, the
   `$ARGUMENTS` story, then the same instructions you typed by hand in step 1.
3. Move the method out of the skill body. Create
   `.claude/skills/discover/references/example-mapping.md` with the four building blocks
   (story, rule, example, question) and the quality bar: normal case first, no two examples
   that differ only in a number, a boundary row counts as the counter-example. Have `SKILL.md`
   point at the file instead of repeating it — the reference only enters context when the skill
   actually opens it.
4. Add the interactive step to `SKILL.md`: resolve every open question one at a time with
   `AskUserQuestion`, offering a few sensible options each, fold the answer back into the rule
   it affects, then delete the question. Nothing saved should have an open question left in it.
5. Run it for real.
   ```
   /discover "As a host, I want to cap how many people can join my clash, so
   the venue doesn't get overcrowded."
   ```
   Answer the question it asks you about lowering a capacity after people already joined.
   Confirm it saves to `docs/specs/clash-capacity.md`.

## Now you

- Run `/discover` on a second CLASH story of your own — something that doesn't already exist
  and isn't already spoken for by a later task. Save its spec too.
- Add a `Checklist` section to the end of `references/example-mapping.md`: five things you can
  verify by looking at a finished spec.

## Check

- [ ] `.claude/skills/discover/SKILL.md` exists with `argument-hint` and `allowed-tools`.
- [ ] `references/example-mapping.md` holds the method; `SKILL.md` points at it instead of
      repeating it.
- [ ] The skill called `AskUserQuestion` during the run — you answered a question, not just
      read one.
- [ ] `docs/specs/clash-capacity.md` has every rule, at least one example each, and no
      `Questions` section left in it.
- [ ] A second spec exists from "Now you".

## Stuck?

`git checkout 09-start` — the reference CLASH with tasks 06–08's files (`CLAUDE.md`, the
`clash-feature` skill), no `discover` skill yet.

## Go further

Compare your skill with `workshop-artifacts/09-example-mapping/` in the workshop repository.

## Links

- Skills — https://code.claude.com/docs/en/skills
- Memory — https://code.claude.com/docs/en/memory
