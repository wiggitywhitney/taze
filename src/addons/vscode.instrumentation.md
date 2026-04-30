# Instrumentation Report: src/addons/vscode.ts

## Summary
- **Status**: success
- **Spans added**: 0
- **Attempts**: 1 (initial-generation)
- **Input tokens**: 0.4K
- **Output tokens**: 0.9K
- **Cached tokens**: 17.7K

## Validation Journey
1. **Attempt 1**: 0 errors

## Notes
- The only function in this file is `beforeWrite` on the `addonVSCode` addon object. It is synchronous, performs purely in-memory operations (version string comparisons and a property mutation on the pkg argument), and makes no I/O, network, or disk calls — so it is skipped per RST-001 (no spans on synchronous utilities with no I/O). The file is returned unchanged.
