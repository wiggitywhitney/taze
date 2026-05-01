# Instrumentation Report: src/api/check.ts

## Summary
- **Status**: success
- **Spans added**: 1
- **Attempts**: 1 (initial-generation)
- **Input tokens**: 0.9K
- **Output tokens**: 3.7K
- **Cached tokens**: 15.1K

## Schema Extensions
- `span.taze.check_packages`

## Validation Journey
1. **Attempt 1**: 0 errors

## Notes
- CheckSingleProject is an unexported async function that performs I/O (resolvePackage, writePackage). It is skipped because CheckPackages, the exported orchestrator, already covers its execution path via context propagation (RST-004: do not add spans to unexported internal functions when an exported orchestrator spans the path).
- The span name 'taze.check_packages' is a schema extension — the schema defines only attribute groups (registry.taze.check, etc.) but no span definitions. The namespace 'taze' is derived from the schema's registered attribute prefixes.
- taze.check.packages_outdated is computed after queueContext.run completes by summing resolved dependencies with update=true across all packages. This placement ensures all package checks have run before the count is recorded.
- Options properties (mode, recursive, write) are guarded with != null checks because CheckOptions is an imported type and these fields may be optional in practice; the guards prevent passing undefined to setAttribute.

## Advisory Findings
- COV-004 (Async Operation Spans):85: "CheckSingleProject" (async function) at line 85 has no span. Async functions and await expressions require spans for latency tracking and error visibility. Add a span wrapping this function's body.
- CDQ-007 (Attribute Data Quality):30: CDQ-007: setAttribute value "packages.length" at line 30 accesses a property of "packages" without a null/undefined guard. If "packages" can be null or undefined, this will throw at runtime. Add an `if (packages)` check or use optional chaining (`packages?.length`).
- CDQ-007 (Attribute Data Quality):32: CDQ-007: setAttribute value "options.mode" at line 32 accesses a property of "options" without a null/undefined guard. If "options" can be null or undefined, this will throw at runtime. Add an `if (options)` check or use optional chaining (`options?.mode`).
- CDQ-007 (Attribute Data Quality):34: CDQ-007: setAttribute value "options.recursive" at line 34 accesses a property of "options" without a null/undefined guard. If "options" can be null or undefined, this will throw at runtime. Add an `if (options)` check or use optional chaining (`options?.recursive`).
- CDQ-007 (Attribute Data Quality):36: CDQ-007: setAttribute value "options.write" at line 36 accesses a property of "options" without a null/undefined guard. If "options" can be null or undefined, this will throw at runtime. Add an `if (options)` check or use optional chaining (`options?.write`).
