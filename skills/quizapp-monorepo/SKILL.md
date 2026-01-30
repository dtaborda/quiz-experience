---
name: quizapp-monorepo
description: >
  pnpm workspaces + Turborepo setup patterns for QuizApp monorepo.
  Trigger: When setting up monorepo structure, configuring workspaces, or managing cross-package dependencies.
license: MIT
metadata:
  author: QuizApp Team
  version: "1.1"
  scope: [root]
  auto_invoke:
    - "Setting up monorepo structure"
    - "Configuring pnpm workspaces"
    - "Adding new packages to monorepo"
    - "Configuring Turborepo tasks"
    - "Managing cross-package dependencies"
    - "Working with workspace protocol"
    - "Debugging workspace resolution"
    - "Configuring Turborepo cache"
    - "Running commands in specific packages"
    - "Setting up shared package"
---

# QuizApp Monorepo Skill

## When to Use

Use this skill when:
- Setting up the initial monorepo structure
- Adding a new package to the workspace
- Configuring cross-package dependencies
- Setting up Turborepo task pipelines
- Debugging workspace resolution issues
- Running commands in specific packages

## Critical Patterns

### Workspace Structure

**ALWAYS follow this structure:**

```
quizapp/
├── frontend/           # Next.js app
├── backend/            # Express API
├── shared/             # Shared contracts/schemas
├── infra/              # Docker configs (not a pnpm package)
├── pnpm-workspace.yaml # Workspace config
├── turbo.json          # Turborepo config
└── package.json        # Root scripts
```

### pnpm Workspace Configuration

**File: `pnpm-workspace.yaml`**

```yaml
packages:
  - "frontend"
  - "backend"
  - "shared"
```

**NEVER:**
- Include `infra/` in packages (it's not a pnpm package)
- Use wildcards like `packages/*` (be explicit)
- Include `node_modules` or `.git`

### Root package.json

**ALWAYS include these scripts:**

```json
{
  "name": "quizapp",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "turbo run dev",
    "build": "turbo run build",
    "test": "turbo run test",
    "lint": "turbo run lint",
    "format": "turbo run format",
    "format:check": "turbo run format:check"
  },
  "devDependencies": {
    "turbo": "^2.0.0"
  }
}
```

**Why:**
- Single entry point for all common tasks
- Turborepo orchestrates execution across packages
- `private: true` prevents accidental publishing

### Package Naming Convention

**ALWAYS use workspace protocol for internal dependencies:**

```json
// In frontend/package.json
{
  "name": "frontend",
  "dependencies": {
    "shared": "workspace:*"
  }
}

// In backend/package.json
{
  "name": "backend",
  "dependencies": {
    "shared": "workspace:*"
  }
}
```

**Why `workspace:*`:**
- pnpm symlinks local packages instead of installing from registry
- Changes in `shared` immediately available in `frontend`/`backend`
- No need to rebuild/reinstall during development

### Turborepo Configuration

**File: `turbo.json`**

```json
{
  "$schema": "https://turbo.build/schema.json",
  "pipeline": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": [".next/**", "dist/**", "build/**"]
    },
    "dev": {
      "cache": false,
      "persistent": true
    },
    "test": {
      "dependsOn": ["^build"],
      "outputs": ["coverage/**"]
    },
    "lint": {
      "outputs": []
    },
    "format": {
      "outputs": []
    },
    "format:check": {
      "outputs": []
    }
  }
}
```

**Key concepts:**

- **`dependsOn: ["^build"]`**: Build dependencies first (e.g., `shared` before `frontend`)
- **`outputs`**: Cached artifacts for faster rebuilds
- **`cache: false`**: Don't cache dev servers (they're stateful)
- **`persistent: true`**: Keep dev servers running

## Code Examples

### Adding a New Package

1. **Create package directory:**
   ```bash
   mkdir shared
   cd shared
   pnpm init
   ```

2. **Configure package.json:**
   ```json
   {
     "name": "shared",
     "version": "1.0.0",
     "main": "dist/index.js",
     "types": "dist/index.d.ts",
     "scripts": {
       "build": "tsc",
       "test": "vitest",
       "lint": "biome check ."
     },
     "devDependencies": {
       "@biomejs/biome": "^1.4.0",
       "typescript": "^5.3.0",
       "vitest": "^1.0.0"
     }
   }
   ```

3. **Add to workspace:**
   ```yaml
   # pnpm-workspace.yaml
   packages:
     - "frontend"
     - "backend"
     - "shared"  # Added
   ```

4. **Install from root:**
   ```bash
   pnpm install
   ```

### Using Shared Package

**In frontend/package.json:**
```json
{
  "name": "frontend",
  "dependencies": {
    "shared": "workspace:*"
  }
}
```

**Import in frontend code:**
```typescript
// frontend/app/page.tsx
import { QuizSchema } from 'shared/schemas/quiz'

const quiz = QuizSchema.parse(data)
```

**CRITICAL:** Shared package must be built before dependent packages can use it.

### Running Commands

**Run in all packages:**
```bash
pnpm build          # Runs turbo run build
pnpm test           # Runs turbo run test
pnpm lint           # Runs turbo run lint
```

**Run in specific package:**
```bash
pnpm --filter frontend dev
pnpm --filter backend test
pnpm --filter shared build
```

**Run in multiple packages:**
```bash
pnpm --filter frontend --filter backend dev
```

**Why use filters:**
- Faster feedback when working on single package
- Avoid running unnecessary tasks
- Useful in CI/CD for partial builds

### Task Dependencies

**Scenario:** Frontend depends on shared types

```json
// turbo.json
{
  "pipeline": {
    "build": {
      "dependsOn": ["^build"],  // Build deps first
      "outputs": [".next/**", "dist/**"]
    }
  }
}
```

**Result:**
```bash
pnpm build
# 1. Builds shared
# 2. Builds frontend (can import from shared)
# 3. Builds backend (can import from shared)
```

### Development Workflow

**Parallel dev servers:**

```json
// Root package.json
{
  "scripts": {
    "dev": "turbo run dev"
  }
}

// frontend/package.json
{
  "scripts": {
    "dev": "next dev"
  }
}

// backend/package.json
{
  "scripts": {
    "dev": "tsx watch src/app.ts"
  }
}
```

**Run:**
```bash
pnpm dev
# Starts both frontend and backend in parallel
```

**Why this works:**
- Turborepo runs `dev` task in all packages
- `persistent: true` keeps servers running
- `cache: false` ensures fresh state

## Common Pitfalls

### ❌ Installing Packages in Wrong Location

```bash
cd frontend
npm install zod  # ❌ Using npm instead of pnpm
```

**Fix:**
```bash
cd frontend
pnpm add zod  # ✅ Use pnpm
```

### ❌ Not Building Shared Before Using

```bash
pnpm --filter frontend dev  # ❌ Frontend can't import from unbuild shared
```

**Fix:**
```bash
pnpm --filter shared build  # Build shared first
pnpm --filter frontend dev  # Now frontend can import
```

**Better:** Let Turborepo handle it:
```bash
pnpm dev  # Turbo ensures correct order
```

### ❌ Circular Dependencies

```json
// frontend/package.json
{
  "dependencies": {
    "backend": "workspace:*"  // ❌ Frontend imports backend
  }
}

// backend/package.json
{
  "dependencies": {
    "frontend": "workspace:*"  // ❌ Backend imports frontend
  }
}
```

**Fix:** Use `shared` for common code:
```
shared/    (types, schemas)
  ↑    ↑
  |    |
frontend backend
```

### ❌ Forgetting to Add Package to Workspace

```yaml
# pnpm-workspace.yaml
packages:
  - "frontend"
  - "backend"
  # ❌ Forgot to add "shared"
```

**Result:** `shared` won't be linked, imports fail

**Fix:**
```yaml
packages:
  - "frontend"
  - "backend"
  - "shared"  # ✅ Added
```

## Commands Reference

### Installation

```bash
# Install all dependencies
pnpm install

# Install dependency in specific package
pnpm --filter frontend add react-hook-form
pnpm --filter backend add express

# Install dev dependency
pnpm --filter frontend add -D @types/node

# Install at root
pnpm add -D -w turbo  # -w = workspace root
```

### Running Scripts

```bash
# Run script in all packages (via Turbo)
pnpm dev
pnpm build
pnpm test
pnpm lint

# Run script in specific package
pnpm --filter frontend dev
pnpm --filter backend build
pnpm --filter shared test

# Run multiple scripts sequentially
pnpm build && pnpm test

# Run in all packages without Turbo
pnpm -r dev  # -r = recursive (all packages)
```

### Debugging

```bash
# Check workspace structure
pnpm list --depth 0

# Verify workspace links
pnpm why shared  # Shows which packages use 'shared'

# Clear cache
rm -rf node_modules .turbo
pnpm install

# Turbo dry run (see execution plan)
pnpm build --dry-run
```

## Testing Checklist

When setting up monorepo, verify:

- [ ] `pnpm install` succeeds without errors
- [ ] All packages listed in `pnpm-workspace.yaml`
- [ ] Internal dependencies use `workspace:*` protocol
- [ ] `pnpm dev` starts all dev servers
- [ ] `pnpm build` builds in correct order
- [ ] `pnpm test` runs all tests
- [ ] `pnpm lint` checks all packages
- [ ] Changes in `shared` reflect immediately in `frontend`/`backend`
- [ ] Turborepo cache works (second build is faster)
- [ ] Can run commands in specific packages with `--filter`

## Resources

- **Architecture:** See [/docs/architecture.md](/docs/architecture.md)
- **pnpm workspaces:** https://pnpm.io/workspaces
- **Turborepo docs:** https://turbo.build/repo/docs
