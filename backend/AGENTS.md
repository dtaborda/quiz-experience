# QuizApp Backend – AI Agent Ruleset

> **Skills Reference**: Load these skills before editing:
> - [`quizapp-api`](../skills/quizapp-api/SKILL.md) – Quiz dataset + Express patterns
> - [`express`](../skills/express/SKILL.md) – Middleware, routing, error handling
> - [`quizapp-testing`](../skills/quizapp-testing/SKILL.md) – Vitest + Supertest structure
> - [`zod-4`](../skills/zod-4/SKILL.md) – Request/response validation
> - [`typescript`](../skills/typescript/SKILL.md) – Strict typing patterns

### Auto-invoke Skills

When performing these actions, ALWAYS invoke the corresponding skill FIRST:

| Action | Skill |
|--------|-------|
| Adding test coverage | `quizapp-testing` |
| Building Express middleware | `express` |
| Building leaderboard features | `quizapp-domain` |
| Configuring Biome | `biome` |
| Configuring Express app | `express` |
| Configuring code formatting | `biome` |
| Creating API endpoints with Express | `express` |
| Creating Express routes | `express` |
| Creating QuizApp API endpoints | `quizapp-api` |
| Creating Zod schemas | `zod-4` |
| Creating quiz sessions | `quizapp-domain` |
| Defining shared contracts | `typescript` |
| Enforcing const object patterns | `typescript` |
| Fixing linting errors | `biome` |
| Handling attempt completion | `quizapp-domain` |
| Implementing attempt lifecycle | `quizapp-domain` |
| Implementing backend quiz logic | `quizapp-api` |
| Implementing error handling in Express | `express` |
| Implementing learning mode | `quizapp-domain` |
| Implementing quiz attempt persistence | `quizapp-domain` |
| Implementing quiz history | `quizapp-domain` |
| Implementing randomized question order | `quizapp-domain` |
| Loading quiz data from files | `quizapp-api` |
| Managing active vs completed attempts | `quizapp-domain` |
| Managing user sessions | `quizapp-domain` |
| Mocking API responses | `quizapp-testing` |
| Parsing request or response payloads | `zod-4` |
| Running code quality checks | `biome` |
| Setting up Express server | `express` |
| Setting up linting | `biome` |
| Setting up pre-commit hooks | `biome` |
| Setting up quiz API routes | `quizapp-api` |
| Testing API endpoints | `quizapp-testing` |
| Testing React components | `quizapp-testing` |
| Testing Zod schemas | `quizapp-testing` |
| Testing attempt lifecycle | `quizapp-testing` |
| Testing domain logic | `quizapp-testing` |
| Testing localStorage persistence | `quizapp-testing` |
| Validating quiz API requests | `quizapp-api` |
| Validating runtime data | `zod-4` |
| Working with localStorage persistence | `quizapp-domain` |
| Working with quiz JSON data | `quizapp-api` |
| Working with quiz domain logic | `quizapp-domain` |
| Writing Supertest API tests | `quizapp-testing` |
| Writing TypeScript types or interfaces | `typescript` |
| Writing Vitest unit tests | `quizapp-testing` |
| Writing integration tests | `quizapp-testing` |
| Writing tests | `quizapp-testing` |

---

## CRITICAL RULES – NON-NEGOTIABLE

### Architecture
- JSON files under `backend/data/quizzes/` are the single source of truth; never add a database.
- Route → controller → service layering: controllers stay thin, services contain logic, middleware handles cross-cutting concerns.
- Always validate inputs/outputs against `shared` schemas (Zod). Never return untyped JSON.
- Health endpoint (`/api/health`) must remain lightweight and unauthenticated.

### Error Handling & Logging
- Wrap async handlers with try/catch and forward to central error middleware via `next(err)`.
- Use structured logs (level + context) for request lifecycle and error reporting.
- Return standardized error payloads `{ error: string }`; no stack traces to clients.

### Data Contract
- `GET /api/quizzes` returns quiz summaries (id, title, description).
- `GET /api/quizzes/:quizId` returns the entire quiz, including randomized question order as stored in attempts.
- Always sanitize quiz data before responding: remove answers/explanations when not needed, respect learning-mode semantics.

## DECISION TREES

### When to Touch Shared Package
```
Missing schema/type for payload? → Update shared first, publish build, import via workspace.
Backend-only helper? → Keep in backend/services or backend/lib.
```

### Service Layout
```
Simple data fetch → service returns Promise<Result<T>>
Needs caching/invalidation → add memoized layer or data loader module.
Requires transformation → create helper in backend/lib/transformers.
```

## TECH STACK
Node 20 · Express 4 · TypeScript · tsx (dev) · Vitest + Supertest · Biome

## PROJECT STRUCTURE
```
backend/
├── src/
│   ├── routes/        # Express routers
│   ├── controllers/   # Request handling
│   ├── services/      # Business logic
│   ├── middleware/    # Error/logging/validation
│   └── app.ts         # Express bootstrap
├── data/quizzes/      # JSON quiz datasets
├── tests/             # Vitest + Supertest suites
└── package.json
```

## COMMANDS
```bash
pnpm --filter backend dev
pnpm --filter backend build
pnpm --filter backend test
pnpm --filter backend lint
pnpm --filter backend format
```

## QA CHECKLIST
- [ ] All endpoints validated with shared schemas and covered by Vitest + Supertest.
- [ ] Error middleware returns consistent status codes + payloads.
- [ ] JSON datasets updated + documented when quizzes change.
- [ ] `pnpm --filter backend dev` hot reload works without TS errors.
- [ ] README documents new environment variables or routes.
