## Summary

- **Files processed**: 33
- **Committed**: 11
- **No changes needed**: 19
- **Failed**: 3

## Per-File Results

| File | Status | Spans | Attempts | Cost | Libraries | Schema Extensions |
|------|--------|-------|----------|------|-----------|-------------------|
| src/api/check.ts | success | 1 | 1 | $0.07 | — | `span.taze.check` |
| src/cli.ts | success | 2 | 1 | $0.25 | — | `span.taze.cli.action` |
| src/commands/check/checkGlobal.ts | success | 1 | 1 | $0.18 | — | `span.taze.check.global` |
| src/commands/check/index.ts | success | 1 | 2 | $0.36 | — | `span.taze.check.command` |
| src/commands/check/interactive.ts | success | 1 | 1 | $0.25 | — | `span.taze.check.interactive` |
| src/config.ts | success | 1 | 2 | $0.19 | — | `span.taze.config.resolve`, `taze.config.sources_count` |
| src/io/bunWorkspaces.ts | success | 2 | 1 | $0.10 | — | `span.taze.bun_workspace.load`, `span.taze.bun_workspace.write`, `taze.bun_workspace.catalogs_count` |
| src/io/packageJson.ts | failed: Validation failed: NDS-001 — NDS-001 check failed: tsc --noEmit returned a non-zero exit code. src/io/packageJson.ts(36,3): error TS2322: Type '{ name: any; private: boolean; version: any; type: string; relative: string; filepath: string; raw: Record<string, any>; deps: RawDep[]; resolved: never[]; }[]' is not assignable to type 'PackageMeta[]'.   Type '{ name: any; private: boolean; version: any; type: string; relative: string; filepath: string; raw: Record<string, any>; deps: RawDep[]; resolved: never[]; }' is not assignable to type 'PackageMeta'.     Type '{ name: any; private: boolean; version: any; type: string; relative: string; filepath: string; raw: Record<string, any>; deps: RawDep[]; resolved: never[]; }' is not assignable to type 'PackageJsonMeta \| PnpmWorkspaceMeta \| BunWorkspaceMeta \| YarnWorkspaceMeta \| PackageYamlMeta'.       Property 'yamlDocument' is missing in type '{ name: any; private: boolean; version: any; type: string; relative: string; filepath: string; raw: Record<string, any>; deps: RawDep[]; resolved: never[]; }' but required in type 'PackageYamlMeta'. Fix the TypeScript error at line 36 and ensure the file is valid TypeScript. | 0 | 3 | $0.37 | — | — |
| src/io/packageYaml.ts | failed: Validation failed: NDS-001 — NDS-001 check failed: tsc --noEmit returned a non-zero exit code. src/io/packageYaml.ts(85,3): error TS2322: Type '{ name: string; private: boolean; version: string; type: string; relative: string; filepath: string; readonly raw: any; deps: RawDep[]; yamlDocument: Document<Node, true>; resolved: never[]; }[]' is not assignable to type 'PackageMeta[]'.   Type '{ name: string; private: boolean; version: string; type: string; relative: string; filepath: string; readonly raw: any; deps: RawDep[]; yamlDocument: DocumentType<Node, true>; resolved: never[]; }' is not assignable to type 'PackageMeta'.     Type '{ name: string; private: boolean; version: string; type: string; relative: string; filepath: string; readonly raw: any; deps: RawDep[]; yamlDocument: DocumentType<Node, true>; resolved: never[]; }' is not assignable to type 'PackageYamlMeta'.       Types of property 'type' are incompatible.         Type 'string' is not assignable to type '"package.yaml"'. Fix the TypeScript error at line 85 and ensure the file is valid TypeScript. | 0 | 3 | $0.42 | — | — |
| src/io/packages.ts | success | 3 | 1 | $0.59 | — | `span.taze.package.write`, `span.taze.package.load`, `span.taze.packages.load` |
| src/io/pnpmWorkspaces.ts | success | 2 | 1 | $0.43 | — | `span.taze.pnpm_workspace.load`, `span.taze.pnpm_workspace.write`, `taze.pnpm_workspace.catalogs_count` |
| src/io/resolves.ts | failed: Validation failed: NDS-003 — NDS-003: non-instrumentation line added at instrumented line 431: if (span.isRecording()) { The agent must preserve all original business logic. Only add instrumentation — do not modify, remove, or reorder existing code. | 0 | 2 | $0.90 | — | — |
| src/io/yarnWorkspaces.ts | success | 2 | 1 | $0.34 | — | `span.taze.yarn_workspace.load`, `span.taze.yarn_workspace.write`, `taze.yarn_workspace.catalogs_count` |
| src/utils/packument.ts | success | 2 | 2 | $0.27 | — | `span.taze.fetch.npm`, `span.taze.fetch.jsr` |

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
| src/commands/check/interactive.ts | 0 | 0 | 1 | 6 |
| src/config.ts | 0 | 0 | 1 | 2 |
| src/constants.ts | 0 | 0 | 0 | 0 |
| src/io/bunWorkspaces.ts | 0 | 0 | 2 | 4 |
| src/io/packages.ts | 0 | 0 | 3 | 5 |
| src/io/pnpmWorkspaces.ts | 0 | 0 | 2 | 4 |
| src/io/yarnWorkspaces.ts | 0 | 0 | 2 | 4 |
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
- taze.bun_workspace.catalogs_count
- taze.config.sources_count
- taze.pnpm_workspace.catalogs_count
- taze.yarn_workspace.catalogs_count




### New Span IDs (17)

- `span.taze.bun_workspace.load`
- `span.taze.bun_workspace.write`
- `span.taze.check`
- `span.taze.check.command`
- `span.taze.check.global`
- `span.taze.check.interactive`
- `span.taze.cli.action`
- `span.taze.config.resolve`
- `span.taze.fetch.jsr`
- `span.taze.fetch.npm`
- `span.taze.package.load`
- `span.taze.package.write`
- `span.taze.packages.load`
- `span.taze.pnpm_workspace.load`
- `span.taze.pnpm_workspace.write`
- `span.taze.yarn_workspace.load`
- `span.taze.yarn_workspace.write`

## Review Attention

- **src/io/packages.ts**: 3 spans added (average: 1) — outlier, review recommended

### Advisory Findings

**src/api/check.ts**
- CDQ-007 (Attribute Data Quality): setAttribute value "options.mode" at line 24 accesses a property of "options" without a null/undefined guard. If "options" can be null or undefined, this will throw at runtime. Add an `if (options)` check or use optional chaining (`options?.mode`).
- CDQ-007 (Attribute Data Quality): setAttribute value "options.recursive" at line 26 accesses a property of "options" without a null/undefined guard. If "options" can be null or undefined, this will throw at runtime. Add an `if (options)` check or use optional chaining (`options?.recursive`).
- CDQ-007 (Attribute Data Quality): setAttribute value "options.write" at line 28 accesses a property of "options" without a null/undefined guard. If "options" can be null or undefined, this will throw at runtime. Add an `if (options)` check or use optional chaining (`options?.write`).
- SCH-001 (Span Names Match Registry): SCH-001 (Span Names Match Registry) check failed: "taze.check" at line 21 does not follow naming conventions (judge confidence: 85%). Rename span to follow a structured dotted notation convention. For example, 'taze.check.validate' or 'taze.security.check' would be more descriptive. The current name 'taze.check' lacks an operation component and could be more specific about what check is being performed (e.g., permission check, syntax check, authentication check).

**src/cli.ts**
- CDQ-007 (Attribute Data Quality): setAttribute value "options.mode" at line 61 accesses a property of "options" without a null/undefined guard. If "options" can be null or undefined, this will throw at runtime. Add an `if (options)` check or use optional chaining (`options?.mode`).
- CDQ-007 (Attribute Data Quality): setAttribute value "options.recursive" at line 64 accesses a property of "options" without a null/undefined guard. If "options" can be null or undefined, this will throw at runtime. Add an `if (options)` check or use optional chaining (`options?.recursive`).
- CDQ-007 (Attribute Data Quality): setAttribute value "options.write" at line 67 accesses a property of "options" without a null/undefined guard. If "options" can be null or undefined, this will throw at runtime. Add an `if (options)` check or use optional chaining (`options?.write`).

**src/commands/check/checkGlobal.ts**
- CDQ-006 (isRecording Guard): setAttribute value "pkgs.reduce((acc, pkg) => acc + pkg.deps..." at line 51 has an expensive computation without span.isRecording() guard. Wrap expensive attribute computations in an if (span.isRecording()) check to avoid unnecessary computation when the span is not being sampled.
- CDQ-006 (isRecording Guard): setAttribute value "resolvePkgs.reduce((acc, pkg) => acc + p..." at line 76 has an expensive computation without span.isRecording() guard. Wrap expensive attribute computations in an if (span.isRecording()) check to avoid unnecessary computation when the span is not being sampled.
- CDQ-007 (Attribute Data Quality): setAttribute value "options.mode" at line 41 accesses a property of "options" without a null/undefined guard. If "options" can be null or undefined, this will throw at runtime. Add an `if (options)` check or use optional chaining (`options?.mode`).
- SCH-001 (Span Names Match Registry): SCH-001 (Span Names Match Registry) check failed: "taze.check.global" at line 35: not found in registry span definitions.
Available registry operations: taze.check, taze.cli.action
Span names must match an operation defined in the Weaver telemetry registry. Either use a registered operation name or add a new span definition to the registry.

**src/commands/check/index.ts**
- CDQ-007 (Attribute Data Quality): setAttribute value "options.mode" at line 25 accesses a property of "options" without a null/undefined guard. If "options" can be null or undefined, this will throw at runtime. Add an `if (options)` check or use optional chaining (`options?.mode`).

**src/commands/check/interactive.ts**
- CDQ-006 (isRecording Guard): setAttribute value "pkgs.reduce((acc, pkg) => acc + pkg.reso..." at line 27 has an expensive computation without span.isRecording() guard. Wrap expensive attribute computations in an if (span.isRecording()) check to avoid unnecessary computation when the span is not being sampled.
- CDQ-006 (isRecording Guard): setAttribute value "flatDeps().length" at line 48 has an expensive computation without span.isRecording() guard. Wrap expensive attribute computations in an if (span.isRecording()) check to avoid unnecessary computation when the span is not being sampled.

**src/config.ts**
- CDQ-007 (Attribute Data Quality): setAttribute value "options.recursive" at line 37 accesses a property of "options" without a null/undefined guard. If "options" can be null or undefined, this will throw at runtime. Add an `if (options)` check or use optional chaining (`options?.recursive`).
- SCH-004 (No Redundant Schema Entries): Attribute key "taze.config.sources_count" at line 59 appears to be a semantic duplicate of an existing registry entry (judge confidence: 72%). Use 'taze.config.sources' instead of 'taze.config.sources_count', or align naming with the established pattern: 'taze.check.packages_total' uses '_total' suffix rather than '_count'. Consider 'taze.config.sources_total' for consistency with registry conventions.

**src/io/bunWorkspaces.ts**
- CDQ-006 (isRecording Guard): setAttribute value "Object.keys(versions).length" at line 84 has an expensive computation without span.isRecording() guard. Wrap expensive attribute computations in an if (span.isRecording()) check to avoid unnecessary computation when the span is not being sampled.
- CDQ-007 (Attribute Data Quality): setAttribute value "catalogs.length" at line 63 accesses a property of "catalogs" without a null/undefined guard. If "catalogs" can be null or undefined, this will throw at runtime. Add an `if (catalogs)` check or use optional chaining (`catalogs?.length`).
- CDQ-007 (Attribute Data Quality): setAttribute value "pkg.relative" at line 82 accesses a property of "pkg" without a null/undefined guard. If "pkg" can be null or undefined, this will throw at runtime. Add an `if (pkg)` check or use optional chaining (`pkg?.relative`).

**src/io/packages.ts**
- CDQ-007 (Attribute Data Quality): setAttribute value "pkg.type" at line 36 accesses a property of "pkg" without a null/undefined guard. If "pkg" can be null or undefined, this will throw at runtime. Add an `if (pkg)` check or use optional chaining (`pkg?.type`).
- CDQ-007 (Attribute Data Quality): setAttribute value "packages.length" at line 207 accesses a property of "packages" without a null/undefined guard. If "packages" can be null or undefined, this will throw at runtime. Add an `if (packages)` check or use optional chaining (`packages?.length`).

**src/io/pnpmWorkspaces.ts**
- CDQ-006 (isRecording Guard): setAttribute value "Object.keys(versions).length" at line 89 has an expensive computation without span.isRecording() guard. Wrap expensive attribute computations in an if (span.isRecording()) check to avoid unnecessary computation when the span is not being sampled.
- CDQ-007 (Attribute Data Quality): setAttribute value "catalogs.length" at line 64 accesses a property of "catalogs" without a null/undefined guard. If "catalogs" can be null or undefined, this will throw at runtime. Add an `if (catalogs)` check or use optional chaining (`catalogs?.length`).
- CDQ-007 (Attribute Data Quality): setAttribute value "pkg.relative" at line 82 accesses a property of "pkg" without a null/undefined guard. If "pkg" can be null or undefined, this will throw at runtime. Add an `if (pkg)` check or use optional chaining (`pkg?.relative`).
- CDQ-007 (Attribute Data Quality): setAttribute value "pkg.type" at line 83 accesses a property of "pkg" without a null/undefined guard. If "pkg" can be null or undefined, this will throw at runtime. Add an `if (pkg)` check or use optional chaining (`pkg?.type`).
- SCH-004 (No Redundant Schema Entries): Attribute key "taze.pnpm_workspace.catalogs_count" at line 64 may be redundant with registry entry "taze.bun_workspace.catalogs_count" (67% token overlap). Consider using the existing registry attribute instead of creating a new one.

**src/io/yarnWorkspaces.ts**
- CDQ-006 (isRecording Guard): setAttribute value "Object.keys(versions).length" at line 83 has an expensive computation without span.isRecording() guard. Wrap expensive attribute computations in an if (span.isRecording()) check to avoid unnecessary computation when the span is not being sampled.
- CDQ-007 (Attribute Data Quality): setAttribute value "catalogs.length" at line 58 accesses a property of "catalogs" without a null/undefined guard. If "catalogs" can be null or undefined, this will throw at runtime. Add an `if (catalogs)` check or use optional chaining (`catalogs?.length`).
- CDQ-007 (Attribute Data Quality): setAttribute value "pkg.filepath" at line 76 accesses a property of "pkg" without a null/undefined guard. If "pkg" can be null or undefined, this will throw at runtime. Add an `if (pkg)` check or use optional chaining (`pkg?.filepath`).
- SCH-004 (No Redundant Schema Entries): Attribute key "taze.yarn_workspace.catalogs_count" at line 58 may be redundant with registry entry "taze.bun_workspace.catalogs_count" (67% token overlap). Consider using the existing registry attribute instead of creating a new one.

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
| **Cost** | $77.22 | $4.98 |
| **Input tokens** | 3,300,000 | 121,800 |
| **Output tokens** | — | 239,472 |
| **Cache read tokens** | — | 257,493 |
| **Cache write tokens** | — | 252,627 |

Model: `claude-sonnet-4-6` | Files: 33 | Total file size: 97,041 bytes

## Live-Check Compliance

OK

## Agent Version

`1.0.0`

## Warnings

- File failed: /Users/whitney.lee/Documents/Repositories/taze/src/io/packageJson.ts — Validation failed: NDS-001 — NDS-001 check failed: tsc --noEmit returned a non-zero exit code. src/io/packageJson.ts(36,3): error TS2322: Type '{ name: any; private: boolean; version: any; type: string; relative: string; filepath: string; raw: Record<string, any>; deps: RawDep[]; resolved: never[]; }[]' is not assignable to type 'PackageMeta[]'.
  Type '{ name: any; private: boolean; version: any; type: string; relative: string; filepath: string; raw: Record<string, any>; deps: RawDep[]; resolved: never[]; }' is not assignable to type 'PackageMeta'.
    Type '{ name: any; private: boolean; version: any; type: string; relative: string; filepath: string; raw: Record<string, any>; deps: RawDep[]; resolved: never[]; }' is not assignable to type 'PackageJsonMeta | PnpmWorkspaceMeta | BunWorkspaceMeta | YarnWorkspaceMeta | PackageYamlMeta'.
      Property 'yamlDocument' is missing in type '{ name: any; private: boolean; version: any; type: string; relative: string; filepath: string; raw: Record<string, any>; deps: RawDep[]; resolved: never[]; }' but required in type 'PackageYamlMeta'. Fix the TypeScript error at line 36 and ensure the file is valid TypeScript.
- File failed: /Users/whitney.lee/Documents/Repositories/taze/src/io/packageYaml.ts — Validation failed: NDS-001 — NDS-001 check failed: tsc --noEmit returned a non-zero exit code. src/io/packageYaml.ts(85,3): error TS2322: Type '{ name: string; private: boolean; version: string; type: string; relative: string; filepath: string; readonly raw: any; deps: RawDep[]; yamlDocument: Document<Node, true>; resolved: never[]; }[]' is not assignable to type 'PackageMeta[]'.
  Type '{ name: string; private: boolean; version: string; type: string; relative: string; filepath: string; readonly raw: any; deps: RawDep[]; yamlDocument: DocumentType<Node, true>; resolved: never[]; }' is not assignable to type 'PackageMeta'.
    Type '{ name: string; private: boolean; version: string; type: string; relative: string; filepath: string; readonly raw: any; deps: RawDep[]; yamlDocument: DocumentType<Node, true>; resolved: never[]; }' is not assignable to type 'PackageYamlMeta'.
      Types of property 'type' are incompatible.
        Type 'string' is not assignable to type '"package.yaml"'. Fix the TypeScript error at line 85 and ensure the file is valid TypeScript.
- File failed: /Users/whitney.lee/Documents/Repositories/taze/src/io/resolves.ts — Validation failed: NDS-003 — NDS-003: non-instrumentation line added at instrumented line 431: if (span.isRecording()) {
The agent must preserve all original business logic. Only add instrumentation — do not modify, remove, or reorder existing code.
- Live-check partial: 3 file(s) failed instrumentation (/Users/whitney.lee/Documents/Repositories/taze/src/io/packageJson.ts, /Users/whitney.lee/Documents/Repositories/taze/src/io/packageYaml.ts, /Users/whitney.lee/Documents/Repositories/taze/src/io/resolves.ts). Compliance report may be incomplete — spans from failed files are missing. This warning is advisory — the run completed; successfully instrumented files are unaffected. To get full coverage, review the failed files above and re-run spiny-orb on them.