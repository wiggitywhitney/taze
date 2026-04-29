# Instrumentation Report: src/cli.ts

## Summary
- **Status**: success
- **Spans added**: 2
- **Attempts**: 1 (initial-generation)
- **Input tokens**: 1.5K
- **Output tokens**: 12.2K
- **Cached tokens**: 14.9K

## Schema Extensions
- `span.taze.cli.action`

## Validation Journey
1. **Attempt 1**: 0 errors

## Notes
- The action callback is the CLI entry point and receives a span despite calling `process.exit(exitCode)` directly — COV-001 (entry points must have spans) overrides RST-006 (no spans on process.exit functions). Known limitation: `process.exit()` bypasses the `finally` block at runtime, so `span.end()` will never execute on normal exit paths and the span will leak without being exported. This is unavoidable without restructuring the exit strategy.
- The span name `taze.check` was already in use by an earlier file in this run. The schema defines `span.taze.check` for check operations, but since that name is taken, `taze.cli.action` was invented for this CLI entry point — it represents the CLI action dispatch layer rather than the core check logic. Reported in schemaExtensions as `span.taze.cli.action`.
- Attributes `taze.check.mode`, `taze.check.recursive`, and `taze.check.write_mode` are set after `options.mode` is resolved from the positional argument, so the recorded value reflects what will actually be used. All three are guarded with `!= null` because they come from `Partial<CheckOptions>` and may be undefined when the corresponding flags are not passed.
- The `resolveConfig`, `check`, and `checkGlobal` calls are not wrapped in additional manual spans here — they are imported service functions expected to have their own instrumentation in their respective modules. Wrapping them here would create duplicate parent/child spans (RST-005 concern) and those exported async functions satisfy COV-004 through their own spans.

## Advisory Findings
- CDQ-007 (Attribute Data Quality):61: CDQ-007: setAttribute value "options.mode" at line 61 accesses a property of "options" without a null/undefined guard. If "options" can be null or undefined, this will throw at runtime. Add an `if (options)` check or use optional chaining (`options?.mode`).
- CDQ-007 (Attribute Data Quality):64: CDQ-007: setAttribute value "options.recursive" at line 64 accesses a property of "options" without a null/undefined guard. If "options" can be null or undefined, this will throw at runtime. Add an `if (options)` check or use optional chaining (`options?.recursive`).
- CDQ-007 (Attribute Data Quality):67: CDQ-007: setAttribute value "options.write" at line 67 accesses a property of "options" without a null/undefined guard. If "options" can be null or undefined, this will throw at runtime. Add an `if (options)` check or use optional chaining (`options?.write`).
