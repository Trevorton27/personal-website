// PreToolUse (Bash, `git commit *`): refuse commits that are too big to review,
// carry no information, or change source without touching tests.
//
// Escape hatches (recorded in history, so they're auditable):
//   [large: <reason>]    allow an oversized commit (generated scaffold, vendored file)
//   [no-test: <reason>]  allow a source change with no test change
import { readFileSync, statSync } from "node:fs";
import { join } from "node:path";
import { badSubject, readInput, loadConfig, projectDir, git, deny, isSource, isTest, isIgnored } from "./lib.mjs";

const input = await readInput();
const command = input.tool_input?.command ?? "";
const cwd = input.cwd || projectDir(input);
const cfg = loadConfig(projectDir(input));

if (!/\bgit\s+commit\b/.test(command)) process.exit(0);
if (/--amend\b/.test(command) && !/\s-m\b|\s-F\b/.test(command)) process.exit(0);

// ---- 1. Commit message ---------------------------------------------------
function extractMessage(cmd) {
  const heredoc = cmd.match(/<<-?\s*['"]?(\w+)['"]?\s*\n([\s\S]*?)\n\s*\1\b/);
  if (heredoc) return heredoc[2];
  const parts = [...cmd.matchAll(/(?:-m|--message)[\s=]+(?:"((?:[^"\\]|\\.)*)"|'([^']*)')/g)].map((m) => m[1] ?? m[2]);
  return parts.length ? parts.join("\n\n") : null;
}
const message = extractMessage(command);

if (message !== null) {
  const subject = message.split("\n")[0].trim();
  if (badSubject(subject)) {
    deny(
      `Commit subject "${subject}" doesn't say what changed or why. Write an imperative subject that names ` +
        `the behaviour, e.g. "Cap reranker candidates at 20 to cut latency".`,
    );
  }
  if (subject.length > 72) deny(`Commit subject is ${subject.length} chars; keep it ≤72 and put detail in the body.`);
}

// ---- 2. What will this commit contain? ---------------------------------
const stagesItself = /\bgit\s+add\b/.test(command) || /\bgit\s+commit\b[^|;&]*\s-[a-zA-Z]*a[a-zA-Z]*\b/.test(command);
const hasHead = git(["rev-parse", "--verify", "HEAD"], cwd) !== "";
const numstat = git(["diff", "--numstat", stagesItself && hasHead ? "HEAD" : "--cached"], cwd);

const files = [];
for (const line of numstat.split("\n").filter(Boolean)) {
  const [add, del, file] = line.split("\t");
  files.push({ file, lines: (Number(add) || 0) + (Number(del) || 0) });
}
if (stagesItself && /\bgit\s+add\s+(-A|--all|\.)(\s|$)/.test(command)) {
  for (const file of git(["ls-files", "--others", "--exclude-standard"], cwd).split("\n").filter(Boolean)) {
    let lines = 0;
    try {
      if (statSync(join(cwd, file)).size < 2_000_000) lines = readFileSync(join(cwd, file), "utf8").split("\n").length;
    } catch {}
    files.push({ file, lines });
  }
}

const reviewable = files.filter((f) => !isIgnored(f.file, cfg));
const total = reviewable.reduce((n, f) => n + f.lines, 0);

if (total > cfg.maxCommitLines && !/\[large:\s*[^\]]+\]/.test(message ?? "")) {
  const top = [...reviewable].sort((a, b) => b.lines - a.lines).slice(0, 6);
  deny(
    `This commit changes ${total} reviewable lines (limit ${cfg.maxCommitLines}). Split it into reviewable ` +
      `slices: unstage with \`git reset\`, stage one slice at a time (\`git add <files>\` or \`git add -p\`) and ` +
      `commit each with its own message.\nLargest files:\n${top.map((f) => `  ${f.lines}\t${f.file}`).join("\n")}\n` +
      `If the size is genuinely unavoidable, add "[large: <reason>]" to the message.`,
  );
}

// ---- 3. Source changes should come with test changes -------------------
const sourceChanged = files.some((f) => isSource(f.file, cfg));
const testsChanged = files.some((f) => isTest(f.file, cfg));
if (sourceChanged && !testsChanged && !/\[no-test:\s*[^\]]+\]/.test(message ?? "")) {
  deny(
    `This commit changes source files but no tests. Add or update a test that pins the new behaviour ` +
      `(tdd skill), or add "[no-test: <reason>]" to the message if it truly needs none ` +
      `(pure refactor already covered, copy change, config).`,
  );
}

process.exit(0);
