<!-- @note: text-becomes-tokens -->
- Ein Modell sieht nie Buchstaben oder Wörter — Text wird zuerst in Tokens zerlegt
- [click] Durchklicken: "Add" ist ein Token, "to" ist eins; "notifications" und "CLASH" sind selten genug, um in je zwei Teile zu zerfallen
- [click:6] Vier Wörter, sechs Tokens
- Faustregel: ein Token ist im Englischen etwa drei Viertel eines Wortes — neuere Claude-Modelle zerlegen denselben Text in mehr Tokens
- Warum wichtig: Alles wird in Tokens gezählt und bezahlt — die Größe dessen, was du schickst, die Größe dessen, was zurückkommt, das Limit dessen, was reinpasst

<!-- @note: one-token-at-a-time -->
- Das ist die ganze Maschine: links, was reingeht; rechts, Kandidaten für das nächste Token, jeder mit einer Wahrscheinlichkeit
- [click] es wählt "Sure", dieses Token wird Teil des Inputs
- [click] neue Kandidaten für das Token danach, die Wahl wird Teil des Inputs
- Nirgendwo ist ein Plan aufgeschrieben — die Antwort entsteht Stück für Stück, jedes Stück hängt von allem davor ab
- Deshalb wird aus einem schlechten ersten Satz leicht ein schlechter Absatz
- Auf den blinkenden Cursor hinweisen: er pausiert nie. Thinking (in Claude Code standardmäßig an) ist derselbe Trick: das Modell schreibt seine Überlegungen zuerst als Tokens aus

<!-- @note: it-picks-from-probabilities -->
- [click] Gleicher Prompt, gleiche Kandidaten, zwei Einstellungen — das nennt man Temperature
- [click] Niedrige Temperature: die Top-Wahl gewinnt fast immer, also ergeben drei Durchläufe denselben Dateinamen
- [click] Hohe Temperature: die Wahrscheinlichkeiten sind breit verteilt, also ergeben drei Durchläufe drei verschiedene Namen
- Folge 1: dasselbe zweimal fragen, zwei verschiedene Antworten bekommen — kein Bug
- Folge 2: ist ein unwahrscheinlicheres Token einmal gewählt, folgt ihm der Rest der Antwort
- Outputs verifizieren, nicht als stabil annehmen

<!-- @note: where-the-knowledge-comes-from -->
- Zwei sehr unterschiedliche Phasen: Training und Nutzung
- Training passierte einmal, auf einem riesigen Textberg, und endete an einem Stichtag — alles, was das Modell von sich aus "weiß", ist von damals
- [click] Wenn du es benutzt: nichts wird gelernt, nichts wird von selbst nachgeschlagen
- Beispiel: es kennt eine alte Version von Next.js aus dem Training
- Es kennt nicht dein Repo, die Konventionen deines Teams oder aktuelle Nachrichten — außer dieser Text landet im Prompt
- Das ist der Job des Harness, nächster Abschnitt

<!-- @note: it-has-no-memory -->
- Das Modell selbst behält zwischen Aufrufen nichts
- Was sich wie Gedächtnis anfühlt, ist das Programm drumherum, das das ganze Gespräch erneut schickt
- Turn eins schickt die System-Message, deine Anfrage und die gelesenen Dateien
- [click] Turn zwei schickt all das plus die neue Message
- [click] Turn drei umfasst beides
- Folge 1: die Kosten wachsen mit der Länge des Gesprächs
- Folge 2: alles Alte konkurriert mit allem Neuen um Aufmerksamkeit
- Deshalb ist "für einen neuen Job eine frische Session starten" ein Rat, den du im ganzen Workshop hören wirst

<!-- @note: the-context-window-is-a-budget -->
- Jedes Modell hat eine maximale Anzahl Tokens pro Aufruf: das Context Window — stell dir einen Tank vor
- [click] Der untere Teil ist fix: System-Prompt und CLAUDE.md, bei jedem Aufruf gleich
- [click] Durchklicken: gelesene Dateien, Tool-Output und Chat stapeln sich obendrauf, während du arbeitest
- Ein großes Fenster ist nicht gratis: je mehr drin ist, desto mehr muss das Modell abwägen, Details in der Mitte bekommen weniger Aufmerksamkeit
- [click:5] Nahe am oberen Rand: die Drift-Zone — der Agent vergisst eine früh gegebene Regel oder liest eine Datei erneut, die er schon gesehen hat. Claude Code komprimiert automatisch, bevor das Fenster voll ist; auch dabei können frühe Anweisungen verloren gehen
- Später nutzt du /context, um diesen Tank live zu beobachten
- Was hineinkommt, ist deine Entscheidung, und das zählt mehr als die Formulierung des Prompts

<!-- @note: three-roles-same-tokens -->
- Ein Chat ist nur Tokens mit Labels
- Die System-Message kommt zuerst und setzt die Regeln — in Claude Code wird sie vom Tool geschrieben; deine CLAUDE.md wird danach geladen, als User-Message
- [click] Dann wechseln sich User- und Assistant-Messages ab
- Das Modell wurde trainiert, der System-Message stark zu folgen, danach der User-Message, danach seinen eigenen früheren Worten
- Warum eine Regel in CLAUDE.md eine Regel schlägt, die in einem langen Chat vergraben ist — sie wird jede Session frisch geladen und übersteht /compact

<!-- @note: what-it-is-bad-at -->
- Konkret werden bei den Grenzen
- Buchstaben zählen scheitert, weil es nie Buchstaben sieht
- Rechnen mit langen Zahlen scheitert aus demselben Grund
- [click] Es kann Code nicht im Kopf ausführen, also ist "terminiert diese Schleife" eine Vermutung
- [click] Es weiß nicht, was sich in einer Library seit dem Training geändert hat
- [click] Es zu bitten, sich selbst gegenzuchecken, erzeugt meist selbstsichere Zustimmung
- Für jeden dieser Punkte gibt es dieselbe Lösung: ihm ein Tool geben — ein Taschenrechner, ein Test-Runner, die Docs, ein Browser
- Genau das ist Claude Code: ein Modell mit Tools

<!-- @note: fluent-is-not-the-same-as-true -->
- Das Wort, das die Leute benutzen: Halluzination — ein besseres Wort: flüssige Sprache ohne Grounding
- Das Modell erzeugt Text, der ins Muster passt, egal ob er stimmt
- Das Heilmittel ist kein besseres Modell — sondern, ihm die Wahrheit vorzulegen
- Links: eine Frage, aus dem Gedächtnis beantwortet
- [click] Rechts: dieselbe Frage, nachdem die Datei im Fenster liegt
- Das Muster im ganzen Workshop: Dateien, Test-Output, Browser-Screenshots ins Fenster — dann ist die Antwort überprüfbar

<!-- @note: a-model-can-ask-for-a-tool -->
- Brücke zum nächsten Abschnitt: das Modell hat zwei Arten zu antworten
- [click] Output A, eine reine Antwort, eine Vermutung aus dem Training
- [click] Output B, eine strukturierte Anfrage — das Tool "ls" auf "lib/" ausführen
- Moderne Modelle sind trainiert, solche Anfragen zu schreiben
- [click] dann stoppt es — es kann nichts ausführen
- [click] jemand muss den Call ausführen, den Output einsammeln und als nächste Message zurückschicken — dieser Jemand ist der Harness
- Ohne ihn ist ein Modell eine sehr gute Autovervollständigung
- Mit ihm wird das Modell zu einem Agenten, der Code liest, bearbeitet und ausführt
