# Instrumentation Report: src/commands/check/index.ts

## Summary
- **Status**: success
- **Spans added**: 1
- **Attempts**: 2 (multi-turn-fix)
- **Input tokens**: 14.9K
- **Output tokens**: 13.4K

## Schema Extensions
- `span.taze.check.command`

## Validation Journey
1. **Attempt 1**: 1 blocking error (NDS-001 (Syntax Valid):1)
2. **Attempt 2**: 0 errors

## Notes
- The schema defines `span.taze.check` which semantically matches this `check()` function, but that span name was already declared by an earlier file in this instrumentation run. `taze.check.command` is used instead and reported as a schema extension.
- Fixed NDS-001: `options.mode` is typed as `'default' | 'major' | 'minor' | 'patch' | 'latest' | 'newest' | 'next' | undefined`. Guarded with `if (options.mode != null)` before calling `setAttribute` to prevent passing `undefined` as an `AttributeValue`.
- taze.check.packages_total and taze.check.packages_outdated are computed from the raw resolved packages after CheckPackages returns, before any interactive filtering, so they reflect the full dependency check results.
- taze.check.write_mode is set from options.write ?? false at span start, reflecting the initial CLI flag value rather than any interactively-assigned value later in execution.

## Advisory Findings
- CDQ-007 (Attribute Data Quality):25: CDQ-007: setAttribute value "options.mode" at line 25 accesses a property of "options" without a null/undefined guard. If "options" can be null or undefined, this will throw at runtime. Add an `if (options)` check or use optional chaining (`options?.mode`).
