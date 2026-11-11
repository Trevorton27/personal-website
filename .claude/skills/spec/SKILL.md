---
name: spec
description: Write a reviewable spec and sliced implementation plan before any code. Use for any new feature, integration, agent node, schema change or multi-file refactor, and whenever the user asks to "build", "add" or "implement" something non-trivial.
argument-hint: "[feature or problem description]"
---

# Spec before code

You are writing the contract the implementation will be checked against. **Do not edit source files in this skill.** The only file you write is the plan.

Feature: $ARGUMENTS

## 1. Understand before proposing
- Read the parts of CLAUDE.md that apply (architecture boundaries, Do NOT list, pitfalls).
- Find the code this touches with Grep/Glob and read it. Name the real files, types and functions you found; do not invent paths.
- If something essential is ambiguous (who uses it, what "done" looks like, a constraint), ask the user up to 3 short questions and stop until they answer.

## 2. Write the plan
Copy `docs/plans/_template.md` to `docs/plans/<yyyy-mm-dd>-<slug>.md` and fill every section:

- **Problem and outcome.** One paragraph. What changes for the user.
- **Acceptance criteria.** Numbered, each observable and testable ("Given/When/Then", or an input → expected output). Every criterion must map to at least one test in the test plan. Vague criteria ("works well", "is fast") are not allowed; give a number or a behaviour.
- **Out of scope.** What you will deliberately not do.
- **Design.** Files to add or change, data model changes, interfaces/types (write the actual TypeScript signatures), and which CLAUDE.md boundaries apply.
- **Risks and unknowns**, and how each one will be checked.
- **Test plan.** Unit tests (file + what they assert), route tests, UI tests, and for agent, RAG or prompt changes, the eval impact (which `commands.evals` should move, and in which direction).
- **Tasks.** A checklist of slices. Each slice: one behaviour, its own test, roughly ≤300 changed lines, committable on its own and leaves the build green. Order them so the riskiest assumption is tested first.

Set the frontmatter `status: draft`.

## 3. Hand it back for approval
Show the user the acceptance criteria and task list (not the whole file) and ask them to approve, change or cut scope. When they approve, set `status: active`. Implementation then proceeds one slice at a time with the `tdd` skill.
