# Instrumentation Report: src/commands/check/index.ts

## Summary
- **Status**: success
- **Spans added**: 1
- **Attempts**: 1 (initial-generation)
- **Input tokens**: 2.0K
- **Output tokens**: 9.0K

## Schema Extensions
- `span.taze.check.run`

## Validation Journey
1. **Attempt 1**: 0 errors

## Notes
- Added span `taze.check.run` for the exported `check` function, which is the primary entry point for the taze check command (COV-001). The previously used span names `taze.check.global`, `taze.check.install_pkg`, `taze.check.load_global_npm`, and `taze.check.load_global_pnpm` were already in use by earlier files in this run, so a distinct name was chosen.
- `taze.check.mode` is guarded with `!= null` before setting because `options.mode` may be undefined when the flag is not passed by the caller.
- `taze.check.packages_total` and `taze.check.packages_outdated` are set inside an `isRecording()` guard (CDQ-006) because both involve reduce/filter operations over potentially large arrays that would be wasteful on non-recording spans.
- `taze.check.write_mode` is set at both exit points of the function — the early return when there are no changes, and the normal return at the end — so it reflects the final resolved write intent on all code paths.
- All five attributes used (`taze.check.mode`, `taze.check.recursive`, `taze.check.write_mode`, `taze.check.packages_total`, `taze.check.packages_outdated`) are already registered in the schema. No new attribute extensions were needed.
- span.taze.check.run: New span for the top-level `check` command entry point. The existing schema spans (global, install_pkg, load_global_npm, load_global_pnpm) were all in use by other files and represent sub-operations, not this orchestrating entry point.

## Advisory Findings
- CDQ-007 (Attribute Data Quality):25: CDQ-007 (Attribute Data Quality) fired for one or more of: a PII attribute name (like author, email, or username) or a raw filesystem path where a basename would be safer. PII in traces can violate privacy policies and is worth fixing. The path finding is lower severity — fix it when the code will run in a context where the basename utility is already imported.
