# Instrumentation Report: src/commands/check/checkGlobal.ts

## Summary
- **Status**: success
- **Spans added**: 4
- **Attempts**: 2 (multi-turn-fix)
- **Input tokens**: 14.8K
- **Output tokens**: 14.1K

## Schema Extensions
- `span.taze.check.global`
- `span.taze.package.load_pnpm_global`
- `span.taze.package.load_npm_global`
- `span.taze.package.install`
- `taze.package.deps_count`

## Validation Journey
1. **Attempt 1**: 1 blocking error (NDS-001 (Syntax Valid):1)
2. **Attempt 2**: 0 errors

## Notes
- checkGlobal (exported async entry point) receives a COV-001 root span named taze.check.global. Input attributes taze.check.mode and taze.check.write_mode are guarded with != null since CheckOptions fields may be optional. Output attributes taze.check.packages_total and taze.check.packages_outdated are set after resolution completes so they reflect the final resolved state. CDQ-006 isRecording guards are not applied to COV-001 entry point spans per the CDQ-006 COV-001 exemption.
- loadGlobalPnpmPackage has an inner try/catch that swallows pnpm-not-found errors and returns [] — this is a graceful-degradation catch with no rethrow, so NDS-007 applies and no recordException/setStatus is added to it. The outer span-level catch handles unexpected errors (e.g., JSON.parse failures) and does record the error. taze.config.sources_found is used to report the number of pnpm global installation outputs found. Both 'agent' and 'type' discriminant fields are cast with 'as const' to preserve the literal type inside the async startActiveSpan callback (per the HARD CONSTRAINT on discriminated union return types).
- loadGlobalNpmPackage uses taze.fetch.registry = 'npm' to indicate this span fetches metadata from the npm registry. The 'agent' and 'type' fields are cast with 'as const' to satisfy the GlobalPackageMeta discriminated union inside the async callback. taze.package.deps_count is a new extension attribute (type: int) capturing the number of npm global package dependency entries loaded — no existing registry key precisely describes this output count from a single registry source.
- installPkg is an unexported async function that performs an outbound exec call to install packages. It is instrumented as a COV-004 target because no exported orchestrator span directly wraps its execution path at the granularity needed to observe individual package-manager install operations. taze.write.changes_count captures the number of dependency version entries being updated in this install operation.
- New schema extension taze.package.deps_count declared as type int, brief 'Number of dependency entries loaded from a global package registry source', stability development. No existing registry key is a semantic match: taze.check.packages_total describes totals across a full check run, and taze.write.changes_count describes write operations, not load operations.

## Advisory Findings
- CDQ-007 (Attribute Data Quality):41: CDQ-007 (Attribute Data Quality) fired for one or more of: a PII attribute name (like author, email, or username) or a raw filesystem path where a basename would be safer. PII in traces can violate privacy policies and is worth fixing. The path finding is lower severity — fix it when the code will run in a context where the basename utility is already imported.
- CDQ-007 (Attribute Data Quality):44: CDQ-007 (Attribute Data Quality) fired for one or more of: a PII attribute name (like author, email, or username) or a raw filesystem path where a basename would be safer. PII in traces can violate privacy policies and is worth fixing. The path finding is lower severity — fix it when the code will run in a context where the basename utility is already imported.
- CDQ-007 (Attribute Data Quality):156: CDQ-007 (Attribute Data Quality) fired for one or more of: a PII attribute name (like author, email, or username) or a raw filesystem path where a basename would be safer. PII in traces can violate privacy policies and is worth fixing. The path finding is lower severity — fix it when the code will run in a context where the basename utility is already imported.
- CDQ-007 (Attribute Data Quality):243: CDQ-007 (Attribute Data Quality) fired for one or more of: a PII attribute name (like author, email, or username) or a raw filesystem path where a basename would be safer. PII in traces can violate privacy policies and is worth fixing. The path finding is lower severity — fix it when the code will run in a context where the basename utility is already imported.

## Agent Thinking

### Attempt 1

```
Let me analyze this file and add OpenTelemetry instrumentation according to the schema and rules.

Key functions to instrument:
1. `checkGlobal` (line 31) - COV-001 entry point, exported async function
2. `loadGlobalPnpmPackage` (line 115) - COV-004 async function
3. `loadGlobalNpmPackage` (line 154) - COV-004 async function
4. `installPkg` (line 185) - COV-004 async function

Let me think about what attributes to use for each:

**checkGlobal**: 
- `taze.check.mode` - options.mode
- `taze.check.recursive` - options.recursive
- `taze.check.write_mode` - options.write
- `taze.check.packages_outdated` - number of packages with updates
- `taze.check.packages_total` - total packages

**loadGlobalPnpmPackage**:
- Has a try/catch that returns [] on error - this is a graceful-degradation catch (NDS-007), so don't add recordException/setStatus to it
- Returns array of GlobalPackageMeta - `taze.config.sources_found` could be used for number of pnpm configs found

**loadGlobalNpmPackage**: Returns GlobalPackageMeta with deps

**installPkg**: Uses `taze.write.changes_count` for the number of changes and `taze.package.name` for the package agent

Now I'm defining span names since the schema doesn't have explicit span definitions. I'll use the taze namespace with `taze.check.global` for checkGlobal, `taze.package.load_pnpm_global` for loadGlobalPnpmPackage, `taze.package.load_npm_global` for loadGlobalNpmPackage, and `taze.package.install` for installPkg. For checkGlobal's attributes, I need `taze.check.mode` for the mode option and `taze.check.recursive` for the recursive flag.

For checkGlobal I'll also track `taze.check.write_mode` as a boolean for the write option, then after resolution capture `taze.check.packages_total` for the total dependency count and `taze.check.packages_outdated` for how many have available updates. For loadGlobalPnpmPackage, I'm tracking `taze.config.sources_found` to count the pnpm global installs discovered. For loadGlobalNpmPackage I'll report the number of global npm packages found. For installPkg, I'm using `taze.write.changes_count` for the changes applied, but I need to reconsider what `taze.package.name` should actually represent since pkg.agent is just the package manager type, not a package name.

Looking at the graceful-degradation pattern in loadGlobalPnpmPackage where the catch block returns an empty array without rethrowing, I shouldn't add recordException or setStatus there—instead I'll wrap the function body in a span while keeping the inner try-catch intact. The loadGlobalNpmPackage and installPkg functions don't have existing try-catch blocks to consider. Now I'm thinking about the exec calls as external operations.

Since exec from tinyexec isn't in the auto-instrumentation allowlist, I'd normally add spans for it, but RST-004 says to instrument the orchestrators rather than internal I/O operations. Since loadGlobalPnpmPackage, loadGlobalNpmPackage, and installPkg are already being instrumented as COV-004 targets, the exec calls within them become child operations covered by those parent spans—so separate nested spans for the exec calls aren't necessary. The same logic applies to checkGlobal, which calls these instrumented functions.

For checkGlobal's attributes, I need to set taze.check.mode from options.mode and taze.check.write_mode from options.write, then after computing hasChanges, calculate packages_total as the sum of all deps across the pkgs array and packages_outdated as the count of resolved items with update=true.

Writing instrumented checkGlobal... I need to be careful about null checks for `mode` and `write` options using the `!= null` guard. The span attributes for `packages_total` and `packages_outdated` are computed values that don't require the recording guard, but I do need to ensure `resolvePkgs` is available after the resolution completes so I can properly set the outdated count. Let me trace through the execution flow to make sure the attribute assignments happen at the right point in the try block. For `loadGlobalNpmPackage`, I need to figure out what attributes make sense to track. I could set `taze.fetch.registry` to 'npm' since we're fetching from the npm global registry, and then capture the number of dependencies loaded—maybe with a new attribute like `taze.package.deps_count` to track how many deps are being processed in this context. I'm also considering whether to create a new `taze.package.count` attribute for tracking the number of packages in npm global installations, since existing schema keys don't quite fit this use case. For `installPkg`, I can use `taze.write.changes_count` to track the number of changes being written. Defining schema attributes... For `checkGlobal`, the CDQ-006 exemption means I don't need guards even for computations. I can calculate `packages_total` as the sum of all dependencies across resolved packages, and `packages_outdated` by filtering for those with available updates. I'll compute these metrics right before returning the exit code. I need to calculate `packages_outdated` as the count of resolved packages with updates available, then set both the total and outdated package counts as span attributes in the right places.

Writing the instrumented function... Adding instrumentation to error handling... Completing the function with error handling and span lifecycle management... Setting span attributes for package counts... Adding schema extensions... I'm settling on a simpler approach: tracking `taze.package.deps_count` as a new attribute extension to capture the dependency count in both npm and pnpm flows, along with a few span extensions for registry fetching and change counts. That gives me just one new attribute key to add to the schema. I'm counting the remaining functions and categorizing the span types. There are 4 functions total in the file, and I need to figure out how to classify loadGlobalPnpmPackage, loadGlobalNpmPackage, and installPkg—they're instrumented but aren't external calls or schema-defined spans, so I'm working through whether they fit as service entry points or another category. Writing the instrumented file...
```

### Attempt 2

````
The error is at line 194, which is the return statement in `loadGlobalNpmPackage`. The issue is that inside the `startActiveSpan` callback, TypeScript widens the string literal `'npm'` to `string` for the `agent` field, making it incompatible with `Agent` type. I need to add `as const` to the `agent` field or cast the whole return object.

Looking at the return in `loadGlobalNpmPackage`:
```typescript
return {
  agent: 'npm',
  ...
}
```

I need to add `as const` to `'npm'` or cast the whole object. Let me use `agent: 'npm' as const`.
The `type: 'global'` field likely has the same issue, so I should apply `as const` to both fields to ensure they maintain their literal types.
````
