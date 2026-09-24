# Task 07 — The `clash-feature` skill

> Part: Control the context · Reset branch: `07-start`
> Slides: https://mastering-claude-code.vercel.app/task-07

## Theory

- [Loaded only when needed](https://mastering-claude-code.vercel.app/theory-skills)
- [/skill-doctor: what it costs](https://mastering-claude-code.vercel.app/theory-skill-doctor)
- [A skill is advice](https://mastering-claude-code.vercel.app/theory-skill-advice)

> **Reminder:** Audit the skill surface before adding more; skills load on demand and remain advice, not enforcement.

## You will end up with

A `/skill-doctor` reading of the vendored skills, then a skill at `.claude/skills/clash-feature/SKILL.md`
that holds the recipe for adding a feature to CLASH, and one small feature shipped with it: venue favourites.

## Why

A skill is for work you keep explaining again and again. Adding a feature to CLASH is
always the same eleven steps in the same order. The easiest step to forget is the ownership
check in the Server Action. A skill turns "remember the check" into "the recipe has a slot for it".

A skill is advice. It loads only when its description matches what you ask. Custom slash
commands in `.claude/commands/*.md` still work. Skills are the richer format for new work.

## Do this

1. Look at what already ships: `.agents/skills/` and `skills-lock.json`. These are
   third-party skills for Prisma, shadcn and React. You are not starting cold.
2. Measure that surface before you add another skill.
   ```
   /skill-doctor
   ```
   Confirm that `react-best-practices` and `vercel-react-best-practices` are large near-duplicates.
   The lesson is not to delete them during the workshop; it is to see that every skill description joins the
   session index, while the large body loads only when the skill is used.
3. Create the skill file and write the header first.
   ```yaml
   ---
   name: clash-feature
   description: Add a complete feature to CLASH, from Prisma model through an
     authorized Server Action to a rendered page. Use when adding or extending
     a user-facing feature in this codebase.
   allowed-tools: Read, Edit, Write, Grep, Glob, Bash(npm run *) Bash(npx prisma *) Bash(npx tsc *)
   ---
   ```
4. Write the body as eleven steps, the last one verifies. Keep each step short.
   Prisma model → migration → constants → Zod schema in `lib/validation.ts` → read helper
   in `lib/data/` → Server Action in `app/actions/` **with its own ownership check** →
   page → shadcn component → `revalidatePath` → notification via `lib/notify.ts`.
5. Give the Server Action step its reason, not only its rule. The reason: `requireUser()` in
   the layout guards the *page*. A Server Action is a public endpoint anyone with a session
   cookie can call directly, so the action has to check ownership itself.

   Why write the reason into the skill? A bare rule gets skipped when a case looks different,
   for example an action that resembles a safe one. A rule that carries its reason lets Claude
   decide the new case correctly.
   ```
   In .claude/skills/clash-feature/SKILL.md, under the Server Action step, add
   this note: "Why this step is not optional: requireUser() in the layout only
   guards the page. A Server Action is a public endpoint anyone with a session
   cookie can call directly, so the action must check that the current user
   owns the row."
   ```
   Open the file and check the note sits under the Server Action step.
6. Use the skill to ship a feature.
   ```
   /clash-feature Add venue favourites: a user can favourite a venue from its
   detail page and see a list of their favourites on their profile.
   ```
7. Run the gates.
   ```bash
   npx tsc --noEmit && npm run lint && npm run build
   ```
8. Run `/context`. Compare with the number from task 06. Note how many files Claude read this time.
9. Package the skill as a plugin, so it can be shared outside this repo.
   ```bash
   mkdir -p clash-feature-plugin/.claude-plugin clash-feature-plugin/skills
   cp -r .claude/skills/clash-feature clash-feature-plugin/skills/clash-feature
   ```
   Write `clash-feature-plugin/.claude-plugin/plugin.json`:
   ```json
   { "name": "clash-feature-plugin", "description": "Add a feature to CLASH, end to end.", "version": "1.0.0" }
   ```
   Load it and try the skill under its new name.
   ```bash
   claude --plugin-dir ./clash-feature-plugin
   ```
   ```
   /clash-feature-plugin:clash-feature
   ```

## Now you

- Ship a second small feature with the skill only: clash comments. Say as little as you can. See how much the skill already knows.
- Add a **Checklist** section at the end of the skill. Every item must be something you can verify by looking.

## Check

- [ ] `/skill-doctor` ran and you can name the two near-duplicate vendored skills.
- [ ] `.claude/skills/clash-feature/SKILL.md` exists with `name`, `description` and `allowed-tools`.
- [ ] The Server Action step names an ownership check, not only `requireUser()`, and says why.
- [ ] Venue favourites work end to end.
- [ ] `npx tsc --noEmit`, `npm run lint` and `npm run build` pass.
- [ ] You can say why `.claude/commands/*.md` files still work.
- [ ] `claude --plugin-dir ./clash-feature-plugin` starts, and `/clash-feature-plugin:clash-feature` runs the same skill.

## Stuck?

`git checkout 07-start` — the reference CLASH with the task 06 `CLAUDE.md`. Eight of the nine vendored
skills in `.agents/skills/` are already copied into `.claude/skills/` (`agent-browser` stays
personal-only). Your own `.claude/skills/clash-feature/` is not — that is what this task builds.

## Go further

Compare your skill with `workshop-artifacts/07-clash-feature-skill/SKILL.md` in the workshop repository.
Then run `/skill-doctor` again and check that your description is specific enough to match.

## Links

- Skills — https://code.claude.com/docs/en/skills
- Commands — https://code.claude.com/docs/en/commands
- Tools reference — https://code.claude.com/docs/en/tools-reference
- agent-browser skill — https://www.skills.sh/vercel-labs/agent-browser/agent-browser
