# Epic 03 · Shared Agent – Contracts & Utils

**Owner:** Shared contracts agent  
**Skills:** `typescript`, `zod-4`

## Goal
Finalize the shared package with Zod schemas, reusable utilities, and published build artifacts.

## Tasks
- [ ] Review `shared/src` schemas (session, quiz, attempt, leaderboard) for completeness vs. `docs/use-cases.md`.
- [ ] Add TypeScript utilities (score calculator, shuffle helper) if required by frontend/backend.
- [ ] Configure build outputs (`dist/`) and ensure `pnpm --filter shared build` emits types + JS.
- [ ] Write Vitest suites validating schema behavior (happy path + failures).
- [ ] Document usage examples in `shared/README.md` (imports for frontend/backend).

## Deliverables
- Production-ready `shared` package published locally via workspace linking.
- Tests ensuring schema safety.

## Definition of Done
- Both frontend and backend can import from `shared` without TS complaints.
- `pnpm --filter shared test` passes.

## Commit Guidance
`feat(shared): add schemas and validation tests`

## Dependencies
- Epic 01 (tooling) done so builds/tests run consistently.
