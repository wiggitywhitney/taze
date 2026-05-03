# Instrumentation Report: src/io/pnpmWorkspaces.ts

## Summary
- **Status**: success
- **Spans added**: 2
- **Attempts**: 2 (multi-turn-fix)
- **Input tokens**: 10.6K
- **Output tokens**: 8.5K

## Schema Extensions
- `span.taze.pnpm_workspace.load`
- `span.taze.pnpm_workspace.write`

## Validation Journey
1. **Attempt 1**: 2 blocking errors (NDS-003 (Code Preserved):2)
2. **Attempt 2**: 0 errors

## Notes
- The NDS-003 blocking failure was caused by a whitespace corruption in the regex literal on the paths split line — the original `/\./g` was emitted as `/\.  /g` (with extra spaces). The fix restores the exact original regex.
- loadPnpmWorkspace is an exported async function that reads and parses a pnpm-workspace.yaml file — it gets a span as an I/O entry point. 'taze.check.packages_total' is the closest registered count attribute for the number of catalog groups returned; a dedicated 'taze.pnpm_workspace.catalogs_count' would be more precise but would require a schema extension.
- writeYaml is an exported synchronous thin wrapper that only calls writeFile() with remapped arguments — skipped under RST-003 (thin wrapper delegating directly to another function).
- SCH-001 advisory: 'taze.pnpm_workspace.load' was flagged as a potential duplicate of 'taze.io.load_package'. These are different operation classes — 'taze.io.load_package' is already used by another file for generic package loading, while this span is specifically for pnpm workspace catalog parsing, so the new name is kept.
- createPnpmWorkspaceEntry is an unexported inner helper performing pure in-memory data transformation — skipped under RST-004 (unexported) and RST-001 (no I/O).
