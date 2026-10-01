## Summary

- **Files processed**: 5
- **Committed**: 0
- **No changes needed**: 2
- **Failed**: 3

## Per-File Results

| File | Status | Spans | Attempts | Cost | Libraries | Schema Extensions |
|------|--------|-------|----------|------|-----------|-------------------|
| src/api/check.ts | failed: Validation failed: NDS-003, NDS-003, NDS-003 — NDS-003: non-instrumentation line added at instrumented line 80: catch (error) { The agent must preserve all original business logic. Only add instrumentation — do not modify, remove, or reorder existing code. | 0 | 3 | $0.46 | — | — |
| src/cli.ts | failed: Validation failed: NDS-003 — NDS-003: non-instrumentation line added at instrumented line 74: throw error The agent must preserve all original business logic. Only add instrumentation — do not modify, remove, or reorder existing code. | 0 | 3 | $0.32 | — | — |
| src/commands/check/checkGlobal.ts | failed: Validation failed: NDS-003, NDS-003, NDS-003 — NDS-003: non-instrumentation line added at instrumented line 127: catch (error) { The agent must preserve all original business logic. Only add instrumentation — do not modify, remove, or reorder existing code. | 0 | 3 | $0.79 | — | — |

**No changes needed** (2 files, 0 spans): src/addons/index.ts, src/addons/vscode.ts

## Span Category Breakdown

| File | External Calls | Schema-Defined | Service Entry Points | Total Functions |
|------|---------------|----------------|---------------------|-----------------|
| src/addons/index.ts | 0 | 0 | 0 | 0 |
| src/addons/vscode.ts | 0 | 0 | 0 | 1 |

## Schema Changes

No schema changes detected.

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
| **Cost** | $77.22 | $1.65 |
| **Input tokens** | 3,300,000 | 34,964 |
| **Output tokens** | — | 89,894 |
| **Cache read tokens** | — | 117,856 |
| **Cache write tokens** | — | 44,196 |

Model: `claude-sonnet-4-6` | Files: 33 | Total file size: 97,041 bytes

## Live-Check Compliance

OK

## Agent Version

`1.0.0`

## Warnings

- File failed: /Users/whitney.lee/Documents/Repositories/taze/src/api/check.ts — Validation failed: NDS-003, NDS-003, NDS-003 — NDS-003: non-instrumentation line added at instrumented line 80: catch (error) {
The agent must preserve all original business logic. Only add instrumentation — do not modify, remove, or reorder existing code.
- File failed: /Users/whitney.lee/Documents/Repositories/taze/src/cli.ts — Validation failed: NDS-003 — NDS-003: non-instrumentation line added at instrumented line 74: throw error
The agent must preserve all original business logic. Only add instrumentation — do not modify, remove, or reorder existing code.
- File failed: /Users/whitney.lee/Documents/Repositories/taze/src/commands/check/checkGlobal.ts — Validation failed: NDS-003, NDS-003, NDS-003 — NDS-003: non-instrumentation line added at instrumented line 127: catch (error) {
The agent must preserve all original business logic. Only add instrumentation — do not modify, remove, or reorder existing code.
- End-of-run test suite failed: Command failed: sh -c pnpm test

[31m⎯⎯⎯⎯⎯⎯⎯[39m[1m[41m Failed Tests 4 [49m[22m[31m⎯⎯⎯⎯⎯⎯⎯[39m

[41m[1m FAIL [22m[49m test/cli.test.ts[2m > [22mtaze cli should just works
[31m[1mAssertionError[22m: expected '\u001b[7m\u001b[31m\u001b[1m ERROR \u…' to be '' // Object.is equality[39m

[32m- Expected[39m
[31m+ Received[39m

[31m+ [7m[31m[1m ERROR [22m[31m[27m[39m
[31m+[39m
[31m+ [31m> [4mtypescript[24m unknown error[31m[39m
[31m+ [31mError: Timeout requesting "typescript"[31m[39m
[31m+[39m
[31m+[39m

[36m [2m❯[22m test/cli.test.ts:[2m10:23[22m[39m
    [90m  8|[39m   const proc = await exec(process.execPath, [binPath], { throwOnError:…
    [90m  9|[39m
    [90m 10|[39m   [34mexpect[39m(proc[33m.[39mstderr)[33m.[39m[34mtoBe[39m([32m''[39m)
    [90m   |[39m                       [31m^[39m
    [90m 11|[39m   [34mexpect[39m(proc[33m.[39mexitCode)[33m.[39m[34mtoBe[39m([34m0[39m)
    [90m 12|[39m })

[31m[2m⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[1/4]⎯[22m[39m

[41m[1m FAIL [22m[49m test/package-manager.test.ts[2m > [22mcheck package for packageManager[2m > [22mupdate pnpm packageManager
[31m[1mAssertionError[22m: expected false to be true // Object.is equality[39m

[32m- Expected[39m
[31m+ Received[39m

[32m- true[39m
[31m+ false[39m

[36m [2m❯[22m test/package-manager.test.ts:[2m60:29[22m[39m
    [90m 58|[39m     [35mconst[39m pnpmInfo [33m=[39m [34mgetPkgInfo[39m([32m'pnpm'[39m[33m,[39m result)
    [90m 59|[39m
    [90m 60|[39m     [34mexpect[39m(pnpmInfo[33m.[39mupdate)[33m.[39m[34mtoBe[39m([35mtrue[39m)
    [90m   |[39m                             [31m^[39m
    [90m 61|[39m     [34mexpect[39m(pnpmInfo[33m.[39mhexHash)[33m.[39m[34mtoBeUndefined[39m()
    [90m 62|[39m     [34mexpect[39m(pnpmInfo[33m.[39mcurrentVersion)[33m.[39m[34mtoBe[39m([32m`^[39m[36m${[39mpnpmVersion[36m}[39m[32m`[39m)

[31m[2m⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[2/4]⎯[22m[39m

[41m[1m FAIL [22m[49m test/packageConfig.test.ts[2m > [22mcheck package[2m > [22mdefined in config file / optionMode:default
[31m[1mAssertionError[22m: expected false to be true // Object.is equality[39m

[32m- Expected[39m
[31m+ Received[39m

[32m- true[39m
[31m+ false[39m

[36m [2m❯[22m test/packageConfig.test.ts:[2m58:53[22m[39m
    [90m 56|[39m
    [90m 57|[39m   [34mit[39m([32m'defined in config file / optionMode:default'[39m[33m,[39m () [33m=>[39m {
    [90m 58|[39m     [34mexpect[39m([34mgetPkgInfo[39m([32m'typescript'[39m[33m,[39m result)[33m.[39mupdate)[33m.[39m[34mtoBe[39m([35mtrue[39m)
    [90m   |[39m                                                     [31m^[39m
    [90m 59|[39m     [34mexpect[39m([34mgetPkgInfo[39m([32m'typescript'[39m[33m,[39m result)[33m.[39mdiff)[33m.[39m[34mtoBe[39m([32m'major'[39m)
    [90m 60|[39m

[31m[2m⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[3/4]⎯[22m[39m

[41m[1m FAIL [22m[49m test/versions.test.ts[2m > [22mgetMaxSatisfying
[31m[1mAssertionError[22m: expected undefined not to be undefined[39m
[36m [2m❯[22m test/versions.test.ts:[2m44:61[22m[39m
    [90m 42|[39m
    [90m 43|[39m   [90m// major[39m
    [90m 44|[39m   expect(getMaxSatisfying(versions, '', 'major', tags)).not.toBeUndefi…
    [90m   |[39m                                                             [31m^[39m
    [90m 45|[39m   expect(getMaxSatisfying(versions, '*', 'major', tags)).not.toBeUndef…
    [90m 46|[39m   expect(getMaxSatisfying(versions, '6.0.0', 'major', tags)).not.toBeU…

[31m[2m⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[4/4]⎯[22m[39m


- Live-check partial: 3 file(s) failed instrumentation (/Users/whitney.lee/Documents/Repositories/taze/src/api/check.ts, /Users/whitney.lee/Documents/Repositories/taze/src/cli.ts, /Users/whitney.lee/Documents/Repositories/taze/src/commands/check/checkGlobal.ts). Compliance report may be incomplete — spans from failed files are missing. This warning is advisory — the run completed; successfully instrumented files are unaffected. To get full coverage, review the failed files above and re-run spiny-orb on them.