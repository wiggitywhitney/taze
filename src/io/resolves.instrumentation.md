# Instrumentation Report: src/io/resolves.ts

## Summary
- **Status**: success
- **Spans added**: 6
- **Attempts**: 2 (multi-turn-fix)
- **Input tokens**: 37.7K
- **Output tokens**: 36.3K
- **Cached tokens**: 17.7K

## Schema Extensions
- `span.taze.cache.load`
- `span.taze.cache.dump`
- `span.taze.package.resolve`
- `span.taze.package.check`
- `taze.cache.loaded`
- `taze.cache.changed`
- `span.taze.package.load`
- `span.taze.packages.load`

## Validation Journey
1. **Attempt 1**: 5 blocking errors (NDS-003 (Code Preserved):5)
2. **Attempt 2**: 0 errors

## Notes
- getVersionOfRange, updateTargetVersion, getDiff, isUrlPackage, isLocalPackage, and isAliasedPackage are all synchronous pure-computation functions with no I/O — skipped per RST-001 (no spans on synchronous utilities regardless of export status).
- parseAliasedPackage is unexported — skipped per RST-004.
- The inner catch blocks in getPackageData (catch (e) { error = e }) and resolveDependency (catch (e: any) { err = e.message || e } and the empty catch {}) are graceful-degradation catches — no recordException added per NDS-007.
- In resolveDependencies, return Promise.all(...) is kept as-is (NDS-003 requires no modification). As a known limitation, span.end() in the finally block executes before Promise.all resolves, so the span duration does not cover the async queue work — it covers only the synchronous setup. taze.check.packages_total is set from deps.length before the async work begins.
- The outer catch variable in getPackageData is named 'error' and TypeScript correctly scopes it to the catch block, shadowing the inner 'let error: any' declared in the try block. The throw inside the catch refers to the catch parameter, not the inner let binding.
- CDQ-007 advisories for raw.name/raw.currentVersion and pkg.name addressed with if (raw != null) and if (pkg != null) guards, even though these are required non-optional parameters and cannot be null in practice.
