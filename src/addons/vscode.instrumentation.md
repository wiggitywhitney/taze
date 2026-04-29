# Instrumentation Report: src/addons/vscode.ts

## Summary
- **Status**: success
- **Spans added**: 0
- **Attempts**: 1 (initial-generation)
- **Input tokens**: 0.4K
- **Output tokens**: 1.2K
- **Cached tokens**: 14.7K

## Validation Journey
1. **Attempt 1**: 0 errors

## Notes
- The only function in this file is `beforeWrite`, a synchronous method on the `addonVSCode` object literal. It performs purely in-memory operations — semver string comparisons via `gt`/`minVer` and a conditional property assignment on `pkg.raw`. There is no network I/O, no database access, and no async work. No span is warranted here (RST-001: no spans on pure synchronous data transformations with no I/O).
