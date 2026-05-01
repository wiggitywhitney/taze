# Instrumentation Report: src/io/yarnWorkspaces.ts

## Summary
- **Status**: success
- **Spans added**: 2
- **Attempts**: 1 (initial-generation)
- **Input tokens**: 1.6K
- **Output tokens**: 20.3K
- **Cached tokens**: 35.6K

## Schema Extensions
- `span.taze.yarn_workspace.load`
- `span.taze.yarn_workspace.write`
- `taze.yarn_workspace.catalog_count`

## Validation Journey
1. **Attempt 1**: 0 errors

## Notes
- loadYarnWorkspace and writeYarnWorkspace are exported async functions performing file I/O — both receive spans (COV-001, COV-004). Span names taze.yarn_workspace.load and taze.yarn_workspace.write are new schema extensions; no matching spans exist in the registry for yarn workspace operations.
- createYarnWorkspaceEntry is an unexported inner function doing pure synchronous data transformation — skipped per RST-004 (unexported) and RST-001 (synchronous, no I/O).
- writeYaml is an exported function but is a thin single-return wrapper delegating entirely to writeFile — skipped per RST-003. Its file-write I/O is covered by the parent writeYarnWorkspace span's context.
- taze.yarn_workspace.catalog_count is a new attribute (not in the registry) recording the number of catalog entries parsed by loadYarnWorkspace. No existing schema key captures this count — the closest registered keys (taze.check.packages_total, taze.write.changes_count) describe different operations. Reported as schema extension.
- taze.package_json.filepath is used for the resolved file path in loadYarnWorkspace — it is the closest registered key capturing a manifest file path, even though this file is a .yarnrc.yml rather than package.json. The registry has no yarn-workspace-specific filepath attribute.

## Advisory Findings
- CDQ-006 (isRecording Guard):83: setAttribute value "Object.keys(versions).length" at line 83 has an expensive computation without span.isRecording() guard. Wrap expensive attribute computations in an if (span.isRecording()) check to avoid unnecessary computation when the span is not being sampled.
- CDQ-007 (Attribute Data Quality):19: CDQ-007: setAttribute value "filepath" at line 19 appears to be a filesystem path. Absolute paths are high-cardinality and expose developer environment details. Use a relative path or a derived attribute (e.g., basename) instead.
- CDQ-007 (Attribute Data Quality):58: CDQ-007: setAttribute value "catalogs.length" at line 58 accesses a property of "catalogs" without a null/undefined guard. If "catalogs" can be null or undefined, this will throw at runtime. Add an `if (catalogs)` check or use optional chaining (`catalogs?.length`).
- CDQ-007 (Attribute Data Quality):76: CDQ-007: setAttribute value "pkg.filepath" at line 76 accesses a property of "pkg" without a null/undefined guard. If "pkg" can be null or undefined, this will throw at runtime. Add an `if (pkg)` check or use optional chaining (`pkg?.filepath`).
