# Instrumentation Report: src/io/resolves.ts

## Summary
- **Status**: success
- **Spans added**: 6
- **Attempts**: 1 (initial-generation)
- **Input tokens**: 4.7K
- **Output tokens**: 28.0K

## Schema Extensions
- `span.taze.io.load_cache`
- `span.taze.io.dump_cache`
- `span.taze.fetch.get_package_data`
- `span.taze.check.resolve_dependency`
- `span.taze.check.resolve_dependencies`
- `span.taze.check.resolve_package`

## Validation Journey
1. **Attempt 1**: 0 errors

## Notes
- span.taze.io.load_cache: no matching schema span exists for the cache-load operation (taze.io.load_package and taze.io.load_packages are already in use and semantically refer to package manifests, not the resolution cache file).
- span.taze.io.dump_cache: no matching schema span exists for writing the resolution cache to disk. taze.io.write_json is already in use and refers to a different operation.
- span.taze.fetch.get_package_data: fetches package metadata from npm or JSR registry; categorised under fetch rather than io because it makes network calls. No existing schema span matches — taze.io.load_package is already in use and refers to package manifest loading, not registry metadata retrieval.
- span.taze.check.resolve_dependency: resolves a single dependency by fetching metadata and comparing versions. No existing schema span matches — taze.check.run is already in use and refers to the top-level CLI check.
- span.taze.check.resolve_dependencies: orchestrates concurrent resolution of all deps in a package. No existing schema span matches; distinct from taze.check.resolve_dependency (single vs. batch).
- span.taze.check.resolve_package: resolves all dependencies for one PackageMeta, calls resolveDependencies internally. No existing schema span matches.
- getVersionOfRange, updateTargetVersion, getDiff — synchronous pure functions with no I/O; skipped per RST-001.
- isUrlPackage, isLocalPackage, isAliasedPackage — synchronous single-expression helpers; skipped per RST-001.
- parseAliasedPackage — unexported synchronous helper; skipped per RST-004 and RST-001.
- now, ttl — unexported trivial helpers; skipped per RST-004 and RST-001.
- In getPackageData the outer span catch binding is named 'error'; the inner tracking variable 'let error: any' is block-scoped to the try block and does not conflict with the catch binding at the same nesting level.
- In dumpCache the inner catch (err) swallows the error without rethrowing — NDS-007 applies; no recordException or setStatus(ERROR) added to that inner catch.
- In resolveDependency the 'catch (e: any) { err = e.message || e }' block and the trailing empty 'catch {}' both swallow errors without rethrowing — NDS-007 applies; error recording added only to the outer span-level catch.
- taze.io.file_path is sanitized to the basename using inline string manipulation (cachePath.split(/[\\/]/).filter(Boolean).pop() ?? '') as required by CDQ-007 for filesystem path values on non-file.* attribute keys; no new import was added.
- resolveDependencies: return-value capture applied to Promise.all(...) to derive taze.check.packages_outdated from the resolved array. The multi-line call expression is preserved exactly; only the statement form changed from return to const result = await ... / return result.
- All attributes used (taze.cache.hit, taze.cache.changed, taze.io.file_path, taze.package.name, taze.package.current_version, taze.fetch.registry, taze.check.packages_total, taze.check.packages_outdated) are already registered in the schema; attributesCreated is 0.

## Advisory Findings
- SCH-001 (Span Names Match Registry): Fired because a span name doesn't match your Weaver registry or doesn't follow the required dotted-notation format (e.g. myapp.user.create). Use the registry name or declare a new span as a schemaExtension.
- SCH-001 (Span Names Match Registry): Fired because a span name doesn't match your Weaver registry or doesn't follow the required dotted-notation format (e.g. myapp.user.create). Use the registry name or declare a new span as a schemaExtension.
- SCH-001 (Span Names Match Registry): Fired because a span name doesn't match your Weaver registry or doesn't follow the required dotted-notation format (e.g. myapp.user.create). Use the registry name or declare a new span as a schemaExtension.
- SCH-001 (Span Names Match Registry): Fired because a span name doesn't match your Weaver registry or doesn't follow the required dotted-notation format (e.g. myapp.user.create). Use the registry name or declare a new span as a schemaExtension.

## Agent Thinking

### Attempt 1

```
Let me analyze this file carefully and instrument it according to the schema and rules.

Functions to instrument (COV-001 entry points):
1. `loadCache` (line 38) - async, exported
2. `dumpCache` (line 48) - async, exported
3. `getPackageData` (line 62) - async, exported
4. `resolveDependency` (line 194) - async, exported
5. `resolveDependencies` (line 317) - async, exported
6. `resolvePackage` (line 344) - async, exported

Functions to skip (RST-001 - synchronous, no I/O):

```
