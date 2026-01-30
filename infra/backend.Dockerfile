# syntax=docker/dockerfile:1.7

FROM node:20-bullseye AS base

ENV PNPM_HOME=/pnpm
ENV PATH="$PNPM_HOME:$PATH"

RUN corepack enable

WORKDIR /app

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY backend/package.json backend/package.json
COPY frontend/package.json frontend/package.json
COPY shared/package.json shared/package.json
COPY shared ./shared

RUN pnpm install --frozen-lockfile

RUN mkdir -p backend frontend

CMD ["pnpm", "--filter", "backend", "dev"]
