# CAS Foundation Space

## 📝 Brief

A cross-platform Javascript application with a modular architecture for deployment across multiple platforms.

## 🏗️ Architecture

```Bash
cas.foundation.space/
├── deploy/             # Sub-modules to build and run on different platforms
│   ├── api/            # Universal interface
│   ├── desktop/        # Desktop implementation (Sciter + Preact + Nanostores)
│   ├── obsidian/       # Implementation for Obsidian (Preact + Nanostores)
│   └── web/            # Web implementation (Vite + Preact + Nanostores)
├── packages/           # Reusable software packages including business logic and ui
└── tools/              # Build and process automation scripts
```

## ⚡ How to start

1. Clone repo to your local machine.
2. Run following commands from root folder:

```Bash
git submodule update --init --recursive
git submodule update --recursive --remote
```

## ✨ Features (deploy \ packages)

Coming soon.

## 🛠️ Scripts

```bash
# Build project
npm run build

# Run in development mode
npm run dev

# Launch a specific platform
npm run start:web
npm run start:obsidian
npm run start:sciter

# Validating all deploy modules
npm run validate

```

## 💡 Update (or fixes) requests

Feel free to open an issue or submit a pull request with suggestions, fixes, or updates.
We are open to contributions and always welcome improvements 🚀
