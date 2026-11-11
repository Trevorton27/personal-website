// PostToolUse (Edit|Write): lint the file Claude just changed and feed errors
// straight back, so problems are fixed at the edit, not at the build.
import { relative, isAbsolute } from "node:path";
import { readInput, loadConfig, projectDir, runTemplate, addContext } from "./lib.mjs";

const input = await readInput();
const root = projectDir(input);
const cfg = loadConfig(root);
const filePath = input.tool_input?.file_path ?? "";
const rel = isAbsolute(filePath) ? relative(root, filePath) : filePath;

if (!cfg.codeRe.test(rel) || rel.includes("node_modules") || rel.startsWith(".claude/") || rel.startsWith("..")) process.exit(0);

const res = runTemplate(cfg.commands.lintFile, { file: rel }, { cwd: root, timeout: 60_000 });
if (!res.ok) {
  // unix format puts the path on each line; stylish/next formats print "line:col  Error ..." under a header.
  const lines = res.output.split("\n").filter((l) => l.includes(rel) || /^\s*\d+:\d+\s+(error|warning)/i.test(l)).slice(0, 20);
  if (lines.length) addContext("PostToolUse", `Lint reports problems in ${rel} after this edit:\n${lines.join("\n")}`);
  // Non-zero exit with no findings for this file means the linter itself didn't run.
  // Say so instead of letting a broken lint setup pass silently.
  const reason = res.output.trim().split("\n").filter(Boolean).slice(0, 4).join("\n");
  addContext(
    "PostToolUse",
    `The lint command for edited files (commands.lintFile in .claude/guardrails.json) failed to run, so this edit was not linted:\n${reason}\nTell the user once so they can fix the lint setup or the command.`,
  );
}
process.exit(0);
