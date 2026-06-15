# Instrumentation Report: src/commands/check/checkGlobal.ts

## Summary
- **Status**: success
- **Spans added**: 4
- **Attempts**: 2 (multi-turn-fix)
- **Input tokens**: 14.5K
- **Output tokens**: 13.6K

## Schema Extensions
- `span.taze.check.global`
- `span.taze.check.load_global_pnpm`
- `span.taze.check.load_global_npm`
- `span.taze.check.install_pkg`

## Validation Journey
1. **Attempt 1**: 1 blocking error (NDS-001 (Syntax Valid):1)
2. **Attempt 2**: 0 errors

## Notes
- checkGlobal is the exported async entry point for the global dependency check command — it receives a span covering the full operation including package loading, resolution, and optional install (COV-001).
- taze.check.packages_total and taze.check.packages_outdated are set after the Promise.all resolution loop completes, so they reflect resolved state. These are reduce operations on the pkgs array, but CDQ-006 isRecording() guards are exempted for COV-001 entry point spans.
- loadGlobalPnpmPackage has an inner try/catch that catches exec failures and returns [] gracefully — this is an expected-condition catch with no rethrow, so no recordException/setStatus is added to it (NDS-007). The outer span catch handles any unexpected errors from the JSON.parse/map pipeline after the inner catch.
- Fixed NDS-001: added 'as const' to the 'agent' and 'type' discriminant fields in both loadGlobalPnpmPackage and loadGlobalNpmPackage return objects. Inside async callbacks passed to startActiveSpan, TypeScript widens string literal types — 'as const' narrows them back to the literal types required by the Agent and type discriminants on GlobalPackageMeta.
- loadGlobalPnpmPackage sets taze.config.sources_found to the number of pnpm installation paths found (pkgMetas.length), since each pnpm workspace path is a distinct configuration source.
- loadGlobalNpmPackage sets taze.check.packages_total to deps.length — the total number of globally installed npm dependency entries discovered.
- installPkg sets taze.write.changes_count before the early-return guard so the attribute is present on all execution paths including the no-changes early exit.
- The three unexported helper functions (loadGlobalPnpmPackage, loadGlobalNpmPackage, installPkg) are all instrumented per the pre-instrumentation analysis directive — each performs async I/O via exec() and benefits from individual span context for debugging slow or failed registry calls.

## Advisory Findings
- CDQ-006 (isRecording Guard):65: CDQ-006 (isRecording Guard) fired because span.setAttribute() is called with an expensive computation (map, reduce, filter, JSON.stringify, etc.) or an external source string (value fetched from git output, an API response, file contents, or any source whose length is unbounded) and no span.isRecording() guard. When sampling drops the span, that work still runs on every request. Wrap the call in `if (span.isRecording()) { ... }` to skip it when the span won't be exported. Skip this finding for root spans at entry points — the guard adds clutter for negligible gain there.
- CDQ-006 (isRecording Guard):66: CDQ-006 (isRecording Guard) fired because span.setAttribute() is called with an expensive computation (map, reduce, filter, JSON.stringify, etc.) or an external source string (value fetched from git output, an API response, file contents, or any source whose length is unbounded) and no span.isRecording() guard. When sampling drops the span, that work still runs on every request. Wrap the call in `if (span.isRecording()) { ... }` to skip it when the span won't be exported. Skip this finding for root spans at entry points — the guard adds clutter for negligible gain there.
- CDQ-007 (Attribute Data Quality):41: CDQ-007 (Attribute Data Quality) fired for one or more of: a PII attribute name (like author, email, or username) or a raw filesystem path where a basename would be safer. PII in traces can violate privacy policies and is worth fixing. The path finding is lower severity — fix it when the code will run in a context where the basename utility is already imported.
- CDQ-007 (Attribute Data Quality):176: CDQ-007 (Attribute Data Quality) fired for one or more of: a PII attribute name (like author, email, or username) or a raw filesystem path where a basename would be safer. PII in traces can violate privacy policies and is worth fixing. The path finding is lower severity — fix it when the code will run in a context where the basename utility is already imported.
- CDQ-007 (Attribute Data Quality):209: CDQ-007 (Attribute Data Quality) fired for one or more of: a PII attribute name (like author, email, or username) or a raw filesystem path where a basename would be safer. PII in traces can violate privacy policies and is worth fixing. The path finding is lower severity — fix it when the code will run in a context where the basename utility is already imported.
- CDQ-007 (Attribute Data Quality):239: CDQ-007 (Attribute Data Quality) fired for one or more of: a PII attribute name (like author, email, or username) or a raw filesystem path where a basename would be safer. PII in traces can violate privacy policies and is worth fixing. The path finding is lower severity — fix it when the code will run in a context where the basename utility is already imported.
