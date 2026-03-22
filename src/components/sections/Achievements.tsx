'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { useTheme } from 'next-themes'
import { TextScramble } from '@/components/ui/TextScramble'
import { achievements } from '@/lib/data'

const EASE = [0.16, 1, 0.3, 1] as const

export default function Achievements() {
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  useEffect(() => { setMounted(true) }, [])

  const isDark = !mounted || resolvedTheme === 'dark'

  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-12%' })

  // ── Theme tokens ──────────────────────────────────────────────────────────
  const STAT_COLOR  = isDark ? '#C8920A' : '#A06B08'
  const LBL_COLOR   = isDark ? '#FFFFFF' : '#1A0E04'
  const SUB_COLOR   = isDark ? '#566578' : '#7A6248'
  const DIV_COLOR   = isDark ? 'rgba(255,255,255,0.06)' : 'rgba(200,146,10,0.14)'
  const PULSE_COLOR = isDark ? 'rgba(200,146,10,0.25)' : 'rgba(160,107,8,0.20)'

  // Subtle ambient amber tint — perceived as warmth, not consciously seen
  const SECTION_TINT = isDark
    ? 'linear-gradient(to bottom, transparent 0%, rgba(200,146,10,0.025) 50%, transparent 100%)'
    : 'linear-gradient(to bottom, transparent 0%, rgba(200,146,10,0.015) 50%, transparent 100%)'

  // Bottom fade — subconsciously previews the Advisory void before it arrives
  const BOTTOM_FADE = isDark
    ? 'linear-gradient(to bottom, transparent 60%, rgba(7,6,10,0.40) 100%)'
    : 'linear-gradient(to bottom, transparent 60%, rgba(253,250,244,0.20) 100%)'

  const formatStat = (a: typeof achievements[number]) =>
    `${a.prefix ?? ''}${a.numericValue}${a.suffix}`

  return (
    <section
      ref={sectionRef}
      aria-label="Key metrics"
      className="relative overflow-hidden py-20 md:py-24 bg-background"
    >
      {/* Ambient amber warmth tint */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{ background: SECTION_TINT }}
      />

      {/* Bottom fade into Advisory void */}
      <div
        className="absolute bottom-0 left-0 right-0 h-20 pointer-events-none"
        aria-hidden="true"
        style={{ background: BOTTOM_FADE }}
      />

      <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-20 relative z-10">
        <div className="relative grid grid-cols-2 md:grid-cols-4">

          {/* ── Animated vertical dividers (md+, draw in top-to-bottom) ── */}
          {([0.25, 0.50, 0.75] as const).map((pos, i) => (
            <div
              key={i}
              aria-hidden="true"
              className="hidden md:block absolute top-8 bottom-8"
              style={{
                left: `${pos * 100}%`,
                width: '1px',
                background: DIV_COLOR,
                transform: isInView ? 'scaleY(1)' : 'scaleY(0)',
                transformOrigin: 'top',
                transition: `transform 0.8s cubic-bezier(0.16,1,0.3,1) ${0.28 + i * 0.15}s`,
              }}
            />
          ))}

          {/* ── Horizontal divider between rows on mobile ── */}
          <div
            aria-hidden="true"
            className="md:hidden absolute left-0 right-0"
            style={{
              top: '50%',
              height: '1px',
              background: DIV_COLOR,
              transform: isInView ? 'scaleX(1)' : 'scaleX(0)',
              transformOrigin: 'center',
              transition: 'transform 0.8s cubic-bezier(0.16,1,0.3,1) 0.30s',
            }}
          />

          {achievements.map((a, i) => (
            <div
              key={i}
              className="flex flex-col items-center justify-center px-4 py-12 md:py-14"
            >
              {/* Pulse ring + stat number wrapper */}
              <div className="relative flex items-center justify-center mb-5">
                {/* Concentric pulse ring */}
                <div
                  aria-hidden="true"
                  className="kpi-pulse-ring"
                  style={{
                    '--pulse-delay': `${i * 0.8}s`,
                    width: '76px',
                    height: '76px',
                    color: PULSE_COLOR,
                  } as React.CSSProperties}
                />

                {/* Stat number — TextScramble (data terminal effect) */}
                <h3
                  className="font-syne font-bold tabular-nums text-center relative"
                  style={{
                    fontSize: 'clamp(2.6rem, 4.5vw, 4.5rem)',
                    lineHeight: 1,
                    color: STAT_COLOR,
                    letterSpacing: '-0.02em',
                  }}
                  aria-label={`${a.prefix ?? ''}${a.numericValue}${a.suffix} ${a.label}`}
                >
                  <TextScramble
                    text={formatStat(a)}
                    trigger={isInView}
                    duration={1400 + i * 200}
                  />
                </h3>
              </div>

              {/* Stat label */}
              <motion.p
                className="font-sans text-[11px] font-medium uppercase tracking-[0.25em] text-center mb-1.5"
                style={{ color: LBL_COLOR }}
                initial={{ opacity: 0, y: 10 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, ease: EASE, delay: 0.45 + i * 0.10 }}
              >
                {a.label}
              </motion.p>

              {/* Sub-label */}
              {a.subLabel && (
                <motion.p
                  className="font-sans text-[11px] text-center"
                  style={{ color: SUB_COLOR }}
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : {}}
                  transition={{ duration: 0.5, ease: EASE, delay: 0.60 + i * 0.10 }}
                >
                  {a.subLabel}
                </motion.p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
