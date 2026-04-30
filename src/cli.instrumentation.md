# Instrumentation Report: src/cli.ts

## Summary
- **Status**: success
- **Spans added**: 2
- **Attempts**: 1 (initial-generation)
- **Input tokens**: 1.4K
- **Output tokens**: 17.9K
- **Cached tokens**: 15.2K

## Schema Extensions
- `span.taze.cli.run`

## Validation Journey
1. **Attempt 1**: 0 errors

## Notes
- The `.action()` callback is the CLI root entry point and receives a span named `taze.cli.run` despite calling `process.exit(exitCode)` directly in its body — COV-001 (root spans are required for all entry points) takes priority over RST-006 (skip spans on functions that call process.exit). The span may leak at runtime on the `process.exit` path because `process.exit` bypasses the `finally` block; this is a known limitation documented for this pattern.
- The span name `taze.cli.run` is a schema extension — `span.taze.check_packages` was the only schema-defined span and was already reserved by an earlier file in this run. `taze.cli.run` captures the outer CLI dispatch layer, which is semantically distinct from the check-packages operation.
- All three attributes set on the span (`taze.check.mode`, `taze.check.write_mode`, `taze.check.recursive`) are already registered in the schema, so `attributesCreated` is 0. Mode is guarded with `!= null` because it is typed `RangeMode | undefined`; write and recursive are guarded similarly because they come from `Partial<CheckOptions>`.
- The `process.exit(1)` call inside the invalid-mode branch also bypasses `span.end()` — the span will leak on that path too. Adding `span.end()` before that `process.exit` call is explicitly prohibited (CDQ-001/NDS-005), so this is reported as a known limitation.

## Advisory Findings
- CDQ-007 (Attribute Data Quality):63: CDQ-007: setAttribute value "options.write" at line 63 accesses a property of "options" without a null/undefined guard. If "options" can be null or undefined, this will throw at runtime. Add an `if (options)` check or use optional chaining (`options?.write`).
- CDQ-007 (Attribute Data Quality):66: CDQ-007: setAttribute value "options.recursive" at line 66 accesses a property of "options" without a null/undefined guard. If "options" can be null or undefined, this will throw at runtime. Add an `if (options)` check or use optional chaining (`options?.recursive`).
