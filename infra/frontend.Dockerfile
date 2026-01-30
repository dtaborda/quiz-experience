# syntax=docker/dockerfile:1.7

FROM node:20-bullseye AS base

ENV PNPM_HOME=/pnpm
ENV PATH="$PNPM_HOME:$PATH"
ENV NEXT_TELEMETRY_DISABLED=1

RUN corepack enable

WORKDIR /app

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY frontend/package.json frontend/package.json
COPY backend/package.json backend/package.json
COPY shared/package.json shared/package.json
COPY shared ./shared

RUN pnpm install --frozen-lockfile

# Ensure directories exist even before bind mounts
RUN mkdir -p frontend backend

CMD ["pnpm", "--filter", "frontend", "dev"]
