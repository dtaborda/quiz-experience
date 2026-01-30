# QuizApp - AI Agent Guide

> This is the **entry point for all AI coding agents** working on QuizApp. Read this file first before implementing any features.

---

## How to Use This Guide

- Start here for project-wide conventions and patterns
- QuizApp is a monorepo with three main packages: `frontend/`, `backend/`, and `shared/`
- All packages share the same coding standards defined in this file
- Skills provide detailed patterns on-demand (see Available Skills section)

---

## Available Skills

Use these skills for detailed patterns on-demand:

### Generic Skills (Any Project)

| Skill | Description | URL |
|-------|-------------|-----|
| `typescript` | Strict TypeScript patterns, no `any`, explicit types | [SKILL.md](skills/typescript/SKILL.md) |
| `react-19` | React 19 patterns with React Compiler (no manual memoization) | [SKILL.md](skills/react-19/SKILL.md) |
| `nextjs-15` | Next.js 15 App Router conventions (server vs client components) | [SKILL.md](skills/nextjs-15/SKILL.md) |
| `tailwind-4` | Tailwind CSS 4 patterns and utilities | [SKILL.md](skills/tailwind-4/SKILL.md) |
| `zod-4` | Zod 4 schema validation patterns | [SKILL.md](skills/zod-4/SKILL.md) |
| `zustand-5` | Zustand 5 state management patterns (persist, selectors, slices) | [SKILL.md](skills/zustand-5/SKILL.md) |
| `ai-sdk-5` | Vercel AI SDK 5 patterns for AI chat features | [SKILL.md](skills/ai-sdk-5/SKILL.md) |
| `playwright` | Playwright E2E testing patterns (Page Object Model) | [SKILL.md](skills/playwright/SKILL.md) |
| `pytest` | pytest testing patterns (fixtures, mocking, markers) | [SKILL.md](skills/pytest/SKILL.md) |
| `django-drf` | Django REST Framework patterns (ViewSets, Serializers) | [SKILL.md](skills/django-drf/SKILL.md) |
| `express` | Express.js best practices for building scalable REST APIs | [SKILL.md](skills/express/SKILL.md) |
| `biome` | Biome linter and formatter patterns for consistent code quality | [SKILL.md](skills/biome/SKILL.md) |
| `skill-creator` | Create new AI agent skills following Agent Skills spec | [SKILL.md](skills/skill-creator/SKILL.md) |

### QuizApp-Specific Skills

| Skill | Description | URL |
|-------|-------------|-----|
| `quizapp-domain` | Quiz attempt lifecycle, sessions, localStorage persistence, learning mode, randomization | [SKILL.md](skills/quizapp-domain/SKILL.md) |
| `quizapp-monorepo` | pnpm workspaces + Turborepo setup, cross-package dependencies, task orchestration | [SKILL.md](skills/quizapp-monorepo/SKILL.md) |
| `quizapp-testing` | Vitest + Supertest patterns for unit, integration, and API tests | [SKILL.md](skills/quizapp-testing/SKILL.md) |
| `quizapp-api` | Express API patterns for quiz endpoints, JSON file storage, backend conventions | [SKILL.md](skills/quizapp-api/SKILL.md) |
| `quizapp-ui` | Next.js UI patterns for quiz components, shadcn/ui, frontend conventions | [SKILL.md](skills/quizapp-ui/SKILL.md) |
| `quizapp-docs` | QuizApp documentation workflow, formatting, and Mintlify previews | [SKILL.md](skills/quizapp-docs/SKILL.md) |
| `quizapp-pr` | Pull request workflow, template requirements, and CI expectations | [SKILL.md](skills/quizapp-pr/SKILL.md) |
| `quizapp-commit` | Conventional Commit workflow and guardrails for QuizApp | [SKILL.md](skills/quizapp-commit/SKILL.md) |
| `devbox` | Devbox environment guardrails for reproducible setups | [SKILL.md](skills/devbox/SKILL.md) |
| `infra` | Docker & infra guardrails for QuizApp runtime | [SKILL.md](skills/infra/SKILL.md) |

### Auto-Invoke Skills

Auto-invoke loads the right Skill as soon as your request mentions one of the tasks below. Use this grouped view to know which Skill will step in.

**Frontend & UX**
- `quizapp-ui`: Building QuizApp pages, flows, or shadcn/ui components.
- `nextjs-15`: App Router routing, Server Actions, and data fetching.
- `react-19`: Writing or refactoring React 19 components.
- `tailwind-4`: Applying Tailwind CSS tokens/utilities.
- `zustand-5`: Creating or persisting Zustand slices/stores.
- `ai-sdk-5`: Implementing AI chat or assistant features with Vercel AI SDK.

**Domain & Data**
- `quizapp-domain`: Attempt lifecycle, learning mode, localStorage persistence, leaderboard math.
- `quizapp-api`: Express routes, quiz JSON loaders, backend logic, request validation.
- `zod-4`: Updating or creating Zod schemas shared across packages.
- `typescript`: Defining strict types/interfaces, generics, utility helpers.

**Testing**
- `quizapp-testing`: Vitest, Supertest, integration tests, mocking API responses, exercising attempt lifecycle/state.
- `playwright`: Playwright end-to-end specs.
- `pytest`: Python-based tests (only when touching pytest suites).

**Docs & Collaboration**
- `quizapp-docs`: Editing Mintlify docs, documentation workflows, `docs/` structure.
- `quizapp-pr`: Preparing pull-request descriptions, template requirements, CI expectations.
- `quizapp-commit`: Drafting commit messages or running git commit commands.
- `skill-creator`: Creating or updating Skill specs.

**Infra & Tooling**
- `quizapp-monorepo`: pnpm workspaces, Turborepo config, adding new packages, workspace protocol.
- `devbox`: Devbox environments, reproducible shells, `.devbox/` assets.
- `infra`: Dockerfiles, compose stacks, runtime wiring.
- `biome`: Linting/formatting config, pre-commit hooks, running `pnpm lint`/`pnpm format`.
- `express`: Express middleware, server setup, error handling.

**Legacy/Reference**
- `django-drf`: Only when editing the Django adapters we keep for reference.

---

## Project Overview

QuizApp is a quiz-based learning platform for AI software development concepts.

| Component | Location | Tech Stack | Package Manager |
|-----------|----------|------------|-----------------|
| **Monorepo** | Root | pnpm workspaces + Turborepo | pnpm |
| **Frontend** | `frontend/` | Next.js 15 + React 19 + TypeScript + Tailwind CSS 4 + shadcn/ui | pnpm |
| **Backend** | `backend/` | Node.js + Express + TypeScript | pnpm |
| **Shared** | `shared/` | Zod 4 schemas + TypeScript | pnpm |
| **State** | Frontend | Zustand 5 + TanStack Query | pnpm |
| **Testing** | All packages | Vitest + Supertest | pnpm |
| **Linting** | All packages | Biome | pnpm |
| **Infra** | `infra/` | Docker + Docker Compose | - |

---

## Commands Reference

### Setup

```bash
# Install dependencies
pnpm install

# Start all dev servers
pnpm dev

# Start specific package
pnpm --filter frontend dev
pnpm --filter backend dev
```

### Build

```bash
# Build all packages
pnpm build

# Build specific package
pnpm --filter frontend build
pnpm --filter backend build
pnpm --filter shared build
```

### Testing

```bash
# Run all tests
pnpm test

# Run tests in watch mode
pnpm test -- --watch

# Run specific test file
pnpm test -- path/to/test.spec.ts

# Run tests matching pattern
pnpm test -- -t "pattern"

# Generate coverage report
pnpm test -- --coverage

# Run tests in specific package
pnpm --filter frontend test
pnpm --filter backend test
```

### Linting & Formatting

```bash
# Check linting
pnpm lint

# Fix linting issues
pnpm lint:fix

# Format code
pnpm format

# Check formatting
pnpm format:check
```

### Docker

```bash
# Build and run all services
docker compose -f infra/docker-compose.yml up --build

# Stop all services
docker compose -f infra/docker-compose.yml down
```

---

## Code Style Guidelines

### TypeScript

#### Imports

**Order** (enforced by Biome):
1. React imports
2. External dependencies
3. Internal absolute imports (`@/`)
4. Relative imports
5. Type imports (grouped separately)

```typescript
import React from 'react'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import { quizApi } from '@/lib/api'

import { QuizCard } from './QuizCard'

import type { Quiz } from '@/types'
```

#### Naming Conventions

| Entity | Pattern | Example |
|--------|---------|---------|
| **Components** | PascalCase | `QuizCard`, `ResultsScreen` |
| **Hooks** | camelCase with `use` prefix | `useQuizAttempt`, `useLocalStorage` |
| **Functions** | camelCase | `calculateScore`, `shuffleQuestions` |
| **Types/Interfaces** | PascalCase | `Quiz`, `Attempt`, `Question` |
| **Constants** | UPPER_SNAKE_CASE | `MAX_ATTEMPTS`, `API_BASE_URL` |
| **Files (components)** | PascalCase | `QuizCard.tsx`, `ResultsScreen.tsx` |
| **Files (utilities)** | kebab-case | `local-storage.ts`, `score-calculator.ts` |
| **Folders** | kebab-case | `quiz-flow/`, `attempt-manager/` |

#### Type Safety

**ALWAYS:**
- Use strict TypeScript mode
- Define explicit return types for functions
- Use Zod schemas for runtime validation
- Prefer `interface` for object shapes
- Use `type` for unions, intersections, and utilities

**NEVER:**
- Use `any` (use `unknown` if truly dynamic)
- Use `@ts-ignore` (fix the type issue instead)
- Use implicit `any` in function parameters

```typescript
// ✅ Good
interface Quiz {
  id: string
  title: string
  questions: Question[]
}

function calculateScore(answers: Answer[]): number {
  return answers.filter(a => a.isCorrect).length
}

const QuizSchema = z.object({
  id: z.string(),
  title: z.string(),
  questions: z.array(QuestionSchema),
})

// ❌ Bad
function calculateScore(answers) {  // implicit any
  // @ts-ignore
  return answers.filter(a => a.isCorrect).length
}
```

#### Error Handling

**Pattern: Result types for operations that can fail**

```typescript
type Result<T, E = Error> = 
  | { success: true; data: T }
  | { success: false; error: E }

// Usage
async function loadQuiz(id: string): Promise<Result<Quiz>> {
  try {
    const quiz = await quizApi.get(id)
    return { success: true, data: quiz }
  } catch (error) {
    return { 
      success: false, 
      error: error instanceof Error ? error : new Error('Unknown error') 
    }
  }
}

// Component usage
const result = await loadQuiz(quizId)
if (result.success) {
  setQuiz(result.data)
} else {
  showError(result.error.message)
}
```

**For API routes (Express):**

```typescript
// Use consistent error middleware
app.get('/api/quizzes/:id', async (req, res, next) => {
  try {
    const quiz = await quizService.getById(req.params.id)
    if (!quiz) {
      return res.status(404).json({ error: 'Quiz not found' })
    }
    res.json(quiz)
  } catch (error) {
    next(error)  // Let error middleware handle it
  }
})
```

---

### React (Frontend)

#### Component Structure

```typescript
import React from 'react'
import type { ComponentProps } from 'react'

// 1. Types/Interfaces
interface QuizCardProps {
  quiz: Quiz
  onStart: (quizId: string) => void
}

// 2. Component
export function QuizCard({ quiz, onStart }: QuizCardProps) {
  // 3. Hooks (order: context, state, effects, queries)
  const session = useSession()
  const [isHovered, setIsHovered] = React.useState(false)
  
  // 4. Event handlers
  const handleStart = () => {
    onStart(quiz.id)
  }
  
  // 5. Render
  return (
    <div>
      <h3>{quiz.title}</h3>
      <button onClick={handleStart}>Start</button>
    </div>
  )
}
```

#### React 19 Patterns

**With React Compiler enabled, avoid manual memoization:**

```typescript
// ❌ Bad (unnecessary with React Compiler)
const MemoizedComponent = React.memo(Component)
const memoizedValue = useMemo(() => computeValue(), [deps])
const memoizedCallback = useCallback(() => doSomething(), [deps])

// ✅ Good (React Compiler handles this automatically)
function Component({ data }) {
  const value = computeValue()
  const handleClick = () => doSomething()
  return <div onClick={handleClick}>{value}</div>
}
```

**Only use manual memoization when:**
- Profiling shows a specific performance issue
- Working with very expensive computations
- Component explicitly opts out of compiler

---

### Next.js 15 (App Router)

#### File Structure

```
app/
├── layout.tsx              # Root layout
├── page.tsx                # Home page
├── login/
│   └── page.tsx            # /login
├── quiz/
│   ├── [quizId]/
│   │   ├── page.tsx        # /quiz/:quizId
│   │   └── results/
│   │       └── page.tsx    # /quiz/:quizId/results
└── history/
    ├── page.tsx            # /history
    └── [attemptId]/
        └── page.tsx        # /history/:attemptId
```

#### Server vs Client Components

```typescript
// ✅ Server Component (default - no 'use client')
// For: static content, data fetching, SEO
export default async function QuizPage({ params }) {
  const quiz = await fetchQuiz(params.quizId)  // Server-side fetch
  return <QuizClient quiz={quiz} />
}

// ✅ Client Component (needs 'use client')
// For: interactivity, state, effects, browser APIs
'use client'

export function QuizClient({ quiz }) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  // ... interactive logic
}
```

---

## Testing Patterns

### Vitest (Unit & Integration)

```typescript
import { describe, it, expect, beforeEach } from 'vitest'
import { calculateScore } from './score-calculator'

describe('calculateScore', () => {
  it('should calculate correct score for all correct answers', () => {
    const answers = [
      { questionId: '1', selectedOption: 'A', isCorrect: true },
      { questionId: '2', selectedOption: 'B', isCorrect: true },
    ]
    
    expect(calculateScore(answers)).toBe(2)
  })
  
  it('should return 0 for no correct answers', () => {
    const answers = [
      { questionId: '1', selectedOption: 'A', isCorrect: false },
    ]
    
    expect(calculateScore(answers)).toBe(0)
  })
})
```

### Supertest (API Testing)

```typescript
import { describe, it, expect } from 'vitest'
import request from 'supertest'
import { app } from '../app'

describe('GET /api/quizzes', () => {
  it('should return list of quizzes', async () => {
    const response = await request(app)
      .get('/api/quizzes')
      .expect(200)
      .expect('Content-Type', /json/)
    
    expect(response.body).toBeInstanceOf(Array)
    expect(response.body[0]).toHaveProperty('id')
    expect(response.body[0]).toHaveProperty('title')
  })
})

describe('GET /api/quizzes/:id', () => {
  it('should return 404 for non-existent quiz', async () => {
    await request(app)
      .get('/api/quizzes/non-existent')
      .expect(404)
  })
})
```

---

## Commit & Pull Request Guidelines

### Commit Messages

Follow **Conventional Commits** format:

```
<type>(<scope>): <subject>

<body>

<footer>
```

**Types:** `feat`, `fix`, `docs`, `chore`, `perf`, `refactor`, `style`, `test`

**Examples:**
```bash
feat(quiz): add learning mode with pre-question explanations

fix(api): handle 404 for non-existent quiz IDs

test(frontend): add tests for score calculation logic

docs(readme): update setup instructions for Docker
```

---

## Definition of Done (DoD)

Before marking any task as complete:

- [ ] Implementation matches specification (docs/use-cases.md)
- [ ] Code follows style guidelines in this file
- [ ] Types are properly defined (no `any`)
- [ ] Tests are added/updated
- [ ] All tests pass (`pnpm test`)
- [ ] No linting errors (`pnpm lint`)
- [ ] Code is formatted (`pnpm format`)
- [ ] Documentation is updated if needed

**Critical:** Do NOT commit without running tests and lint first.

---

## Project Structure

```
quizapp/
├── frontend/                    # Next.js App
│   ├── app/                     # App Router pages
│   │   ├── layout.tsx
│   │   ├── page.tsx             # Home
│   │   ├── login/
│   │   ├── quiz/
│   │   ├── history/
│   │   └── leaderboard/
│   ├── components/              # React components
│   │   ├── ui/                  # shadcn/ui primitives
│   │   ├── quiz/                # Quiz-specific components
│   │   └── layout/              # Layout components
│   ├── stores/                  # Zustand stores
│   │   ├── session.ts
│   │   └── attempt.ts
│   ├── lib/                     # Utilities
│   │   ├── api.ts               # API client
│   │   ├── local-storage.ts    # localStorage helpers
│   │   └── score-calculator.ts
│   ├── hooks/                   # Custom React hooks
│   └── package.json
│
├── backend/                     # Express API
│   ├── src/
│   │   ├── routes/              # API routes
│   │   ├── services/            # Business logic
│   │   ├── middleware/          # Express middleware
│   │   └── app.ts               # Express app setup
│   ├── data/
│   │   └── quizzes/             # Quiz JSON files
│   │       └── agent-fundamentals.json
│   └── package.json
│
├── shared/                      # Shared contracts
│   ├── schemas/                 # Zod schemas
│   │   ├── quiz.ts
│   │   ├── attempt.ts
│   │   └── session.ts
│   ├── types/                   # TypeScript types
│   └── package.json
│
├── infra/                       # Infrastructure
│   ├── docker-compose.yml
│   ├── frontend.Dockerfile
│   └── backend.Dockerfile
│
├── docs/                        # Documentation
│   ├── architecture.md
│   ├── use-cases.md
│   ├── wireframes.yaml
│   └── agents-and-skills.md
│
├── skills/                      # AI Agent Skills
│   ├── quizapp-domain/
│   ├── quizapp-monorepo/
│   ├── quizapp-testing/
│   └── README.md
│
├── pnpm-workspace.yaml          # pnpm workspaces config
├── turbo.json                   # Turborepo config
├── package.json                 # Root scripts
└── AGENTS.md                    # This file
```

---

## Critical Rules

### ALWAYS:
- Read `docs/use-cases.md` before implementing features
- Validate all external data with Zod schemas
- Use TypeScript strict mode
- Write tests for new features
- Run `pnpm lint` and `pnpm test` before committing
- Keep frontend/backend/shared boundaries clear
- Store user data in localStorage (no backend database)
- Follow Next.js App Router conventions
- Use shadcn/ui components for UI

### NEVER:
- Use `any` type
- Skip writing tests
- Commit without running lint + tests
- Break monorepo workspace dependencies
- Add database dependencies (localStorage only)
- Use `@ts-ignore` without explanation
- Create API routes in frontend (use backend)
- Mix server and client component code

---

## Domain-Specific Rules (QuizApp)

### Attempt Lifecycle
1. **One active attempt per quiz** per user
2. **Multiple completed attempts** allowed
3. Active attempt → user navigates away → **resume on return**
4. Completed attempt → **immutable** (never modified)

### Question Randomization
- Order is randomized **per attempt**
- Order is **stable within same attempt** (stored in attempt)
- Refresh browser → same order maintained

### Learning Mode
- Selected **before starting quiz**
- Shows **explanation first**, then question
- Explanation does **not reveal answer**
- Mode stored in attempt metadata

### localStorage Keys
```typescript
'quizapp:session'              // { username: string, loginTime: string }
'quizapp:attempts'             // Attempt[] (completed only)
'quizapp:activeAttemptByQuiz'  // Record<quizId, Attempt>
```

---

## Quick Start for New Agents

1. **Read this file completely**
2. **Review** `docs/architecture.md` for tech stack details
3. **Review** `docs/use-cases.md` for functional requirements
4. **Check** `docs/wireframes.yaml` for UI reference
5. **Load appropriate skills** based on your task
6. **Run** `pnpm install && pnpm dev` to start development
7. **Verify** tests pass before completing work

---

## Resources

- **Documentation:** `/docs/`
- **Skills:** `/skills/`
- **Wireframes:** `/docs/wireframes.yaml`
- **Use Cases:** `/docs/use-cases.md`
- **Architecture:** `/docs/architecture.md`

---

**Remember:** This project follows an **AI-first, agent-driven development model**. You are the primary developer. The documentation is your source of truth. When in doubt, check the docs first.
