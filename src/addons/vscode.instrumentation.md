# Instrumentation Report: src/addons/vscode.ts

## Summary
- **Status**: success
- **Spans added**: 0
- **Attempts**: 1 (initial-generation)
- **Input tokens**: 0.4K
- **Output tokens**: 0.7K
- **Cached tokens**: 14.7K

## Validation Journey
1. **Attempt 1**: 0 errors

## Notes
- The only function in this file is `beforeWrite`, a synchronous method on the `addonVSCode` addon object. It performs purely in-memory operations — reading package metadata fields, comparing semver strings, and optionally updating a property. There is no I/O, no network access, and no async behavior. No instrumentation is added (RST-001: spans must not be added to pure synchronous data transformations with no I/O or async operations).
