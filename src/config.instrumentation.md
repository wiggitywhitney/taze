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
- normalizeConfig is synchronous, unexported, and performs only pure in-memory data normalization (array coercion, flag mapping) with no I/O — skipped per RST-001 (no spans on synchronous utilities) and RST-004 (unexported internal helper covered by the exported orchestrator's span).
- resolveConfig is an exported async function that loads config from disk via unconfig — COV-001 entry point. Span name 'taze.config.resolve' is new; declared in schemaExtensions because no existing schema span matches config file resolution (all existing spans are under 'taze.check.*' and describe dependency-check operations, not configuration loading).
- taze.config.sources_found is a registered attribute (int) defined in registry.taze.agent_extensions — used directly to record config.sources.length, the number of config source files found during resolution. No new attribute key needed.
