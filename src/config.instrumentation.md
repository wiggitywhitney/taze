# Instrumentation Report: src/config.ts

## Summary
- **Status**: success
- **Spans added**: 1
- **Attempts**: 1 (initial-generation)
- **Input tokens**: 0.6K
- **Output tokens**: 2.6K

## Schema Extensions
- `span.taze.config.resolve`
- `taze.config.sources_found`

## Validation Journey
1. **Attempt 1**: 0 errors

## Notes
- normalizeConfig is a pure synchronous helper that performs only in-memory transformations on the options object — it has no I/O, no async operations, and no network access, so it does not receive a span (RST-001: no spans on synchronous utilities).
- resolveConfig is an exported async function that reads config files from disk via loader.load() — it is a service entry point and receives the span 'taze.config.resolve'.
- The span name 'taze.config.resolve' is new because no schema span covers config resolution; all existing schema spans cover check, cli, and interactive operations. Reported as schemaExtension 'span.taze.config.resolve'.
- The attribute 'taze.config.sources_found' is new because none of the registered keys ('taze.check.*', 'taze.fetch.*', 'taze.package.*', 'taze.write.*') semantically match the concept of how many config source files were discovered during config loading. This integer attribute captures whether a config file was found at all (0 = defaults used, >0 = file-based config applied), which is directly useful for debugging unexpected configuration behavior.
