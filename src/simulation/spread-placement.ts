/**
 * Random canvas placement with light separation so elements spread across
 * the viewport instead of clustering or sitting on fixed grids.
 */

import type { Rng } from './prng'

export type Point2 = { x: number, y: number }

export function canvasPad(w: number, h: number, fraction = 0.04) {
  return Math.min(w, h) * fraction
}

/** Uniform random point inside the canvas with edge padding. */
export function randomInCanvas(rng: Rng, w: number, h: number, pad?: number): Point2 {
  const p = pad ?? canvasPad(w, h)
  return { x: rng.range(p, w - p), y: rng.range(p, h - p) }
}

export type PlaceSpreadOptions = {
  pad?: number
  /** Minimum distance between accepted points (defaults from canvas size). */
  minDist?: number
  maxAttempts?: number
}

/**
 * Place `count` points at random positions, rejecting candidates that sit
 * too close to an existing point. Falls back to pure random if crowded.
 */
export function placeSpreadPoints(
  rng: Rng,
  count: number,
  w: number,
  h: number,
  options: PlaceSpreadOptions = {},
): Point2[] {
  const pad = options.pad ?? canvasPad(w, h)
  const minDist =
    options.minDist ??
    Math.min(w, h) * Math.max(0.06, Math.min(0.14, 0.55 / Math.sqrt(Math.max(count, 1))))
  const maxAttempts = options.maxAttempts ?? 32
  const points: Point2[] = []

  for (let i = 0; i < count; i++) {
    const r = rng.fork(i * 131 + 17)
    let placed = false
    for (let attempt = 0; attempt < maxAttempts; attempt++) {
      const t = r.fork(attempt * 7)
      const candidate = { x: t.range(pad, w - pad), y: t.range(pad, h - pad) }
      if (points.every(p => Math.hypot(p.x - candidate.x, p.y - candidate.y) >= minDist)) {
        points.push(candidate)
        placed = true
        break
      }
    }
    if (!placed) points.push(randomInCanvas(r, w, h, pad))
  }

  return points
}

/** Spread points in normalized 0–1 space (e.g. layer anchors). */
export function placeSpreadNorm(
  rng: Rng,
  count: number,
  options: Omit<PlaceSpreadOptions, 'pad'> & { pad?: number } = {},
): Point2[] {
  const pad = options.pad ?? 0.06
  return placeSpreadPoints(rng, count, 1, 1, { ...options, pad })
}
