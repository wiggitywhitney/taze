# Instrumentation Report: src/api/check.ts

## Summary
- **Status**: success
- **Spans added**: 1
- **Attempts**: 2 (multi-turn-fix)
- **Input tokens**: 8.1K
- **Output tokens**: 5.9K
- **Cached tokens**: 14.7K

## Schema Extensions
- `span.taze.check.packages`

## Validation Journey
1. **Attempt 1**: 4 blocking errors (NDS-003 (Code Preserved):4)
2. **Attempt 2**: 0 errors

## Notes
- CheckSingleProject is unexported — it is skipped per RST-004 (no spans on unexported internal functions). The COV-004 advisory flags it, but RST-004 takes precedence for unexported helpers; its I/O work is covered by context propagation from the CheckPackages parent span.
- The packages_outdated setAttribute uses an inline reduce expression (pkg.resolved?.filter(i => i.update).length ?? 0) to avoid introducing multi-line non-instrumentation code that would fail NDS-003.
- options and packages are guarded with != null before accessing their properties for setAttribute calls, addressing the CDQ-007 advisories — options is a required parameter in practice but the guard satisfies the validator.
- Span renamed from 'taze.check' to 'taze.check.packages' to add an operation-level component as suggested by the SCH-001 advisory.

## Advisory Findings
- COV-004 (Async Operation Spans):94: "CheckSingleProject" (async function) at line 94 has no span. Async functions and await expressions require spans for latency tracking and error visibility. Add a span wrapping this function's body.
- CDQ-006 (isRecording Guard):73: setAttribute value "packages.reduce((acc, pkg) => acc + (pkg..." at line 73 has an expensive computation without span.isRecording() guard. Wrap expensive attribute computations in an if (span.isRecording()) check to avoid unnecessary computation when the span is not being sampled.
