# Instrumentation Report: src/config.ts

## Summary
- **Status**: success
- **Spans added**: 1
- **Attempts**: 2 (multi-turn-fix)
- **Input tokens**: 4.4K
- **Output tokens**: 3.9K

## Schema Extensions
- `span.taze.config.resolve`

## Validation Journey
1. **Attempt 1**: 1 blocking error (NDS-001 (Syntax Valid):1)
2. **Attempt 2**: 0 errors

## Notes
- Removed taze.check.mode and taze.check.write_mode attribute accesses — tsc reported that 'mode' and 'write' do not exist on CommonOptions, so those attributes were dropped to fix the blocking type error.
- normalizeConfig is an unexported synchronous pure-transformation helper with no I/O — skipped (RST-001 + RST-004).
- resolveConfig is the exported async entry point doing filesystem I/O via unconfig's loader.load() — it receives the span 'taze.config.resolve', a new schema extension since no existing schema span covers config file discovery.
- taze.check.recursive is retained as it exists on CommonOptions and is a registered schema attribute that is semantically relevant to the resolved options.

## Advisory Findings
- CDQ-007 (Attribute Data Quality):37: CDQ-007: setAttribute value "options.recursive" at line 37 accesses a property of "options" without a null/undefined guard. If "options" can be null or undefined, this will throw at runtime. Add an `if (options)` check or use optional chaining (`options?.recursive`).
