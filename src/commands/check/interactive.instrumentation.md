# Instrumentation Report: src/commands/check/interactive.ts

## Summary
- **Status**: success
- **Spans added**: 1
- **Attempts**: 3 (fresh-regeneration)
- **Input tokens**: 18.9K
- **Output tokens**: 22.1K
- **Cached tokens**: 19.6K

## Schema Extensions
- `span.taze.check.interactive`

## Validation Journey
1. **Attempt 1**: 2 blocking errors (NDS-003 (Code Preserved):2)
2. **Attempt 2**: 1 blocking error (NDS-003 (Code Preserved):1)
3. **Attempt 3**: 0 errors

## Notes
- promptInteractive is the exported async entry point for the interactive TUI mode — it receives a COV-001 span named 'taze.check.interactive'. The schema has no matching span definition for this operation, so it is declared as a schema extension.
- The process.exit() calls inside nested onKey callback closures (case 'q'/'escape' in createListRenderer, and the ctrl+c handler in registerInput) are not preceded by span.end() — adding span.end() before those calls would require modifying the original conditional structure (NDS-003). The span.end() in the finally block covers the normal resolution path via promise.resolve(pkgs). The process.exit() early-exit paths will cause the span to leak, which is a known CDQ-001 limitation in this file.
- Used taze.package.deps_count (registered attribute, type int) to capture the number of PackageMeta packages passed in. This is set before the early-return guard so the span carries context on all paths including the empty-deps early exit.
- createListRenderer, createVersionSelectRender, sortDeps, flatDeps, and registerInput are all unexported internal helper functions defined inside promptInteractive. RST-004 applies — they are fully covered by the orchestrating promptInteractive span and do not need their own spans.
- The inner function declarations (flatDeps, sortDeps, createListRenderer, createVersionSelectRender, registerInput) are placed inside the try block, preserving their position after the return statement exactly as in the original. In ES2015+ strict mode, function declarations are hoisted to the top of their enclosing block, so calls to these functions before their textual declaration within the same block remain valid.

## Advisory Findings
- CDQ-007 (Attribute Data Quality):20: CDQ-007 (Attribute Data Quality) fired for one or more of: a PII attribute name (like author, email, or username) or a raw filesystem path where a basename would be safer. PII in traces can violate privacy policies and is worth fixing. The path finding is lower severity — fix it when the code will run in a context where the basename utility is already imported.
- SCH-001 (Span Names Match Registry): SCH-001 (Span Names Match Registry) fired because a span name doesn't match your Weaver registry or doesn't follow the required dotted-notation format (e.g. myapp.user.create). Use the registry name or declare a new span as a schemaExtension.

## Agent Thinking

### Attempt 1

```
Let me analyze this file carefully.

The file contains `promptInteractive` which is an exported async function - this is a COV-001 entry point requiring a span.

Looking at the function structure:
- It's async and exported
- It contains `process.exit()` calls directly in the body (inside nested functions like `createListRenderer`'s `onKey`, and in `registerInput`)
- The `process.exit()` calls are inside nested functions, not in the top-level body of `promptInteractive` itself

Wait, let me re-examine. The `process.exit()` calls are inside:
1. `createListRenderer` → `onKey` → case 'escape'/'q': `process.exit()`
2. `registerInput` → `process.stdin.on('keypress', ...)` → `process.exit()`

These are NOT directly in the body of `promptInteractive` - they're inside nested function definitions. So RST-006 doesn't apply to `promptInteractive` itself. However, the function uses `return await promise.finally(...)` which means it's genuinely async and awaits completion. The `process.exit()` calls inside the closures would bypass the span's finally block, but those are in nested functions called later, not in the direct execution of `promptInteractive`.

If `process.exit()` is called in the keypress handler or in `onKey`, that would kill the process during the `await promise` inside `promptInteractive`, so the span's `finally` block would indeed be bypassed. But RST-006 specifically says "Do NOT add a span to an async function that calls `process.exit()` directly in its body" — the key is "directly." The `process.exit()` calls are inside nested function definitions like `createListRenderer` and `registerInput`, not directly in `promptInteractive`'s body itself.

Even though practically speaking the finally block won't run if `process.exit()` gets called during the await, the guidance says COV-001 wins over RST-006 anyway, so I'll go ahead and instrument `promptInteractive`. For the span name, `taze.check.run` is already taken, so I'll use `taze.check.interactive` instead. The inner functions like `flatDeps`, `sortDeps`, `createListRenderer`, and `registerInput` are unexported internal helpers.

Since `promptInteractive` is the exported orchestrator that covers all their paths, I don't need to add spans to those inner functions per RST-004. For `promptInteractive` itself, I need at least one attribute - I can use the package count from `pkgs` and the check mode from `options`, checking if `CheckOptions` has a `mode` field to map to `taze.check.mode`. Since `flatDeps` is a function declaration, it's hoisted within scope and I could call it before its textual position. But for simplicity, I'll just set `taze.package.deps_count` to `pkgs.length` as the package count, which is available from the start.

Setting up the span attributes... I should set `taze.package.deps_count` using `pkgs.length` at the start of the span before any processing happens. For the `process.exit()` calls that are nested inside the span callback, I need to add `span.end()` before each one to ensure the span is properly closed before the process terminates, following the CDQ-001 requirement. The closures within the span callback will have access to `span` through their lexical scope, so I can call `span.end()` before each `process.exit()` call. My approach is to wrap the `promptInteractive` body in `tracer.startActiveSpan()`, add the package count attribute, and ensure `span.end()` gets called before any exit points as well as in the finally block for normal termination. Writing the instrumented code... Writing the interactive prompt handler... Writing interactive renderer... Handling keyboard navigation and selection... Writing the interactive renderer... Setting up input handling... Adding span.end() before process.exit() calls requires converting single-line if statements to block form, which is necessary for proper instrumentation without violating the non-instrumentation code modification rule. The same applies to the escape/q case handlers where I just need to insert the span.end() call before the exit.

For the early return of an empty array, the finally block will still execute and call span.end(), so no additional handling is needed there. And since taze.package.deps_count is already in the registered schema, I'm not creating any new attributes.

Now I'm looking at what gets added to the schema extensions - the span taze.check.interactive is new, so that goes in. For the span categories, I have one service entry point with promptInteractive, no external calls, and I need to count the functions in the file - there's the exported promptInteractive function plus several inner functions like flatDeps, sortDeps, and the various render and input registration functions. I'm adding instrumentation to handle `process.exit()` calls by ending the span before they execute, and setting the package count metric based on how many package.json files are being checked. Now I need to generate the final JSON output with the complete instrumented code, keeping in mind that the inner function declarations are hoisted so they can be called before their textual position in the code. Writing the instrumented code...
```

### Attempt 2

````
The NDS-003 failures are about the `if ((key.ctrl && key.name === 'c')) process.exit()` line. I converted it to a block form, but I need to preserve the original single-line form. I need to insert `span.end()` before it without modifying the original line.

The original line is:
```
          if ((key.ctrl && key.name === 'c'))
            process.exit()
```

Wait, looking at the error more carefully:
- Line 232: `if (key.ctrl && key.name === 'c') process.exit();` - this is the original (single line)
- Line 233: `if (key.ctrl && key.name === 'c')` - this is what I produced (split into block form)

So the original is a single-line if statement. I converted it to a block form which is flagged as NDS-003.

The CDQ-001 rule says to add `span.end()` before `process.exit()`. But I can't modify the structure of the original `if` statement. I need to add `span.end()` before the existing single-line if without changing the if structure. I could add a separate `span.end()` call that's guarded by the same condition, so both the span ending and the process exit happen when the condition is met. I'm duplicating the conditional check to add instrumentation while preserving the original exit logic exactly as it was. For the CDQ-007 advisory, I need to examine how the `pkgs` parameter is being used since it's already typed as an array.
````

### Attempt 3

```
Let me analyze the file and instrument it properly. The key constraint is that `promptInteractive` is the entry point (COV-001) and needs a span.

The function `promptInteractive` calls `process.exit()` directly inside `onKey` handlers (in `createListRenderer`). However, these are inside nested callbacks, not directly in `promptInteractive`'s body. The RST-006 rule says don't add a span to a function that calls `process.exit()` directly in its body, but COV-001 overrides RST-006 for entry points.

Wait, let me re-read: "When RST-006 conflicts with COV-001 (the function is an async entry point), COV-001 wins". 

Since the `process.exit()` calls are in inner functions rather than directly in `promptInteractive`'s body, RST-006 doesn't actually apply here anyway. The function is an async entry point, so it definitely gets a span. For the `startActiveSpan` callback, I'll use an async function since `promptInteractive` is async. The function has a `return await promise.finally(...)` structure, so I need to wrap the entire body properly, accounting for the early return when `flatDeps().length === 0`. I see the issue now—my previous attempt violated NDS-003 by adding span.end() before process.exit(), which modified the control flow around that exit call. The constraint says line 233 must be reproduced exactly, and I need to respect the original logic without inserting span management code into the keypress handler itself. The span.end() needs to happen through the finally block instead, not by intercepting the process.exit() calls directly. The agent duplicated the condition check when trying to add `span.end()` before `process.exit()`, which violated the non-instrumentation constraint. The real issue is that line 233 closes the keypress handler callback, and I need to insert the span cleanup without duplicating the existing conditional logic—just adding `span.end()` directly before each `process.exit()` call instead. Writing the exit handler... I'm realizing I need to accept that I can't add `span.end()` before the `process.exit()` calls in nested callbacks without modifying the original code structure, which violates the constraints. Instead, I'll wrap the entire function with span tracking and use a finally block to ensure cleanup happens, making the span variable accessible to inner functions through closure. Adding instrumentation lines like `span.end()` before `process.exit()` should be fine since that's just inserting new code, not modifying existing lines. The constraint about line 233 being exactly `})` means the original content needs to stay intact, but adding lines before it shouldn't violate that as long as the line itself remains unchanged.

Given the NDS-003 constraint about not modifying non-instrumentation code, I should avoid adding conditional checks like `if (key.ctrl && key.name === 'c')` since that duplicates existing logic. The safest approach is to skip adding `span.end()` before `process.exit()` calls in nested callbacks to stay within the constraints.

Now I'm thinking about what attributes to set on the `promptInteractive` span. I can use `taze.check.mode` for the sort/check mode, `taze.check.recursive` from the options, and `taze.package.deps_count` for the number of packages or dependencies being checked. I'll set this based on either the package count or the total resolved dependencies.

Since the schema doesn't have a predefined span for `promptInteractive`, I'll create one with the `taze.` prefix convention and call it `taze.check.interactive`.

Writing instrumented code... Now I'm iterating through the packages to identify which dependencies have updates available, marking them for selection and updating their target versions if needed. Once I've collected all the dependencies that need attention, I'm setting up the interactive renderer with input handling and returning a promise that resolves when the user completes their selections.

I'm realizing there's a structural issue with how the inner functions are scoped—they're declared after the return statement but need to be accessible within the span callback if I'm wrapping everything in tracing logic. I'm wrapping the main logic in a try-catch-finally block to handle tracing, but I'm realizing that function declarations inside the try block won't be hoisted to the outer scope in strict mode—they'll be scoped to the block itself, which breaks the current structure where those helper functions are used throughout the function body. I need to be careful about how the span variable flows through the nested functions as closures, and I should avoid adding `span.end()` calls before `process.exit()` since that approach didn't work before. For the span attributes, I'll set `taze.package.deps_count` to the length of the packages array, then write out the complete instrumented file while preserving the original structure. Structuring the span callback... Function declarations inside a block scope are hoisted to the top of that block in strict mode, so I can safely reference them before they're defined in the code. I'll wrap everything in the try/catch/finally structure and write out the complete file now.
```
