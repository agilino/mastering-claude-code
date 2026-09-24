# Task 17 — Capstone

> Part: Orchestrate and let go · Reset branch: `17-start`
> Slides: https://mastering-claude-code.vercel.app/task-17

## Theory

- [Security: three rules](https://mastering-claude-code.vercel.app/theory-security-rules)
- [Context is king. You push it, you own it.](https://mastering-claude-code.vercel.app/theory-context-is-king)

> **Reminder:** Capstone reuses everything: least privilege, isolated work, review, browser verification and context discipline.

## You will end up with

One real feature on the reference CLASH, shipped as a pull request, built with every tool
from the workshop: a worktree, the skill, a subagent review, hooks, a browser check.

## Why

You have used each tool once, on its own. Now you use them together on one job, with
nobody telling you which prompt to type. This is what your normal day looks like from here.

## Do this

1. Pick one brief from `workshop-artifacts/17-capstone/README.md` in the workshop repository.
   - **A** Clash comments.
   - **B** Venue favourites, done properly.
   - **C** Weekly digest.
2. Start in a worktree.
   ```bash
   claude --worktree capstone
   ```
3. Plan first. Switch to plan mode and paste the brief. Read the plan. Change one thing.
4. Build with the skill.
   ```
   /clash-feature <paste the brief here>
   ```
5. Let the hooks work. When the typecheck hook or the Stop gate fires, let Claude fix it.
6. Review.
   ```
   Use the security-auditor subagent on app/actions/ and show me its report.
   ```
7. Click through the feature in a real browser with an agent. Fix what it finds.
8. Open a pull request.
   ```
   Create a branch, commit the work in small commits, and open a pull request
   with gh. Write a description a reviewer can read quickly: what changed,
   how it was tested, what is not done.
   ```
9. Run `/context`. Say where the budget went.

## Now you

- Ship the optional part of your brief.
- Set up `/loop` or a scheduled routine that checks the pull request for new comments and answers them.

## Check

Use the checklist at the end of `workshop-artifacts/17-capstone/README.md`. Every box.

## Stuck?

`git checkout 17-start` — the reference CLASH with `CLAUDE.md`, the skill, the fix and the hook set.

## Go further

Pick a second brief. This time write your own skill for the part you repeated.

## Links

- Common workflows — https://code.claude.com/docs/en/common-workflows
- Best practices — https://code.claude.com/docs/en/best-practices
- Security — https://code.claude.com/docs/en/security
- BMAD Method — https://github.com/bmad-code-org/bmad-method
- BMAD: Build a Change — https://docs.bmad-method.org/build/build-a-change/#run-bmad-build
