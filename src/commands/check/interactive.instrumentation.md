# Instrumentation Report: src/commands/check/interactive.ts

## Summary
- **Status**: success
- **Spans added**: 1
- **Attempts**: 1 (initial-generation)
- **Input tokens**: 2.3K
- **Output tokens**: 12.1K

## Schema Extensions
- `span.taze.check.interactive`

## Validation Journey
1. **Attempt 1**: 0 errors

## Notes
- promptInteractive is the only exported function and serves as the interactive UI entry point — it receives a span named 'taze.check.interactive'. All four existing schema span names (taze.check, taze.cli.action, taze.check.global, taze.check.command) were already in use by earlier files, so a new extension name was required (RST-001/SCH-001).
- span.taze.check.interactive is reported as a schema extension because no matching span existed in the registry for the interactive terminal prompt operation — it represents a distinct user-facing interactive selection loop rather than a programmatic check or command dispatch.
- The five inner functions (flatDeps, sortDeps, createListRenderer, createVersionSelectRender, registerInput) are all unexported declarations scoped inside promptInteractive — they are not instrumented (RST-004: only exported orchestrators receive spans; their I/O becomes child spans through context propagation from the outer span).
- process.exit() is called inside the onKey callbacks of both createListRenderer and registerInput's keypress handler. When a user presses 'q', 'escape', or Ctrl-C, process.exit() bypasses the span's finally block, causing the span to leak without ending. This is a known runtime limitation — the span will not appear in exports for cancel/quit paths.
- taze.check.packages_total is set using pkgs.reduce over pkg.resolved.length to capture total dependency entries across all package.json files, matching the schema definition. taze.check.packages_outdated is set after the early-return guard (when deps exist) using flatDeps().length — this reflects deps that have an update available, matching the schema's 'Number of dependencies found to have available updates'. Both attributes are already registered in the schema so attributesCreated is 0.

## Advisory Findings
- CDQ-006 (isRecording Guard):27: setAttribute value "pkgs.reduce((acc, pkg) => acc + pkg.reso..." at line 27 has an expensive computation without span.isRecording() guard. Wrap expensive attribute computations in an if (span.isRecording()) check to avoid unnecessary computation when the span is not being sampled.
- CDQ-006 (isRecording Guard):48: setAttribute value "flatDeps().length" at line 48 has an expensive computation without span.isRecording() guard. Wrap expensive attribute computations in an if (span.isRecording()) check to avoid unnecessary computation when the span is not being sampled.
