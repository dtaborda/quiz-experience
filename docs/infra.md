# Infra & Docker Workflow

This guide explains how to run QuizApp via Docker Compose and documents the environment variables required for local containers.

## Prerequisites

- Docker Desktop, Rancher, or any engine that supports Compose v3.9+
- Node 20 + pnpm (if you still run `pnpm dev` outside containers)
- Copy `.env.example` to `.env` and tweak the ports or API base URL as needed:

```bash
cp .env.example .env
```

## Docker Compose

`infra/docker-compose.yml` defines two services:

| Service | Description | Ports |
| --- | --- | --- |
| `backend` | Express API (`pnpm --filter backend dev`) | `${BACKEND_PORT:-3001}` |
| `frontend` | Next.js dev server (`pnpm --filter frontend dev`) | `${FRONTEND_PORT:-3000}` |

Both services share a bridge network (`quizapp`) and mount the repo folders (`frontend/`, `backend/`, `shared/`) for hot reload. Node modules are baked into the image so you still get fast start-up.

### Commands

```bash
# Build images + start services
docker compose -f infra/docker-compose.yml up --build

# Follow logs
docker compose -f infra/docker-compose.yml logs -f

# Stop and remove containers
docker compose -f infra/docker-compose.yml down
```

## Environment Variables (`.env`)

| Name | Default | Purpose |
| --- | --- | --- |
| `FRONTEND_PORT` | `3000` | Port exposed by Next.js dev server |
| `BACKEND_PORT` | `3001` | Port exposed by Express API |
| `NEXT_PUBLIC_API_BASE_URL` | `http://localhost:3001` | URL injected into frontend (must match backend service) |

> `.env` is ignored by git; keep using `.env.example` for new values.

## Devbox (Optional)

A Devbox profile can wrap the same workflow. If you add or modify `.devbox/` configs, remember to run the `devbox` skill first and document the steps here.

## Troubleshooting

- **Port already in use** – override `FRONTEND_PORT` / `BACKEND_PORT` in `.env`.
- **Code changes not hot reloading** – ensure bind mounts are active (`docker compose ...` log should show `:cached` volumes). Restart containers if necessary.
- **Dependencies missing** – rebuild images (`docker compose ... up --build`) to refresh `node_modules` baked into the base images.
