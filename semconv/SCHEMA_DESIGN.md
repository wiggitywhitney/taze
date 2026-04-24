# Schema Design Notes: taze Weaver Schema

This file documents the complete schema that a human would write for taze, and
which attributes were deliberately omitted from `attributes.yaml` for the
spiny-orb evaluation. The eval tests whether spiny-orb can identify missing
attributes and propose schema extensions (SCH extension capability, SCH-001
through SCH-004).

## Deliberately Omitted Attributes

The following attributes are present in this design doc but absent from
`attributes.yaml`. A human with domain knowledge would include them. spiny-orb
should propose their addition.

### 1. `taze.check.concurrency` (int)

**Where in code**: `src/io/resolves.ts` `resolveDependencies()` reads
`const { concurrency = 10 } = options` and creates a queue limited to that
count. `src/api/check.ts` `CheckPackages()` also passes
`options.concurrency || 10` to a new queue.

**Why a human would include it**: Concurrency directly controls how many
parallel npm registry fetches run at once. Instrumenting it lets engineers
diagnose rate-limit errors (lower concurrency) vs slow runs (raise concurrency).
It belongs on the root check span so any trace reader can see what
parallelism setting was used.

**Enum/type**: `int`, default 10, range 1–N.

### 2. `taze.package.diff_type` (enum: patch | minor | major | error)

**Where in code**: `src/io/resolves.ts` `getDiff()` returns
`'patch' | 'minor' | 'major' | 'error' | null`. This return value is stored
as `dep.diff` and drives all subsequent update filtering and rendering.

**Why a human would include it**: The diff type is the single most important
per-package outcome — it answers "what kind of update is available?" Every
render function uses it to color-code output (`patch` = green, `major` = red).
A span without `diff_type` is almost useless for aggregation (e.g., "how many
major updates were proposed?").

**Enum members**: `patch`, `minor`, `major`, `error` (plus implicit null for
no update, which maps to `taze.package.update_available = false`).

### 3. `taze.fetch.cache_hit` (boolean)

**Where in code**: `src/io/resolves.ts` `getPackageData()` checks
`cache[cacheName]` and calls `debug.cache('cache hit for ...')` or
`debug.cache('no cache found')`. The in-memory cache has a 30-minute TTL and
is also persisted to disk at `os.tmpdir()/taze/cache.json`.

**Why a human would include it**: Cache hit rate is fundamental telemetry for
any caching system. Without it, you cannot distinguish "slow because 50
packages had no cached data" from "slow despite a warm cache". taze itself
already logs this via `debug.cache` — an instrumenter would promote it to a
span attribute.

**Type**: `boolean`.

---

## Complete Schema (what attributes.yaml would contain if not deliberately incomplete)

The complete schema adds the three omitted attributes to their respective
groups. Everything below is absent from `attributes.yaml` by design.

### Addition to `registry.taze.check`

```yaml
- id: taze.check.concurrency
  type: int
  stability: development
  brief: Maximum number of parallel npm registry fetches (default 10)
  examples:
    - 10
    - 5
```

### Addition to `registry.taze.package`

```yaml
- id: taze.package.diff_type
  type:
    members:
      - id: patch
        value: patch
        brief: Target is a patch-level bump from current
        stability: development
      - id: minor
        value: minor
        brief: Target is a minor-level bump from current
        stability: development
      - id: major
        value: major
        brief: Target is a major-level bump from current
        stability: development
      - id: error
        value: error
        brief: Version comparison failed due to parse error
        stability: development
  stability: development
  brief: The semver distance between current and target versions
```

### Addition to `registry.taze.fetch`

```yaml
- id: taze.fetch.cache_hit
  type: boolean
  stability: development
  brief: Whether the package metadata was served from the in-memory/disk cache
```
