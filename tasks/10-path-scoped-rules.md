# Task 10 — Path-scoped rules

> Part: Control the context · Reset branch: `10-start`
> Slides: https://mastering-claude-code.vercel.app/task-10

## Theory

- [Rules scoped to a path](https://mastering-claude-code.vercel.app/theory-path-scoped-rules)

> **Reminder:** A rule in `.claude/rules/` can carry a `paths:` field so it only loads when Claude actually reads a matching file.

## You will end up with

`.claude/rules/server-actions.md`, scoped to `app/actions/**` with `paths:` frontmatter, stating
the ownership-check rule from [task 08](08-subagent-audit.md)'s `security-auditor` finding — now a standing instruction
instead of a one-off audit.

## Why

[Task 06](06-context-and-claude-md.md) put a rule in `~/.claude/rules/tone.md` — personal, every project, loaded at launch,
unconditionally. `.claude/rules/` is the project-level sibling: shared through git, and a rule
here can carry `paths:` frontmatter so it loads only when Claude reads a file matching the glob.
`paths` is the only field Claude Code reads from a rule file; anything else in the frontmatter
is silently ignored. A rule without `paths` loads unconditionally, at the same priority as
`.claude/CLAUDE.md`. Scoping keeps CLAUDE.md itself small and puts each convention only where it
applies.

## Do this

1. Create `.claude/rules/server-actions.md`.
   ```markdown
   ---
   paths:
     - "app/actions/**"
   ---

   # Server Action rules

   - Every Server Action that mutates an EXISTING row must check that the
     current user owns it, not just that requireUser() ran. requireUser()
     protects the page; a Server Action is a public endpoint anyone with a
     session cookie can call directly, with any arguments.
   ```
2. Verify the trigger — not by opening the file yourself, by having Claude read one. Start in
   a fresh session, before Claude has read anything under `app/actions/`.
   ```
   Read lib/data/venues.ts and summarize what it exports.
   ```
   Run `/context` and confirm `server-actions.md` is absent from Memory files — `lib/data/`
   doesn't match the glob, so the rule hasn't loaded. Once it has loaded, reading an unrelated
   file won't unload it, so the negative case only proves anything checked first.
   ```
   Read app/actions/venues.ts and summarize what each exported action does.
   ```
   Run `/context` again and confirm `server-actions.md` is now listed — the rule loads when
   Claude's Read tool matches the glob, not on every tool use.
3. Ask Claude to sketch a small new Server Action — check first that nothing already covers it.
   ```
   Sketch a new Server Action, cancelClash, that lets a clash's creator mark
   it cancelled instead of deleting it. Don't wire up a schema change or the
   UI yet — just write the function, and note where a migration would be
   needed.
   ```
   Watch it cite the ownership-check rule without being told to.
4. Ask Claude to explain, in its own words, the difference between `~/.claude/rules/tone.md`
   from [task 06](06-context-and-claude-md.md) and this file. Expect: user-level vs.
   project-level, unconditional vs. path-scoped.

## Now you

Add a second path-scoped rule for a convention this codebase already follows informally — for
example, scoped to `lib/validation.ts` (Zod schemas) or `components/**` (shadcn usage).

## Check

- [ ] `.claude/rules/server-actions.md` has a `paths:` field and nothing else load-bearing in
      its frontmatter.
- [ ] `/context` lists the rule only after Claude reads a file under `app/actions/`.
- [ ] The sketch cites the ownership-check rule unprompted.
- [ ] You can explain user-level vs. project-level, unconditional vs. path-scoped, in one
      sentence.

## Stuck?

`git checkout 10-start` — the reference CLASH with tasks 06–09's files, including the `discover`
skill, its resolved spec, and the ownership-check fix restored, no project rules yet.

## Go further

Compare with `workshop-artifacts/10-path-scoped-rules/` in the workshop repository.

## Links

- Memory — https://code.claude.com/docs/en/memory
