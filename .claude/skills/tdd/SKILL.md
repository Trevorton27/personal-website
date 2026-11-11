---
name: tdd
description: Implement exactly one task slice from the active plan, test-first, and commit it. Use whenever writing or changing source code for a planned feature or fix.
argument-hint: "[task number or description, defaults to the next open task]"
---

# One slice, test-first

Task: $ARGUMENTS (if empty, take the first unchecked task in the active plan in `docs/plans/`).

If there is no active plan and the change is more than a few lines, stop and use the `spec` skill first.

## Loop
1. **State the slice.** Quote the task and the acceptance criteria it covers. Say in one sentence what the diff should roughly contain (files, functions). If it looks bigger than ~300 lines, split it in the plan first.
2. **Red.** Write or extend a test (in the project's `testPaths`, see `.claude/guardrails.json`) that asserts the behaviour from the criterion: real inputs, specific expected outputs. Run only that file with the `commands.testFile` command from `.claude/guardrails.json`.
   Confirm it fails **for the right reason** (the assertion about missing behaviour), not an import error or typo. Show the failing line.
3. **Green.** Write the smallest implementation that passes, following CLAUDE.md boundaries. Re-run the test file until it passes.
4. **Wider check.** Run `commands.relatedTests` on the changed files and `commands.typecheck`. Fix anything you caused.
5. **Refactor** only with tests green, then re-run them.
6. **Show the diff.** Run `git diff --stat` and summarise what changed and why in 3–5 bullets, flagging anything surprising or any decision the user should know about.
7. **Commit the slice.** Stage only this slice's files and commit with an imperative subject that names the behaviour (e.g. "Return 409 when approving an already-decided request"). The commit hook rejects junk messages, oversized commits and source changes without tests.
8. **Update the plan.** Tick the task. If you changed the design, add a line to the Decisions log.

## Rules
- Never weaken, skip or delete an existing test to make it pass. If an existing test disagrees with the plan, stop and ask which is right.
- Mocks are for boundaries (LLM APIs, databases, queues, third-party services), never for the unit under test.
- One slice per invocation. After committing, report and wait; don't start the next task unless the user asks.
