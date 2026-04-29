# Instrumentation Report: src/io/pnpmWorkspaces.ts

## Summary
- **Status**: success
- **Spans added**: 2
- **Attempts**: 1 (initial-generation)
- **Input tokens**: 1.7K
- **Output tokens**: 23.7K
- **Cached tokens**: 16.4K

## Schema Extensions
- `span.taze.pnpm_workspace.load`
- `span.taze.pnpm_workspace.write`
- `taze.pnpm_workspace.catalogs_count`

## Validation Journey
1. **Attempt 1**: 0 errors

## Notes
- writeYaml is a single-line thin wrapper — it returns writeFile(...) directly with no logic of its own (RST-003: no spans on thin wrappers that delegate to another function). It is skipped.
- createPnpmWorkspaceEntry is an unexported inner helper that builds a data structure synchronously — it has no I/O and is not reachable from outside its enclosing scope (RST-004: no spans on unexported helpers; RST-001: pure synchronous data construction). It is skipped.
- taze.pnpm_workspace.catalogs_count is a new schema extension. The closest existing count attribute is taze.bun_workspace.catalogs_count but that is semantically bound to the bun workspace loader and should not be reused for pnpm catalogs. A pnpm-specific attribute is warranted.
- taze.write.file_path is applied to loadPnpmWorkspace using the relative path parameter rather than the resolved absolute filepath to avoid emitting full host filesystem paths in telemetry. The schema brief for this attribute describes write paths, but the concept (which manifest file was operated on) is semantically equivalent for load operations, so no additional extension attribute was created.
- span.taze.pnpm_workspace.load and span.taze.pnpm_workspace.write are new span names — no existing schema spans cover pnpm-workspace-yaml load or write operations. The bun_workspace, package, and packages span names from the registry are either bun-specific or cover different granularities.

## Advisory Findings
- CDQ-006 (isRecording Guard):89: setAttribute value "Object.keys(versions).length" at line 89 has an expensive computation without span.isRecording() guard. Wrap expensive attribute computations in an if (span.isRecording()) check to avoid unnecessary computation when the span is not being sampled.
- CDQ-007 (Attribute Data Quality):64: CDQ-007: setAttribute value "catalogs.length" at line 64 accesses a property of "catalogs" without a null/undefined guard. If "catalogs" can be null or undefined, this will throw at runtime. Add an `if (catalogs)` check or use optional chaining (`catalogs?.length`).
- CDQ-007 (Attribute Data Quality):82: CDQ-007: setAttribute value "pkg.relative" at line 82 accesses a property of "pkg" without a null/undefined guard. If "pkg" can be null or undefined, this will throw at runtime. Add an `if (pkg)` check or use optional chaining (`pkg?.relative`).
- CDQ-007 (Attribute Data Quality):83: CDQ-007: setAttribute value "pkg.type" at line 83 accesses a property of "pkg" without a null/undefined guard. If "pkg" can be null or undefined, this will throw at runtime. Add an `if (pkg)` check or use optional chaining (`pkg?.type`).
- SCH-004 (No Redundant Schema Entries):64: Attribute key "taze.pnpm_workspace.catalogs_count" at line 64 may be redundant with registry entry "taze.bun_workspace.catalogs_count" (67% token overlap). Consider using the existing registry attribute instead of creating a new one.
