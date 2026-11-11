---
name: review
description: Independent review of the current change set by fresh-context subagents, followed by a comprehension check for the user. Use before merging a branch or after finishing a plan's tasks.
argument-hint: "[base branch, defaults to main]"
---

# Independent review

Base: $ARGUMENTS (default `main`). The change set is `git diff <base>...HEAD` plus any uncommitted changes.

1. **Gather context.** Find the active plan in `docs/plans/`. Run `git diff --stat <base>...HEAD` and `git log --oneline <base>..HEAD`.
2. **Launch reviewers in parallel**, each with the plan path, the base branch and the list of changed files. They start with fresh context on purpose; don't summarise your own reasoning to them.
   - `code-reviewer`: correctness against acceptance criteria, CLAUDE.md boundaries, security, error handling.
   - `test-auditor`: whether the tests actually prove the acceptance criteria.
   - `eval-gate`: only if a changed file is under one of the `evalPaths` in `.claude/guardrails.json` (prompts, agents, retrieval, model calls).
3. **Consolidate.** Merge findings into one list ordered by severity (blocking / should-fix / nit), each with file:line and a suggested fix. Drop duplicates. Mark any finding you disagree with and say why; don't silently discard it.
4. **Comprehension check.** Write 3 questions the user should be able to answer about this change without looking at the code: one about a design decision, one about a failure mode, one about how a specific piece works. Don't answer them. If the user can't, that part needs a walkthrough before it ships.
5. Don't fix anything in this skill. Ask the user which findings to address; then fix them with the `tdd` or `debug` skill.
