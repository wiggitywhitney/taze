# Instrumentation Report: src/config.ts

## Summary
- **Status**: success
- **Spans added**: 1
- **Attempts**: 2 (multi-turn-fix)
- **Input tokens**: 4.3K
- **Output tokens**: 3.9K

## Schema Extensions
- `span.taze.config.resolve`
- `taze.config.sources_count`

## Validation Journey
1. **Attempt 1**: 1 blocking error (NDS-001 (Syntax Valid):1)
2. **Attempt 2**: 0 errors

## Notes
- normalizeConfig is an unexported synchronous transformation helper with no I/O — skipped on two grounds: RST-004 (unexported internals) and RST-001 (pure synchronous transformation).
- resolveConfig is the sole exported async function performing disk I/O via unconfig's loader — it receives a span as a service entry point. The span name 'taze.config.resolve' is a schema extension because no existing schema span semantically matches configuration file resolution.
- options.mode was removed after tsc reported it does not exist on CommonOptions. taze.check.recursive is guarded with != null since it is an optional field.
- taze.config.sources_count is a new schema extension attribute capturing how many config file sources were discovered. No registered schema key semantically matches 'number of config sources found' — this provides COV-005 coverage and is diagnostically useful for debugging missing-config scenarios.
- CDQ-007: options.cwd is a raw filesystem path and was intentionally omitted from span attributes to avoid setting potentially sensitive user directory values.

## Advisory Findings
- CDQ-007 (Attribute Data Quality):37: CDQ-007: setAttribute value "options.recursive" at line 37 accesses a property of "options" without a null/undefined guard. If "options" can be null or undefined, this will throw at runtime. Add an `if (options)` check or use optional chaining (`options?.recursive`).
- SCH-004 (No Redundant Schema Entries):59: Attribute key "taze.config.sources_count" at line 59 appears to be a semantic duplicate of an existing registry entry (judge confidence: 72%). Use 'taze.config.sources' instead of 'taze.config.sources_count', or align naming with the established pattern: 'taze.check.packages_total' uses '_total' suffix rather than '_count'. Consider 'taze.config.sources_total' for consistency with registry conventions.
