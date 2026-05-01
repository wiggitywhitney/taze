# Instrumentation Report: src/io/packageJson.ts

## Summary
- **Status**: success
- **Spans added**: 2
- **Attempts**: 2 (multi-turn-fix)
- **Input tokens**: 10.6K
- **Output tokens**: 9.8K
- **Cached tokens**: 30.4K

## Schema Extensions
- `span.taze.io.read_package_json`
- `span.taze.io.write_package_json`

## Validation Journey
1. **Attempt 1**: 2 blocking errors (SCH-001 (Span Names Match Registry):2)
2. **Attempt 2**: 0 errors

## Notes
- isDepFieldEnabled is a pure synchronous helper with no I/O — skipped (RST-001).
- Renamed the loadPackageJSON span from taze.io.load_package_json to taze.io.read_package_json to resolve the SCH-001 semantic-duplicate rejection. The previous name was too close to the write counterpart; 'read' more clearly distinguishes the operation.
- CDQ-007 advisory for filepath: switched from the resolved absolute filepath to the relative parameter for the taze.write.file_path attribute in loadPackageJSON, avoiding high-cardinality developer-environment paths.
- taze.write.changes_count is not set in writePackageJSON because the original code tracks changes only as a boolean flag — an accurate count would require modifying business logic (NDS-003).
- taze.write.file_path is reused in the read span (loadPackageJSON) since no read-specific path attribute exists in the registry. The attribute captures the manifest file path concept regardless of read/write direction.

## Advisory Findings
- CDQ-007 (Attribute Data Quality):44: CDQ-007: setAttribute value "raw.name" at line 44 accesses a property of "raw" without a null/undefined guard. If "raw" can be null or undefined, this will throw at runtime. Add an `if (raw)` check or use optional chaining (`raw?.name`).
- CDQ-007 (Attribute Data Quality):65: CDQ-007: setAttribute value "deps.length" at line 65 accesses a property of "deps" without a null/undefined guard. If "deps" can be null or undefined, this will throw at runtime. Add an `if (deps)` check or use optional chaining (`deps?.length`).
- CDQ-007 (Attribute Data Quality):95: CDQ-007: setAttribute value "pkg.filepath" at line 95 accesses a property of "pkg" without a null/undefined guard. If "pkg" can be null or undefined, this will throw at runtime. Add an `if (pkg)` check or use optional chaining (`pkg?.filepath`).
