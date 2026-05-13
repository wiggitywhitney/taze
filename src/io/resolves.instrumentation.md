# Instrumentation Report: src/io/resolves.ts

## Summary
- **Status**: success
- **Spans added**: 6
- **Attempts**: 1 (initial-generation)
- **Input tokens**: 5.1K
- **Output tokens**: 83.5K

## Schema Extensions
- `span.taze.io.load_cache`
- `span.taze.io.dump_cache`
- `span.taze.fetch.package_data`
- `span.taze.check.resolve_dependency`
- `span.taze.check.resolve_dependencies`
- `span.taze.check.resolve_package`
- `taze.cache.hit`
- `taze.cache.changed`

## Validation Journey
1. **Attempt 1**: 0 errors

## Notes
- getVersionOfRange, updateTargetVersion, and getDiff are exported but purely synchronous functions with no I/O or async work — skipped per RST-001 (no spans on synchronous data transformations). isUrlPackage, isLocalPackage, and isAliasedPackage are the same: pure regex predicates.
- now, ttl, and parseAliasedPackage are unexported internal helpers — skipped per RST-004 (do not instrument unexported functions when an exported orchestrator already covers the path).
- The inner catch(err) block in dumpCache logs a warning and swallows the error without rethrowing — this is a graceful-degradation catch, so no recordException or setStatus was added per NDS-007.
- taze.cache.hit (boolean) and taze.cache.changed (boolean) are new schema attributes. No existing registered key captures cache hit/miss state or whether the cache has unflushed changes. The taze.check.* attributes cover dependency-check metadata, taze.write.* covers package-manifest writes, and taze.fetch.* covers registry fetches — none is semantically equivalent to in-process cache state.
- In resolveDependencies, changed return Promise.all(...) to const result = await Promise.all(...) so the span's finally block fires after all concurrent resolutions complete rather than immediately when the promise is created. This also enables setting taze.check.packages_outdated from the resolved array. 6 of 15 functions (40%) are instrumented — the remaining 9 are pure synchronous utilities (RST-001) or unexported helpers (RST-004), all legitimately excluded.

## Advisory Findings
- CDQ-006 (isRecording Guard):404: setAttribute value "result.filter(d => d.update).length" at line 404 has an expensive computation without span.isRecording() guard. Wrap expensive attribute computations in an if (span.isRecording()) check to avoid unnecessary computation when the span is not being sampled.
- CDQ-007 (Attribute Data Quality):238: CDQ-007: setAttribute value "raw.name" at line 238 accesses a property of "raw" without a null/undefined guard. If "raw" can be null or undefined, this will throw at runtime. Add an `if (raw)` check or use optional chaining (`raw?.name`).
- CDQ-007 (Attribute Data Quality):239: CDQ-007: setAttribute value "raw.currentVersion" at line 239 accesses a property of "raw" without a null/undefined guard. If "raw" can be null or undefined, this will throw at runtime. Add an `if (raw)` check or use optional chaining (`raw?.currentVersion`).
- CDQ-007 (Attribute Data Quality):356: CDQ-007: setAttribute value "dep.update" at line 356 accesses a property of "dep" without a null/undefined guard. If "dep" can be null or undefined, this will throw at runtime. Add an `if (dep)` check or use optional chaining (`dep?.update`).
- CDQ-007 (Attribute Data Quality):358: CDQ-007: setAttribute value "dep.targetVersion" at line 358 accesses a property of "dep" without a null/undefined guard. If "dep" can be null or undefined, this will throw at runtime. Add an `if (dep)` check or use optional chaining (`dep?.targetVersion`).
- CDQ-007 (Attribute Data Quality):380: CDQ-007: setAttribute value "deps.length" at line 380 accesses a property of "deps" without a null/undefined guard. If "deps" can be null or undefined, this will throw at runtime. Add an `if (deps)` check or use optional chaining (`deps?.length`).
- CDQ-007 (Attribute Data Quality):382: CDQ-007: setAttribute value "options.mode" at line 382 accesses a property of "options" without a null/undefined guard. If "options" can be null or undefined, this will throw at runtime. Add an `if (options)` check or use optional chaining (`options?.mode`).
- CDQ-007 (Attribute Data Quality):420: CDQ-007: setAttribute value "pkg.name" at line 420 accesses a property of "pkg" without a null/undefined guard. If "pkg" can be null or undefined, this will throw at runtime. Add an `if (pkg)` check or use optional chaining (`pkg?.name`).
- SCH-001 (Span Names Match Registry): SCH-001: declared span extension "taze.fetch.package_data" may be a semantic duplicate of existing registry operation "taze.io.load_package". If these operations are equivalent, reuse "taze.io.load_package" instead of declaring a new extension. If they are a different operation class, this advisory can be ignored.
- SCH-001 (Span Names Match Registry): SCH-001: declared span extension "taze.check.resolve_dependencies" may be a semantic duplicate of existing registry operation "taze.check.resolve_dependency". If these operations are equivalent, reuse "taze.check.resolve_dependency" instead of declaring a new extension. If they are a different operation class, this advisory can be ignored.
- SCH-001 (Span Names Match Registry): SCH-001: declared span extension "taze.check.resolve_package" may be a semantic duplicate of existing registry operation "taze.io.load_package". If these operations are equivalent, reuse "taze.io.load_package" instead of declaring a new extension. If they are a different operation class, this advisory can be ignored.
