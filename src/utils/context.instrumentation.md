# Instrumentation Report: src/utils/context.ts

## Summary
- **Status**: success
- **Spans added**: 0
- **Attempts**: 1 (initial-generation)
- **Input tokens**: 0.3K
- **Output tokens**: 0.2K
- **Cached tokens**: 17.1K

## Validation Journey
1. **Attempt 1**: 0 errors

## Notes
- This file contains only imports and a module-level constant declaration (queueContext = new AsyncLocalStorage<Queue>()) — there are no locally defined functions, classes, or async logic to instrument. The file is a pure module-level re-export of a context object, so no instrumentation is added.
