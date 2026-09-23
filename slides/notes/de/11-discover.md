<!-- @note: example-mapping -->
> Tun:
> - Divider: Skill-Zeile hervorgehoben — das ist immer noch ein Skill, nur ein neuer
> - Den Moment kurz halten

Sagen:
- "Die nächsten zwei Tasks drehen sich beide darum, was in Claudes Kontext steht, und wann."

<!-- @note: task-09-example-mapping-and-the-discover-skill -->
> Tun:
> - Branch: 09-start hat den geseedeten Bug aus 08-start noch, der discover-Skill ist auch noch nicht gebaut

Sagen:
- Drei Dinge zu lernen, zwei Dinge, mit denen man rauskommt

<!-- @note: story-rule-example-question -->
> Tun:
> - Die vier Karten der Reihe nach durchgehen: Story, Rule, Example, Question
> - Die Capacity-Story als durchgehendes Beispiel für beide Slides hier verwenden

Sagen:
- Eine Story verbirgt echte Entscheidungen — fragen, was genau an der Kapazitätsgrenze passiert
- Vier Arten von Aussagen machen sie baubar

<!-- @note: progressive-disclosure-in-a-skill -->
> Tun:
> - Zurück auf den clash-feature-Skill aus Task 07 verweisen — der hat alles inline gehabt
> - Docs-Link: öffnen, zur Skills-Referenz scrollen, dann zurück zu den Slides

Sagen:
- Der Skill-Body bleibt absichtlich kurz
- references/ und templates/ kommen erst in den Kontext, wenn der Skill die Datei tatsächlich öffnet — dieselbe Idee wie der isolierte Kontext eines Subagenten, nur eine Nummer kleiner
- references/ enthält die Methode, die er beim Arbeiten liest. templates/ enthält das Format, in dem er die Spec schreibt

<!-- @note: anatomy-of-discover -->
> Tun:
> - Live-Bau-Referenz — die genauen Dateien stehen in tasks/09-example-mapping.md, Schritte 2-4: der Body, die Referenz, das Template
> - Auf $ARGUMENTS zeigen, dann auf die Referenzdatei, die geöffnet werden soll, dann auf das Template, mit dem gespeichert wird
> - Die nummerierten Schritte laut durchgehen: die Reihenfolge ist das Design — erst das Interview, die Spec wird gezeigt, bevor sie gespeichert wird

Sagen:
- argument-hint sagt, was nach /discover eingegeben wird
- allowed-tools enthält AskUserQuestion — der Skill kann fragen, nicht nur antworten
- Ein Skill, kein Subagent: er läuft in deinem eigenen Gespräch, das Interview ist also ein Hin und Her mit dir

<!-- @note: the-discover-skill -->
> Tun:
> - Recap: die Spec ist das eigentliche Ergebnis, nicht die Skill-Datei selbst

Sagen:
- "Alles, was danach kommt — die Regel, der Grenzfall-Test — fängt bei dieser Datei an"
