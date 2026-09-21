<!-- @note: the-browser-closes-the-loop -->
Sagen:
- MCP: dafür da, wenn der Agent über das Repo hinaus muss
- Browser ist der klarste Fall — kann einen User-Flow nicht durch Lesen des Quellcodes prüfen, muss ihn durchklicken
- Zwei Server, zwei Aufgaben: Playwright MCP für Korrektheit, Chrome DevTools MCP für Performance

<!-- @note: your-systems-as-tools -->
> Tun:
> - Vor dem Start mit `claude mcp list` bestätigen

Sagen:
- Beide Server wurden schon beim Setup hinzugefügt (docs/SETUP.md)
- [click:2] Ein MCP-Server ist eine Brücke zwischen Claude Code und etwas Externem
- [click] Playwright MCP steuert einen echten Browser gegen localhost:3000
- Chrome DevTools MCP spricht das DevTools-Protokoll
- Keiner von beiden ist "das Tool" selbst

<!-- @note: register-the-servers -->
> Tun:
> - VOLLSTÄNDIGE LÖSUNG (nur für Trainer; sollte beim Setup schon erledigt sein):
>   claude mcp add playwright -- npx -y @playwright/mcp@latest
>   claude mcp add chrome-devtools -- npx -y chrome-devtools-mcp@latest
>   npx -y playwright install chromium
>   claude mcp list

Sagen:
- Die Registrierung ist meist ein einmaliger Terminal-Befehl — im Projekt-Scope geht es auch über eine `.mcp.json`-Datei, die man selbst bearbeitet und committet

<!-- @note: drive-first-then-test -->
> Tun:
> - VOLLSTÄNDIGE LÖSUNG (nur für Trainer, wörtlich aus tasks/11-browser-loop.md):
> "Now write that flow as a Playwright test file: request to join, host accepts, joining user is
> notified. Add a second test for the host rejecting instead. Use the seeded accounts and passwords
> from docs/SETUP.md."
> - Ergibt erst NACH dem manuellen Durchklicken Sinn: "Using the Playwright MCP tools, log in as anna.schmidt@example.com / test, open a clash she doesn't host, and request to join it…"
> - Erst von Hand durchklicken und dabei laut kommentieren, den Flow bestätigen, DANN nach der Testdatei fragen

Sagen:
- Testcode zu schreiben, bevor der Flow bestätigt ist, ist genau das blinde Generieren, das diese Schleife vermeidet

<!-- @note: measure-fix-measure-again -->
> Tun:
> - Der Bug ist echt, ihn vor dem Messen lesen: prisma/schema.prisma (User.avatar String?)
> - app/actions/profile.ts (MAX_AVATAR_LENGTH = 1_500_000)
> - lib/auth.ts (getCurrentUser selektiert avatar: true, eingepackt in cache())
> - app/(app)/layout.tsx (requireUser auf jeder Seite)
> - [click] Die Prompts stehen in tasks/11-browser-loop.md, Schritte 7 bis 9: mit Chrome DevTools MCP messen, fixen, noch einmal messen

Sagen:
- Bis zu 1,5 MB reisen bei jedem Seitenaufruf im Payload mit, für einen Wert, den das Layout nie rendert
- Erst messen, dann Code anfassen

<!-- @note: the-loop-that-matters -->
Sagen:
- [click] Code ändern, in einem ECHTEN Browser verifizieren
- [click] Beobachten, was passiert ist: Screenshot, Payload, Konsole
- [click] Anhand der Evidenz fixen — die Schleife schließt sich, ohne dass ein Mensch jeden Schritt erneut prüft
- [click:5] Genau das bringt "MCP reicht über das Repo hinaus"

<!-- @note: four-browser-tools-one-comparison -->
> Tun:
> - Den Vorteil qualitativ benennen
> - Keine Prozentzahl nennen — die oft zitierten "90 % weniger Tokens" sind keine offizielle Angabe, Schätzungen Dritter widersprechen sich
> - Bei Zeit selbst messen

Sagen:
- Vier Tools, unterschiedliche Aufgaben
- [click:4] agent-browser (Vercel, Rust-CLI, Accessibility-Tree-Snapshots) — das, was die Gruppe beim Setup installiert und beim Bauen benutzt hat
- Kompakte Snapshots gegenüber den Tool-Schemas eines MCP-Servers plus DOM — Tool Search verzögert das volle Laden der Schemas standardmäßig

<!-- @note: the-browser-closes-the-loop-2 -->
> Tun:
> - Startpunkt: 11-start, npm run dev läuft, die acht geseedeten Logins stehen bereit
> - Anna hostet, eine weitere geseedete Person tritt bei
> - Zwei Hälften: erst Tests, dann Performance
