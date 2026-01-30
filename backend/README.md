# Backend API

Express.js API serving quiz data with validation, caching, and comprehensive testing.

## Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/health` | Health check with timestamp |
| GET | `/api/quizzes` | List all quiz summaries (no questions) |
| GET | `/api/quizzes/:quizId` | Get full quiz with questions |

## Project Structure

```
src/
├── app.ts              # Express app setup
├── routes/
│   └── quiz.routes.ts  # Quiz endpoints
├── services/
│   └── quiz.service.ts # Business logic + caching
├── middleware/
│   ├── error-handler.ts   # Global error handling
│   ├── request-logger.ts  # Request logging
│   └── not-found.ts       # 404 handler
├── utils/
│   └── async-handler.ts   # Async route wrapper
└── app.test.ts         # Supertest API tests

data/quizzes/           # JSON quiz datasets
├── agent-fundamentals.json
├── prompt-engineering.json
└── ai-testing-validation.json
```

## Commands

```bash
pnpm --filter backend dev      # Start dev server (tsx watch)
pnpm --filter backend test     # Run Vitest + Supertest
pnpm --filter backend build    # Compile TypeScript
pnpm --filter backend lint     # Biome check
pnpm --filter backend format   # Biome format
```

## Features

- **Caching**: In-memory cache with 1-minute TTL for quiz data
- **Validation**: All responses validated against `shared` Zod schemas
- **Middleware**: Request logging, 404 handling, centralized error handling
- **Testing**: Supertest coverage for all endpoints including error cases

## Environment Variables

- `PORT` - Server port (default: 3001)

## API Contract

### GET /api/quizzes
Returns array of `QuizSummary`:
```json
[
  {
    "id": "agent-fundamentals",
    "title": "Agent Fundamentals",
    "description": "Test your knowledge...",
    "metadata": { "difficulty": "beginner", "estimatedMinutes": 10, "tags": [...] },
    "questionCount": 5
  }
]
```

### GET /api/quizzes/:quizId
Returns full `Quiz` object with questions array.
