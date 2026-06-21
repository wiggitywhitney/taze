# Instrumentation Report: src/config.ts

## Summary
- **Status**: success
- **Spans added**: 1
- **Attempts**: 1 (initial-generation)
- **Input tokens**: 0.7K
- **Output tokens**: 2.1K

## Schema Extensions
- `span.taze.config.resolve`

## Validation Journey
1. **Attempt 1**: 0 errors

## Notes
- normalizeConfig is a synchronous, unexported pure transformation with no I/O — skipped on both RST-001 (no spans on synchronous utilities) and RST-004 (unexported helpers covered by their orchestrator's span) grounds.
- resolveConfig is the exported async entry point for config resolution — it receives the span taze.config.resolve. The registered attribute taze.config.sources_found maps precisely to config.sources.length and is set after loader.load() resolves, capturing how many config source files were found on all execution paths.
- span.taze.config.resolve is a new span name not present in the schema registry. No existing schema span was a semantic match — the schema defines check, package install, and global-package-load spans; none covers config file resolution.

## Agent Thinking

### Attempt 1

```
Let me analyze this file and instrument it according to the schema and rules.

Key observations:
1. `resolveConfig` is an exported async function - needs a span (COV-001)
2. `normalizeConfig` is synchronous, unexported, pure transformation - skip (RST-001, RST-004)

For `resolveConfig`:
- Schema span: Looking at the schema, there's no exact match for "resolveConfig". The closest would be something related to config loading. I need to invent a name with the `taze.` prefix. Something like `taze.config.resolve`.
- Attributes: `taze.config.sources_found` is a registered attribute that matches `config.sources.length`. I should use it.
- I'll set `taze.config.sources_found` after loading the config sources, using the length of the sources array.

The span name `taze.config.resolve` fits the pattern of existing spans like `taze.check.run` and `taze.check.global`. I'm now writing the instrumented code with the OpenTelemetry imports and wrapping the function with a span that captures the number of config sources found.

Writing instrumented code... Setting up the config loader to search for taze.config and .tazerc files, then merging the loaded configuration with defaults and user options, while tracking the number of config sources found through tracing.

Now I'm wrapping up the error handling and span lifecycle, then checking what schema extensions need to be declared for the new span name `taze.config.resolve` since the attribute `taze.config.sources_found` is already registered.
```
