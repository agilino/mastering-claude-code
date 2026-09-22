<!-- @note: why-it-reads-everything-at-once -->
Sagen:
- Nicht nötig, um Claude Code gut zu benutzen — nützlich, um zu verstehen, warum es sich so verhält
- [click] "Attention" ist der Mechanismus, schaut aber nur zurück: jedes Token spielt eine Rolle dabei, wie jedes spätere Token verstanden wird, nie umgekehrt — genau das sorgt dafür, dass die Ausgabe von links nach rechts entsteht
- Deshalb kostet der gesamte Prompt bei jedem Turn Tokens, nicht nur der neue Teil

<!-- @note: four-sizes-four-jobs -->
> Tun:
> - Falls ein Tokenizer oder /model-Picker zur Hand ist, live zeigen
> - Alle in diesem Workshop haben schon Zugriff auf alle vier — es geht ums Auswählen, nicht darum, wer was bekommt

Sagen:
- Gleiche Architektur, andere Größe — größer ist nicht immer besser, sondern langsamer und teurer
- [click] Sonnet ist aus gutem Grund der Standard: schnell genug, fähig genug, für die meiste Arbeit
- [click] Opus greifen, wenn das Denken der schwere Teil ist, nicht das Tippen
- [click] Fable ist für Sessions gebaut, die du sonst in Stücke teilen würdest — das Ergebnis übergeben, nicht die Schritte
