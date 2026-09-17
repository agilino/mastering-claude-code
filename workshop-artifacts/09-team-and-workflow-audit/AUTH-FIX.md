# The authorization fix — answer key

This is the fix that tasks 08 and 09 (subagent, agent team, dynamic workflow) converge on.
The check is missing on `08-start` and `09-start`, and back in place from `10-start`.

## `app/actions/clashes.ts` — `deleteClash`

```diff
   if (!clash) return { ok: false, error: "Clash not found." };
+  if (clash.creatorId !== user.id) {
+    return { ok: false, error: "You can only delete clashes you created." };
+  }

   await prisma.clash.delete({ where: { id } });
```

## `app/actions/venues.ts` — `deleteVenue`

```diff
   if (!venue) return { ok: false, error: "Venue not found." };
+  if (venue.creatorId !== user.id) {
+    return { ok: false, error: "You can only delete venues you created." };
+  }

   // Clashes referencing this venue keep their coordinates (venueId set null).
   await prisma.venue.delete({ where: { id } });
```

## Why exactly these two

Every other exported Server Action in CLASH already carries this guard
(`updateClash`, `updateVenue`, `joinClash`, `acceptRequest`, `rejectRequest`, …) or is safe by
construction (`markNotificationRead` scopes its `where` clause to
`userId: user.id`, `updateProfile`/`updateAvatar` write `where: { id: user.id }`).
`deleteClash` and `deleteVenue` are the two places the pattern was deliberately
dropped for this workshop, and only for this workshop. This is not a real CLASH bug.

## Proof-of-concept — call the action directly

With any two seeded logins (say Anna hosts a clash, Lukas doesn't):

1. Log in as Lukas, open devtools, find the encoded action id for
   `deleteClash` in the page source of any clash Lukas doesn't own.
2. `POST` to `/clashes/<anyId>` with that action id and Anna's clash id as
   the argument — no reference to the clash's `edit` page is required.
3. On `08-start`: the clash is deleted. On `10-start`: `You can only
   delete clashes you created.`

This is the "a Server Action is a public POST endpoint with a generated ID" argument
from task 08. `requireUser()` in `app/(app)/layout.tsx` never runs, because the request
never loads a page.

## A tell, if an agent looks closely

On `08-start`, `deleteVenue`'s `user` binding becomes unused once its only
consumer (the ownership check) is removed — `npm run lint` reports it as a
warning, not an error, so the quality gates still pass. A sharp auditor (or
a subagent told to look for exactly this) can notice the warning and work
backwards to the missing check without reading the diff first. Point it out if
nobody spots it.
