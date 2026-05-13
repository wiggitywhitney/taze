# Instrumentation Report: src/io/yarnWorkspaces.ts

## Summary
- **Status**: success
- **Spans added**: 2
- **Attempts**: 2 (multi-turn-fix)
- **Input tokens**: 9.9K
- **Output tokens**: 24.8K
- **Cached tokens**: 18.9K

## Schema Extensions
- `span.taze.yarnrc.load`
- `span.taze.yarnrc.write`

## Validation Journey
1. **Attempt 1**: 1 blocking error (NDS-001 (Syntax Valid):1)
2. **Attempt 2**: 0 errors

## Notes
- writeYaml is an exported synchronous function that returns a Promise by delegating directly to writeFile — it is a thin wrapper with no logic of its own, so it is skipped per RST-003 (no spans on thin wrappers that are single-expression delegates).
- createYarnWorkspaceEntry is an unexported inner function performing pure data transformation with no I/O — it is skipped per RST-004 (no spans on unexported internals) and RST-001 (no spans on synchronous utilities).
- taze.yarnrc.load and taze.yarnrc.write are new span names not present in the schema registry. The existing pnpm_workspace spans refer to a different format. The schema's taze.write.package_type enum already contains a 'yarnrc' member (value '.yarnrc.yml'), confirming 'yarnrc' as the correct category for these yarn workspace operations.
- taze.write.changes_count is set after the early-return guard in writeYarnWorkspace so it is only present on spans where actual writes occurred; the span always has taze.write.file_path and taze.write.package_type regardless of the early exit path.
- For writeYarnWorkspace pkg.filepath is an absolute path — path.basename is not imported in this file so the raw value is used as a known limitation (CDQ-007: no new non-OTel imports permitted to fix advisory concerns).

## Advisory Findings
- CDQ-006 (isRecording Guard):83: setAttribute value "Object.keys(versions).length" at line 83 has an expensive computation without span.isRecording() guard. Wrap expensive attribute computations in an if (span.isRecording()) check to avoid unnecessary computation when the span is not being sampled.
- CDQ-007 (Attribute Data Quality):76: CDQ-007: setAttribute value "pkg.filepath" at line 76 accesses a property of "pkg" without a null/undefined guard. If "pkg" can be null or undefined, this will throw at runtime. Add an `if (pkg)` check or use optional chaining (`pkg?.filepath`).
- SCH-001 (Span Names Match Registry): SCH-001: declared span extension "taze.yarnrc.write" may be a semantic duplicate of existing registry operation "taze.yarnrc.load". If these operations are equivalent, reuse "taze.yarnrc.load" instead of declaring a new extension. If they are a different operation class, this advisory can be ignored.
