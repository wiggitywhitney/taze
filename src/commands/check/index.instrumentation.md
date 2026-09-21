# Instrumentation Report: src/commands/check/index.ts

## Summary
- **Status**: success
- **Spans added**: 1
- **Attempts**: 1 (initial-generation)
- **Input tokens**: 2.0K
- **Output tokens**: 7.3K

## Schema Extensions
- `span.taze.check.run`

## Validation Journey
1. **Attempt 1**: 0 errors

## Notes
- Added span `taze.check.run` for the exported async `check` function — this is the CLI entry point for the taze check command (COV-001). No schema-defined span matched this operation exactly; the existing schema spans (`taze.check.global`, `taze.check.install_pkg`, etc.) were already claimed by earlier files in this run.
- All six attributes set on the span (`taze.check.mode`, `taze.check.recursive`, `taze.check.write_mode`, `taze.check.packages_loaded`, `taze.check.packages_total`, `taze.check.packages_outdated`) are already registered in the schema — no extension attribute declarations are needed.
- The schema declares `taze.check.packages_loaded` with `type: string`. The value `resolvePkgs.length` is a number, so it is coerced via `String()` to conform to the declared type.
- The `taze.check.write_mode` attribute is set at span open using the initial value of `options.write`. The option can be reassigned mid-function via interactive prompts, but the schema brief describes it as 'whether taze was run with --write', which refers to the CLI invocation flag — capturing the initial value is correct.
- CDQ-006 `isRecording()` guards are omitted for all `setAttribute` calls on this COV-001 entry point span, per the documented exemption.
- The `taze.check.agent` registered attribute was not set — its brief ('Agent-discovered attribute: taze.check.agent') provides no actionable semantics for mapping to a value in this function's signature or body.
- Declared `span.taze.check.run` as a schema extension because no existing schema span covers the top-level `check` command entry point. The pre-claimed span names (`taze.check.global`, `taze.check.load_global_pnpm`, etc.) represent sub-operations within the check flow, not the outer orchestrator.

## Agent Thinking

### Attempt 1

```
Let me analyze this file carefully. The main function `check` is an exported async function that serves as a CLI entry point (COV-001). I need to instrument it.

Looking at the schema, there are span names already in use:
- `taze.check.global`
- `taze.check.load_global_pnpm`
- `taze.check.load_global_npm`
- `taze.check.install_pkg`

The `check` function is the entry point. I need to create a span for it. Looking at the schema spans defined, the pre-existing ones are `span.taze.check.global`, `span.taze.check.install_pkg`, `span.taze.check.load_global_npm`, `span.taze.check.load_global_pnpm`. None of these match the `check` command entry point exactly.
I'll invent `taze.check.run` as the new span name for this entry point, since `taze.check.global` is already taken -- this becomes a schema extension: `span.taze.check.run`. For attributes, I'm planning to capture `taze.check.mode`, `taze.check.recursive`, and `taze.check.write_mode` from the options object.

I also want to record `taze.check.packages_total` and `taze.check.packages_outdated` once packages are loaded and resolved. Now I'm thinking through where in the function body I can actually set these values without restructuring too much -- mode and recursive at the start, write_mode before the return, and the package counts once resolution finishes.

I can compute total deps and outdated count via reductions after packages resolve. Since CDQ-006 guards don't apply to COV-001 entry point spans, I don't need to wrap the attribute-setting in recording checks here, so I'll instrument the whole `check` function body with `startActiveSpan` and set the mode, recursive, write, total, and outdated attributes directly.

For the write attribute, since `options.write` may get reassigned mid-execution (like from a prompt result), I'll set its initial value at the start but keep in mind NDS-003 constraints against altering non-instrumentation logic.

Now I'm computing the total dependency count and the number of outdated packages by reducing over the resolved packages list.

I realize these span attribute calls involve computation, but since this is a COV-001 entry point, they're exempt from the isRecording() guard requirement per CDQ-006. I also want to populate `taze.check.packages_loaded`, which I can derive from `packages.length` right after the packages are fetched.

The agent-discovered attributes `taze.check.agent` and `taze.check.packages_loaded` don't have clear semantics in the brief, so I'll set those aside and focus on the well-defined schema attributes: mode, recursive, write_mode, packages_total, and packages_outdated. I'll still populate packages_loaded using the count right after loading completes.

Now I'm planning the instrumentation: adding OTel imports and a tracer constant, wrapping the check function body in an active span, setting attributes for mode/recursive/write, then capturing packages_loaded, packages_total, and packages_outdated once resolvePkgs is set. Writing instrumented code...

Setting up the tracing span for the check operation, tracking mode and options as attributes, then initializing progress bars and calling CheckPackages to load and process the package list.

Finishing dependency resolution tracking, then recording telemetry on package counts and outdated dependencies before stopping the progress bars and handing off to interactive prompt if needed, wrapping it all in error handling.

Now I notice a discrepancy: the schema declares `taze.check.packages_loaded` as a string type, but I'm setting it to a numeric length value. That mismatch means I should probably convert the count to a string to match the declared attribute type.

Similarly, `taze.check.agent` is also typed as string but unclear what value belongs there, so I'll leave it out. For boolean-typed options like `recursive` and `write`, which could be undefined, I'll coerce them safely using fallback defaults like `?? false`.

For `options.mode`, since it maps to enum string values and might be optional, I'll guard with a null check before using it, and for the packages loaded count I'll coerce the array length to a string. Now I want to write out the complete file carefully, preserving every original line exactly.

Tracing through the original `check` function, I see it implicitly returns a number, so wrapping it in `startActiveSpan` means the callback needs to return `exitCode` too. There are actually two return points for `exitCode` in the original—one early return after the `!hasChanges` block, and one at the very end—so I need to make sure both are preserved correctly inside the span wrapper.

I'm now working out how to coerce various values to match the telemetry schema types: converting counts to strings or numbers where needed, and using `Boolean()` for flags like `recursive` and `write_mode`, keeping in mind `options.write` might be undefined initially.

Since all six attributes I've identified are already part of the existing schema, `attributesCreated` should end up at 0.

The span name `taze.check.run` itself is new though, so that belongs under `schemaExtensions` rather than as an attribute. I'm now working out the full categorization: one schema extension for the span, zero new attributes, and the span counts as a service entry point since it's the sole function in the file.

I also need to double check how `options.write` gets reassigned later via a prompts call, so I preserve that logic exactly when I write the actual code.

Now I'm carefully drafting the complete file, making sure the `check` function properly returns the value from `startActiveSpan` and that no existing lines get altered.


```
