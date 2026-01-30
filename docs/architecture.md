# QuizApp — Architecture (Monorepo, Tooling, Docker & Testing)

## Goal

Build a small but realistic **AI Development Quiz App** using the **Node + React ecosystem**, demonstrating:

* clean architecture and scalable structure
* reproducible environment (Docker)
* **AI-assisted development** where AI is the primary developer and the engineer is the orchestrator

This document defines the **final stack**, the **monorepo strategy**, how we run the app in **dev** and **Docker**, and the **testing strategy** (including why we chose the tools).

---

## Final Stack (locked)

### Monorepo / Tooling

* **pnpm workspaces** — one dependency graph across packages, fast installs, efficient disk usage.
* **Turborepo** — orchestrates tasks (`dev`, `build`, `test`, `lint`) across packages, respects dependency ordering, and caches build outputs.

### Frontend

* **Next.js (App Router) + TypeScript** — production-grade React structure (routing/layouts), clear boundaries for agents.
* **Tailwind CSS** — fast styling, consistent UI.
* **shadcn/ui** — accessible UI primitives built on Tailwind, accelerates UI delivery.
* **React Hook Form + Zod** — minimal form boilerplate + strong validation.
* **TanStack Query (React Query)** — standardized fetching, caching, loading/error states.
* **Zustand** — minimal global state (session + attempt metadata).
* **localStorage** — browser persistence for session, active attempts, and history (explicitly acceptable for this challenge).
* **Biome** - Linting & Formatting

### Backend

* **Node.js + TypeScript + Express** — simple REST API boundary.
* **Quiz data as JSON files** — stored under `backend/data/quizzes/*.json` and served by API.
* **No database** — user state persists in localStorage (browser). Backend acts as data provider + contract boundary.
* **Biome** - Linting & Formatting

### Testing

* **Vitest** — unit/integration tests for shared logic and frontend pure logic.
* **Supertest + Vitest** — API endpoint tests for Express.

### Infra

* **Docker + Docker Compose** — reproducible multi-service runtime.
* **Next.js rewrites** — proxy `/api/*` to backend to avoid CORS.

---

## Monorepo Strategy

### What is a monorepo?

A **single Git repository** containing multiple packages/services that together form one product:

* `frontend` (Next.js)
* `backend` (Node API)
* `shared` (schemas/contracts)
* `infra` (Docker)

### Why monorepo for this challenge

* Shared contracts/types are versioned together.
* Simplifies AI-agent workflows: implement by module without repo switching.
* Product-level structure that scales.

---

## Why pnpm workspaces

### Problem it solves

Multiple projects normally mean duplicated installs and inconsistent dependency graphs.

pnpm workspaces gives:

* a single workspace dependency graph
* fast installs and minimal disk duplication
* clean linking between local packages

### Required file: `pnpm-workspace.yaml`

Defines workspace packages:

```yaml
packages:
  - "frontend"
  - "backend"
  - "shared"
```

---

## Why Turborepo

### What Turborepo is (and is not)

Turborepo is a **task orchestrator** for monorepos.

* It runs tasks across packages (`dev`, `build`, `test`, `lint`).
* It respects package dependency order.
* It caches build outputs for speed.

It is **not**:

* a bundler
* a runtime server
* a replacement for pnpm

### Why it’s a good fit here

* The challenge rewards **structured delivery** and **agent orchestration**.
* Agents can work per module and run only relevant tasks.
* Cache reduces repeated work during iterative AI-driven changes.

### `turbo.json` (baseline)

```json
{
  "pipeline": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": ["dist/**", ".next/**"]
    },
    "dev": {
      "cache": false
    },
    "test": {
      "dependsOn": ["^build"],
      "outputs": []
    },
    "lint": {
      "outputs": []
    }
  }
}
```

**Interpretation**

* `dependsOn: ["^build"]`: build dependencies first (e.g., `shared` before `frontend`).
* `outputs`: Turbo caches these artifacts.
* `dev.cache=false`: dev runs live (no cache).

---

## Folder Structure (final)

```txt
quizapp/
├── frontend/                 # Next.js
│   ├── app/
│   ├── components/
│   ├── stores/
│   ├── lib/
│   └── package.json
│
├── backend/                  # Node + Express
│   ├── src/
│   ├── data/
│   │   └── quizzes/
│   │       └── agent-fundamentals.json
│   └── package.json
│
├── shared/                   # contracts / schemas
│   ├── schemas/
│   └── package.json
│
├── infra/                    # Docker & env
│   ├── docker-compose.yml
│   ├── frontend.Dockerfile
│   └── backend.Dockerfile
│
├── wireframes.yaml
├── README.md
├── package.json              # root scripts
├── pnpm-workspace.yaml
└── turbo.json
```

---

## Root Scripts

Root `package.json` exposes single commands for the repo:

* `pnpm dev` → runs FE + BE dev servers (Turbo)
* `pnpm build` → builds packages in correct order
* `pnpm test` → runs test tasks across packages
* `pnpm lint` → runs lint

Conceptually:

```json
{
  "scripts": {
    "dev": "turbo run dev",
    "build": "turbo run build",
    "test": "turbo run test",
    "lint": "turbo run lint"
  }
}
```

---

## Docker Integration

### Dev workflow (recommended)

Fastest feedback loop:

```bash
pnpm install
pnpm dev
```

### Docker workflow (demo / reproducibility)

```bash
docker compose -f infra/docker-compose.yml up --build
```

**Important**
Docker does not automatically “use Turbo”. Docker executes whatever you define in Dockerfiles/compose commands.

---

## Avoiding CORS (Proxy Strategy)

### Problem

Frontend and backend run on different ports in dev:

* frontend: `localhost:3000`
* backend: `localhost:3001`

Cross-origin requests can cause CORS issues.

### Solution

Use **Next.js rewrites** so the browser always calls the frontend origin:

* browser calls: `/api/*`
* Next proxies internally to backend

Result:

* no CORS configuration needed
* consistent API paths in dev + docker

---

## Backend API (minimal but correct)

### Endpoints (final)

* `GET /api/health`
* `GET /api/quizzes` (list: id, title, description)
* `GET /api/quizzes/:quizId` (full quiz)

### Data storage

Quizzes are static JSON files under:

```txt
backend/data/quizzes/*.json
```

Backend loads them and returns API responses.

---

## Authentication & Persistence (challenge scope)

### Authentication

No real authentication. Implement **local session** only:

* user enters `username`
* store in `localStorage` as `quizapp:session`

### User progress

All progress lives in the browser:

* active attempt state
* completed attempt history
* learn mode flag
* randomized order (stable per attempt)

Stored in localStorage keys:

* `quizapp:session`
* `quizapp:attempts`
* `quizapp:activeAttemptByQuiz`

---

## Testing Strategy (required by the challenge)

### Why tests are included

The challenge explicitly expects tests as part of AI-driven delivery:

* AI writes endpoints, business logic, **and tests**.

We implement a **minimal but credible** test suite:

* cover core logic and key API routes
* avoid heavy E2E scope

### Testing tools (locked)

* **Vitest** for unit/integration tests
* **Supertest + Vitest** for Express API tests

### What we test

#### Shared (contracts)

* Validate that quiz JSON files match `QuizSchema`.

#### Backend (API)

* `GET /api/health` → 200
* `GET /api/quizzes` → list shape
* `GET /api/quizzes/:quizId` → full quiz shape
* unknown quizId → 404

#### Frontend (logic only)

We test pure logic/helpers/selectors (not full browser E2E):

* score calculation
* leaderboard derivation from attempts
* randomized order stable per attempt
* attempt completion rules

### Definition of Done (DoD)

A feature is only “Done” when:

1. implementation matches the spec
2. tests are added/updated
3. `pnpm test` passes

---

## Why Vitest + Supertest (instead of Jest)

### Vitest (why)

* **Modern, fast**, and built for TypeScript-first projects.
* **Great DX** (watch mode, speed) → ideal for iterative agent workflows.
* Works smoothly in monorepos and aligns well with Vite/modern tooling ecosystems.
* API is familiar for developers coming from Jest, but typically faster in practice.

### Supertest + Vitest (why)

* Supertest is the standard lightweight way to test **Express endpoints** without running a real server.
* Pairing it with Vitest keeps a **single test runner** across the repo.
* Minimal setup, maximum signal for the challenge: endpoints + status codes + payload shape.

### Why not Jest here

* Jest is still widely used, but generally heavier/slower to configure in modern TS monorepos.
* Using Vitest provides faster iteration, simpler tooling alignment, and a single runner story.

---

## Quick Commands

### Local dev

```bash
pnpm install
pnpm dev
```

### Build

```bash
pnpm build
```

### Test

```bash
pnpm test
```

### Docker

```bash
docker compose -f infra/docker-compose.yml up --build
```
