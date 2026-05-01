# Instrumentation Report: src/io/packageJson.ts

## Summary
- **Status**: success
- **Spans added**: 2
- **Attempts**: 1 (initial-generation)
- **Input tokens**: 1.3K
- **Output tokens**: 8.4K

## Schema Extensions
- `span.taze.package_json.load`
- `span.taze.package_json.write`
- `taze.package_json.filepath`

## Validation Journey
1. **Attempt 1**: 0 errors

## Notes
- isDepFieldEnabled is a pure synchronous helper with no I/O — it is skipped (RST-001: no spans on synchronous utilities with no external operations).
- Two new span names were invented — taze.package_json.load and taze.package_json.write — because no schema span matched these specific package.json read/write operations. All existing schema spans cover check, CLI, config, and bun-workspace operations.
- The attribute taze.package_json.filepath was invented for the load span because the only registered path attribute, taze.write.file_path, is explicitly described as 'the path to the package manifest file *written*' — using it for a read/load operation would be a semantic mismatch. The new attribute captures the resolved absolute path of the package.json being loaded.
- In loadPackageJSON, type: 'package.json' as const was added to the returned object literal to prevent TypeScript from widening the discriminant string literal to string inside the async startActiveSpan callback, which would break the PackageMeta union type assignment.
- taze.check.packages_total (a registered attribute) is set to deps.length after the dependency-parsing loop in loadPackageJSON — it captures the total number of dependency entries discovered across all dep field types in this package.json.

## Advisory Findings
- CDQ-007 (Attribute Data Quality):42: CDQ-007: setAttribute value "filepath" at line 42 appears to be a filesystem path. Absolute paths are high-cardinality and expose developer environment details. Use a relative path or a derived attribute (e.g., basename) instead.
- CDQ-007 (Attribute Data Quality):65: CDQ-007: setAttribute value "deps.length" at line 65 accesses a property of "deps" without a null/undefined guard. If "deps" can be null or undefined, this will throw at runtime. Add an `if (deps)` check or use optional chaining (`deps?.length`).
- CDQ-007 (Attribute Data Quality):96: CDQ-007: setAttribute value "pkg.filepath" at line 96 accesses a property of "pkg" without a null/undefined guard. If "pkg" can be null or undefined, this will throw at runtime. Add an `if (pkg)` check or use optional chaining (`pkg?.filepath`).
- SCH-004 (No Redundant Schema Entries):42: Attribute key "taze.package_json.filepath" at line 42 appears to be a semantic duplicate of an existing registry entry (judge confidence: 92%). Use the existing registered key "taze.write.file_path" instead of "taze.package_json.filepath". Both attributes capture the file path concept within the taze domain, with "taze.write.file_path" being the semantically equivalent registered key that should be used for consistency.
