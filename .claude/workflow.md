# Engineering workflow (AI-assisted, not vibe-coded)

These rules apply to every change in this repo. Hooks in `.claude/settings.json` enforce some of them mechanically; the rest are on you.

## The loop
1. **Spec** (`/spec <feature>`): non-trivial work starts with a plan in `docs/plans/` with testable acceptance criteria and small task slices. No source edits until the user approves it (`status: active`).
2. **Build one slice** (`/tdd`): failing test first, confirm it fails for the right reason, minimal implementation, related tests and type check green, small commit, tick the task. One slice per invocation; then report and wait.
3. **Debug by hypothesis** (`/debug <symptom>`): reproduce, locate, confirm one root cause with evidence, regression test, fix the cause. No trial-and-error patching.
4. **Independent review** (`/review`): fresh-context `code-reviewer` and `test-auditor` (plus `eval-gate` for AI-behaviour changes), then a comprehension check for the user.
5. **Ship** (`/ship`): full checks, every criterion mapped to a test, docs updated, PR description with evidence.

Small, obvious changes (a typo, a copy tweak, a one-line config) can skip the plan, but not the test or commit rules.

## Always
- Read the code you're changing before changing it, and name real files and functions. Don't invent APIs, options or paths; check the installed version's types or docs.
- Prefer the smallest change that meets the criterion. Don't add features, abstractions or dependencies the plan didn't ask for.
- Report with evidence: the command you ran and its output. "Should work" is not a status.
- When unsure which of two behaviours is intended, ask rather than pick.
- Keep the plan current: tick tasks, and log any design change in its Decisions log.

## Never
- Weaken, skip or delete a test to get a green run, or edit golden data or fixtures to match new output.
- Swallow errors (`catch {}`), add `any` / unchecked casts, or add retries to hide a deterministic bug.
- Make a commit that mixes unrelated changes, exceeds the size limit, or has a message that doesn't say what changed.
- Change prompts, retrieval, or model settings without running the evals.

## Escape hatches (use sparingly; they're visible in history)
- `[large: <reason>]` in a commit message allows an oversized commit.
- `[no-test: <reason>]` allows a source change without a test change.
