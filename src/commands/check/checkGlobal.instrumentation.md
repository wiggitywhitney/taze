# Instrumentation Report: src/commands/check/checkGlobal.ts

## Summary
- **Status**: success
- **Spans added**: 1
- **Attempts**: 1 (initial-generation)
- **Input tokens**: 1.8K
- **Output tokens**: 10.0K

## Schema Extensions
- `span.taze.check.global`

## Validation Journey
1. **Attempt 1**: 0 errors

## Notes
- checkGlobal is the only exported function and receives the single span `taze.check.global`. The schema-defined span name `taze.check.run` is already reserved by another file in this run, so a new name was invented — `taze.check.global` differentiates it as the global-packages variant of the check operation.
- loadGlobalPnpmPackage, loadGlobalNpmPackage, and installPkg are all unexported async functions that make exec subprocess calls. They are skipped per RST-004: the exported orchestrator `checkGlobal` provides the active span context, so their I/O paths are covered as child operations through context propagation.
- taze.check.packages_total and taze.check.packages_outdated are set after resolvePackage has populated each pkg.resolved array, ensuring accurate counts. They use registered schema keys directly with no new attribute keys needed.
- options.mode is guarded with `!= null` before setAttribute because CheckOptions.mode may be optional; the code path `if (options.mode === 'default')` confirms it can be absent. The value 'default' does not appear in the schema enum (patch/minor/major/newest/latest) but is valid as a raw string attribute value — the schema enum is advisory, not enforced at runtime.

## Advisory Findings
- COV-004 (Async Operation Spans):137: "loadGlobalPnpmPackage" (async function) at line 137 has no span. Async functions and await expressions require spans for latency tracking and error visibility. Add a span wrapping this function's body.
- COV-004 (Async Operation Spans):176: "loadGlobalNpmPackage" (async function) at line 176 has no span. Async functions and await expressions require spans for latency tracking and error visibility. Add a span wrapping this function's body.
- COV-004 (Async Operation Spans):207: "installPkg" (async function) at line 207 has no span. Async functions and await expressions require spans for latency tracking and error visibility. Add a span wrapping this function's body.
- CDQ-006 (isRecording Guard):66: setAttribute value "resolvePkgs.reduce((sum, pkg) => sum + p..." at line 66 has an expensive computation without span.isRecording() guard. Wrap expensive attribute computations in an if (span.isRecording()) check to avoid unnecessary computation when the span is not being sampled.
- CDQ-006 (isRecording Guard):67: setAttribute value "resolvePkgs.reduce((sum, pkg) => sum + p..." at line 67 has an expensive computation without span.isRecording() guard. Wrap expensive attribute computations in an if (span.isRecording()) check to avoid unnecessary computation when the span is not being sampled.
- CDQ-007 (Attribute Data Quality):41: CDQ-007: setAttribute value "options.mode" at line 41 accesses a property of "options" without a null/undefined guard. If "options" can be null or undefined, this will throw at runtime. Add an `if (options)` check or use optional chaining (`options?.mode`).
- SCH-001 (Span Names Match Registry): SCH-001: declared span extension "taze.check.global" may be a semantic duplicate of existing registry operation "taze.check.run". If these operations are equivalent, reuse "taze.check.run" instead of declaring a new extension. If they are a different operation class, this advisory can be ignored.
