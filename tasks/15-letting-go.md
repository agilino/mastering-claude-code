# Task 15 — Letting go

> Part: Orchestrate and let go · Reset branch: `15-start`
> Slides: https://mastering-claude-code.vercel.app/task-15

## Theory

- [One repo, N isolated agents](https://mastering-claude-code.vercel.app/theory-worktrees)
- [Headless in CI](https://mastering-claude-code.vercel.app/theory-headless-ci)

> **Reminder:** Worktrees isolate concurrent agents; headless runs move the same agent loop into CI.

## You will end up with

Two agents working on CLASH at the same time in separate worktrees, and a GitHub Action
that runs the security audit on every pull request without anyone watching.

## Why

So far every agent shared one working tree. Worktrees give each agent its own copy on its
own branch, so two agents cannot break each other's half-done work. This is the thing you
will use most.

Headless means nobody watches turn by turn. The same agent, started by an event instead of a
keystroke. Every control from this workshop carries over: a scoped prompt, limited tools, hooks.

## Do this

**Worktrees**

1. Start a session in its own worktree.
   ```bash
   claude --worktree avatar-followup
   ```
   This creates `.claude/worktrees/avatar-followup/` on a new branch `worktree-avatar-followup`
   and starts Claude Code inside it. `-w` is the short flag.
2. In a second terminal, start another one.
   ```bash
   claude --worktree digest-sketch
   ```
3. Give each a small job.
   ```
   (first) Sketch what moving avatars to external storage would change in
   lib/auth.ts, app/actions/profile.ts and the profile page. Write the sketch
   to docs/plans/avatar-storage.md. Do not change app code.
   ```
   ```
   (second) Add a docs/plans/digest.md that describes a weekly digest page
   for the current user. Do not change app code.
   ```
4. Check that neither session sees the other's uncommitted files. Different branch, different folder.
5. Two related things to know: `isolation: worktree` in a subagent's header runs that subagent in its
   own worktree. The `EnterWorktree` and `ExitWorktree` tools let an agent do this itself mid-session.

**Headless in CI**

6. CLASH has no `.github/workflows/` folder. Nothing runs on a pull request yet.
7. Ask for the workflow. Do not put `claude -p` in the YAML. Use the maintained action.
   ```
   Write a GitHub Actions workflow at .github/workflows/security-audit.yml that
   runs on every pull_request. Use anthropics/claude-code-action@v1 (not @beta).
   Pass a prompt asking Claude to audit every exported Server Action in
   app/actions/ changed by the PR for missing ownership checks on mutations of
   existing rows, and to comment the findings on the PR. Authenticate with a
   claude_code_oauth_token repository secret. Grant the permissions the action
   needs, including id-token: write.
   ```
8. Read the file. The `prompt` input is the same brief as task 08. `claude_args` carries model
   and turn limits. The secret is named, never pasted. v1 dropped the `mode` input. `@beta` is the old version.
9. Create the token for the secret: `claude setup-token`. Add it to the repository as
   `CLAUDE_CODE_OAUTH_TOKEN`. You do not need it to check that the YAML is valid.
10. Install the GitHub App properly, instead of only holding a token.
    ```
    /install-github-app
    ```
    It installs the app and can set up the secret for you. When it asks about workflow
    files, choose **Skip for now** — you already wrote `security-audit.yml` by hand.
11. Push the workflow for real and open a pull request against it.
    ```
    Commit the workflow file on a new branch, push it, and open a pull request with gh.
    ```
    Watch the Actions tab. When the run finishes, the audit's findings land as a comment
    on the pull request — nobody typed a prompt to make that happen.

## Now you

- Run `claude --worktree "#<pr-number>"` against an open pull request and see where the worktree starts.
- Extend the workflow: run the saved dynamic workflow from task 12 instead of a single prompt.

## Check

- [ ] `claude --worktree <name>` created a folder under `.claude/worktrees/` and a branch `worktree-<name>`.
- [ ] Two sessions worked at the same time without touching each other's files.
- [ ] `.github/workflows/security-audit.yml` exists and runs on `pull_request`.
- [ ] It uses `anthropics/claude-code-action@v1`, not `@beta`, and no raw `claude -p` step.
- [ ] The secret is referenced by name. `id-token: write` is in `permissions`.
- [ ] The GitHub App is installed on the repository.
- [ ] A real run finished on the pull request, and its findings are a comment on it.

## Stuck?

`git checkout 15-start` — the reference CLASH with fix, skill, `CLAUDE.md` and hooks.

## Go further

Look at `/background`: it detaches this session and keeps it running while you do something
else. Try it on CLASH, then find it again with `claude agents`.

## Links

- Worktrees — https://code.claude.com/docs/en/worktrees
- Headless mode — https://code.claude.com/docs/en/headless
- GitHub Actions — https://code.claude.com/docs/en/github-actions
