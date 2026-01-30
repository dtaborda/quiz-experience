# Epic 09 · QA Agent – Testing Full Stack

**Owner:** QA/testing agent  
**Skills:** `quizapp-testing`, `playwright` (future), `pytest` (if backend adapters needed)

## Goal
Establish automated testing across packages (unit, integration, API) with coverage reporting integrated into Turbo.

## Tasks
- [ ] Configure Vitest root setup + per-package configs (frontend, backend, shared).
- [ ] Add Supertest suites for backend HTTP routes.
- [ ] Add React Testing Library tests for key frontend components + hooks.
- [ ] Wire coverage outputs into `turbo.json` pipeline and document thresholds.
- [ ] (Optional future) Prepare Playwright scaffolding for E2E.

## Deliverables
- `pnpm test` runs all suites; coverage artifacts saved.
- Documentation describing how to run focused tests (`pnpm --filter frontend test -- --runInBand`, etc.).

## Definition of Done
- Tests run green locally and in CI; failing tests block merges.
- Coverage meets agreed baseline (set in this epic).

## Commit Guidance
`test(app): add comprehensive coverage`

## Dependencies
- Feature epics (05–08) largely done so functionality exists to test.
