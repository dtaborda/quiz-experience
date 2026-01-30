# QuizApp Infra – AI Agent Ruleset

> **Skills Reference**: Load these skills before editing:
> - [`infra`](../skills/infra/SKILL.md) – Dockerfiles, compose stacks, runtime wiring
> - [`devbox`](../skills/devbox/SKILL.md) – Devbox environment workflow
> - [`quizapp-monorepo`](../skills/quizapp-monorepo/SKILL.md) – pnpm workspace + Turbo orchestration

### Auto-invoke Skills

When performing these actions, ALWAYS invoke the corresponding skill FIRST:

| Action | Skill |
|--------|-------|
| Adding new packages to monorepo | `quizapp-monorepo` |
| Adding/removing packages from Devbox | `devbox` |
| Authoring Dockerfiles or docker-compose manifests | `infra` |
| Configuring Turborepo cache | `quizapp-monorepo` |
| Configuring Turborepo tasks | `quizapp-monorepo` |
| Configuring pnpm workspaces | `quizapp-monorepo` |
| Creating or updating infra/ files | `infra` |
| Debugging workspace resolution | `quizapp-monorepo` |
| Managing cross-package dependencies | `quizapp-monorepo` |
| Running commands in specific packages | `quizapp-monorepo` |
| Running pnpm/turbo tasks through Devbox | `devbox` |
| Setting up monorepo structure | `quizapp-monorepo` |
| Setting up or modifying Devbox for this repo | `devbox` |
| Setting up shared package | `quizapp-monorepo` |
| Touching deployment/runtime configuration for the monorepo | `infra` |
| Working with workspace protocol | `quizapp-monorepo` |

---

## CRITICAL RULES – NON-NEGOTIABLE

- Docker builds must install dependencies via pnpm and respect workspace structure; do not copy `node_modules` from host.
- Keep `.env.example` synchronized with compose services; never hardcode secrets in Dockerfiles.
- Compose file (`infra/docker-compose.yml`) is the single entry point for multi-service dev; document ports and volumes when they change.
- Devbox configs (if used) must mirror Docker requirements so both environments behave identically.
- Avoid platform-specific commands—scripts must run on macOS + Linux.

## DECISION TREES

```
Need reproducible CLI environment? → Update Devbox configs + docs.
Need container runtime parity? → Edit Dockerfiles + compose.
New script or tooling? → Update root package.json + AGENTS.
```

## TECH STACK
Docker · Docker Compose · pnpm · Turborepo · Devbox (optional)

## PROJECT STRUCTURE
```
infra/
├── docker-compose.yml   # Frontend + backend services
├── frontend.Dockerfile  # Next.js runtime image
├── backend.Dockerfile   # Express runtime image
└── README.md            # (Add notes when infra changes)
```

## COMMANDS
```bash
docker compose -f infra/docker-compose.yml up --build
docker compose -f infra/docker-compose.yml down
```

## QA CHECKLIST
- [ ] `docker compose ... up --build` succeeds and serves frontend + backend.
- [ ] Images use slim base + pnpm cache strategy; no unnecessary dev tooling in prod layers.
- [ ] Environment variables documented (`.env.example`, README, AGENTS).
- [ ] Devbox shell (if configured) works with `pnpm install` and `pnpm dev`.
