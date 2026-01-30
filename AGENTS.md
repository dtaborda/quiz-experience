# QuizApp - AI Agent Guide

> This is the **entry point for all AI coding agents** working on QuizApp. Read this file first before implementing any features.

---

## Quick Reference

### Tech Stack

| Component | Location | Stack | Package Manager |
|-----------|----------|-------|-----------------|
| **Monorepo** | Root | pnpm workspaces + Turborepo | pnpm |
| **Frontend** | `frontend/` | Next.js 15 + React 19 + TypeScript + Tailwind CSS 4 + shadcn/ui | pnpm |
| **Backend** | `backend/` | Node.js + Express + TypeScript | pnpm |
| **Shared** | `shared/` | Zod 4 schemas + TypeScript | pnpm |
| **State** | Frontend | Zustand 5 + TanStack Query | pnpm |
| **Forms** | Frontend | React Hook Form + Zod 4 | pnpm |
| **Testing** | All packages | Vitest + Supertest | pnpm |
| **Linting** | All packages | Biome | pnpm |
| **Infra** | `infra/` | Docker + Docker Compose | - |

---

## Build, Lint & Test Commands

### Root (Monorepo)

```bash
# Setup
pnpm install

# Development (runs all dev servers)
pnpm dev

# Build all packages
pnpm build

# Run all tests
pnpm test

# Lint all packages
pnpm lint

# Format with Biome
pnpm format
```

### Specific Package

```bash
# Run command in specific package
pnpm --filter frontend dev
pnpm --filter backend dev
pnpm --filter shared build

# Run tests in specific package
pnpm --filter frontend test
pnpm --filter backend test
```

### Testing Commands

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

## Commit & PR Conventions

### Commit Messages

Follow **Conventional Commits** format:

```
<type>(<scope>): <subject>

<body>

<footer>
```

**Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, no logic change)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Build process, dependencies, tooling

**Examples:**
```bash
feat(quiz): add learning mode with pre-question explanations

fix(api): handle 404 for non-existent quiz IDs

test(frontend): add tests for score calculation logic

docs(readme): update setup instructions for Docker
```

### Definition of Done (DoD)

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

## Auto-Invoke Rules

**These skills MUST be loaded before performing the specified actions:**

| Action | Required Skill | Why |
|--------|---------------|-----|
| **Setting up monorepo structure** | `quizapp-monorepo` | Ensures correct pnpm/Turborepo setup |
| **Implementing quiz domain logic** | `quizapp-domain` | Enforces attempt lifecycle, persistence rules |
| **Writing tests** | `quizapp-testing` | Ensures Vitest/Supertest patterns |
| **Working with React components** | `react-19` | React 19 + Compiler patterns |
| **Working with Next.js routes** | `nextjs-15` | App Router conventions |
| **Working with Tailwind** | `tailwind-4` | Tailwind 4 syntax and utilities |
| **Working with TypeScript** | `typescript` | Strict typing patterns |
| **Working with Zod schemas** | `zod-4` | Schema validation patterns |
| **Working with Zustand** | `zustand-5` | State management patterns |

**How to load a skill:**
```
I need to implement quiz attempt persistence.
First, let me load the quizapp-domain skill.
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
