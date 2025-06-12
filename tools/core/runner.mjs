/**
 * @module runner.mjs (./tools/scripts/runner.mjs)
 * @description Contains the basic algorithm for controlling the running of environment scripts.
 */

import { execSync } from "child_process";
import { existsSync } from "fs";
import { resolve } from "path";

export const runEnvironmentScript = (env, script) => {
  const path = `./env/${env}/tools/scripts/${script}.mjs`;
  const resolvePath = resolve(path);
  if (!existsSync(resolvePath)) {
    console.warn(`⚠️  Environment ${env} not contains script: ${script}.`);
    console.warn(`⚠️  Path not exists ${resolvePath}`);
    return;
  }

  try {
    const launchScript = `node ${path}`;
    console.log(`🚀 Executing: ${launchScript}`);
    console.log(``);
    execSync(launchScript, { stdio: "inherit" });
  } catch (error) {
    console.warn(`⚠️  Failed to execute script: ${error.message}`);
    return;
  }
};
