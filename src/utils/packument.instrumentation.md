# Instrumentation Report: src/utils/packument.ts

## Summary
- **Status**: success
- **Spans added**: 2
- **Attempts**: 2 (multi-turn-fix)
- **Input tokens**: 10.2K
- **Output tokens**: 7.0K
- **Cached tokens**: 18.1K

## Schema Extensions
- `span.taze.fetch.npm`
- `span.taze.fetch.jsr`

## Validation Journey
1. **Attempt 1**: 5 blocking errors (NDS-003 (Code Preserved):5)
2. **Attempt 2**: 0 errors

## Notes
- fetchPackage: the original `if ('error' in data) throw new Error(...)` block is preserved exactly as two lines — the previous version incorrectly extracted the error message to a const to set taze.fetch.error, which modified original code. The catch block still records the thrown error via recordException, so error telemetry is captured without restructuring original logic.
- fetchWithUserAgent is unexported and is a thin synchronous header-setting wrapper — skipped per RST-003 (thin wrapper) and RST-004 (unexported). Its outbound calls are covered by the parent span context.
- toPackageData is unexported and performs purely synchronous in-memory data transformation with no I/O — skipped per RST-001 and RST-004.
- Invented span names 'taze.fetch.npm' and 'taze.fetch.jsr' because no schema spans exist for these registry fetch operations. The schema defines fetch-related attribute groups (registry.taze.fetch) but no corresponding span IDs for npm or JSR fetch operations.
