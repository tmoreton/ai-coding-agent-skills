---
name: cleanup-ai-generated-code
description: Clean up rough AI-generated code after a feature or prototype pass. Use when code works but likely has dead branches, vague names, unnecessary abstractions, duplicated logic, inconsistent styling, weak errors, or generated cruft that should be made maintainable without changing behavior.
---

# Cleanup AI-Generated Code

## Workflow

1. Establish the intended behavior from the user request, tests, screenshots, and surrounding code.
2. Read the changed files and nearby patterns before editing.
3. Remove generated cruft:
   - Dead code, unused variables, unused imports, placeholder comments, debug logs, and abandoned alternate implementations.
   - Repeated helpers that should be a small local function.
   - Over-broad abstractions that are only used once and make the code harder to follow.
4. Improve clarity:
   - Rename vague values such as `data`, `result`, `thing`, `handleClick2`, or `newValue` when the domain has a clearer name.
   - Prefer straightforward control flow over clever branching.
   - Keep comments only where they explain a non-obvious reason or constraint.
5. Preserve behavior unless the user explicitly asked for behavior changes.
6. Run the narrowest useful verification after cleanup.

## Guardrails

- Do not reformat unrelated files.
- Do not introduce new frameworks, state libraries, or architecture unless they remove real complexity.
- Do not delete tests just because they fail; fix the implementation or explain the failing test.
- Keep public APIs stable unless the user requested a breaking change.
- If behavior is ambiguous, leave a short note in the final response instead of guessing broadly.
