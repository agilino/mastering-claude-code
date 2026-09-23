<!-- @note: path-scoped-rules -->
> Tun:
> - Divider: Rule-Zeile hervorgehoben — eine neue Zeile auf der Karte
> - Den Moment kurz halten

Sagen:
- "Eine Regel, die nur auftaucht, wenn sie wirklich relevant ist."

<!-- @note: task-10-path-scoped-rules -->
> Tun:
> - Branch: 10-start hat den discover-Skill aus Task 09 schon

Sagen:
- Zwei Dinge zu lernen, ein Ding, mit dem man rauskommt

<!-- @note: rules-scoped-to-a-path -->
> Tun:
> - Zurück auf ~/.claude/rules/tone.md aus Task 06 verweisen — die hatte kein paths:-Feld
> - Docs-Link: öffnen, zu den pfadspezifischen Regeln scrollen, dann zurück zu den Slides

Sagen:
- paths ist das einzige Feld, das Claude Code aus einer Rule-Datei liest — alles andere im Frontmatter wird stillschweigend ignoriert
- Kein paths:-Feld heißt, sie lädt jede Session, mit derselben Priorität wie CLAUDE.md selbst

<!-- @note: a-rule-that-only-loads-when-it-matters -->
> Tun:
> - Live-Bau-Referenz — der genaue Body steht in tasks/10-path-scoped-rules.md, Schritt 1
> - Demo: /context vor und nach dem Lesen einer Datei unter app/actions/ durch Claude ausführen

Sagen:
- Die Regel formuliert den Ownership-Check aus dem Audit von Task 08 — jetzt dauerhaft, kein Einzelfall mehr
- Nach einer Datei außerhalb von app/actions/ fragen — die Regel bleibt abwesend

<!-- @note: the-ownership-rule -->
> Tun:
> - Recap: diese Regel ist die dauerhafte Version dessen, was der Subagent aus Task 08 einmal gefunden hat

Sagen:
- "Derselbe Befund, jetzt jedes Mal sichtbar, nicht nur das eine Mal, als jemand daran gedacht hat zu auditieren — weiterhin Hinweis, keine Durchsetzung"
