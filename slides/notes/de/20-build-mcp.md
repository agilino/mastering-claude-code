<!-- @note: build-your-own-mcp -->
Sagen:
- Task 14: Wir haben nur fremde Server benutzt — Playwright, Chrome DevTools, einen Remote-Server
- Jetzt ist CLASH das System, das ein anderer Agent erreicht. Den Server entwerfen wir selbst
- Drei Tools, eine Datei, und am Ende ruft clash-conference denselben Server auf

<!-- @note: task-19-build-your-own-mcp -->
> Tun:
> - Branch: das 19-start von CLASH in deinem CLASH-Clone — 14-start plus der Starter mcp/server.ts (ein fertiges Tool, zwei markierte Stellen), mcp/smoke.ts und die zwei MCP-Pakete
> - Kein Install-Schritt für die Pakete: das 19-start von CLASH pinnt @modelcontextprotocol/server und @modelcontextprotocol/client schon auf 2.1.0. Das Setup lädt beide trotzdem vor (docs/SETUP.md), also braucht `npm install` in Schritt 1 kein Netz; zod ist schon eine CLASH-Dependency
> - Falle: das Paket ist @modelcontextprotocol/server, nie das ältere @modelcontextprotocol/sdk
> - clash-conference ist ein zweiter Clone neben deinem CLASH-Clone, mit eigenem 19-start — jetzt sagen, dass er am Ende kommt

Sagen:
- Vier Dinge: von einem laufenden Server aus starten, zwei Tools entwerfen, selektiv vertrauen, aus clash-conference aufrufen
- Das Schreib-Tool ist das interessante: der Server lehnt schlechte Eingaben ab, das Modell improvisiert nicht

<!-- @note: a-server-is-three-registered-tools -->
> Tun:
> - Docs-Link: der TypeScript-Tab, die Imports, ein registerTool-Aufruf
> - Beim Diagramm bleiben; als Nächstes kommen die fünf Design-Entscheidungen, dann der Code

Sagen:
- [click] Claude Code ist der Client: startet den Server, JSON-RPC über stdin und stdout
- Ein console.log schreibt in diesen Kanal und macht ihn kaputt. Logs gehen an console.error
- [click] Drei registerTool-Aufrufe: Name, Beschreibung, zod-Schema, Handler. Die Beschreibung sagt Claude, wann
- [click] Hinter den Tools: Prisma und die dev.db von CLASH, aufgelöst aus import.meta.url, nie aus process.cwd()
- In Claude Code heißt ein Tool mcp__clash__find_venue: Server-Name, doppelter Unterstrich, Tool-Name

<!-- @note: five-decisions-behind-a-good-tool-server -->
> Tun:
> - Statische Folie, keine Klicks: die fünf Titel vorlesen, dann auf das Beispiel jeder Karte zeigen
> - Jede Karte steckt als Zeile in den Prompts von Schritt 2 und 3 in tasks/19-build-your-own-mcp.md

Sagen:
- Das 19-start von CLASH bringt die Verkabelung mit: stdio, dev.db, log(), reply(), refuse(). Was du hinzufügst, ist Design
- venueId mit der Beschreibung "id from find_venue": Claude ruft zuerst find_venue auf und rät nie eine id
- Eine Ablehnung ist Text mit isError, den später ein Mensch in clash-conference liest. "No venue matches" ist eine normale Antwort: nichts ist schiefgegangen
- Vier Prüfungen, dann der eine Schreibvorgang. Kein Lösch-Tool. Lesen läuft frei; in Claude Code fragt create_clash jedes Mal

<!-- @note: mcp-server-ts -->
> Tun:
> - VOLLSTÄNDIGE LÖSUNG (nur für Trainer): workshop-artifacts/19-build-mcp/server.ts, das fertige mcp/server.ts auf dem 19-solution von CLASH. Was an die zwei ⟵ LIVE-Stellen kommt:
>   Bei "Step 2 of task 19", find_venue: inputSchema: z.object({ query: z.string().min(1) }); prisma.venue.findMany({ where: { title: { contains: query } }, orderBy: { title: "asc" }, take: 5 }); kein Treffer → reply(`No venue matches "${query}".`), sonst reply(JSON.stringify(venues, null, 2))
>   Bei "Step 3 of task 19", create_clash: venueId: z.string().describe("id from find_venue"), dateTime: z.string().describe("ISO date-time in the future"); vier refuse()-Prüfungen in dieser Reihenfolge: kein User mit hostEmail, keine Venue mit venueId, !isIsoDateTime(dateTime) oder nicht in der Zukunft, gleicher title und dateTime; dann das eine prisma.clash.create({ data: { …, venueId: venue.id, creatorId: host.id } }), log(), reply(`Created clash ${clash.id}: "${clash.title}" at ${clash.dateTime.toISOString()}.`)
> - Die Prompts aus Schritt 2 und 3 von tasks/19-build-your-own-mcp.md senden, dann Claudes Diff gegen die Musterlösung lesen
> - Smoke-Test: mcp/smoke.ts liegt schon auf dem 19-start von CLASH. `npx tsx mcp/smoke.ts` in deinem CLASH-Clone zeigt 14 PASS-Zeilen, dann `All checks passed.`
> - Falle: CLASH hat kein "type": "module", also läuft tsx als CommonJS — kein top-level await, daher main()

Sagen:
- registerTool ist der ganze Vertrag: Claude bekommt Name, Beschreibung, Schema; der Handler läuft auf dem Server
- In create_clash stecken die Regeln: unbekannter Host, unbekannte Venue, Datum vorbei, Duplikat — der Server lehnt ab
- Eine Ablehnung ist reiner Text mit isError: true. Nichts wurde geschrieben, das Modell liest, warum
- Der Server ist ein einfacher Node-Prozess. Nichts darin weiß von Claude Code

<!-- @note: register-it-then-trust-it-selectively -->
> Tun:
> - Docs-Link: die Scope-Tabelle (local, project, user) und das `.mcp.json`-Beispiel
> - Live, wie in Schritt 1: `claude mcp add --scope project --transport stdio clash -- npx tsx mcp/server.ts` in deinem CLASH-Clone schreibt `.mcp.json`; `claude` neu starten, Ja sagen
> - Dann `/mcp` in der Session und `claude mcp list` aus der Shell
> - Aus Versehen Nein gesagt? `claude mcp reset-project-choices`

Sagen:
- local und user liegen in ~/.claude.json; project ist `.mcp.json` im Root deines CLASH-Clones, eingecheckt
- [click] Ein Projekt-Server fragt einmal, bevor er in deinem CLASH-Clone starten darf. Bis dahin: ⏸ Pending approval
- `.mcp.json` bearbeitet? Beenden und neu starten. ✘ Failed to connect, während npx lädt? Nochmal
- [click] Voller Name, keine Klammern: mcp__clash__find_venue. mcp__clash allein erlaubt jedes Tool
- acceptEdits deckt MCP-Tools nicht ab; nur bypassPermissions überspringt die Nachfrage, und alle anderen mit

<!-- @note: every-tool-or-two-named-tools -->
> Tun:
> - [click] allowedTools: mcp__clash__* — auch später dazugekommene · [click] permissionMode: bypassPermissions — allowedTools begrenzt nichts
> - [click] never reads system/init — ein Server ohne Verbindung wirft nichts · [click] wrong venue? der Agent improvisiert · [click] Careless-Balken
> - [click] allowedTools: two named tools — find_venue und create_clash · [click] maxTurns: eine harte Obergrenze
> - [click] init says failed? mark the talk failed · [click] store the answer, decide nothing · [click] Engineered-Balken, Schlusszeile

Sagen:
- Die Publish-Route in clash-conference, skizziert, bevor sie jemand schreibt
- allowedTools bewilligt vorab, es schränkt nicht ein. Mit bypassPermissions sind Bash, Write, Edit mitbewilligt
- Das abgeriegelte Muster: allowedTools plus permissionMode dontAsk — Gelistetes läuft, alles andere wird abgelehnt
- dontAsk lässt trotzdem laufen, was geladene Settings erlauben und was keine Freigabe braucht, etwa Dateien lesen. Also auch isolieren: tools: [], settingSources: [], strictMcpConfig: true
- system/init trägt mcp_servers mit einem Status. failed oder needs-auth ist die Prüfung; pending ist okay
- Least Privilege, wie beim Hook und beim Subagent-Brief: die Regel gilt so oder so

<!-- @note: another-app-same-server -->
> Tun:
> - Docs-Link: mcpServers mit einem stdio-Eintrag, allowedTools mit Server-Wildcards
> - Zweiter Clone: clash-conference neben deinem CLASH-Clone; clash-conference/.env enthält CLASH_DIR=../clash — so findet die clash-conference-Route mcp/server.ts

Sagen:
- [click] Dieselbe Kette wie vorher: Claude Code, stdio, der Server, Prisma, dev.db
- [click] Zweiter Client: clash-conference über das Agent SDK. query() bekommt mcpServers, `.mcp.json` im Programm
- Aus clash-conference gestartet findet der Server dieselbe dev.db von CLASH — dafür ist import.meta.url da
- Ein kalter npx-Download kann MCP_TIMEOUT reißen. failed in system/init heißt fehlgeschlagener Publish

<!-- @note: route-ts -->
> Tun:
> - VOLLSTÄNDIGE LÖSUNG (nur für Trainer): die query()-Optionen sind mcpServers clash, tools: [], settingSources: [], strictMcpConfig: true, die zwei allowedTools, permissionMode: "dontAsk", maxTurns: 8
> - Auf seinem main hält clash-conference den query()-Aufruf in lib/clash-agent.ts, und app/api/publish/route.ts ruft ihn auf; das 19-start von clash-conference hat keine der beiden Dateien
> - Solange clash-conference nicht neben deinem CLASH-Clone liegt, nur die Form zeigen: die drei Isolations-Optionen, maxTurns, eine system/init-Prüfung, das gespeicherte Ergebnis

Sagen:
- Ohne settingSources: [] lädt der Agent dein ~/.claude: deine Skills, deine Allow-Regeln, sogar deine Sprache

<!-- @note: build-your-own-mcp-2 -->
> Tun:
> - Startpunkt: das 19-start von CLASH in deinem CLASH-Clone, dann `npm run db:seed` — der Smoke-Test und die Prompts mit Holzmarkt 25 brauchen die Seed-Daten
> - Übergabe an tasks/19-build-your-own-mcp.md: Schritte 1 bis 5 der Server in deinem CLASH-Clone, 6 bis 9 clash-conference auf localhost:3001
> - Achten auf: ein console.log im Server, ein refuse(), wenn find_venue nichts findet, ein Schreibvorgang vor den vier Prüfungen, ein fehlender Neustart nach einem neuen Tool
> - Duplikat-Demo: derselbe Create-Prompt zweimal; die zweite Antwort ist die Duplicate-Ablehnung des Servers

Sagen:
- "Now you": ein viertes Tool list_venues, ask-clash.mts aus Task 16 auf diesen Server gerichtet, eine Ablehnung, mit der Claude allein weiterkommt
- Auch in "Now you": create_clash schreibt direkt in die Datenbank und überspringt die venue_clash-Benachrichtigung, die das createClash von CLASH in app/actions/clashes.ts an den Ersteller der Venue schickt
- Erweiterung: dieselben drei Tools über HTTP als Next.js-Route in CLASH
