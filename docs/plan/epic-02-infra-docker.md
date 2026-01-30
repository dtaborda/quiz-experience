# Epic 02 · Infra Agent – Docker & DevOps

**Owner:** Infra agent  
**Skills:** `infra`, `devbox`

## Goal
Provide reproducible runtime via Docker Compose plus optional Devbox environment for contributors.

## Tasks
- [x] Create `infra/docker-compose.yml` with frontend + backend services (shared network, env vars, volumes for hot reload).
- [x] Author `frontend.Dockerfile` (multi-stage: deps, builder, runtime) tailored to Next.js 15.
- [x] Author `backend.Dockerfile` (multi-stage) with production-ready Express server.
- [x] Add `.env.example` covering all required environment variables.
- [x] Document usage (`pnpm dev`, `docker compose up`, Devbox instructions) in `docs/infra.md` or README.

## Deliverables
- Working Docker setup verified by running full stack via Compose.
- Developer documentation describing workflows and troubleshooting tips.

## Definition of Done
- `docker compose up --build` starts both services and they communicate.
- Environment variables templated and ignored appropriately.

## Commit Guidance
`chore(infra): add docker stack`

## Dependencies
- Epic 01 completed (consistent scripts available).
