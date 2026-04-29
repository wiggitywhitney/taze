# Instrumentation Report: src/addons/vscode.ts

## Summary
- **Status**: success
- **Spans added**: 0
- **Attempts**: 1 (initial-generation)
- **Input tokens**: 0.4K
- **Output tokens**: 0.9K
- **Cached tokens**: 14.7K

## Validation Journey
1. **Attempt 1**: 0 errors

## Notes
- The `beforeWrite` method on `addonVSCode` is a pure synchronous in-memory computation — it reads semver fields from the already-loaded `pkg` object, compares versions using semver utilities, and optionally mutates a field. There is no I/O, no network access, and no async work, so no span is warranted (RST-001: no spans on synchronous utilities with no I/O).
