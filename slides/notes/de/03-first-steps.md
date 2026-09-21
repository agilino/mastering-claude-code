<!-- @note: install-and-log-in -->
> Tun:
> - tasks/01-setup-first-conversation.md Schritt 2, dann zurück zu den Folien
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
> - Einen echten Turn in Claude im Clash Repo zeigen
> - Auf die Tool-Zeilen zeigen, während sie erscheinen — das ist die Loop aus dem letzten Abschnitt, live
> - Die Tool-Wahl variiert von Durchlauf zu Durchlauf — dieselbe Wahrscheinlichkeiten-Lektion wie zwei Folien vorher. Wählt es Bash, ist der Permission-Prompt live das Gate aus diesem Abschnitt
> - Esc drücken, während es arbeitet — stoppt den Turn, das Gespräch bleibt erhalten
> - Esc zweimal bei leerem Prompt öffnet stattdessen das Rewind-Menü — nach dem Stoppen eines Turns nicht doppelt drücken
> - Ctrl+C zweimal an einem leeren Prompt beendet es — während etwas läuft, unterbricht der erste Druck stattdessen, wie Esc

Sagen:
- Was auch immer an Tools erscheint — Read, Glob, Grep, Bash — ist die Loop aus dem letzten Abschnitt, live

<!-- @note: point-at-files-with -->
> Tun:
> - Nimmt tasks/01-setup-first-conversation.md Schritt 6 vorweg

Sagen:
- @ tippen und einen Pfad; Tab vervollständigt ihn
- Die Datei geht direkt in den Prompt
- Kontrast: "find the spec and read it" — das Modell greppt herum, liest ein paar falsche Dateien, und das landet alles auch im Context
- Zeigen ist günstiger und präziser
- Erste Context-Engineering-Gewohnheit — beginnt sofort

<!-- @note: slash-commands -->
> Tun:
> - tasks/01-setup-first-conversation.md Schritte 9-10 führen /init, /clear und /help jetzt aus — die Zeilen laut vorlesen
> - /context, /usage und /rewind werden hier nur genannt — /context wird später in dieser Aufgabe gezeigt, /usage unter „Now you", /rewind in Task 03

Sagen:
- Ein Slash-Command ist eine Anweisung an Claude Code selbst
- /help listet sie auf
- /init liest das Projekt und schreibt eine Start-CLAUDE.md
- /clear leert die Session
- [click] /context zeichnet die Balken aus dem Harness-Abschnitt mit echten Zahlen
- [click] /usage zeigt, was diese Session gekostet hat
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
- Kein Tastenkürzel schreibt direkt in die CLAUDE.md — das alte #-Kürzel dafür gibt es nicht mehr. Claude in Worten bitten, oder die Datei selbst bearbeiten

<!-- @note: your-first-conversation -->
> Tun:
> - VOLLSTÄNDIGER PROMPT (Trainer), drei getrennte Messages:
>   - Read @docs/SPEC.md. In one sentence, what does this app do?
>   - Which five kinds of records does the app need? Say how they connect to each other.
>   - Which screen looks hardest to build, and why?
> - Dann /init ausführen und die CLAUDE.md öffnen, die es schreibt
> - Zeigen, dass sie kurz ist und auf die Spec verweist
> - Dann /context: auf die CLAUDE.md-Zeile und die Spec-Zeile zeigen — erstes Mal, dass die Gruppe die Balken mit echten Zahlen sieht

Sagen:
- CLAUDE.md und die Spec-Zeile stecken schon in jedem Prompt — das Budget aus Teil I, jetzt mit echten Zahlen

<!-- @note: setup-and-first-conversation -->
> Tun:
> - Alle installieren, klonen pawsaw/clash und checken 01-start aus — ein Repo mit nur der Spec drin
> - Dann das erste Gespräch und /init
> - Den Chat beobachten, während gearbeitet wird
> - Auf Leute achten, die nie Enter beim Permission-Prompt drücken, oder die im Terminal tippen, während Claude arbeitet
> - Übliche Blocker: Node-Version (CLASH braucht 20+), Login. Eine EBADENGINE-Warnung, während npm Claude Code installiert, ist harmlos — es läuft trotzdem
> - Niemand geht weiter, bevor Claude Code im eigenen Klon läuft und CLAUDE.md existiert

Sagen:
- Installieren, klonen, erste Fragen zur Spec, dann /init
- Fertig, wenn: Claude Code in deinem Klon läuft, es deine Fragen beantwortet hat und CLAUDE.md existiert
