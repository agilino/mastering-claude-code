# Reasoning lab

Use `review.ts` with exactly the same review prompt at two effort levels.

The deliberate findings are trainer ground truth:

1. a cancelled clash returns `true`;
2. `null` capacity means unlimited but becomes `0`;
3. the capacity check uses `>` instead of `>=`;
4. `sort()` mutates the input array.

Score correct findings, false positives, usage and extra correction turns. The exercise is not designed to make high effort win every run. A tie is evidence that the small task did not justify the extra spend.
