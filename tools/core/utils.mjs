/**
 * @module utils (./tools/main/utils.mjs)
 * @description Utility functions for the working of CAS Foundation scripts,
 * including argument source detection and help output.
 */

import { readdir, stat } from "fs/promises";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

/**
 * Reads the ./deploy directory and returns a list of subdirectories.
 * @returns {Promise<string[]>} Array of deploy target names.
 */
export async function getEnvironmentOptionList() {
  const filePath = fileURLToPath(import.meta.url);
  const folderPath = dirname(filePath);
  const path = join(folderPath, "../../env");

  try {
    const entries = await readdir(path);
    const environments = [];
    const excludes = ["base", "common", "temp"];
    for (const entry of entries) {
      const fullPath = join(path, entry);
      const stats = await stat(fullPath);
      if (stats.isDirectory() && !excludes.includes(entry)) {
        environments.push(entry);
      }
    }

    return environments;
  } catch (err) {
    console.error(`❌ Failed to read deploy directory: ${err.message}`);
    return [];
  }
}

/**
 * Get the value for a given key from CLI arguments, environment variables, or fallback.
 *
 * @param {Object} args - Parsed command-line arguments.
 * @param {Object} env - Environment variables (typically from dotenv).
 * @param {string} key - The name of the option to retrieve.
 * @param {*} [fallback=null] - The default value if not found in args or env.
 * @returns {{ value: *, source: "CMD" | "ENV" | "default" }}
 *
 * @example
 * const info = getLaunchOptionInfo(args, env, "script", "build");
 * console.log(info.value);  // -> script name
 * console.log(info.source); // -> CMD | ENV | default
 */
export function getLaunchOptionInfo(args, env, key, fallback = null) {
  if (args?.[key] != null) {
    return { value: args[key], source: "CMD" };
  }

  const envKey = `SCRIPT_LAUNCH_${key.toUpperCase()}`;
  if (env?.[envKey] != null) {
    const raw = env[envKey];
    const parsed = raw === "true" ? true : raw === "false" ? false : raw;
    return { value: parsed, source: "ENV" };
  }

  return { value: fallback, source: "default" };
}

/**
 * Display help information for the launch script.
 *
 * This function prints usage examples and available options to the console.
 */
export function showHelp() {
  console.log(`
🚀 Launch Script Help

Usage:
  node launch.mjs [options] [script]

Options:
  -d, --deploy           Enable deploy mode
  -m, --mode <mode>      Set execution mode (e.g., development, production)
  -p, --package <name>   Specify root package name
  -s, --script <name>    Specify script to launch
  -v, --verbose          Show verbose output
  -h, --help             Show this help message

Examples:
  node launch.mjs --deploy --mode production
  node launch.mjs --package my-app --script build
  node launch.mjs build --mode test --deploy
`);
}
