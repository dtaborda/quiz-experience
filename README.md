# QuizApp

## Index

* [Architecture Overview](#architecture-overview)
* [Product Specification (Use Cases)](#product-specification-use-cases)
* [Running the Project](#running-the-project)
* [Notes for AI Agents](#notes-for-ai-agents)

---

QuizApp is a small but realistic educational application designed to help users
learn and reinforce **AI software development concepts** such as agent design,
prompt engineering, workflow automation, and model selection.

The project is intentionally scoped to feel **complete and production-ready**,
while remaining simple enough to be extended or scaled in future iterations.

---

## Architecture Overview

QuizApp is implemented as a **monorepo** using **pnpm workspaces** and **Turborepo**,
with a clear separation of concerns:

* **Frontend**: Next.js (App Router) + TypeScript, Tailwind CSS, shadcn/ui
* **Backend**: Node.js + TypeScript + Express (REST API)
* **Persistence**: Browser `localStorage` (sessions, attempts, history)
* **Infrastructure**: Docker + Docker Compose
* **Proxy Strategy**: Next.js rewrites to `/api/*` (no CORS)
* **Testing**: Vitest (unit/integration) + Supertest (API)

The monorepo structure enables:

* modular development
* AI-agent-driven workflows
* consistent build, test, and dev orchestration

📐 Full technical decisions: **`docs/architecture.md`**

---

## Product Specification (Use Cases)

QuizApp is a **quiz-based learning platform** with the following core behaviors:

* Users authenticate locally (username only)
* Users select quiz categories and complete quizzes
* Each quiz supports multiple attempts
* Immediate feedback and explanations after each answer
* Final results with score and performance feedback
* Persistent history of completed attempts
* Optional learning-oriented and extensible features

Main functional areas:

* Home & navigation
* Quiz experience (questions, progress, feedback)
* Results & review
* History & leaderboard (local)
* Optional learning and extensibility features

🧩 Full functional specification: **`docs/use-cases.md`**
🎨 Wireframes: **`docs/wireframes.yaml`**

---

## Running the Project

### Local development

```bash
pnpm install
pnpm dev
```

### Docker

```bash
docker compose -f infra/docker-compose.yml up --build
```

---

## Notes for AI Agents

This project is designed for **AI-assisted development**.

Agents must:

* treat documentation in `docs/` as the source of truth
* implement features together with tests
* follow the defined architecture and use cases
