#!/usr/bin/env node
// Logic for the no-shell-file-reads PreToolUse hook (see no-shell-file-reads.sh,
// matcher "Bash|PowerShell", CLAUDE.md rule 8).
//
// Blocks a TOP-LEVEL shell command that reads, lists or searches files where
// Read/Grep/Glob should have been used instead (cat, ls, grep, Get-ChildItem, ...).
//
// "Top-level" is quote-aware, using the escape rule of whichever tool actually ran
// the command (Bash: backslash escapes; PowerShell: backtick escapes, backslash is
// just a path separator — a Windows path ending "...\notes\en\" before a closing
// quote is NOT an escaped quote in PowerShell, only in Bash). It also recognizes
// Bash heredocs (<<EOF ... EOF) and PowerShell here-strings (@'...'@ / @"..."@), so
// text that is DATA — e.g. a commit message built with a heredoc, which may itself
// *mention* a blocked command name — is never mistaken for a command to run.
//
// This is a best-effort scanner, not a full shell parser: it does not track
// $(...) / `...` nesting depth, so a blocked command hidden inside a nested
// command substitution could slip through. That is an accepted gap, not a
// security boundary — this hook exists to catch an agent habitually reaching for
// the shell instead of Read/Grep/Glob, not to catch deliberate obfuscation.

const BLOCKED = new Set([
  "cat", "head", "tail", "ls", "dir", "tree", "find", "grep", "egrep", "fgrep",
  "rg", "wc", "sed", "awk",
  "get-content", "get-childitem", "select-string", "foreach-object",
  "measure-object", "format-table", "gci", "gc", "sls",
]);

function splitTopLevel(cmd, isPowerShell) {
  const escapeChar = isPowerShell ? "`" : "\\";
  const segments = [];
  let quote = null; // null | "'" | '"'
  const pending = []; // queue of in-flight heredocs / here-strings, oldest first
  let segStart = 0;
  let i = 0;
  const n = cmd.length;

  const cut = (afterIdx, beforeIdx) => {
    segments.push(cmd.slice(segStart, beforeIdx));
    segStart = afterIdx;
  };

  while (i < n) {
    const ch = cmd[i];

    if (quote) {
      if (quote === '"' && ch === escapeChar && i + 1 < n) { i += 2; continue; }
      if (ch === quote) quote = null;
      i++;
      continue;
    }

    if (ch === escapeChar && i + 1 < n) { i += 2; continue; }
    if (ch === "'" || ch === '"') { quote = ch; i++; continue; }

    // Bash heredoc: <<[-]DELIM, <<[-]'DELIM' or <<[-]"DELIM"
    if (!isPowerShell && ch === "<" && cmd[i + 1] === "<") {
      let j = i + 2;
      if (cmd[j] === "-") j++;
      while (cmd[j] === " " || cmd[j] === "\t") j++;
      let q = null;
      if (cmd[j] === "'" || cmd[j] === '"') { q = cmd[j]; j++; }
      const wordStart = j;
      while (j < n && /[A-Za-z0-9_]/.test(cmd[j])) j++;
      const delim = cmd.slice(wordStart, j);
      if (q && cmd[j] === q) j++;
      if (delim) {
        pending.push({ type: "heredoc", delim });
        i = j;
        continue;
      }
    }

    // PowerShell here-string: @'...'@ or @"..."@
    if (isPowerShell && ch === "@" && (cmd[i + 1] === "'" || cmd[i + 1] === '"')) {
      pending.push({ type: "herestring", closer: cmd[i + 1] + "@" });
      i += 2;
      continue;
    }

    if (ch === "\n") {
      let idx = i + 1;
      while (pending.length) {
        const p = pending.shift();
        while (idx <= n) {
          const nl = cmd.indexOf("\n", idx);
          const end = nl === -1 ? n : nl;
          const line = cmd.slice(idx, end);
          idx = end + 1;
          const done = p.type === "heredoc" ? line === p.delim : line.startsWith(p.closer);
          if (done || nl === -1) break;
        }
      }
      cut(idx, i);
      i = idx;
      continue;
    }

    if (ch === "|" && cmd[i + 1] === "|") { const s = i; i += 2; cut(i, s); continue; }
    if (ch === "|" && cmd[i + 1] === "&") { const s = i; i += 2; cut(i, s); continue; }
    if (ch === "|") { const s = i; i += 1; cut(i, s); continue; }
    if (ch === "&" && cmd[i + 1] === "&") { const s = i; i += 2; cut(i, s); continue; }
    if (ch === "&") { const s = i; i += 1; cut(i, s); continue; }
    if (ch === ";") { const s = i; i += 1; cut(i, s); continue; }

    i++;
  }
  if (segStart < n) segments.push(cmd.slice(segStart));
  return segments.map((s) => s.trim()).filter(Boolean);
}

let input = "";
process.stdin.on("data", (d) => (input += d));
process.stdin.on("end", () => {
  let command = "";
  let toolName = "";
  try {
    const payload = JSON.parse(input);
    command = payload.tool_input?.command ?? "";
    toolName = payload.tool_name ?? "";
  } catch {
    process.exit(0); // cannot parse the hook payload — fail open
  }
  if (!command) process.exit(0);

  for (const part of splitTopLevel(command, toolName === "PowerShell")) {
    const match = part.match(/^(\S+)/);
    if (!match) continue;
    const token = match[1].split(/[\\/]/).pop().toLowerCase();
    if (!BLOCKED.has(token)) continue;
    if (token === "cat" && /^cat$/i.test(part)) continue; // bare `| cat` disables a pager, reads no file
    process.stderr.write(
      "Denied: use Read, Grep or Glob for file work in this repo, not a shell command.\n" +
      "Glob lists files, Read returns content, Grep finds text — and none of them raise a permission prompt.\n" +
      "Blocked on: " + part + "\n"
    );
    process.exit(2);
  }
  process.exit(0);
});
