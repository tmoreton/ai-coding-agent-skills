---
name: resolving-merge-conflicts
description: Resolve Git merge conflicts carefully. Use when a branch cannot fast-forward or merge, Git reports conflicts, a pull request is blocked by conflicts, or the user asks to bring a feature branch up to date with main.
---

# Resolving Merge Conflicts

## Workflow

1. Inspect the repository state:
   - Run `git status --short --branch`.
   - Identify the base branch, work branch, and conflicted files.
2. Read both sides before editing:
   - Use `git diff --ours`, `git diff --theirs`, and the conflicted file.
   - Understand whether both sides need to be preserved, one side supersedes the other, or a third integration is needed.
3. Resolve conflicts by preserving intent:
   - Keep user work unless it is clearly obsolete.
   - Keep upstream fixes unless the feature intentionally replaces them.
   - Remove conflict markers completely.
4. Run targeted verification for the resolved area.
5. Check final state:
   - `git status --short`
   - `git diff --check`
   - focused tests, build, or typecheck as appropriate.

## Guardrails

- Do not choose `--ours` or `--theirs` wholesale unless the user explicitly asks or the file is generated.
- Do not delete unrelated local changes.
- If the conflict reflects a real product decision, explain the options instead of guessing.
- If package lockfiles conflict, prefer regenerating them with the repo's package manager after resolving manifest intent.
