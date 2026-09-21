// Unit tests for the no-shell-file-reads PreToolUse hook. Plain Node, no
// framework — node:test is built in (Node 18+). Run with:
//   node --test .claude/hooks/no-shell-file-reads.test.mjs
//
// Every case here was found the hard way in one session: five were real bypasses
// Copilot's review caught (hyphenated heredoc delimiters, backslash-newline
// continuations, leading env-var assignments, tab-indented heredoc terminators,
// plus the original PowerShell-path-with-trailing-backslash incident), and one
// (the settings.json integration test) is a dispatcher bug — chaining alternatives
// with `||` treats the hook's own exit code 2 as "this attempt failed, try the
// next one," silently swallowing a correct block. A test file exists so none of
// these can regress silently again.

import { test } from "node:test";
import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import fs from "node:fs";
import path from "node:path";

const HOOKS_DIR = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(HOOKS_DIR, "..", "..");
const HOOK = path.join(HOOKS_DIR, "no-shell-file-reads.mjs");

function run(toolName, command) {
  const payload = JSON.stringify({ tool_name: toolName, tool_input: { command } });
  return spawnSync(process.execPath, [HOOK], { input: payload, encoding: "utf8" });
}

function assertBlocked(toolName, command, mustContain) {
  const { status, stderr } = run(toolName, command);
  assert.equal(status, 2, `expected block (exit 2) for: ${command}\nstderr: ${stderr}`);
  if (mustContain) {
    assert.ok(stderr.includes(mustContain), `stderr should mention "${mustContain}":\n${stderr}`);
  }
}

function assertPassed(toolName, command) {
  const { status, stderr } = run(toolName, command);
  assert.equal(status, 0, `expected pass (exit 0) for: ${command}\nstderr: ${stderr}`);
}

test("blocks a bare file-read command", () => {
  assertBlocked("Bash", "cat README.md", "cat README.md");
});

test("blocks the original incident: PowerShell path ending in a backslash before the closing quote", () => {
  // PowerShell's escape char is backtick, not backslash — treating this like Bash
  // would misparse the closing quote as escaped and swallow the rest of the pipe.
  assertBlocked(
    "PowerShell",
    'Get-ChildItem -Path "C:\\Users\\adam\\workspace\\claude\\mastering-claude-code\\slides\\notes\\en\\" -File | ForEach-Object { $_.Name } | Sort-Object Name | Format-Table -AutoSize'
  );
});

test("passes a chained build command", () => {
  assertPassed("Bash", "cd slides && npm install && npm run build");
});

test("passes a plain node script invocation", () => {
  assertPassed("Bash", "node slides/scripts/lint-slides.mjs");
});

test("passes git status", () => {
  assertPassed("Bash", "git status");
});

test("passes bare `| cat` used as a pager, not a file read", () => {
  assertPassed("Bash", "git diff HEAD | cat");
});

test("passes a heredoc commit message that mentions a blocked word in prose", () => {
  assertPassed(
    "Bash",
    "git commit -m \"$(cat <<'EOF'\nfix: mentions Get-ChildItem and Bash|PowerShell in prose only\nEOF\n)\""
  );
});

test("passes a PowerShell here-string that mentions a blocked word in prose", () => {
  assertPassed(
    "PowerShell",
    "git commit -m @'\nmentions Get-ChildItem and Bash|PowerShell in prose only\n'@"
  );
});

test("blocks a hyphenated heredoc delimiter bypass (delimiter truncated at the hyphen)", () => {
  assertBlocked("Bash", "git commit -F - <<END-MSG\nsome message\nEND-MSG\nls\n", "ls");
});

test("blocks a backslash-newline continuation bypass right after a separator", () => {
  assertBlocked("Bash", "printf ok && \\\nls\n", "ls");
});

test("blocks a leading environment-assignment bypass", () => {
  assertBlocked("Bash", "LC_ALL=C grep needle file", "LC_ALL=C grep needle file");
});

test("blocks a tab-indented heredoc terminator bypass (<<-EOF)", () => {
  assertBlocked("Bash", "git commit -F - <<-EOF\nmessage here\n\tEOF\ncat README.md\n", "cat README.md");
});

test("fails open on malformed JSON input", () => {
  const result = spawnSync(process.execPath, [HOOK], { input: "not json", encoding: "utf8" });
  assert.equal(result.status, 0);
});

test("fails open on an empty command", () => {
  assertPassed("Bash", "");
});

test("the settings.json PreToolUse command blocks and passes exactly like the direct script", () => {
  // Regression guard for the dispatcher bug: settings.json used to chain
  // alternatives with `||`, which treats exit 2 (a correct block) as "this
  // attempt failed" and falls through to the next alternative — which then
  // re-reads an already-exhausted stdin and fails open, silently overwriting a
  // correct block with exit 0. This runs the actual configured command, not the
  // .mjs directly, so that class of bug can't come back unnoticed.
  const settings = JSON.parse(fs.readFileSync(path.join(ROOT, ".claude", "settings.json"), "utf8"));
  const command = settings.hooks.PreToolUse[0].hooks[0].command;
  const env = { ...process.env, CLAUDE_PROJECT_DIR: ROOT };

  const blocked = spawnSync("bash", ["-c", command], {
    input: JSON.stringify({ tool_name: "Bash", tool_input: { command: "cat README.md" } }),
    encoding: "utf8",
    env,
  });
  assert.equal(blocked.status, 2, `settings.json command should block cat: ${blocked.stderr}`);

  const passed = spawnSync("bash", ["-c", command], {
    input: JSON.stringify({ tool_name: "Bash", tool_input: { command: "git status" } }),
    encoding: "utf8",
    env,
  });
  assert.equal(passed.status, 0, `settings.json command should pass git status: ${passed.stderr}`);
});
