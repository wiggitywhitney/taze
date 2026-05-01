## Summary

- **Files processed**: 33
- **Committed**: 6
- **No changes needed**: 14
- **Failed**: 13

## Per-File Results

| File | Status | Spans | Attempts | Cost | Libraries | Schema Extensions |
|------|--------|-------|----------|------|-----------|-------------------|
| src/api/check.ts | success | 1 | 2 | $0.21 | — | `span.taze.check.run` |
| src/cli.ts | failed: Validation failed: SCH-001, SCH-001 — SCH-001 check failed: declared span extension "taze.cli.run" is a semantic duplicate of existing registry operation "taze.check.run". Use the existing registry operation instead of declaring a new extension. | 0 | 3 | $0.42 | — | — |
| src/commands/check/checkGlobal.ts | failed: Validation failed: SCH-001, SCH-001 — SCH-001 check failed: declared span extension "taze.check.global" is a semantic duplicate of existing registry operation "taze.check.run". Use the existing registry operation instead of declaring a new extension. | 0 | 3 | $0.40 | — | — |
| src/commands/check/index.ts | success | 1 | 2 | $0.19 | — | `span.taze.check.run` |
| src/commands/check/interactive.ts | success | 1 | 2 | $0.23 | — | `span.taze.check.run` |
| src/config.ts | success | 1 | 2 | $0.13 | — | `span.taze.check.run` |
| src/io/bunWorkspaces.ts | success | 3 | 2 | $0.21 | — | `span.taze.check.run` |
| src/io/packageJson.ts | success | 2 | 2 | $0.19 | — | `span.taze.io.read_package_json`, `span.taze.io.write_package_json` |
| src/io/packageYaml.ts | failed: Oscillation detected during fresh regeneration: Error count increased for SCH-001: 4 → 8 (at unknown line, unknown line, unknown line, unknown line, line 29, line 56, line 89, line 145) | 0 | 3 | $0.60 | — | — |
| src/io/packages.ts | failed: Validation failed: SCH-001, SCH-001, SCH-002, SCH-002 — SCH-001 check failed: declared span extension "taze.io.load_package" is a semantic duplicate of existing registry operation "taze.io.read_package_json". Use the existing registry operation instead of declaring a new extension. | 0 | 3 | $0.59 | — | — |
| src/io/pnpmWorkspaces.ts | failed: Validation failed: NDS-001 — NDS-001 check failed: tsc --noEmit returned a non-zero exit code. src/io/pnpmWorkspaces.ts(97,74): error TS1005: ',' expected. Fix the TypeScript error at line 97 and ensure the file is valid TypeScript. | 0 | 3 | $0.31 | — | — |
| src/io/resolves.ts | failed: Validation failed: SCH-001, SCH-001, SCH-001, SCH-001, SCH-001 — SCH-001 check failed: declared span extension "taze.io.load_cache" is a semantic duplicate of existing registry operation "taze.io.read_package_json". Use the existing registry operation instead of declaring a new extension. | 0 | 2 | $0.84 | — | — |
| src/io/yarnWorkspaces.ts | failed: Validation failed: NDS-003, NDS-003 — NDS-003: original line 71 missing/modified: const paths = pkg.name.replace('yarn-workspace:', '').split(/\./g) The agent must preserve all original business logic. Only add instrumentation — do not modify, remove, or reorder existing code. | 0 | 3 | $0.36 | — | — |
| src/log.ts | failed: Rolled back: checkpoint test failure at file 25/33 | 0 | 1 | $0.00 | — | — |
| src/render.ts | failed: Rolled back: checkpoint test failure at file 25/33 | 0 | 1 | $0.00 | — | — |
| src/types.ts | failed: Rolled back: checkpoint test failure at file 25/33 | 0 | 1 | $0.05 | — | — |
| src/utils/config.ts | failed: Rolled back: checkpoint test failure at file 25/33 | 0 | 1 | $0.00 | — | — |
| src/utils/context.ts | failed: Rolled back: checkpoint test failure at file 25/33 | 0 | 1 | $0.0079 | — | — |
| src/utils/packument.ts | failed: Oscillation detected during fresh regeneration: Error count increased for SCH-001: 2 → 3 (at unknown line, line 55, line 88) | 0 | 3 | $0.21 | — | — |

**No changes needed** (14 files, 0 spans): src/addons/index.ts, src/addons/vscode.ts, src/commands/check/render.ts, src/constants.ts, src/filters/diff-sorter.ts, src/index.ts, src/io/dependencies.ts, src/utils/dependenciesFilter.ts, src/utils/diff.ts, src/utils/package.ts, src/utils/sha.ts, src/utils/sort.ts, src/utils/time.ts, src/utils/versions.ts

## Span Category Breakdown

| File | External Calls | Schema-Defined | Service Entry Points | Total Functions |
|------|---------------|----------------|---------------------|-----------------|
| src/addons/index.ts | 0 | 0 | 0 | 0 |
| src/addons/vscode.ts | 0 | 0 | 0 | 1 |
| src/api/check.ts | 0 | 0 | 1 | 2 |
| src/commands/check/index.ts | 0 | 1 | 1 | 1 |
| src/commands/check/interactive.ts | 0 | 1 | 0 | 6 |
| src/config.ts | 0 | 1 | 1 | 2 |
| src/constants.ts | 0 | 0 | 0 | 0 |
| src/io/bunWorkspaces.ts | 0 | 3 | 2 | 4 |
| src/io/packageJson.ts | 0 | 0 | 2 | 3 |
| src/utils/diff.ts | 0 | 0 | 0 | 0 |

## Schema Changes

### New Attribute Keys

# Summary of Schema Changes
## Registry versions
Baseline: 0.1.0

Head: 0.1.0




### New Span IDs (3)

- `span.taze.check.run`
- `span.taze.io.read_package_json`
- `span.taze.io.write_package_json`

## Review Attention

- **src/io/bunWorkspaces.ts**: 3 spans added (average: 1) — outlier, review recommended
- **src/io/packageJson.ts**: 2 spans added (average: 1) — outlier, review recommended

### Advisory Findings

**src/api/check.ts**
- CDQ-007 (Attribute Data Quality): setAttribute value "options.mode" at line 24 accesses a property of "options" without a null/undefined guard. If "options" can be null or undefined, this will throw at runtime. Add an `if (options)` check or use optional chaining (`options?.mode`).
- CDQ-007 (Attribute Data Quality): setAttribute value "options.recursive" at line 27 accesses a property of "options" without a null/undefined guard. If "options" can be null or undefined, this will throw at runtime. Add an `if (options)` check or use optional chaining (`options?.recursive`).
- CDQ-007 (Attribute Data Quality): setAttribute value "options.write" at line 30 accesses a property of "options" without a null/undefined guard. If "options" can be null or undefined, this will throw at runtime. Add an `if (options)` check or use optional chaining (`options?.write`).
- CDQ-007 (Attribute Data Quality): setAttribute value "packages.length" at line 38 accesses a property of "packages" without a null/undefined guard. If "packages" can be null or undefined, this will throw at runtime. Add an `if (packages)` check or use optional chaining (`packages?.length`).

**src/io/bunWorkspaces.ts**
- CDQ-007 (Attribute Data Quality): setAttribute value "filepath" at line 19 appears to be a filesystem path. Absolute paths are high-cardinality and expose developer environment details. Use a relative path or a derived attribute (e.g., basename) instead.
- CDQ-007 (Attribute Data Quality): setAttribute value "catalogs.length" at line 62 accesses a property of "catalogs" without a null/undefined guard. If "catalogs" can be null or undefined, this will throw at runtime. Add an `if (catalogs)` check or use optional chaining (`catalogs?.length`).
- CDQ-007 (Attribute Data Quality): setAttribute value "pkg.filepath" at line 80 accesses a property of "pkg" without a null/undefined guard. If "pkg" can be null or undefined, this will throw at runtime. Add an `if (pkg)` check or use optional chaining (`pkg?.filepath`).
- CDQ-007 (Attribute Data Quality): setAttribute value "pkg.name" at line 82 accesses a property of "pkg" without a null/undefined guard. If "pkg" can be null or undefined, this will throw at runtime. Add an `if (pkg)` check or use optional chaining (`pkg?.name`).
- CDQ-007 (Attribute Data Quality): setAttribute value "filepath" at line 136 appears to be a filesystem path. Absolute paths are high-cardinality and expose developer environment details. Use a relative path or a derived attribute (e.g., basename) instead.

**src/io/packageJson.ts**
- CDQ-007 (Attribute Data Quality): setAttribute value "raw.name" at line 44 accesses a property of "raw" without a null/undefined guard. If "raw" can be null or undefined, this will throw at runtime. Add an `if (raw)` check or use optional chaining (`raw?.name`).
- CDQ-007 (Attribute Data Quality): setAttribute value "deps.length" at line 65 accesses a property of "deps" without a null/undefined guard. If "deps" can be null or undefined, this will throw at runtime. Add an `if (deps)` check or use optional chaining (`deps?.length`).
- CDQ-007 (Attribute Data Quality): setAttribute value "pkg.filepath" at line 95 accesses a property of "pkg" without a null/undefined guard. If "pkg" can be null or undefined, this will throw at runtime. Add an `if (pkg)` check or use optional chaining (`pkg?.filepath`).

## Agent Notes

Each instrumented file has a companion `.instrumentation.md` file in the same directory (e.g., `src/api.js` → `src/api.instrumentation.md`) containing the agent's full decision notes.

## Rolled Back Files

The following files were rolled back to their pre-instrumentation state due to test failures.

| File | Reason |
|------|--------|
| src/log.ts | Rolled back: checkpoint test failure at file 25/33 |
| src/render.ts | Rolled back: checkpoint test failure at file 25/33 |
| src/types.ts | Rolled back: checkpoint test failure at file 25/33 |
| src/utils/config.ts | Rolled back: checkpoint test failure at file 25/33 |
| src/utils/context.ts | Rolled back: checkpoint test failure at file 25/33 |

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
| **Cost** | $77.22 | $5.04 |
| **Input tokens** | 3,300,000 | 211,750 |
| **Output tokens** | — | 256,711 |
| **Cache read tokens** | — | 521,718 |
| **Cache write tokens** | — | 107,081 |

Model: `claude-sonnet-4-6` | Files: 33 | Total file size: 97,041 bytes

## Live-Check Compliance

OK

## Agent Version

`1.0.0`

## Warnings

- File failed: /Users/whitney.lee/Documents/Repositories/taze/src/cli.ts — Validation failed: SCH-001, SCH-001 — SCH-001 check failed: declared span extension "taze.cli.run" is a semantic duplicate of existing registry operation "taze.check.run". Use the existing registry operation instead of declaring a new extension.
- File failed: /Users/whitney.lee/Documents/Repositories/taze/src/commands/check/checkGlobal.ts — Validation failed: SCH-001, SCH-001 — SCH-001 check failed: declared span extension "taze.check.global" is a semantic duplicate of existing registry operation "taze.check.run". Use the existing registry operation instead of declaring a new extension.
- File failed: /Users/whitney.lee/Documents/Repositories/taze/src/io/packageYaml.ts — Oscillation detected during fresh regeneration: Error count increased for SCH-001: 4 → 8 (at unknown line, unknown line, unknown line, unknown line, line 29, line 56, line 89, line 145)
- File failed: /Users/whitney.lee/Documents/Repositories/taze/src/io/packages.ts — Validation failed: SCH-001, SCH-001, SCH-002, SCH-002 — SCH-001 check failed: declared span extension "taze.io.load_package" is a semantic duplicate of existing registry operation "taze.io.read_package_json". Use the existing registry operation instead of declaring a new extension.
- File failed: /Users/whitney.lee/Documents/Repositories/taze/src/io/pnpmWorkspaces.ts — Validation failed: NDS-001 — NDS-001 check failed: tsc --noEmit returned a non-zero exit code. src/io/pnpmWorkspaces.ts(97,74): error TS1005: ',' expected. Fix the TypeScript error at line 97 and ensure the file is valid TypeScript.
- File failed: /Users/whitney.lee/Documents/Repositories/taze/src/io/resolves.ts — Validation failed: SCH-001, SCH-001, SCH-001, SCH-001, SCH-001 — SCH-001 check failed: declared span extension "taze.io.load_cache" is a semantic duplicate of existing registry operation "taze.io.read_package_json". Use the existing registry operation instead of declaring a new extension.
- File failed: /Users/whitney.lee/Documents/Repositories/taze/src/io/yarnWorkspaces.ts — Validation failed: NDS-003, NDS-003 — NDS-003: original line 71 missing/modified: const paths = pkg.name.replace('yarn-workspace:', '').split(/\./g)
The agent must preserve all original business logic. Only add instrumentation — do not modify, remove, or reorder existing code.
- File failed: /Users/whitney.lee/Documents/Repositories/taze/src/log.ts — Rolled back: checkpoint test failure at file 25/33
- File failed: /Users/whitney.lee/Documents/Repositories/taze/src/render.ts — Rolled back: checkpoint test failure at file 25/33
- File failed: /Users/whitney.lee/Documents/Repositories/taze/src/types.ts — Rolled back: checkpoint test failure at file 25/33
- File failed: /Users/whitney.lee/Documents/Repositories/taze/src/utils/config.ts — Rolled back: checkpoint test failure at file 25/33
- File failed: /Users/whitney.lee/Documents/Repositories/taze/src/utils/context.ts — Rolled back: checkpoint test failure at file 25/33
- File failed: /Users/whitney.lee/Documents/Repositories/taze/src/utils/packument.ts — Oscillation detected during fresh regeneration: Error count increased for SCH-001: 2 → 3 (at unknown line, line 55, line 88)
- Span name "taze.check.run" collision: declared by both /Users/whitney.lee/Documents/Repositories/taze/src/api/check.ts and /Users/whitney.lee/Documents/Repositories/taze/src/commands/check/index.ts
- Span name "taze.check.run" collision: declared by both /Users/whitney.lee/Documents/Repositories/taze/src/api/check.ts and /Users/whitney.lee/Documents/Repositories/taze/src/commands/check/interactive.ts
- Span name "taze.check.run" collision: declared by both /Users/whitney.lee/Documents/Repositories/taze/src/api/check.ts and /Users/whitney.lee/Documents/Repositories/taze/src/config.ts
- Span name "taze.check.run" collision: declared by both /Users/whitney.lee/Documents/Repositories/taze/src/api/check.ts and /Users/whitney.lee/Documents/Repositories/taze/src/io/bunWorkspaces.ts
- Checkpoint test run failed at file 25/33 (/Users/whitney.lee/Documents/Repositories/taze/src/utils/context.ts): tests failed

Test output (truncated — full output at /Users/whitney.lee/Documents/Repositories/taze/spiny-orb-test-failure.log):
> taze@19.11.0 test /Users/whitney.lee/Documents/Repositories/taze
> tsdown && vitest

[34mℹ[39m [34mtsdown v0.21.7[39m powered by [38;2;255;126;23mrolldown v1.0.0-rc.12[39m
[34mℹ[39m config file: [4m/Users/whitney.lee/Documents/Repositories/taze/tsdown.config.ts[24m 
[34mℹ[39m entry: [34msrc/index, src/cli[39m
[34mℹ[39m tsconfig: [34mtsconfig.json[39m
[34mℹ[39m Build start
[34mℹ[39m Cleaning 5 files
[34mℹ[39m [2mdist/[22m[1mcli.mjs[22m             [2m153.87 kB[22m [2m│ gzip: 33.25 kB[22m
[34mℹ[39m [2mdist/[22m[1mindex.mjs[22m           [2m  0.55 kB[22m [2m│ gzip:  0.26 kB[22m
[34mℹ[39m [2mdist/[22mtypes-BXs4okAV.mjs  [2m164.85 kB[22m [2m│ gzip: 40.16 kB[22m
[34mℹ[39m [2mdist/[22m[32m[1mindex.d.mts[22m[39m         [2m  8.98 kB[22m [2m│ gzip:  2.51 kB[22m
[34mℹ[39m [2mdist/[22m[32m[1mcli.d.mts[22m[39m           [2m  0.01 kB[22m [2m│ gzip:  0.03 kB[22m
[34mℹ[39m 5 files, total: 328.26 kB
[32m✔[39m Build complete in [32m444ms[39m

[1m[46m RUN [49m[22m [36mv4.1.2 [39m[90m/Users/whitney.lee/Documents/Repositories/taze[39m

 [32m✓[39m test/dumpDependencies.test.ts [2m([22m[2m6 tests[22m[2m)[22m[32m 14[2mms[22m[39m
 [32m✓[39m test/sort.test.ts [2m([22m[2m5 tests[22m[2m)[22m[32m 8[2mms[22m[39m
 [32m✓[39m test/bunCatalogClobber.test.ts [2m([22m[2m6 tests[22m[2m)[22m[32m 19[2mms[22m[39m
 [32m✓[39m test/render.test.ts [2m([22m[2m1 test[22m[2m)[22m[32m 6[2mms[22m[39m
 [32m✓[39m test/parseDependencies.test.ts [2m([22m[2m7 tests[22m[2m)[22m[32m 10[2mms[22m[39m
 [32m✓[39m test/catalogRender.test.ts [2m([22m[2m6 tests[22m[2m)[22m[32m 6[2mms[22m[39m
 [32m✓[39m test/packageYaml.test.ts [2m([22m[2m4 tests[22m[2m)[22m[32m 41[2mms[22m[39m
 [32m✓[39m test/filter.test.ts [2m([22m[2m3 tests[22m[2m)[22m[32m 3[2mms[22m[39m
 [32m✓[39m test/package-manager.test.ts [2m([22m[2m4 tests[22m[2m)[22m[33m 314[2mms[22m[39m
 [31m❯[39m test/versions.test.ts [2m([22m[2m4 tests[22m[2m | [22m[31m1 failed[39m[2m)[22m[33m 5027[2mms[22m[39m
   [32m✓[39m getVersionRange[32m 3[2mms[22m[39m
[31m   [31m×[31m getMaxSatisfying[39m[33m 5021[2mms[22m[39m
   [32m✓[39m deprecated filter[32m 0[2mms[22m[39m
   [32m✓[39m maturity period filter[32m 1[2mms[22m[39m
 [32m✓[39m test/bunCatalog.test.ts [2m([22m[2m6 tests[22m[2m)[22m[33m 5397[2mms[22m[39m
     [33m[2m✓[22m[39m should detect and process bun catalogs when bun.lockb exists [33m 5395[2mms[22m[39m
 [32m✓[39m test/pnpmCatalog.test.ts [2m([22m[2m3 tests[22m[2m)[22m[33m 5555[2mms[22m[39m
   [33m[2m✓[22m[39m pnpm catalog [33m 5552[2mms[22m[39m
 [32m✓[39m test/yarnCatalog.test.ts [2m([22m[2m3 tests[22m[2m)[22m[33m 5631[2mms[22m[39m
   [33m[2m✓[22m[39m yarn catalog [33m 5627[2mms[22m[39m
 [31m❯[39m test/packageConfig.test.ts [2m([22m[2m11 tests[22m[2m | [22m[31m1 failed[39m[2m)[22m[32m 84[2mms[22m[39m
     [32m✓[39m with packagemode[32m 77[2mms[22m[39m
     [32m✓[39m without packagemode[32m 4[2mms[22m[39m
     [32m✓[39m not defined in config file / optionMode:default[32m 0[2mms[22m[39m
[31m     [31m×[31m defined in config file / optionMode:default[39m[32m 2[2mms[22m[39m
     [32m✓[39m defined in config file[regex] / optionMode:default[32m 0[2mms[22m[39m
     [32m✓[39m not defined in config file / optionMode:major[32m 0[2mms[22m[39m
     [32m✓[39m defined in config file / optionMode:major[32m 0[2mms[22m[39m
     [32m✓[39m not defined in config file / optionMode:minor[32m 0[2mms[22m[39m
     [32m✓[39m defined in config file / optionMode:minor[32m 0[2mms[22m[39m
     [32m✓[39m not defined in config file / optionMode:newest[32m 0[2mms[22m[39m
... 68 more lines (see full output in log file)
- Rolled back 5 file(s) at checkpoint (file 25/33) due to test failure
- Live-check partial: 13 file(s) failed instrumentation (/Users/whitney.lee/Documents/Repositories/taze/src/cli.ts, /Users/whitney.lee/Documents/Repositories/taze/src/commands/check/checkGlobal.ts, /Users/whitney.lee/Documents/Repositories/taze/src/io/packageYaml.ts, /Users/whitney.lee/Documents/Repositories/taze/src/io/packages.ts, /Users/whitney.lee/Documents/Repositories/taze/src/io/pnpmWorkspaces.ts...). Compliance report may be incomplete — spans from failed files are missing. This warning is advisory — the run completed; successfully instrumented files are unaffected. To get full coverage, review the failed files above and re-run spiny-orb on them.