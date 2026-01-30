---
name: quizapp-domain
description: >
  QuizApp domain patterns for quiz attempts, sessions, and localStorage persistence.
  Trigger: When implementing quiz domain logic, attempt lifecycle, or user state persistence.
license: MIT
metadata:
  author: QuizApp Team
  version: "1.1"
  scope: [root, frontend, backend, shared]
  auto_invoke:
    - "Implementing quiz attempt persistence"
    - "Working with quiz domain logic"
    - "Managing user sessions"
    - "Implementing attempt lifecycle"
    - "Implementing learning mode"
    - "Creating quiz sessions"
    - "Implementing randomized question order"
    - "Handling attempt completion"
    - "Managing active vs completed attempts"
    - "Working with localStorage persistence"
    - "Implementing quiz history"
    - "Building leaderboard features"
---

# QuizApp Domain Skill

## When to Use

Use this skill when:
- Implementing quiz attempt creation, resumption, or completion
- Working with session management (login/logout)
- Managing localStorage persistence for user data
- Implementing quiz history or leaderboard features
- Handling question randomization
- Implementing learning mode

## Critical Patterns

### Attempt Lifecycle

**ALWAYS enforce these rules:**

1. **One active attempt per quiz** per user
   - User starts quiz → create active attempt
   - User navigates away → attempt remains active
   - User returns → resume same attempt
   - User completes quiz → attempt becomes completed, no longer active

2. **Multiple completed attempts allowed**
   - User can retake same quiz unlimited times
   - Each completion creates a new completed attempt
   - Completed attempts are immutable (never modified)

3. **Attempt states**
   ```typescript
   type AttemptStatus = 'active' | 'completed'
   
   interface Attempt {
     id: string
     quizId: string
     userId: string  // username from session
     status: AttemptStatus
     answers: Answer[]
     questionOrder: string[]  // stable randomized order
     mode: 'normal' | 'learn'
     startedAt: string
     completedAt?: string
     score?: number
   }
   ```

### localStorage Keys

**ALWAYS use these exact keys:**

```typescript
// Session data
'quizapp:session' → { username: string, loginTime: string }

// Completed attempts only (history)
'quizapp:attempts' → Attempt[]

// Active attempts (one per quiz)
'quizapp:activeAttemptByQuiz' → Record<quizId, Attempt>
```

**Why separate stores:**
- History should only show completed attempts
- Active attempts need fast quiz-specific lookup
- Session is independent of quiz state

### Question Randomization

**Pattern: Randomize once per attempt, then persist**

```typescript
// ✅ Good - randomize on attempt creation, then store
function createAttempt(quiz: Quiz, userId: string): Attempt {
  const questionOrder = shuffleArray(quiz.questions.map(q => q.id))
  
  return {
    id: generateId(),
    quizId: quiz.id,
    userId,
    status: 'active',
    answers: [],
    questionOrder,  // Persisted - stable within attempt
    mode: 'normal',
    startedAt: new Date().toISOString(),
  }
}

// ❌ Bad - randomizing on every render
function QuizView({ quiz }) {
  const questions = shuffleArray(quiz.questions)  // Different on every render!
  // ...
}
```

**Rules:**
- Order is randomized **per attempt** (different between attempts)
- Order is **stable within attempt** (same after refresh)
- Store `questionOrder: string[]` in attempt
- Use `questionOrder` to render questions in consistent sequence

### Learning Mode

**Pattern: Mode selected before quiz start, applies to all questions**

```typescript
interface Attempt {
  // ... other fields
  mode: 'normal' | 'learn'
}

// Select mode before starting
function StartQuizModal({ quiz, onStart }) {
  const [mode, setMode] = useState<'normal' | 'learn'>('normal')
  
  return (
    <div>
      <label>
        <input 
          type="radio" 
          checked={mode === 'normal'} 
          onChange={() => setMode('normal')}
        />
        Normal Mode
      </label>
      <label>
        <input 
          type="radio" 
          checked={mode === 'learn'} 
          onChange={() => setMode('learn')}
        />
        Learning Mode
      </label>
      <button onClick={() => onStart(quiz.id, mode)}>Start Quiz</button>
    </div>
  )
}
```

**Learning Mode flow:**
1. Show conceptual explanation (does NOT reveal answer)
2. User clicks "View Question"
3. Show question and options
4. User answers normally
5. Show feedback as usual

**NEVER:**
- Change mode mid-attempt
- Reveal correct answer in explanation
- Skip evaluation in learn mode

### Session Management

**Pattern: Simple username-based local session**

```typescript
// Login
function login(username: string): void {
  const session = {
    username,
    loginTime: new Date().toISOString(),
  }
  localStorage.setItem('quizapp:session', JSON.stringify(session))
}

// Logout (keep data on device)
function logout(): void {
  localStorage.removeItem('quizapp:session')
  // DO NOT remove attempts or history
}

// Get current session
function getSession(): Session | null {
  const data = localStorage.getItem('quizapp:session')
  return data ? JSON.parse(data) : null
}
```

**NEVER:**
- Implement real authentication (out of scope)
- Clear user data on logout
- Store passwords or sensitive data

## Code Examples

### Complete Attempt Creation Flow

```typescript
import { v4 as uuid } from 'uuid'

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

function startQuiz(
  quiz: Quiz, 
  session: Session, 
  mode: 'normal' | 'learn' = 'normal'
): Attempt {
  const questionOrder = shuffleArray(quiz.questions.map(q => q.id))
  
  const attempt: Attempt = {
    id: uuid(),
    quizId: quiz.id,
    userId: session.username,
    status: 'active',
    answers: [],
    questionOrder,
    mode,
    startedAt: new Date().toISOString(),
  }
  
  // Store as active attempt
  const activeAttempts = getActiveAttempts()
  activeAttempts[quiz.id] = attempt
  localStorage.setItem(
    'quizapp:activeAttemptByQuiz', 
    JSON.stringify(activeAttempts)
  )
  
  return attempt
}
```

### Resume vs Restart Logic

```typescript
function getOrCreateAttempt(
  quizId: string, 
  quiz: Quiz, 
  session: Session,
  mode: 'normal' | 'learn' = 'normal'
): Attempt {
  const activeAttempts = getActiveAttempts()
  const existingAttempt = activeAttempts[quizId]
  
  if (existingAttempt && existingAttempt.status === 'active') {
    // Resume existing attempt
    return existingAttempt
  }
  
  // Start new attempt
  return startQuiz(quiz, session, mode)
}

function restartQuiz(quizId: string): void {
  const activeAttempts = getActiveAttempts()
  delete activeAttempts[quizId]
  localStorage.setItem(
    'quizapp:activeAttemptByQuiz', 
    JSON.stringify(activeAttempts)
  )
  // Caller will then create new attempt
}
```

### Complete Attempt

```typescript
function completeAttempt(attempt: Attempt): Attempt {
  const completedAttempt: Attempt = {
    ...attempt,
    status: 'completed',
    completedAt: new Date().toISOString(),
    score: calculateScore(attempt.answers),
  }
  
  // Remove from active attempts
  const activeAttempts = getActiveAttempts()
  delete activeAttempts[attempt.quizId]
  localStorage.setItem(
    'quizapp:activeAttemptByQuiz', 
    JSON.stringify(activeAttempts)
  )
  
  // Add to history (completed attempts)
  const history = getAttemptHistory()
  history.push(completedAttempt)
  localStorage.setItem('quizapp:attempts', JSON.stringify(history))
  
  return completedAttempt
}

function calculateScore(answers: Answer[]): number {
  return answers.filter(a => a.isCorrect).length
}
```

### Leaderboard (Local)

```typescript
function getLeaderboard(quizId?: string): LeaderboardEntry[] {
  const allAttempts = getAttemptHistory()
  
  // Filter by quiz if specified
  const filteredAttempts = quizId 
    ? allAttempts.filter(a => a.quizId === quizId)
    : allAttempts
  
  // Only completed attempts
  const completed = filteredAttempts.filter(a => a.status === 'completed')
  
  // Sort by score DESC, then completedAt ASC (tie-breaker)
  return completed
    .map(attempt => ({
      attemptId: attempt.id,
      username: attempt.userId,
      quizId: attempt.quizId,
      score: attempt.score!,
      percentage: (attempt.score! / attempt.answers.length) * 100,
      completedAt: attempt.completedAt!,
    }))
    .sort((a, b) => {
      if (b.percentage !== a.percentage) {
        return b.percentage - a.percentage  // DESC
      }
      return new Date(a.completedAt).getTime() - new Date(b.completedAt).getTime()  // ASC
    })
}
```

## Common Pitfalls

### ❌ Modifying Completed Attempts

```typescript
// NEVER do this
function updateAttempt(attemptId: string, changes: Partial<Attempt>): void {
  const history = getAttemptHistory()
  const index = history.findIndex(a => a.id === attemptId)
  history[index] = { ...history[index], ...changes }  // ❌ Mutating history!
  localStorage.setItem('quizapp:attempts', JSON.stringify(history))
}
```

**Why wrong:** Completed attempts are immutable records. Never modify them.

### ❌ Not Persisting Question Order

```typescript
// NEVER do this
function QuizView({ quiz, attempt }) {
  const questions = quiz.questions  // ❌ Using original order
  // ...
}
```

**Fix:**
```typescript
// ✅ Use persisted order
function QuizView({ quiz, attempt }) {
  const questions = attempt.questionOrder
    .map(id => quiz.questions.find(q => q.id === id)!)
  // ...
}
```

### ❌ Storing Active Attempts in History

```typescript
// NEVER do this
function saveAttempt(attempt: Attempt): void {
  const history = getAttemptHistory()
  history.push(attempt)  // ❌ Saving active attempt to history
  localStorage.setItem('quizapp:attempts', JSON.stringify(history))
}
```

**Why wrong:** History should only contain completed attempts. Active attempts go in separate store.

## Resources

- **Domain Documentation:** See [/docs/use-cases.md](/docs/use-cases.md)
- **Wireframes:** See [/docs/wireframes.yaml](/docs/wireframes.yaml)
- **Architecture:** See [/docs/architecture.md](/docs/architecture.md)

## Testing Checklist

When implementing domain logic, ensure:

- [ ] Can create new attempt with randomized question order
- [ ] Can resume active attempt after page refresh
- [ ] Question order remains stable within attempt
- [ ] Can complete attempt and see it in history
- [ ] Completed attempts are immutable
- [ ] Can start new attempt for same quiz
- [ ] Learning mode applies to all questions in attempt
- [ ] Leaderboard sorts correctly (score DESC, date ASC)
- [ ] Session persists across page refresh
- [ ] Logout does not delete user data
