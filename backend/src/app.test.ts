import { describe, expect, it, beforeAll } from 'vitest'
import request from 'supertest'
import app from '../src/app'

describe('API Endpoints', () => {
  describe('GET /api/health', () => {
    it('should return health status', async () => {
      const res = await request(app).get('/api/health').expect(200)

      expect(res.body).toHaveProperty('status', 'ok')
      expect(res.body).toHaveProperty('timestamp')
      expect(new Date(res.body.timestamp)).toBeInstanceOf(Date)
    })
  })

  describe('GET /api/quizzes', () => {
    it('should return array of quiz summaries', async () => {
      const res = await request(app).get('/api/quizzes').expect(200)

      expect(Array.isArray(res.body)).toBe(true)
      expect(res.body.length).toBeGreaterThanOrEqual(3)

      // Check structure of first quiz
      const first = res.body[0]
      expect(first).toHaveProperty('id')
      expect(first).toHaveProperty('title')
      expect(first).toHaveProperty('description')
      expect(first).toHaveProperty('metadata')
      expect(first).toHaveProperty('questionCount')
      expect(typeof first.questionCount).toBe('number')
    })
  })

  describe('GET /api/quizzes/:quizId', () => {
    it('should return full quiz for valid ID', async () => {
      const res = await request(app).get('/api/quizzes/agent-fundamentals').expect(200)

      expect(res.body).toHaveProperty('id', 'agent-fundamentals')
      expect(res.body).toHaveProperty('title')
      expect(res.body).toHaveProperty('description')
      expect(res.body).toHaveProperty('questions')
      expect(Array.isArray(res.body.questions)).toBe(true)
      expect(res.body).toHaveProperty('metadata')
    })

    it('should return 404 for non-existent quiz', async () => {
      const res = await request(app).get('/api/quizzes/non-existent').expect(404)

      expect(res.body).toHaveProperty('error')
      expect(res.body.error).toContain('not found')
    })
  })

  describe('404 handler', () => {
    it('should return 404 for unknown routes', async () => {
      const res = await request(app).get('/api/unknown-route').expect(404)

      expect(res.body).toHaveProperty('error', 'Route not found')
      expect(res.body).toHaveProperty('path')
    })
  })
})