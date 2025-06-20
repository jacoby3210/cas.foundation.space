/**
 * @module init (./tools/scripts/init.mjs)
 * @description Initialize a project by installing dependencies in root and all submodules.
 */

import { existsSync } from "node:fs";
import { resolve } from "node:path";

import { Paths } from "../core/paths.mjs";
import { Shell } from "../core/shell.mjs";

// --Recursively reads paths of all Git submodules from .gitmodules.
const submodules = (() => {
  const file = resolve(Paths.base(), ".gitmodules");
  if (!existsSync(file)) {
    console.warn("⚠️  No .gitmodules file found. Skipping init submodules.");
    return [];
  }

  try {
    const output = Shell.run(
      "git",
      ["config", "--file", ".gitmodules", "--get-regexp", "path"],
      {
        cwd: Paths.base(),
      }
    );

    return output
      .trim()
      .split("\n")
      .map((line) => line.split(" ")[1])
      .filter(Boolean);
  } catch (err) {
    console.error("❌ Error reading submodule paths:", err.message);
    return [];
  }
})();

// --- Main logic ---
console.log("⚙️  Installing root dependencies...");
Shell.run("npm", ["install"], { cwd: Paths.base(), stdio: "inherit" });

for (const path of submodules) {
  const fullPath = resolve(Paths.base(), path);
  try {
    console.log(`⚙️  Installing dependencies in submodule: ${path}`);
    Shell.run("npm", ["install"], { cwd: fullPath, stdio: "inherit" });
  } catch (err) {
    console.warn(`ℹ️  Skipping submodule ${path}: ${err.message}`);
  }
}
