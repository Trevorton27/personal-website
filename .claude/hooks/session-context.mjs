// SessionStart: orient a fresh context window from the spec, not from whatever
// the last chat happened to remember. Prints active plans, their open tasks
// and the working-tree state.
import { readdirSync, readFileSync, existsSync } from "node:fs";
import { join } from "node:path";
import { readInput, projectDir, git, changedFiles } from "./lib.mjs";

const input = await readInput();
const root = projectDir(input);
const plansDir = join(root, "docs/plans");
const out = [];

if (existsSync(plansDir)) {
  const active = readdirSync(plansDir)
    .filter((f) => f.endsWith(".md") && !f.startsWith("_"))
    .map((f) => ({ f, text: readFileSync(join(plansDir, f), "utf8") }))
    .filter(({ text }) => /^status:\s*(active|in-progress)\b/m.test(text));
  for (const { f, text } of active) {
    const open = text.split("\n").filter((l) => /^\s*- \[ \]/.test(l)).slice(0, 10);
    out.push(`Active plan: docs/plans/${f}${open.length ? `\nOpen tasks:\n${open.join("\n")}` : " (all tasks ticked: run /review then /ship)"}`);
  }
}
if (!out.length) out.push("No active plan in docs/plans/. For any non-trivial change, start with the spec skill.");

const branch = git(["branch", "--show-current"], root);
const dirty = changedFiles(root);
out.push(
  `Branch: ${branch || "(none)"}; uncommitted files: ${dirty.length}` +
    (dirty.length ? ` (${dirty.slice(0, 8).join(", ")}${dirty.length > 8 ? ", …" : ""})` : ""),
);

process.stdout.write(out.join("\n\n") + "\n");
process.exit(0);
