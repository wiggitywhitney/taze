# Instrumentation Report: src/io/packageYaml.ts

## Summary
- **Status**: success
- **Spans added**: 4
- **Attempts**: 1 (initial-generation)
- **Input tokens**: 1.5K
- **Output tokens**: 9.2K

## Schema Extensions
- `span.taze.read_yaml`
- `span.taze.write_yaml`
- `span.taze.package_yaml.load`
- `span.taze.package_yaml.write`

## Validation Journey
1. **Attempt 1**: 0 errors

## Notes
- isDepFieldEnabled is a pure synchronous boolean check with no I/O — skipped per RST-001 (no spans on synchronous utilities with no async work).
- taze.package_json.filepath is reused for readYAML and loadPackageYAML even though this file handles YAML manifests — it is the only registered attribute key that semantically captures a package manifest filepath. No separate taze.package_yaml.filepath key exists in the schema.
- pkg.filepath and filepath are raw filesystem paths passed to taze.write.file_path and taze.package_json.filepath attributes. CDQ-007 recommends using path.basename() but neither basename nor a path utility that provides it is already imported in this file (only resolve from pathe is imported), so raw paths are used as a known limitation.
- In loadPackageYAML, the return object literal uses 'package.yaml' as const on the type field to prevent TypeScript from widening the string literal to string inside the async callback, which would cause a TS2322 error against the PackageMeta discriminated union.
- The .catch(Object.create) chain in writeYAML is a graceful degradation catch for missing-file indentation detection — NDS-007 prohibits adding recordException or setStatus to it since it swallows the error and does not propagate. It survives intact inside the outer span try block.

## Advisory Findings
- CDQ-007 (Attribute Data Quality):31: CDQ-007: setAttribute value "filepath" at line 31 appears to be a filesystem path. Absolute paths are high-cardinality and expose developer environment details. Use a relative path or a derived attribute (e.g., basename) instead.
- CDQ-007 (Attribute Data Quality):56: CDQ-007: setAttribute value "filepath" at line 56 appears to be a filesystem path. Absolute paths are high-cardinality and expose developer environment details. Use a relative path or a derived attribute (e.g., basename) instead.
- CDQ-007 (Attribute Data Quality):88: CDQ-007: setAttribute value "filepath" at line 88 appears to be a filesystem path. Absolute paths are high-cardinality and expose developer environment details. Use a relative path or a derived attribute (e.g., basename) instead.
- CDQ-007 (Attribute Data Quality):141: CDQ-007: setAttribute value "pkg.filepath" at line 141 accesses a property of "pkg" without a null/undefined guard. If "pkg" can be null or undefined, this will throw at runtime. Add an `if (pkg)` check or use optional chaining (`pkg?.filepath`).
