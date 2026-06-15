# Instrumentation Report: src/io/packages.ts

## Summary
- **Status**: success
- **Spans added**: 5
- **Attempts**: 1 (initial-generation)
- **Input tokens**: 2.4K
- **Output tokens**: 8.6K

## Schema Extensions
- `span.taze.io.read_json`
- `span.taze.io.write_json`
- `span.taze.io.write_package`
- `span.taze.io.load_package`
- `span.taze.io.load_packages`

## Validation Journey
1. **Attempt 1**: 0 errors

## Notes
- readJSON reads a JSON file from disk — instrumented as a COV-001 entry point with span 'taze.io.read_json'. Used 'taze.write.file_path' for the filepath attribute since it is the only file-path attribute in the registry; no read-specific file path attribute exists. The brief says 'written' but the semantic concept (package manifest file path) is equivalent for both read and write operations.
- writeJSON writes a JSON file — instrumented as a COV-001 entry point with span 'taze.io.write_json'. Used 'taze.write.file_path' for the filepath parameter.
- writePackage dispatches to type-specific writers — instrumented as a COV-001 entry point with span 'taze.io.write_package'. Used 'taze.write.package_type' for pkg.type since the enum values ('package.json', 'package.yaml', 'pnpm-workspace.yaml', 'bun-workspace', '.yarnrc.yml') exactly match the registry enum members. Skipped 'taze.write.file_path' because the PackageMeta filepath property name is not visible in this file and making an incorrect assumption would cause a tsc error.
- loadPackage routes to format-specific loaders — instrumented as a COV-001 entry point with span 'taze.io.load_package'. Used 'taze.write.file_path' for the relative path parameter (closest semantic match in registry). The inner catch block for the package.json branch swallows the error and falls back gracefully (no rethrow), so recordException/setStatus were NOT added to it per NDS-007. The outer span-level catch covers all propagating errors.
- loadPackages resolves all package manifest files across the workspace — instrumented as a COV-001 entry point with span 'taze.io.load_packages'. Set 'taze.check.recursive' from options.recursive (coerced to boolean with ?? false in case undefined) and 'taze.config.sources_found' for the total number of resolved PackageMeta entries, which matches the attribute brief 'Number of configuration source files found during dependency resolution'.
- All five new span names are schema extensions because the schema only defines span IDs for specific operations (load_package_json, write_package_json, etc.) that were already claimed by earlier files in this run. The new spans represent distinct operations at a higher abstraction level.

## Advisory Findings
- CDQ-007 (Attribute Data Quality):22: CDQ-007 (Attribute Data Quality) fired for one or more of: a PII attribute name (like author, email, or username) or a raw filesystem path where a basename would be safer. PII in traces can violate privacy policies and is worth fixing. The path finding is lower severity — fix it when the code will run in a context where the basename utility is already imported.
- CDQ-007 (Attribute Data Quality):37: CDQ-007 (Attribute Data Quality) fired for one or more of: a PII attribute name (like author, email, or username) or a raw filesystem path where a basename would be safer. PII in traces can violate privacy policies and is worth fixing. The path finding is lower severity — fix it when the code will run in a context where the basename utility is already imported.
- CDQ-007 (Attribute Data Quality):58: CDQ-007 (Attribute Data Quality) fired for one or more of: a PII attribute name (like author, email, or username) or a raw filesystem path where a basename would be safer. PII in traces can violate privacy policies and is worth fixing. The path finding is lower severity — fix it when the code will run in a context where the basename utility is already imported.
- CDQ-007 (Attribute Data Quality):225: CDQ-007 (Attribute Data Quality) fired for one or more of: a PII attribute name (like author, email, or username) or a raw filesystem path where a basename would be safer. PII in traces can violate privacy policies and is worth fixing. The path finding is lower severity — fix it when the code will run in a context where the basename utility is already imported.
- SCH-001 (Span Names Match Registry): SCH-001 (Span Names Match Registry) fired because a span name doesn't match your Weaver registry or doesn't follow the required dotted-notation format (e.g. myapp.user.create). Use the registry name or declare a new span as a schemaExtension.
- SCH-001 (Span Names Match Registry): SCH-001 (Span Names Match Registry) fired because a span name doesn't match your Weaver registry or doesn't follow the required dotted-notation format (e.g. myapp.user.create). Use the registry name or declare a new span as a schemaExtension.
