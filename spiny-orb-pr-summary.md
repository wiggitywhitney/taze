## Summary

- **Files processed**: 8
- **Committed**: 0
- **No changes needed**: 2
- **Failed**: 6

## Per-File Results

| File | Status | Spans | Attempts | Cost | Libraries | Schema Extensions |
|------|--------|-------|----------|------|-----------|-------------------|
| src/api/check.ts | failed: Oscillation detected during fresh regeneration: Duplicate errors across consecutive attempts: NDS-001 (×1) at NDS-001:137 | 0 | 3 | $0.27 | — | — |
| src/cli.ts | failed: Oscillation detected during fresh regeneration: Duplicate errors across consecutive attempts: NDS-001 (×1) at NDS-001:137 | 0 | 3 | $0.36 | — | — |
| src/commands/check/checkGlobal.ts | failed: Oscillation detected during fresh regeneration: Error count increased for NDS-003: 3 → 5 (at line 72, line 73, line 131, line 134, line 136) | 0 | 3 | $0.26 | — | — |
| src/commands/check/index.ts | failed: Oscillation detected during fresh regeneration: Duplicate errors across consecutive attempts: NDS-001 (×1) at NDS-001:137 | 0 | 3 | $0.41 | — | — |
| src/commands/check/interactive.ts | failed: Validation failed: NDS-001 — NDS-001 check failed: tsc --noEmit returned a non-zero exit code. src/commands/check/interactive.ts(4,21): error TS2591: Cannot find name 'node:process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node` and then add 'node' to the types field in your tsconfig. src/commands/check/interactive.ts(6,22): error TS2591: Cannot find name 'node:readline'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node` and then add 'node' to the types field in your tsconfig. src/io/resolves.ts(3,55): error TS2591: Cannot find name 'node:fs'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node` and then add 'node' to the types field in your tsconfig. src/io/resolves.ts(4,16): error TS2591: Cannot find name 'node:os'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node` and then add 'node' to the types field in your tsconfig. src/io/resolves.ts(5,21): error TS2591: Cannot find name 'node:process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node` and then add 'node' to the types field in your tsconfig. src/render.ts(3,21): error TS2591: Cannot find name 'node:process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node` and then add 'node' to the types field in your tsconfig. src/render.ts(4,42): error TS2591: Cannot find name 'node:util'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node` and then add 'node' to the types field in your tsconfig. src/utils/context.ts(2,35): error TS2591: Cannot find name 'node:async_hooks'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node` and then add 'node' to the types field in your tsconfig. src/utils/packument.ts(3,21): error TS2591: Cannot find name 'node:process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node` and then add 'node' to the types field in your tsconfig. Fix the TypeScript error at line 4 and ensure the file is valid TypeScript. | 0 | 3 | $0.37 | — | — |
| src/commands/check/render.ts | failed: Oscillation detected during fresh regeneration: Duplicate errors across consecutive attempts: NDS-001 (×1) at NDS-001:3 | 0 | 3 | $0.00 | — | — |

**No changes needed** (2 files, 0 spans): src/addons/index.ts, src/addons/vscode.ts

## Span Category Breakdown

| File | External Calls | Schema-Defined | Service Entry Points | Total Functions |
|------|---------------|----------------|---------------------|-----------------|
| src/addons/index.ts | 0 | 0 | 0 | 0 |
| src/addons/vscode.ts | 0 | 0 | 0 | 1 |

## Schema Changes

No schema changes detected.

## Review Attention

### Advisory Findings

**(run-level)**
- CDQ-008 (Tracer Naming): No trace.getTracer() calls found.

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
| **Cost** | $77.22 | $1.74 |
| **Input tokens** | 3,300,000 | 59,772 |
| **Output tokens** | — | 92,022 |
| **Cache read tokens** | — | 220,665 |
| **Cache write tokens** | — | 29,422 |

Model: `claude-sonnet-4-6` | Files: 33 | Total file size: 97,041 bytes

## Live-Check Compliance

OK

## Agent Version

`1.0.0`

## Warnings

- File failed: /Users/whitney.lee/Documents/Repositories/taze/src/api/check.ts — Oscillation detected during fresh regeneration: Duplicate errors across consecutive attempts: NDS-001 (×1) at NDS-001:137
- File failed: /Users/whitney.lee/Documents/Repositories/taze/src/cli.ts — Oscillation detected during fresh regeneration: Duplicate errors across consecutive attempts: NDS-001 (×1) at NDS-001:137
- File failed: /Users/whitney.lee/Documents/Repositories/taze/src/commands/check/checkGlobal.ts — Oscillation detected during fresh regeneration: Error count increased for NDS-003: 3 → 5 (at line 72, line 73, line 131, line 134, line 136)
- File failed: /Users/whitney.lee/Documents/Repositories/taze/src/commands/check/index.ts — Oscillation detected during fresh regeneration: Duplicate errors across consecutive attempts: NDS-001 (×1) at NDS-001:137
- File failed: /Users/whitney.lee/Documents/Repositories/taze/src/commands/check/interactive.ts — Validation failed: NDS-001 — NDS-001 check failed: tsc --noEmit returned a non-zero exit code. src/commands/check/interactive.ts(4,21): error TS2591: Cannot find name 'node:process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node` and then add 'node' to the types field in your tsconfig.
src/commands/check/interactive.ts(6,22): error TS2591: Cannot find name 'node:readline'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node` and then add 'node' to the types field in your tsconfig.
src/io/resolves.ts(3,55): error TS2591: Cannot find name 'node:fs'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node` and then add 'node' to the types field in your tsconfig.
src/io/resolves.ts(4,16): error TS2591: Cannot find name 'node:os'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node` and then add 'node' to the types field in your tsconfig.
src/io/resolves.ts(5,21): error TS2591: Cannot find name 'node:process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node` and then add 'node' to the types field in your tsconfig.
src/render.ts(3,21): error TS2591: Cannot find name 'node:process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node` and then add 'node' to the types field in your tsconfig.
src/render.ts(4,42): error TS2591: Cannot find name 'node:util'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node` and then add 'node' to the types field in your tsconfig.
src/utils/context.ts(2,35): error TS2591: Cannot find name 'node:async_hooks'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node` and then add 'node' to the types field in your tsconfig.
src/utils/packument.ts(3,21): error TS2591: Cannot find name 'node:process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node` and then add 'node' to the types field in your tsconfig. Fix the TypeScript error at line 4 and ensure the file is valid TypeScript.
- File failed: /Users/whitney.lee/Documents/Repositories/taze/src/commands/check/render.ts — Oscillation detected during fresh regeneration: Duplicate errors across consecutive attempts: NDS-001 (×1) at NDS-001:3
- Baseline test suite has pre-existing failures — checkpoint test rollback disabled
- End-of-run test suite failed: Command failed: sh -c pnpm test

[31m⎯⎯⎯⎯⎯⎯⎯[39m[1m[41m Failed Tests 2 [49m[22m[31m⎯⎯⎯⎯⎯⎯⎯[39m

[41m[1m FAIL [22m[49m test/cli.test.ts[2m > [22mtaze cli should just works
[31m[1mAssertionError[22m: expected '\u001b[7m\u001b[31m\u001b[1m ERROR \u…' to be '' // Object.is equality[39m

[32m- Expected[39m
[31m+ Received[39m

[31m+ [7m[31m[1m ERROR [22m[31m[27m[39m
[31m+[39m
[31m+ [31m> [4m@types/node[24m unknown error[31m[39m
[31m+ [31mError: Timeout requesting "@types/node"[31m[39m
[31m+ [31m> [4mpnpm[24m unknown error[31m[39m
[31m+ [31mError: Timeout requesting "pnpm"[31m[39m
[31m+[39m
[31m+[39m

[36m [2m❯[22m test/cli.test.ts:[2m10:23[22m[39m
    [90m  8|[39m   const proc = await exec(process.execPath, [binPath], { throwOnError:…
    [90m  9|[39m
    [90m 10|[39m   [34mexpect[39m(proc[33m.[39mstderr)[33m.[39m[34mtoBe[39m([32m''[39m)
    [90m   |[39m                       [31m^[39m
    [90m 11|[39m   [34mexpect[39m(proc[33m.[39mexitCode)[33m.[39m[34mtoBe[39m([34m0[39m)
    [90m 12|[39m })

[31m[2m⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[1/2]⎯[22m[39m

[41m[1m FAIL [22m[49m test/resolves.test.ts[2m > [22mresolveDependency
[31m[1mAssertionError[22m: expected true to be false // Object.is equality[39m

[32m- Expected[39m
[31m+ Received[39m

[32m- false[39m
[31m+ true[39m

[36m [2m❯[22m test/resolves.test.ts:[2m130:16[22m[39m
    [90m128|[39m   [90m// yarn resolutions[39m
    [90m129|[39m   expect(true).toBe((await resolveDependency(makePkgForResolutions('ty…
    [90m130|[39m   expect(true).toBe((await resolveDependency(makePkgForResolutions('ty…
    [90m   |[39m                [31m^[39m
    [90m131|[39m   expect(true).toBe((await resolveDependency(makePkgForResolutions('ty…
    [90m132|[39m   expect(true).toBe((await resolveDependency(makePkgForResolutions('fo…

[31m[2m⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[2/2]⎯[22m[39m


- Live-check partial: 6 file(s) failed instrumentation (/Users/whitney.lee/Documents/Repositories/taze/src/api/check.ts, /Users/whitney.lee/Documents/Repositories/taze/src/cli.ts, /Users/whitney.lee/Documents/Repositories/taze/src/commands/check/checkGlobal.ts, /Users/whitney.lee/Documents/Repositories/taze/src/commands/check/index.ts, /Users/whitney.lee/Documents/Repositories/taze/src/commands/check/interactive.ts...). Compliance report may be incomplete — spans from failed files are missing. This warning is advisory — the run completed; successfully instrumented files are unaffected. To get full coverage, review the failed files above and re-run spiny-orb on them.