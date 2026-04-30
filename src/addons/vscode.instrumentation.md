# Instrumentation Report: src/addons/vscode.ts

## Summary
- **Status**: success
- **Spans added**: 0
- **Attempts**: 1 (initial-generation)
- **Input tokens**: 0.4K
- **Output tokens**: 0.9K
- **Cached tokens**: 15.1K

## Validation Journey
1. **Attempt 1**: 0 errors

## Notes
- The `beforeWrite` method inside `addonVSCode` is a purely synchronous, in-memory operation — it reads version strings from the already-loaded package object, compares semver values, and optionally mutates `pkg.raw.engines.vscode`. There is no network I/O, no disk access, and no async work, so RST-001 applies and no span was added. The file is returned unchanged.
