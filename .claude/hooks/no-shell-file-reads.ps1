# PreToolUse hook (Windows path): mirrors no-shell-file-reads.sh, PowerShell-native
# so it needs no Unix executable bit at all — invoked via `powershell -File`, which
# only needs read access. All parsing logic lives in no-shell-file-reads.mjs; this
# file only locates node and forwards stdin to it, propagating the exit code.
if (-not (Get-Command node -ErrorAction SilentlyContinue)) { exit 0 }
& node "$PSScriptRoot\no-shell-file-reads.mjs"
exit $LASTEXITCODE
