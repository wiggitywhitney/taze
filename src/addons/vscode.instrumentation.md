# Instrumentation Report: src/addons/vscode.ts

## Summary
- **Status**: success
- **Spans added**: 0
- **Attempts**: 1 (initial-generation)
- **Input tokens**: 0.4K
- **Output tokens**: 1.1K
- **Cached tokens**: 15.1K

## Validation Journey
1. **Attempt 1**: 0 errors

## Notes
- The `beforeWrite` method on `addonVSCode` is the only function in this file. It is synchronous with no I/O — it reads in-memory properties of the `pkg` object, performs semver string comparisons, and optionally mutates `pkg.raw.engines.vscode` in memory. There is no network access, no disk access, and no async work. RST-001 applies (no spans on pure synchronous data transformations), so no instrumentation was added and the file is returned unchanged.
