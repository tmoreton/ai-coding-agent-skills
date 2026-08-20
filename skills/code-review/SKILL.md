---
name: code-review
description: Review code changes for bugs, regressions, security issues, missing tests, edge cases, and maintainability risks. Use when the user asks for a review, second pass, audit, PR review, or wants confidence before merging.
---

# Code Review

## Stance

Prioritize findings over praise. Look for concrete bugs, behavioral regressions, security issues, data loss, broken workflows, race conditions, and missing verification. Keep style comments secondary unless they affect correctness or maintainability.

## Workflow

1. Understand the change:
   - Inspect `git status --short`.
   - Read `git diff --stat` and the relevant diffs.
   - Open surrounding code before judging intent.
2. Trace user-visible behavior and cross-module contracts touched by the diff.
3. Check failure paths:
   - Empty data, nulls, permissions, auth expiry, network failure, retries, cancellation, and concurrency.
   - Mobile layout constraints, long text, loading states, and disabled states when reviewing UI.
4. Check verification:
   - Identify tests or smoke checks that should exist for the risk level.
   - Run focused checks when practical.
5. Report findings first, ordered by severity, with file and line references when available.

## Output Shape

- Findings first.
- Open questions or assumptions second.
- Short verification note last.
- If there are no issues, say that clearly and mention remaining residual risk.
