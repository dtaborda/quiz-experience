# Backend Agent Playbook

This playbook defines how the Backend agent maintains the Express API under `backend/`.

## Mission
- Deliver resilient quiz APIs backed by JSON data + `shared` schemas.
- Keep backend tooling (tsconfig, lint/test scripts) aligned with repo standards.
- Provide clear docs so other agents understand how to run and extend the API.

## Areas Under Management
- `backend/src/**`: routes, controllers, services, middleware, type definitions.
- `backend/data/quizzes/` JSON datasets.
- Backend-specific configs: `tsconfig.json`, `biome.json`, `vitest.config.ts`, `package.json` scripts.
- `backend/README.md` and any backend dev notes in docs.

## Required Skills
- `express` – middleware, routing, error handling best practices.
- `quizapp-api` – domain-specific API patterns (file storage, validation, endpoints).
- `quizapp-testing` – Vitest + Supertest structure.

## Workflow
1. **Load skills** (`express`, `quizapp-api`, `quizapp-testing`).
2. **Review docs**: `docs/plan/epic-04-backend-api.md`, `shared/README.md`, `docs/use-cases.md` for contract expectations.
3. **Plan** tasks per epic; track progress via todo list.
4. **Implement** services/routes first, then controllers + middleware (logging, errors, validation).
5. **Test**: run `pnpm --filter backend test`, enforce coverage, and add Supertest suites for all routes.
6. **Document**: update `backend/README.md` with setup commands, environment notes, dataset info.
7. **Handoff**: leave notes in epic file; ensure data+schemas remain synchronized.

## Epics You Own
- **Epic 04** – Quiz API: dataset expansion, services with caching/validation, middleware, endpoints, Supertest suites.
- (Supports) **Epic 05–08** by providing stable endpoints once API is live.

## Quality Checklist
- [ ] `pnpm --filter backend dev` runs without TS errors (tsx watch).
- [ ] Endpoints `/api/health`, `/api/quizzes`, `/api/quizzes/:quizId` return data validated against `shared` schemas.
- [ ] Error middleware handles 404, 400, and unexpected failures consistently.
- [ ] Vitest + Supertest suites cover services and HTTP routes; coverage target documented.
- [ ] `backend/README.md` explains dataset structure, commands, and environment vars.

## Commands Reference
```bash
pnpm --filter backend dev
pnpm --filter backend build
pnpm --filter backend test
pnpm --filter backend lint
pnpm --filter backend format
```

Keep JSON data sanitized (no secrets). Document any new endpoints inside `docs/plan/epic-04-backend-api.md`.
