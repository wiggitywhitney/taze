# Instrumentation Report: src/addons/vscode.ts

## Summary
- **Status**: success
- **Spans added**: 0
- **Attempts**: 1 (initial-generation)
- **Input tokens**: 0.4K
- **Output tokens**: 1.1K
- **Cached tokens**: 14.7K

## Validation Journey
1. **Attempt 1**: 0 errors

## Notes
- beforeWrite is the only function in this file. It is fully synchronous, performs no I/O, no network calls, and no disk access — only in-memory semver comparisons and string mutation on the pkg object passed in. RST-001 (no spans on pure synchronous data transformations) applies, so no instrumentation was added.
