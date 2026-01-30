# QuizApp Repository Guidelines

## How to Use This Guide

- Start here for cross-project norms. QuizApp is a pnpm/Turborepo monorepo.
- Each component (`frontend/`, `backend/`, `shared/`, `infra/`, `docs/`) has its own `AGENTS.md` with deeper rules.
- Component docs override this file when guidance conflicts.
- Load the skills referenced in the relevant playbook (`docs/plan/agent-*.md`) before making any change.

## Available Skills

Use these skills for detailed patterns on-demand. Always read the SKILL before writing code that falls under its trigger.

### Generic Skills (Any Package)
| Skill | Description | URL |
|-------|-------------|-----|
| `typescript` | Const types, flat interfaces, utility types | [SKILL.md](skills/typescript/SKILL.md) |
| `react-19` | No `useMemo`/`useCallback`, React Compiler rules | [SKILL.md](skills/react-19/SKILL.md) |
| `nextjs-15` | App Router, Server Actions, streaming | [SKILL.md](skills/nextjs-15/SKILL.md) |
| `tailwind-4` | cn() helper, token palette, gradients | [SKILL.md](skills/tailwind-4/SKILL.md) |
| `zod-4` | Runtime validation (`z.email()`, `z.uuid()`) | [SKILL.md](skills/zod-4/SKILL.md) |
| `zustand-5` | Persist middleware, selectors, slices | [SKILL.md](skills/zustand-5/SKILL.md) |
| `ai-sdk-5` | Vercel AI SDK usage, streaming patterns | [SKILL.md](skills/ai-sdk-5/SKILL.md) |
| `playwright` | Page Object Model, selectors, fixtures | [SKILL.md](skills/playwright/SKILL.md) |
| `pytest` | Fixtures, mocking, parametrized tests | [SKILL.md](skills/pytest/SKILL.md) |
| `skill-creator` | Create/maintain AI skills + assets | [SKILL.md](skills/skill-creator/SKILL.md) |

### QuizApp-Specific Skills
| Skill | Description | URL |
|-------|-------------|-----|
| `quizapp-monorepo` | pnpm workspaces + Turborepo orchestration | [SKILL.md](skills/quizapp-monorepo/SKILL.md) |
| `quizapp-domain` | Attempt lifecycle, localStorage keys | [SKILL.md](skills/quizapp-domain/SKILL.md) |
| `quizapp-ui` | QuizApp UI structure, shadcn/ui patterns | [SKILL.md](skills/quizapp-ui/SKILL.md) |
| `quizapp-api` | Express API patterns, JSON data loading | [SKILL.md](skills/quizapp-api/SKILL.md) |
| `quizapp-testing` | Vitest + Supertest structure | [SKILL.md](skills/quizapp-testing/SKILL.md) |
| `quizapp-docs` | Documentation workflow + formatting | [SKILL.md](skills/quizapp-docs/SKILL.md) |
| `quizapp-commit` | Conventional commits guardrails | [SKILL.md](skills/quizapp-commit/SKILL.md) |
| `quizapp-pr` | Pull request template + gh workflow | [SKILL.md](skills/quizapp-pr/SKILL.md) |
| `infra` | Docker + runtime wiring | [SKILL.md](skills/infra/SKILL.md) |
| `devbox` | Devbox environments for QuizApp | [SKILL.md](skills/devbox/SKILL.md) |

### Auto-invoke Skills

When performing these actions, ALWAYS invoke the corresponding skill FIRST:

| Action | Skill |
|--------|-------|
| Adding DRF pagination or permissions | `django-drf` |
| Adding new packages to monorepo | `quizapp-monorepo` |
| Adding test coverage | `quizapp-testing` |
| Adding/removing packages from Devbox | `devbox` |
| After creating/modifying a skill | `skill-sync` |
| Authoring Dockerfiles or docker-compose manifests | `infra` |
| Building AI chat features | `ai-sdk-5` |
| Building Express middleware | `express` |
| Building Next.js routes | `nextjs-15` |
| Building QuizApp pages | `quizapp-ui` |
| Building leaderboard features | `quizapp-domain` |
| Committing changes | `quizapp-commit` |
| Configuring Biome | `biome` |
| Configuring Express app | `express` |
| Configuring Next.js data fetching | `nextjs-15` |
| Configuring Turborepo cache | `quizapp-monorepo` |
| Configuring Turborepo tasks | `quizapp-monorepo` |
| Configuring code formatting | `biome` |
| Configuring pnpm workspaces | `quizapp-monorepo` |
| Create a PR with gh pr create | `quizapp-pr` |
| Creating API endpoints with Express | `express` |
| Creating Express routes | `express` |
| Creating Jira epics | `jira-epic` |
| Creating Jira tasks | `jira-task` |
| Creating QuizApp API endpoints | `quizapp-api` |
| Creating QuizApp UI components | `quizapp-ui` |
| Creating ViewSets, serializers, or filters | `django-drf` |
| Creating Zod schemas | `zod-4` |
| Creating a git commit | `quizapp-commit` |
| Creating new AI skills | `skill-creator` |
| Creating or updating infra/ files | `infra` |
| Creating quiz flow components | `quizapp-ui` |
| Creating quiz sessions | `quizapp-domain` |
| Debugging workspace resolution | `quizapp-monorepo` |
| Defining shared contracts | `typescript` |
| Documenting feature or bug requests | `jira-task` |
| Documenting large initiatives | `jira-epic` |
| Enforcing const object patterns | `typescript` |
| Fill Context/Description/Steps to review/Checklist per docs/developer-guide | `quizapp-pr` |
| Fixing linting errors | `biome` |
| Handling attempt completion | `quizapp-domain` |
| Implementing JSON:API endpoints | `django-drf` |
| Implementing QuizApp frontend features | `quizapp-ui` |
| Implementing attempt lifecycle | `quizapp-domain` |
| Implementing backend quiz logic | `quizapp-api` |
| Implementing error handling in Express | `express` |
| Implementing learning mode | `quizapp-domain` |
| Implementing quiz attempt persistence | `quizapp-domain` |
| Implementing quiz history | `quizapp-domain` |
| Implementing randomized question order | `quizapp-domain` |
| Inspect PR CI workflows (.github/workflows/*): conventional-commit, pr-conflict-checker, labeler | `quizapp-pr` |
| Integrating Vercel AI SDK | `ai-sdk-5` |
| Loading quiz data from files | `quizapp-api` |
| Maintaining frontend E2E helpers | `playwright` |
| Managing active vs completed attempts | `quizapp-domain` |
| Managing cross-package dependencies | `quizapp-monorepo` |
| Managing user sessions | `quizapp-domain` |
| Mocking API responses | `quizapp-testing` |
| Mocking services with pytest | `pytest` |
| Modifying API responses | `django-drf` |
| Optimizing UI with React Compiler | `react-19` |
| Parsing request or response payloads | `zod-4` |
| Persisting client-side state | `zustand-5` |
| Regenerate AGENTS.md Auto-invoke tables (sync.sh) | `skill-sync` |
| Review PR requirements: template, title conventions, changelog gate | `quizapp-pr` |
| Running code quality checks | `biome` |
| Running commands in specific packages | `quizapp-monorepo` |
| Running pnpm/turbo tasks through Devbox | `devbox` |
| Setting up Express server | `express` |
| Setting up linting | `biome` |
| Setting up monorepo structure | `quizapp-monorepo` |
| Setting up or modifying Devbox for this repo | `devbox` |
| Setting up pre-commit hooks | `biome` |
| Setting up quiz API routes | `quizapp-api` |
| Setting up shared package | `quizapp-monorepo` |
| Structuring Zustand selectors | `zustand-5` |
| Styling QuizApp UI | `tailwind-4` |
| Syncing AGENTS and Copilot instructions | `quizapp-docs` |
| Testing API endpoints | `quizapp-testing` |
| Testing React components | `quizapp-testing` |
| Testing Zod schemas | `quizapp-testing` |
| Testing attempt lifecycle | `quizapp-testing` |
| Testing domain logic | `quizapp-testing` |
| Testing localStorage persistence | `quizapp-testing` |
| Touching deployment/runtime configuration for the monorepo | `infra` |
| Troubleshoot why a skill is missing from AGENTS.md auto-invoke | `skill-sync` |
| Understand review ownership with CODEOWNERS | `quizapp-pr` |
| Updating docs links or navigation | `quizapp-docs` |
| Updating existing skills | `skill-creator` |
| Using Zustand stores | `zustand-5` |
| Using shadcn/ui in QuizApp | `quizapp-ui` |
| Using shadcn/ui primitives | `tailwind-4` |
| Using the App Router or Server Actions | `nextjs-15` |
| Validating quiz API requests | `quizapp-api` |
| Validating runtime data | `zod-4` |
| Working with QuizApp UI structure | `quizapp-ui` |
| Working with React hooks | `react-19` |
| Working with Tailwind classes | `tailwind-4` |
| Working with localStorage persistence | `quizapp-domain` |
| Working with quiz JSON data | `quizapp-api` |
| Working with quiz domain logic | `quizapp-domain` |
| Working with workspace protocol | `quizapp-monorepo` |
| Writing Playwright E2E tests | `playwright` |
| Writing Python tests | `pytest` |
| Writing React components | `react-19` |
| Writing Supertest API tests | `quizapp-testing` |
| Writing TypeScript types or interfaces | `typescript` |
| Writing Vitest unit tests | `quizapp-testing` |
| Writing documentation | `quizapp-docs` |
| Writing integration tests | `quizapp-testing` |
| Writing tests | `quizapp-testing` |

---

## Project Overview

QuizApp is a quiz-based learning platform for AI software development concepts.

| Component | Location | Tech Stack |
|-----------|----------|------------|
| Frontend | `frontend/` | Next.js 15, React 19, Tailwind 4, Zustand 5 |
| Backend | `backend/` | Node 20, Express, TypeScript |
| Shared contracts | `shared/` | Zod 4 + TypeScript |
| Infrastructure | `infra/` | Docker, Compose, Devbox |
| Documentation | `docs/` | Markdown, diagrams, skill catalog |

## Commands & Tooling

```bash
pnpm install                   # Install once per machine
pnpm dev                       # Turbo dev pipeline (all packages)
pnpm --filter frontend dev     # Frontend dev server (Next.js)
pnpm --filter backend dev      # Backend watcher (tsx)
pnpm build / pnpm test / pnpm lint / pnpm format
docker compose -f infra/docker-compose.yml up --build
```

## Workflow Rules

1. Load the skills specified in the relevant playbook (`docs/plan/agent-*.md`).
2. Check the matching epic in `docs/plan/epic-xx-*.md` for scope + commit message.
3. Track multi-step tasks with the todo tool (one active item at a time).
4. Never introduce databases—backend stays JSON files, frontend persists via localStorage keys from `quizapp-domain`.
5. Use `bat`, `rg`, `fd`, `sd`, `eza` instead of legacy CLI tooling whenever possible.

## Code & Domain Standards

- Strict TypeScript everywhere (`noImplicitAny`, no `@ts-ignore`).
- Shared schemas/types live only in `shared/`; import them via workspace protocol.
- Frontend UI must be intentional: layered backgrounds, purposeful motion, responsive from 360px to widescreen.
- Backend Express routes validate inputs with Zod and funnel errors through centralized middleware.
- One active attempt per quiz; completed attempts immutable. Persist order + mode for resumes.

## Commit & PR Guidelines

- Conventional commits only: `<type>(<scope>): <description>`.
- Run `pnpm lint`, `pnpm test`, and `pnpm format` before committing.
- Use `.github/pull_request_template.md` when opening PRs; include screenshots for UI changes.
- Never push without user approval; default to draft PRs until validation passes.

## QA Checklist Before Handoff

- [ ] Feature matches requirements in `docs/use-cases.md` + relevant epic.
- [ ] All packages touched pass lint/test/format (`pnpm lint`, `pnpm test`, `pnpm format`).
- [ ] Local dev servers (`pnpm dev` or scoped dev) start cleanly.
- [ ] Docs/playbooks updated for new workflows or invariants.
- [ ] No secrets committed; .env-style values documented separately.

## References

- Architecture: `docs/architecture.md`
- Use cases & flows: `docs/use-cases.md`
- Wireframes: `docs/wireframes.yaml`
- Agent plan: `docs/plan/agent-guide.md`
- Skills catalog: `docs/agents-and-skills.md` and `skills/**/SKILL.md`

Mirror this file into `.github/copilot-instructions.md` whenever it changes so hosted copilots stay in sync.
