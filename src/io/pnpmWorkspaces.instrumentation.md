# Instrumentation Report: src/io/pnpmWorkspaces.ts

## Summary
- **Status**: success
- **Spans added**: 2
- **Attempts**: 1 (initial-generation)
- **Input tokens**: 1.7K
- **Output tokens**: 11.0K
- **Cached tokens**: 21.0K

## Schema Extensions
- `span.taze.io.load_pnpm_workspace`
- `span.taze.io.write_pnpm_workspace`

## Validation Journey
1. **Attempt 1**: 0 errors

## Notes
- loadPnpmWorkspace: new span name taze.io.load_pnpm_workspace declared — the existing schema spans taze.io.load_packages, taze.io.load_package, and taze.io.load_bun_workspace are all already in use by other files and none semantically matches loading a pnpm workspace catalog file.
- writePnpmWorkspace: new span name taze.io.write_pnpm_workspace declared — taze.io.write_bun_workspace is already in use and is bun-specific; taze.io.write_package_yaml is already in use and targets generic YAML manifests; neither matches writing a pnpm workspace catalog.
- writeYaml: skipped — it is a single-line thin wrapper around writeFile (RST-003) and per pre-instrumentation analysis it was designated as a synchronous no-span function.
- createPnpmWorkspaceEntry: skipped — it is an unexported inner helper called from within the already-instrumented loadPnpmWorkspace span; RST-004 applies and the helper's execution is covered by the parent span.
- taze.io.catalogs_found is registered with type string (auto-generated with bare defaults); its value is passed as String(catalogs.length) to comply with the registered type. The semantic intent is a count — a future schema revision should correct the type to int.
- Object.keys(versions).length is evaluated twice in writePnpmWorkspace (once for the early-return guard, once for setAttribute). This is intentional to avoid extracting a new variable that would modify non-instrumentation code (NDS-003). The cost is negligible for typical package counts.

## Advisory Findings
- CDQ-006 (isRecording Guard):90: CDQ-006 (isRecording Guard) fired because span.setAttribute() is called with an expensive computation (map, reduce, filter, JSON.stringify, etc.) or an external source string (value fetched from git output, an API response, file contents, or any source whose length is unbounded) and no span.isRecording() guard. When sampling drops the span, that work still runs on every request. Wrap the call in `if (span.isRecording()) { ... }` to skip it when the span won't be exported. Skip this finding for root spans at entry points — the guard adds clutter for negligible gain there.
- CDQ-007 (Attribute Data Quality):19: CDQ-007 (Attribute Data Quality) fired for one or more of: a PII attribute name (like author, email, or username) or a raw filesystem path where a basename would be safer. PII in traces can violate privacy policies and is worth fixing. The path finding is lower severity — fix it when the code will run in a context where the basename utility is already imported.
- CDQ-007 (Attribute Data Quality):84: CDQ-007 (Attribute Data Quality) fired for one or more of: a PII attribute name (like author, email, or username) or a raw filesystem path where a basename would be safer. PII in traces can violate privacy policies and is worth fixing. The path finding is lower severity — fix it when the code will run in a context where the basename utility is already imported.
