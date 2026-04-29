# Instrumentation Report: src/commands/check/interactive.ts

## Summary
- **Status**: success
- **Spans added**: 1
- **Attempts**: 1 (initial-generation)
- **Input tokens**: 2.3K
- **Output tokens**: 7.3K

## Schema Extensions
- `span.taze.command.interactive`

## Validation Journey
1. **Attempt 1**: 0 errors

## Notes
- promptInteractive is the sole exported async function and the service entry point for the interactive update flow — it receives a span named taze.command.interactive (COV-001). The four span names listed as already-in-use all differ in purpose, so a new name was invented and reported as a schema extension.
- process.exit() is called inside two inner callbacks (the onKey handler in createListRenderer and the keypress listener in registerInput). These are nested functions, not direct calls in the body of promptInteractive, so RST-006 does not apply to the outer function. However, if process.exit() is triggered at runtime, it will bypass the span's finally block and cause the span to leak — this is a known limitation of interactive CLI exit paths.
- taze.check.packages_total is set to pkgs.length (number of package.json files) rather than total dep entries because the total dep count is not available as a flat number before traversal is needed. Attribute value is still useful for basic scope context. taze.check.packages_outdated is set to checked.size after the setup loop, which reflects the count of deps pre-selected for update (those with updates that are not provenance downgrades).
- flatDeps, sortDeps, createListRenderer, createVersionSelectRender, and registerInput are all unexported inner functions used only as helpers inside promptInteractive — they are not instrumented (RST-004: do not add spans to unexported internal functions). Their execution is covered by the parent span on promptInteractive.

## Advisory Findings
- CDQ-007 (Attribute Data Quality):43: CDQ-007: setAttribute value "pkgs.length" at line 43 accesses a property of "pkgs" without a null/undefined guard. If "pkgs" can be null or undefined, this will throw at runtime. Add an `if (pkgs)` check or use optional chaining (`pkgs?.length`).
- CDQ-007 (Attribute Data Quality):44: CDQ-007: setAttribute value "checked.size" at line 44 accesses a property of "checked" without a null/undefined guard. If "checked" can be null or undefined, this will throw at runtime. Add an `if (checked)` check or use optional chaining (`checked?.size`).
