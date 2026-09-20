<!-- @note: install-and-log-in -->
> Tun:
> - Live in einem leeren Ordner demonstrieren
> - Einmal sagen

Sagen:
- Eine globale Installation, ein Befehl zum Starten
- Die Docs beginnen inzwischen mit einem nativen Installer (curl- oder PowerShell-Einzeiler); npm installiert dasselbe Programm und läuft auf jedem OS, deshalb nutzt der Workshop npm
- Erster Start öffnet einen Login im Browser
- Claude Code läuft in deinem Terminal, innerhalb des Ordners, in dem du es startest
- Dieser Ordner ist seine Welt — dort liest und bearbeitet es
- CLAUDE.md-Dateien in diesem Ordner werden automatisch erkannt

<!-- @note: the-prompt-is-a-chat-in-your-terminal -->
> Tun:
> - Einen echten Turn zeigen
> - Auf die Tool-Zeilen zeigen, während sie erscheinen — das ist die Loop aus dem letzten Abschnitt, live
> - Esc drücken, während es arbeitet — stoppt den Turn, das Gespräch bleibt erhalten
> - Ctrl+C zweimal beendet Claude Code komplett

Sagen:
- Read, dann Glob, dann eine Antwort

<!-- @note: point-at-files-with -->
Sagen:
- @ tippen und einen Pfad; Tab vervollständigt ihn
- Die Datei geht direkt in den Prompt
- Kontrast: "find the spec and read it" — das Modell greppt herum, liest ein paar falsche Dateien, und das landet alles auch im Context
- Zeigen ist günstiger und präziser
- Erste Context-Engineering-Gewohnheit — beginnt sofort

<!-- @note: slash-commands -->
> Tun:
> - Jetzt ausführen, auf der winzigen Session, die du gerade hattest, und die Zeilen laut vorlesen

Sagen:
- Ein Slash-Command ist eine Anweisung an Claude Code selbst
- /help listet sie auf
- /init liest das Projekt und schreibt eine Start-CLAUDE.md
- /clear leert die Session
- [click] /context zeichnet die Balken aus dem Harness-Abschnitt mit echten Zahlen
- [click] /cost zeigt, was diese Session gekostet hat
- [click] /rewind bringt Dateien und Gespräch zu einem früheren Punkt zurück — Claude Code setzt vor jeder Änderung einen Checkpoint

<!-- @note: the-permission-prompt -->
> Tun:
> - Live einen auslösen, indem du es bittest, ein Paket zu installieren
> - Vorher einmal Shift+Tab drücken, um in den Manual-Modus zu kommen
> - Die drei Optionen lesen
> - Benennen, nicht auswählen

Sagen:
- Im Auto-Modus erscheint kein Prompt
- Option zwei schreibt eine Regel in die Settings — erlaubt diese Art von Befehl ab jetzt
- Option drei lässt dich eine Korrektur eintippen
- Bash-Prompts können eine weitere Option zeigen, "Yes, and switch to auto mode"
- Shift+Tab durchläuft die Modi: Auto → Manual → Accept-Edits → Plan → zurück zu Auto. Pro-, Max- und Team-Sessions starten im Auto-Modus; API-Key- und Enterprise-Sessions im Manual-Modus — das kann auch die erste Session direkt nach der Installation
- Accept-Edits fragt bei Datei-Edits nicht mehr; Plan Mode ist read-only
- Plan Mode wird ab dem nächsten Teil viel genutzt

<!-- @note: claude-md-is-your-standing-instruction -->
> Tun:
> - Die Datei öffnen, die /init erzeugt hat
> - Kurz halten — jede Zeile steckt in jedem Prompt

Sagen:
- Ausgangspunkt, nicht das letzte Wort
- Faustregel: du sagst Claude dasselbe in einer neuen Session noch mal → es gehört in die CLAUDE.md
- Im Build-Teil: eine Regel hinzufügen, jedes Mal wenn die App dir eine beibringt

<!-- @note: in-your-editor -->
> Tun:
> - Nur erwähnen, nicht ausführlich vorführen

Sagen:
- [click] Die IDE-Erweiterungen laufen mit demselben Claude Code
- Edits erscheinen als Inline-Diffs; aktuelle Datei und Auswahl gehen als Context mit
- Jeder kann seine eigene Oberfläche wählen
- Workshop nutzt das Terminal — überall gleich

<!-- @note: keys-worth-knowing -->
> Tun:
> - Demo: Esc während eines Turns, Shift+Tab für den Modus, Tab nach @ zum Vervollständigen eines Pfads

Sagen:
- "?" bei leerer Prompt-Zeile zeigt den Rest der Shortcuts
- Kein Tastenkürzel schreibt in die CLAUDE.md — Claude bitten, eine Zeile einzutragen, oder die Datei selbst bearbeiten

<!-- @note: your-first-conversation -->
> Tun:
> - VOLLSTÄNDIGER PROMPT (Trainer):

Read @docs/SPEC.md. In one sentence, what does this app do?

Which five kinds of records does the app need? Say how they connect to each other.

Which screen looks hardest to build, and why?

- Dann /init ausführen und die CLAUDE.md öffnen, die es schreibt
- Zeigen, dass sie kurz ist und auf die Spec verweist
- Dann /context: auf die CLAUDE.md-Zeile und die Spec-Zeile zeigen — erstes Mal, dass die Gruppe die Balken mit echten Zahlen sieht

<!-- @note: setup-and-first-conversation -->
> Tun:
> - Alle installieren, klonen pawsaw/clash und checken 01-start aus — ein Repo mit nur der Spec drin
> - Dann das erste Gespräch und /init
> - Durch die Gruppe gehen, während gearbeitet wird
> - Übliche Blocker: Node-Version (CLASH braucht 20+), Login. Eine EBADENGINE-Warnung, während npm Claude Code installiert, ist harmlos — es läuft trotzdem
> - Niemand geht weiter, bevor Claude Code im eigenen Klon läuft und CLAUDE.md existiert

Sagen:
- Task 01
