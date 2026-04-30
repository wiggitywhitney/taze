# Instrumentation Report: src/io/bunWorkspaces.ts

## Summary
- **Status**: success
- **Spans added**: 2
- **Attempts**: 1 (initial-generation)
- **Input tokens**: 1.2K
- **Output tokens**: 8.0K
- **Cached tokens**: 16.1K

## Schema Extensions
- `span.taze.bun_workspace.load`
- `span.taze.bun_workspace.write`

## Validation Journey
1. **Attempt 1**: 0 errors

## Notes
- loadBunWorkspace reads a bun workspace JSON file and parses catalog entries — it receives a span using the relative path parameter as `taze.write.file_path`. Although this attribute is described as 'path to the package manifest file written', there is no read-specific file path attribute in the registry, and the attribute captures the same concept (identifying which manifest file is being operated on).
- writeBunJSON is an unexported async helper that only performs file I/O on behalf of writeBunWorkspace. It is skipped per RST-004 — the exported orchestrator `writeBunWorkspace` already has a span covering this execution path. The I/O inside writeBunJSON appears as a child operation of the writeBunWorkspace span through context propagation.
- createBunWorkspaceEntry is an unexported synchronous inner function with no I/O — it is skipped per both RST-001 (pure synchronous data transformation) and RST-004 (unexported).
- span.taze.bun_workspace.load and span.taze.bun_workspace.write are new span names not in the registry. No existing schema span matched the bun workspace load or write operations — the closest existing spans cover generic check runs and config resolution, which are semantically distinct from reading/writing a bun workspace manifest file. Both use the 'taze' namespace prefix to remain consistent with the registry.
- For writeBunWorkspace, `taze.write.file_path` is set to `pkg.filepath` which is an absolute filesystem path. `basename` from `pathe` is not imported in this file, so the raw path value is used. This is a known CDQ-007 limitation — the user may wish to import `basename` from `pathe` and apply it here for shorter, privacy-safer attribute values.

## Advisory Findings
- COV-004 (Async Operation Spans):122: "writeBunJSON" (async function) at line 122 has no span. Async functions and await expressions require spans for latency tracking and error visibility. Add a span wrapping this function's body.
- CDQ-006 (isRecording Guard):86: setAttribute value "Object.keys(versions).length" at line 86 has an expensive computation without span.isRecording() guard. Wrap expensive attribute computations in an if (span.isRecording()) check to avoid unnecessary computation when the span is not being sampled.
- CDQ-007 (Attribute Data Quality):79: CDQ-007: setAttribute value "pkg.filepath" at line 79 accesses a property of "pkg" without a null/undefined guard. If "pkg" can be null or undefined, this will throw at runtime. Add an `if (pkg)` check or use optional chaining (`pkg?.filepath`).
