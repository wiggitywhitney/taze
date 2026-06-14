## Summary

- **Files processed**: 5
- **Committed**: 1
- **No changes needed**: 3
- **Failed**: 1

## Per-File Results

| File | Status | Spans | Attempts | Cost | Libraries | Schema Extensions |
|------|--------|-------|----------|------|-----------|-------------------|
| src/commands/check/checkGlobal.ts | failed: Unexpected error: Manipulation error: Error replacing tree: The children of the old and new trees were expected to have the same count (8:7).  -- Details -- Path: /checkGlobal.ts Text: "...m` (global) ` + c.gray.dim(pnpmOuts[i].path),\n              }))\n\n            if (span.isRecording())\n\n            return pkgMetas\n  })\n}\n\nasync function loadGlobalNpmPackage(options: CheckOptions): Pr..." Stack: Error: Error replacing tree: The children of the old and new trees were expected to have the same count (8:7).     at #handleChildren (/Users/whitney.lee/Documents/Repositories/spinybacked-orbweaver/node_modules/ts-morph/dist/ts-morph.js:1495:19)     at ParentFinderReplacementNodeHandler.handleNode (/Users/whitney.lee/Documents/Repositories/spinybacked-orbweaver/node_modules/ts-morph/dist/ts-morph.js:1489:33)     at ParentFinderReplacementNodeHandler.handleNode (/Users/whitney.lee/Documents/Repositories/spinybacked-orbweaver/node_modules/ts-morph/dist/ts-morph.js:1646:19)     at NodeHandlerHelper.handleForValues (/Users/whitney.lee/Documents/Repositories/spinybacked-orbweaver/node_modules/ts-morph/dist/ts-morph.js:1430:21)     at #handleChildren (/Users/whitney.lee/Documents/Repositories/spinybacked-orbweaver/node_modules/ts-morph/dist/ts-morph.js:1499:25)     at ParentFinderReplacementNodeHandler.handleNode (/Users/whitney.lee/Documents/Repositories/spinybacked-orbweaver/node_modules/ts-morph/dist/ts-morph.js:1489:33)     at ParentFinderReplacementNodeHandler.handleNode (/Users/whitney.lee/Documents/Repositories/spinybacked-orbweaver/node_modules/ts-morph/dist/ts-morph.js:1646:19)     at NodeHandlerHelper.handleForValues (/Users/whitney.lee/Documents/Repositories/spinybacked-orbweaver/node_modules/ts-morph/dist/ts-morph.js:1430:21)     at #handleChildren (/Users/whitney.lee/Documents/Repositories/spinybacked-orbweaver/node_modules/ts-morph/dist/ts-morph.js:1499:25)     at ParentFinderReplacementNodeHandler.handleNode (/Users/whitney.lee/Documents/Repositories/spinybacked-orbweaver/node_modules/ts-morph/dist/ts-morph.js:1489:33) | 0 | 1 | $0.00 | — | — |
| src/commands/check/index.ts | success | 1 | 1 | $0.18 | — | `span.taze.check.run` |

**No changes needed** (3 files, 0 spans): src/addons/index.ts, src/addons/vscode.ts, src/cli.ts

## Span Category Breakdown

| File | External Calls | Schema-Defined | Service Entry Points | Total Functions |
|------|---------------|----------------|---------------------|-----------------|
| src/commands/check/index.ts | 0 | 0 | 1 | 1 |

## Schema Changes

No schema changes detected.

### New Span IDs (1)

- `span.taze.check.run`

## Review Attention

### Advisory Findings

**src/commands/check/index.ts**
- CDQ-006 (isRecording Guard): CDQ-006 (isRecording Guard) fired because span.setAttribute() is called with an expensive computation (map, reduce, filter, JSON.stringify, etc.) or an external source string (value fetched from git output, an API response, file contents, or any source whose length is unbounded) and no span.isRecording() guard. When sampling drops the span, that work still runs on every request. Wrap the call in `if (span.isRecording()) { ... }` to skip it when the span won't be exported. Skip this finding for root spans at entry points — the guard adds clutter for negligible gain there.
- CDQ-006 (isRecording Guard): CDQ-006 (isRecording Guard) fired because span.setAttribute() is called with an expensive computation (map, reduce, filter, JSON.stringify, etc.) or an external source string (value fetched from git output, an API response, file contents, or any source whose length is unbounded) and no span.isRecording() guard. When sampling drops the span, that work still runs on every request. Wrap the call in `if (span.isRecording()) { ... }` to skip it when the span won't be exported. Skip this finding for root spans at entry points — the guard adds clutter for negligible gain there.
- CDQ-007 (Attribute Data Quality): CDQ-007 (Attribute Data Quality) fired for one or more of: a PII attribute name (like author, email, or username) or a raw filesystem path where a basename would be safer. PII in traces can violate privacy policies and is worth fixing. The path finding is lower severity — fix it when the code will run in a context where the basename utility is already imported.

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
| **Cost** | $77.22 | $0.18 |
| **Input tokens** | 3,300,000 | 1,960 |
| **Output tokens** | — | 7,424 |
| **Cache write tokens** | — | 18,052 |

Model: `claude-sonnet-4-6` | Files: 33 | Total file size: 97,041 bytes

## Live-Check Compliance

Live-Check: WARNING — tests failed after SDK injection (see test output for details)

## Agent Version

`1.0.0`

## Warnings

- File failed: /Users/whitney.lee/Documents/Repositories/taze/src/commands/check/checkGlobal.ts — Unexpected error: Manipulation error: Error replacing tree: The children of the old and new trees were expected to have the same count (8:7).

-- Details --
Path: /checkGlobal.ts
Text: "...m` (global) ` + c.gray.dim(pnpmOuts[i].path),\n              }))\n\n            if (span.isRecording())\n\n            return pkgMetas\n  })\n}\n\nasync function loadGlobalNpmPackage(options: CheckOptions): Pr..."
Stack: Error: Error replacing tree: The children of the old and new trees were expected to have the same count (8:7).
    at #handleChildren (/Users/whitney.lee/Documents/Repositories/spinybacked-orbweaver/node_modules/ts-morph/dist/ts-morph.js:1495:19)
    at ParentFinderReplacementNodeHandler.handleNode (/Users/whitney.lee/Documents/Repositories/spinybacked-orbweaver/node_modules/ts-morph/dist/ts-morph.js:1489:33)
    at ParentFinderReplacementNodeHandler.handleNode (/Users/whitney.lee/Documents/Repositories/spinybacked-orbweaver/node_modules/ts-morph/dist/ts-morph.js:1646:19)
    at NodeHandlerHelper.handleForValues (/Users/whitney.lee/Documents/Repositories/spinybacked-orbweaver/node_modules/ts-morph/dist/ts-morph.js:1430:21)
    at #handleChildren (/Users/whitney.lee/Documents/Repositories/spinybacked-orbweaver/node_modules/ts-morph/dist/ts-morph.js:1499:25)
    at ParentFinderReplacementNodeHandler.handleNode (/Users/whitney.lee/Documents/Repositories/spinybacked-orbweaver/node_modules/ts-morph/dist/ts-morph.js:1489:33)
    at ParentFinderReplacementNodeHandler.handleNode (/Users/whitney.lee/Documents/Repositories/spinybacked-orbweaver/node_modules/ts-morph/dist/ts-morph.js:1646:19)
    at NodeHandlerHelper.handleForValues (/Users/whitney.lee/Documents/Repositories/spinybacked-orbweaver/node_modules/ts-morph/dist/ts-morph.js:1430:21)
    at #handleChildren (/Users/whitney.lee/Documents/Repositories/spinybacked-orbweaver/node_modules/ts-morph/dist/ts-morph.js:1499:25)
    at ParentFinderReplacementNodeHandler.handleNode (/Users/whitney.lee/Documents/Repositories/spinybacked-orbweaver/node_modules/ts-morph/dist/ts-morph.js:1489:33)
- Schema diff warning: Schema diff (markdown) failed: Command failed: weaver registry diff -r /Users/whitney.lee/Documents/Repositories/taze/semconv --baseline-registry /var/folders/rm/gjmwm2511cq_bsc7n56tw75m0000gp/T/weaver-baseline-eASrsb --diff-format markdown
Weaver Registry Diff
Checking registry `/Users/whitney.lee/Documents/Repositories/taze/semconv`
ℹ Found registry manifest: /Users/whitney.lee/Documents/Repositories/taze/semconv/registry_manifest.yaml
ℹ Found registry manifest: /var/folders/rm/gjmwm2511cq_bsc7n56tw75m0000gp/T/weaver-baseline-eASrsb/registry_manifest.yaml

- Baseline test suite has pre-existing failures — checkpoint test rollback disabled
- End-of-run test suite failed: Command failed: sh -c pnpm test

[31m⎯⎯⎯⎯⎯⎯⎯[39m[1m[41m Failed Tests 1 [49m[22m[31m⎯⎯⎯⎯⎯⎯⎯[39m

[41m[1m FAIL [22m[49m test/resolves.test.ts[2m > [22mresolveDependency
[31m[1mAssertionError[22m: expected { Object (name, currentVersion, ...) } to match object { name: '@test-zone/provenance', …(5) }
(13 matching properties omitted from actual)[39m

[32m- Expected[39m
[31m+ Received[39m

[33m@@ -1,7 +1,7 @@[39m
[2m  {[22m
[32m-   "currentProvenance": "trustedPublisher",[39m
[31m+   "currentProvenance": true,[39m
[2m    "currentVersion": "0.0.1",[22m
[2m    "name": "@test-zone/provenance",[22m
[2m    "provenanceDowngraded": true,[22m
[2m    "targetProvenance": undefined,[22m
[2m    "targetVersion": "0.0.2",[22m

[36m [2m❯[22m test/resolves.test.ts:[2m150:24[22m[39m
    [90m148|[39m     source[33m:[39m [32m'dependencies'[39m[33m,[39m
    [90m149|[39m     update[33m:[39m [35mtrue[39m[33m,[39m
    [90m150|[39m   }[33m,[39m options[33m,[39m filter))[33m.[39m[34mtoMatchObject[39m({
    [90m   |[39m                        [31m^[39m
    [90m151|[39m     name[33m:[39m [32m'@test-zone/provenance'[39m[33m,[39m
    [90m152|[39m     provenanceDowngraded[33m:[39m [35mtrue[39m[33m,[39m

[31m[2m⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[1/1]⎯[22m[39m


- Live-check partial: 1 file(s) failed instrumentation (/Users/whitney.lee/Documents/Repositories/taze/src/commands/check/checkGlobal.ts). Compliance report may be incomplete — spans from failed files are missing. This warning is advisory — the run completed; successfully instrumented files are unaffected. To get full coverage, review the failed files above and re-run spiny-orb on them.