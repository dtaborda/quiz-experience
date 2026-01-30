# Epic 00 · Agent Architecture Framework

**Owner:** Infra/Repo steward + Docs/DevEx agent  
**Skills:** `quizapp-monorepo`, `quizapp-docs`, `skill-creator`

## Goal
Document responsibilities per folder, required skills, and workflow so every agent knows how to execute upcoming epics.

## Tasks
- [x] Map each workspace directory to an owner agent and required skills.
- [x] Document auto-invoke triggers and workflow in `AGENTS.md` / `docs/agents-and-skills.md`.
- [x] Create/refresh skills table (if needed) pointing to new docs.
- [x] Publish `docs/plan/agent-guide.md` and ensure all epics reference it.
- [x] Review with team (or leave notes) confirming the operating model.

## Deliverables
- Updated `AGENTS.md` and `docs/agents-and-skills.md` referencing new plan docs.
- `docs/plan/agent-guide.md` (this repo) plus this epic record.

### Notes (2026-01-30)
- Agent playbooks added under `docs/plan/agent-*.md` for infra, shared, backend, frontend, QA, and docs.
- Folder-specific `AGENTS.md` files now point to the relevant playbooks.
- Root `AGENTS.md` is trimmed to ~150 lines and mirrors `.github/copilot-instructions.md`.

## Definition of Done
- Every folder/epic has an assigned owner + skills.
- Plan docs accessible and referenced from root README/AGENTS.

## Commit Guidance
`docs(agents): define agent responsibilities`

## Dependencies
- None (run first).
