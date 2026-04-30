# Instrumentation Report: src/commands/check/index.ts

## Summary
- **Status**: success
- **Spans added**: 1
- **Attempts**: 1 (initial-generation)
- **Input tokens**: 2.0K
- **Output tokens**: 7.4K

## Schema Extensions
- `span.taze.check.run`

## Validation Journey
1. **Attempt 1**: 0 errors

## Notes
- The schema defines `span.taze.check_global` which semantically matches the `check` function (the global check command entry point), but that span name was already declared by an earlier file in this instrumentation run. To avoid collision, the span is named `taze.check.run` instead — reported as a schema extension.
- All five schema-registered `taze.check.*` attributes are applied: `taze.check.mode` (guarded with `!= null` since `options.mode` may be undefined), `taze.check.recursive` and `taze.check.write_mode` coerced to boolean via `!!`, and `taze.check.packages_total` / `taze.check.packages_outdated` computed after `CheckPackages` resolves so accurate totals are available.
- The `taze.check.write_mode` attribute is set at span start using the initial value of `options.write`. This value may change later via interactive prompts, but the initial option intent is the most relevant signal for querying spans by write mode — the final value is reflected in behaviour (actual writes performed) rather than the attribute.
- The inner callbacks on `CheckPackages` (`afterPackagesLoaded`, `beforePackageStart`, etc.) are anonymous synchronous/callback-style helpers — they are not instrumented individually (RST-001/RST-004): they have no I/O of their own and execute within the already-instrumented `check` span's context.

## Advisory Findings
- CDQ-007 (Attribute Data Quality):25: CDQ-007: setAttribute value "options.mode" at line 25 accesses a property of "options" without a null/undefined guard. If "options" can be null or undefined, this will throw at runtime. Add an `if (options)` check or use optional chaining (`options?.mode`).
