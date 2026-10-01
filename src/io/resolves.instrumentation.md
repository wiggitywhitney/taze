# Instrumentation Report: src/io/resolves.ts

## Summary
- **Status**: success
- **Spans added**: 6
- **Attempts**: 2 (multi-turn-fix)
- **Input tokens**: 29.8K
- **Output tokens**: 32.2K

## Schema Extensions
- `span.taze.io.load_cache`
- `span.taze.io.dump_cache`
- `span.taze.io.get_package_data`
- `span.taze.resolve.dependency`
- `span.taze.resolve.dependencies`
- `span.taze.resolve.package`

## Validation Journey
1. **Attempt 1**: 1 blocking error (NDS-005 (Control Flow Preserved):1)
2. **Attempt 2**: 0 errors

## Notes
- NDS-005 fix: restored the original inner try/catch block in resolveDependency exactly as written. Removed span.setAttribute calls that had been inserted inside that original try block — those are now only placed outside of original try/catch boundaries (before the first early-return guard and before the final returns after the inner try/catch completes).
- CDQ-007 advisory: added null guards (if (raw != null), if (dep != null), if (deps != null), if (pkg != null)) before setAttribute calls that access properties of function parameters, per advisory guidance. These parameters are typed as non-nullable in TypeScript but the guard provides runtime safety.
- SCH-001 advisories: all six span names are semantically distinct operations — taze.io.load_cache reads a JSON cache file from the OS temp directory, taze.io.dump_cache writes that cache, taze.io.get_package_data fetches or serves cached npm/jsr package metadata, taze.resolve.dependency resolves a single dependency's available update, taze.resolve.dependencies orchestrates parallel resolution across a full dependency list, taze.resolve.package resolves all deps for a PackageMeta and sorts results. None are equivalent to the existing registered spans (taze.io.load_package operates on package manifests, not the metadata cache).
- Skipped (RST-001 — synchronous, no I/O): now, ttl, getVersionOfRange, updateTargetVersion, getDiff, isUrlPackage, isLocalPackage, isAliasedPackage.
- Skipped (RST-004 — unexported internal): parseAliasedPackage — called only from within resolveDependency which has its own span.
- All attributes used are already registered in the schema — attributesCreated is 0.

## Advisory Findings
- SCH-001 (Span Names Match Registry): SCH-001 (Span Names Match Registry) fired because a span name doesn't match your Weaver registry or doesn't follow the required dotted-notation format (e.g. myapp.user.create). Use the registry name or declare a new span as a schemaExtension.
- SCH-001 (Span Names Match Registry): SCH-001 (Span Names Match Registry) fired because a span name doesn't match your Weaver registry or doesn't follow the required dotted-notation format (e.g. myapp.user.create). Use the registry name or declare a new span as a schemaExtension.
- SCH-001 (Span Names Match Registry): SCH-001 (Span Names Match Registry) fired because a span name doesn't match your Weaver registry or doesn't follow the required dotted-notation format (e.g. myapp.user.create). Use the registry name or declare a new span as a schemaExtension.
- SCH-001 (Span Names Match Registry): SCH-001 (Span Names Match Registry) fired because a span name doesn't match your Weaver registry or doesn't follow the required dotted-notation format (e.g. myapp.user.create). Use the registry name or declare a new span as a schemaExtension.
- SCH-001 (Span Names Match Registry): SCH-001 (Span Names Match Registry) fired because a span name doesn't match your Weaver registry or doesn't follow the required dotted-notation format (e.g. myapp.user.create). Use the registry name or declare a new span as a schemaExtension.

## Agent Thinking

### Attempt 1

```
Let me analyze this file and add OpenTelemetry instrumentation according to the schema contract and rules.

Functions to instrument (COV-001 entry points):
1. `loadCache` (line 38) - async, exported
2. `dumpCache` (line 48) - async, exported
3. `getPackageData` (line 62) - async, exported
4. `resolveDependency` (line 194) - async, exported
5. `resolveDependencies` (line 317) - async, exported
6. `resolvePackage` (line 344) - async, exported

Functions to skip (RST-001 - synchronous, no I/O):
`now`, `ttl`, `getVersionOfRange`, `updateTargetVersion`, `getDiff`, `isUrlPackage`, `isLocalPackage`, `isAliasedPackage`, `parseAliasedPackage`

Now I'm checking the span names against the schema to see which ones are already defined and which ones I need to create for the instrumentation.

For the functions in this file that don't have existing spans, I'm mapping them to new span names following the established naming conventions: `loadCache` becomes `taze.io.load_cache`, `dumpCache` becomes `taze.io.dump_cache`, `getPackageData` becomes `taze.io.get_package_data`, and the resolve functions map to `taze.resolve.dependency`, `taze.resolve.dependencies`, and `taze.resolve.package`.

Now I'm thinking through what attributes each span should capture. Continuing with the remaining functions and then working through the try/catch patterns. For `resolvePackage`, I'm registering the package name and dependency count. Now I'm thinking through how to handle the try/catch blocks — `loadCache` needs a span with try/catch/finally, while `dumpCache` already has a catch block for graceful degradation, so I need to be careful about when to record exceptions versus letting it degrade silently.

For `dumpCache` specifically, the existing catch swallows errors without rethrowing, so I'll wrap it with an outer try/finally for the span lifecycle while keeping the inner try/catch intact. I need to set the cache changed attribute before the early return check, then structure the span to handle both the early exit and the file operations.

Wrapping the span... catch block that records the exception and rethrows it to satisfy the COV-003 requirement. Now I'm looking at `getPackageData`, which has a try/catch that gracefully handles errors by returning them as part of the data structure rather than rethrowing, so I'll wrap the whole function with a span and add the outer error recording catch. For `resolveDependency`, I need to examine its two try/catch blocks to determine the right instrumentation approach.

Writing the instrumented function... I see there's a naming conflict with the `error` variable that's already declared at the function scope, so I need to rename the catch parameter to avoid shadowing it. Looking at the original implementation, it fetches package data from either JSR or npm depending on the protocol, with caching and error handling built in. I need to use a different variable name for the outer catch to avoid shadowing the existing `error` variable, so I'll use `outerError` instead. The outer catch needs to record the exception and set error status for observability compliance, then rethrow. Though realistically, most throwing code is already caught by the inner try/catch, so this outer catch might not execute often, but it's still necessary for proper error handling coverage. Now I need to look at the `resolveDependency` function and check for the `taze.package.update_available` attribute.

The challenge is that this function has multiple early return paths, so I need to figure out where to set the attribute. I could set it before each return statement, but that's repetitive. Looking at the different return scenarios - when the package is filtered, when there's no alias version, when it's deprecated, or when there's no target version - they all return early with `update: false`. The final return path is where `update` gets set to its actual value, so I need to handle the attribute assignment carefully across all these branches. I can add the setAttribute calls right before each return statement without modifying the actual return itself, so that works as instrumentation without changing the code structure.

For the practical approach, I'll set the package name and current version attributes at the top of the function from the raw object, then add the update_available attribute at the specific points where I'm instrumenting anyway. Writing the instrumented function... Writing more span handlers... Finishing the error handling and cache logic... I should also capture the `taze.fetch.error` attribute when exceptions occur, so I'll add error recording to the catch block. I'm wrapping the main logic in a span that sets the package name and current version upfront, then adds the update availability flag before the final return statement. I need to set the input attributes before the first guard condition, which is the `isLocalPackage` check. The error handling is more specific to fetch-level spans, so I'll focus on capturing the `update_available` attribute at the two main return points rather than trying to set `taze.fetch.error` here.

For `resolveDependencies`, I'm wrapping the function with a span that tracks the total number of packages being resolved, using `deps.length` directly since it's a straightforward property access.

Now for `resolvePackage`, I'm creating a similar span that captures the package name and its dependency count, then calling `resolveDependencies` with the package's deps array while passing through the progress callback.

Looking at the new spans I'm introducing, I've got `taze.io.load_cache`, `taze.io.dump_cache`, `taze.io.get_package_data`, `taze.resolve.dependency`, `taze.resolve.dependencies`, and `taze.resolve.package`. The good news is all the attributes I'm using are already defined in the schema, so no new attributes needed. All the attributes I'm using are already in the schema, so there are no new attribute extensions to add. Now I'm counting the span categories—there are no external calls being directly spanned since fetchPackage is a local utility, zero schema-defined spans that match exactly, and six service entry points across the functions I'm instrumenting. Let me finish tallying up all the functions in the file. Adding instrumentation calls... Writing the instrumented file... The early returns in resolveDependency already cast to `ResolvedDepChange`, so TypeScript should handle the discriminated union correctly even inside the async callback. Now I need to assemble the complete file and handle the CDQ-006 guards across the entry points. I need to preserve that comment about `resolveDependencies` being callable standalone and respecting the concurrency option. For `loadCache`, I'm checking the logic around the cache file existence and TTL validation before parsing it, making sure the instrumentation wraps the entire async function properly. Finishing the error handling and span lifecycle for the async void function. Since `loadCache` returns `Promise<void>`, I need to return the result of `tracer.startActiveSpan()` so the promise is properly propagated to callers, even though the function itself doesn't explicitly return a value.

Now I'm writing out the complete instrumented file, being careful to preserve all the original code exactly while adding the tracing spans at the right points. I need to count the functions and categorize them correctly — there are about 15 functions total in the file, with 6 being service entry points that should get spans. Writing TypeScript imports... Writing the complete file... Writing instrumented functions... Wrapping the entire function body in the span's try block, so the inner error handling for the cache and API calls stays intact while the outer span catch handles any unexpected errors and the finally ensures the span always ends.

For `resolveDependency`, I'm adding span attributes at the start to capture the package name and version, then before the return statements I'll set attributes for whether an update is available and record any resolution errors.

For `resolveDependencies`, I'm adding a span attribute to track the total number of packages being checked.

For `resolvePackage`, I'm setting attributes for the package name and dependency count before resolving.

Now I need to write out the complete instrumented file, being careful to match the original's 2-space indentation and style conventions. I need to match the original file's style without semicolons, and I'm realizing the `ResolvedDepChange` cast should be fine since it's not a discriminated union that needs the `as const` treatment. Let me just write out the full file now rather than overthinking the details.
```

### Attempt 2

````
The blocking failure is NDS-005: the original try/catch block inside `resolveDependency` was modified. Specifically, I added `span.setAttribute('taze.package.update_available', false)` inside the original try block before `return dep` statements, which caused the inner try block structure to differ from the original.

The removed block is:
```
try {
  if (deprecated && deprecated[dep.currentVersion]) {
    dep.diff = null
    dep.targetVersion = dep.currentVersion
    dep.update = false
    return dep
  }
```

I need to restore the original inner try/catch exactly. 

Looking more carefully at the validator output, the issue is that the original try block checking for deprecated versions is completely missing from my instrumented version. I modified the content of that try block by inserting the span attribute assignment, which changed its structure enough that the validator can't recognize it as the original block.

The solution is to remove those setAttribute calls from inside the original try/catch blocks entirely. I can only instrument outside of the original try/catch boundaries or at function entry/exit points.

For the CDQ-007 advisories about null checks on typed parameters like `raw.name` and `raw.currentVersion`, I should add defensive guards using optional chaining and nullish coalescing even though TypeScript marks them as non-nullable, since the validator is flagging them as potential risks.

But the real blocker is NDS-005, which requires restoring the original try/catch structure—I need to move the `setAttribute` calls back out of the try block to match the original implementation. Adding null guards to the setAttribute calls...
````
