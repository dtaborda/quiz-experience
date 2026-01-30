# Shared Package

TypeScript + Zod contracts shared by the frontend and backend. Import everything via the workspace alias:

```ts
import { QuizSchema, AttemptSchema } from 'shared'
```

## Contents

- `src/schemas/` – Zod schemas for quizzes, attempts, sessions, leaderboard entries.
- `src/utils/` – Pure helpers (`calculateScore`, `shuffleQuestionOrder`).
- `dist/` – Build artifacts (`pnpm --filter shared build`).

## Commands

```bash
pnpm --filter shared build   # emit dist/index.{js,d.ts}
pnpm --filter shared test    # Vitest (schemas + utils)
pnpm --filter shared lint    # Biome lint
pnpm --filter shared format  # Biome format
```

## Usage Examples

```ts
import {
  QuizSchema,
  AttemptSchema,
  calculateScore,
  shuffleQuestionOrder,
} from 'shared'

const quiz = QuizSchema.parse(payload)
const attempt = AttemptSchema.parse(payload)

const { score, maxScore, percentage } = calculateScore(attempt.answers)
const order = shuffleQuestionOrder(quiz.questions.map(q => q.id), attempt.id)
```

## Testing Guidelines

- Schema tests should include both happy path + failure scenarios.
- Utilities must remain pure and side-effect free.
- Run `pnpm --filter shared test -- --runInBand` in CI if concurrency causes race conditions.
