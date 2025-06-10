# CAS Designer Space

## 📝 Brief

A cross-platform Javascript application with a modular architecture for deployment across multiple platforms.

## 🏗️ Architecture

```Bash
cas.designer.space/
├── env                 # Sub-modules to build and run on different enviroments.
│   ├── common          # Common scripts for all enviroments (not used as specified env for launch).
│   ├── desktop.sciter  # Desktop implementation (Sciter + Preact + Nanostores)
│   ├── plugin.obsidian # Obsidian plugin implementation (Preact + Nanostores)
│   └── web.vite        # Web implementation (Vite + Preact + Nanostores)
├── packages            # Reusable software packages including business logic and ui
│   ├── base            # Base package (common + designer + io logic)
│   ├── bricks          # Bricks package (ui components, layouts, etc)
│   └── game            # Game package (logic + ui).
└── tools               # Build and process automation scripts
```

## ⚡ How to start

1. Clone repo to your local machine.
2. Run following commands from root folder:

```Bash
git submodule update --init --recursive
git submodule update --recursive --remote
git submodule foreach --recursive 'npm install || echo "npm install failed in $name"'
```

## ✨ Features (deploy \ packages)

Coming soon.

## 🛠️ Scripts

### Launch
```bash
# Init environment(use after cloning repo).
npm run cas-init

# Launch environment script
npm run cas-launch # by default call start.mjs script for all environments

# Available args:
# -e, -env <env_name> - launch a specific environment (where env_name is a name of environment in env folder).
# -s, -script <script_name> - launch a specific script (where script_name is a name of script in env folder).
# -p, -package <package_name> - launch a specific package (where package_name is a name of package in packages folder)
# -m, -mode <mode_name> - launch a specific mode (where mode_name is a name of mode in env folder)
# -d, -deploy - enable deploy mode
# -v, -verbose - show verbose output
# -help - show help

# Example call with different args:
npm run cas-launch -e desktop.sciter
npm run cas-launch -e web.vite -s build
npm run cas-launch -e plugin.obsidian -p game -m dev

# Including shortcuts (call specified script):
npm run cas-build # build script for specified environment(for all by default)
npm run cas-start # start script for specified environment(for all by default)
npm run cas-stop # stop all running processes from this directory

```

## 💡 Update (or fixes) requests

Feel free to open an issue or submit a pull request with suggestions, fixes, or updates.
We are open to contributions and always welcome improvements 🚀
