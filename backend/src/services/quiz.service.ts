import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { QuizSchema, type Quiz, type QuizSummary } from 'shared'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const QUIZ_DIR = path.join(__dirname, '../../data/quizzes')

// Simple in-memory cache
let quizCache: Quiz[] | null = null
let cacheTimestamp = 0
const CACHE_TTL_MS = 60_000 // 1 minute

/**
 * Get all quizzes from JSON files with caching
 */
export async function getAllQuizzes(): Promise<Quiz[]> {
  const now = Date.now()

  // Return cached data if fresh
  if (quizCache && now - cacheTimestamp < CACHE_TTL_MS) {
    return quizCache
  }

  try {
    const files = await fs.readdir(QUIZ_DIR)
    const jsonFiles = files.filter((f) => f.endsWith('.json'))

    const quizzes = await Promise.all(
      jsonFiles.map(async (file) => {
        const content = await fs.readFile(path.join(QUIZ_DIR, file), 'utf-8')
        const data = JSON.parse(content)
        return QuizSchema.parse(data)
      }),
    )

    // Update cache
    quizCache = quizzes
    cacheTimestamp = now

    return quizzes
  } catch (error) {
    console.error('Error loading quizzes:', error)
    return quizCache ?? []
  }
}

/**
 * Get quiz summaries (without full question data)
 */
export async function getQuizSummaries(): Promise<QuizSummary[]> {
  const quizzes = await getAllQuizzes()
  return quizzes.map(({ id, title, description, metadata, questions }) => ({
    id,
    title,
    description,
    metadata,
    questionCount: questions.length,
  }))
}

/**
 * Get a single quiz by ID
 */
export async function getQuizById(quizId: string): Promise<Quiz | null> {
  try {
    const filePath = path.join(QUIZ_DIR, `${quizId}.json`)
    const content = await fs.readFile(filePath, 'utf-8')
    const data = JSON.parse(content)
    return QuizSchema.parse(data)
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
      return null
    }
    throw error
  }
}
