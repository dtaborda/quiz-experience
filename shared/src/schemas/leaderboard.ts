import { z } from 'zod'

/**
 * Leaderboard Entry Schema
 * Represents a single entry in the global leaderboard
 */
export const LeaderboardEntrySchema = z.object({
  username: z.string(),
  totalScore: z.number().int().nonnegative(),
  quizzesCompleted: z.number().int().nonnegative(),
  averageScore: z.number().nonnegative(),
  rank: z.number().int().positive(),
})

export type LeaderboardEntry = z.infer<typeof LeaderboardEntrySchema>

/**
 * Leaderboard Schema
 */
export const LeaderboardSchema = z.object({
  entries: z.array(LeaderboardEntrySchema),
  generatedAt: z.string().datetime(),
})

export type Leaderboard = z.infer<typeof LeaderboardSchema>

/**
 * Quiz-Specific Leaderboard Entry Schema
 */
export const QuizLeaderboardEntrySchema = z.object({
  username: z.string(),
  score: z.number().int().nonnegative(),
  maxScore: z.number().int().positive(),
  percentage: z.number().nonnegative(),
  completedAt: z.string().datetime(),
  rank: z.number().int().positive(),
})

export type QuizLeaderboardEntry = z.infer<typeof QuizLeaderboardEntrySchema>

/**
 * Quiz-Specific Leaderboard Schema
 */
export const QuizLeaderboardSchema = z.object({
  quizId: z.string(),
  quizTitle: z.string(),
  entries: z.array(QuizLeaderboardEntrySchema),
  generatedAt: z.string().datetime(),
})

export type QuizLeaderboard = z.infer<typeof QuizLeaderboardSchema>
