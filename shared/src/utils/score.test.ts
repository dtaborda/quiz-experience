import { describe, expect, it } from 'vitest'

import type { Answer } from '../schemas/attempt'
import { calculateScore } from './score'

const sampleAnswers = (correctCount: number, total: number): Answer[] =>
  Array.from({ length: total }, (_, index) => ({
    questionId: `q${index + 1}`,
    selectedOptionId: 'opt',
    isCorrect: index < correctCount,
    answeredAt: new Date(2025, 0, 1, 12, 0, index).toISOString(),
  }))

describe('calculateScore', () => {
  it('returns zero metrics when there are no answers', () => {
    expect(calculateScore([])).toEqual({
      totalQuestions: 0,
      correctAnswers: 0,
      score: 0,
      maxScore: 0,
      percentage: 0,
    })
  })

  it('computes score, maxScore, and percentage with default weights', () => {
    const breakdown = calculateScore(sampleAnswers(3, 5))

    expect(breakdown).toEqual({
      totalQuestions: 5,
      correctAnswers: 3,
      score: 3,
      maxScore: 5,
      percentage: 60,
    })
  })

  it('supports custom points per question', () => {
    const breakdown = calculateScore(sampleAnswers(4, 8), 2)

    expect(breakdown).toEqual({
      totalQuestions: 8,
      correctAnswers: 4,
      score: 8,
      maxScore: 16,
      percentage: 50,
    })
  })
})
