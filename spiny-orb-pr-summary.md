## Summary

- **Files processed**: 33
- **Committed**: 13
- **No changes needed**: 20

## Per-File Results

| File | Status | Spans | Attempts | Cost | Libraries | Schema Extensions |
|------|--------|-------|----------|------|-----------|-------------------|
| src/commands/check/checkGlobal.ts | success | 4 | 2 | $0.40 | — | `span.taze.check.global`, `span.taze.package.load_pnpm_global`, `span.taze.package.load_npm_global`, `span.taze.package.install`, `taze.package.deps_count` |
| src/commands/check/index.ts | success | 1 | 1 | $0.16 | — | `span.taze.check.run` |
| src/commands/check/interactive.ts | success | 1 | 3 | $0.54 | — | `span.taze.check.interactive` |
| src/config.ts | success | 1 | 1 | $0.11 | — | `span.taze.config.resolve` |
| src/io/bunWorkspaces.ts | success | 3 | 2 | $0.37 | — | `span.taze.package.load_bun_workspace`, `span.taze.write.bun_workspace`, `span.taze.write.bun_json`, `taze.catalog.count` |
| src/io/packageJson.ts | success | 2 | 2 | $0.35 | — | `span.taze.package.load_package_json`, `span.taze.write.package_json`, `taze.package.file_path` |
| src/io/packageYaml.ts | success | 4 | 1 | $0.20 | — | `span.taze.package.read_yaml`, `span.taze.write.yaml`, `span.taze.package.load_package_yaml`, `span.taze.write.package_yaml` |
| src/io/packages.ts | success | 5 | 2 | $0.38 | — | `span.taze.io.read_json`, `span.taze.io.write_json`, `span.taze.io.write_package`, `span.taze.io.load_package`, `span.taze.io.load_packages` |
| src/io/pnpmWorkspaces.ts | success | 2 | 1 | $0.29 | — | `span.taze.package.load_pnpm_workspace`, `span.taze.write.pnpm_workspace` |
| src/io/resolves.ts | success | 6 | 2 | $0.82 | — | `span.taze.io.load_cache`, `span.taze.io.dump_cache`, `span.taze.io.get_package_data`, `span.taze.resolve.dependency`, `span.taze.resolve.dependencies`, `span.taze.resolve.package` |
| src/io/yarnWorkspaces.ts | success | 2 | 2 | $0.37 | — | `span.taze.package.load_yarn_workspace`, `span.taze.write.yarn_workspace` |
| src/api/check.ts | success | 2 | 1 | $0.19 | — | `span.taze.check.packages`, `span.taze.check.single_project` |
| src/utils/packument.ts | success | 2 | 1 | $0.18 | — | `span.taze.fetch.package`, `span.taze.fetch.jsr_package` |

**No changes needed** (20 files, 0 spans): src/addons/index.ts, src/addons/vscode.ts, src/cli.ts, src/constants.ts, src/index.ts, src/io/dependencies.ts, src/types.ts, src/utils/context.ts, src/utils/dependenciesFilter.ts, src/utils/config.ts, src/utils/diff.ts, src/filters/diff-sorter.ts, src/render.ts, src/log.ts, src/utils/package.ts, src/utils/sha.ts, src/utils/time.ts, src/commands/check/render.ts, src/utils/sort.ts, src/utils/versions.ts

## Span Category Breakdown

| File | External Calls | Schema-Defined | Service Entry Points | Total Functions |
|------|---------------|----------------|---------------------|-----------------|
| src/commands/check/checkGlobal.ts | 0 | 0 | 4 | 4 |
| src/commands/check/index.ts | 0 | 0 | 1 | 1 |
| src/commands/check/interactive.ts | 0 | 0 | 1 | 5 |
| src/config.ts | 0 | 0 | 1 | 2 |
| src/io/bunWorkspaces.ts | 0 | 0 | 3 | 4 |
| src/io/packageJson.ts | 0 | 0 | 2 | 3 |
| src/io/packageYaml.ts | 0 | 0 | 4 | 5 |
| src/io/packages.ts | 0 | 0 | 5 | 5 |
| src/io/pnpmWorkspaces.ts | 0 | 0 | 2 | 4 |
| src/io/resolves.ts | 0 | 0 | 6 | 15 |
| src/io/yarnWorkspaces.ts | 0 | 0 | 2 | 3 |
| src/api/check.ts | 0 | 0 | 2 | 2 |
| src/utils/packument.ts | 2 | 0 | 2 | 4 |

## Schema Changes

# Summary of Schema Changes
## Registry versions
Baseline: 0.1.0

Head: 0.1.0

## Registry Attributes
### Added
- taze.catalog.count
- taze.package.deps_count
- taze.package.file_path




### New Span IDs (35)

- `span.taze.check.global`
- `span.taze.check.interactive`
- `span.taze.check.packages`
- `span.taze.check.run`
- `span.taze.check.single_project`
- `span.taze.config.resolve`
- `span.taze.fetch.jsr_package`
- `span.taze.fetch.package`
- `span.taze.io.dump_cache`
- `span.taze.io.get_package_data`
- `span.taze.io.load_cache`
- `span.taze.io.load_package`
- `span.taze.io.load_packages`
- `span.taze.io.read_json`
- `span.taze.io.write_json`
- `span.taze.io.write_package`
- `span.taze.package.install`
- `span.taze.package.load_bun_workspace`
- `span.taze.package.load_npm_global`
- `span.taze.package.load_package_json`
- `span.taze.package.load_package_yaml`
- `span.taze.package.load_pnpm_global`
- `span.taze.package.load_pnpm_workspace`
- `span.taze.package.load_yarn_workspace`
- `span.taze.package.read_yaml`
- `span.taze.resolve.dependencies`
- `span.taze.resolve.dependency`
- `span.taze.resolve.package`
- `span.taze.write.bun_json`
- `span.taze.write.bun_workspace`
- `span.taze.write.package_json`
- `span.taze.write.package_yaml`
- `span.taze.write.pnpm_workspace`
- `span.taze.write.yaml`
- `span.taze.write.yarn_workspace`

## Review Attention

- **src/io/resolves.ts**: 6 spans added (average: 3) — outlier, review recommended

### Advisory Findings

**src/commands/check/checkGlobal.ts**
- CDQ-007 (Attribute Data Quality): CDQ-007 (Attribute Data Quality) fired for one or more of: a PII attribute name (like author, email, or username) or a raw filesystem path where a basename would be safer. PII in traces can violate privacy policies and is worth fixing. The path finding is lower severity — fix it when the code will run in a context where the basename utility is already imported.
- CDQ-007 (Attribute Data Quality): CDQ-007 (Attribute Data Quality) fired for one or more of: a PII attribute name (like author, email, or username) or a raw filesystem path where a basename would be safer. PII in traces can violate privacy policies and is worth fixing. The path finding is lower severity — fix it when the code will run in a context where the basename utility is already imported.
- CDQ-007 (Attribute Data Quality): CDQ-007 (Attribute Data Quality) fired for one or more of: a PII attribute name (like author, email, or username) or a raw filesystem path where a basename would be safer. PII in traces can violate privacy policies and is worth fixing. The path finding is lower severity — fix it when the code will run in a context where the basename utility is already imported.
- CDQ-007 (Attribute Data Quality): CDQ-007 (Attribute Data Quality) fired for one or more of: a PII attribute name (like author, email, or username) or a raw filesystem path where a basename would be safer. PII in traces can violate privacy policies and is worth fixing. The path finding is lower severity — fix it when the code will run in a context where the basename utility is already imported.

**src/commands/check/index.ts**
- CDQ-007 (Attribute Data Quality): CDQ-007 (Attribute Data Quality) fired for one or more of: a PII attribute name (like author, email, or username) or a raw filesystem path where a basename would be safer. PII in traces can violate privacy policies and is worth fixing. The path finding is lower severity — fix it when the code will run in a context where the basename utility is already imported.
- SCH-001 (Span Names Match Registry): SCH-001 (Span Names Match Registry) fired because a span name doesn't match your Weaver registry or doesn't follow the required dotted-notation format (e.g. myapp.user.create). Use the registry name or declare a new span as a schemaExtension.

**src/commands/check/interactive.ts**
- CDQ-007 (Attribute Data Quality): CDQ-007 (Attribute Data Quality) fired for one or more of: a PII attribute name (like author, email, or username) or a raw filesystem path where a basename would be safer. PII in traces can violate privacy policies and is worth fixing. The path finding is lower severity — fix it when the code will run in a context where the basename utility is already imported.
- SCH-001 (Span Names Match Registry): SCH-001 (Span Names Match Registry) fired because a span name doesn't match your Weaver registry or doesn't follow the required dotted-notation format (e.g. myapp.user.create). Use the registry name or declare a new span as a schemaExtension.

**src/io/bunWorkspaces.ts**
- CDQ-007 (Attribute Data Quality): CDQ-007 (Attribute Data Quality) fired for one or more of: a PII attribute name (like author, email, or username) or a raw filesystem path where a basename would be safer. PII in traces can violate privacy policies and is worth fixing. The path finding is lower severity — fix it when the code will run in a context where the basename utility is already imported.
- SCH-001 (Span Names Match Registry): SCH-001 (Span Names Match Registry) fired because a span name doesn't match your Weaver registry or doesn't follow the required dotted-notation format (e.g. myapp.user.create). Use the registry name or declare a new span as a schemaExtension.
- SCH-001 (Span Names Match Registry): SCH-001 (Span Names Match Registry) fired because a span name doesn't match your Weaver registry or doesn't follow the required dotted-notation format (e.g. myapp.user.create). Use the registry name or declare a new span as a schemaExtension.

**src/io/packageJson.ts**
- CDQ-007 (Attribute Data Quality): CDQ-007 (Attribute Data Quality) fired for one or more of: a PII attribute name (like author, email, or username) or a raw filesystem path where a basename would be safer. PII in traces can violate privacy policies and is worth fixing. The path finding is lower severity — fix it when the code will run in a context where the basename utility is already imported.
- CDQ-007 (Attribute Data Quality): CDQ-007 (Attribute Data Quality) fired for one or more of: a PII attribute name (like author, email, or username) or a raw filesystem path where a basename would be safer. PII in traces can violate privacy policies and is worth fixing. The path finding is lower severity — fix it when the code will run in a context where the basename utility is already imported.

**src/io/packageYaml.ts**
- CDQ-007 (Attribute Data Quality): CDQ-007 (Attribute Data Quality) fired for one or more of: a PII attribute name (like author, email, or username) or a raw filesystem path where a basename would be safer. PII in traces can violate privacy policies and is worth fixing. The path finding is lower severity — fix it when the code will run in a context where the basename utility is already imported.
- CDQ-007 (Attribute Data Quality): CDQ-007 (Attribute Data Quality) fired for one or more of: a PII attribute name (like author, email, or username) or a raw filesystem path where a basename would be safer. PII in traces can violate privacy policies and is worth fixing. The path finding is lower severity — fix it when the code will run in a context where the basename utility is already imported.
- CDQ-007 (Attribute Data Quality): CDQ-007 (Attribute Data Quality) fired for one or more of: a PII attribute name (like author, email, or username) or a raw filesystem path where a basename would be safer. PII in traces can violate privacy policies and is worth fixing. The path finding is lower severity — fix it when the code will run in a context where the basename utility is already imported.
- CDQ-007 (Attribute Data Quality): CDQ-007 (Attribute Data Quality) fired for one or more of: a PII attribute name (like author, email, or username) or a raw filesystem path where a basename would be safer. PII in traces can violate privacy policies and is worth fixing. The path finding is lower severity — fix it when the code will run in a context where the basename utility is already imported.
- SCH-001 (Span Names Match Registry): SCH-001 (Span Names Match Registry) fired because a span name doesn't match your Weaver registry or doesn't follow the required dotted-notation format (e.g. myapp.user.create). Use the registry name or declare a new span as a schemaExtension.
- SCH-001 (Span Names Match Registry): SCH-001 (Span Names Match Registry) fired because a span name doesn't match your Weaver registry or doesn't follow the required dotted-notation format (e.g. myapp.user.create). Use the registry name or declare a new span as a schemaExtension.

**src/io/packages.ts**
- CDQ-007 (Attribute Data Quality): CDQ-007 (Attribute Data Quality) fired for one or more of: a PII attribute name (like author, email, or username) or a raw filesystem path where a basename would be safer. PII in traces can violate privacy policies and is worth fixing. The path finding is lower severity — fix it when the code will run in a context where the basename utility is already imported.
- CDQ-007 (Attribute Data Quality): CDQ-007 (Attribute Data Quality) fired for one or more of: a PII attribute name (like author, email, or username) or a raw filesystem path where a basename would be safer. PII in traces can violate privacy policies and is worth fixing. The path finding is lower severity — fix it when the code will run in a context where the basename utility is already imported.
- SCH-001 (Span Names Match Registry): SCH-001 (Span Names Match Registry) fired because a span name doesn't match your Weaver registry or doesn't follow the required dotted-notation format (e.g. myapp.user.create). Use the registry name or declare a new span as a schemaExtension.
- SCH-001 (Span Names Match Registry): SCH-001 (Span Names Match Registry) fired because a span name doesn't match your Weaver registry or doesn't follow the required dotted-notation format (e.g. myapp.user.create). Use the registry name or declare a new span as a schemaExtension.
- SCH-001 (Span Names Match Registry): SCH-001 (Span Names Match Registry) fired because a span name doesn't match your Weaver registry or doesn't follow the required dotted-notation format (e.g. myapp.user.create). Use the registry name or declare a new span as a schemaExtension.

**src/io/pnpmWorkspaces.ts**
- CDQ-007 (Attribute Data Quality): CDQ-007 (Attribute Data Quality) fired for one or more of: a PII attribute name (like author, email, or username) or a raw filesystem path where a basename would be safer. PII in traces can violate privacy policies and is worth fixing. The path finding is lower severity — fix it when the code will run in a context where the basename utility is already imported.
- CDQ-007 (Attribute Data Quality): CDQ-007 (Attribute Data Quality) fired for one or more of: a PII attribute name (like author, email, or username) or a raw filesystem path where a basename would be safer. PII in traces can violate privacy policies and is worth fixing. The path finding is lower severity — fix it when the code will run in a context where the basename utility is already imported.
- CDQ-007 (Attribute Data Quality): CDQ-007 (Attribute Data Quality) fired for one or more of: a PII attribute name (like author, email, or username) or a raw filesystem path where a basename would be safer. PII in traces can violate privacy policies and is worth fixing. The path finding is lower severity — fix it when the code will run in a context where the basename utility is already imported.
- CDQ-007 (Attribute Data Quality): CDQ-007 (Attribute Data Quality) fired for one or more of: a PII attribute name (like author, email, or username) or a raw filesystem path where a basename would be safer. PII in traces can violate privacy policies and is worth fixing. The path finding is lower severity — fix it when the code will run in a context where the basename utility is already imported.

**src/io/resolves.ts**
- SCH-001 (Span Names Match Registry): SCH-001 (Span Names Match Registry) fired because a span name doesn't match your Weaver registry or doesn't follow the required dotted-notation format (e.g. myapp.user.create). Use the registry name or declare a new span as a schemaExtension.
- SCH-001 (Span Names Match Registry): SCH-001 (Span Names Match Registry) fired because a span name doesn't match your Weaver registry or doesn't follow the required dotted-notation format (e.g. myapp.user.create). Use the registry name or declare a new span as a schemaExtension.
- SCH-001 (Span Names Match Registry): SCH-001 (Span Names Match Registry) fired because a span name doesn't match your Weaver registry or doesn't follow the required dotted-notation format (e.g. myapp.user.create). Use the registry name or declare a new span as a schemaExtension.
- SCH-001 (Span Names Match Registry): SCH-001 (Span Names Match Registry) fired because a span name doesn't match your Weaver registry or doesn't follow the required dotted-notation format (e.g. myapp.user.create). Use the registry name or declare a new span as a schemaExtension.
- SCH-001 (Span Names Match Registry): SCH-001 (Span Names Match Registry) fired because a span name doesn't match your Weaver registry or doesn't follow the required dotted-notation format (e.g. myapp.user.create). Use the registry name or declare a new span as a schemaExtension.

**src/io/yarnWorkspaces.ts**
- CDQ-007 (Attribute Data Quality): CDQ-007 (Attribute Data Quality) fired for one or more of: a PII attribute name (like author, email, or username) or a raw filesystem path where a basename would be safer. PII in traces can violate privacy policies and is worth fixing. The path finding is lower severity — fix it when the code will run in a context where the basename utility is already imported.
- CDQ-007 (Attribute Data Quality): CDQ-007 (Attribute Data Quality) fired for one or more of: a PII attribute name (like author, email, or username) or a raw filesystem path where a basename would be safer. PII in traces can violate privacy policies and is worth fixing. The path finding is lower severity — fix it when the code will run in a context where the basename utility is already imported.
- CDQ-007 (Attribute Data Quality): CDQ-007 (Attribute Data Quality) fired for one or more of: a PII attribute name (like author, email, or username) or a raw filesystem path where a basename would be safer. PII in traces can violate privacy policies and is worth fixing. The path finding is lower severity — fix it when the code will run in a context where the basename utility is already imported.
- CDQ-007 (Attribute Data Quality): CDQ-007 (Attribute Data Quality) fired for one or more of: a PII attribute name (like author, email, or username) or a raw filesystem path where a basename would be safer. PII in traces can violate privacy policies and is worth fixing. The path finding is lower severity — fix it when the code will run in a context where the basename utility is already imported.

**src/api/check.ts**
- CDQ-007 (Attribute Data Quality): CDQ-007 (Attribute Data Quality) fired for one or more of: a PII attribute name (like author, email, or username) or a raw filesystem path where a basename would be safer. PII in traces can violate privacy policies and is worth fixing. The path finding is lower severity — fix it when the code will run in a context where the basename utility is already imported.
- CDQ-007 (Attribute Data Quality): CDQ-007 (Attribute Data Quality) fired for one or more of: a PII attribute name (like author, email, or username) or a raw filesystem path where a basename would be safer. PII in traces can violate privacy policies and is worth fixing. The path finding is lower severity — fix it when the code will run in a context where the basename utility is already imported.
- CDQ-007 (Attribute Data Quality): CDQ-007 (Attribute Data Quality) fired for one or more of: a PII attribute name (like author, email, or username) or a raw filesystem path where a basename would be safer. PII in traces can violate privacy policies and is worth fixing. The path finding is lower severity — fix it when the code will run in a context where the basename utility is already imported.
- CDQ-007 (Attribute Data Quality): CDQ-007 (Attribute Data Quality) fired for one or more of: a PII attribute name (like author, email, or username) or a raw filesystem path where a basename would be safer. PII in traces can violate privacy policies and is worth fixing. The path finding is lower severity — fix it when the code will run in a context where the basename utility is already imported.
- CDQ-007 (Attribute Data Quality): CDQ-007 (Attribute Data Quality) fired for one or more of: a PII attribute name (like author, email, or username) or a raw filesystem path where a basename would be safer. PII in traces can violate privacy policies and is worth fixing. The path finding is lower severity — fix it when the code will run in a context where the basename utility is already imported.
- CDQ-007 (Attribute Data Quality): CDQ-007 (Attribute Data Quality) fired for one or more of: a PII attribute name (like author, email, or username) or a raw filesystem path where a basename would be safer. PII in traces can violate privacy policies and is worth fixing. The path finding is lower severity — fix it when the code will run in a context where the basename utility is already imported.
- CDQ-007 (Attribute Data Quality): CDQ-007 (Attribute Data Quality) fired for one or more of: a PII attribute name (like author, email, or username) or a raw filesystem path where a basename would be safer. PII in traces can violate privacy policies and is worth fixing. The path finding is lower severity — fix it when the code will run in a context where the basename utility is already imported.
- SCH-001 (Span Names Match Registry): SCH-001 (Span Names Match Registry) fired because a span name doesn't match your Weaver registry or doesn't follow the required dotted-notation format (e.g. myapp.user.create). Use the registry name or declare a new span as a schemaExtension.

**src/utils/packument.ts**
- SCH-001 (Span Names Match Registry): SCH-001 (Span Names Match Registry) fired because a span name doesn't match your Weaver registry or doesn't follow the required dotted-notation format (e.g. myapp.user.create). Use the registry name or declare a new span as a schemaExtension.

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
| **Cost** | $77.22 | $4.36 (claude-sonnet-4-6) |
| **Input tokens** | 3,300,000 | 123,235 |
| **Output tokens** | — | 155,230 |
| **Cache read tokens** | — | 64,131 |
| **Cache write tokens** | — | 438,784 |

Model: `claude-sonnet-4-6` | Files: 33 | Total file size: 97,041 bytes

## Live-Check Compliance

Live-Check: OK (688 spans, 3185 advisory findings — see compliance report)

Full compliance report: `spiny-orb-live-check-report.json`

## Agent Version

`1.0.0`