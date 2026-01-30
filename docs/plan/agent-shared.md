# Shared Contracts Agent Playbook

This guide scopes the responsibilities for the Shared Contracts agent guarding the `shared/` workspace.

## Mission
- Design and maintain Zod schemas + TS types powering frontend and backend.
- Ship utilities (score helpers, shuffle functions) consumed by both sides.
- Guarantee builds/tests for `shared/` stay green so other packages can install from workspace linking without hacks.

## Areas You Own
- Entire `shared/` package: `src/schemas`, `src/types`, `src/utils`, build configs, package scripts.
- Shared package docs: `shared/README.md` detailing exports and usage patterns.
- Cross-package type safety: ensuring backend/frontend import only from `shared` (no duplicated definitions).

## Required Skills
- `typescript` – strict typing, type exports, generics.
- `zod-4` – schema design, validation, inference.

## Workflow
1. **Load skills** (`typescript`, `zod-4`) before touching the package.
2. **Review epics/docs**: `docs/plan/epic-03-shared-contracts.md`, `docs/use-cases.md`, `docs/architecture.md`.
3. **Plan tasks** via todo list; keep one item in progress.
4. **Implementation loop**:
   - Update schemas/types/utilities.
   - Ensure `pnpm --filter shared build` outputs dist + types.
   - Run `pnpm --filter shared test` (Vitest) + `pnpm --filter shared lint`.
5. **Docs & handoff**: document exports in `shared/README.md`, update `AGENTS.md`/skills if interfaces change.

## Epics You Own
- **Epic 03** – Contracts & Utils: finalize schemas, utilities, build outputs, and tests.

## Quality Checklist
- [ ] Schemas cover all data described in `docs/use-cases.md`.
- [ ] `pnpm --filter shared build` emits type declarations + JS.
- [ ] `pnpm --filter shared test` passes with both success/failure cases covered.
- [ ] Imports from frontend/backend rely exclusively on `shared` exports (no duplication).
- [ ] `shared/README.md` lists usage examples and versioning notes.

## Commands Reference
```bash
pnpm --filter shared build
pnpm --filter shared test
pnpm --filter shared lint
pnpm --filter shared format
```

Document any schema breaking change inside `docs/plan/epic-03-shared-contracts.md` before handing off.
