/**
 * @module paths (./tools/common/paths.mjs)
 * @description Manages paths in solutions.
 */

import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

export class Paths {
  /**
   * Converts file URL to absolute file system path.
   * @param {string} url - File URL (usually import.meta.url)
   * @returns {string} Absolute path to the file
   */
  static file(url) {
    return fileURLToPath(url);
  }

  /**
   * Gets folder of the given file URL.
   * @param {string} url - File URL (usually import.meta.url)
   * @returns {string} Absolute path to the folder
   */
  static folder(url) {
    return dirname(Paths.file(url));
  }

  /**
   * Absolute path to the project root (2 levels up from current file)
   * @returns {string}
   */
  static base() {
    return resolve(Paths.folder(import.meta.url), "../../");
  }

  /**
   * Absolute path to the current config file
   * @returns {string}
   */
  static config() {
    return resolve(Paths.base(), "tools", "config", "current.cfg");
  }

  /**
   * Returns path to a specific environment folder
   * @param {string} env - Environment name
   * @returns {string}
   */
  static env(env = "") {
    return resolve(Paths.base(), "env", env);
  }

  /**
   * Returns path to a specific package
   * @param {string} pkg - Package name
   * @returns {string}
   */
  static package(pkg) {
    return resolve(Paths.base(), "packages", pkg);
  }
}
