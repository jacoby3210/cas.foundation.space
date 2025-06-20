/**
 * @module init (./tools/scripts/init.mjs)
 * @description Initialize a project by installing dependencies in root and all submodules.
 */

// install-all.mjs
import { execSync } from "child_process";
import { join } from "path";
import { existsSync } from "fs";
import { cwd } from "process";

// Utility to run a command and log output
function run(cmd, dir) {
  try {
    console.log(`\n> Running "${cmd}" in ${dir}`);
    execSync(cmd, { stdio: "inherit", cwd: dir });
  } catch (e) {
    console.warn(`! Failed: ${cmd} in ${dir}`);
  }
}

// Get list of submodule paths recursively
function getSubmodulePaths() {
  const output = execSync("git config --file .gitmodules --get-regexp path")
    .toString()
    .trim()
    .split("\n");

  return output.map((line) => {
    const [, path] = line.split(" ");
    return path;
  });
}

// Main
const root = cwd();

// Install in root
if (existsSync(join(root, "package.json"))) {
  run("npm install", root);
}

// Install in all submodules
const submodules = getSubmodulePaths();

for (const path of submodules) {
  const fullPath = join(root, path);
  if (existsSync(join(fullPath, "package.json"))) {
    run("npm install", fullPath);
  }
}
