---
name: debug
description: Root-cause a bug, failing test, build error or wrong agent output with a hypothesis-driven protocol instead of trial-and-error patches. Use whenever the user pastes an error or reports something broken.
argument-hint: "[symptom, error message or failing test]"
---

# Root cause, then fix

Symptom: $ARGUMENTS

Do these in order and show your work for each step. Do not change source code until step 4.

1. **Reproduce.** Find the smallest command that shows the failure (a single test file, a curl to a route, a script). Run it and show the exact output. If you can't reproduce it, say so and ask for the missing detail; don't guess.
2. **Locate.** Read the stack trace or the code path end to end. Name the file and line where actual behaviour diverges from expected.
3. **Hypothesise.** State 1–3 candidate root causes, each with the evidence for it and a quick check that would confirm or rule it out. Run the checks (logging, a focused test, reading git history with `git log -p -- <file>`). Keep going until exactly one cause is confirmed. "It might be X, let me try changing it" is not a check.
4. **Pin it.** Write a regression test that fails because of the confirmed cause. Run it and show it failing.
5. **Fix the cause**, not the symptom. No catch-and-ignore, no `as any`, no retry loops around a deterministic bug, no editing fixtures or golden data to make output match.
6. **Prove it.** Run the regression test and `commands.relatedTests` from `.claude/guardrails.json` on the changed files.
7. **Report.** Root cause in one or two sentences, why it happened, the fix, and whether the same mistake could exist elsewhere (grep for it).

If the third hypothesis is also ruled out, stop and report what you've learned rather than continuing to try fixes.
