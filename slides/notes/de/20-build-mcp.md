<!-- @note: build-your-own-mcp -->
Sagen:
- Task 14: Wir haben nur fremde Server benutzt — Playwright, Chrome DevTools, einen Remote-Server
- Jetzt ist CLASH das System, das ein anderer Agent erreicht. Den Server schreiben wir selbst
- Drei Tools, eine Datei, und am Ende ruft clash-conference denselben Server auf

<!-- @note: task-19-build-your-own-mcp -->
> Tun:
> - Branch: 19-start in deinem CLASH-Clone, identisch mit 14-start — CLAUDE.md, der Skill, der Fix, das Hook-Set
> - `npm install --save-exact @modelcontextprotocol/server@2.1.0` in deinem CLASH-Clone, beim Setup vorgeladen; zod ist schon eine CLASH-Dependency
> - Falle: das Paket ist @modelcontextprotocol/server, nie das ältere @modelcontextprotocol/sdk
> - clash-conference ist ein zweiter Clone neben deinem CLASH-Clone, mit eigenem 19-start — jetzt sagen, dass er am Ende kommt

Sagen:
- Vier Dinge: einen Server schreiben, registrieren, selektiv vertrauen, aus clash-conference aufrufen
- Das Schreib-Tool ist das interessante: der Server lehnt schlechte Eingaben ab, das Modell improvisiert nicht

<!-- @note: a-server-is-three-registered-tools -->
> Tun:
> - Docs-Link: der TypeScript-Tab, die Imports, ein registerTool-Aufruf
> - Beim Diagramm bleiben; der Code kommt auf der nächsten Folie

Sagen:
- [click] Claude Code ist der Client: startet den Server, JSON-RPC über stdin und stdout
- Ein console.log schreibt in diesen Kanal und macht ihn kaputt. Logs gehen an console.error
- [click] Drei registerTool-Aufrufe: Name, Beschreibung, zod-Schema, Handler. Die Beschreibung sagt Claude, wann
- [click] Hinter den Tools: Prisma und die dev.db von CLASH, aufgelöst aus import.meta.url, nie aus process.cwd()
- In Claude Code heißt ein Tool mcp__clash__find_venue: Server-Name, doppelter Unterstrich, Tool-Name

<!-- @note: mcp-server-ts -->
> Tun:
> - VOLLSTÄNDIGE LÖSUNG (nur für Trainer): workshop-artifacts/19-build-mcp/server.ts → mcp/server.ts in deinem CLASH-Clone. Die ⟵ LIVE-Teile:
>   const clashRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
>   const dbFile = path.join(clashRoot, "dev.db");
>   const adapter = new PrismaBetterSqlite3({ url: `file:${dbFile}` });
>   async function main() { await server.connect(new StdioServerTransport()); }
> - Den Prompt aus tasks/19-build-your-own-mcp.md Schritt 2 senden, dann Claudes Diff gegen die Musterlösung lesen
> - Smoke-Test in deinem CLASH-Clone: `npm install --save-dev --save-exact @modelcontextprotocol/client@2.1.0`, dann workshop-artifacts/19-build-mcp/smoke.ts → mcp/smoke.ts, `npx tsx mcp/smoke.ts` endet mit `All checks passed.`
> - Falle: CLASH hat kein "type": "module", also läuft tsx als CommonJS — kein top-level await, daher main()

Sagen:
- registerTool ist der ganze Vertrag: Claude bekommt Name, Beschreibung, Schema; der Handler läuft auf dem Server
- In create_clash stecken die Regeln: unbekannter Host, unbekannte Venue, Datum vorbei, Duplikat — der Server lehnt ab
- Eine Ablehnung ist reiner Text mit isError: true. Nichts wurde geschrieben, das Modell liest, warum
- Der Server ist ein einfacher Node-Prozess. Nichts darin weiß von Claude Code

<!-- @note: register-it-then-trust-it-selectively -->
> Tun:
> - Docs-Link: die Scope-Tabelle (local, project, user) und das `.mcp.json`-Beispiel
> - Live: `.mcp.json` aus workshop-artifacts/19-build-mcp/.mcp.json in deinen CLASH-Clone, beenden, `claude` neu starten, Ja sagen
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
> - Startpunkt: 19-start in deinem CLASH-Clone, `npm run dev` auf localhost:3000, die acht geseedeten Logins
> - Übergabe an tasks/19-build-your-own-mcp.md: Schritte 1 bis 13 der Server, 14 bis 19 clash-conference auf localhost:3001
> - Achten auf: ein console.log im Server, ein process.cwd()-Pfad, ein fehlender Neustart nach `.mcp.json`
> - Duplikat-Demo: derselbe Create-Prompt zweimal; die zweite Antwort ist die Duplicate-Ablehnung des Servers

Sagen:
- "Now you": ein viertes Tool list_venues, dann ask-clash.mts aus Task 16 auf diesen Server gerichtet
- Erweiterung: dieselben drei Tools über HTTP als Next.js-Route in CLASH
