# Infra & Repo Steward Agent Playbook

This playbook scopes everything the Infra/Repo steward (aka "Infra agent") must handle inside QuizApp. Pair it with `docs/plan/agent-guide.md`, the relevant epics (`epic-00`, `epic-01`, `epic-02`), and the skills listed below.

## Mission
- Keep the monorepo, tooling, and deployment surfaces predictable.
- Own every folder that affects the developer environment: repository root, `infra/`, Devbox configs, docker-compose wiring, pnpm/turbo orchestration.
- Ensure any downstream agent can clone, install, lint, test, and ship without surprises.

## Files & Areas Under Your Control
- Root configs: `package.json`, `pnpm-workspace.yaml`, `turbo.json`, `.npmrc`, `.gitignore`, `.env.example`, CI workflows (future).
- Tooling: root `biome.json` (if added), shared TS configs, lint/format commands, Git hooks.
- Infrastructure: `infra/docker-compose.yml`, Dockerfiles, Devbox assets, future terraform/k8s placeholders.
- Docs touching tooling or infra: `docs/plan/epic-00`, `epic-01`, `epic-02`, plus sections in `AGENTS.md` relating to setup/commands.

## Required Skills (Auto-load before touching this area)
- `quizapp-monorepo`: pnpm workspaces, Turborepo, internal dependency wiring.
- `biome`: formatting + linting guardrails.
- `infra`: Docker, compose, runtime wiring.
- `devbox`: reproducible dev environments (when editing `.devbox/`).

## Default Workflow
1. **Load Skills:** Invoke the skills above so you inherit their guardrails.
2. **Review Docs:** Read `docs/plan/epic-00*.md` through `epic-02*.md`, `AGENTS.md`, and `docs/agents-and-skills.md` for the latest guidance.
3. **Plan Tasks:** Create todos per epic; keep one in-progress item at a time. Epics specify the intended commit message.
4. **Run Baseline Commands:** `pnpm install`, `pnpm dev`, `pnpm lint`, `pnpm test`, `pnpm format` to ensure changes don’t break workflows. For Docker, run `docker compose -f infra/docker-compose.yml up --build` when touching runtime files.
5. **Document:** Update `AGENTS.md`, `docs/plan/agent-guide.md`, or this playbook whenever responsibilities or commands change.
6. **Hand Off Clean:** Commit only when epics say so; leave notes in the epic file if something stays pending.

## Epics You Own
### Epic 00 · Agent Architecture Framework
- Maintain `docs/plan/agent-guide.md`, this playbook, and `AGENTS.md` so every agent knows their territory.
- Keep skill triggers fresh: whenever a new workflow appears, update the skills list + auto-invoke table.
- Deliverables: complete mapping of folders → owners → skills; synced docs between AGENTS and plan.

### Epic 01 · Monorepo & Quality Foundation
- Audit pnpm + turbo configs (`pnpm-workspace.yaml`, `turbo.json`, root scripts).
- Ensure each package exposes `dev/build/test/lint/format` scripts and shares consistent `tsconfig` + `biome` setups.
- Update README/AGENTS with accurate command tables; verify `pnpm dev` spins up the right tasks.

### Epic 02 · Docker & DevOps
- Own Dockerfiles under `infra/` plus compose orchestration; guarantee parity between local dev and containerized runs.
- Define environment variable strategy (samples, docs, future secrets management) without introducing live credentials.
- If Devbox is in play, keep `.devbox/` assets synced with docker requirements.

## Quality Checklist Before Handoff
- [ ] `pnpm install` succeeds without peer warnings.
- [ ] `pnpm lint`, `pnpm test`, `pnpm format` all pass from repo root.
- [ ] `pnpm dev` launches expected pipelines (Turbo handles fan-out to packages).
- [ ] Docker Compose builds cleanly and serves both backend + frontend when required.
- [ ] AGENT docs mention any new commands, scripts, or env vars.
- [ ] Pending tasks are noted inside the relevant epic with context + next steps.

## Communication & Notes
- Leave breadcrumbs in `docs/plan/epic-00*.md` – future agents rely on these checkboxes for continuity.
- When adding new tooling, describe why in `docs/architecture.md` or a dedicated section inside `docs/plan/`.
- Keep this file concise (~1 page). If responsibilities grow, split per sub-area (e.g., DevOps Agent) and reference here.

## Quick Commands Reference
```bash
pnpm install                # Install root + package deps
pnpm dev                    # Run Turbo dev pipeline
pnpm --filter frontend dev  # Frontend dev server
pnpm --filter backend dev   # Backend dev server (tsx watch)
pnpm build / lint / test    # Repo-wide tasks via Turbo
docker compose -f infra/docker-compose.yml up --build
docker compose -f infra/docker-compose.yml down
```

Document everything you touch; Infra is the backbone for every other agent. 
