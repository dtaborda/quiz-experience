# QuizApp Frontend – AI Agent Ruleset

> **Skills Reference**: For detailed patterns, load these skills before editing:
> - [`quizapp-ui`](../skills/quizapp-ui/SKILL.md) – Quiz UI structure, shadcn/ui usage
> - [`react-19`](../skills/react-19/SKILL.md) – React Compiler, hook ordering
> - [`nextjs-15`](../skills/nextjs-15/SKILL.md) – App Router, Server Components
> - [`tailwind-4`](../skills/tailwind-4/SKILL.md) – Styling tokens, cn() helper
> - [`quizapp-domain`](../skills/quizapp-domain/SKILL.md) – Attempt lifecycle, persistence
> - [`zustand-5`](../skills/zustand-5/SKILL.md) – Stores, selectors, persist middleware
> - [`ai-sdk-5`](../skills/ai-sdk-5/SKILL.md) – Chat UI patterns (only when applicable)

### Auto-invoke Skills

When performing these actions, ALWAYS invoke the corresponding skill FIRST:

| Action | Skill |
|--------|-------|
| Adding test coverage | `quizapp-testing` |
| Building AI chat features | `ai-sdk-5` |
| Building Next.js routes | `nextjs-15` |
| Building QuizApp pages | `quizapp-ui` |
| Building leaderboard features | `quizapp-domain` |
| Configuring Biome | `biome` |
| Configuring Next.js data fetching | `nextjs-15` |
| Configuring code formatting | `biome` |
| Creating QuizApp UI components | `quizapp-ui` |
| Creating Zod schemas | `zod-4` |
| Creating quiz flow components | `quizapp-ui` |
| Creating quiz sessions | `quizapp-domain` |
| Defining shared contracts | `typescript` |
| Enforcing const object patterns | `typescript` |
| Fixing linting errors | `biome` |
| Handling attempt completion | `quizapp-domain` |
| Implementing QuizApp frontend features | `quizapp-ui` |
| Implementing attempt lifecycle | `quizapp-domain` |
| Implementing learning mode | `quizapp-domain` |
| Implementing quiz attempt persistence | `quizapp-domain` |
| Implementing quiz history | `quizapp-domain` |
| Implementing randomized question order | `quizapp-domain` |
| Integrating Vercel AI SDK | `ai-sdk-5` |
| Maintaining frontend E2E helpers | `playwright` |
| Managing active vs completed attempts | `quizapp-domain` |
| Managing user sessions | `quizapp-domain` |
| Mocking API responses | `quizapp-testing` |
| Optimizing UI with React Compiler | `react-19` |
| Parsing request or response payloads | `zod-4` |
| Persisting client-side state | `zustand-5` |
| Running code quality checks | `biome` |
| Setting up linting | `biome` |
| Setting up pre-commit hooks | `biome` |
| Structuring Zustand selectors | `zustand-5` |
| Styling QuizApp UI | `tailwind-4` |
| Testing API endpoints | `quizapp-testing` |
| Testing React components | `quizapp-testing` |
| Testing Zod schemas | `quizapp-testing` |
| Testing attempt lifecycle | `quizapp-testing` |
| Testing domain logic | `quizapp-testing` |
| Testing localStorage persistence | `quizapp-testing` |
| Using Zustand stores | `zustand-5` |
| Using shadcn/ui in QuizApp | `quizapp-ui` |
| Using shadcn/ui primitives | `tailwind-4` |
| Using the App Router or Server Actions | `nextjs-15` |
| Validating runtime data | `zod-4` |
| Working with QuizApp UI structure | `quizapp-ui` |
| Working with React hooks | `react-19` |
| Working with Tailwind classes | `tailwind-4` |
| Working with localStorage persistence | `quizapp-domain` |
| Working with quiz domain logic | `quizapp-domain` |
| Writing Playwright E2E tests | `playwright` |
| Writing React components | `react-19` |
| Writing Supertest API tests | `quizapp-testing` |
| Writing TypeScript types or interfaces | `typescript` |
| Writing Vitest unit tests | `quizapp-testing` |
| Writing integration tests | `quizapp-testing` |
| Writing tests | `quizapp-testing` |

---

## CRITICAL RULES – NON-NEGOTIABLE

### React + Next.js
- Server Components by default; add `'use client'` only when browser APIs/state are required.
- No manual `useMemo`/`useCallback`/`React.memo` unless profiling exposes a regression.
- Hook order: context → state → effects → queries → derived values → handlers.
- Keep server actions in `app/{route}/actions/` (or `actions/`) and never embed fetch logic inside components without caching.

### State & Domain
- Zustand stores live in `frontend/stores/` and must persist using `quizapp-domain` keys (`quizapp:session`, `quizapp:attempts`, `quizapp:activeAttemptByQuiz`).
- Exactly one active attempt per quiz; completed attempts become immutable records.
- Randomize question order once per attempt and persist the permutation for stable refresh behavior.

### Styling & UX
- Use Tailwind 4 tokens and shadcn/ui primitives. No custom hex colors or inline `var()` in className.
- Layouts must include layered backgrounds/patterns; avoid blank white pages.
- Provide purposeful motion (page-load fade, staggered quiz cards) while respecting reduced motion preferences.
- Responsive from 360px width upward; include keyboard focus states, ARIA labels, and semantic headings.

## DECISION TREES

### Component Placement
```
Shared across areas → components/{domain}/
Feature-specific → app/(feature)/components/
Needs shared hook/state → create in hooks/ or stores/ and re-export.
```

### Data Flow
```
Server-available data → load in Server Component, pass into client shell.
Browser-only data (localStorage/Zustand) → Client Component + suspense boundary.
Missing schema/type → update shared package before consuming here.
```

## TECH STACK
Next.js 15 · React 19 · Tailwind 4 · shadcn/ui · Zustand 5 · TanStack Query · Vitest + React Testing Library

## PROJECT STRUCTURE
```
frontend/
├── app/                 # App Router routes + layouts
├── components/          # Shared UI (layout/, quiz/, ui/)
├── stores/              # Zustand slices (session, attempt)
├── lib/                 # API client, local storage, score helpers
├── hooks/               # useSession, useQuizAttempt, etc.
└── tests/               # Component/unit tests (if extracted)
```

## COMMANDS
```bash
pnpm --filter frontend dev
pnpm --filter frontend build
pnpm --filter frontend test
pnpm --filter frontend lint
pnpm --filter frontend format
```

## QA CHECKLIST
- [ ] Loading/empty/error/success states implemented for every screen.
- [ ] LocalStorage hydration/resume scenarios covered by tests.
- [ ] Responsive behavior verified at 360px, tablet, and desktop widths.
- [ ] Animations performant (CSS-based, no layout thrash).
- [ ] Accessibility: semantic headings, labelled controls, keyboard focus trapping where needed.
- [ ] Screenshots/videos attached to PR for major UI changes.
