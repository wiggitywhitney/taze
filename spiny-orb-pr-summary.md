## Summary

- **Files processed**: 33
- **Committed**: 14
- **No changes needed**: 19

## Per-File Results

| File | Status | Spans | Attempts | Cost | Libraries | Schema Extensions |
|------|--------|-------|----------|------|-----------|-------------------|
| src/api/check.ts | success | 1 | 1 | $0.10 | — | `span.taze.check.run` |
| src/cli.ts | success | 2 | 1 | $0.14 | — | `span.taze.cli.run` |
| src/commands/check/checkGlobal.ts | success | 1 | 1 | $0.21 | — | `span.taze.check.global` |
| src/commands/check/index.ts | success | 1 | 2 | $0.39 | — | `span.taze.check.execute` |
| src/commands/check/interactive.ts | success | 1 | 1 | $0.18 | — | `span.taze.check.interactive` |
| src/config.ts | success | 1 | 1 | $0.10 | — | `span.taze.config.resolve`, `taze.config.sources_found` |
| src/io/bunWorkspaces.ts | success | 2 | 1 | $0.14 | — | `span.taze.bun.load_workspace`, `span.taze.bun.write_workspace` |
| src/io/packageJson.ts | success | 2 | 1 | $0.20 | — | `span.taze.package_json.load`, `span.taze.package_json.write` |
| src/io/packageYaml.ts | success | 4 | 1 | $0.21 | — | `span.taze.package_yaml.read`, `span.taze.package_yaml.write_file`, `span.taze.package_yaml.load`, `span.taze.package_yaml.write` |
| src/io/packages.ts | success | 4 | 1 | $0.65 | — | `span.taze.io.write_json`, `span.taze.io.write_package`, `span.taze.io.load_package`, `span.taze.io.load_packages` |
| src/io/pnpmWorkspaces.ts | success | 2 | 2 | $0.29 | — | `span.taze.pnpm_workspace.load`, `span.taze.pnpm_workspace.write` |
| src/io/resolves.ts | success | 6 | 1 | $1.40 | — | `span.taze.io.load_cache`, `span.taze.io.dump_cache`, `span.taze.fetch.package_data`, `span.taze.check.resolve_dependency`, `span.taze.check.resolve_dependencies`, `span.taze.check.resolve_package`, `taze.cache.hit`, `taze.cache.changed` |
| src/io/yarnWorkspaces.ts | success | 2 | 2 | $0.55 | — | `span.taze.yarnrc.load`, `span.taze.yarnrc.write` |
| src/utils/packument.ts | success | 2 | 1 | $0.07 | — | `span.taze.fetch.npm_package`, `span.taze.fetch.jsr_package` |

**No changes needed** (19 files, 0 spans): src/addons/index.ts, src/addons/vscode.ts, src/commands/check/render.ts, src/constants.ts, src/filters/diff-sorter.ts, src/index.ts, src/io/dependencies.ts, src/log.ts, src/render.ts, src/types.ts, src/utils/config.ts, src/utils/context.ts, src/utils/dependenciesFilter.ts, src/utils/diff.ts, src/utils/package.ts, src/utils/sha.ts, src/utils/sort.ts, src/utils/time.ts, src/utils/versions.ts

## Span Category Breakdown

| File | External Calls | Schema-Defined | Service Entry Points | Total Functions |
|------|---------------|----------------|---------------------|-----------------|
| src/addons/index.ts | 0 | 0 | 0 | 0 |
| src/addons/vscode.ts | 0 | 0 | 0 | 1 |
| src/api/check.ts | 0 | 0 | 1 | 2 |
| src/cli.ts | 0 | 0 | 1 | 1 |
| src/commands/check/checkGlobal.ts | 0 | 0 | 1 | 4 |
| src/commands/check/index.ts | 0 | 0 | 1 | 1 |
| src/commands/check/interactive.ts | 0 | 0 | 1 | 5 |
| src/config.ts | 0 | 0 | 1 | 2 |
| src/constants.ts | 0 | 0 | 0 | 0 |
| src/io/bunWorkspaces.ts | 0 | 0 | 2 | 4 |
| src/io/packageJson.ts | 0 | 0 | 2 | 3 |
| src/io/packageYaml.ts | 0 | 0 | 4 | 5 |
| src/io/packages.ts | 0 | 0 | 4 | 5 |
| src/io/pnpmWorkspaces.ts | 0 | 0 | 2 | 4 |
| src/io/resolves.ts | 1 | 0 | 5 | 15 |
| src/io/yarnWorkspaces.ts | 0 | 0 | 2 | 3 |
| src/types.ts | 0 | 0 | 0 | 0 |
| src/utils/context.ts | 0 | 0 | 0 | 0 |
| src/utils/diff.ts | 0 | 0 | 0 | 0 |
| src/utils/packument.ts | 2 | 0 | 2 | 4 |

## Schema Changes

# Summary of Schema Changes
## Registry versions
Baseline: 0.1.0

Head: 0.1.0

## Registry Attributes
### Added
- taze.cache.changed
- taze.cache.hit
- taze.config.sources_found




### New Span IDs (30)

- `span.taze.bun.load_workspace`
- `span.taze.bun.write_workspace`
- `span.taze.check.execute`
- `span.taze.check.global`
- `span.taze.check.interactive`
- `span.taze.check.resolve_dependencies`
- `span.taze.check.resolve_dependency`
- `span.taze.check.resolve_package`
- `span.taze.check.run`
- `span.taze.cli.run`
- `span.taze.config.resolve`
- `span.taze.fetch.jsr_package`
- `span.taze.fetch.npm_package`
- `span.taze.fetch.package_data`
- `span.taze.io.dump_cache`
- `span.taze.io.load_cache`
- `span.taze.io.load_package`
- `span.taze.io.load_packages`
- `span.taze.io.write_json`
- `span.taze.io.write_package`
- `span.taze.package_json.load`
- `span.taze.package_json.write`
- `span.taze.package_yaml.load`
- `span.taze.package_yaml.read`
- `span.taze.package_yaml.write`
- `span.taze.package_yaml.write_file`
- `span.taze.pnpm_workspace.load`
- `span.taze.pnpm_workspace.write`
- `span.taze.yarnrc.load`
- `span.taze.yarnrc.write`

## Review Attention

- **src/io/packageYaml.ts**: 4 spans added (average: 2) — outlier, review recommended
- **src/io/packages.ts**: 4 spans added (average: 2) — outlier, review recommended
- **src/io/resolves.ts**: 6 spans added (average: 2) — outlier, review recommended

### Advisory Findings

**src/api/check.ts**
- CDQ-007 (Attribute Data Quality): setAttribute value "packages.length" at line 30 accesses a property of "packages" without a null/undefined guard. If "packages" can be null or undefined, this will throw at runtime. Add an `if (packages)` check or use optional chaining (`packages?.length`).
- CDQ-007 (Attribute Data Quality): setAttribute value "options.write" at line 32 accesses a property of "options" without a null/undefined guard. If "options" can be null or undefined, this will throw at runtime. Add an `if (options)` check or use optional chaining (`options?.write`).

**src/cli.ts**
- CDQ-007 (Attribute Data Quality): setAttribute value "options.recursive" at line 60 accesses a property of "options" without a null/undefined guard. If "options" can be null or undefined, this will throw at runtime. Add an `if (options)` check or use optional chaining (`options?.recursive`).
- CDQ-007 (Attribute Data Quality): setAttribute value "options.write" at line 63 accesses a property of "options" without a null/undefined guard. If "options" can be null or undefined, this will throw at runtime. Add an `if (options)` check or use optional chaining (`options?.write`).
- SCH-001 (Span Names Match Registry): declared span extension "taze.cli.run" may be a semantic duplicate of existing registry operation "taze.check.run". If these operations are equivalent, reuse "taze.check.run" instead of declaring a new extension. If they are a different operation class, this advisory can be ignored.

**src/commands/check/checkGlobal.ts**
- CDQ-006 (isRecording Guard): setAttribute value "resolvePkgs.reduce((sum, pkg) => sum + p..." at line 66 has an expensive computation without span.isRecording() guard. Wrap expensive attribute computations in an if (span.isRecording()) check to avoid unnecessary computation when the span is not being sampled.
- CDQ-006 (isRecording Guard): setAttribute value "resolvePkgs.reduce((sum, pkg) => sum + p..." at line 67 has an expensive computation without span.isRecording() guard. Wrap expensive attribute computations in an if (span.isRecording()) check to avoid unnecessary computation when the span is not being sampled.
- CDQ-007 (Attribute Data Quality): setAttribute value "options.mode" at line 41 accesses a property of "options" without a null/undefined guard. If "options" can be null or undefined, this will throw at runtime. Add an `if (options)` check or use optional chaining (`options?.mode`).
- SCH-001 (Span Names Match Registry): declared span extension "taze.check.global" may be a semantic duplicate of existing registry operation "taze.check.run". If these operations are equivalent, reuse "taze.check.run" instead of declaring a new extension. If they are a different operation class, this advisory can be ignored.

**src/commands/check/index.ts**
- CDQ-006 (isRecording Guard): setAttribute value "resolvePkgs.reduce((acc, pkg) => acc + p..." at line 66 has an expensive computation without span.isRecording() guard. Wrap expensive attribute computations in an if (span.isRecording()) check to avoid unnecessary computation when the span is not being sampled.
- CDQ-006 (isRecording Guard): setAttribute value "resolvePkgs.reduce((acc, pkg) => acc + p..." at line 67 has an expensive computation without span.isRecording() guard. Wrap expensive attribute computations in an if (span.isRecording()) check to avoid unnecessary computation when the span is not being sampled.
- CDQ-007 (Attribute Data Quality): setAttribute value "options.mode" at line 26 accesses a property of "options" without a null/undefined guard. If "options" can be null or undefined, this will throw at runtime. Add an `if (options)` check or use optional chaining (`options?.mode`).
- SCH-001 (Span Names Match Registry): declared span extension "taze.check.execute" may be a semantic duplicate of existing registry operation "taze.check.run". If these operations are equivalent, reuse "taze.check.run" instead of declaring a new extension. If they are a different operation class, this advisory can be ignored.

**src/commands/check/interactive.ts**
- CDQ-007 (Attribute Data Quality): setAttribute value "pkgs.length" at line 43 accesses a property of "pkgs" without a null/undefined guard. If "pkgs" can be null or undefined, this will throw at runtime. Add an `if (pkgs)` check or use optional chaining (`pkgs?.length`).
- CDQ-007 (Attribute Data Quality): setAttribute value "checked.size" at line 44 accesses a property of "checked" without a null/undefined guard. If "checked" can be null or undefined, this will throw at runtime. Add an `if (checked)` check or use optional chaining (`checked?.size`).
- SCH-001 (Span Names Match Registry): declared span extension "taze.check.interactive" may be a semantic duplicate of existing registry operation "taze.check.run". If these operations are equivalent, reuse "taze.check.run" instead of declaring a new extension. If they are a different operation class, this advisory can be ignored.

**src/io/bunWorkspaces.ts**
- CDQ-006 (isRecording Guard): setAttribute value "catalogs.reduce((sum, c) => sum + c.deps..." at line 62 has an expensive computation without span.isRecording() guard. Wrap expensive attribute computations in an if (span.isRecording()) check to avoid unnecessary computation when the span is not being sampled.
- CDQ-006 (isRecording Guard): setAttribute value "Object.keys(versions).length" at line 88 has an expensive computation without span.isRecording() guard. Wrap expensive attribute computations in an if (span.isRecording()) check to avoid unnecessary computation when the span is not being sampled.
- CDQ-007 (Attribute Data Quality): setAttribute value "pkg.filepath" at line 82 accesses a property of "pkg" without a null/undefined guard. If "pkg" can be null or undefined, this will throw at runtime. Add an `if (pkg)` check or use optional chaining (`pkg?.filepath`).
- SCH-001 (Span Names Match Registry): declared span extension "taze.bun.load_workspace" may be a semantic duplicate of existing registry operation "taze.cli.run". If these operations are equivalent, reuse "taze.cli.run" instead of declaring a new extension. If they are a different operation class, this advisory can be ignored.
- SCH-001 (Span Names Match Registry): declared span extension "taze.bun.write_workspace" may be a semantic duplicate of existing registry operation "taze.bun.load_workspace". If these operations are equivalent, reuse "taze.bun.load_workspace" instead of declaring a new extension. If they are a different operation class, this advisory can be ignored.

**src/io/packageJson.ts**
- CDQ-007 (Attribute Data Quality): setAttribute value "filepath" at line 60 appears to be a filesystem path. Absolute paths are high-cardinality and expose developer environment details. Use a relative path or a derived attribute (e.g., basename) instead.
- CDQ-007 (Attribute Data Quality): setAttribute value "deps.length" at line 61 accesses a property of "deps" without a null/undefined guard. If "deps" can be null or undefined, this will throw at runtime. Add an `if (deps)` check or use optional chaining (`deps?.length`).
- CDQ-007 (Attribute Data Quality): setAttribute value "pkg.filepath" at line 94 accesses a property of "pkg" without a null/undefined guard. If "pkg" can be null or undefined, this will throw at runtime. Add an `if (pkg)` check or use optional chaining (`pkg?.filepath`).

**src/io/packageYaml.ts**
- CDQ-007 (Attribute Data Quality): setAttribute value "filepath" at line 31 appears to be a filesystem path. Absolute paths are high-cardinality and expose developer environment details. Use a relative path or a derived attribute (e.g., basename) instead.
- CDQ-007 (Attribute Data Quality): setAttribute value "filepath" at line 58 appears to be a filesystem path. Absolute paths are high-cardinality and expose developer environment details. Use a relative path or a derived attribute (e.g., basename) instead.
- CDQ-007 (Attribute Data Quality): setAttribute value "filepath" at line 112 appears to be a filesystem path. Absolute paths are high-cardinality and expose developer environment details. Use a relative path or a derived attribute (e.g., basename) instead.
- CDQ-007 (Attribute Data Quality): setAttribute value "deps.length" at line 113 accesses a property of "deps" without a null/undefined guard. If "deps" can be null or undefined, this will throw at runtime. Add an `if (deps)` check or use optional chaining (`deps?.length`).
- CDQ-007 (Attribute Data Quality): setAttribute value "pkg.filepath" at line 149 accesses a property of "pkg" without a null/undefined guard. If "pkg" can be null or undefined, this will throw at runtime. Add an `if (pkg)` check or use optional chaining (`pkg?.filepath`).
- SCH-001 (Span Names Match Registry): declared span extension "taze.package_yaml.load" may be a semantic duplicate of existing registry operation "taze.package_yaml.read". If these operations are equivalent, reuse "taze.package_yaml.read" instead of declaring a new extension. If they are a different operation class, this advisory can be ignored.
- SCH-001 (Span Names Match Registry): declared span extension "taze.package_yaml.write" may be a semantic duplicate of existing registry operation "taze.package_yaml.write_file". If these operations are equivalent, reuse "taze.package_yaml.write_file" instead of declaring a new extension. If they are a different operation class, this advisory can be ignored.

**src/io/packages.ts**
- CDQ-007 (Attribute Data Quality): setAttribute value "filepath" at line 26 appears to be a filesystem path. Absolute paths are high-cardinality and expose developer environment details. Use a relative path or a derived attribute (e.g., basename) instead.
- CDQ-007 (Attribute Data Quality): setAttribute value "pkg.type" at line 47 accesses a property of "pkg" without a null/undefined guard. If "pkg" can be null or undefined, this will throw at runtime. Add an `if (pkg)` check or use optional chaining (`pkg?.type`).
- CDQ-007 (Attribute Data Quality): setAttribute value "pkg.filepath" at line 48 accesses a property of "pkg" without a null/undefined guard. If "pkg" can be null or undefined, this will throw at runtime. Add an `if (pkg)` check or use optional chaining (`pkg?.filepath`).
- CDQ-007 (Attribute Data Quality): setAttribute value "packages.length" at line 215 accesses a property of "packages" without a null/undefined guard. If "packages" can be null or undefined, this will throw at runtime. Add an `if (packages)` check or use optional chaining (`packages?.length`).
- SCH-001 (Span Names Match Registry): declared span extension "taze.io.write_json" may be a semantic duplicate of existing registry operation "taze.package_json.write". If these operations are equivalent, reuse "taze.package_json.write" instead of declaring a new extension. If they are a different operation class, this advisory can be ignored.
- SCH-001 (Span Names Match Registry): declared span extension "taze.io.write_package" may be a semantic duplicate of existing registry operation "taze.package_json.write". If these operations are equivalent, reuse "taze.package_json.write" instead of declaring a new extension. If they are a different operation class, this advisory can be ignored.
- SCH-001 (Span Names Match Registry): declared span extension "taze.io.load_package" may be a semantic duplicate of existing registry operation "taze.package_json.load". If these operations are equivalent, reuse "taze.package_json.load" instead of declaring a new extension. If they are a different operation class, this advisory can be ignored.
- SCH-001 (Span Names Match Registry): declared span extension "taze.io.load_packages" may be a semantic duplicate of existing registry operation "taze.io.load_package". If these operations are equivalent, reuse "taze.io.load_package" instead of declaring a new extension. If they are a different operation class, this advisory can be ignored.

**src/io/resolves.ts**
- CDQ-006 (isRecording Guard): setAttribute value "result.filter(d => d.update).length" at line 404 has an expensive computation without span.isRecording() guard. Wrap expensive attribute computations in an if (span.isRecording()) check to avoid unnecessary computation when the span is not being sampled.
- CDQ-007 (Attribute Data Quality): setAttribute value "raw.name" at line 238 accesses a property of "raw" without a null/undefined guard. If "raw" can be null or undefined, this will throw at runtime. Add an `if (raw)` check or use optional chaining (`raw?.name`).
- CDQ-007 (Attribute Data Quality): setAttribute value "raw.currentVersion" at line 239 accesses a property of "raw" without a null/undefined guard. If "raw" can be null or undefined, this will throw at runtime. Add an `if (raw)` check or use optional chaining (`raw?.currentVersion`).
- CDQ-007 (Attribute Data Quality): setAttribute value "dep.update" at line 356 accesses a property of "dep" without a null/undefined guard. If "dep" can be null or undefined, this will throw at runtime. Add an `if (dep)` check or use optional chaining (`dep?.update`).
- CDQ-007 (Attribute Data Quality): setAttribute value "dep.targetVersion" at line 358 accesses a property of "dep" without a null/undefined guard. If "dep" can be null or undefined, this will throw at runtime. Add an `if (dep)` check or use optional chaining (`dep?.targetVersion`).
- CDQ-007 (Attribute Data Quality): setAttribute value "deps.length" at line 380 accesses a property of "deps" without a null/undefined guard. If "deps" can be null or undefined, this will throw at runtime. Add an `if (deps)` check or use optional chaining (`deps?.length`).
- CDQ-007 (Attribute Data Quality): setAttribute value "options.mode" at line 382 accesses a property of "options" without a null/undefined guard. If "options" can be null or undefined, this will throw at runtime. Add an `if (options)` check or use optional chaining (`options?.mode`).
- CDQ-007 (Attribute Data Quality): setAttribute value "pkg.name" at line 420 accesses a property of "pkg" without a null/undefined guard. If "pkg" can be null or undefined, this will throw at runtime. Add an `if (pkg)` check or use optional chaining (`pkg?.name`).
- SCH-001 (Span Names Match Registry): declared span extension "taze.fetch.package_data" may be a semantic duplicate of existing registry operation "taze.io.load_package". If these operations are equivalent, reuse "taze.io.load_package" instead of declaring a new extension. If they are a different operation class, this advisory can be ignored.
- SCH-001 (Span Names Match Registry): declared span extension "taze.check.resolve_dependencies" may be a semantic duplicate of existing registry operation "taze.check.resolve_dependency". If these operations are equivalent, reuse "taze.check.resolve_dependency" instead of declaring a new extension. If they are a different operation class, this advisory can be ignored.
- SCH-001 (Span Names Match Registry): declared span extension "taze.check.resolve_package" may be a semantic duplicate of existing registry operation "taze.io.load_package". If these operations are equivalent, reuse "taze.io.load_package" instead of declaring a new extension. If they are a different operation class, this advisory can be ignored.

**src/io/yarnWorkspaces.ts**
- CDQ-006 (isRecording Guard): setAttribute value "Object.keys(versions).length" at line 83 has an expensive computation without span.isRecording() guard. Wrap expensive attribute computations in an if (span.isRecording()) check to avoid unnecessary computation when the span is not being sampled.
- CDQ-007 (Attribute Data Quality): setAttribute value "pkg.filepath" at line 76 accesses a property of "pkg" without a null/undefined guard. If "pkg" can be null or undefined, this will throw at runtime. Add an `if (pkg)` check or use optional chaining (`pkg?.filepath`).
- SCH-001 (Span Names Match Registry): declared span extension "taze.yarnrc.write" may be a semantic duplicate of existing registry operation "taze.yarnrc.load". If these operations are equivalent, reuse "taze.yarnrc.load" instead of declaring a new extension. If they are a different operation class, this advisory can be ignored.

**src/utils/packument.ts**
- SCH-001 (Span Names Match Registry): declared span extension "taze.fetch.npm_package" may be a semantic duplicate of existing registry operation "taze.fetch.package_data". If these operations are equivalent, reuse "taze.fetch.package_data" instead of declaring a new extension. If they are a different operation class, this advisory can be ignored.
- SCH-001 (Span Names Match Registry): declared span extension "taze.fetch.jsr_package" may be a semantic duplicate of existing registry operation "taze.fetch.npm_package". If these operations are equivalent, reuse "taze.fetch.npm_package" instead of declaring a new extension. If they are a different operation class, this advisory can be ignored.

## Agent Notes

Each instrumented file has a companion `.instrumentation.md` file in the same directory (e.g., `src/api.js` → `src/api.instrumentation.md`) containing the agent's full decision notes.

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
| **Cost** | $77.22 | $4.93 |
| **Input tokens** | 3,300,000 | 61,965 |
| **Output tokens** | — | 237,488 |
| **Cache read tokens** | — | 139,830 |
| **Cache write tokens** | — | 302,804 |

Model: `claude-sonnet-4-6` | Files: 33 | Total file size: 97,041 bytes

## Live-Check Compliance

OK

## Agent Version

`1.0.0`