# Epic 01 · Monorepo & Quality Foundation

**Owner:** Infra/Repo steward  
**Skills:** `quizapp-monorepo`, `biome`

## Goal
Establish consistent tooling (pnpm, Turbo, lint/format) and baseline documentation for the workspace.

## Tasks
- [ ] Verify `pnpm-workspace.yaml`, `turbo.json`, and root `package.json` scripts.
- [ ] Align Biome configs across `shared`, `backend`, `frontend` (indentation, import order, lint rules).
- [ ] Ensure each package has `tsconfig.json`, `biome.json`, and consistent scripts (`dev`, `build`, `test`, `lint`, `format`).
- [ ] Update `README.md` with workspace overview + commands table.
- [ ] Confirm `pnpm install` + `pnpm dev` works after alignment.

## Deliverables
- Standardized configs (tsconfig, Biome) in every package.
- Root documentation describing workspace commands.

## Definition of Done
- Running `pnpm dev` spins up all package dev scripts.
- Lint/format tasks succeed repo-wide.

## Commit Guidance
`chore(repo): scaffold monorepo foundation`

## Dependencies
- Epic 00 complete (agents + plan published).
