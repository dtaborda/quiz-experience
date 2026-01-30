import type { Question } from '../schemas/quiz'

function mulberry32(initialSeed: number): () => number {
  let seed = initialSeed
  return () => {
    seed += 0x6d2b79f5
    let t = seed
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

export function shuffleQuestionOrder(ids: string[], seedInput: string | number): string[] {
  const result = [...ids]
  if (result.length <= 1) return result

  const seedNumber = typeof seedInput === 'number' ? seedInput : Array.from(seedInput).reduce((acc, char) => acc + char.charCodeAt(0), 0)
  const random = mulberry32(seedNumber)

  for (let i = result.length - 1; i > 0; i -= 1) {
    const j = Math.floor(random() * (i + 1))
    const current = result[i]
    const target = result[j]

    if (current === undefined || target === undefined) continue

    result[i] = target
    result[j] = current
  }

  return result
}
