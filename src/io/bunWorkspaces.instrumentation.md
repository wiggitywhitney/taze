# Instrumentation Report: src/io/bunWorkspaces.ts

## Summary
- **Status**: success
- **Spans added**: 2
- **Attempts**: 1 (initial-generation)
- **Input tokens**: 1.2K
- **Output tokens**: 8.6K
- **Cached tokens**: 16.1K

## Schema Extensions
- `span.taze.bun.load_workspace`
- `span.taze.bun.write_workspace`

## Validation Journey
1. **Attempt 1**: 0 errors

## Notes
- loadBunWorkspace reads a bun workspace JSON from disk and parses catalogs — instrumented as a service entry point span named 'taze.bun.load_workspace'. No matching span existed in the registry so this is a schema extension.
- writeBunWorkspace writes updated dependency versions back to the bun workspace file — instrumented as a service entry point span named 'taze.bun.write_workspace'. No matching span existed in the registry so this is a schema extension.
- taze.write.file_path is used on the loadBunWorkspace span (with the relative path parameter) even though the registry describes it as a write-operation attribute. No read-specific path attribute exists in the registry — this is the closest semantic match for capturing which file is being processed.
- createBunWorkspaceEntry is an inner synchronous function that transforms map entries into RawDep arrays with no I/O — skipped (RST-001: no spans on pure synchronous utilities; RST-004: unexported inner function).
- writeBunJSON is an unexported async helper called only from writeBunWorkspace, which already has a span wrapping the call — skipped (RST-004: unexported helper whose I/O is covered by the exported orchestrator's span). The empty catch block in writeBunJSON handles an expected ENOENT condition gracefully with no error propagation — no recordException added (NDS-007: graceful-degradation catch).
- CDQ-007 advisory: pkg.filepath in writeBunWorkspace is an absolute filesystem path. Since path.basename or equivalent is not imported in this file, the raw value is used — this is a known limitation.

## Advisory Findings
- COV-004 (Async Operation Spans):124: "writeBunJSON" (async function) at line 124 has no span. Async functions and await expressions require spans for latency tracking and error visibility. Add a span wrapping this function's body.
- CDQ-006 (isRecording Guard):62: setAttribute value "catalogs.reduce((sum, c) => sum + c.deps..." at line 62 has an expensive computation without span.isRecording() guard. Wrap expensive attribute computations in an if (span.isRecording()) check to avoid unnecessary computation when the span is not being sampled.
- CDQ-006 (isRecording Guard):88: setAttribute value "Object.keys(versions).length" at line 88 has an expensive computation without span.isRecording() guard. Wrap expensive attribute computations in an if (span.isRecording()) check to avoid unnecessary computation when the span is not being sampled.
- CDQ-007 (Attribute Data Quality):82: CDQ-007: setAttribute value "pkg.filepath" at line 82 accesses a property of "pkg" without a null/undefined guard. If "pkg" can be null or undefined, this will throw at runtime. Add an `if (pkg)` check or use optional chaining (`pkg?.filepath`).
- SCH-001 (Span Names Match Registry): SCH-001: declared span extension "taze.bun.load_workspace" may be a semantic duplicate of existing registry operation "taze.cli.run". If these operations are equivalent, reuse "taze.cli.run" instead of declaring a new extension. If they are a different operation class, this advisory can be ignored.
- SCH-001 (Span Names Match Registry): SCH-001: declared span extension "taze.bun.write_workspace" may be a semantic duplicate of existing registry operation "taze.bun.load_workspace". If these operations are equivalent, reuse "taze.bun.load_workspace" instead of declaring a new extension. If they are a different operation class, this advisory can be ignored.
