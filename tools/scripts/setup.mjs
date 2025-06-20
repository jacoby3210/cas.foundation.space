/**
 * @module init (./tools/scripts/init.mjs)
 * @description Initialize a project by installing dependencies in root and all submodules.
 * Includes Git submodule initialization and updates as specified in README.
 */

import { Paths } from "../core/paths.mjs";
import { Shell } from "../core/shell.mjs";

// --- Git Submodule Setup (from README "How to start" section) ---
console.log("🔄 Initializing and updating Git submodules...");

try {
  console.log("⚙️  Running: git submodule update --init --recursive");
  Shell.run("git", ["submodule", "update", "--init", "--recursive"], {
    cwd: Paths.base(),
    stdio: "inherit"
  });
} catch (err) {
  console.error("❌ Error initializing submodules:", err.message);
  process.exit(1);
}

try {
  console.log("⚙️  Running: git submodule update --recursive --remote");
  Shell.run("git", ["submodule", "update", "--recursive", "--remote"], {
    cwd: Paths.base(),
    stdio: "inherit"
  });
} catch (err) {
  console.error("❌ Error updating submodules:", err.message);
  process.exit(1);
}

// --- NPM Dependencies Installation ---
console.log("\n📦 Installing NPM dependencies...");
console.log("");

// --- Install root dependencies ---
console.log("⚙️  Installing root dependencies...");
try {
  Shell.run("npm", ["install"], { cwd: Paths.base(), stdio: "inherit" });
} catch (err) {
  console.error("❌ Error installing root dependencies:", err.message);
  process.exit(1);
}
console.log("");

// --- Install submodule dependencies using git submodule foreach (from README) ---
console.log("⚙️  Installing dependencies in all submodules...");
try {
  Shell.run("git", [
    "submodule", 
    "foreach", 
    "--recursive", 
    "npm install || echo \"npm install failed in $name\""
  ], {
    cwd: Paths.base(),
    stdio: "inherit"
  });
} catch (err) {
  console.warn("⚠️  Some submodule installations may have failed:", err.message);
}
console.log("")

console.log("✅ Initialization complete!");
console.log("")

// --- Run cas-install from project root ---
console.log("🚀 Running cas-install...");
try {
  Shell.run("npm", ["run", "cas-install"], { 
    cwd: Paths.base(), 
    stdio: "inherit" 
  });
  console.log("✅ cas-install completed successfully!");
} catch (err) {
  console.error("❌ Error running cas-install:", err.message);
  process.exit(1);
}
console.log("")