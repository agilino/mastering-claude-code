# Task 02 — Foundation

> Part: Build CLASH · Reset branch: `02-start`

## You will end up with

A running Next.js 16 app with Tailwind, shadcn/ui, a Prisma 7 database with the five
records from the spec, a seed with eight users, and your first commit made through Claude.

## Why

A good brief beats a good prompt. You learn to say what you want, what must hold, and
when it is done. Then you learn plan mode: Claude shows its plan before it touches a file.
The data model is the right place for that, because it is hard to change later.

## Do this

1. Start on the right branch and open Claude Code, in manual mode.
   ```bash
   git stash -u        # keeps the CLAUDE.md task 01's /init wrote (plain git stash skips new files)
   git checkout 02-start
   claude
   ```
   `02-start` brings its own `CLAUDE.md`, so this replaces the one you just made. To look at
   yours again later: `git stash show -p --include-untracked`.
   Manual mode shows every command before it runs. Press `Shift+Tab` until the status bar
   shows `manual mode` — this is a new session, so don't assume you're still in whatever
   mode task 01 left you in.
2. Give the scaffold brief. Read it once before you send it. Notice the three parts: goal, rules, done.
   ```
   Goal: set up the app skeleton for the product in @docs/SPEC.md.

   Rules:
   - Preserve the workshop files already in this repo: README.md, docs/SPEC.md, CLAUDE.md, .gitignore and .env.
     create-next-app refuses to scaffold over them, so move them aside first, scaffold the repo root, then restore
     them. Merge useful generated .gitignore entries instead of replacing the workshop entries.
   - Next.js 16 with the App Router, TypeScript, Tailwind CSS v4, ESLint, npm and no src/ directory. Run:
     npx create-next-app@latest . --typescript --tailwind --eslint --app --no-src-dir --import-alias "@/*" --use-npm --disable-git --yes
   - Then set up shadcn/ui with: npx shadcn@latest init
   - Add the button, card, input, label components.
   - Keep the .env from setup. If it is missing, create it with DATABASE_URL="file:./dev.db" and SESSION_SECRET="workshop-secret".
   - If Next.js adds a managed nextjs-agent-rules block to CLAUDE.md, keep it. Keep our project rules outside that managed block.
   - Do not build any feature yet.

   Done when: npm run dev starts and http://localhost:3000 shows a page with the text "CLASH".
   ```
   Claude asks permission before each command. Read the first two or three, then switch to
   auto mode (`Shift+Tab` until the status bar shows `auto mode`) and let the rest of the
   scaffold run without asking — initializing a Next.js app is a standard, low-risk task.
3. Watch what Claude does. You see `Bash`, `Write`, and `Edit` lines. Each is one tool call. When it stops, open the browser at `http://localhost:3000`.
4. Look at the changes before you trust them. First ask which files are new or changed.
   ```
   Show me git status.
   ```
   Then open the changes themselves.
   ```
   /diff
   ```
   Claude's own summary is not the same as the actual change. `git status` lists every new
   and changed file. `/diff` shows the edits inside them, including ones Claude just made —
   read it, don't just take the summary. The panel may say some files are "not shown".
   `git status` is the complete list.
5. Switch to plan mode. Press `Shift+Tab` until the status bar shows `plan mode on`. Now Claude can read but not write.
6. Ask for the data model plan.
   ```
   Read @docs/SPEC.md, section "Data". Plan a Prisma 7 schema:
   - SQLite using the better-sqlite3 adapter
   - Five models
   - Status and type fields are strings, not enums
   - Generate the client into lib/generated/prisma
   - Seed with 8 users (password "test", hashed with bcryptjs), 8 venues and 8 clashes in Berlin, some past, some upcoming
   - Use tsx to run prisma/seed.ts and configure Prisma's seed command for it

   Show the plan, do not write files.
   ```
7. Read the plan. Ask one question about anything you do not understand, for example:
   ```
   Why do you put the Prisma client in lib/generated/prisma and not use @prisma/client directly?
   ```
   Prisma 7.10+ creates `prisma7.config.ts`; earlier Prisma 7 projects may have `prisma.config.ts`.
   The Prisma 7 CLI accepts either. Follow the installed Prisma 7 version instead of forcing one filename.
8. Accept the plan. Press `Shift+Tab` until the prompt shows the normal mode, then:
   ```
   Do it. Then run npm run db:migrate and npm run db:seed and show me the output.
   ```
9. Check the database.
   ```bash
   npx prisma studio
   ```
   You should see 8 users. Close it with `Ctrl+C`.
10. Teach Claude what you learned. Open `CLAUDE.md` and ask:
    ```
    Add a section "Rules" to CLAUDE.md with these three lines:
    - The Prisma client is generated into lib/generated/prisma. Import it from there.
    - Status and type fields are plain strings. The allowed values live in lib/constants.ts.
    - In Next.js 16, params and searchParams are Promises. Always await them.
    ```
11. Make your first commit through Claude.
    ```
    Commit everything with a clear message. Do not commit .env or dev.db.
    ```

## Now you

- Ask Claude to add `npm run db:reset` and `npm run db:studio` scripts to `package.json`.
- Ask it to add a `lib/constants.ts` with the allowed status and type values from the spec.
- Commit again.

## Check

- [ ] `npm run dev` shows a page at `http://localhost:3000`
- [ ] `prisma/schema.prisma` has five models
- [ ] `npm run db:seed` created 8 users with password `test`
- [ ] `CLAUDE.md` has a "Rules" section
- [ ] `git log` shows your commit and `.env` is not in it

## Stuck?

`git checkout 02-start` — the state at the start of this task: the spec and the first `CLAUDE.md`. If you want
to skip ahead to the finished scaffold, the next task starts from `03-start`.

## Go further

Ask Claude to explain every line of `prisma/schema.prisma` to you, one model at a time. Stop it when you have heard enough.

## Links

- Plan mode — https://code.claude.com/docs/en/permission-modes
- Common workflows — https://code.claude.com/docs/en/common-workflows
- Keyboard shortcuts — https://code.claude.com/docs/en/interactive-mode
- create-next-app CLI — https://nextjs.org/docs/pages/api-reference/cli/create-next-app
- Prisma 7 with SQLite — https://www.prisma.io/docs/v7/prisma-orm/quickstart/sqlite
- Prisma 7 seeding — https://www.prisma.io/docs/orm/v7/prisma-migrate/workflows/seeding
- shadcn/ui — https://ui.shadcn.com/docs/installation/next
