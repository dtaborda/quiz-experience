# Agent Execution Guide

This guide assigns ownership per workspace folder and references the skills each agent must load before working. All tasks reference the epics in `docs/plan/`.

| Area | Owner Agent | Primary Skills | Key Responsibilities |
| --- | --- | --- | --- |
| Root / Tooling | Infra/Repo Steward ([playbook](./agent-infra.md)) | `quizapp-monorepo`, `biome` | Maintain pnpm workspace, Turbo, repo-wide scripts, lint/format policies. |
| `infra/` | Infra Agent ([playbook](./agent-infra.md)) | `infra`, `devbox` | Docker stack, compose orchestration, environment variables, Devbox configs. |
| `shared/` | Shared Contracts Agent ([playbook](./agent-shared.md)) | `typescript`, `zod-4` | Zod schemas, shared types, utils, publishable build outputs. |
| `backend/` | Backend Agent ([playbook](./agent-backend.md)) | `express`, `quizapp-api`, `quizapp-testing` | Express app, data loaders, API routes, backend tests. |
| `frontend/` | Frontend Agent ([playbook](./agent-frontend.md)) | `nextjs-15`, `react-19`, `tailwind-4`, `quizapp-ui`, `zustand-5`, `ai-sdk-5` (if chat) | Next.js UI, Zustand stores, quiz flow, frontend tests. |
| Cross-cutting Testing | QA Agent ([playbook](./agent-qa.md)) | `quizapp-testing`, `playwright` (future) | Vitest + Supertest suites, coverage, future E2E stories. |
| Documentation | Docs/DevEx Agent ([playbook](./agent-docs.md)) | `quizapp-docs`, `skill-creator` (if needed) | README, architecture docs, agent/skill updates. |

## Operating Model

1. **Load relevant skill(s)** before editing a folder.
2. **Check the matching epic** in `docs/plan/epic-xx-*.md` for scope, tasks, and expected commit.
3. **Complete tasks sequentially**, ticking checkboxes (via git diffs) to reflect progress.
4. **Run required checks** (lint, test, build) per epic before committing.
5. **Commit once per epic** using the message listed in the epic file.

## Epic Pipeline

| Epic | Summary | Agent |
| --- | --- | --- |
| 00 | Agent architecture + responsibilities | Infra/Repo steward + Docs agent |
| 01 | Monorepo & quality foundation | Infra/Repo steward |
| 02 | Docker & DevOps | Infra agent |
| 03 | Shared contracts & utils | Shared contracts agent |
| 04 | Backend quiz API | Backend agent |
| 05 | Frontend Next.js shell | Frontend agent |
| 06 | Frontend domain state | Frontend agent |
| 07 | Frontend quiz flow UI | Frontend agent |
| 08 | Results, history, leaderboard | Frontend agent |
| 09 | Testing full-stack | QA agent |
| 10 | Docs & DevEx | Docs/DevEx agent |

The expectation is that each agent updates their epic file with status notes and commits, enabling any future agent to resume work instantly.
