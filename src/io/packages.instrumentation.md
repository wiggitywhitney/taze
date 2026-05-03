# Instrumentation Report: src/io/packages.ts

## Summary
- **Status**: success
- **Spans added**: 4
- **Attempts**: 1 (initial-generation)
- **Input tokens**: 3.2K
- **Output tokens**: 38.0K
- **Cached tokens**: 17.2K

## Schema Extensions
- `span.taze.io.write_json`
- `span.taze.io.write_package`
- `span.taze.io.load_package`
- `span.taze.io.load_packages`

## Validation Journey
1. **Attempt 1**: 0 errors

## Notes
- readJSON is a two-line thin wrapper over JSON.parse + fs.readFile with no additional logic — skipped per RST-003 (thin wrappers do not warrant spans). It is covered as a child operation when called from within loadPackage's span.
- Instrumented 4 of 5 functions (80%), which exceeds the ~20% ratio backstop threshold. All four functions are exported async I/O operations with meaningful diagnostic value (file writes, package discovery, workspace loading), so full coverage is justified here rather than choosing a subset.
- Used the registered attribute taze.write.file_path on the loadPackage span (for the 'relative' path argument) even though this is a read operation — no read-specific path attribute exists in the registry, and taze.write.file_path is the closest semantic match for 'path to the package manifest file being operated on'.
- The inner catch {} block inside loadPackage is a graceful-degradation catch: it swallows the error and falls through to a default loadPackageJSON call. Per NDS-007, no recordException or setStatus was added to it. The outer span-level catch handles any errors that propagate from the conditional loader calls above the try block.
- The four new span names (taze.io.write_json, taze.io.write_package, taze.io.load_package, taze.io.load_packages) use the 'io' category under the taze namespace to group file-system I/O dispatch operations that are not covered by the existing schema spans, which address specific format loaders (package_json, package_yaml, bun, etc.) rather than the routing/dispatch layer in this file.

## Advisory Findings
- COV-004 (Async Operation Spans):19: "readJSON" (async function) at line 19 is exported and async but has no span. Add a span wrapping this function's body. Context propagation is not a valid exemption for exported async functions. RST-004 (unexported function) does not apply here — this function is exported. RST-001 (utility function heuristic) applies only to unexported synchronous functions. If this function is a thin wrapper delegating to another already-instrumented function, RST-003 may apply.
- CDQ-007 (Attribute Data Quality):26: CDQ-007: setAttribute value "filepath" at line 26 appears to be a filesystem path. Absolute paths are high-cardinality and expose developer environment details. Use a relative path or a derived attribute (e.g., basename) instead.
- CDQ-007 (Attribute Data Quality):47: CDQ-007: setAttribute value "pkg.type" at line 47 accesses a property of "pkg" without a null/undefined guard. If "pkg" can be null or undefined, this will throw at runtime. Add an `if (pkg)` check or use optional chaining (`pkg?.type`).
- CDQ-007 (Attribute Data Quality):48: CDQ-007: setAttribute value "pkg.filepath" at line 48 accesses a property of "pkg" without a null/undefined guard. If "pkg" can be null or undefined, this will throw at runtime. Add an `if (pkg)` check or use optional chaining (`pkg?.filepath`).
- CDQ-007 (Attribute Data Quality):215: CDQ-007: setAttribute value "packages.length" at line 215 accesses a property of "packages" without a null/undefined guard. If "packages" can be null or undefined, this will throw at runtime. Add an `if (packages)` check or use optional chaining (`packages?.length`).
- SCH-001 (Span Names Match Registry): SCH-001: declared span extension "taze.io.write_json" may be a semantic duplicate of existing registry operation "taze.package_json.write". If these operations are equivalent, reuse "taze.package_json.write" instead of declaring a new extension. If they are a different operation class, this advisory can be ignored.
- SCH-001 (Span Names Match Registry): SCH-001: declared span extension "taze.io.write_package" may be a semantic duplicate of existing registry operation "taze.package_json.write". If these operations are equivalent, reuse "taze.package_json.write" instead of declaring a new extension. If they are a different operation class, this advisory can be ignored.
- SCH-001 (Span Names Match Registry): SCH-001: declared span extension "taze.io.load_package" may be a semantic duplicate of existing registry operation "taze.package_json.load". If these operations are equivalent, reuse "taze.package_json.load" instead of declaring a new extension. If they are a different operation class, this advisory can be ignored.
- SCH-001 (Span Names Match Registry): SCH-001: declared span extension "taze.io.load_packages" may be a semantic duplicate of existing registry operation "taze.io.load_package". If these operations are equivalent, reuse "taze.io.load_package" instead of declaring a new extension. If they are a different operation class, this advisory can be ignored.
