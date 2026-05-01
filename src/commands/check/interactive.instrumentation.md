# Instrumentation Report: src/commands/check/interactive.ts

## Summary
- **Status**: success
- **Spans added**: 1
- **Attempts**: 1 (initial-generation)
- **Input tokens**: 2.3K
- **Output tokens**: 7.4K

## Schema Extensions
- `span.taze.check.interactive`

## Validation Journey
1. **Attempt 1**: 0 errors

## Notes
- promptInteractive is the sole exported async function and acts as the CLI entry point for the interactive dependency selection flow — it receives a span covering the entire user session (COV-001). The span name 'taze.check.interactive' is a new extension (span.taze.check.interactive) because none of the four schema-defined span names (taze.check.run, taze.check_global, taze.check_packages, taze.cli.run) describe this sub-operation — all were also already in use by earlier files in this run.
- taze.check.packages_total is set to pkgs.length (total packages passed in) and taze.check.packages_outdated is set to checked.size immediately after the initial population loop — this captures how many deps had updates pre-checked before user interaction, which is the best approximation of 'outdated packages found' available at that point in execution.
- flatDeps, sortDeps, createListRenderer, createVersionSelectRender, and registerInput are all unexported inner functions — they are skipped from direct instrumentation (RST-004). Their execution is covered by the parent span on promptInteractive.
- process.exit() appears inside nested closures (the onKey switch-case and the keypress event handler), not directly in the promptInteractive function body, so RST-006 does not apply and the function is safely spanned with a finally-guarded span.end().
- The span covers an interactive terminal session that may last indefinitely until the user confirms or cancels — the span lifecycle is naturally bounded by the resolution of the controlled promise, after which span.end() is called in the finally block.

## Advisory Findings
- CDQ-007 (Attribute Data Quality):46: CDQ-007: setAttribute value "pkgs.length" at line 46 accesses a property of "pkgs" without a null/undefined guard. If "pkgs" can be null or undefined, this will throw at runtime. Add an `if (pkgs)` check or use optional chaining (`pkgs?.length`).
- CDQ-007 (Attribute Data Quality):47: CDQ-007: setAttribute value "checked.size" at line 47 accesses a property of "checked" without a null/undefined guard. If "checked" can be null or undefined, this will throw at runtime. Add an `if (checked)` check or use optional chaining (`checked?.size`).
