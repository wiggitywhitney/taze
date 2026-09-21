## Summary

- **Files processed**: 33
- **Committed**: 13
- **No changes needed**: 20

## Per-File Results

| File | Status | Spans | Attempts | Cost | Libraries | Schema Extensions |
|------|--------|-------|----------|------|-----------|-------------------|
| src/commands/check/checkGlobal.ts | success | 4 | 2 | $0.42 | — | 6 (see Schema Changes) |
| src/commands/check/index.ts | success | 1 | 1 | $0.19 | — | 1 (see Schema Changes) |
| src/commands/check/interactive.ts | success | 1 | 2 | $0.42 | — | 1 (see Schema Changes) |
| src/config.ts | success | 1 | 1 | $0.11 | — | 1 (see Schema Changes) |
| src/io/bunWorkspaces.ts | success | 3 | 1 | $0.23 | — | 4 (see Schema Changes) |
| src/io/packageJson.ts | success | 2 | 2 | $0.33 | — | 2 (see Schema Changes) |
| src/io/packageYaml.ts | success | 4 | 3 | $0.52 | — | 4 (see Schema Changes) |
| src/io/packages.ts | success | 5 | 1 | $0.25 | — | 5 (see Schema Changes) |
| src/io/pnpmWorkspaces.ts | success | 2 | 2 | $0.36 | — | 2 (see Schema Changes) |
| src/io/resolves.ts | success | 6 | 1 | $0.61 | — | 6 (see Schema Changes) |
| src/io/yarnWorkspaces.ts | success | 2 | 1 | $0.22 | — | 3 (see Schema Changes) |
| src/api/check.ts | success | 2 | 1 | $0.20 | — | 2 (see Schema Changes) |
| src/utils/packument.ts | success | 2 | 1 | $0.19 | — | 3 (see Schema Changes) |

**No changes needed** (20 files, 0 spans): src/addons/index.ts, src/addons/vscode.ts, src/cli.ts, src/constants.ts, src/index.ts, src/io/dependencies.ts, src/types.ts, src/utils/context.ts, src/utils/dependenciesFilter.ts, src/utils/config.ts, src/utils/diff.ts, src/filters/diff-sorter.ts, src/render.ts, src/log.ts, src/utils/package.ts, src/utils/sha.ts, src/utils/time.ts, src/commands/check/render.ts, src/utils/sort.ts, src/utils/versions.ts

## Span Category Breakdown

*Self-reported by the LLM, not independently verified against the diff. "External Calls" counts manually-wrapped spans only — calls covered by an auto-instrumentation library are not included.*

| File | External Calls | Schema-Defined | Service Entry Points | Total Functions | Attrs Reused / New |
|------|---------------|----------------|---------------------|-----------------|---------------------|
| src/commands/check/checkGlobal.ts | 3 | 0 | 1 | 4 | 0 / 2 |
| src/commands/check/index.ts | 0 | 0 | 1 | 1 | 0 / 0 |
| src/commands/check/interactive.ts | 0 | 0 | 1 | 10 | 0 / 0 |
| src/config.ts | 0 | 0 | 1 | 2 | 0 / 0 |
| src/io/bunWorkspaces.ts | 0 | 0 | 2 | 4 | 0 / 1 |
| src/io/packageJson.ts | 0 | 0 | 2 | 3 | 0 / 0 |
| src/io/packageYaml.ts | 0 | 0 | 4 | 5 | 0 / 0 |
| src/io/packages.ts | 0 | 0 | 5 | 5 | 0 / 0 |
| src/io/pnpmWorkspaces.ts | 0 | 0 | 2 | 3 | 0 / 0 |
| src/io/resolves.ts | 0 | 0 | 6 | 15 | 0 / 0 |
| src/io/yarnWorkspaces.ts | 0 | 0 | 2 | 3 | 0 / 1 |
| src/api/check.ts | 0 | 0 | 2 | 2 | 0 / 0 |
| src/utils/packument.ts | 0 | 0 | 2 | 4 | 0 / 1 |

## Schema Changes

### Summary of Schema Changes
#### Registry versions
Baseline: 0.1.0

Head: 0.1.0

#### Registry Attributes
##### Added
- taze.check.agent
- taze.check.packages_loaded
- taze.fetch.force
- taze.io.catalogs_count
- taze.io.file_path

### New Span IDs

**src/commands/check/checkGlobal.ts**
- `span.taze.check.global`
- `span.taze.check.install_pkg`
- `span.taze.check.load_global_npm`
- `span.taze.check.load_global_pnpm`

**src/commands/check/index.ts**
- `span.taze.check.run`

**src/commands/check/interactive.ts**
- `span.taze.check.interactive`

**src/config.ts**
- `span.taze.config.resolve`

**src/io/bunWorkspaces.ts**
- `span.taze.io.load_bun_workspace`
- `span.taze.io.write_bun_json`
- `span.taze.io.write_bun_workspace`

**src/io/packageJson.ts**
- `span.taze.io.load_package_json`
- `span.taze.io.write_package_json`

**src/io/packageYaml.ts**
- `span.taze.io.load_package_yaml`
- `span.taze.io.read_yaml`
- `span.taze.io.write_package_yaml`
- `span.taze.io.write_yaml`

**src/io/packages.ts**
- `span.taze.io.load_package`
- `span.taze.io.load_packages`
- `span.taze.io.read_json`
- `span.taze.io.write_json`
- `span.taze.io.write_package`

**src/io/pnpmWorkspaces.ts**
- `span.taze.io.load_pnpm_workspace`
- `span.taze.io.write_pnpm_workspace`

**src/io/resolves.ts**
- `span.taze.check.resolve_dependencies`
- `span.taze.check.resolve_dependency`
- `span.taze.check.resolve_package`
- `span.taze.fetch.get_package_data`
- `span.taze.io.dump_cache`
- `span.taze.io.load_cache`

**src/io/yarnWorkspaces.ts**
- `span.taze.io.load_yarn_workspace`
- `span.taze.io.write_yarn_workspace`

**src/api/check.ts**
- `span.taze.check.packages`
- `span.taze.check.single_project`

**src/utils/packument.ts**
- `span.taze.fetch.jsr_package_meta`
- `span.taze.fetch.npm_package`

### New Attribute Extensions

**src/commands/check/checkGlobal.ts**
- `taze.check.agent`
- `taze.check.packages_loaded`

**src/io/bunWorkspaces.ts**
- `taze.io.file_path`

**src/io/yarnWorkspaces.ts**
- `taze.io.catalogs_count`

**src/utils/packument.ts**
- `taze.fetch.force`

## Review Attention

- **src/io/resolves.ts**: 6 spans added (average: 3) — outlier, review recommended

### Advisory Findings

**src/commands/check/checkGlobal.ts**
- CDQ-007 (Attribute Data Quality): Fired for one or more of: a PII attribute name (like author, email, or username) or a raw filesystem path where a basename would be safer. PII in traces can violate privacy policies and is worth fixing. For the path finding, prefer basename() when already imported, or inline filePath.split(/[\\/]/).filter(Boolean).pop() ?? '' otherwise — no new import required either way. (lines 185, 249)

**src/io/bunWorkspaces.ts**
- CDQ-007 (Attribute Data Quality): Fired for one or more of: a PII attribute name (like author, email, or username) or a raw filesystem path where a basename would be safer. PII in traces can violate privacy policies and is worth fixing. For the path finding, prefer basename() when already imported, or inline filePath.split(/[\\/]/).filter(Boolean).pop() ?? '' otherwise — no new import required either way. (lines 21, 63, 130)

**src/io/packageYaml.ts**
- CDQ-007 (Attribute Data Quality): Fired for one or more of: a PII attribute name (like author, email, or username) or a raw filesystem path where a basename would be safer. PII in traces can violate privacy policies and is worth fixing. For the path finding, prefer basename() when already imported, or inline filePath.split(/[\\/]/).filter(Boolean).pop() ?? '' otherwise — no new import required either way. (lines 31, 56, 88)

**src/io/packages.ts**
- CDQ-007 (Attribute Data Quality): Fired for one or more of: a PII attribute name (like author, email, or username) or a raw filesystem path where a basename would be safer. PII in traces can violate privacy policies and is worth fixing. For the path finding, prefer basename() when already imported, or inline filePath.split(/[\\/]/).filter(Boolean).pop() ?? '' otherwise — no new import required either way. (lines 22, 37, 228)
- SCH-001 (Span Names Match Registry): Fired because a span name doesn't match your Weaver registry or doesn't follow the required dotted-notation format (e.g. myapp.user.create). Use the registry name or declare a new span as a schemaExtension.

**src/io/pnpmWorkspaces.ts**
- CDQ-007 (Attribute Data Quality):19: Fired for one or more of: a PII attribute name (like author, email, or username) or a raw filesystem path where a basename would be safer. PII in traces can violate privacy policies and is worth fixing. For the path finding, prefer basename() when already imported, or inline filePath.split(/[\\/]/).filter(Boolean).pop() ?? '' otherwise — no new import required either way.

**src/io/yarnWorkspaces.ts**
- CDQ-007 (Attribute Data Quality):19: Fired for one or more of: a PII attribute name (like author, email, or username) or a raw filesystem path where a basename would be safer. PII in traces can violate privacy policies and is worth fixing. For the path finding, prefer basename() when already imported, or inline filePath.split(/[\\/]/).filter(Boolean).pop() ?? '' otherwise — no new import required either way.

**src/api/check.ts**
- CDQ-007 (Attribute Data Quality): Fired for one or more of: a PII attribute name (like author, email, or username) or a raw filesystem path where a basename would be safer. PII in traces can violate privacy policies and is worth fixing. For the path finding, prefer basename() when already imported, or inline filePath.split(/[\\/]/).filter(Boolean).pop() ?? '' otherwise — no new import required either way. (lines 37, 95)

**src/utils/packument.ts**
- CDQ-007 (Attribute Data Quality):107: Fired for one or more of: a PII attribute name (like author, email, or username) or a raw filesystem path where a basename would be safer. PII in traces can violate privacy policies and is worth fixing. For the path finding, prefer basename() when already imported, or inline filePath.split(/[\\/]/).filter(Boolean).pop() ?? '' otherwise — no new import required either way.

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

## SDK Bootstrap Checklist

Verify that your SDK init file includes all required resource attributes. Missing attributes reduce observability and cause RES-001 compliance failures.

```javascript
import { randomUUID } from 'node:crypto';

resource: resourceFromAttributes({
  'service.name': 'your-service-name',
  'service.version': process.env.npm_package_version || '0.0.0',
  'service.instance.id': randomUUID(),
}),
```

> **`service.instance.id`** uniquely identifies a running process instance. Without it, traces from different deployments share identical resource metadata — spans are indistinguishable across restarts and parallel processes.

## Token Usage

| | Ceiling | Actual |
|---|---------|--------|
| **Cost** | $77.22 | $4.03 (claude-sonnet-4-6) |
| **Input tokens** | 3,300,000 | 83,345 |
| **Output tokens** | — | 148,072 |
| **Cache read tokens** | — | 67,563 |
| **Cache write tokens** | — | 410,924 |

Model: `claude-sonnet-4-6` | Files: 33 | Total file size: 97,041 bytes

## Live-Check Compliance

Live-Check: OK (688 spans, 3260 advisory findings — see compliance report)

Full compliance report: [spiny-orb-live-check-report.json](./spiny-orb-live-check-report.json)

## Agent Version

`2.0.0`