# Instrumentation Report: src/config.ts

## Summary
- **Status**: success
- **Spans added**: 1
- **Attempts**: 2 (multi-turn-fix)
- **Input tokens**: 7.2K
- **Output tokens**: 7.0K
- **Cached tokens**: 30.4K

## Schema Extensions
- `span.taze.check.run`

## Validation Journey
1. **Attempt 1**: 7 blocking errors (NDS-003 (Code Preserved):3, SCH-001 (Span Names Match Registry):2, SCH-002 (Attribute Keys Match Registry):2)
2. **Attempt 2**: 0 errors

## Notes
- normalizeConfig is an unexported synchronous pure-data transformation — skipped per RST-001 (no spans on synchronous utilities) and RST-004 (unexported helpers not instrumented directly).
- The span name 'taze.check.run' is used because the registry defines it as the authoritative name for this operation and the validator confirmed 'taze.config.resolve' is a semantic duplicate of that registry entry. While another file in this run declared 'taze.check.run' first, the registry is the source of truth for naming.
- No span attributes are set because all registered attributes for this operation (taze.check.mode, taze.check.recursive, taze.check.write_mode) require accessing CommonOptions fields not used directly in resolveConfig's body, and accessing them via intersection type assertions was rejected as non-instrumentation code (NDS-003). COV-005 passed without attributes in prior validation.
