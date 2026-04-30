# Instrumentation Report: src/commands/check/checkGlobal.ts

## Summary
- **Status**: success
- **Spans added**: 1
- **Attempts**: 1 (initial-generation)
- **Input tokens**: 1.8K
- **Output tokens**: 7.4K

## Schema Extensions
- `span.taze.check_global`

## Validation Journey
1. **Attempt 1**: 0 errors

## Notes
- checkGlobal is the sole exported async function and serves as the entry point for global dependency checking — it receives a span named 'taze.check_global' (a new schema extension, since 'taze.check_packages' was already used by an earlier file in this run and cannot be reused here).
- loadGlobalPnpmPackage, loadGlobalNpmPackage, and installPkg are all unexported async functions whose I/O paths are fully covered by the checkGlobal parent span — they are skipped per RST-004 (unexported helpers should not be instrumented when an exported orchestrator already covers their execution path).
- The catch block inside loadGlobalPnpmPackage (which returns [] when pnpm is not installed) is a graceful-degradation catch that does not propagate the error — error recording was intentionally not added per NDS-007.
- taze.check.packages_total and taze.check.packages_outdated are computed after all packages are resolved and use pkg.deps.length and resolved.filter(j => j.update).length respectively — both are schema-registered int attributes. The counts reflect the global dep totals across all detected package managers (npm + pnpm).
- options.mode is guarded with != null before setAttribute because CheckOptions.mode may allow undefined; options.write is always coerced to boolean via !! since the attribute type requires boolean and the value may be undefined/null/false.

## Advisory Findings
- COV-004 (Async Operation Spans):139: "loadGlobalPnpmPackage" (async function) at line 139 has no span. Async functions and await expressions require spans for latency tracking and error visibility. Add a span wrapping this function's body.
- COV-004 (Async Operation Spans):178: "loadGlobalNpmPackage" (async function) at line 178 has no span. Async functions and await expressions require spans for latency tracking and error visibility. Add a span wrapping this function's body.
- COV-004 (Async Operation Spans):209: "installPkg" (async function) at line 209 has no span. Async functions and await expressions require spans for latency tracking and error visibility. Add a span wrapping this function's body.
- CDQ-007 (Attribute Data Quality):41: CDQ-007: setAttribute value "options.mode" at line 41 accesses a property of "options" without a null/undefined guard. If "options" can be null or undefined, this will throw at runtime. Add an `if (options)` check or use optional chaining (`options?.mode`).
- SCH-001 (Span Names Match Registry):35: SCH-001 check failed: "taze.check_global" at line 35: not found in registry span definitions.
Available registry operations: taze.check_packages, taze.cli.run
Span names must match an operation defined in the Weaver telemetry registry. Either use a registered operation name or add a new span definition to the registry.
