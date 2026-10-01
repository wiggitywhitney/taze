# Instrumentation Report: src/api/check.ts

## Summary
- **Status**: success
- **Spans added**: 2
- **Attempts**: 2 (multi-turn-fix)
- **Input tokens**: 11.7K
- **Output tokens**: 8.4K

## Schema Extensions
- `span.taze.check.packages`
- `span.taze.check.single_project`

## Validation Journey
1. **Attempt 1**: 3 blocking errors (NDS-003 (Code Preserved):3)
2. **Attempt 2**: 0 errors

## Notes
- Removed the outdatedCount computation that computed taze.check.packages_outdated after queueContext.run — adding that const would have introduced new non-instrumentation business logic lines, violating NDS-003. The attribute is omitted from this span as a result.
- CheckPackages is the exported async entry point (COV-001). Span name 'taze.check.packages' is new — no existing schema span matches this orchestration role (taze.check.run and taze.check.global are already taken by other files). The SCH-001 advisory about similarity to taze.check.install_pkg is noted, but install_pkg is a different operation class (installing a package manager's global packages vs. orchestrating the full dependency-check run across all workspace packages).
- CheckSingleProject is an unexported async function performing I/O (resolvePackage, writePackage). Instrumented as COV-004 per pre-instrumentation analysis. The SCH-001 advisory about similarity to taze.check.packages is noted, but single_project operates on one PackageMeta at a time, while check.packages orchestrates all packages in parallel — they are different operation classes.
- CDQ-007 advisories addressed: wrapped options attribute block in if (options != null), packages.length in if (packages != null), and pkg/changes accesses in null guards in CheckSingleProject. These parameters are non-nullable in practice but the guards satisfy the advisory requirement.

## Advisory Findings
- SCH-001 (Span Names Match Registry): SCH-001 (Span Names Match Registry) fired because a span name doesn't match your Weaver registry or doesn't follow the required dotted-notation format (e.g. myapp.user.create). Use the registry name or declare a new span as a schemaExtension.
