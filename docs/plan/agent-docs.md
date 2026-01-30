# Docs & DevEx Agent Playbook

This playbook covers documentation and developer-experience responsibilities.

## Mission
- Keep every doc up to date (README, architecture, use cases, plan epics, AGENTS).
- Maintain skills metadata, automate repetitive workflows, and improve onboarding scripts.
- Ensure AI + human contributors share the same source of truth.

## Areas Under Management
- `docs/` folder (architecture, use-cases, plan, wireframes, agents-and-skills).
- `AGENTS.md`, `.github/copilot-instructions.md`, skill metadata, and mnemonic guides.
- DevEx tooling: helper scripts in root `package.json`, git hooks (optional), onboarding instructions.

## Required Skills
- `quizapp-docs`
- `skill-creator` (when adding/updating skills)
- `quizapp-commit`/`quizapp-pr` when guiding collaboration (optional)

## Workflow
1. **Load skills** `quizapp-docs` (+ `skill-creator` if editing skills).
2. **Review** `docs/plan/epic-10-docs-devex.md` plus AGENTS + skills inventory.
3. **Audit** docs for drift; create todo list (screenshots, diagrams, instructions, script updates).
4. **Update** markdown + assets; keep instructions concise and ASCII-friendly.
5. **Sync** AGENTS and Copilot instructions so both share identical content.
6. **Enhance DevEx**: add scripts (`pnpm dev:frontend`, etc.), optional Husky hooks, onboarding checklists.
7. **Handoff**: mark epic checkboxes, log remaining gaps, notify other agents when docs require action.

## Epics You Own
- **Epic 10** – Docs & DevEx.
- Support Epic 00 (agent architecture) when new roles/skills appear.

## Quality Checklist
- [ ] README, architecture, and use-case docs describe current implementation.
- [ ] `AGENTS.md` + `.github/copilot-instructions.md` stay in sync.
- [ ] `docs/plan/` epics reflect latest status (checkboxes, notes).
- [ ] Skills list updated when workflows change; `skills/README.md` references new assets.
- [ ] Helper scripts documented; onboarding steps reproducible end-to-end.

## Commands Reference
```bash
pnpm dev
pnpm lint
pnpm test
pnpm format
```

Document any new conventions immediately; stale docs block future agents.
