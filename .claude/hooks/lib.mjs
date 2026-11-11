// Shared helpers for the engineering-guardrail hooks.
// Project-specific settings live in .claude/guardrails.json, not here.
// Every hook reads one JSON object from stdin (Claude Code hooks reference).
import { execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";
import { join } from "node:path";

const DEFAULTS = {
  maxCommitLines: 400,
  sourcePaths: ["app/", "lib/", "src/"],
  testPaths: ["__tests__/", "tests/", "test/"],
  testFilePattern: "\\.(test|spec)\\.(ts|tsx|js|jsx|mjs)$",
  codeFilePattern: "\\.(ts|tsx|js|jsx|mjs)$",
  ignorePaths: ["package-lock.json", "docs/", ".claude/"],
  protectedPaths: [],
  commands: {},
  evalPaths: [],
  stopHook: { runTests: true, runTypecheck: true, requireTestChange: true },
};

// Commit subjects that say nothing about what changed. Shared by the hook and CI.
export const JUNK_SUBJECT = /^(wip|fix|fixes|fixed|update|updates|updated|changes|latest changes.*|stuff|misc|tweaks?|cleanup|.*\btho)$/i;
export const badSubject = (subject) => JUNK_SUBJECT.test(subject.trim()) || subject.trim().split(/\s+/).length < 3;

export function projectDir(input = {}) {
  return process.env.CLAUDE_PROJECT_DIR || input.cwd || process.cwd();
}

let cached;
export function loadConfig(dir) {
  if (cached) return cached;
  let user = {};
  try {
    user = JSON.parse(readFileSync(join(dir, ".claude/guardrails.json"), "utf8"));
  } catch {}
  cached = {
    ...DEFAULTS,
    ...user,
    commands: { ...DEFAULTS.commands, ...(user.commands ?? {}) },
    stopHook: { ...DEFAULTS.stopHook, ...(user.stopHook ?? {}) },
  };
  if (process.env.GUARD_MAX_COMMIT_LINES) cached.maxCommitLines = Number(process.env.GUARD_MAX_COMMIT_LINES);
  cached.testRe = new RegExp(cached.testFilePattern);
  cached.codeRe = new RegExp(cached.codeFilePattern);
  return cached;
}

export async function readInput() {
  let raw = "";
  for await (const chunk of process.stdin) raw += chunk;
  try {
    return JSON.parse(raw || "{}");
  } catch {
    return {};
  }
}

export function sh(cmd, args, opts = {}) {
  try {
    return execFileSync(cmd, args, { encoding: "utf8", stdio: ["ignore", "pipe", "pipe"], ...opts });
  } catch (err) {
    err.output = `${err.stdout ?? ""}${err.stderr ?? ""}`;
    throw err;
  }
}

const quote = (s) => `'${String(s).replace(/'/g, `'\\''`)}'`;

// Run a configured command template. Returns { ok, output, skipped }.
export function runTemplate(template, { files = [], file = "" } = {}, opts = {}) {
  if (!template) return { ok: true, output: "", skipped: true };
  const cmd = template.replace("{files}", files.map(quote).join(" ")).replace("{file}", quote(file));
  try {
    return { ok: true, output: sh("sh", ["-c", cmd], opts) };
  } catch (err) {
    const output = err.output ?? "";
    // Tool missing from this project: treat as skipped, not as a failure.
    const missing = err.status === 127 || /command not found|could not determine executable|npx canceled/i.test(output);
    return { ok: missing, output, skipped: missing };
  }
}

export function git(args, cwd) {
  try {
    return sh("git", args, { cwd }).trim();
  } catch {
    return "";
  }
}

export const startsWithAny = (file, prefixes) => prefixes.some((p) => file === p || file.startsWith(p));
export const isTest = (f, c) => startsWithAny(f, c.testPaths) || c.testRe.test(f);
export const isSource = (f, c) => !isTest(f, c) && startsWithAny(f, c.sourcePaths) && c.codeRe.test(f);
export const isIgnored = (f, c) => startsWithAny(f, c.ignorePaths);

// Files changed vs HEAD plus untracked files (relative paths).
export function changedFiles(cwd) {
  const hasHead = git(["rev-parse", "--verify", "HEAD"], cwd) !== "";
  const tracked = hasHead ? git(["diff", "--name-only", "HEAD"], cwd).split("\n") : git(["diff", "--name-only", "--cached"], cwd).split("\n");
  const untracked = git(["ls-files", "--others", "--exclude-standard"], cwd).split("\n");
  return [...new Set([...tracked, ...untracked])].filter(Boolean);
}

export function deny(reason) {
  process.stdout.write(
    JSON.stringify({
      hookSpecificOutput: { hookEventName: "PreToolUse", permissionDecision: "deny", permissionDecisionReason: reason },
    }),
  );
  process.exit(0);
}

export function ask(reason) {
  process.stdout.write(
    JSON.stringify({
      hookSpecificOutput: { hookEventName: "PreToolUse", permissionDecision: "ask", permissionDecisionReason: reason },
    }),
  );
  process.exit(0);
}

export function addContext(eventName, text) {
  process.stdout.write(JSON.stringify({ hookSpecificOutput: { hookEventName: eventName, additionalContext: text } }));
  process.exit(0);
}
