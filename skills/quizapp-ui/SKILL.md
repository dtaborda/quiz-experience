---
name: quizapp-ui
description: >
  QuizApp UI patterns for Next.js components, shadcn/ui, and frontend conventions.
  Trigger: When creating QuizApp UI components, pages, or implementing frontend features.
license: MIT
metadata:
  author: QuizApp Team
  version: "1.0"
  scope: [root, frontend]
  auto_invoke:
    - "Creating QuizApp UI components"
    - "Building QuizApp pages"
    - "Implementing QuizApp frontend features"
    - "Working with QuizApp UI structure"
    - "Using shadcn/ui in QuizApp"
    - "Creating quiz flow components"
---

# QuizApp UI Skill

## When to Use

Use this skill when:
- Creating new UI components for QuizApp
- Building quiz flow pages (quiz, results, history)
- Implementing QuizApp-specific UI patterns
- Working with shadcn/ui components
- Structuring frontend code
- Managing UI state with Zustand

## Critical Patterns

### Project Structure

```
frontend/
├── app/                       # Next.js App Router
│   ├── layout.tsx
│   ├── page.tsx              # Home
│   ├── login/
│   │   └── page.tsx
│   ├── quiz/
│   │   └── [quizId]/
│   │       ├── page.tsx      # Quiz flow
│   │       └── results/
│   │           └── page.tsx
│   └── history/
│       ├── page.tsx
│       └── [attemptId]/
│           └── page.tsx
├── components/
│   ├── ui/                   # shadcn/ui primitives
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   └── ...
│   ├── quiz/                 # Quiz-specific components
│   │   ├── QuizCard.tsx
│   │   ├── QuestionView.tsx
│   │   ├── ResultsScreen.tsx
│   │   └── ProgressBar.tsx
│   └── layout/               # Layout components
│       ├── Header.tsx
│       └── Footer.tsx
├── stores/                   # Zustand stores
│   ├── session.ts
│   └── attempt.ts
├── lib/                      # Utilities
│   ├── api.ts
│   ├── local-storage.ts
│   └── score-calculator.ts
└── hooks/                    # Custom React hooks
    ├── useQuizAttempt.ts
    └── useLocalStorage.ts
```

### Component Organization

**Quiz-specific components:**

```
components/
├── quiz/
│   ├── QuizCard.tsx          # Quiz selection card
│   ├── QuestionView.tsx      # Question + options
│   ├── FeedbackView.tsx      # Answer feedback
│   ├── ResultsScreen.tsx     # Final results
│   ├── ProgressBar.tsx       # Question progress
│   ├── LeaderboardTable.tsx  # Leaderboard display
│   └── HistoryList.tsx       # Attempt history list
```

### QuizCard Component

```typescript
// components/quiz/QuizCard.tsx
'use client'

import { Card, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import type { Quiz } from 'shared/types/quiz'

interface QuizCardProps {
  quiz: {
    id: string
    title: string
    description: string
  }
  onStart: (quizId: string) => void
  hasActiveAttempt?: boolean
}

export function QuizCard({ quiz, onStart, hasActiveAttempt }: QuizCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{quiz.title}</CardTitle>
        <CardDescription>{quiz.description}</CardDescription>
      </CardHeader>
      <CardFooter>
        <Button 
          onClick={() => onStart(quiz.id)}
          variant={hasActiveAttempt ? 'outline' : 'default'}
        >
          {hasActiveAttempt ? 'Resume' : 'Start Quiz'}
        </Button>
      </CardFooter>
    </Card>
  </Card>
  )
}
```

### QuestionView Component

```typescript
// components/quiz/QuestionView.tsx
'use client'

import { useState } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import type { Question } from 'shared/types/quiz'

interface QuestionViewProps {
  question: Question
  currentIndex: number
  totalQuestions: number
  onAnswer: (selectedOption: string) => void
}

export function QuestionView({ 
  question, 
  currentIndex, 
  totalQuestions,
  onAnswer 
}: QuestionViewProps) {
  const [selectedOption, setSelectedOption] = useState<string>()

  const handleSubmit = () => {
    if (selectedOption) {
      onAnswer(selectedOption)
    }
  }

  return (
    <div className="space-y-4">
      <div className="text-sm text-muted-foreground">
        Question {currentIndex + 1} of {totalQuestions}
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>{question.text}</CardTitle>
        </CardHeader>
        
        <CardContent className="space-y-4">
          <RadioGroup 
            value={selectedOption} 
            onValueChange={setSelectedOption}
          >
            {question.options.map((option, index) => (
              <div key={index} className="flex items-center space-x-2">
                <RadioGroupItem value={option} id={`option-${index}`} />
                <Label htmlFor={`option-${index}`}>{option}</Label>
              </div>
            ))}
          </RadioGroup>
          
          <Button 
            onClick={handleSubmit} 
            disabled={!selectedOption}
            className="w-full"
          >
            Submit Answer
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
```

### FeedbackView Component

```typescript
// components/quiz/FeedbackView.tsx
'use client'

import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { CheckCircle2, XCircle } from 'lucide-react'

interface FeedbackViewProps {
  isCorrect: boolean
  explanation: string
  onNext: () => void
  isLastQuestion: boolean
}

export function FeedbackView({ 
  isCorrect, 
  explanation, 
  onNext,
  isLastQuestion 
}: FeedbackViewProps) {
  return (
    <Card>
      <CardContent className="pt-6 space-y-4">
        <div className="flex items-center gap-2">
          {isCorrect ? (
            <>
              <CheckCircle2 className="h-6 w-6 text-green-600" />
              <span className="font-semibold text-green-600">Correct!</span>
            </>
          ) : (
            <>
              <XCircle className="h-6 w-6 text-red-600" />
              <span className="font-semibold text-red-600">Incorrect</span>
            </>
          )}
        </div>
        
        <p className="text-sm text-muted-foreground">{explanation}</p>
        
        <Button onClick={onNext} className="w-full">
          {isLastQuestion ? 'View Results' : 'Next Question'}
        </Button>
      </CardContent>
    </Card>
  )
}
```

### ResultsScreen Component

```typescript
// components/quiz/ResultsScreen.tsx
'use client'

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Trophy } from 'lucide-react'

interface ResultsScreenProps {
  score: number
  totalQuestions: number
  onRetake: () => void
  onReview: () => void
  onHome: () => void
}

export function ResultsScreen({ 
  score, 
  totalQuestions, 
  onRetake, 
  onReview,
  onHome 
}: ResultsScreenProps) {
  const percentage = Math.round((score / totalQuestions) * 100)
  
  const getMessage = () => {
    if (percentage === 100) return "Perfect score! 🎉"
    if (percentage >= 80) return "Great job! 👏"
    if (percentage >= 60) return "Good effort! 👍"
    return "Keep practicing! 💪"
  }

  return (
    <Card>
      <CardHeader className="text-center">
        <div className="flex justify-center mb-4">
          <Trophy className="h-16 w-16 text-yellow-500" />
        </div>
        <CardTitle>Quiz Complete!</CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-6">
        <div className="text-center">
          <div className="text-4xl font-bold">
            {score} / {totalQuestions}
          </div>
          <div className="text-2xl text-muted-foreground">
            {percentage}%
          </div>
          <p className="mt-2 text-lg">{getMessage()}</p>
        </div>
        
        <div className="space-y-2">
          <Button onClick={onReview} variant="outline" className="w-full">
            Review Answers
          </Button>
          <Button onClick={onRetake} variant="outline" className="w-full">
            Retake Quiz
          </Button>
          <Button onClick={onHome} className="w-full">
            Back to Home
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
```

### Page Structure

**Quiz Flow Page:**

```typescript
// app/quiz/[quizId]/page.tsx
'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { QuestionView } from '@/components/quiz/QuestionView'
import { FeedbackView } from '@/components/quiz/FeedbackView'
import { useQuizAttempt } from '@/hooks/useQuizAttempt'

interface PageProps {
  params: { quizId: string }
}

export default function QuizPage({ params }: PageProps) {
  const router = useRouter()
  const { attempt, currentQuestion, answerQuestion, completeAttempt } = 
    useQuizAttempt(params.quizId)
  
  const [showFeedback, setShowFeedback] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)

  if (!attempt || !currentQuestion) {
    return <div>Loading...</div>
  }

  const handleAnswer = (selectedOption: string) => {
    const correct = selectedOption === currentQuestion.correctOption
    setIsCorrect(correct)
    answerQuestion(currentQuestion.id, selectedOption, correct)
    setShowFeedback(true)
  }

  const handleNext = () => {
    setShowFeedback(false)
    
    if (attempt.currentQuestionIndex === attempt.questionOrder.length - 1) {
      completeAttempt()
      router.push(`/quiz/${params.quizId}/results`)
    }
  }

  return (
    <div className="container max-w-2xl mx-auto py-8">
      {showFeedback ? (
        <FeedbackView
          isCorrect={isCorrect}
          explanation={currentQuestion.explanation}
          onNext={handleNext}
          isLastQuestion={
            attempt.currentQuestionIndex === attempt.questionOrder.length - 1
          }
        />
      ) : (
        <QuestionView
          question={currentQuestion}
          currentIndex={attempt.currentQuestionIndex}
          totalQuestions={attempt.questionOrder.length}
          onAnswer={handleAnswer}
        />
      )}
    </div>
  )
}
```

## Styling Patterns

### Using Tailwind with shadcn/ui

**ALWAYS use cn() utility for conditional classes:**

```typescript
import { cn } from '@/lib/utils'

<Button 
  className={cn(
    "w-full",
    isActive && "bg-primary",
    disabled && "opacity-50"
  )}
>
  Click me
</Button>
```

### Layout Patterns

```typescript
// Centered container
<div className="container max-w-2xl mx-auto py-8">
  {children}
</div>

// Card grid
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  {quizzes.map(quiz => <QuizCard key={quiz.id} quiz={quiz} />)}
</div>

// Flex column with gap
<div className="flex flex-col gap-4">
  {items.map(item => <Item key={item.id} {...item} />)}
</div>
```

## State Management

### Zustand Store Pattern

```typescript
// stores/attempt.ts
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Attempt } from 'shared/types/attempt'

interface AttemptStore {
  activeAttempts: Record<string, Attempt>
  setActiveAttempt: (quizId: string, attempt: Attempt) => void
  getActiveAttempt: (quizId: string) => Attempt | null
  clearActiveAttempt: (quizId: string) => void
}

export const useAttemptStore = create<AttemptStore>()(
  persist(
    (set, get) => ({
      activeAttempts: {},
      
      setActiveAttempt: (quizId, attempt) =>
        set(state => ({
          activeAttempts: {
            ...state.activeAttempts,
            [quizId]: attempt,
          },
        })),
      
      getActiveAttempt: quizId => 
        get().activeAttempts[quizId] || null,
      
      clearActiveAttempt: quizId =>
        set(state => {
          const { [quizId]: _, ...rest } = state.activeAttempts
          return { activeAttempts: rest }
        }),
    }),
    {
      name: 'quizapp:activeAttemptByQuiz',
    }
  )
)
```

## Custom Hooks

```typescript
// hooks/useQuizAttempt.ts
import { useAttemptStore } from '@/stores/attempt'
import { useEffect, useState } from 'react'
import type { Quiz, Question } from 'shared/types/quiz'

export function useQuizAttempt(quizId: string) {
  const { getActiveAttempt, setActiveAttempt } = useAttemptStore()
  const [attempt, setAttempt] = useState(getActiveAttempt(quizId))
  const [quiz, setQuiz] = useState<Quiz | null>(null)

  useEffect(() => {
    // Load quiz from API
    fetch(`/api/quizzes/${quizId}`)
      .then(res => res.json())
      .then(data => setQuiz(data))
  }, [quizId])

  const currentQuestion = quiz && attempt
    ? quiz.questions[attempt.currentQuestionIndex]
    : null

  return {
    attempt,
    quiz,
    currentQuestion,
    answerQuestion: (questionId: string, answer: string, isCorrect: boolean) => {
      // Update attempt logic
    },
    completeAttempt: () => {
      // Complete attempt logic
    },
  }
}
```

## Best Practices

### ALWAYS:
- Use shadcn/ui components as base
- Keep components small and focused (< 200 lines)
- Extract reusable logic to custom hooks
- Use Zustand for global state (session, attempts)
- Use React Query for server state (quiz data)
- Co-locate component styles with Tailwind classes
- Use TypeScript strict mode

### NEVER:
- Mix server and client components without 'use client'
- Fetch data in client components (use Server Components or React Query)
- Put business logic in components (use hooks or services)
- Skip prop typing (always define interfaces)
- Use inline styles (use Tailwind)
- Mutate Zustand state directly (use actions)

## Testing UI Components

```typescript
import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { QuizCard } from './QuizCard'

describe('QuizCard', () => {
  const mockQuiz = {
    id: 'test-quiz',
    title: 'Test Quiz',
    description: 'Test description',
  }

  it('should render quiz information', () => {
    render(<QuizCard quiz={mockQuiz} onStart={() => {}} />)
    
    expect(screen.getByText('Test Quiz')).toBeInTheDocument()
    expect(screen.getByText('Test description')).toBeInTheDocument()
  })

  it('should call onStart when button clicked', () => {
    const onStart = vi.fn()
    render(<QuizCard quiz={mockQuiz} onStart={onStart} />)
    
    fireEvent.click(screen.getByText('Start Quiz'))
    expect(onStart).toHaveBeenCalledWith('test-quiz')
  })
})
```

## Resources

- **Next.js 15:** [/skills/nextjs-15/SKILL.md](/skills/nextjs-15/SKILL.md)
- **React 19:** [/skills/react-19/SKILL.md](/skills/react-19/SKILL.md)
- **Tailwind 4:** [/skills/tailwind-4/SKILL.md](/skills/tailwind-4/SKILL.md)
- **Zustand 5:** [/skills/zustand-5/SKILL.md](/skills/zustand-5/SKILL.md)
- **shadcn/ui:** https://ui.shadcn.com
