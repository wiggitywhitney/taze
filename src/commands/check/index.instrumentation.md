# Instrumentation Report: src/commands/check/index.ts

## Summary
- **Status**: success
- **Spans added**: 1
- **Attempts**: 1 (initial-generation)
- **Input tokens**: 2.0K
- **Output tokens**: 7.4K

## Schema Extensions
- `span.taze.check.run`

## Validation Journey
1. **Attempt 1**: 0 errors

## Notes
- Added span 'taze.check.run' on the exported async `check` function as the CLI entry point (COV-001). No matching span was found in the registry, so this is declared as a schema extension.
- Set taze.check.recursive, taze.check.write_mode, and taze.check.mode at span open before any branching so all execution paths (including early returns) carry input context.
- Set taze.check.packages_total and taze.check.packages_outdated after CheckPackages resolves, capturing the full set of checked and outdated dependency entries. These reduce computations are on a COV-001 entry point and are therefore exempt from the CDQ-006 isRecording() guard requirement.
- options.mode is checked with != null before setAttribute to safely handle the case where it may be undefined in CheckOptions.

## Advisory Findings
- CDQ-006 (isRecording Guard):66: CDQ-006 (isRecording Guard) fired because span.setAttribute() is called with an expensive computation (map, reduce, filter, JSON.stringify, etc.) or an external source string (value fetched from git output, an API response, file contents, or any source whose length is unbounded) and no span.isRecording() guard. When sampling drops the span, that work still runs on every request. Wrap the call in `if (span.isRecording()) { ... }` to skip it when the span won't be exported. Skip this finding for root spans at entry points — the guard adds clutter for negligible gain there.
- CDQ-006 (isRecording Guard):67: CDQ-006 (isRecording Guard) fired because span.setAttribute() is called with an expensive computation (map, reduce, filter, JSON.stringify, etc.) or an external source string (value fetched from git output, an API response, file contents, or any source whose length is unbounded) and no span.isRecording() guard. When sampling drops the span, that work still runs on every request. Wrap the call in `if (span.isRecording()) { ... }` to skip it when the span won't be exported. Skip this finding for root spans at entry points — the guard adds clutter for negligible gain there.
- CDQ-007 (Attribute Data Quality):27: CDQ-007 (Attribute Data Quality) fired for one or more of: a PII attribute name (like author, email, or username) or a raw filesystem path where a basename would be safer. PII in traces can violate privacy policies and is worth fixing. The path finding is lower severity — fix it when the code will run in a context where the basename utility is already imported.
