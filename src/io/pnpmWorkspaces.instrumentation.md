# Instrumentation Report: src/io/pnpmWorkspaces.ts

## Summary
- **Status**: success
- **Spans added**: 2
- **Attempts**: 1 (initial-generation)
- **Input tokens**: 1.5K
- **Output tokens**: 25.6K
- **Cached tokens**: 17.5K

## Schema Extensions
- `span.taze.pnpm_workspace.load`
- `span.taze.pnpm_workspace.write`

## Validation Journey
1. **Attempt 1**: 0 errors

## Notes
- writeYaml is a single-line thin wrapper that returns writeFile(...) directly — it has no logic of its own and was skipped (RST-003: no spans on thin wrappers that delegate entirely to another function).
- createPnpmWorkspaceEntry is an unexported nested helper inside loadPnpmWorkspace — it was skipped because it performs only in-memory data transformation with no I/O and is covered by the parent span's context (RST-004: instrument the exported orchestrator, not unexported helpers).
- taze.pnpm_workspace.load and taze.pnpm_workspace.write are schema extensions — the registry defines bun_workspace and package_yaml variants but has no pnpm_workspace span group. The new names follow the established taze.<manifest_type>.<operation> pattern exactly.
- taze.write.changes_count is set inside the if (pkg.context.hasChanged()) block because versions may be non-empty but the document may already be at the target state; counting changes only when an actual write occurs avoids reporting 0-change writes misleadingly.
- pkg.filepath and the resolved filepath variable are full filesystem paths passed to the registered taze.package_json.filepath and taze.write.file_path attributes — basename is not available in this file (only resolve from pathe is imported), and adding a new import to comply with CDQ-007 is disallowed; raw paths are used as a known limitation.

## Advisory Findings
- CDQ-006 (isRecording Guard):102: setAttribute value "Object.keys(versions).length" at line 102 has an expensive computation without span.isRecording() guard. Wrap expensive attribute computations in an if (span.isRecording()) check to avoid unnecessary computation when the span is not being sampled.
- CDQ-007 (Attribute Data Quality):19: CDQ-007: setAttribute value "filepath" at line 19 appears to be a filesystem path. Absolute paths are high-cardinality and expose developer environment details. Use a relative path or a derived attribute (e.g., basename) instead.
- CDQ-007 (Attribute Data Quality):81: CDQ-007: setAttribute value "pkg.filepath" at line 81 accesses a property of "pkg" without a null/undefined guard. If "pkg" can be null or undefined, this will throw at runtime. Add an `if (pkg)` check or use optional chaining (`pkg?.filepath`).
