import express from 'express'
import cors from 'cors'
import quizRoutes from './routes/quiz.routes'
import { errorHandler } from './middleware/error-handler'
import { requestLogger } from './middleware/request-logger'
import { notFoundHandler } from './middleware/not-found'

const app = express()
const PORT = process.env.PORT ?? 3001

// Middleware
app.use(cors())
app.use(express.json())
app.use(requestLogger)

// Health check
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() })
})

// Routes
app.use('/api/quizzes', quizRoutes)

// 404 handler (must be before error handler)
app.use(notFoundHandler)

// Error handler (must be last)
app.use(errorHandler)

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Backend running on http://localhost:${PORT}`)
  console.log(`📋 Health check: http://localhost:${PORT}/api/health`)
  console.log(`📚 Quizzes API: http://localhost:${PORT}/api/quizzes`)
})

export default app
