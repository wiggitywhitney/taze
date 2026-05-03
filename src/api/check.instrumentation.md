# Instrumentation Report: src/api/check.ts

## Summary
- **Status**: success
- **Spans added**: 1
- **Attempts**: 1 (initial-generation)
- **Input tokens**: 0.9K
- **Output tokens**: 6.3K
- **Cached tokens**: 15.2K

## Schema Extensions
- `span.taze.check.run`

## Validation Journey
1. **Attempt 1**: 0 errors

## Notes
- CheckSingleProject is an unexported internal function orchestrated by CheckPackages — it is skipped per RST-004 (instrument the exported orchestrator, not unexported helpers; the I/O inside CheckSingleProject becomes a child of the CheckPackages span through context propagation).
- Span name 'taze.check.run' is invented (no span definitions exist in the registry) and reported as a schema extension. It follows the taze namespace and the check category established by the attribute group 'registry.taze.check'.
- options.write is guarded with '!= null' before setting 'taze.check.write_mode' because the property is optional on CheckOptions (it may be undefined when the flag is not passed).
- packages_outdated is computed after queueContext.run completes — at that point all packages have their resolved arrays populated by CheckSingleProject, so the reduce is safe. The CDQ-006 isRecording guard is not applied because CheckPackages is the service entry-point span (entry-point exemption).

## Advisory Findings
- COV-004 (Async Operation Spans):84: "CheckSingleProject" (async function) at line 84 has no span. Async functions and await expressions require spans for latency tracking and error visibility. Add a span wrapping this function's body.
- CDQ-007 (Attribute Data Quality):30: CDQ-007: setAttribute value "packages.length" at line 30 accesses a property of "packages" without a null/undefined guard. If "packages" can be null or undefined, this will throw at runtime. Add an `if (packages)` check or use optional chaining (`packages?.length`).
- CDQ-007 (Attribute Data Quality):32: CDQ-007: setAttribute value "options.write" at line 32 accesses a property of "options" without a null/undefined guard. If "options" can be null or undefined, this will throw at runtime. Add an `if (options)` check or use optional chaining (`options?.write`).
