<!-- @note: claude-md-files-add-up-they-don-t-compete -->
> Tun:
> - Docs-Link: öffnen, bis "How CLAUDE.md files load" scrollen, dann zurück zu den Folien

Sagen:
- [click] ~/.claude/CLAUDE.md — deine persönlichen Instruktionen, jedes Projekt
- [click] CLAUDE.md im Repo-Root — wird zuerst gelesen, am nächsten zum Start
- [click] CLAUDE.local.md — gitignored, direkt nach CLAUDE.md auf derselben Ebene angehängt
- [click] Das CLAUDE.md eines Unterordners lädt, wenn Claude dort eine Datei liest — zuletzt gelesen, am nächsten an der Arbeit
- [click] .claude/rules/*.md lädt genauso, on demand
- [click] Alles landet in einem Context — nichts wird verworfen, nichts wird ausgewählt
- [click] Zwei Dateien widersprechen sich? Claude wählt eine. Das ist ein Bug, den du gebaut hast, kein Feature

<!-- @note: rules-can-load-only-for-matching-files -->
Sagen:
- Eine Regel ohne paths:-Feld lädt in jeder Session, wie ein zusätzliches CLAUDE.md
- [click] ~/.claude/rules/ — deine eigenen, jedes Projekt, für Dinge, die nicht Sache dieses Repos sind
- Einen gemeinsamen Rules-Ordner in mehrere Repos symlinken, um eine Kopie synchron zu halten
