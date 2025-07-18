/**
 * @module args (./tools/common/args.mjs)
 * @description Provides conversion of command line arguments to an object.
 */

export function parseArguments() {
  try {
    const args = process.argv.slice(2);
    const parsed = {
      environment: null,
      package: null,
      script: null,
      help: false,
      verbose: false,
    };

    for (let i = 0; i < args.length; i++) {
      const arg = args[i];

      switch (arg) {
        case "--env":
        case "-e":
          if (i + 1 < args.length) parsed.environment = args[++i];
          break;

        case "--package":
        case "-p":
          if (i + 1 < args.length) parsed.package = args[++i];
          break;

        case "--script":
        case "-s":
          if (i + 1 < args.length) parsed.script = args[++i];
          break;

        case "--help":
        case "-h":
          parsed.help = true;
          break;

        default:
          if (!arg.startsWith("-") && !parsed.script) parsed.script = arg;
      }
    }

    return parsed;
  } catch (err) {
    console.error("🚨 Failed to parse arguments:");
    console.error(`   ${err.message}`);
    return null;
  }
}
