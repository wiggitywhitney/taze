# Instrumentation Report: src/cli.ts

## Summary
- **Status**: success
- **Spans added**: 2
- **Attempts**: 1 (initial-generation)
- **Input tokens**: 1.4K
- **Output tokens**: 16.7K
- **Cached tokens**: 14.9K

## Schema Extensions
- `span.taze.cli.run`

## Validation Journey
1. **Attempt 1**: 0 errors

## Notes
- The `.action()` callback is the CLI entry point — it dispatches to `check` or `checkGlobal` based on flags. It receives a span under the new `taze.cli.run` name (COV-001: CLI entry points must have a root span). The schema-defined span `taze.check.packages` was already in use by another file, so this entry-point span is new.
- The action callback calls `process.exit(exitCode)` unconditionally at the end of its happy path. `process.exit()` bypasses the `finally` block, so `span.end()` will not execute on normal exit — the span leaks at runtime and will never export on a successful run. This is a known limitation per the COV-001 guidance for `process.exit()` functions. The early `process.exit(1)` on invalid mode has the same limitation.
- Schema attributes `taze.check.mode`, `taze.check.recursive`, and `taze.check.write_mode` are set from the CLI arguments passed into the action callback. These are the registered attribute keys that directly correspond to the CLI flags being parsed here.
- The new `span.taze.cli.run` extension was added because no existing schema span covers the top-level CLI dispatch operation — `span.taze.check.packages` (already in use) covers the dependency-checking loop, not the CLI argument parsing and dispatch logic that precedes it.

## Advisory Findings
- CDQ-007 (Attribute Data Quality):61: CDQ-007: setAttribute value "options.recursive" at line 61 accesses a property of "options" without a null/undefined guard. If "options" can be null or undefined, this will throw at runtime. Add an `if (options)` check or use optional chaining (`options?.recursive`).
- CDQ-007 (Attribute Data Quality):64: CDQ-007: setAttribute value "options.write" at line 64 accesses a property of "options" without a null/undefined guard. If "options" can be null or undefined, this will throw at runtime. Add an `if (options)` check or use optional chaining (`options?.write`).
