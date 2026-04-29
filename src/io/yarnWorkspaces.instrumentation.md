# Instrumentation Report: src/io/yarnWorkspaces.ts

## Summary
- **Status**: success
- **Spans added**: 2
- **Attempts**: 1 (initial-generation)
- **Input tokens**: 1.5K
- **Output tokens**: 21.8K
- **Cached tokens**: 33.5K

## Schema Extensions
- `span.taze.yarn_workspace.load`
- `span.taze.yarn_workspace.write`
- `taze.yarn_workspace.catalogs_count`

## Validation Journey
1. **Attempt 1**: 0 errors

## Notes
- loadYarnWorkspace and writeYarnWorkspace are exported async functions with file I/O — both receive spans named taze.yarn_workspace.load and taze.yarn_workspace.write respectively (new schema extensions; no yarn-workspace equivalents existed in the registry alongside the bun/pnpm variants).
- createYarnWorkspaceEntry is an unexported inner function that performs pure synchronous data transformation — skipped per RST-004 (unexported) and RST-001 (no I/O).
- writeYaml is an exported synchronous thin wrapper that returns writeFile(...) directly — skipped per RST-003 (single return delegating to another function). Its I/O is covered by the writeYarnWorkspace parent span.
- taze.write.file_path is used for the load span's relative path argument and the write span's pkg.filepath — the schema defines this attribute as accepting both absolute and relative paths, so both usages are schema-conformant.
- taze.yarn_workspace.catalogs_count is a new attribute (schemaExtension) capturing the number of catalog entries parsed. The schema defines analogous keys for bun (taze.bun_workspace.catalogs_count) and pnpm (taze.pnpm_workspace.catalogs_count) workspaces but not for yarn — this fills the gap consistently.

## Advisory Findings
- CDQ-006 (isRecording Guard):83: setAttribute value "Object.keys(versions).length" at line 83 has an expensive computation without span.isRecording() guard. Wrap expensive attribute computations in an if (span.isRecording()) check to avoid unnecessary computation when the span is not being sampled.
- CDQ-007 (Attribute Data Quality):58: CDQ-007: setAttribute value "catalogs.length" at line 58 accesses a property of "catalogs" without a null/undefined guard. If "catalogs" can be null or undefined, this will throw at runtime. Add an `if (catalogs)` check or use optional chaining (`catalogs?.length`).
- CDQ-007 (Attribute Data Quality):76: CDQ-007: setAttribute value "pkg.filepath" at line 76 accesses a property of "pkg" without a null/undefined guard. If "pkg" can be null or undefined, this will throw at runtime. Add an `if (pkg)` check or use optional chaining (`pkg?.filepath`).
- SCH-004 (No Redundant Schema Entries):58: Attribute key "taze.yarn_workspace.catalogs_count" at line 58 may be redundant with registry entry "taze.bun_workspace.catalogs_count" (67% token overlap). Consider using the existing registry attribute instead of creating a new one.
