# Instrumentation Report: src/commands/check/interactive.ts

## Summary
- **Status**: success
- **Spans added**: 1
- **Attempts**: 1 (initial-generation)
- **Input tokens**: 2.4K
- **Output tokens**: 9.7K

## Schema Extensions
- `span.taze.check.interactive`

## Validation Journey
1. **Attempt 1**: 0 errors

## Notes
- promptInteractive is the sole exported async entry point and receives the taze.check.interactive span (COV-001). The process.exit() calls that appear in this file live inside nested inner-function bodies (the onKey method of createListRenderer and the keypress event handler inside registerInput), not directly in promptInteractive's own statement list, so RST-006 does not exempt the outer function from instrumentation.
- Known limitation: if process.exit() is called via the 'escape'/'q' key or Ctrl+C, the span's finally block never executes and the span leaks without being exported. This is inherent to the interactive terminal design and cannot be resolved without changing business logic.
- taze.check.packages_total is a registered schema attribute ('Total number of dependency entries checked across all package.json files') and maps directly to flatDeps().length — the count of dependency entries with updates available. No schema extension is needed.
- flatDeps and sortDeps are pure synchronous helpers with no I/O — they do not receive spans (RST-001: no spans on synchronous utilities).
- createListRenderer, createVersionSelectRender, and registerInput are unexported inner functions whose execution is fully covered by the promptInteractive parent span via context propagation — they do not receive individual spans (RST-004).
- span.taze.check.interactive is a new span name not present in the schema registry. It represents the interactive dependency selection session driven by promptInteractive. Declared in schemaExtensions.

## Advisory Findings
- CDQ-006 (isRecording Guard):46: CDQ-006 (isRecording Guard) fired because span.setAttribute() is called with an expensive computation (map, reduce, filter, JSON.stringify, etc.) or an external source string (value fetched from git output, an API response, file contents, or any source whose length is unbounded) and no span.isRecording() guard. When sampling drops the span, that work still runs on every request. Wrap the call in `if (span.isRecording()) { ... }` to skip it when the span won't be exported. Skip this finding for root spans at entry points — the guard adds clutter for negligible gain there.
