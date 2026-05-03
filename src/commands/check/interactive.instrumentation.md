# Instrumentation Report: src/commands/check/interactive.ts

## Summary
- **Status**: success
- **Spans added**: 1
- **Attempts**: 1 (initial-generation)
- **Input tokens**: 2.3K
- **Output tokens**: 7.6K

## Schema Extensions
- `span.taze.check.interactive`

## Validation Journey
1. **Attempt 1**: 0 errors

## Notes
- promptInteractive is an exported async entry point that drives the interactive terminal UI for selecting dependency updates — it receives a span named taze.check.interactive (new schema extension; all four schema-defined span names were already claimed by earlier files in this run). The span captures taze.check.packages_total (pkgs.length) and taze.check.packages_outdated (checked.size) using registered schema attribute keys.
- The internal functions flatDeps, sortDeps, createListRenderer, createVersionSelectRender, and registerInput are all unexported helpers defined inside promptInteractive — they are skipped per RST-004 (unexported internals should not receive their own spans; their I/O and logic propagate as children of the outer span through context propagation).
- Known limitation: the keypress handler inside registerInput and the onKey handler in createListRenderer both call process.exit() directly. If the user presses 'q', 'escape', or Ctrl+C, the Node.js process exits synchronously before the finally block in promptInteractive can call span.end(). This causes a span leak on those exit paths at runtime — there is no way to mitigate this without modifying the process.exit() call sites, which would be a non-instrumentation change.
- span.taze.check.interactive is a new schema extension. It represents the interactive terminal session where the user selects which dependency updates to apply. No existing schema span covered this distinct interactive-selection phase; all four defined spans (taze.check.run, taze.cli.run, taze.check.global, taze.check.execute) were already assigned to other operations in this run.

## Advisory Findings
- CDQ-007 (Attribute Data Quality):43: CDQ-007: setAttribute value "pkgs.length" at line 43 accesses a property of "pkgs" without a null/undefined guard. If "pkgs" can be null or undefined, this will throw at runtime. Add an `if (pkgs)` check or use optional chaining (`pkgs?.length`).
- CDQ-007 (Attribute Data Quality):44: CDQ-007: setAttribute value "checked.size" at line 44 accesses a property of "checked" without a null/undefined guard. If "checked" can be null or undefined, this will throw at runtime. Add an `if (checked)` check or use optional chaining (`checked?.size`).
- SCH-001 (Span Names Match Registry): SCH-001: declared span extension "taze.check.interactive" may be a semantic duplicate of existing registry operation "taze.check.run". If these operations are equivalent, reuse "taze.check.run" instead of declaring a new extension. If they are a different operation class, this advisory can be ignored.
