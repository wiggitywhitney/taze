# Instrumentation Report: src/io/packages.ts

## Summary
- **Status**: success
- **Spans added**: 3
- **Attempts**: 1 (initial-generation)
- **Input tokens**: 2.7K
- **Output tokens**: 33.8K
- **Cached tokens**: 17.2K

## Schema Extensions
- `span.taze.packages.write_json`
- `span.taze.packages.load_package`
- `span.taze.packages.load_packages`

## Validation Journey
1. **Attempt 1**: 0 errors

## Notes
- readJSON is a 2-line utility (JSON.parse + fs.readFile) — skipped as a thin wrapper with no branching or diagnostic value (RST-003: no spans on thin wrappers delegating to a single call).
- writePackage is a switch-based dispatcher that purely delegates to already-instrumented writer functions (writePackageJSON, writePackageYAML, etc.) — skipped per RST-003. Each delegate function handles its own span.
- The inner try/catch inside loadPackage (in the package.json branch) is a graceful fallback that swallows read errors and falls through to loadPackageJSON. It does not propagate the error, so no recordException or setStatus was added to it (NDS-007). The outer span catch only fires for errors that escape the outer try block.
- Three new span names were created (taze.packages.write_json, taze.packages.load_package, taze.packages.load_packages) because no schema-defined spans covered these operations — all matching names (taze.package_json.load, taze.package_json.write, taze.check_packages) were already claimed by earlier files in this instrumentation run.
- All attributes used (taze.write.file_path, taze.package_json.filepath, taze.check.recursive, taze.check.packages_total) are from the existing Weaver registry — no new attribute keys were invented.

## Advisory Findings
- COV-004 (Async Operation Spans):19: "readJSON" (async function) at line 19 is exported and async but has no span. Add a span wrapping this function's body. Context propagation is not a valid exemption for exported async functions. RST-004 (unexported function) does not apply here — this function is exported. RST-001 (utility function heuristic) applies only to unexported synchronous functions. If this function is a thin wrapper delegating to another already-instrumented function, RST-003 may apply.
- COV-004 (Async Operation Spans):43: "writePackage" (async function) at line 43 is exported and async but has no span. Add a span wrapping this function's body. Context propagation is not a valid exemption for exported async functions. RST-004 (unexported function) does not apply here — this function is exported. RST-001 (utility function heuristic) applies only to unexported synchronous functions. If this function is a thin wrapper delegating to another already-instrumented function, RST-003 may apply.
- CDQ-007 (Attribute Data Quality):26: CDQ-007: setAttribute value "filepath" at line 26 appears to be a filesystem path. Absolute paths are high-cardinality and expose developer environment details. Use a relative path or a derived attribute (e.g., basename) instead.
- CDQ-007 (Attribute Data Quality):207: CDQ-007: setAttribute value "packages.length" at line 207 accesses a property of "packages" without a null/undefined guard. If "packages" can be null or undefined, this will throw at runtime. Add an `if (packages)` check or use optional chaining (`packages?.length`).
