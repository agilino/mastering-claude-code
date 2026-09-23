Check the background build first: is it still running, did it pass, or did it fail?
Then run `npx tsc --noEmit`.
Report in one line: build (running, passed, or failed with the first error) and typecheck (passed, or failed with the first error).
When nothing changed since your last report, answer with the single word: quiet.
Do not edit any file.
