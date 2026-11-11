// Stop: before Claude says "done", prove it. Runs tests related to the changed
// files and a type check filtered to those files. If anything fails, or source
// changed with no test change, Claude is sent back to fix it or explain why.
import { readInput, loadConfig, projectDir, runTemplate, changedFiles, isSource, isTest } from "./lib.mjs";

const input = await readInput();
if (input.stop_hook_active) process.exit(0); // already continuing because of a Stop hook: don't loop
const root = projectDir(input);
const cfg = loadConfig(root);

const changed = changedFiles(root).filter((f) => cfg.codeRe.test(f) && !f.startsWith(".claude/"));
if (!changed.length) process.exit(0);

const problems = [];

if (cfg.stopHook.runTests) {
  const res = runTemplate(cfg.commands.relatedTests, { files: changed }, { cwd: root, timeout: 300_000 });
  if (!res.ok && !/No test files found/i.test(res.output)) {
    problems.push(`Tests related to your changes fail:\n${res.output.trim().split("\n").slice(-40).join("\n")}`);
  }
}

if (cfg.stopHook.runTypecheck) {
  const res = runTemplate(cfg.commands.typecheck, {}, { cwd: root, timeout: 300_000 });
  if (!res.ok) {
    // Only report errors in files touched now; pre-existing errors elsewhere are out of scope.
    const errs = res.output.split("\n").filter((l) => changed.some((f) => l.startsWith(f + "(") || l.startsWith(f + ":")));
    if (errs.length) problems.push(`Type errors in files you changed:\n${errs.slice(0, 25).join("\n")}`);
  }
}

if (cfg.stopHook.requireTestChange && changed.some((f) => isSource(f, cfg)) && !changed.some((f) => isTest(f, cfg))) {
  problems.push(
    "Source files changed but no test changed. Add a test that would fail without this change, " +
      "or tell the user explicitly why no test is needed.",
  );
}

if (problems.length) {
  process.stdout.write(
    JSON.stringify({
      decision: "block",
      reason:
        "Verification before finishing found problems. Fix them, or report honestly why you can't, " +
        `then summarise with evidence.\n\n${problems.join("\n\n")}`,
    }),
  );
}
process.exit(0);
