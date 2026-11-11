// PreToolUse (Edit|Write):
//  - protected paths (golden eval sets, fixtures) need the user's approval to change
//  - tests can't be quietly weakened to make failing code "pass":
//      adding .skip/.only/.todo is refused; removing assertions needs approval
import { readFileSync, existsSync } from "node:fs";
import { relative, isAbsolute } from "node:path";
import { readInput, loadConfig, projectDir, deny, ask, isTest, startsWithAny } from "./lib.mjs";

const input = await readInput();
const { tool_name: tool, tool_input: ti = {} } = input;
const root = projectDir(input);
const cfg = loadConfig(root);
const filePath = ti.file_path ?? "";
const rel = isAbsolute(filePath) ? relative(root, filePath) : filePath;

if (startsWithAny(rel, cfg.protectedPaths)) {
  ask(
    `${rel} is a protected path (golden data or fixtures). Changing it can make broken code look correct. ` +
      `Approve only if the expected data itself is wrong.`,
  );
}

if (!isTest(rel, cfg)) process.exit(0);

let before = "";
let after = "";
if (tool === "Write") {
  before = existsSync(filePath) ? readFileSync(filePath, "utf8") : "";
  after = ti.content ?? "";
} else if (tool === "Edit") {
  before = ti.old_string ?? "";
  after = ti.new_string ?? "";
  if (ti.replace_all && existsSync(filePath)) {
    const whole = readFileSync(filePath, "utf8");
    before = whole;
    after = whole.split(ti.old_string ?? "").join(ti.new_string ?? "");
  }
} else {
  process.exit(0);
}

const count = (s, re) => (s.match(re) ?? []).length;
const skipRe = /\b(it|test|describe)\.(skip|only|todo)\b|\bx(it|describe)\(/g;
const assertRe = /\bexpect\s*\(|\bassert[.(]/g;

if (count(after, skipRe) > count(before, skipRe)) {
  deny(
    `Refusing to add .skip/.only/.todo to ${rel}. If a test fails, either the code or the expectation is wrong: ` +
      `find out which (debug skill) and fix that, or ask the user to approve dropping the test.`,
  );
}

const lost = count(before, assertRe) - count(after, assertRe);
if (lost > 0) {
  ask(
    `This edit removes ${lost} assertion(s) from ${rel}. Weakening tests to get a green run hides bugs. ` +
      `Approve only if the old expectation was wrong or the behaviour was intentionally removed.`,
  );
}

process.exit(0);
