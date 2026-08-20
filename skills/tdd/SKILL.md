---
name: tdd
description: Use a test-driven implementation loop for code changes. Use when the user asks for TDD, wants safer changes, is fixing a bug with a reproducible case, or is adding behavior that can be captured with focused tests before implementation.
---

# TDD

## Workflow

1. Define the smallest observable behavior that should change.
2. Find the repo's existing test style and commands before adding anything new.
3. Add or update a focused failing test:
   - Prefer the lowest-level test that proves the behavior.
   - Use integration coverage when the bug crosses boundaries.
   - Avoid brittle assertions that only mirror implementation details.
4. Run the test and confirm it fails for the expected reason.
5. Implement the smallest change that passes the test.
6. Run the focused test again, then run broader checks if the touched code is shared or risky.
7. Refactor only after the test is green.

## Guardrails

- Do not invent a new test framework if the repo already has one.
- Do not skip the failing-test step unless the environment cannot run tests; explain that gap.
- Keep test names behavioral and specific.
- When fixing a bug, make sure the test fails on the old behavior and passes on the fix.
