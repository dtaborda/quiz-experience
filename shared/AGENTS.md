# QuizApp Shared – AI Agent Ruleset

> **Skills Reference**: Load these skills before editing:
> - [`typescript`](../skills/typescript/SKILL.md) – Const objects, flat interfaces, unions via `as const`
> - [`zod-4`](../skills/zod-4/SKILL.md) – Validation helpers, schema composition
> - [`quizapp-testing`](../skills/quizapp-testing/SKILL.md) – Vitest patterns for schema tests

### Auto-invoke Skills

When performing these actions, ALWAYS invoke the corresponding skill FIRST:

| Action | Skill |
|--------|-------|
| Adding test coverage | `quizapp-testing` |
| Building leaderboard features | `quizapp-domain` |
| Configuring Biome | `biome` |
| Configuring code formatting | `biome` |
| Creating Zod schemas | `zod-4` |
| Creating quiz sessions | `quizapp-domain` |
| Defining shared contracts | `typescript` |
| Enforcing const object patterns | `typescript` |
| Fixing linting errors | `biome` |
| Handling attempt completion | `quizapp-domain` |
| Implementing attempt lifecycle | `quizapp-domain` |
| Implementing learning mode | `quizapp-domain` |
| Implementing quiz attempt persistence | `quizapp-domain` |
| Implementing quiz history | `quizapp-domain` |
| Implementing randomized question order | `quizapp-domain` |
| Managing active vs completed attempts | `quizapp-domain` |
| Managing user sessions | `quizapp-domain` |
| Mocking API responses | `quizapp-testing` |
| Parsing request or response payloads | `zod-4` |
| Running code quality checks | `biome` |
| Setting up linting | `biome` |
| Setting up pre-commit hooks | `biome` |
| Testing API endpoints | `quizapp-testing` |
| Testing React components | `quizapp-testing` |
| Testing Zod schemas | `quizapp-testing` |
| Testing attempt lifecycle | `quizapp-testing` |
| Testing domain logic | `quizapp-testing` |
| Testing localStorage persistence | `quizapp-testing` |
| Validating runtime data | `zod-4` |
| Working with localStorage persistence | `quizapp-domain` |
| Working with quiz domain logic | `quizapp-domain` |
| Writing Supertest API tests | `quizapp-testing` |
| Writing TypeScript types or interfaces | `typescript` |
| Writing Vitest unit tests | `quizapp-testing` |
| Writing integration tests | `quizapp-testing` |
| Writing tests | `quizapp-testing` |

---

## CRITICAL RULES – NON-NEGOTIABLE

- Schemas live in `src/schemas/` and must export the runtime Zod object **and** a derived type via `z.infer`.
- Utilities shared by frontend/backend stay in `src/utils/`; domain-specific helpers belong in the owning package.
- No default exports—use named exports for tree-shaking and clarity.
- Keep object interfaces flat: nested objects get their own interfaces/types.
- Avoid re-export cycles; `src/index.ts` should explicitly export modules to keep APIs small.

## DECISION TREES

```
Is helper or type used by ≥2 packages? → shared/src
Frontend-only? → frontend/
Backend-only? → backend/

Schema change? → Update Zod schema → regenerate inferred type → adjust tests → update dependents.
```

## TECH STACK
TypeScript · Zod 4 · Biome · Vitest

## PROJECT STRUCTURE
```
shared/
├── src/
│   ├── schemas/        # Zod schemas (quiz, attempt, session, etc.)
│   ├── types/          # Derived types & helpers
│   └── utils/          # Pure helpers (score calculators, shufflers)
├── tests/              # Schema/unit tests
└── package.json
```

## COMMANDS
```bash
pnpm --filter shared build
pnpm --filter shared test
pnpm --filter shared lint
```

## QA CHECKLIST
- [ ] Schemas cover every field referenced in `docs/use-cases.md`.
- [ ] `pnpm --filter shared build` emits types + JS artifacts without errors.
- [ ] Vitest suite covers happy path + failure cases for each schema or utility.
- [ ] README documents new exports and breaking changes.
