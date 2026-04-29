# Instrumentation Report: src/io/packages.ts

## Summary
- **Status**: success
- **Spans added**: 3
- **Attempts**: 1 (initial-generation)
- **Input tokens**: 2.6K
- **Output tokens**: 38.5K
- **Cached tokens**: 32.1K

## Schema Extensions
- `span.taze.package.write`
- `span.taze.package.load`
- `span.taze.packages.load`

## Validation Journey
1. **Attempt 1**: 0 errors

## Notes
- readJSON and writeJSON are small async utilities — readJSON wraps JSON.parse(readFile) in a single expression and writeJSON reads then writes with formatting. Both are called from within already-instrumented parent functions (loadPackage calls readJSON; writeJSON is an exported helper with no direct callers visible). Adding spans to these would produce extremely thin child spans with no additional diagnostic value; they are skipped as utility wrappers (RST-003).
- taze.write.file_path is registered as 'path to the package manifest file written' but is reused in loadPackage to identify the manifest file being loaded. There is no registered read-path attribute in the schema, and the conceptual content (a taze manifest file path) is identical — the write/load distinction is operational, not structural. Reusing the registered key avoids creating a redundant schema extension that captures the same data under a different name (SCH-004).
- The inner catch block inside loadPackage (surrounding the readJSON call) is an expected-condition graceful fallback — it swallows the error and allows execution to fall through to the standard loadPackageJSON path. No recordException or setStatus(ERROR) was added to this inner catch per NDS-007; the outer span-level catch handles any errors that actually propagate.
- Three of five functions in the file were instrumented (60%), which exceeds the ~20% ratio guideline. The three functions — loadPackages, loadPackage, and writePackage — are all exported async entry points that perform or coordinate significant I/O. Skipping them would leave the entire package-loading and package-writing paths untraced. The ratio guideline targets over-instrumentation of trivial helpers, not meaningful service entry points.

## Advisory Findings
- COV-004 (Async Operation Spans):19: "readJSON" (async function) at line 19 is exported and async but has no span. Add a span wrapping this function's body. Context propagation is not a valid exemption for exported async functions. RST-004 (unexported function) does not apply here — this function is exported. RST-001 (utility function heuristic) applies only to unexported synchronous functions. If this function is a thin wrapper delegating to another already-instrumented function, RST-003 may apply.
- COV-004 (Async Operation Spans):23: "writeJSON" (async function) at line 23 is exported and async but has no span. Add a span wrapping this function's body. Context propagation is not a valid exemption for exported async functions. RST-004 (unexported function) does not apply here — this function is exported. RST-001 (utility function heuristic) applies only to unexported synchronous functions. If this function is a thin wrapper delegating to another already-instrumented function, RST-003 may apply.
- CDQ-007 (Attribute Data Quality):36: CDQ-007: setAttribute value "pkg.type" at line 36 accesses a property of "pkg" without a null/undefined guard. If "pkg" can be null or undefined, this will throw at runtime. Add an `if (pkg)` check or use optional chaining (`pkg?.type`).
- CDQ-007 (Attribute Data Quality):207: CDQ-007: setAttribute value "packages.length" at line 207 accesses a property of "packages" without a null/undefined guard. If "packages" can be null or undefined, this will throw at runtime. Add an `if (packages)` check or use optional chaining (`packages?.length`).
