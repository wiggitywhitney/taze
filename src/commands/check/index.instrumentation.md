# Instrumentation Report: src/commands/check/index.ts

## Summary
- **Status**: success
- **Spans added**: 1
- **Attempts**: 2 (multi-turn-fix)
- **Input tokens**: 12.7K
- **Output tokens**: 9.6K
- **Cached tokens**: 30.4K

## Schema Extensions
- `span.taze.check.run`

## Validation Journey
1. **Attempt 1**: 2 blocking errors (SCH-001 (Span Names Match Registry):2)
2. **Attempt 2**: 0 errors

## Notes
- Used the registry-defined span name `taze.check.run` as required by SCH-001. The validator identified `taze.check.execute` as a semantic duplicate — the registered name is the authoritative choice.
- Wrapped the two `.reduce()` attribute computations (`taze.check.packages_total` and `taze.check.packages_outdated`) in an `if (span.isRecording())` guard to avoid redundant iteration when the span is not being sampled (CDQ-006).
- The `taze.check.write_mode` attribute is set after the interactive `prompts()` call that may update `options.write`, capturing the final user-confirmed write decision rather than the initial CLI flag value.
- All five attributes (`taze.check.mode`, `taze.check.recursive`, `taze.check.write_mode`, `taze.check.packages_total`, `taze.check.packages_outdated`) are from the registered schema — no new attribute keys were invented.
