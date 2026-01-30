import { z } from 'zod'

/**
 * Answer Schema
 * Represents a user's answer to a single question
 */
export const AnswerSchema = z.object({
  questionId: z.string(),
  selectedOptionId: z.string(),
  isCorrect: z.boolean(),
  answeredAt: z.string().datetime(),
})

export type Answer = z.infer<typeof AnswerSchema>

/**
 * Attempt Status
 */
export const AttemptStatusSchema = z.enum(['active', 'completed'])

export type AttemptStatus = z.infer<typeof AttemptStatusSchema>

/**
 * Quiz Mode
 */
export const QuizModeSchema = z.enum(['normal', 'learn'])

export type QuizMode = z.infer<typeof QuizModeSchema>

/**
 * Attempt Schema
 * Represents a single quiz attempt by a user
 * 
 * Rules:
 * - One active attempt per quiz per user
 * - Multiple completed attempts allowed
 * - Completed attempts are immutable
 */
export const AttemptSchema = z.object({
  id: z.string(),
  quizId: z.string(),
  userId: z.string(), // username from session
  status: AttemptStatusSchema,
  answers: z.array(AnswerSchema),
  questionOrder: z.array(z.string()), // Stable randomized order
  mode: QuizModeSchema,
  startedAt: z.string().datetime(),
  completedAt: z.string().datetime().optional(),
  score: z.number().int().nonnegative().optional(),
})

export type Attempt = z.infer<typeof AttemptSchema>

/**
 * Active Attempts Map Schema
 * Maps quizId to active attempt
 */
export const ActiveAttemptsMapSchema = z.record(z.string(), AttemptSchema)

export type ActiveAttemptsMap = z.infer<typeof ActiveAttemptsMapSchema>
