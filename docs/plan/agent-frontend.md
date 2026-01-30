# Frontend Agent Playbook

This playbook outlines how the Frontend agent operates inside `frontend/` (Next.js 15).

## Mission
- Build the entire quiz experience (shell, state hooks, UI flows, results) using Next.js 15, React 19, Tailwind 4, shadcn/ui, and Zustand 5.
- Ensure frontend tooling, linting, and testing follow repo guardrails.
- Deliver polished UX with responsive layouts and purposeful motion.

## Areas You Own
- `frontend/app/**`: App Router routes, layouts, loaders.
- `frontend/components/**`: shadcn/ui primitives + quiz components.
- `frontend/stores/**`, `frontend/lib/**`, `frontend/hooks/**`.
- Frontend configs: `tsconfig.json`, `next.config.mjs`, Tailwind/PostCSS configs, `vitest.config.ts`.
- Frontend documentation (`frontend/README.md`, design notes if any).

## Required Skills
- `nextjs-15`
- `react-19`
- `tailwind-4`
- `quizapp-ui`
- `quizapp-domain`
- `zustand-5`
- (as needed) `ai-sdk-5` for chat features, `quizapp-testing` for tests.

## Workflow
1. **Load relevant skills** before editing (shell/UI vs domain vs state tasks).
2. **Read epics**: `epic-05` to `epic-08`, plus `docs/use-cases.md`, `docs/wireframes.yaml`.
3. **Plan tasks** per epic and track via todo list.
4. **Implementation order**:
   - Epic 05: configure shell + base components.
   - Epic 06: domain stores/hooks + utilities.
   - Epic 07: quiz flow UI.
   - Epic 08: results/history/leaderboard.
5. **Testing**: use Vitest + React Testing Library for hooks/components; run `pnpm --filter frontend test` often.
6. **Styling**: follow Tailwind tokens + design rules (no bland backgrounds, purposeful animations).
7. **Docs**: update `frontend/README.md` with commands, architecture notes, component diagrams if helpful.

## Epics You Own
- **05** – Next.js shell & tooling.
- **06** – Zustand stores, localStorage persistence, hooks.
- **07** – Quiz flow UI.
- **08** – Results, history, leaderboard.

## Quality Checklist
- [ ] `pnpm --filter frontend dev` runs without warnings; hot reload + lint clean.
- [ ] LocalStorage keys managed exactly as defined in `quizapp-domain` skill.
- [ ] UI responsive from 360px to desktop; animations purposeful.
- [ ] Hooks + stores fully tested; E2E paths validated manually until Playwright arrives.
- [ ] Accessibility baseline: semantic elements, ARIA where necessary, keyboard focus maintained.
- [ ] Docs updated with component/state diagrams if flows evolve.

## Commands Reference
```bash
pnpm --filter frontend dev
pnpm --filter frontend build
pnpm --filter frontend test
pnpm --filter frontend lint
pnpm --filter frontend format
```

Any new UI patterns should be captured in `skills/quizapp-ui` or `docs/plan/epic-0x` before handoff.
