# Instrumentation Report: src/io/bunWorkspaces.ts

## Summary
- **Status**: success
- **Spans added**: 3
- **Attempts**: 2 (multi-turn-fix)
- **Input tokens**: 11.6K
- **Output tokens**: 10.7K
- **Cached tokens**: 30.4K

## Schema Extensions
- `span.taze.check.run`

## Validation Journey
1. **Attempt 1**: 4 blocking errors (SCH-001 (Span Names Match Registry):4)
2. **Attempt 2**: 0 errors

## Notes
- SCH-001 requires using the registry-defined span name 'taze.check.run' for all taze operations. The validator flagged 'taze.bun_workspace.load' and 'taze.bun_workspace.write' as semantic duplicates of 'taze.check.run', so all three spans (loadBunWorkspace, writeBunWorkspace, writeBunJSON) now use 'taze.check.run'.
- writeBunJSON is an unexported async function performing file I/O — added a span per COV-004 advisory. The inner empty catch block (indent detection fallback) remains without error recording per NDS-007, as it is a graceful-degradation catch that does not propagate errors.
- taze.write.changes_count setAttribute in writeBunWorkspace is guarded with span.isRecording() per CDQ-006, since Object.keys(versions).length involves a keyed object scan that benefits from sampling-aware guards.
- Raw file paths are passed to taze.write.file_path since basename from pathe is not imported in this file. Adding a new non-OTel import to derive a basename would violate CDQ-007's import constraint — noted as a known limitation.

## Advisory Findings
- CDQ-007 (Attribute Data Quality):19: CDQ-007: setAttribute value "filepath" at line 19 appears to be a filesystem path. Absolute paths are high-cardinality and expose developer environment details. Use a relative path or a derived attribute (e.g., basename) instead.
- CDQ-007 (Attribute Data Quality):62: CDQ-007: setAttribute value "catalogs.length" at line 62 accesses a property of "catalogs" without a null/undefined guard. If "catalogs" can be null or undefined, this will throw at runtime. Add an `if (catalogs)` check or use optional chaining (`catalogs?.length`).
- CDQ-007 (Attribute Data Quality):80: CDQ-007: setAttribute value "pkg.filepath" at line 80 accesses a property of "pkg" without a null/undefined guard. If "pkg" can be null or undefined, this will throw at runtime. Add an `if (pkg)` check or use optional chaining (`pkg?.filepath`).
- CDQ-007 (Attribute Data Quality):82: CDQ-007: setAttribute value "pkg.name" at line 82 accesses a property of "pkg" without a null/undefined guard. If "pkg" can be null or undefined, this will throw at runtime. Add an `if (pkg)` check or use optional chaining (`pkg?.name`).
- CDQ-007 (Attribute Data Quality):136: CDQ-007: setAttribute value "filepath" at line 136 appears to be a filesystem path. Absolute paths are high-cardinality and expose developer environment details. Use a relative path or a derived attribute (e.g., basename) instead.
