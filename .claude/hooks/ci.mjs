// CI gate: runs the same checks the hooks use, from the same guardrails.json,
// so commits made outside Claude (or with hooks disabled) meet the same bar.
//   node .claude/hooks/ci.mjs [base-ref]
import { badSubject, loadConfig, runTemplate, git, isIgnored, isSource, isTest } from "./lib.mjs";

const root = process.cwd();
const cfg = loadConfig(root);
const base = process.argv[2] || process.env.GITHUB_BASE_REF;
let failed = false;

function step(name, template) {
  if (!template) return console.log(`- ${name}: not configured, skipped`);
  process.stdout.write(`- ${name}: `);
  const res = runTemplate(template, {}, { cwd: root, timeout: 1_800_000, maxBuffer: 64 * 1024 * 1024 });
  if (res.skipped) return console.log("tool not installed, skipped");
  console.log(res.ok ? "pass" : "FAIL");
  if (!res.ok) {
    failed = true;
    console.log(res.output.trim().split("\n").slice(-60).join("\n"));
  }
}

step("lint", cfg.commands.lint);
step("typecheck", cfg.commands.typecheck);
step("tests", cfg.commands.allTests);

// Commit hygiene for every commit in the PR.
if (base) {
  const range = `origin/${base.replace(/^origin\//, "")}...HEAD`;
  const shas = git(["rev-list", "--no-merges", range], root).split("\n").filter(Boolean);
  console.log(`- commit hygiene (${shas.length} commits vs ${base}):`);
  for (const sha of shas) {
    const msg = git(["log", "-1", "--format=%B", sha], root);
    const subject = msg.split("\n")[0];
    const files = git(["show", "--numstat", "--format=", sha], root)
      .split("\n")
      .filter(Boolean)
      .map((l) => {
        const [a, d, file] = l.split("\t");
        return { file, lines: (Number(a) || 0) + (Number(d) || 0) };
      });
    const size = files.filter((f) => !isIgnored(f.file, cfg)).reduce((n, f) => n + f.lines, 0);
    const issues = [];
    if (size > cfg.maxCommitLines && !/\[large:[^\]]+\]/.test(msg)) issues.push(`${size} lines > ${cfg.maxCommitLines}`);
    if (files.some((f) => isSource(f.file, cfg)) && !files.some((f) => isTest(f.file, cfg)) && !/\[no-test:[^\]]+\]/.test(msg))
      issues.push("source change without test change");
    if (badSubject(subject)) issues.push("uninformative subject");
    if (issues.length) {
      failed = true;
      console.log(`  FAIL ${sha.slice(0, 7)} "${subject}": ${issues.join("; ")}`);
    }
  }
  if (!failed) console.log("  pass");
}

process.exit(failed ? 1 : 0);
