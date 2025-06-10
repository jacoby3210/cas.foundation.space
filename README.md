# CAS Foundation Space

## 📝 Brief

A cross-platform Javascript application with a modular architecture for deployment across multiple platforms.

## 🏗️ Architecture

```Bash
cas.foundation.space/
├── env                 # Sub-modules to build and run on different platforms
│   ├── common          # Common scripts for all platforms.
│   ├── desktop.sciter  # Desktop implementation (Sciter + Preact + Nanostores)
│   ├── plugin.obsidian # Implementation for Obsidian (Preact + Nanostores)
│   └── web.vite        # Web implementation (Vite + Preact + Nanostores)
├── packages            # Reusable software packages including business logic and ui
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

```bash
# Launch environment script
npm run cas-launch # by default call start.mjs script for all environments

# Launch a specific environment script
npm run cas-launch -- --env=web.vite # call start script for obsidian environment

# Validating all deploy modules
npm run cas-launch -- --env=web.vite --script=stop # call stop script for obsidian environment

```

## 💡 Update (or fixes) requests

Feel free to open an issue or submit a pull request with suggestions, fixes, or updates.
We are open to contributions and always welcome improvements 🚀
