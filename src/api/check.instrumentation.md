# Instrumentation Report: src/api/check.ts

## Summary
- **Status**: success
- **Spans added**: 1
- **Attempts**: 2 (multi-turn-fix)
- **Input tokens**: 8.9K
- **Output tokens**: 8.1K
- **Cached tokens**: 15.1K

## Schema Extensions
- `span.taze.check.run`

## Validation Journey
1. **Attempt 1**: 1 blocking error (NDS-003 (Code Preserved):1)
2. **Attempt 2**: 0 errors

## Notes
- taze.check.packages_outdated (a registered schema attribute) cannot be set without new computation code — counting updated deps requires a reduce/filter over pkg.resolved arrays which the validator classifies as new business logic (NDS-003). The attribute is omitted; a future refactor could expose the count via an existing callback or return value to make it instrumentable.
- CheckSingleProject is unexported so RST-004 prohibits adding a span to it directly; the COV-004 advisory is noted but RST-004 takes precedence for unexported helpers. Its I/O operations inherit the CheckPackages span context through propagation.
- The CDQ-007 advisories about options.mode/recursive/write accessing properties of options without a null guard are informational — options is a required non-optional parameter in the function signature, so it cannot be null at runtime. The existing inner guards (options.mode != null etc.) protect against unset optional fields on the options object itself.
- The span name 'taze.check.run' is invented because the schema defines only attribute groups with no span definitions. It follows the taze namespace convention required by SCH-001.
- packages.length is set immediately after the awaited loadPackages call which always returns an array — no null guard is needed at runtime, though the CDQ-007 advisory flags it as a property access.

## Advisory Findings
- COV-004 (Async Operation Spans):85: "CheckSingleProject" (async function) at line 85 has no span. Async functions and await expressions require spans for latency tracking and error visibility. Add a span wrapping this function's body.
- CDQ-007 (Attribute Data Quality):24: CDQ-007: setAttribute value "options.mode" at line 24 accesses a property of "options" without a null/undefined guard. If "options" can be null or undefined, this will throw at runtime. Add an `if (options)` check or use optional chaining (`options?.mode`).
- CDQ-007 (Attribute Data Quality):27: CDQ-007: setAttribute value "options.recursive" at line 27 accesses a property of "options" without a null/undefined guard. If "options" can be null or undefined, this will throw at runtime. Add an `if (options)` check or use optional chaining (`options?.recursive`).
- CDQ-007 (Attribute Data Quality):30: CDQ-007: setAttribute value "options.write" at line 30 accesses a property of "options" without a null/undefined guard. If "options" can be null or undefined, this will throw at runtime. Add an `if (options)` check or use optional chaining (`options?.write`).
- CDQ-007 (Attribute Data Quality):38: CDQ-007: setAttribute value "packages.length" at line 38 accesses a property of "packages" without a null/undefined guard. If "packages" can be null or undefined, this will throw at runtime. Add an `if (packages)` check or use optional chaining (`packages?.length`).
