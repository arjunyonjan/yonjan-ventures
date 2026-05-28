---
name: npx-plugins-install
description: Install CLI plugins via npx plugins — supports vercel, github repos; requires IDE target (cursor/claude/codex)
source: auto-skill
extracted_at: '2026-05-28T10:26:31.569Z'
---

# Installing CLI Plugins with npx plugins

## Basic Usage

```bash
npx plugins add <owner/repo>
```

Example:
```bash
npx plugins add vercel/vercel-plugin
```

## How It Works

1. `npx` installs the `plugins` package (currently v1.3.1)
2. Clones the specified GitHub repository
3. Detects supported IDE targets on PATH: `cursor`, `claude`, or `codex`
4. Installs the plugin configuration for detected targets

## Common Issue: No Supported Target Found

If none of `cursor`, `claude`, or `codex` binaries are on your `PATH`, the command fails with:

```
No supported targets detected.
Use --target to specify one manually.
```

### Solution

Use the `--target` flag to specify the target manually:

```bash
npx plugins add <owner/repo> --target <cursor|claude|codex>
```

Or check what's available:
```bash
where cursor 2>nul || echo "cursor not found"
where claude 2>nul || echo "claude not found"
```

## Platform Notes

- On Windows, use `where` instead of `which` to check for binaries
- The `y | npx -y` pattern auto-confirms the install prompt but does not bypass the target detection
