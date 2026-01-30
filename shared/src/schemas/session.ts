import { z } from 'zod'

/**
 * Session Schema
 * Represents a logged-in user session (stored in localStorage)
 */
export const SessionSchema = z.object({
  username: z.string().min(1, 'Username is required'),
  loginTime: z.string().datetime(),
})

export type Session = z.infer<typeof SessionSchema>
