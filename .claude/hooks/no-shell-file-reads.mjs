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
// quote is NOT an escaped quote in PowerShell, only in Bash). It also:
// - recognizes Bash heredocs (<<EOF ... EOF, delimiter is a Bash WORD — letters,
//   digits, underscore AND hyphen — not just an identifier) and PowerShell
//   here-strings (@'...'@ / @"..."@), skipping their bodies rather than scanning
//   them for separators. `<<-EOF` (the dash variant) allows the closing delimiter
//   line to be indented with tabs, which are stripped before comparing;
// - removes Bash backslash-newline / PowerShell backtick-newline line
//   continuations (outside single quotes and heredoc bodies, where they are
//   literal, not continuations) BEFORE extracting the executable token, so a
//   continuation right after a separator can't hide the real command name;
// - skips leading Bash assignment-prefix words (`VAR=value cmd ...`) before
//   checking the executable token, so `LC_ALL=C grep ...` is still recognized as
//   a `grep` invocation.
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
  let buf = ""; // cleaned text of the segment in progress (continuations removed)
  let i = 0;
  const n = cmd.length;

  const cut = () => {
    segments.push(buf);
    buf = "";
  };

  while (i < n) {
    const ch = cmd[i];

    if (quote) {
      if (quote === '"' && ch === escapeChar && i + 1 < n) {
        if (cmd[i + 1] === "\n") { i += 2; continue; } // continuation inside "..." — drop it
        buf += ch + cmd[i + 1];
        i += 2;
        continue;
      }
      if (ch === quote) quote = null;
      buf += ch;
      i++;
      continue;
    }

    if (ch === escapeChar && i + 1 < n) {
      if (cmd[i + 1] === "\n") { i += 2; continue; } // continuation — drop it, no segment break
      buf += ch + cmd[i + 1];
      i += 2;
      continue;
    }
    if (ch === "'" || ch === '"') { quote = ch; buf += ch; i++; continue; }

    // Bash heredoc: <<[-]DELIM, <<[-]'DELIM' or <<[-]"DELIM" — DELIM is a Bash
    // word: letters, digits, underscore, hyphen (not just identifier chars).
    // The `-` variant allows the closing terminator line to be tab-indented.
    if (!isPowerShell && ch === "<" && cmd[i + 1] === "<") {
      let j = i + 2;
      let stripTabs = false;
      if (cmd[j] === "-") { stripTabs = true; j++; }
      while (cmd[j] === " " || cmd[j] === "\t") j++;
      let q = null;
      if (cmd[j] === "'" || cmd[j] === '"') { q = cmd[j]; j++; }
      const wordStart = j;
      while (j < n && /[A-Za-z0-9_-]/.test(cmd[j])) j++;
      const delim = cmd.slice(wordStart, j);
      if (q && cmd[j] === q) j++;
      if (delim) {
        pending.push({ type: "heredoc", delim, stripTabs });
        buf += cmd.slice(i, j);
        i = j;
        continue;
      }
    }

    // PowerShell here-string: @'...'@ or @"..."@
    if (isPowerShell && ch === "@" && (cmd[i + 1] === "'" || cmd[i + 1] === '"')) {
      pending.push({ type: "herestring", closer: cmd[i + 1] + "@" });
      buf += cmd.slice(i, i + 2);
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
          const candidate = p.type === "heredoc" && p.stripTabs ? line.replace(/^\t+/, "") : line;
          const done = p.type === "heredoc" ? candidate === p.delim : line.startsWith(p.closer);
          if (done || nl === -1) break;
        }
      }
      cut();
      i = idx;
      continue;
    }

    if (ch === "|" && cmd[i + 1] === "|") { i += 2; cut(); continue; }
    if (ch === "|" && cmd[i + 1] === "&") { i += 2; cut(); continue; }
    if (ch === "|") { i += 1; cut(); continue; }
    if (ch === "&" && cmd[i + 1] === "&") { i += 2; cut(); continue; }
    if (ch === "&") { i += 1; cut(); continue; }
    if (ch === ";") { i += 1; cut(); continue; }

    buf += ch;
    i++;
  }
  segments.push(buf);
  return segments.map((s) => s.trim()).filter(Boolean);
}

// Skip leading Bash assignment-prefix words (VAR=val VAR2=val2 ... cmd) and return
// the remaining text starting at the actual command. Not a Bash-only concept for
// PowerShell (which has no equivalent inline-assignment syntax), so callers should
// only apply this when isPowerShell is false.
function skipAssignments(text) {
  let rest = text;
  for (;;) {
    const m = rest.match(/^[A-Za-z_][A-Za-z0-9_]*=\S*(?:\s+(.*))?$/s);
    if (!m || m[1] === undefined) break;
    rest = m[1];
  }
  return rest;
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

  const isPowerShell = toolName === "PowerShell";
  for (const part of splitTopLevel(command, isPowerShell)) {
    const rest = isPowerShell ? part : skipAssignments(part);
    const match = rest.match(/^(\S+)/);
    if (!match) continue;
    const token = match[1].split(/[\\/]/).pop().toLowerCase();
    if (!BLOCKED.has(token)) continue;
    if (token === "cat" && /^cat$/i.test(rest.trim())) continue; // bare `| cat` disables a pager, reads no file
    process.stderr.write(
      "Denied: use Read, Grep or Glob for file work in this repo, not a shell command.\n" +
      "Glob lists files, Read returns content, Grep finds text — and none of them raise a permission prompt.\n" +
      "Blocked on: " + part + "\n"
    );
    process.exit(2);
  }
  process.exit(0);
});
