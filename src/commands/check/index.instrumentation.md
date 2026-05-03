# Instrumentation Report: src/commands/check/index.ts

## Summary
- **Status**: success
- **Spans added**: 1
- **Attempts**: 2 (multi-turn-fix)
- **Input tokens**: 16.3K
- **Output tokens**: 14.7K

## Schema Extensions
- `span.taze.check.execute`

## Validation Journey
1. **Attempt 1**: 1 blocking error (NDS-001 (Syntax Valid):1)
2. **Attempt 2**: 0 errors

## Notes
- options.mode is typed as a union including undefined, so it is guarded with 'if (options.mode != null)' before setAttribute to satisfy TypeScript's strict AttributeValue assignability check.
- The span name 'taze.check.execute' is new because 'taze.check.run' (the closest schema-defined name) was already declared by an earlier file in this run and cannot be reused for a different operation.
- taze.check.packages_total uses pkg.resolved.length as a proxy for total dependency entries since pkg.resolved is the available post-resolution array on PackageMeta.
- taze.check.write_mode is set at function entry with the initial options.write value (the CLI --write flag). In interactive mode options.write may be updated later, but the schema describes it as the CLI invocation flag.

## Advisory Findings
- CDQ-006 (isRecording Guard):66: setAttribute value "resolvePkgs.reduce((acc, pkg) => acc + p..." at line 66 has an expensive computation without span.isRecording() guard. Wrap expensive attribute computations in an if (span.isRecording()) check to avoid unnecessary computation when the span is not being sampled.
- CDQ-006 (isRecording Guard):67: setAttribute value "resolvePkgs.reduce((acc, pkg) => acc + p..." at line 67 has an expensive computation without span.isRecording() guard. Wrap expensive attribute computations in an if (span.isRecording()) check to avoid unnecessary computation when the span is not being sampled.
- CDQ-007 (Attribute Data Quality):26: CDQ-007: setAttribute value "options.mode" at line 26 accesses a property of "options" without a null/undefined guard. If "options" can be null or undefined, this will throw at runtime. Add an `if (options)` check or use optional chaining (`options?.mode`).
- SCH-001 (Span Names Match Registry): SCH-001: declared span extension "taze.check.execute" may be a semantic duplicate of existing registry operation "taze.check.run". If these operations are equivalent, reuse "taze.check.run" instead of declaring a new extension. If they are a different operation class, this advisory can be ignored.
