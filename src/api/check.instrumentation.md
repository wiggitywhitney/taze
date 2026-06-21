# Instrumentation Report: src/api/check.ts

## Summary
- **Status**: success
- **Spans added**: 2
- **Attempts**: 1 (initial-generation)
- **Input tokens**: 1.4K
- **Output tokens**: 6.6K

## Schema Extensions
- `span.taze.check.packages`
- `span.taze.check.single_project`

## Validation Journey
1. **Attempt 1**: 0 errors

## Notes
- CheckPackages is the exported async entry point (COV-001) — instrumented with span `taze.check.packages`. Input attributes (mode, recursive, write_mode) are set before any branching; packages_total is set after loadPackages resolves.
- CheckSingleProject is an unexported async function that performs I/O (resolvePackage, writePackage) and is explicitly called out by the pre-instrumentation analysis as a COV-004 target. It receives span `taze.check.single_project`. pkg.name and pkg.filepath are guarded with != null before setAttribute because PackageMeta.name can be falsy (the code filters it out with .filter(i => i)) and filepath may not always be populated.
- taze.check.packages_outdated (brief: 'Number of dependencies found to have available updates') is used in CheckSingleProject to record changes.length — the number of resolved dependencies within this package that have available updates. This matches the attribute's registered brief precisely.
- span.taze.check.packages: new span for the exported CheckPackages orchestrator. No existing schema span matched — taze.check.run, taze.check.global, and taze.check.interactive are all already used by other files in this run.
- span.taze.check.single_project: new span for the internal CheckSingleProject async I/O function. No existing schema span matched this per-package resolution and optional-write operation.
- All attributes used (taze.check.mode, taze.check.recursive, taze.check.write_mode, taze.check.packages_total, taze.package.name, taze.package.file_path, taze.check.packages_outdated) are already registered in the schema — no new attribute schema extensions are needed.

## Advisory Findings
- CDQ-007 (Attribute Data Quality):24: CDQ-007 (Attribute Data Quality) fired for one or more of: a PII attribute name (like author, email, or username) or a raw filesystem path where a basename would be safer. PII in traces can violate privacy policies and is worth fixing. The path finding is lower severity — fix it when the code will run in a context where the basename utility is already imported.
- CDQ-007 (Attribute Data Quality):27: CDQ-007 (Attribute Data Quality) fired for one or more of: a PII attribute name (like author, email, or username) or a raw filesystem path where a basename would be safer. PII in traces can violate privacy policies and is worth fixing. The path finding is lower severity — fix it when the code will run in a context where the basename utility is already imported.
- CDQ-007 (Attribute Data Quality):30: CDQ-007 (Attribute Data Quality) fired for one or more of: a PII attribute name (like author, email, or username) or a raw filesystem path where a basename would be safer. PII in traces can violate privacy policies and is worth fixing. The path finding is lower severity — fix it when the code will run in a context where the basename utility is already imported.
- CDQ-007 (Attribute Data Quality):40: CDQ-007 (Attribute Data Quality) fired for one or more of: a PII attribute name (like author, email, or username) or a raw filesystem path where a basename would be safer. PII in traces can violate privacy policies and is worth fixing. The path finding is lower severity — fix it when the code will run in a context where the basename utility is already imported.
- CDQ-007 (Attribute Data Quality):90: CDQ-007 (Attribute Data Quality) fired for one or more of: a PII attribute name (like author, email, or username) or a raw filesystem path where a basename would be safer. PII in traces can violate privacy policies and is worth fixing. The path finding is lower severity — fix it when the code will run in a context where the basename utility is already imported.
- CDQ-007 (Attribute Data Quality):93: CDQ-007 (Attribute Data Quality) fired for one or more of: a PII attribute name (like author, email, or username) or a raw filesystem path where a basename would be safer. PII in traces can violate privacy policies and is worth fixing. The path finding is lower severity — fix it when the code will run in a context where the basename utility is already imported.
- CDQ-007 (Attribute Data Quality):101: CDQ-007 (Attribute Data Quality) fired for one or more of: a PII attribute name (like author, email, or username) or a raw filesystem path where a basename would be safer. PII in traces can violate privacy policies and is worth fixing. The path finding is lower severity — fix it when the code will run in a context where the basename utility is already imported.
- SCH-001 (Span Names Match Registry): SCH-001 (Span Names Match Registry) fired because a span name doesn't match your Weaver registry or doesn't follow the required dotted-notation format (e.g. myapp.user.create). Use the registry name or declare a new span as a schemaExtension.

## Agent Thinking

### Attempt 1

```
Let me analyze this file and instrument it according to the schema and rules.

Functions to instrument:
1. `CheckPackages` (line 17) - exported async function, COV-001 entry point → span `taze.check.run` is already taken... Let me check the schema. The schema has `span.taze.check.run` but it's already used. I need a unique name. Looking at the already-used spans, `taze.check.run` is taken. This function is `CheckPackages` which is the main check API function. I'll need to invent a new name. Looking at existing spans, I could use something like `taze.check.packages` or `taze.api.check_packages`. 

Looking more carefully at the schema, I see `taze.check.global` is already used, so I'll go with `taze.check.packages` for the main API function since it's not in the already-used list.

2. `CheckSingleProject` (line 61) - unexported async function but analysis says to add a span (COV-004). The span name could be `taze.check.single_project`. However, RST-004 says don't add spans to unexported internal functions unless no exported orchestrator span covers that function's execution path. Since `CheckSingleProject` is called by the exported `CheckPackages`, I need to determine if it should get its own span or not.

Actually, the pre-instrumentation analysis explicitly says to add a span for `CheckSingleProject`, so I'll follow that directive. Both `taze.check.packages` and `taze.check.single_project` are schema extensions since they don't match any existing schema span IDs exactly.

For `CheckPackages`, I need to set attributes like the check mode, whether it's recursive, the write mode, and counts for total and outdated packages. For `CheckSingleProject`, I'll track the package name, file path, and number of changes made. Now I need to write the instrumented code, being careful with the async callback in `CheckPackages`. Setting `taze.check.packages_total` to the length of the packages array, then for individual packages I need to map `pkg.name` to `taze.package.name` and `pkg.filepath` to `taze.package.file_path`. After resolving dependencies, the count of changes should go to `taze.write.changes_count`, though I'm realizing that attribute might be intended for write operations specifically rather than tracking found updates per package. `taze.check.packages_outdated` actually maps better to `changes.length` since it represents dependencies with available updates rather than total packages. For `CheckPackages`, I need to track the total packages checked with `packages.length`. Now I'm setting up the code with proper guards for optional properties like `options.mode`, `options.recursive`, and `options.write`. Setting up the instrumentation imports and tracer instance...

Now I'm defining the callback interface for package check events, then starting the main async function that wraps the check operation in an OpenTelemetry span with attributes for tracking the mode and other options.

Setting up the package loading and filtering logic... Wrapping up the function to return the packages and handling any errors with proper span recording, then moving into the CheckSingleProject function which sets up tracing for individual package checks and starts resolving dependencies for each one. Checking the attribute assignments against CDQ-006 requirements - `changes.length`, `packages.length`, and the property accesses like `pkg.name` and `pkg.filepath` are all direct operations that don't need guards. Since `CheckPackages` is a COV-001 entry point, it's exempt, and `CheckSingleProject` as a COV-004 target only uses simple property accesses that don't require additional checks.

For the schema, I need to add two new span definitions for `taze.check.packages` and `taze.check.single_project`, but all the attributes they reference are already in the registry so no attribute extensions are needed. The span categories I'm tracking don't match the schema definitions, so those wouldn't count as schema-defined. CheckPackages is the main service entry point, while CheckSingleProject handles async I/O operations, giving me one service entry point to count overall. I need to add the OpenTelemetry imports at the top and preserve the existing multi-line constructs like the privatePackageNames filter chain and the Promise.all mapping over packages.

Now I'm verifying that `pkg.filepath` exists on the PackageMeta type — the schema shows it's registered as `taze.package.file_path` and since `writePackage` accepts PackageMeta objects, the property should be available for the span attribute.
```
