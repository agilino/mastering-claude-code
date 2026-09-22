<!-- @note: why-it-reads-everything-at-once -->
Say:
- Not needed to use Claude Code well — useful for understanding why it behaves the way it does
- [click] "Attention" is the mechanism, but it only looks backward: each token gets a say in how every later token is understood, never the reverse — that is what keeps generation left to right
- This is why the whole prompt costs tokens every turn, not just the new part

<!-- @note: four-sizes-four-jobs -->
> Do:
> - If there is a tokenizer or /model picker handy, show it live
> - Everyone in this workshop already has access to all four — this is about choosing, not about who gets what

Say:
- Same architecture, different scale — bigger is not always better, it is slower and costs more
- [click] Sonnet is the default for a reason: fast enough, capable enough, for most of a working day
- [click] Reach for Opus when the reasoning is the hard part, not the typing
- [click] Fable is built for sessions you would normally break into pieces — hand it the outcome, not the steps
