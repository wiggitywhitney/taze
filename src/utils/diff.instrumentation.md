# Instrumentation Report: src/utils/diff.ts

## Summary
- **Status**: success
- **Spans added**: 0
- **Attempts**: 1 (initial-generation)
- **Input tokens**: 0.5K
- **Output tokens**: 0.3K
- **Cached tokens**: 19.1K

## Validation Journey
1. **Attempt 1**: 0 errors

## Notes
- This file contains only constant object declarations (DiffMap and DiffColorMap) — no functions, no async logic, no I/O, and no local definitions beyond re-exported constants. Per the files-with-only-re-exports-and-no-local-definitions rule, and RST-001 (no spans on pure synchronous data), there is nothing to instrument. The file is returned unchanged.
