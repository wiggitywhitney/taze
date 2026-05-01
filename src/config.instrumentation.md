# Instrumentation Report: src/config.ts

## Summary
- **Status**: success
- **Spans added**: 1
- **Attempts**: 1 (initial-generation)
- **Input tokens**: 0.6K
- **Output tokens**: 2.9K

## Schema Extensions
- `span.taze.config.resolve`
- `taze.config.found`

## Validation Journey
1. **Attempt 1**: 0 errors

## Notes
- normalizeConfig is an unexported, synchronous pure-transformation helper with no I/O — it was skipped on two grounds: it is not exported (RST-004) and it performs only synchronous data normalization with no async operations (RST-001).
- resolveConfig is the sole exported async function and performs file I/O (config file discovery via unconfig's createConfigLoader) — it receives a span as the service entry point for config loading.
- No registered schema attribute captures whether a config file was found on disk, so a new boolean attribute 'taze.config.found' was introduced (schema extension taze.config.found). The registered attributes (taze.check.*, taze.fetch.*, taze.package.*, taze.write.*) all describe check-run, registry-fetch, package-resolution, and file-write operations respectively — none semantically covers 'did a taze config file exist on disk'. This attribute is the most diagnostic signal this function produces.
- The span name 'taze.config.resolve' was invented because no schema group with type 'span' matches a config-loading operation — the five existing span entries cover CLI run, check run, interactive check, global check, and package check. The new span follows the taze.* namespace convention.
- CDQ-007 advisory: options.cwd is a filesystem path and would normally be redacted, but since no path utility (e.g., basename) is already imported in this file, the raw value was not set as an attribute at all — only the boolean 'taze.config.found' is recorded.
