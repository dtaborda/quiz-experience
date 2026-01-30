# Epic 10 · Docs & DevEx Agent – Guides & Automation

**Owner:** Docs/DevEx agent  
**Skills:** `quizapp-docs`, `skill-creator`

## Goal
Polish developer experience with up-to-date documentation, convenience scripts, and optional git hooks.

## Tasks
- [ ] Refresh `README.md`, `docs/architecture.md`, `docs/use-cases.md` with final implementation details (screenshots, data flow).
- [ ] Update `docs/agents-and-skills.md` + `AGENTS.md` referencing the plan folder and any new skills.
- [ ] Add helper scripts (e.g., `pnpm dev:frontend`, `pnpm lint:fix`, `pnpm format:check`) and document them.
- [ ] Optionally configure Husky/pre-commit hooking lint/test (document opt-in).
- [ ] Summarize deployment instructions (Docker + pnpm) in docs.

## Deliverables
- Coherent documentation set enabling new contributors to onboard quickly.
- DevEX enhancements (scripts/hooks) checked in.

## Definition of Done
- All docs reference current architecture + plan files.
- Contributors can follow docs end-to-end without gaps.

## Commit Guidance
`docs(app): update guides and workflows`

## Dependencies
- Prior epics completed so docs can describe final state.
