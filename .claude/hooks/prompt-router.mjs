// UserPromptSubmit: catch the two classic vibe-coding prompts and route them
// to the matching protocol instead of letting them become a guess-and-patch loop.
//   1. A pasted error/stack trace with no hypothesis  -> debug protocol
//   2. A large open-ended build request with no plan  -> spec first
import { readInput } from "./lib.mjs";

const { prompt = "" } = await readInput();
if (prompt.trim().startsWith("/")) process.exit(0); // explicit skill/command: user already chose a workflow

const notes = [];
const looksLikeError =
  /(Error|Exception|TypeError|ReferenceError|ECONNREFUSED|Unhandled|Traceback)\b[\s\S]{0,400}(\n\s+at |\.tsx?:\d+|line \d+)/.test(prompt) ||
  /\b(failed to compile|build failed|exit code [1-9])/i.test(prompt);
if (looksLikeError) {
  notes.push(
    "The user's message contains an error. Follow the debug skill: reproduce it, state a hypothesis about the root cause " +
      "with evidence, confirm it, add a regression test, then fix the cause. Do not patch symptoms or try fixes blindly.",
  );
}

const bigBuild =
  /\b(build|implement|add|create|make)\b[\s\S]{0,80}\b(feature|system|page|dashboard|integration|flow|module|app)\b/i.test(prompt) &&
  !/\b(plan|spec|docs\/plans)\b/i.test(prompt) &&
  prompt.length < 600;
if (bigBuild) {
  notes.push(
    "This reads like a new feature request without a spec. Unless it is trivially small, use the spec skill first: " +
      "propose acceptance criteria and a sliced plan and get the user's approval before writing code.",
  );
}

if (notes.length) process.stdout.write(notes.join("\n") + "\n");
process.exit(0);
