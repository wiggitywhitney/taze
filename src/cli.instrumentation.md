# Instrumentation Report: src/cli.ts

## Summary
- **Status**: success
- **Spans added**: 2
- **Attempts**: 1 (initial-generation)
- **Input tokens**: 1.1K
- **Output tokens**: 5.5K

## Schema Extensions
- `span.taze.cli.run`

## Validation Journey
1. **Attempt 1**: 0 errors

## Notes
- The `.action()` callback is the CLI entry point and is instrumented with span `taze.cli.run` (COV-001 takes priority over RST-006). However, `process.exit(exitCode)` on the normal success path and `process.exit(1)` on invalid-mode path both bypass the `finally` block, so `span.end()` will not be called on those paths — this is a known limitation of CLI tools that terminate with `process.exit()` inside an active span.
- The span name `taze.cli.run` is a new schema extension. The previously used `taze.check.run` (declared by an earlier file in this run) refers to the check command's execution, whereas this span covers the entire CLI action dispatch — a distinct operation class that deserves its own span name.
- Registered attributes `taze.check.mode`, `taze.check.recursive`, and `taze.check.write_mode` are all set from CLI arguments already present in scope, and all three are guarded appropriately (`mode` via truthiness, `recursive` and `write` via `!= null` to cover both null and undefined from `Partial<CheckOptions>`). No new attribute keys were invented.

## Advisory Findings
- CDQ-007 (Attribute Data Quality):60: CDQ-007: setAttribute value "options.recursive" at line 60 accesses a property of "options" without a null/undefined guard. If "options" can be null or undefined, this will throw at runtime. Add an `if (options)` check or use optional chaining (`options?.recursive`).
- CDQ-007 (Attribute Data Quality):63: CDQ-007: setAttribute value "options.write" at line 63 accesses a property of "options" without a null/undefined guard. If "options" can be null or undefined, this will throw at runtime. Add an `if (options)` check or use optional chaining (`options?.write`).
- SCH-001 (Span Names Match Registry): SCH-001: declared span extension "taze.cli.run" may be a semantic duplicate of existing registry operation "taze.check.run". If these operations are equivalent, reuse "taze.check.run" instead of declaring a new extension. If they are a different operation class, this advisory can be ignored.
