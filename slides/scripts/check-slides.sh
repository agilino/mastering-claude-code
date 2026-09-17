#!/usr/bin/env bash
# Opens every slide of the deck in agent-browser at its final click state and
# reports overflow (content outside the slide box or a scrolling layout) and
# word count. Screenshots land in slides/.check/. Usage:
#   slides/scripts/check-slides.sh [width height]   (default 1920 1080)
set -euo pipefail
cd "$(dirname "$0")/.."
W="${1:-1920}"; H="${2:-1080}"
PORT=3030
mkdir -p .check
export AGENT_BROWSER_SESSION="$(agent-browser session id --scope worktree --prefix slidecheck)"

npx slidev --port "$PORT" >.check/slidev.log 2>&1 &
SLIDEV_PID=$!
trap 'kill $SLIDEV_PID 2>/dev/null || true; agent-browser close >/dev/null 2>&1 || true' EXIT
for _ in $(seq 1 60); do curl -sf "http://localhost:$PORT/" >/dev/null && break; sleep 1; done

agent-browser open "http://localhost:$PORT/1" >/dev/null
agent-browser set viewport "$W" "$H" >/dev/null 2>&1 || agent-browser resize "$W" "$H" >/dev/null 2>&1 || true
sleep 2
TOTAL="$(agent-browser eval '__slidev__.nav.total' | tr -dc '0-9')"
echo "slides: $TOTAL  viewport: ${W}x${H}"

CHECK_JS='(() => { const l = document.querySelector(".slidev-page .slidev-layout") || document.querySelector(".slidev-layout"); if (!l) return "NOLAYOUT"; const r = l.getBoundingClientRect(); const bad = []; l.querySelectorAll("*").forEach(el => { const b = el.getBoundingClientRect(); if (b.width < 2 || b.height < 2) return; if (el.closest("svg") && el.tagName !== "svg") return; if (b.right > r.right + 3 || b.bottom > r.bottom + 3 || b.left < r.left - 3 || b.top < r.top - 3) bad.push(el.tagName.toLowerCase() + (el.className && typeof el.className === "string" ? "." + el.className.split(" ")[0] : "")); }); const words = (l.innerText || "").trim().split(/\s+/).filter(Boolean).length; const scale = r.width / 980; const small = []; l.querySelectorAll("svg text, svg tspan").forEach(t => { const fs = parseFloat(getComputedStyle(t).fontSize) / (t.getBoundingClientRect().width ? 1 : 1); const box = t.getBoundingClientRect(); if (box.width === 0) return; const svg = t.closest("svg"); const vb = svg.viewBox && svg.viewBox.baseVal && svg.viewBox.baseVal.width ? svg.viewBox.baseVal.width : svg.getBoundingClientRect().width; const px = fs * (svg.getBoundingClientRect().width / vb) / scale; if (px < 11.5) small.push((t.textContent || "").trim().slice(0, 20) + "@" + px.toFixed(0)); }); const clipped = []; l.querySelectorAll("pre").forEach(p => { const c = p.closest(".na-card") || p; if (c.scrollHeight > c.clientHeight + 3) clipped.push("pre"); }); return JSON.stringify({ scroll: l.scrollHeight > l.clientHeight + 3, overflow: [...new Set(bad)].slice(0, 6), small: small.slice(0, 5), clipped, words }); })()'

FAIL=0
for n in $(seq 1 "$TOTAL"); do
  agent-browser open "http://localhost:$PORT/$n?clicks=99" >/dev/null
  sleep 1.5
  # Chrome keeps stale SVG text positions under Slidev's scale transform until a relayout
  agent-browser eval 'document.querySelectorAll("svg").forEach(s => { s.style.display = "none"; s.getBoundingClientRect(); s.style.display = ""; }); window.dispatchEvent(new Event("resize")); document.body.offsetHeight' >/dev/null 2>&1 || true
  sleep 1
  RES="$(agent-browser eval "$CHECK_JS" 2>/dev/null || echo '"EVALFAIL"')"
  agent-browser screenshot "$PWD/.check/$(printf '%03d' "$n").png" >/dev/null 2>&1 || true
  if echo "$RES" | grep -Eq 'scroll\\?":true|overflow\\?":\[[^]]|small\\?":\[[^]]|clipped\\?":\[[^]]' ; then FAIL=$((FAIL+1)); echo "FAIL slide $n $RES"; 
  elif echo "$RES" | grep -Eq 'words\\?":([6-9][0-9]|[1-9][0-9]{2,})' ; then echo "warn slide $n $RES";
  else echo "ok   slide $n $RES"; fi
done
echo "done: $FAIL slide(s) with overflow"
[ "$FAIL" -eq 0 ]
