import type { Request, Response, NextFunction } from 'express'

/**
 * 404 Not Found handler - must be registered after all routes
 */
export function notFoundHandler(_req: Request, res: Response, _next: NextFunction): void {
  res.status(404).json({
    error: 'Route not found',
    path: _req.originalUrl,
    method: _req.method,
  })
}