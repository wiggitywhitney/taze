# Instrumentation Report: src/commands/check/interactive.ts

## Summary
- **Status**: success
- **Spans added**: 1
- **Attempts**: 2 (multi-turn-fix)
- **Input tokens**: 14.3K
- **Output tokens**: 11.8K
- **Cached tokens**: 30.4K

## Schema Extensions
- `span.taze.check.run`

## Validation Journey
1. **Attempt 1**: 2 blocking errors (SCH-001 (Span Names Match Registry):2)
2. **Attempt 2**: 0 errors

## Notes
- Used the registry span name `taze.check.run` (stripping the `span.` Weaver prefix) as required by SCH-001 — the validator determined `taze.check.interactive` was a semantic duplicate of this existing registry operation. Multiple files may emit spans with the same name when they represent the same operation type.
- Added `if (span.isRecording())` guard around the `flatDeps().length` setAttribute call (CDQ-006) since `flatDeps()` iterates over all packages and filtering is non-trivial computation that should be skipped when the span is not sampled.
- Added `if (checked != null)` guard around the `checked.size` setAttribute call to satisfy CDQ-007. In practice `checked` is always a `new Set<object>()` and cannot be null, but the guard makes the defensive intent explicit.
- The `process.exit()` calls inside the `onKey` closures (escape/q keys and Ctrl-C) bypass the span's `finally` block at runtime, causing the span to leak and never export. This is a known limitation that cannot be avoided without restructuring the input-handling logic.
