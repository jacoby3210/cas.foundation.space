/**
 * @module launch (./tools/scripts/launch.mjs)
 * @description Launch specified script from selected deploy with selected root package.
 */

import { config } from "dotenv";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

import { parseArguments } from "../core/args.mjs";
import { runEnvironmentScript } from "../core/runner.mjs";
import {
  getEnvironmentOptionList,
  getLaunchOptionInfo,
  showHelp,
} from "../core/utils.mjs";

// Clear the console for better readability.
process.stdout.write("\x1Bc");

// Display a welcome message.
console.log("🚀 Welcome to the CAS Foundation Launch Script!\n");

// Getting the path to the root directory of the project.
const filePath = fileURLToPath(import.meta.url);
const folderPath = dirname(filePath);
const rootPath = join(folderPath, "../../");
const path = join(rootPath, "tools", "config", "current.cfg");

// 1. Load the config file
const result = config({ path });
if (!result || result.error) {
  console.warn(`⚠️ Failed to load config file from ${path}`);
  process.exit(1);
}

const cfg = result.parsed;

console.log(`🔧 Configuration file loaded successfully (from ${path})`);
if (cfg.APP_NAME) console.log(`📱 App Name: ${cfg.APP_NAME}`);
if (cfg.APP_VERSION) console.log(`🔖 Version: ${cfg.VERSION}`);

// 2. Main function to parse arguments and run the script
async function main() {
  const args = parseArguments();
  if (!args) process.exit(1);
  if (args.help) return showHelp();
  if (args.verbose) {
    console.log("\n🛠️  Full parsed arguments:");
    console.log(JSON.stringify(args, null, 2));
    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
  }

  const env = getLaunchOptionInfo(args, cfg, "environment", false);
  const pkg = getLaunchOptionInfo(args, cfg, "package", "Not specified");
  const script = getLaunchOptionInfo(args, cfg, "script", "start.mjs");
  const verbose = getLaunchOptionInfo(args, cfg, "verbose", false);

  console.log("\n🌍 Environment Info:");
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
  console.log(`📁 Dir: ${process.cwd()}`);
  console.log(`⚙️  Node Version: ${process.version}`);
  console.log(`🔧 Platform: ${process.platform}\n`);

  console.log("📋 Parsed Arguments:");
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
  console.log(`🎯 Environment:  ${env.value} (from ${env.source})`);
  console.log(`📦 Package:      ${pkg.value} (from ${pkg.source})`);
  console.log(`⚡ Script:       ${script.value} (from ${script.source})`);
  console.log(`🔍 Verbose:      ${verbose.value} (from ${verbose.source})\n`);

  if (env.value === "all") {
    const options = await getEnvironmentOptionList();
    if (options.length === 0) {
      console.error("❌ No environment targets found in ./env directory.");
      process.exit(1);
    }
    for (const option of options) runEnvironmentScript(option, script.value);
  } else runEnvironmentScript(env.value, script.value);

  console.log("✨ Launch script completed successfully!\n");
}

main();
