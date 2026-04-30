## Summary

- **Files processed**: 19
- **Committed**: 1
- **No changes needed**: 7
- **Failed**: 2
- **Skipped**: 9

## Per-File Results

| File | Status | Spans | Attempts | Cost | Libraries | Schema Extensions |
|------|--------|-------|----------|------|-----------|-------------------|
| src/api/check.ts | skipped | 0 | 0 | $0.00 | — | — |
| src/cli.ts | skipped | 0 | 0 | $0.00 | — | — |
| src/commands/check/checkGlobal.ts | skipped | 0 | 0 | $0.00 | — | — |
| src/commands/check/index.ts | skipped | 0 | 0 | $0.00 | — | — |
| src/commands/check/interactive.ts | skipped | 0 | 0 | $0.00 | — | — |
| src/config.ts | skipped | 0 | 0 | $0.00 | — | — |
| src/io/bunWorkspaces.ts | skipped | 0 | 0 | $0.00 | — | — |
| src/io/packageJson.ts | failed: Validation failed: NDS-003, NDS-003 — NDS-003: original line 60 missing/modified: type: 'package.json', The agent must preserve all original business logic. Only add instrumentation — do not modify, remove, or reorder existing code. | 0 | 3 | $0.40 | — | — |
| src/io/packageYaml.ts | failed: Validation failed: NDS-003, NDS-003 — NDS-003: original line 86 missing/modified: type: 'package.yaml', The agent must preserve all original business logic. Only add instrumentation — do not modify, remove, or reorder existing code. | 0 | 3 | $0.55 | — | — |
| src/io/packages.ts | skipped | 0 | 0 | $0.00 | — | — |
| src/io/pnpmWorkspaces.ts | skipped | 0 | 0 | $0.00 | — | — |
| src/io/resolves.ts | success | 6 | 2 | $0.73 | — | `span.taze.cache.load`, `span.taze.cache.dump`, `span.taze.package.resolve`, `span.taze.package.check`, `taze.cache.loaded`, `taze.cache.changed`, `span.taze.package.load`, `span.taze.packages.load` |

**No changes needed** (7 files, 0 spans): src/addons/index.ts, src/addons/vscode.ts, src/commands/check/render.ts, src/constants.ts, src/filters/diff-sorter.ts, src/index.ts, src/io/dependencies.ts

## Span Category Breakdown

| File | External Calls | Schema-Defined | Service Entry Points | Total Functions |
|------|---------------|----------------|---------------------|-----------------|
| src/addons/index.ts | 0 | 0 | 0 | 0 |
| src/addons/vscode.ts | 0 | 0 | 0 | 1 |
| src/constants.ts | 0 | 0 | 0 | 0 |
| src/io/resolves.ts | 1 | 2 | 6 | 15 |

## Schema Changes

# Summary of Schema Changes
## Registry versions
Baseline: 0.1.0

Head: 0.1.0

## Registry Attributes
### Added
- taze.cache.changed
- taze.cache.loaded

### Removed
- taze.bun_workspace.catalogs_count
- taze.config.sources_count
- taze.pnpm_workspace.catalogs_count
- taze.yarn_workspace.catalogs_count




### New Span IDs (6)

- `span.taze.cache.dump`
- `span.taze.cache.load`
- `span.taze.package.check`
- `span.taze.package.load`
- `span.taze.package.resolve`
- `span.taze.packages.load`

## Review Attention

- **src/io/resolves.ts**: 6 spans added (average: 2) — outlier, review recommended

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
| **Cost** | $77.22 | $1.78 |
| **Input tokens** | 3,300,000 | 76,059 |
| **Output tokens** | — | 87,129 |
| **Cache read tokens** | — | 141,856 |
| **Cache write tokens** | — | 53,196 |

Model: `claude-sonnet-4-6` | Files: 33 | Total file size: 110,858 bytes

## Live-Check Compliance

OK

## Agent Version

`1.0.0`

## Warnings

- File failed: /Users/whitney.lee/Documents/Repositories/taze/src/io/packageJson.ts — Validation failed: NDS-003, NDS-003 — NDS-003: original line 60 missing/modified: type: 'package.json',
The agent must preserve all original business logic. Only add instrumentation — do not modify, remove, or reorder existing code.
- File failed: /Users/whitney.lee/Documents/Repositories/taze/src/io/packageYaml.ts — Validation failed: NDS-003, NDS-003 — NDS-003: original line 86 missing/modified: type: 'package.yaml',
The agent must preserve all original business logic. Only add instrumentation — do not modify, remove, or reorder existing code.
- Schema integrity violation (registry_attributes): existing definition "taze.bun_workspace.catalogs_count" was removed — agents may only add new definitions.
- Schema integrity violation (registry_attributes): existing definition "taze.pnpm_workspace.catalogs_count" was removed — agents may only add new definitions.
- Schema integrity violation (registry_attributes): existing definition "taze.config.sources_count" was removed — agents may only add new definitions.
- Schema integrity violation (registry_attributes): existing definition "taze.yarn_workspace.catalogs_count" was removed — agents may only add new definitions.
- Live-check partial: 2 file(s) failed instrumentation (/Users/whitney.lee/Documents/Repositories/taze/src/io/packageJson.ts, /Users/whitney.lee/Documents/Repositories/taze/src/io/packageYaml.ts). Compliance report may be incomplete — spans from failed files are missing. This warning is advisory — the run completed; successfully instrumented files are unaffected. To get full coverage, review the failed files above and re-run spiny-orb on them.