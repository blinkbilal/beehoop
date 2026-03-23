// ─── Window-global active outcome index ─────────────────────────────────────
// Written by CaseStudies.tsx, read by OutcomesCanvas.tsx every rAF frame.
// -1 = no card focused, 0–9 = case index in the GLOBAL cases array.
// Same pattern as processPhaseStore.ts used by the Process section.

declare global {
  interface Window {
    __beehoopOutcomesActive: number
    __beehoopOutcomesFilter: string  // 'all' | 'advisory' | 'intelligence' | 'engineering'
  }
}

export function getOutcomesActive(): number {
  if (typeof window === 'undefined') return -1
  return window.__beehoopOutcomesActive ?? -1
}

export function setOutcomesActive(n: number): void {
  if (typeof window !== 'undefined') {
    window.__beehoopOutcomesActive = n < -1 ? -1 : n
  }
}

// ─── Active pillar filter ─────────────────────────────────────────────────────
// Written by CaseStudies.tsx filter tabs, read by OutcomesCanvas.tsx every rAF.
// When non-'all', nodes of other pillars fade to near-invisible.

export function getOutcomesFilter(): string {
  if (typeof window === 'undefined') return 'all'
  return window.__beehoopOutcomesFilter ?? 'all'
}

export function setOutcomesFilter(filter: string): void {
  if (typeof window !== 'undefined') {
    window.__beehoopOutcomesFilter = filter
  }
}
