# Instrumentation Report: src/commands/check/checkGlobal.ts

## Summary
- **Status**: success
- **Spans added**: 1
- **Attempts**: 1 (initial-generation)
- **Input tokens**: 1.8K
- **Output tokens**: 8.2K

## Schema Extensions
- `span.taze.check.global`

## Validation Journey
1. **Attempt 1**: 0 errors

## Notes
- span.taze.check.global is a new span name invented for checkGlobal — the two schema-defined spans (taze.check.packages and taze.cli.run) are already claimed by earlier files and do not match this global-package check entry point, so a new name following the namespace convention was created and reported as a schemaExtension.
- loadGlobalNpmPackage, loadGlobalPnpmPackage, and installPkg are all unexported async functions that make exec calls — they are skipped (RST-004: unexported I/O helpers are covered by their exported orchestrator). All three execution paths flow through checkGlobal, which holds the root span and provides trace context for child operations.
- taze.check.recursive is a schema-registered attribute but is not referenced anywhere in checkGlobal.ts, meaning the field may not exist on CheckOptions or may be irrelevant to the global check flow. Setting it would risk a TypeScript compile error, so it is omitted. The other four schema check attributes (mode, write_mode, packages_total, packages_outdated) are all verifiable from in-scope variables.
- options.write and options.mode are guarded with != null before setAttribute to handle cases where these optional fields may be undefined at runtime, preventing undefined from being passed as an attribute value.

## Advisory Findings
- COV-004 (Async Operation Spans):138: "loadGlobalPnpmPackage" (async function) at line 138 has no span. Async functions and await expressions require spans for latency tracking and error visibility. Add a span wrapping this function's body.
- COV-004 (Async Operation Spans):177: "loadGlobalNpmPackage" (async function) at line 177 has no span. Async functions and await expressions require spans for latency tracking and error visibility. Add a span wrapping this function's body.
- COV-004 (Async Operation Spans):208: "installPkg" (async function) at line 208 has no span. Async functions and await expressions require spans for latency tracking and error visibility. Add a span wrapping this function's body.
- CDQ-006 (isRecording Guard):74: setAttribute value "resolvePkgs.reduce((sum, pkg) => sum + p..." at line 74 has an expensive computation without span.isRecording() guard. Wrap expensive attribute computations in an if (span.isRecording()) check to avoid unnecessary computation when the span is not being sampled.
- CDQ-006 (isRecording Guard):75: setAttribute value "resolvePkgs.reduce((sum, pkg) => sum + p..." at line 75 has an expensive computation without span.isRecording() guard. Wrap expensive attribute computations in an if (span.isRecording()) check to avoid unnecessary computation when the span is not being sampled.
- CDQ-007 (Attribute Data Quality):38: CDQ-007: setAttribute value "options.mode" at line 38 accesses a property of "options" without a null/undefined guard. If "options" can be null or undefined, this will throw at runtime. Add an `if (options)` check or use optional chaining (`options?.mode`).
- CDQ-007 (Attribute Data Quality):41: CDQ-007: setAttribute value "options.write" at line 41 accesses a property of "options" without a null/undefined guard. If "options" can be null or undefined, this will throw at runtime. Add an `if (options)` check or use optional chaining (`options?.write`).
- SCH-001 (Span Names Match Registry):35: SCH-001 check failed: "taze.check.global" at line 35: not found in registry span definitions.
Available registry operations: taze.check.packages, taze.cli.run
Span names must match an operation defined in the Weaver telemetry registry. Either use a registered operation name or add a new span definition to the registry.
