# Instrumentation Report: src/io/packageYaml.ts

## Summary
- **Status**: success
- **Spans added**: 4
- **Attempts**: 1 (initial-generation)
- **Input tokens**: 1.5K
- **Output tokens**: 9.3K

## Schema Extensions
- `span.taze.package_yaml.read`
- `span.taze.package_yaml.write_file`
- `span.taze.package_yaml.load`
- `span.taze.package_yaml.write`

## Validation Journey
1. **Attempt 1**: 0 errors

## Notes
- isDepFieldEnabled is a pure synchronous boolean check with no I/O or async behavior — it was skipped per RST-001 (no spans on synchronous utilities).
- Four new span names were added for YAML-specific operations (taze.package_yaml.read, taze.package_yaml.write_file, taze.package_yaml.load, taze.package_yaml.write). The schema already defines taze.package_json.load and taze.package_json.write for JSON manifests, but these are a different file format class (YAML vs JSON), so reusing those names would misrepresent the operation — new names were registered as schema extensions.
- taze.write.file_path is used for the readYAML and loadPackageYAML spans even though its schema description says 'file written'. There is no read-specific file-path attribute in the schema, and this attribute captures the same data (path to the manifest file being operated on). Using it avoids an unregistered key while providing diagnostic value for both read and write contexts.
- The .catch(Object.create) chain inside writeYAML is a graceful fallback that handles missing files by returning an empty object, so no recordException or setStatus was added to it — it represents expected control flow, not a failure (NDS-007). Errors propagating past it are caught and recorded by the outer span catch block.
- The discriminated union return in loadPackageYAML uses 'package.yaml' as const on the type field to prevent TypeScript from widening the string literal to string inside the async startActiveSpan callback, which would otherwise produce a TS2322 type error.

## Advisory Findings
- CDQ-007 (Attribute Data Quality):31: CDQ-007: setAttribute value "filepath" at line 31 appears to be a filesystem path. Absolute paths are high-cardinality and expose developer environment details. Use a relative path or a derived attribute (e.g., basename) instead.
- CDQ-007 (Attribute Data Quality):58: CDQ-007: setAttribute value "filepath" at line 58 appears to be a filesystem path. Absolute paths are high-cardinality and expose developer environment details. Use a relative path or a derived attribute (e.g., basename) instead.
- CDQ-007 (Attribute Data Quality):112: CDQ-007: setAttribute value "filepath" at line 112 appears to be a filesystem path. Absolute paths are high-cardinality and expose developer environment details. Use a relative path or a derived attribute (e.g., basename) instead.
- CDQ-007 (Attribute Data Quality):113: CDQ-007: setAttribute value "deps.length" at line 113 accesses a property of "deps" without a null/undefined guard. If "deps" can be null or undefined, this will throw at runtime. Add an `if (deps)` check or use optional chaining (`deps?.length`).
- CDQ-007 (Attribute Data Quality):149: CDQ-007: setAttribute value "pkg.filepath" at line 149 accesses a property of "pkg" without a null/undefined guard. If "pkg" can be null or undefined, this will throw at runtime. Add an `if (pkg)` check or use optional chaining (`pkg?.filepath`).
- SCH-001 (Span Names Match Registry): SCH-001: declared span extension "taze.package_yaml.load" may be a semantic duplicate of existing registry operation "taze.package_yaml.read". If these operations are equivalent, reuse "taze.package_yaml.read" instead of declaring a new extension. If they are a different operation class, this advisory can be ignored.
- SCH-001 (Span Names Match Registry): SCH-001: declared span extension "taze.package_yaml.write" may be a semantic duplicate of existing registry operation "taze.package_yaml.write_file". If these operations are equivalent, reuse "taze.package_yaml.write_file" instead of declaring a new extension. If they are a different operation class, this advisory can be ignored.
