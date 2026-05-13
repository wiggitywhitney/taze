# Instrumentation Report: src/io/packageJson.ts

## Summary
- **Status**: success
- **Spans added**: 2
- **Attempts**: 1 (initial-generation)
- **Input tokens**: 1.3K
- **Output tokens**: 9.3K

## Schema Extensions
- `span.taze.package_json.load`
- `span.taze.package_json.write`

## Validation Journey
1. **Attempt 1**: 0 errors

## Notes
- isDepFieldEnabled is an unexported synchronous helper that performs only boolean logic — no span added (RST-004: unexported functions, RST-001: pure synchronous utility).
- taze.write.file_path is registered under the write attribute group, but the concept of a manifest file path applies equally to the load operation in loadPackageJSON. No load-specific file path attribute exists in the registry, so the write-scoped key is reused as the closest semantic match for both load and write spans.
- taze.check.packages_total is registered as 'total number of dependency entries checked across all package.json files', but the closest semantically available key for the per-file dep count produced by loadPackageJSON. No per-file dep count attribute exists in the registry.
- pkg.filepath and the local filepath variable are raw filesystem paths. CDQ-007 recommends using path.basename() but pathe's basename is not imported — using raw values and noting as known limitation per CDQ-007 import constraint.
- type: 'package.json' as const is added to the return object literal inside the async callback to prevent TypeScript from widening the discriminant field to string and producing a TS2322 assignment error against the PackageMeta union.

## Advisory Findings
- CDQ-007 (Attribute Data Quality):60: CDQ-007: setAttribute value "filepath" at line 60 appears to be a filesystem path. Absolute paths are high-cardinality and expose developer environment details. Use a relative path or a derived attribute (e.g., basename) instead.
- CDQ-007 (Attribute Data Quality):61: CDQ-007: setAttribute value "deps.length" at line 61 accesses a property of "deps" without a null/undefined guard. If "deps" can be null or undefined, this will throw at runtime. Add an `if (deps)` check or use optional chaining (`deps?.length`).
- CDQ-007 (Attribute Data Quality):94: CDQ-007: setAttribute value "pkg.filepath" at line 94 accesses a property of "pkg" without a null/undefined guard. If "pkg" can be null or undefined, this will throw at runtime. Add an `if (pkg)` check or use optional chaining (`pkg?.filepath`).
