# Epic 06 · Frontend Agent – Domain State & Hooks

**Owner:** Frontend agent  
**Skills:** `quizapp-domain`, `zustand-5`, `typescript`

## Goal
Implement persistent session/attempt state, API wrappers, and domain hooks powering the quiz flow.

## Tasks
- [ ] Build Zustand stores `stores/session.ts` and `stores/attempt.ts` with selectors and persistence to localStorage keys defined in `quizapp-domain`.
- [ ] Implement utilities `lib/local-storage.ts`, `lib/api.ts`, `lib/score-calculator.ts`.
- [ ] Integrate TanStack Query (React Query) for quiz fetching + caching.
- [ ] Create hooks `useSession`, `useQuizAttempt`, `useQuizData` with strict typing.
- [ ] Add unit tests for stores/hooks (Vitest + React Testing Library if needed).

## Deliverables
- Domain logic accessible via hooks/stores with deterministic behavior.
- Tests validating lifecycle rules (one active attempt per quiz, etc.).

## Definition of Done
- All localStorage keys managed consistently; hydration/resume scenarios covered.
- `pnpm --filter frontend test` covers stores/hooks.

## Commit Guidance
`feat(frontend): add domain state management`

## Dependencies
- Epic 05 (UI shell) complete to host hooks; Epic 04 backend available for data.
