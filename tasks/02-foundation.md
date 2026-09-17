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

1. Start on the right branch and open Claude Code.
   ```bash
   git checkout 02-start
   claude
   ```
2. Give the scaffold brief. Read it once before you send it. Notice the three parts: goal, rules, done.
   ```
   Goal: set up the app skeleton for the product in @docs/SPEC.md.

   Rules:
   - Next.js 16 with the App Router, TypeScript, Tailwind CSS v4, ESLint. Run:
     npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir=false --import-alias "@/*"
   - Then set up shadcn/ui with: npx shadcn@latest init
   - Add the button, card, input, label components.
   - Create .env with DATABASE_URL="file:./dev.db" and SESSION_SECRET="workshop-secret". Make sure .env is in .gitignore.
   - Do not build any feature yet.

   Done when: npm run dev starts and http://localhost:3000 shows a page with the text "CLASH".
   ```
   Claude will ask permission before it runs commands. Read each one, then press Enter to allow.
3. Watch what Claude does. You see `Bash`, `Write`, and `Edit` lines. Each is one tool call. When it stops, open the browser at `http://localhost:3000`.
4. Look at the changes before you trust them.
   ```
   Show me git status and a short summary of every file you created or changed.
   ```
5. Switch to plan mode. Press `Shift+Tab` twice. The prompt line shows `plan`. Now Claude can read but not write.
6. Ask for the data model plan.
   ```
   Read @docs/SPEC.md, section "Data". Plan a Prisma 7 schema for SQLite using the
   better-sqlite3 adapter. Five models. Status and type fields are strings, not enums.
   Generate the client into lib/generated/prisma. Also plan a seed with 8 users
   (password "test", hashed with bcryptjs), 8 venues and 8 clashes in Berlin,
   some past, some upcoming. Show the plan, do not write files.
   ```
7. Read the plan. Ask one question about anything you do not understand, for example:
   ```
   Why do you put the Prisma client in lib/generated/prisma and not use @prisma/client directly?
   ```
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
- Prisma 7 with SQLite — https://www.prisma.io/docs/orm/overview/databases/sqlite
- shadcn/ui — https://ui.shadcn.com/docs/installation/next
