declare global {
  interface Window {
    __beehoopProcessPhase?: number
  }
}

function clampPhase(phase: number): number {
  if (!Number.isFinite(phase)) return 0
  return Math.max(0, Math.min(4, Math.round(phase)))
}

export function getProcessPhase(): number {
  if (typeof window === 'undefined') return 0
  return clampPhase(window.__beehoopProcessPhase ?? 0)
}

export function setProcessPhase(phase: number): void {
  if (typeof window === 'undefined') return
  window.__beehoopProcessPhase = clampPhase(phase)
}
