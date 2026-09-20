<!-- @note: skills -->
> Tun:
> - Divider, Skill-Zeile hervorgehoben

Sagen:
- "Auch hier startest du nicht bei null. CLASH bringt neun mitgelieferte Skills mit. Wir fügen einen eigenen hinzu."

<!-- @note: loaded-only-when-needed -->
> Tun:
> - Verweis zurück auf /skill-doctor

Sagen:
- Macht Skills im großen Maßstab günstig
- [click] Die Beschreibung eines Skills liegt in jedem Turn im Context, benutzt oder nicht — es sei denn, disable-model-invocation ist gesetzt
- [click] Ein geladener Body bleibt normalerweise für die Session — nach einer Compaction können ältere Skill-Bodies wegfallen
- [click] Genau das misst es — wie viele Beschreibungen du bezahlst gegenüber wie viele Bodies überhaupt geladen werden

<!-- @note: commands-became-skills-nothing-broke -->
> Tun:
> - Ein verbreitetes Missverständnis korrigieren

Sagen:
- Dass Commands in Skills aufgehen, macht .claude/commands/*.md-Dateien nicht kaputt
- Sie erzeugen weiterhin denselben /command
- Für neue Arbeit Skills bevorzugen: ein Skill ist ein Ordner, kann also Zusatzdateien mitbringen. Command-Dateien nehmen dasselbe Frontmatter — allowed-tools, context: fork — außer name und paths

<!-- @note: write-the-clash-feature-skill -->
> Tun:
> - Vollständige Lösung (nur für Trainer): workshop-artifacts/07-clash-feature-skill/SKILL.md
> - Auf dem Bildschirm Schritt für Schritt aufbauen, nicht komplett einfügen
> - Beim Server-Action-Schritt anhalten und erklären
> - Wichtigster Satz im ganzen Skill — er kommt in Task 08 wieder

Sagen:
- Er besteht auf einem eigenen Ownership-Check, obwohl requireUser() im Layout läuft
- Warum: eine Server Action ist ein öffentlicher POST-Endpoint mit einer generierten id — der Layout-Guard sieht einen direkten Aufruf nie

<!-- @note: a-skill-is-advice -->
> Tun:
> - Nur vorausdeuten

Sagen:
- [click] "Ein Skill ist das, was du einem neuen Kollegen erzählen würdest. Es ist ein Ratschlag, kein Gesetz."

<!-- @note: ship-something-small-end-to-end -->
> Tun:
> - Den Skill wirklich aufrufen
> - Laufen lassen
> - Wenn es fertig ist, /context ausführen und die zwei Zahlen nebeneinanderstellen

Sagen:
- "/clash-feature Add venue favourites: a user can favourite a venue from its detail page and see a list of their favourites on their profile."
- Das Feature hat vielleicht sechs Dateien angefasst
- Der Kontrast ist der ganze Pitch für Skills, sichtbar gemacht

<!-- @note: the-clash-feature-skill -->
> Tun:
> - Task-Folie

Sagen:
- Reset-Branch 07-start hat schon die CLAUDE.md aus Task 06 — niemand fängt bei null an
