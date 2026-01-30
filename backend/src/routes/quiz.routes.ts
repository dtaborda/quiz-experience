import { Router } from 'express'
import type { Request, Response } from 'express'
import { asyncHandler } from '../utils/async-handler'
import * as quizService from '../services/quiz.service'

const router = Router()

/**
 * GET /api/quizzes
 * Get all quiz summaries
 */
router.get(
  '/',
  asyncHandler(async (_req: Request, res: Response) => {
    const summaries = await quizService.getQuizSummaries()
    res.json(summaries)
  }),
)

/**
 * GET /api/quizzes/:quizId
 * Get full quiz by ID
 */
router.get(
  '/:quizId',
  asyncHandler(async (req: Request, res: Response) => {
    const { quizId } = req.params
    const quiz = await quizService.getQuizById(quizId)

    if (!quiz) {
      res.status(404).json({ error: `Quiz '${quizId}' not found` })
      return
    }

    res.json(quiz)
  }),
)

export default router
