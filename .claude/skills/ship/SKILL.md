---
name: ship
description: Pre-merge gate. Runs the full checks, confirms the plan and docs match reality, and drafts a PR description backed by evidence.
disable-model-invocation: true
argument-hint: "[base branch, defaults to main]"
---

# Ship check

Base: $ARGUMENTS (default `main`). Report each step as pass/fail with the command output that proves it. Don't mark anything as passing that you didn't run.

1. **Clean tree.** `git status --porcelain` must be empty. If it isn't, list what's uncommitted and stop.
2. **Static checks.** `commands.lint` and `commands.typecheck` from `.claude/guardrails.json`.
3. **Full tests.** `commands.allTests`.
4. **Evals.** If a changed file is under `evalPaths`, run the `eval-gate` subagent and include its comparison to the baseline. A regression is a failure unless the user explicitly accepts it.
5. **Spec matches reality.** For each acceptance criterion in the active plan, name the test that proves it. Any criterion without a test is a failure. Every task must be ticked or explicitly moved to out of scope.
6. **Docs drift.** Check that `README.md`, `CLAUDE.md` and any status or progress docs reflect the change (new routes, env vars, models, commands, status tables). List each needed update and make it in a separate docs commit.
7. **History.** `git log --oneline <base>..HEAD`: flag commits that are oversized or have uninformative messages, and suggest how to reword or squash them. Don't rewrite history without the user's go-ahead.
8. **PR description.** Draft it: summary, acceptance criteria → tests table, eval results, risks, and manual test steps. Set the plan's `status: done`.

Don't push or open the PR until the user says to.
