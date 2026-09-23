<!-- @note: example-mapping -->
> Do:
> - Divider: skill row highlighted — this is still a skill, a new one
> - Keep the beat short

Say:
- "The next two tasks are both about shaping Claude's context, and when it loads."

<!-- @note: task-09-example-mapping-and-the-discover-skill -->
> Do:
> - Branch: 09-start is still on the seeded bug from 08-start — the discover skill isn't built yet either

Say:
- Three things to learn, two things to end up with

<!-- @note: story-rule-example-question -->
> Do:
> - Walk the four cards in order: story, rule, example, question
> - Use the capacity story as the running example for both slides here

Say:
- A story hides real decisions — ask what happens right at the cap
- Four kinds of statement turn it into something buildable

<!-- @note: progressive-disclosure-in-a-skill -->
> Do:
> - Point back at task 07's clash-feature skill — that one inlined everything
> - Docs link: open it, scroll to the Skills reference, then back to the slides

Say:
- The skill body stays short on purpose
- references/ and templates/ only enter context when the skill actually opens the file — same idea as a subagent's isolated window, one size smaller
- references/ holds the method it reads while it works. templates/ holds the format it writes the spec in

<!-- @note: anatomy-of-discover -->
> Do:
> - Live-build reference — the exact files are in tasks/09-example-mapping.md steps 2-4: the body, the reference, the template
> - Point at $ARGUMENTS, then at the reference file it's told to open, then at the template it saves with
> - Walk the numbered steps out loud: the order is the design — interview first, spec shown before it is saved

Say:
- argument-hint tells people what to type after /discover
- allowed-tools includes AskUserQuestion — the skill can ask, not just answer
- A skill, not a subagent: it runs in your own conversation, so the interview is a live back-and-forth with you

<!-- @note: the-discover-skill -->
> Do:
> - Recap: the spec is the real deliverable, not the skill file itself

Say:
- "Everything downstream — the rule, the boundary test — starts from this file"
