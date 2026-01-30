import { z } from 'zod'

/**
 * Question Option Schema
 */
export const OptionSchema = z.object({
  id: z.string(),
  text: z.string(),
})

export type Option = z.infer<typeof OptionSchema>

/**
 * Question Schema
 */
export const QuestionSchema = z.object({
  id: z.string(),
  text: z.string(),
  options: z.array(OptionSchema).min(2, 'At least 2 options required'),
  correctOptionId: z.string(),
  explanation: z.string().optional(),
  conceptExplanation: z.string().optional(), // For learning mode
})

export type Question = z.infer<typeof QuestionSchema>

/**
 * Quiz Metadata Schema
 */
export const QuizMetadataSchema = z.object({
  difficulty: z.enum(['beginner', 'intermediate', 'advanced']),
  estimatedMinutes: z.number().int().positive(),
  tags: z.array(z.string()),
})

export type QuizMetadata = z.infer<typeof QuizMetadataSchema>

/**
 * Quiz Schema
 */
export const QuizSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  questions: z.array(QuestionSchema).min(1, 'At least 1 question required'),
  metadata: QuizMetadataSchema,
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
})

export type Quiz = z.infer<typeof QuizSchema>

/**
 * Quiz Summary Schema (for listing quizzes without full question data)
 */
export const QuizSummarySchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  metadata: QuizMetadataSchema,
  questionCount: z.number().int().nonnegative(),
})

export type QuizSummary = z.infer<typeof QuizSummarySchema>
