# Instrumentation Report: src/utils/packument.ts

## Summary
- **Status**: success
- **Spans added**: 2
- **Attempts**: 2 (multi-turn-fix)
- **Input tokens**: 12.9K
- **Output tokens**: 10.5K
- **Cached tokens**: 17.1K

## Schema Extensions
- `span.taze.fetch.npm`
- `span.taze.fetch.jsr`

## Validation Journey
1. **Attempt 1**: 2 blocking errors (NDS-003 (Code Preserved):2)
2. **Attempt 2**: 0 errors

## Notes
- fetchWithUserAgent is an unexported constant that is a thin wrapper around ofetch — skipped because it is both unexported (RST-004) and a single-expression delegating wrapper (RST-003).
- toPackageData is an unexported synchronous pure data transformation with no I/O or network access — skipped per RST-001 (no spans on synchronous utilities) and RST-004 (unexported internal function).
- taze.fetch.npm and taze.fetch.jsr are new span names not present in the registry schema. No existing span in the schema covers the npm or JSR registry fetch operations — the closest entries are the attribute groups registry.taze.fetch.* but no matching span group exists. These are reported as schema extensions.
- The original single-line if ('error' in data) throw ... in fetchPackage is preserved exactly without braces or modification. The taze.fetch.error attribute cannot be set in that branch without modifying the original code structure, so error details are captured solely via recordException in the catch block.
- result.tags and meta.latest are guarded with != null before setAttribute calls because the PackageData and JsrPackageMeta types are opaque (defined in ../types) and these fields could be absent at runtime.
