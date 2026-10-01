# Instrumentation Report: src/utils/packument.ts

## Summary
- **Status**: success
- **Spans added**: 2
- **Attempts**: 1 (initial-generation)
- **Input tokens**: 1.8K
- **Output tokens**: 5.3K

## Schema Extensions
- `span.taze.fetch.package`
- `span.taze.fetch.jsr_package_meta`

## Validation Journey
1. **Attempt 1**: 0 errors

## Notes
- fetchWithUserAgent is an unexported synchronous arrow function wrapping ofetch — skipped per RST-004 (unexported) and RST-001 (no I/O tracing needed at this layer; the HTTP call is captured by the enclosing entry-point span).
- toPackageData is an unexported synchronous pure data transformation with no I/O — skipped per RST-004 and RST-001.
- fetchPackage produces span 'taze.fetch.package' — no matching span exists in the schema registry for npm packument fetching, so this is a new extension. The return value from toPackageData is extracted to a const (permitted return-value capture exception) to allow setting taze.package.latest_version.
- fetchJsrPackageMeta produces span 'taze.fetch.jsr_package_meta' — no matching span exists in the schema registry for JSR metadata fetching. meta.latest is guarded with != null before setAttribute since JsrPackageMeta.latest may be optional.
- Both taze.package.name and taze.fetch.registry are set before any async awaits so they are present on all execution paths including timeout error paths.
- The getVersions call from get-npm-meta and ofetch's fetch wrapper internally use HTTP — no auto-instrumentation library in the allowlist covers get-npm-meta or ofetch directly, so no librariesNeeded entries were added.

## Advisory Findings
- CDQ-007 (Attribute Data Quality):106: CDQ-007 (Attribute Data Quality) fired for one or more of: a PII attribute name (like author, email, or username) or a raw filesystem path where a basename would be safer. PII in traces can violate privacy policies and is worth fixing. The path finding is lower severity — fix it when the code will run in a context where the basename utility is already imported.
- SCH-001 (Span Names Match Registry): SCH-001 (Span Names Match Registry) fired because a span name doesn't match your Weaver registry or doesn't follow the required dotted-notation format (e.g. myapp.user.create). Use the registry name or declare a new span as a schemaExtension.
