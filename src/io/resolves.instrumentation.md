# Instrumentation Report: src/io/resolves.ts

## Summary
- **Status**: success
- **Spans added**: 0
- **Attempts**: 2 (multi-turn-fix)
- **Input tokens**: 72.0K
- **Output tokens**: 82.4K
- **Cached tokens**: 339.8K

## Function-Level Results

| Function | Status | Spans |
|----------|--------|-------|
| loadCache | skipped — Oscillation detected during fresh regeneration: Duplicate errors across consecutive attempts: NDS-001 (×1) | 0 |
| dumpCache | skipped — Oscillation detected during fresh regeneration: Duplicate errors across consecutive attempts: NDS-001 (×1) | 0 |
| getPackageData | skipped — Oscillation detected during fresh regeneration: Duplicate errors across consecutive attempts: NDS-001 (×1) | 0 |
| getVersionOfRange | instrumented | 0 |
| updateTargetVersion | instrumented | 0 |
| getDiff | instrumented | 0 |
| resolveDependency | skipped — Oscillation detected during fresh regeneration: Duplicate errors across consecutive attempts: NDS-001 (×1) | 0 |
| resolveDependencies | skipped — Oscillation detected during fresh regeneration: Duplicate errors across consecutive attempts: NDS-001 (×1) | 0 |
| resolvePackage | skipped — Oscillation detected during fresh regeneration: Duplicate errors across consecutive attempts: NDS-001 (×1) | 0 |

## Validation Journey
1. **Attempt 1**: 1 blocking error (NDS-005 (Control Flow Preserved):1)
2. **Attempt 2**: 1 blocking error (NDS-003 (Code Preserved):1)
3. **Attempt 3**: function-level: 0/9 functions instrumented (no spans needed)

## Notes
- Function-level fallback: 0/9 functions instrumented
-   skipped: loadCache — Oscillation detected during fresh regeneration: Duplicate errors across consecutive attempts: NDS-001 (×1)
-   skipped: dumpCache — Oscillation detected during fresh regeneration: Duplicate errors across consecutive attempts: NDS-001 (×1)
-   skipped: getPackageData — Oscillation detected during fresh regeneration: Duplicate errors across consecutive attempts: NDS-001 (×1)
-   skipped: resolveDependency — Oscillation detected during fresh regeneration: Duplicate errors across consecutive attempts: NDS-001 (×1)
-   skipped: resolveDependencies — Oscillation detected during fresh regeneration: Duplicate errors across consecutive attempts: NDS-001 (×1)
-   skipped: resolvePackage — Oscillation detected during fresh regeneration: Duplicate errors across consecutive attempts: NDS-001 (×1)
