---
name: devbox
description: >
  Devbox environment patterns for the QuizApp monorepo.
  Trigger: When creating/updating devbox configs or running repo tasks inside Devbox.
license: MIT
metadata:
  author: QuizApp Team
  version: "1.0"
  scope: [root, infra]
  auto_invoke:
    - "Setting up or modifying Devbox for this repo"
    - "Adding/removing packages from Devbox"
    - "Running pnpm/turbo tasks through Devbox"
---

## When to Use

- Bootstrapping a reproducible workstation for QuizApp (local laptop, Codespaces, remote VM)
- Updating tool versions (Node, pnpm, Turbo, Docker CLI) in `devbox.json`
- Running repo commands inside `devbox shell` to guarantee the pinned toolchain
- Troubleshooting differences between host Node/pnpm versions and the expected stack

## Critical Patterns

### Required Files (all at repo root)

| File | Purpose |
|------|---------|
| `devbox.json` | Declares packages, shell hooks, and scripts. Commit it. |
| `devbox.lock` | Nix lockfile produced by Devbox. Commit it for deterministic installs. |
| `devbox.d/*.sh` | Optional shell hooks (e.g., pnpm install). Keep scripts idempotent. |

### Package Baseline

- Pin **Node 20.x** via `nixpkgs#nodejs_20` (matches repo `package.json` engines)
- Pin **pnpm 9.x** via `nixpkgs#pnpm`
- Install `nixpkgs#turbo` for running `turbo run` outside node_modules (still keep repo devDependency)
- Include `nixpkgs#docker` (CLI only) so `docker compose` works inside Devbox shells
- Optional but helpful: `nixpkgs#git`, `nixpkgs#openssl`, `nixpkgs#watchman`

### Shell Behavior

- Expose `node_modules/.bin` on `PATH` inside the init hook (`export PATH="$PWD/node_modules/.bin:$PATH"`)
- Prefer hooking `pnpm install` in `devbox.d/post-start.sh` only when `.pnpm-lock.yaml` changes (guard with checksum)
- Never install global npm packages inside Devbox; rely on pnpm workspace + nix packages

### Example `devbox.json`

```json
{
  "$schema": "https://raw.githubusercontent.com/jetpack-io/devbox/main/devbox.schema.json",
  "packages": [
    "nixpkgs#nodejs_20",
    "nixpkgs#pnpm",
    "nixpkgs#turbo",
    "nixpkgs#docker",
    "nixpkgs#git"
  ],
  "shell": {
    "init_hook": [
      "export PATH=$PWD/node_modules/.bin:$PATH"
    ]
  },
  "env": {
    "QUIZAPP_NODE_VERSION": "20"
  }
}
```

Keep the file minimal; extra scripts belong in `devbox.d/*.sh`.

### ALWAYS

- Run `devbox shell` (or `devbox run <cmd>`) before invoking `pnpm`, `turbo`, or `docker`
- Commit both `devbox.json` and `devbox.lock`
- Rebuild the lock after changing packages: `devbox update`
- Document any non-standard packages in `docs/architecture.md`

### NEVER

- Mix host and Devbox installs (e.g., `pnpm install` outside Devbox while expecting Devbox paths)
- Add OS-specific packages (stick to nixpkgs identifiers)
- Rely on Devbox to start long-running services automatically; keep that logic in `pnpm dev` / Docker

## Commands

```bash
# Initialize Devbox in repo root (one-time)

# Add packages
devbox add nixpkgs#nodejs_20 nixpkgs#pnpm nixpkgs#turbo nixpkgs#docker

# Enter the shell (preferred for iterative work)

# Run Turbo task once without spawning a shell
devbox run pnpm test

# Update the lockfile after package changes
```

## Resources

- `docs/architecture.md` — source of truth for required toolchain versions
- Devbox docs — https://www.jetpack.io/devbox/docs/ (reference only, do not link from AGENTS)
- Use `devbox env` to inspect resolved environment when debugging version drift
