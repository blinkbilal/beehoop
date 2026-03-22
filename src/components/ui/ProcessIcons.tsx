'use client'

import { motion, type Variants } from 'framer-motion'

/**
 * 5 SVG line-drawing icons for the Process section.
 * Controlled via `animate` prop so the parent scroll-pinned layout
 * can trigger draw-in when each step becomes active.
 */

const draw: Variants = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: (i: number) => ({
    pathLength: 1,
    opacity: 1,
    transition: {
      pathLength: { delay: i * 0.12, type: 'spring', duration: 1.0, bounce: 0 },
      opacity: { delay: i * 0.12, duration: 0.01 },
    },
  }),
}

const dotDraw: Variants = {
  hidden: { scale: 0, opacity: 0 },
  visible: (i: number) => ({
    scale: 1,
    opacity: 1,
    transition: { delay: i * 0.12, type: 'spring', duration: 0.6, bounce: 0.3 },
  }),
}

interface ProcessIconProps {
  /** When true, the SVG paths draw themselves in */
  animate: boolean
  className?: string
}

// 01 — Discovery & Diagnosis (magnifying glass with crosshair)
export function ProcessIcon01({ animate, className = '' }: ProcessIconProps) {
  const state = animate ? 'visible' : 'hidden'
  return (
    <motion.svg viewBox="0 0 64 64" className={className} animate={state} initial="hidden">
      <motion.circle cx="26" cy="26" r="16" fill="none" stroke="currentColor" strokeWidth="2" custom={0} variants={draw} />
      <motion.path d="M38 38 L52 52" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" custom={1} variants={draw} />
      <motion.path d="M20 26 L24 26 M26 20 L26 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" custom={2} variants={draw} />
      <motion.circle cx="26" cy="26" r="5" fill="none" stroke="currentColor" strokeWidth="1.5" custom={3} variants={draw} />
    </motion.svg>
  )
}

// 02 — Strategy & Architecture (diamond hierarchy)
export function ProcessIcon02({ animate, className = '' }: ProcessIconProps) {
  const state = animate ? 'visible' : 'hidden'
  return (
    <motion.svg viewBox="0 0 64 64" className={className} animate={state} initial="hidden">
      <motion.path d="M32 8 L52 28 L32 56 L12 28 Z" fill="none" stroke="currentColor" strokeWidth="2" custom={0} variants={draw} />
      <motion.path d="M32 8 L32 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 2" custom={1} variants={draw} />
      <motion.path d="M32 40 L32 56" fill="none" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 2" custom={1} variants={draw} />
      <motion.path d="M20 28 L44 28" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="2 3" custom={2} variants={draw} />
      <motion.circle cx="32" cy="28" r="4" fill="currentColor" custom={3} variants={dotDraw} />
    </motion.svg>
  )
}

// 03 — Modelling & Validation (scatter plot with rising trend + check)
export function ProcessIcon03({ animate, className = '' }: ProcessIconProps) {
  const state = animate ? 'visible' : 'hidden'
  return (
    <motion.svg viewBox="0 0 64 64" className={className} animate={state} initial="hidden">
      <motion.path d="M10 54 L54 54" fill="none" stroke="currentColor" strokeWidth="1.5" custom={0} variants={draw} />
      <motion.path d="M10 54 L10 10" fill="none" stroke="currentColor" strokeWidth="1.5" custom={0} variants={draw} />
      <motion.path d="M14 44 L28 32 L38 36 L52 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" custom={1} variants={draw} />
      {[{ cx: 14, cy: 44 }, { cx: 28, cy: 32 }, { cx: 38, cy: 36 }, { cx: 52, cy: 16 }].map((p, i) => (
        <motion.circle key={i} cx={p.cx} cy={p.cy} r="3" fill="currentColor" custom={2 + i * 0.15} variants={dotDraw} />
      ))}
      {/* Validation checkmark */}
      <motion.path d="M44 44 L48 48 L54 40" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" custom={3} variants={draw} />
    </motion.svg>
  )
}

// 04 — Engineering & Build (blueprint + gear)
export function ProcessIcon04({ animate, className = '' }: ProcessIconProps) {
  const state = animate ? 'visible' : 'hidden'
  return (
    <motion.svg viewBox="0 0 64 64" className={className} animate={state} initial="hidden">
      <motion.rect x="8" y="8" width="48" height="48" rx="4" fill="none" stroke="currentColor" strokeWidth="1.5" custom={0} variants={draw} />
      <motion.path d="M8 24 L56 24" fill="none" stroke="currentColor" strokeWidth="0.8" strokeDasharray="3 3" custom={1} variants={draw} />
      <motion.path d="M8 40 L56 40" fill="none" stroke="currentColor" strokeWidth="0.8" strokeDasharray="3 3" custom={1} variants={draw} />
      <motion.path d="M24 8 L24 56" fill="none" stroke="currentColor" strokeWidth="0.8" strokeDasharray="3 3" custom={1} variants={draw} />
      <motion.path d="M40 8 L40 56" fill="none" stroke="currentColor" strokeWidth="0.8" strokeDasharray="3 3" custom={1} variants={draw} />
      <motion.circle cx="32" cy="32" r="8" fill="none" stroke="currentColor" strokeWidth="2" custom={2} variants={draw} />
      <motion.path d="M32 26 L32 38 M26 32 L38 32" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" custom={3} variants={draw} />
    </motion.svg>
  )
}

// 05 — Launch & Partnership (rocket with thrust + orbit arcs)
export function ProcessIcon05({ animate, className = '' }: ProcessIconProps) {
  const state = animate ? 'visible' : 'hidden'
  return (
    <motion.svg viewBox="0 0 64 64" className={className} animate={state} initial="hidden">
      <motion.path d="M32 56 L32 18 M32 18 L24 28 M32 18 L40 28" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" custom={0} variants={draw} />
      <motion.path d="M20 44 Q8 32 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 2" custom={1} variants={draw} />
      <motion.path d="M44 44 Q56 32 44 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 2" custom={1} variants={draw} />
      {/* Thrust flames */}
      <motion.path d="M28 50 L32 56 L36 50" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" custom={2} variants={draw} />
      <motion.circle cx="32" cy="14" r="4" fill="currentColor" custom={3} variants={dotDraw} />
    </motion.svg>
  )
}

/** Ordered array for iteration inside Process section */
export const processIcons = [
  ProcessIcon01,
  ProcessIcon02,
  ProcessIcon03,
  ProcessIcon04,
  ProcessIcon05,
] as const
