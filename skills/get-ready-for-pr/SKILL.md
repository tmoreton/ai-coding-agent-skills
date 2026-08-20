---
name: get-ready-for-pr
description: Prepare a branch for pull request review. Use when the user asks to get changes ready for PR, review before merge, summarize work, reduce reviewer friction, check tests, update small docs, or ensure the branch is coherent before opening or merging a pull request.
---

# Get Ready for PR

## Workflow

1. Inspect the branch state:
   - Run `git status --short`.
   - Review changed files with `git diff --stat` and targeted diffs.
   - Identify generated files, secrets, logs, caches, or unrelated edits.
2. Read the changed code in context. Check that the implementation matches the request and local patterns.
3. Run focused verification:
   - Prefer repo scripts for lint, typecheck, tests, and builds.
   - If a full suite is too expensive, run the smallest meaningful subset and say what was not run.
4. Tighten the branch:
   - Remove debug output and placeholder text.
   - Ensure names, errors, empty states, and loading states are reviewer-friendly.
   - Update nearby docs or comments only when the code contract changed.
5. Prepare the PR summary:
   - What changed.
   - How it was verified.
   - Risks, known gaps, and follow-up work.

## Review Checklist

- The diff is scoped to the task.
- User-facing behavior is covered by a test, build, screenshot check, or direct smoke test.
- Error and empty states are deliberate.
- No secrets or local-only paths are committed.
- The PR description explains the change without making reviewers reverse-engineer the diff.
