#!/usr/bin/env node
/**
 * @module launch.mjs (./tools/scripts/launch.mjs)
 * @description Launch specified script from selected deploy with selected root package.
 */

import { execSync } from "child_process";
import { config } from "dotenv";
import { existsSync } from "fs";
import { dirname, join, resolve } from "path";
import { fileURLToPath } from "url";

import { parseArguments } from "../core/args.mjs";
import {
  getEnvironmentOptionList,
  getLaunchOptionInfo,
  showHelp,
} from "../core/utils.mjs";

// Clear the console for better readability.
process.stdout.write("\x1Bc");

// Display a welcome message.
console.log("🚀 Welcome to the CAS Foundation Launch Script!");

// Getting the path to the root directory of the project.
const filePath = fileURLToPath(import.meta.url);
const folderPath = dirname(filePath);
const rootPath = join(folderPath, "../../");
const path = join(rootPath, "tools", "config", "current.cfg");

// 1. Load the .env file
const result = config({ path });
if (result.error) {
  console.warn(`⚠️  Warning: Could not load .env file from ${path}`);
  console.warn(`   Error: ${result.error.message}`);
  process.exit(1);
}

console.log("🔧 Environment loaded successfully");

const cfg = result.parsed || {};
if (cfg.APP_NAME) console.log(`📱 App Name: ${cfg.APP_NAME}`);
if (cfg.VERSION) console.log(`🔖 Version: ${cfg.VERSION}`);

// 2. Main function to parse arguments and run the script
async function main() {
  const args = parseArguments(cfg);
  if (!args) process.exit(1);
  if (args.help) return showHelp();

  if (args.verbose) {
    console.log("\n🛠️  Full parsed arguments:");
    console.log(JSON.stringify(args, null, 2));
    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
  }

  const env = getLaunchOptionInfo(args, cfg, "environment", false);
  const pkg = getLaunchOptionInfo(args, cfg, "package", "Not specified");
  const script = getLaunchOptionInfo(args, cfg, "script", "Not specified");
  const verbose = getLaunchOptionInfo(args, cfg, "verbose", false);

  console.log("\n🌍 Environment Info:");
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
  console.log(`📁 Dir: ${process.cwd()}`);
  console.log(`⚙️ Node Version: ${process.version}`);
  console.log(`🔧 Platform: ${process.platform}`);

  console.log("\n📋 Parsed Arguments:");
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
  console.log(`🎯 Environment:  ${env.value} (from ${env.source})`);
  console.log(`📦 Package:      ${pkg.value} (from ${pkg.source})`);
  console.log(`⚡ Script:       ${script.value} (from ${script.source})`);
  console.log(`🔍 Verbose:      ${verbose.value} (from ${verbose.source})`);
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");

  // Execute the script(s)
  const buildScriptPath = (d, s) => `./env/${d}/tools/scripts/${s}.mjs`;
  const environments = await getEnvironmentOptionList();
  if (environments.length === 0) {
    console.error("❌ No deploy targets found in ./env directory.");
    process.exit(1);
  }

  const launch = (path) => {
    const absoluteScriptPath = resolve(path);
    if (!existsSync(absoluteScriptPath)) {
      console.error(`❌ Script not found: ${absoluteScriptPath}`);
      process.exit(1);
    }

    const launchScript = `node ${path}`;
    console.log(`🚀 Executing: ${launchScript}`);
    try {
      execSync(launchScript, { stdio: "inherit" });
    } catch (error) {
      console.error(`❌ Failed to execute script: ${error.message}`);
      process.exit(1);
    }
  };

  if (env.value === "all") {
    for (const d of environments) launch(buildScriptPath(d, script.value));
  } else {
    launch(buildScriptPath(env.value, script.value));
  }

  console.log("\n✨ Launch script completed successfully!\n");
}

main();
