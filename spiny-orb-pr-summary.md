## Summary

- **Files processed**: 33
- **Committed**: 13
- **No changes needed**: 16
- **Failed**: 4

## Per-File Results

| File | Status | Spans | Attempts | Cost | Libraries | Schema Extensions |
|------|--------|-------|----------|------|-----------|-------------------|
| src/api/check.ts | success | 1 | 1 | $0.06 | — | `span.taze.check_packages` |
| src/cli.ts | success | 2 | 1 | $0.33 | — | `span.taze.cli.run` |
| src/commands/check/checkGlobal.ts | success | 1 | 1 | $0.17 | — | `span.taze.check_global` |
| src/commands/check/index.ts | success | 1 | 1 | $0.18 | — | `span.taze.check.run` |
| src/commands/check/interactive.ts | success | 1 | 1 | $0.18 | — | `span.taze.check.interactive` |
| src/config.ts | success | 1 | 1 | $0.10 | — | `span.taze.config.resolve`, `taze.config.found` |
| src/io/bunWorkspaces.ts | success | 2 | 1 | $0.13 | — | `span.taze.bun_workspace.load`, `span.taze.bun_workspace.write` |
| src/io/packageJson.ts | success | 2 | 1 | $0.19 | — | `span.taze.package_json.load`, `span.taze.package_json.write`, `taze.package_json.filepath` |
| src/io/packageYaml.ts | success | 4 | 1 | $0.21 | — | `span.taze.read_yaml`, `span.taze.write_yaml`, `span.taze.package_yaml.load`, `span.taze.package_yaml.write` |
| src/io/packages.ts | success | 3 | 1 | $0.58 | — | `span.taze.packages.write_json`, `span.taze.packages.load_package`, `span.taze.packages.load_packages` |
| src/io/pnpmWorkspaces.ts | success | 2 | 1 | $0.46 | — | `span.taze.pnpm_workspace.load`, `span.taze.pnpm_workspace.write` |
| src/io/resolves.ts | failed: Validation failed: NDS-003, NDS-003, NDS-003, NDS-003, NDS-003, NDS-003 — NDS-003: original line 49 missing/modified: if (!cacheChanged) The agent must preserve all original business logic. Only add instrumentation — do not modify, remove, or reorder existing code. | 0 | 2 | $1.22 | — | — |
| src/io/yarnWorkspaces.ts | success | 2 | 1 | $0.32 | — | `span.taze.yarn_workspace.load`, `span.taze.yarn_workspace.write`, `taze.yarn_workspace.catalog_count` |
| src/utils/packument.ts | success | 2 | 2 | $0.21 | — | `span.taze.fetch.npm`, `span.taze.fetch.jsr` |
| src/utils/sort.ts | failed: Rolled back: end-of-run test failure | 0 | 1 | $0.00 | — | — |
| src/utils/time.ts | failed: Rolled back: end-of-run test failure | 0 | 1 | $0.00 | — | — |
| src/utils/versions.ts | failed: Rolled back: end-of-run test failure | 0 | 1 | $0.00 | — | — |

**No changes needed** (16 files, 0 spans): src/addons/index.ts, src/addons/vscode.ts, src/commands/check/render.ts, src/constants.ts, src/filters/diff-sorter.ts, src/index.ts, src/io/dependencies.ts, src/log.ts, src/render.ts, src/types.ts, src/utils/config.ts, src/utils/context.ts, src/utils/dependenciesFilter.ts, src/utils/diff.ts, src/utils/package.ts, src/utils/sha.ts

## Span Category Breakdown

| File | External Calls | Schema-Defined | Service Entry Points | Total Functions |
|------|---------------|----------------|---------------------|-----------------|
| src/addons/index.ts | 0 | 0 | 0 | 0 |
| src/addons/vscode.ts | 0 | 0 | 0 | 1 |
| src/api/check.ts | 0 | 0 | 1 | 2 |
| src/cli.ts | 0 | 0 | 1 | 1 |
| src/commands/check/checkGlobal.ts | 0 | 0 | 1 | 4 |
| src/commands/check/index.ts | 0 | 0 | 1 | 1 |
| src/commands/check/interactive.ts | 0 | 0 | 1 | 6 |
| src/config.ts | 0 | 0 | 1 | 2 |
| src/constants.ts | 0 | 0 | 0 | 0 |
| src/io/bunWorkspaces.ts | 0 | 0 | 2 | 4 |
| src/io/packageJson.ts | 0 | 0 | 2 | 3 |
| src/io/packageYaml.ts | 0 | 0 | 4 | 5 |
| src/io/packages.ts | 0 | 0 | 3 | 5 |
| src/io/pnpmWorkspaces.ts | 0 | 0 | 2 | 3 |
| src/io/yarnWorkspaces.ts | 0 | 0 | 2 | 4 |
| src/types.ts | 0 | 0 | 0 | 0 |
| src/utils/context.ts | 0 | 0 | 0 | 0 |
| src/utils/diff.ts | 0 | 0 | 0 | 0 |
| src/utils/packument.ts | 2 | 0 | 0 | 4 |

## Schema Changes

# Summary of Schema Changes
## Registry versions
Baseline: 0.1.0

Head: 0.1.0

## Registry Attributes
### Added
- taze.config.found
- taze.package_json.filepath
- taze.yarn_workspace.catalog_count




### New Span IDs (23)

- `span.taze.bun_workspace.load`
- `span.taze.bun_workspace.write`
- `span.taze.check.interactive`
- `span.taze.check.run`
- `span.taze.check_global`
- `span.taze.check_packages`
- `span.taze.cli.run`
- `span.taze.config.resolve`
- `span.taze.fetch.jsr`
- `span.taze.fetch.npm`
- `span.taze.package_json.load`
- `span.taze.package_json.write`
- `span.taze.package_yaml.load`
- `span.taze.package_yaml.write`
- `span.taze.packages.load_package`
- `span.taze.packages.load_packages`
- `span.taze.packages.write_json`
- `span.taze.pnpm_workspace.load`
- `span.taze.pnpm_workspace.write`
- `span.taze.read_yaml`
- `span.taze.write_yaml`
- `span.taze.yarn_workspace.load`
- `span.taze.yarn_workspace.write`

## Review Attention

- **src/io/packageYaml.ts**: 4 spans added (average: 1) — outlier, review recommended
- **src/io/packages.ts**: 3 spans added (average: 1) — outlier, review recommended

### Advisory Findings

**src/api/check.ts**
- CDQ-007 (Attribute Data Quality): setAttribute value "packages.length" at line 30 accesses a property of "packages" without a null/undefined guard. If "packages" can be null or undefined, this will throw at runtime. Add an `if (packages)` check or use optional chaining (`packages?.length`).
- CDQ-007 (Attribute Data Quality): setAttribute value "options.mode" at line 32 accesses a property of "options" without a null/undefined guard. If "options" can be null or undefined, this will throw at runtime. Add an `if (options)` check or use optional chaining (`options?.mode`).
- CDQ-007 (Attribute Data Quality): setAttribute value "options.recursive" at line 34 accesses a property of "options" without a null/undefined guard. If "options" can be null or undefined, this will throw at runtime. Add an `if (options)` check or use optional chaining (`options?.recursive`).
- CDQ-007 (Attribute Data Quality): setAttribute value "options.write" at line 36 accesses a property of "options" without a null/undefined guard. If "options" can be null or undefined, this will throw at runtime. Add an `if (options)` check or use optional chaining (`options?.write`).

**src/cli.ts**
- CDQ-007 (Attribute Data Quality): setAttribute value "options.write" at line 63 accesses a property of "options" without a null/undefined guard. If "options" can be null or undefined, this will throw at runtime. Add an `if (options)` check or use optional chaining (`options?.write`).
- CDQ-007 (Attribute Data Quality): setAttribute value "options.recursive" at line 66 accesses a property of "options" without a null/undefined guard. If "options" can be null or undefined, this will throw at runtime. Add an `if (options)` check or use optional chaining (`options?.recursive`).

**src/commands/check/checkGlobal.ts**
- CDQ-007 (Attribute Data Quality): setAttribute value "options.mode" at line 41 accesses a property of "options" without a null/undefined guard. If "options" can be null or undefined, this will throw at runtime. Add an `if (options)` check or use optional chaining (`options?.mode`).
- SCH-001 (Span Names Match Registry): SCH-001 (Span Names Match Registry) check failed: "taze.check_global" at line 35: not found in registry span definitions.
Available registry operations: taze.check_packages, taze.cli.run
Span names must match an operation defined in the Weaver telemetry registry. Either use a registered operation name or add a new span definition to the registry.

**src/commands/check/index.ts**
- CDQ-007 (Attribute Data Quality): setAttribute value "options.mode" at line 25 accesses a property of "options" without a null/undefined guard. If "options" can be null or undefined, this will throw at runtime. Add an `if (options)` check or use optional chaining (`options?.mode`).

**src/commands/check/interactive.ts**
- CDQ-007 (Attribute Data Quality): setAttribute value "pkgs.length" at line 46 accesses a property of "pkgs" without a null/undefined guard. If "pkgs" can be null or undefined, this will throw at runtime. Add an `if (pkgs)` check or use optional chaining (`pkgs?.length`).
- CDQ-007 (Attribute Data Quality): setAttribute value "checked.size" at line 47 accesses a property of "checked" without a null/undefined guard. If "checked" can be null or undefined, this will throw at runtime. Add an `if (checked)` check or use optional chaining (`checked?.size`).

**src/io/bunWorkspaces.ts**
- CDQ-006 (isRecording Guard): setAttribute value "Object.keys(versions).length" at line 86 has an expensive computation without span.isRecording() guard. Wrap expensive attribute computations in an if (span.isRecording()) check to avoid unnecessary computation when the span is not being sampled.
- CDQ-007 (Attribute Data Quality): setAttribute value "pkg.filepath" at line 79 accesses a property of "pkg" without a null/undefined guard. If "pkg" can be null or undefined, this will throw at runtime. Add an `if (pkg)` check or use optional chaining (`pkg?.filepath`).

**src/io/packageJson.ts**
- CDQ-007 (Attribute Data Quality): setAttribute value "filepath" at line 42 appears to be a filesystem path. Absolute paths are high-cardinality and expose developer environment details. Use a relative path or a derived attribute (e.g., basename) instead.
- CDQ-007 (Attribute Data Quality): setAttribute value "deps.length" at line 65 accesses a property of "deps" without a null/undefined guard. If "deps" can be null or undefined, this will throw at runtime. Add an `if (deps)` check or use optional chaining (`deps?.length`).
- CDQ-007 (Attribute Data Quality): setAttribute value "pkg.filepath" at line 96 accesses a property of "pkg" without a null/undefined guard. If "pkg" can be null or undefined, this will throw at runtime. Add an `if (pkg)` check or use optional chaining (`pkg?.filepath`).
- SCH-004 (No Redundant Schema Entries): Attribute key "taze.package_json.filepath" at line 42 appears to be a semantic duplicate of an existing registry entry (judge confidence: 92%). Use the existing registered key "taze.write.file_path" instead of "taze.package_json.filepath". Both attributes capture the file path concept within the taze domain, with "taze.write.file_path" being the semantically equivalent registered key that should be used for consistency.

**src/io/packageYaml.ts**
- CDQ-007 (Attribute Data Quality): setAttribute value "filepath" at line 31 appears to be a filesystem path. Absolute paths are high-cardinality and expose developer environment details. Use a relative path or a derived attribute (e.g., basename) instead.
- CDQ-007 (Attribute Data Quality): setAttribute value "filepath" at line 56 appears to be a filesystem path. Absolute paths are high-cardinality and expose developer environment details. Use a relative path or a derived attribute (e.g., basename) instead.
- CDQ-007 (Attribute Data Quality): setAttribute value "filepath" at line 88 appears to be a filesystem path. Absolute paths are high-cardinality and expose developer environment details. Use a relative path or a derived attribute (e.g., basename) instead.
- CDQ-007 (Attribute Data Quality): setAttribute value "pkg.filepath" at line 141 accesses a property of "pkg" without a null/undefined guard. If "pkg" can be null or undefined, this will throw at runtime. Add an `if (pkg)` check or use optional chaining (`pkg?.filepath`).

**src/io/packages.ts**
- CDQ-007 (Attribute Data Quality): setAttribute value "filepath" at line 26 appears to be a filesystem path. Absolute paths are high-cardinality and expose developer environment details. Use a relative path or a derived attribute (e.g., basename) instead.
- CDQ-007 (Attribute Data Quality): setAttribute value "packages.length" at line 207 accesses a property of "packages" without a null/undefined guard. If "packages" can be null or undefined, this will throw at runtime. Add an `if (packages)` check or use optional chaining (`packages?.length`).

**src/io/pnpmWorkspaces.ts**
- CDQ-006 (isRecording Guard): setAttribute value "Object.keys(versions).length" at line 102 has an expensive computation without span.isRecording() guard. Wrap expensive attribute computations in an if (span.isRecording()) check to avoid unnecessary computation when the span is not being sampled.
- CDQ-007 (Attribute Data Quality): setAttribute value "filepath" at line 19 appears to be a filesystem path. Absolute paths are high-cardinality and expose developer environment details. Use a relative path or a derived attribute (e.g., basename) instead.
- CDQ-007 (Attribute Data Quality): setAttribute value "pkg.filepath" at line 81 accesses a property of "pkg" without a null/undefined guard. If "pkg" can be null or undefined, this will throw at runtime. Add an `if (pkg)` check or use optional chaining (`pkg?.filepath`).

**src/io/yarnWorkspaces.ts**
- CDQ-006 (isRecording Guard): setAttribute value "Object.keys(versions).length" at line 83 has an expensive computation without span.isRecording() guard. Wrap expensive attribute computations in an if (span.isRecording()) check to avoid unnecessary computation when the span is not being sampled.
- CDQ-007 (Attribute Data Quality): setAttribute value "filepath" at line 19 appears to be a filesystem path. Absolute paths are high-cardinality and expose developer environment details. Use a relative path or a derived attribute (e.g., basename) instead.
- CDQ-007 (Attribute Data Quality): setAttribute value "catalogs.length" at line 58 accesses a property of "catalogs" without a null/undefined guard. If "catalogs" can be null or undefined, this will throw at runtime. Add an `if (catalogs)` check or use optional chaining (`catalogs?.length`).
- CDQ-007 (Attribute Data Quality): setAttribute value "pkg.filepath" at line 76 accesses a property of "pkg" without a null/undefined guard. If "pkg" can be null or undefined, this will throw at runtime. Add an `if (pkg)` check or use optional chaining (`pkg?.filepath`).

## Agent Notes

Each instrumented file has a companion `.instrumentation.md` file in the same directory (e.g., `src/api.js` → `src/api.instrumentation.md`) containing the agent's full decision notes.

## Rolled Back Files

The following files were rolled back to their pre-instrumentation state due to test failures.

| File | Reason |
|------|--------|
| src/utils/sort.ts | Rolled back: end-of-run test failure |
| src/utils/time.ts | Rolled back: end-of-run test failure |
| src/utils/versions.ts | Rolled back: end-of-run test failure |

## Short-Lived Process Setup Guidance

This project is configured as a short-lived process (`targetType: short-lived`). CLIs, scripts, Lambda functions, and batch jobs need special telemetry setup to ensure spans are exported before the process exits.

### Span Processor

Use `SimpleSpanProcessor` instead of the default `BatchSpanProcessor`. Batch processing delays export by up to 5 seconds — a CLI that finishes in under 5 seconds will exit before the batch timer fires, losing all spans silently.

```javascript
import { SimpleSpanProcessor } from '@opentelemetry/sdk-trace-base';
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http';

spanProcessors: [new SimpleSpanProcessor(new OTLPTraceExporter({
  url: 'http://localhost:4318/v1/traces',
}))]
```

### process.exit Interception

If your application calls `process.exit()`, intercept it to flush spans before terminating:

```javascript
let isShuttingDown = false;
const originalExit = process.exit;
process.exit = (code) => {
  if (isShuttingDown) return originalExit.call(process, code);
  isShuttingDown = true;
  process.exitCode = code ?? 0;
  sdk.shutdown()
    .catch((err) => console.error('OTel SDK shutdown error:', err))
    .then(() => new Promise(resolve => setTimeout(resolve, 1000)))
    .finally(() => originalExit.call(process, process.exitCode));
};
```

## Token Usage

| | Ceiling | Actual |
|---|---------|--------|
| **Cost** | $77.22 | $4.63 |
| **Input tokens** | 3,300,000 | 40,913 |
| **Output tokens** | — | 234,617 |
| **Cache read tokens** | — | 186,235 |
| **Cache write tokens** | — | 248,095 |

Model: `claude-sonnet-4-6` | Files: 33 | Total file size: 97,041 bytes

## Live-Check Compliance

OK

## Agent Version

`1.0.0`

## Warnings

- File failed: /Users/whitney.lee/Documents/Repositories/taze/src/io/resolves.ts — Validation failed: NDS-003, NDS-003, NDS-003, NDS-003, NDS-003, NDS-003 — NDS-003: original line 49 missing/modified: if (!cacheChanged)
The agent must preserve all original business logic. Only add instrumentation — do not modify, remove, or reorder existing code.
- End-of-run test suite failed: Command failed: sh -c pnpm vitest run --exclude test/cli.test.ts --exclude test/packageConfig.test.ts

[31m⎯⎯⎯⎯⎯⎯⎯[39m[1m[41m Failed Tests 1 [49m[22m[31m⎯⎯⎯⎯⎯⎯⎯[39m

[41m[1m FAIL [22m[49m test/resolves.test.ts[2m > [22mresolveDependency
[31m[1mAssertionError[22m: expected true to be false // Object.is equality[39m

[32m- Expected[39m
[31m+ Received[39m

[32m- false[39m
[31m+ true[39m

[36m [2m❯[22m test/resolves.test.ts:[2m136:16[22m[39m
    [90m134|[39m   expect(true).toBe((await resolveDependency(makePkgForResolutions('**…
    [90m135|[39m   expect(true).toBe((await resolveDependency(makePkgForResolutions('@f…
    [90m136|[39m   expect(true).toBe((await resolveDependency(makePkgForResolutions('@f…
    [90m   |[39m                [31m^[39m
    [90m137|[39m
    [90m138|[39m   [90m// pnpm overrides[39m

[31m[2m⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[1/1]⎯[22m[39m


- Live-check partial: 1 file(s) failed instrumentation (/Users/whitney.lee/Documents/Repositories/taze/src/io/resolves.ts). Compliance report may be incomplete — spans from failed files are missing. This warning is advisory — the run completed; successfully instrumented files are unaffected. To get full coverage, review the failed files above and re-run spiny-orb on them.
- Rolled back 3 file(s) due to end-of-run test failure