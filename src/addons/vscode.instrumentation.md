# Instrumentation Report: src/addons/vscode.ts

## Summary
- **Status**: success
- **Spans added**: 0
- **Attempts**: 1 (initial-generation)
- **Input tokens**: 0.4K
- **Output tokens**: 1.1K
- **Cached tokens**: 15.2K

## Validation Journey
1. **Attempt 1**: 0 errors

## Notes
- The only function in this file is `addonVSCode.beforeWrite`, a synchronous method with no I/O, no network calls, and no disk access — it reads properties from an in-memory package object, compares semver strings, and optionally mutates one field. Per RST-001 (no spans on pure synchronous data transformations), it is not instrumented. No tracer import is added because there is nothing to instrument.
