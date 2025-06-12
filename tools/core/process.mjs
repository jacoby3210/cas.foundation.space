/**
 * @module process.mjs (./tools/scripts/process.mjs)
 * @description Controls the launch of execution of external scripts.
 */

import { execSync } from "child_process";
import { existsSync } from "fs";
import { resolve } from "path";

export const launch = (env, script) => {
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
    execSync(launchScript, { stdio: "inherit" });
  } catch (error) {
    console.warn(`⚠️ Failed to execute script: ${error.message}`);
    return;
  }
};
