# Instrumentation Report: src/commands/check/checkGlobal.ts

## Summary
- **Status**: success
- **Spans added**: 1
- **Attempts**: 1 (initial-generation)
- **Input tokens**: 1.8K
- **Output tokens**: 8.1K

## Schema Extensions
- `span.taze.check.global`

## Validation Journey
1. **Attempt 1**: 0 errors

## Notes
- checkGlobal is the sole exported entry point and receives the span 'taze.check.global'. The schema-defined span name 'taze.check' (span.taze.check) was already claimed by an earlier file in this instrumentation run, so a unique name 'taze.check.global' was invented to avoid collision with a different operation.
- loadGlobalNpmPackage, loadGlobalPnpmPackage, and installPkg are all unexported async functions with I/O (exec calls). They are skipped per RST-004 — unexported helpers' I/O becomes child spans of the enclosing exported orchestrator checkGlobal through context propagation.
- taze.check.packages_total is set after the pkgs array is flattened, summing deps lengths across all detected global package managers. taze.check.packages_outdated is set after resolvePackage completes, counting resolved entries with update=true. Both use reduce on existing in-scope variables and are legitimate instrumentation additions.
- options.mode is guarded with != null before setAttribute because CheckOptions.mode may be optional or undefined at runtime, and passing undefined to setAttribute produces no-op behavior rather than a useful attribute value.
- taze.check.recursive is a registered schema attribute but is not referenced in this file's logic — CheckOptions.recursive is not accessed anywhere in checkGlobal, so setting it here would require guessing at the field's availability and was intentionally omitted to avoid potential undefined attribute values.

## Advisory Findings
- COV-004 (Async Operation Spans):140: "loadGlobalPnpmPackage" (async function) at line 140 has no span. Async functions and await expressions require spans for latency tracking and error visibility. Add a span wrapping this function's body.
- COV-004 (Async Operation Spans):179: "loadGlobalNpmPackage" (async function) at line 179 has no span. Async functions and await expressions require spans for latency tracking and error visibility. Add a span wrapping this function's body.
- COV-004 (Async Operation Spans):210: "installPkg" (async function) at line 210 has no span. Async functions and await expressions require spans for latency tracking and error visibility. Add a span wrapping this function's body.
- CDQ-006 (isRecording Guard):51: setAttribute value "pkgs.reduce((acc, pkg) => acc + pkg.deps..." at line 51 has an expensive computation without span.isRecording() guard. Wrap expensive attribute computations in an if (span.isRecording()) check to avoid unnecessary computation when the span is not being sampled.
- CDQ-006 (isRecording Guard):76: setAttribute value "resolvePkgs.reduce((acc, pkg) => acc + p..." at line 76 has an expensive computation without span.isRecording() guard. Wrap expensive attribute computations in an if (span.isRecording()) check to avoid unnecessary computation when the span is not being sampled.
- CDQ-007 (Attribute Data Quality):41: CDQ-007: setAttribute value "options.mode" at line 41 accesses a property of "options" without a null/undefined guard. If "options" can be null or undefined, this will throw at runtime. Add an `if (options)` check or use optional chaining (`options?.mode`).
- SCH-001 (Span Names Match Registry):35: SCH-001 check failed: "taze.check.global" at line 35: not found in registry span definitions.
Available registry operations: taze.check, taze.cli.action
Span names must match an operation defined in the Weaver telemetry registry. Either use a registered operation name or add a new span definition to the registry.
