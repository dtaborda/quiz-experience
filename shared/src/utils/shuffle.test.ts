import { describe, expect, it } from 'vitest'

import { shuffleQuestionOrder } from './shuffle'

const QUESTION_IDS = ['q1', 'q2', 'q3', 'q4', 'q5']

describe('shuffleQuestionOrder', () => {
  it('returns identical order when seed and inputs match', () => {
    const first = shuffleQuestionOrder(QUESTION_IDS, 'seed-1')
    const second = shuffleQuestionOrder(QUESTION_IDS, 'seed-1')

    expect(first).toEqual(second)
    expect(first).not.toEqual(QUESTION_IDS)
  })

  it('returns different order when seeds differ', () => {
    const first = shuffleQuestionOrder(QUESTION_IDS, 'seed-A')
    const second = shuffleQuestionOrder(QUESTION_IDS, 'seed-B')

    expect(first).not.toEqual(second)
  })

  it('does not mutate the input array', () => {
    const copy = [...QUESTION_IDS]
    shuffleQuestionOrder(copy, 42)

    expect(copy).toEqual(QUESTION_IDS)
  })
})
