# Instrumentation Report: src/commands/check/index.ts

## Summary
- **Status**: success
- **Spans added**: 1
- **Attempts**: 1 (initial-generation)
- **Input tokens**: 2.0K
- **Output tokens**: 10.2K

## Schema Extensions
- `span.taze.command.check`

## Validation Journey
1. **Attempt 1**: 0 errors

## Notes
- All three schema-defined span names (taze.check.global, taze.check.packages, taze.cli.run) were already declared by earlier files in this run, so the check command entry point received the new name taze.command.check (reported as a schema extension). This maps to the exported async check() function which is the CLI command handler for the check subcommand.
- taze.check.write_mode is set twice: once at the start of the span capturing the initial option value (what the user passed on the CLI), and again just before the final return after interactive prompts may have changed options.write. The final setAttribute overwrites the first, so the span reflects the definitive write decision.
- taze.check.packages_total and taze.check.packages_outdated are set after promptInteractive may have filtered resolvePkgs, so they reflect the packages and dependencies actually acted upon. They are computed inline using .reduce()/.filter() — CDQ-006 guard is not needed here because this is the entry-point span (CDQ-006 exemption for entry-point spans).
- options.mode can be 'default' at runtime (evidenced by the if (options.mode === 'default') guard in the function body), which is not a registered schema enum value. The attribute is still set with whatever string value is present — the schema constraint is advisory, not a runtime validator.
- The writePackage and run (parseNi/parseNup) calls are async I/O operations. They are not manually wrapped here because they are covered by the parent check() span's context propagation, and their own source files are the appropriate place to instrument them (RST-004: instrument exported orchestrators, not their callee helpers, unless no parent span covers that path).

## Advisory Findings
- CDQ-006 (isRecording Guard):75: setAttribute value "resolvePkgs.reduce((acc, pkg) => acc + p..." at line 75 has an expensive computation without span.isRecording() guard. Wrap expensive attribute computations in an if (span.isRecording()) check to avoid unnecessary computation when the span is not being sampled.
- CDQ-006 (isRecording Guard):76: setAttribute value "resolvePkgs.reduce((acc, pkg) => acc + p..." at line 76 has an expensive computation without span.isRecording() guard. Wrap expensive attribute computations in an if (span.isRecording()) check to avoid unnecessary computation when the span is not being sampled.
- CDQ-007 (Attribute Data Quality):25: CDQ-007: setAttribute value "options.mode" at line 25 accesses a property of "options" without a null/undefined guard. If "options" can be null or undefined, this will throw at runtime. Add an `if (options)` check or use optional chaining (`options?.mode`).
- CDQ-007 (Attribute Data Quality):27: CDQ-007: setAttribute value "options.recursive" at line 27 accesses a property of "options" without a null/undefined guard. If "options" can be null or undefined, this will throw at runtime. Add an `if (options)` check or use optional chaining (`options?.recursive`).
