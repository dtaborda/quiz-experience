import type { Answer } from '../schemas/attempt'

export interface ScoreBreakdown {
  totalQuestions: number
  correctAnswers: number
  score: number
  maxScore: number
  percentage: number
}

export function calculateScore(answers: Answer[], pointsPerQuestion = 1): ScoreBreakdown {
  const totalQuestions = answers.length
  const correctAnswers = answers.filter(answer => answer.isCorrect).length
  const score = correctAnswers * pointsPerQuestion
  const maxScore = totalQuestions * pointsPerQuestion
  const percentage = totalQuestions === 0 ? 0 : (score / maxScore) * 100

  return {
    totalQuestions,
    correctAnswers,
    score,
    maxScore,
    percentage,
  }
}
