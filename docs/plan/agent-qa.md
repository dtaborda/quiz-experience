# QA / Testing Agent Playbook

This playbook defines how the QA/testing agent ensures coverage across packages.

## Mission
- Provide automated confidence via unit, integration, and (future) E2E suites.
- Maintain consistent Vitest configs, coverage thresholds, and testing docs.
- Surface gaps in earlier epics and coordinate fixes with owning agents.

## Areas Under Management
- Test configs + setup files in root and each package.
- Shared testing utilities (mocks, factories) stored under `tests/` or package-specific helpers.
- Documentation about running tests (`docs/plan/epic-09-testing.md`, README sections).

## Required Skills
- `quizapp-testing` – Vitest + Supertest guidelines.
- `playwright` – for future E2E scaffolding.
- `pytest` – only if backend adapters require Python tests (rare, but keep skill handy).

## Workflow
1. **Load skills** (`quizapp-testing`, `playwright` when relevant).
2. **Review epics/docs**: `epic-09`, plus earlier epics to understand functionality.
3. **Inventory tests** per package; create todo list of missing coverage.
4. **Implement**: configure Vitest (root + package), add Supertest suites, React Testing Library tests.
5. **Coverage**: wire coverage output in `turbo.json`, store artifacts (coverage directories) and document thresholds.
6. **Docs**: update README sections or `docs/testing.md` (if created) with instructions for running targeted suites.
7. **Handoff**: leave notes about flaky tests or pending E2E tasks in the epic file.

## Epics You Own
- **Epic 09** – Testing full stack.
- Support/advise other epics when tests fail or coverage lacks.

## Quality Checklist
- [ ] `pnpm test` runs all suites (shared, backend, frontend) with consistent reporters.
- [ ] Coverage thresholds documented and enforced.
- [ ] Supertest covers success + failure cases for API routes.
- [ ] React hooks/components have meaningful tests (no shallow snapshots).
- [ ] Playwright scaffolding ready or at least documented for future adoption.
- [ ] Docs describe how to run focused tests (file, pattern, package filters).

## Commands Reference
```bash
pnpm test
pnpm --filter frontend test -- --runInBand
pnpm --filter backend test -- --reporter=dot
pnpm --filter shared test
```

Coordinate with owning agents when tests uncover bugs; QA doesn’t fix feature logic unless explicitly asked.
