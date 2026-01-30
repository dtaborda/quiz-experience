# Epic 04 · Backend Agent – Quiz API

**Owner:** Backend agent  
**Skills:** `express`, `quizapp-api`, `quizapp-testing`

## Goal
Deliver a complete Express API serving quiz data from JSON files with robust middleware and tests.

## Tasks
- [ ] Expand quiz dataset under `backend/data/quizzes/` (minimum 3 quizzes).
- [ ] Enhance services with caching helpers and validation via `shared` schemas.
- [ ] Add middleware (request logging, validation errors, not-found handler).
- [ ] Implement routes/controllers aligned with `skills/quizapp-api` contract.
- [ ] Write Vitest + Supertest coverage for services and HTTP endpoints.
- [ ] Provide `pnpm --filter backend dev/test` docs in `backend/README.md`.

## Deliverables
- Fully functional `/api/health`, `/api/quizzes`, `/api/quizzes/:quizId` endpoints.
- Automated tests verifying responses and error cases.

## Definition of Done
- `pnpm --filter backend test` passes; coverage thresholds met if defined.
- API returns validated payloads matching shared schemas.

## Commit Guidance
`feat(backend): implement quiz api`

## Dependencies
- Epics 01–03 completed so shared schemas + tooling exist.
