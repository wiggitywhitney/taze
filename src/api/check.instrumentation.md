# Instrumentation Report: src/api/check.ts

## Summary
- **Status**: success
- **Spans added**: 2
- **Attempts**: 1 (initial-generation)
- **Input tokens**: 1.4K
- **Output tokens**: 6.9K

## Schema Extensions
- `span.taze.check.packages`
- `span.taze.check.single_project`

## Validation Journey
1. **Attempt 1**: 0 errors

## Notes
- CheckPackages (exported, COV-001 entry point) receives the span 'taze.check.packages'. No existing schema span name matched — 'taze.check.run' is already consumed by a CLI runner, and 'taze.check.packages' describes the orchestration of multiple packages. Declared as a schema extension.
- CheckSingleProject (unexported, COV-004 async I/O) receives the span 'taze.check.single_project'. RST-004 defers to COV-004 here because CheckSingleProject performs async I/O (resolvePackage, writePackage) and is the primary per-package processing unit. 'taze.check.resolve_package' is already consumed by the resolvePackage helper in a different file, so a new name is needed.
- options.mode, options.recursive, and options.write are guarded with != null before setAttribute because CheckOptions fields are optional and these values could be undefined at runtime.
- pkg.name is guarded with != null before setAttribute because the surrounding code explicitly filters out packages with falsy names (the .filter(i => i) chain in privatePackageNames), indicating name may be undefined on a PackageMeta.
- taze.write.changes_count is used on the CheckSingleProject span to capture the number of dependency updates found — this is the registered key for write-related change counts and semantically matches (changes are dependency version updates about to be written).
- resolvedCount (cumulative dependency resolution count) was not captured as an attribute because its value at span-close reflects total cumulative resolutions across all parallel child spans, not a property of the CheckPackages operation itself. taze.check.packages_loaded has type: string in the schema which does not match a count, and taze.check.packages_outdated would require aggregating across all resolved packages after the parallel processing completes — that aggregation would be a method call chain (packages.flatMap(...).filter(...).length) requiring an isRecording guard and the complexity outweighs the diagnostic value when child spans already capture per-package change counts.

## Advisory Findings
- CDQ-007 (Attribute Data Quality):37: Fired for one or more of: a PII attribute name (like author, email, or username) or a raw filesystem path where a basename would be safer. PII in traces can violate privacy policies and is worth fixing. For the path finding, prefer basename() when already imported, or inline filePath.split(/[\\/]/).filter(Boolean).pop() ?? '' otherwise — no new import required either way.
- CDQ-007 (Attribute Data Quality):95: Fired for one or more of: a PII attribute name (like author, email, or username) or a raw filesystem path where a basename would be safer. PII in traces can violate privacy policies and is worth fixing. For the path finding, prefer basename() when already imported, or inline filePath.split(/[\\/]/).filter(Boolean).pop() ?? '' otherwise — no new import required either way.
- SCH-001 (Span Names Match Registry): Fired because a span name doesn't match your Weaver registry or doesn't follow the required dotted-notation format (e.g. myapp.user.create). Use the registry name or declare a new span as a schemaExtension.

## Agent Thinking

### Attempt 1

```
Let me analyze this file and instrument it according to the schema and rules.

Key functions to instrument:
1. `CheckPackages` (line 17) - COV-001 entry point, exported async function
2. `CheckSingleProject` (line 61) - COV-004 async function

Let me look at the schema for matching span names:
- `span.taze.check.resolve_package` - already used as `taze.check.resolve_package`
- Need to find matching span names for these two functions

Looking at the already-in-use span names, I need unique names:
- For `CheckPackages`: There's no exact schema match. The schema has `span.taze.check.run` but that's already used. I'll need to check - wait, looking at the schema groups, there's `span.taze.check.run` but it's already in use. 

I need to double check the full list of schema-defined span IDs to find unused ones that fit these two functions, including entries like global, install_pkg, interactive, load_global_npm/pnpm, resolve_dependencies, resolve_dependency, and resolve_package.

Still listing span names... None of these map directly to `CheckPackages` or `CheckSingleProject`, so I'm trying to figure out an appropriate span name under the `taze.check` namespace for these functions.

For attributes, I'm mapping `CheckPackages` options like mode, recursive, and write_mode to registered attributes, plus considering a packages-total count. For `CheckSingleProject`, I'm looking at package name and write-changes attributes.

I notice `taze.check.packages_loaded` is declared as a string type in the schema even though it represents a count, so I need to follow that convention when instrumenting rather than treating it as a number.

`taze.check.recursive`, `taze.check.write_mode`, `taze.package.name`, and `taze.write.changes_count` for the remaining spots, and confirm none of these need isRecording guards since they're all direct property accesses like packages.length, changes.length, and pkg.name rather than method calls. Now I'm mapping out how to structure the CheckPackages function itself, starting with its async signature.

I need to check whether options.force, options.write, options.recursive, and options.mode are truly optional in the CheckOptions type, since the existing code guards against falsy values for force and write, meaning I should likely guard these attribute settings with a null check rather than assuming they're always present.

I'll keep the return types unannotated to match the original, using startActiveSpan with an async callback, and preserve CheckSingleProject's return of pkg. I'm deciding to skip adding an attribute for resolvedCount since its semantics as "packages_loaded" are unclear, and moving on to check CDQ-007 for the pkg handling.

Now I'm wrapping the CheckPackages logic in try/catch/finally since the original lacked error handling, and setting the packages_total attribute directly after loading packages without needing a guard.

Writing the instrumented imports...

Adding the remaining callback types, then writing the CheckPackages function that starts a tracing span and records attributes for mode, recursive, and write options...

Now I'm implementing cache loading, package loading with tracking of total counts, filtering out private monorepo packages from dependency resolution, and setting up a progress counter for the dependency resolution callback.

Then I'm creating a concurrency-limited queue and running each package's dependency check in parallel within that queue context, invoking the before/after callbacks around each package, then dumping the cache and returning the resolved packages.

Now I'm wrapping the single-project check in a tracing span, catching and recording any errors on the span before rethrowing, and ending the span in a finally block. Inside CheckSingleProject, I'm setting the package name as a span attribute, resolving the package's dependencies through resolvePackage, then filtering the resolved list down to only the entries that have updates available.

I'm now examining whether writes should proceed—if the write option is set and there are pending changes, I check the beforePackageWrite callback's result to decide whether to actually call writePackage and then fire afterPackageWrite. I'm pausing to double-check whether pkg.name is guaranteed to be defined, since CheckEventCallbacks' afterPackagesLoaded receives an array of PackageMeta and I want to make sure the privatePackageNames filtering logic doesn't leave gaps.

I've decided pkg.name should be reliably present for a valid PackageMeta in this context, so I'll skip adding a null guard for the span attribute. Similarly, changes.length is always numeric, so that attribute doesn't need extra guarding either. Now I want to verify how changes are filtered for updates in a related check.

`.length` accesses on `changes` and `packages` are direct property accesses that don't need CDQ-006 guards since they operate on the filter results themselves. I'm now planning two new span names for the schema extensions, one for CheckPackages and another related span.

Checking through the attributes list, everything I'm using is already registered - mode, recursive, write_mode, packages_total, package name, and changes_count - so no new attributes need creation, just the schema extension for the two span names. I'm also double-checking that I haven't collapsed any multi-line code constructs against the NDS-003 rule.

Now I'm categorizing the functions in this file: CheckPackages counts as the one service entry point, while CheckSingleProject is an internal async function, giving me two total functions to account for.

I'll settle on serviceEntryPoints=1, externalCalls=0, schemaDefined=0, totalFunctionsInFile=2, noting CheckSingleProject separately as a COV-004 async internal span. Now I need to check whether `pkg.name` could be undefined and add a guard before setting the attribute, so I'm adding a conditional check around setting the package name span attribute.

Given that `privatePackageNames` filters out falsy names elsewhere, names could theoretically be empty, so I'll keep the guard. I'll also guard `options.mode` and other optional properties from `CheckOptions` since I'm not fully certain of their types, then move on to writing the final answer.


```
