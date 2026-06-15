# Instrumentation Report: src/io/packageYaml.ts

## Summary
- **Status**: success
- **Spans added**: 4
- **Attempts**: 2 (multi-turn-fix)
- **Input tokens**: 12.5K
- **Output tokens**: 9.4K

## Schema Extensions
- `span.taze.io.read_yaml`
- `span.taze.io.write_yaml`
- `span.taze.io.load_package_yaml`
- `span.taze.io.write_package_yaml`

## Validation Journey
1. **Attempt 1**: 3 blocking errors (NDS-003 (Code Preserved):3)
2. **Attempt 2**: 0 errors

## Notes
- readYAML reads a YAML manifest from disk — instrumented with span taze.io.read_yaml (COV-001). Used taze.write.file_path for the filepath; no taze.read.file_path key exists in the registry. CDQ-007 advisory for filepath cardinality noted — basename utility is not imported in this file so raw filepath is used.
- writeYAML writes a YAML manifest to disk — instrumented with span taze.io.write_yaml. Used taze.write.file_path for the path and taze.write.package_type set to 'package.yaml'. CDQ-007 advisory for filepath noted — raw value used since path utilities are not already imported.
- loadPackageYAML loads and parses a package.yaml into PackageMeta — instrumented with span taze.io.load_package_yaml. The taze.package.name attribute is set via a separate setAttribute call after the loop, preserving the original return object literal exactly unchanged. Added 'as const' to the type field to prevent TypeScript from widening 'package.yaml' to string inside the async callback. deps is always an array (initialized to []) so the deps != null guard is a conservative defensive check.
- writePackageYAML writes updated dependency versions back to a package.yaml — instrumented with span taze.io.write_package_yaml. pkg is a required typed parameter (PackageMeta) so pkg != null is a conservative guard to address the CDQ-007 advisory. taze.cache.changed records whether any dependency entries were modified.
- isDepFieldEnabled is a synchronous pure helper with no I/O — skipped per RST-001 and RST-004. It is unexported and covered by its orchestrating callers.
- All four new span names are schema extensions because the registry defines spans for package.json and bun workspace operations but not for the package.yaml variants handled by this file.

## Advisory Findings
- CDQ-006 (isRecording Guard):114: CDQ-006 (isRecording Guard) fired because span.setAttribute() is called with an expensive computation (map, reduce, filter, JSON.stringify, etc.) or an external source string (value fetched from git output, an API response, file contents, or any source whose length is unbounded) and no span.isRecording() guard. When sampling drops the span, that work still runs on every request. Wrap the call in `if (span.isRecording()) { ... }` to skip it when the span won't be exported. Skip this finding for root spans at entry points — the guard adds clutter for negligible gain there.
- CDQ-007 (Attribute Data Quality):31: CDQ-007 (Attribute Data Quality) fired for one or more of: a PII attribute name (like author, email, or username) or a raw filesystem path where a basename would be safer. PII in traces can violate privacy policies and is worth fixing. The path finding is lower severity — fix it when the code will run in a context where the basename utility is already imported.
- CDQ-007 (Attribute Data Quality):58: CDQ-007 (Attribute Data Quality) fired for one or more of: a PII attribute name (like author, email, or username) or a raw filesystem path where a basename would be safer. PII in traces can violate privacy policies and is worth fixing. The path finding is lower severity — fix it when the code will run in a context where the basename utility is already imported.
- CDQ-007 (Attribute Data Quality):93: CDQ-007 (Attribute Data Quality) fired for one or more of: a PII attribute name (like author, email, or username) or a raw filesystem path where a basename would be safer. PII in traces can violate privacy policies and is worth fixing. The path finding is lower severity — fix it when the code will run in a context where the basename utility is already imported.
- SCH-001 (Span Names Match Registry): SCH-001 (Span Names Match Registry) fired because a span name doesn't match your Weaver registry or doesn't follow the required dotted-notation format (e.g. myapp.user.create). Use the registry name or declare a new span as a schemaExtension.
