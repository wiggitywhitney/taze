# Instrumentation Report: src/utils/packument.ts

## Summary
- **Status**: success
- **Spans added**: 2
- **Attempts**: 1 (initial-generation)
- **Input tokens**: 1.7K
- **Output tokens**: 4.1K
- **Cached tokens**: 19.1K

## Schema Extensions
- `span.taze.fetch.npm_package`
- `span.taze.fetch.jsr_package`

## Validation Journey
1. **Attempt 1**: 0 errors

## Notes
- fetchPackage makes npm registry calls and is the natural owner of the schema-defined `taze.fetch.package_data` span, but that name was already claimed by an earlier file in this run. `taze.fetch.npm_package` is used instead as a unique alternative — this is reported as a schema extension.
- fetchJsrPackageMeta makes HTTP calls to the JSR registry (jsr.io) and is instrumented with `taze.fetch.jsr_package`. No existing schema span distinguished npm vs JSR fetch paths, so both are new extensions.
- toPackageData is an unexported pure synchronous data transformation with no I/O — skipped (RST-001: no spans on synchronous utilities; RST-004: unexported function).
- fetchWithUserAgent is an unexported synchronous thin wrapper around `ofetch` — skipped (RST-003: thin wrapper; RST-004: unexported). Its outbound HTTP calls are covered by the spans wrapping the two exported functions that call it.

## Advisory Findings
- SCH-001 (Span Names Match Registry): SCH-001: declared span extension "taze.fetch.npm_package" may be a semantic duplicate of existing registry operation "taze.fetch.package_data". If these operations are equivalent, reuse "taze.fetch.package_data" instead of declaring a new extension. If they are a different operation class, this advisory can be ignored.
- SCH-001 (Span Names Match Registry): SCH-001: declared span extension "taze.fetch.jsr_package" may be a semantic duplicate of existing registry operation "taze.fetch.npm_package". If these operations are equivalent, reuse "taze.fetch.npm_package" instead of declaring a new extension. If they are a different operation class, this advisory can be ignored.
