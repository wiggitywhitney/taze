# Instrumentation Report: src/api/check.ts

## Summary
- **Status**: success
- **Spans added**: 1
- **Attempts**: 1 (initial-generation)
- **Input tokens**: 0.9K
- **Output tokens**: 3.9K
- **Cached tokens**: 14.7K

## Schema Extensions
- `span.taze.check`

## Validation Journey
1. **Attempt 1**: 0 errors

## Notes
- CheckPackages is the sole exported async entry point and receives a span named 'taze.check'. The schema defines no span groups, so this name is an extension following the taze namespace convention.
- taze.check.packages_total and taze.check.packages_outdated are computed after queueContext.run completes so that all resolved arrays are fully populated; the reduce computations are new instrumentation-supporting lines added purely to derive registered schema attribute values.
- CheckSingleProject is an unexported internal async function that orchestrates IO helpers — it is skipped per RST-004 (no spans on unexported functions). Its IO operations (resolvePackage, writePackage) become children of the CheckPackages span through context propagation via startActiveSpan.
- options.mode, options.recursive, and options.write are guarded with != null before setAttribute because CheckOptions may not define all fields as required, and passing undefined to setAttribute is a CDQ-007 violation.

## Advisory Findings
- COV-004 (Async Operation Spans):86: "CheckSingleProject" (async function) at line 86 has no span. Async functions and await expressions require spans for latency tracking and error visibility. Add a span wrapping this function's body.
- CDQ-007 (Attribute Data Quality):24: CDQ-007: setAttribute value "options.mode" at line 24 accesses a property of "options" without a null/undefined guard. If "options" can be null or undefined, this will throw at runtime. Add an `if (options)` check or use optional chaining (`options?.mode`).
- CDQ-007 (Attribute Data Quality):26: CDQ-007: setAttribute value "options.recursive" at line 26 accesses a property of "options" without a null/undefined guard. If "options" can be null or undefined, this will throw at runtime. Add an `if (options)` check or use optional chaining (`options?.recursive`).
- CDQ-007 (Attribute Data Quality):28: CDQ-007: setAttribute value "options.write" at line 28 accesses a property of "options" without a null/undefined guard. If "options" can be null or undefined, this will throw at runtime. Add an `if (options)` check or use optional chaining (`options?.write`).
- SCH-001 (Span Names Match Registry):21: SCH-001 check failed: "taze.check" at line 21 does not follow naming conventions (judge confidence: 85%). Rename span to follow a structured dotted notation convention. For example, 'taze.check.validate' or 'taze.security.check' would be more descriptive. The current name 'taze.check' lacks an operation component and could be more specific about what check is being performed (e.g., permission check, syntax check, authentication check).
