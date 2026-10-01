# Instrumentation Report: src/io/bunWorkspaces.ts

## Summary
- **Status**: success
- **Spans added**: 3
- **Attempts**: 1 (initial-generation)
- **Input tokens**: 1.3K
- **Output tokens**: 5.9K

## Schema Extensions
- `span.taze.io.load_bun_workspace`
- `span.taze.io.write_bun_workspace`
- `span.taze.io.write_bun_json`
- `taze.io.catalogs_found`

## Validation Journey
1. **Attempt 1**: 0 errors

## Notes
- createBunWorkspaceEntry is a nested synchronous helper that performs pure in-memory data transformation with no I/O — skipped per RST-001 (no spans on synchronous utilities with no side effects).
- taze.io.catalogs_found is a new attribute key (type: int, stability: development) capturing the number of BunWorkspaceMeta catalog entries returned by loadBunWorkspace. No registered key was a semantic match: taze.check.packages_total describes total dependency entries checked across package.json files, not catalog entries discovered in a bun workspace; taze.config.sources_found describes configuration source files found, not workspace catalog entries.
- The inner empty catch block in writeBunJSON gracefully handles a missing-file scenario when detecting indentation — it swallows the error and falls back to two-space indent. No recordException or setStatus(ERROR) was added to it per NDS-007 (graceful-degradation catches that do not rethrow must not receive error recording).
- taze.write.file_path is set to the relative path input in loadBunWorkspace before any branching, satisfying the COV-005 pre-guard attribute rule. The resolved absolute filepath is available only after the resolve() call inside the function body.
- taze.write.changes_count is set after the early-return guard in writeBunWorkspace because the count is 0 on the early-return path and the attribute is only meaningful when writes actually occur.

## Advisory Findings
- CDQ-006 (isRecording Guard):87: CDQ-006 (isRecording Guard) fired because span.setAttribute() is called with an expensive computation (map, reduce, filter, JSON.stringify, etc.) or an external source string (value fetched from git output, an API response, file contents, or any source whose length is unbounded) and no span.isRecording() guard. When sampling drops the span, that work still runs on every request. Wrap the call in `if (span.isRecording()) { ... }` to skip it when the span won't be exported. Skip this finding for root spans at entry points — the guard adds clutter for negligible gain there.
- CDQ-007 (Attribute Data Quality):62: CDQ-007 (Attribute Data Quality) fired for one or more of: a PII attribute name (like author, email, or username) or a raw filesystem path where a basename would be safer. PII in traces can violate privacy policies and is worth fixing. The path finding is lower severity — fix it when the code will run in a context where the basename utility is already imported.
- CDQ-007 (Attribute Data Quality):80: CDQ-007 (Attribute Data Quality) fired for one or more of: a PII attribute name (like author, email, or username) or a raw filesystem path where a basename would be safer. PII in traces can violate privacy policies and is worth fixing. The path finding is lower severity — fix it when the code will run in a context where the basename utility is already imported.
- CDQ-007 (Attribute Data Quality):126: CDQ-007 (Attribute Data Quality) fired for one or more of: a PII attribute name (like author, email, or username) or a raw filesystem path where a basename would be safer. PII in traces can violate privacy policies and is worth fixing. The path finding is lower severity — fix it when the code will run in a context where the basename utility is already imported.
- SCH-001 (Span Names Match Registry): SCH-001 (Span Names Match Registry) fired because a span name doesn't match your Weaver registry or doesn't follow the required dotted-notation format (e.g. myapp.user.create). Use the registry name or declare a new span as a schemaExtension.
