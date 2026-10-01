# Instrumentation Report: src/io/packageJson.ts

## Summary
- **Status**: success
- **Spans added**: 2
- **Attempts**: 1 (initial-generation)
- **Input tokens**: 1.4K
- **Output tokens**: 4.8K

## Schema Extensions
- `span.taze.io.load_package_json`
- `span.taze.io.write_package_json`

## Validation Journey
1. **Attempt 1**: 0 errors

## Notes
- isDepFieldEnabled is a synchronous, unexported pure helper with no I/O — it was skipped (RST-001: no spans on synchronous utilities; RST-004: unexported functions are skipped when an exported orchestrator covers their execution path).
- loadPackageJSON uses taze.write.file_path (filepath) as the input attribute and taze.check.packages_total (deps.length) as the output count — both are registered schema keys that match these concepts precisely.
- writePackageJSON uses taze.write.file_path, taze.write.package_type, and taze.cache.changed — all registered schema keys. taze.cache.changed ('Whether the cache entry was modified during this operation') accurately captures the boolean changed flag indicating whether any dependency entries were updated and a file write occurred.
- The return object literal inside loadPackageJSON's async callback uses 'package.json' as const to preserve the discriminant literal type required by PackageMeta, preventing TypeScript from widening it to string inside the callback.
- span.taze.io.load_package_json: new span name for the package.json load operation — no existing schema span matches this operation (existing io spans cover bun workspace and bun json write; check spans cover the overall run).
- span.taze.io.write_package_json: new span name for the package.json write operation — distinct from taze.io.write_bun_json (Bun-specific) and taze.io.write_bun_workspace (workspace file).

## Advisory Findings
- CDQ-007 (Attribute Data Quality):42: CDQ-007 (Attribute Data Quality) fired for one or more of: a PII attribute name (like author, email, or username) or a raw filesystem path where a basename would be safer. PII in traces can violate privacy policies and is worth fixing. The path finding is lower severity — fix it when the code will run in a context where the basename utility is already imported.
- CDQ-007 (Attribute Data Quality):62: CDQ-007 (Attribute Data Quality) fired for one or more of: a PII attribute name (like author, email, or username) or a raw filesystem path where a basename would be safer. PII in traces can violate privacy policies and is worth fixing. The path finding is lower severity — fix it when the code will run in a context where the basename utility is already imported.
- CDQ-007 (Attribute Data Quality):95: CDQ-007 (Attribute Data Quality) fired for one or more of: a PII attribute name (like author, email, or username) or a raw filesystem path where a basename would be safer. PII in traces can violate privacy policies and is worth fixing. The path finding is lower severity — fix it when the code will run in a context where the basename utility is already imported.
- SCH-001 (Span Names Match Registry): SCH-001 (Span Names Match Registry) fired because a span name doesn't match your Weaver registry or doesn't follow the required dotted-notation format (e.g. myapp.user.create). Use the registry name or declare a new span as a schemaExtension.
