'use client'

/**
 * OutcomeCard — premium holographic glass panel for the Client Outcomes section.
 * Features:
 *   • Pillar-coloured top accent rail
 *   • Glass morphism (dark / light theme aware)
 *   • Oversized proof metric with pop animation on activation
 *   • Outcome headline + intelligence brief
 *   • Active / inactive / dimmed states for the horizontal reel
 *   • Mobile variant: left-border accent instead of top rail
 */

import { CaseStudy } from '@/lib/data'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { CSSProperties } from 'react'

// ─── Pillar colour tokens ─────────────────────────────────────────────────────
const PILLAR = {
  advisory: {
    hex:   '#C8920A',
    rgb:   '200,146,10',
    label: 'Advisory',
  },
  intelligence: {
    hex:   '#3B82F6',
    rgb:   '59,130,246',
    label: 'Intelligence',
  },
  engineering: {
    hex:   '#10B981',
    rgb:   '16,185,129',
    label: 'Engineering',
  },
} as const

const EASE = [0.16, 1, 0.3, 1] as const

interface OutcomeCardProps extends Pick<
  CaseStudy,
  'slug' | 'sector' | 'brief' | 'metric' | 'metricLabel' | 'outcome' | 'pillar' | 'service'
> {
  active:  boolean
  dimmed?: boolean   // desktop: non-matching pillar filter
  mobile?: boolean
  style?:  CSSProperties
}

export default function OutcomeCard({
  slug,
  sector,
  service,
  brief,
  metric,
  metricLabel,
  outcome,
  pillar,
  active,
  dimmed = false,
  mobile = false,
  style,
}: OutcomeCardProps) {
  const { hex, rgb, label } = PILLAR[pillar]


  // ── Glass panel styles — section is ALWAYS dark cosmos ─────────────────
  const cardStyle: CSSProperties = {
    transition: 'opacity 450ms ease, transform 450ms cubic-bezier(0.16,1,0.3,1), box-shadow 450ms ease',
    opacity: dimmed ? 0.28 : 1,
    transform: dimmed ? 'scale(0.973)' : 'scale(1)',
    ...(active
      ? {
          background: `linear-gradient(145deg, rgba(${rgb},0.115) 0%, rgba(8,14,28,0.82) 50%, rgba(${rgb},0.038) 100%)`,
          backdropFilter: 'blur(32px) saturate(180%)',
          WebkitBackdropFilter: 'blur(32px) saturate(180%)',
          border: `1px solid rgba(${rgb},0.30)`,
          boxShadow: `0 0 80px rgba(${rgb},0.18), 0 24px 48px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.07)`,
        }
      : {
          background: 'linear-gradient(145deg, rgba(255,255,255,0.055) 0%, rgba(8,12,28,0.72) 60%, rgba(255,255,255,0.018) 100%)',
          backdropFilter: 'blur(20px) saturate(140%)',
          WebkitBackdropFilter: 'blur(20px) saturate(140%)',
          border: '1px solid rgba(255,255,255,0.10)',
          boxShadow: '0 8px 32px rgba(0,0,0,0.40)',
        }
    ),
    ...style,
  }

  // ── Top accent rail (desktop) / Left accent border (mobile) ───────────────
  const accentRail = mobile
    ? {
        position: 'absolute' as const,
        top: 0,
        left: 0,
        width: '4px',
        bottom: 0,
        borderRadius: '8px 0 0 8px',
        background: `linear-gradient(to bottom, ${hex}, rgba(${rgb},0.3))`,
        opacity: active ? 1 : 0.4,
        transition: 'opacity 400ms ease',
      }
    : {
        position: 'absolute' as const,
        top: 0,
        left: 0,
        right: 0,
        height: '2px',
        borderRadius: '12px 12px 0 0',
        background: active
          ? `linear-gradient(to right, transparent, ${hex} 30%, rgba(${rgb},0.65) 70%, transparent)`
          : `linear-gradient(to right, transparent, rgba(${rgb},0.40) 30%, rgba(${rgb},0.20) 70%, transparent)`,
        transition: 'opacity 400ms ease, background 400ms ease',
      }

  return (
    <Link
      href={`/cases/${slug}`}
      className={`block relative outline-none group ${mobile ? 'w-full' : 'flex-shrink-0 w-[300px] first:w-[360px] h-[460px]'}`}
      style={cardStyle}
    >
      {/* Accent rail */}
      <div aria-hidden="true" style={accentRail} />

      <div className={`relative flex flex-col h-full ${mobile ? 'p-6 pl-8' : 'p-7'}`}>

        {/* ── Header row — sector + pillar badge ──────────────────────────────── */}
        <div className="flex items-start justify-between gap-3 mb-5">
          <div className="min-w-0">
            <p
              className="font-mono text-[9px] uppercase tracking-[0.28em] leading-none mb-1.5"
              style={{ color: active ? hex : 'rgba(180,190,220,0.50)' }}
            >
              {sector}
            </p>
          </div>

          {/* Pillar badge */}
          <span
            className="flex-shrink-0 font-mono text-[8px] uppercase tracking-[0.22em] px-2.5 py-1 rounded-full"
            style={{
              color: hex,
              background: `rgba(${rgb},0.12)`,
              border: `1px solid rgba(${rgb},0.22)`,
            }}
          >
            {label}
          </span>
        </div>

        {/* ── Proof metric ─────────────────────────────────────────────────── */}
        <div className="mb-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={active ? 'active' : 'inactive'}
              initial={{ scale: active ? 1.18 : 0.96, opacity: active ? 0 : 0.55 }}
              animate={{ scale: 1, opacity: active ? 1 : 0.58 }}
              transition={{ duration: 0.40, ease: EASE }}
            >
              <span
                className="font-mono font-bold block leading-none"
                style={{
                  fontSize: mobile ? 'clamp(2.2rem, 8vw, 3rem)' : '2.9rem',
                  color: active ? hex : 'rgba(220,225,255,0.72)',
                  textShadow: active ? `0 0 28px rgba(${rgb},0.45)` : 'none',
                  transition: 'color 400ms ease, text-shadow 400ms ease',
                }}
              >
                {metric}
              </span>
            </motion.div>
          </AnimatePresence>
          <p
            className="font-mono text-[9px] uppercase tracking-[0.26em] mt-1.5"
            style={{ color: 'rgba(160,170,210,0.52)' }}
          >
            {metricLabel}
          </p>
        </div>

        {/* ── Outcome headline ──────────────────────────────────────────────── */}
        <h3
          className="font-syne font-bold leading-[1.22] tracking-tight mb-3.5"
          style={{
            fontSize: mobile ? '1.10rem' : '1.05rem',
            color: active
              ? 'rgba(242,244,255,0.96)'
              : 'rgba(190,200,230,0.65)',
            transition: 'color 400ms ease',
          }}
        >
          {outcome}
        </h3>

        {/* ── Intelligence brief ────────────────────────────────────────────── */}
        <p
          className="font-sans leading-relaxed flex-1"
          style={{
            fontSize: '0.80rem',
            color: active
              ? 'rgba(180,190,222,0.72)'
              : 'rgba(130,145,185,0.40)',
            transition: 'color 400ms ease',
          }}
        >
          {brief}
        </p>

        {/* ── CTA row ───────────────────────────────────────────────────────── */}
        <div className="mt-auto pt-5 flex items-center justify-between">
          {/* Hairline rule */}
          <div
            className="flex-1 mr-4 h-px"
            style={{
              background: active
                ? `linear-gradient(to right, rgba(${rgb},0.35), rgba(${rgb},0.12))`
                : 'rgba(255,255,255,0.08)',
              transition: 'background 400ms ease',
            }}
          />
          <span
            className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.25em] font-semibold flex-shrink-0"
            style={{
              color: active ? hex : 'rgba(150,160,200,0.45)',
              transition: 'color 400ms ease',
            }}
          >
            Read case
            <ArrowRight
              className="w-3.5 h-3.5 transition-transform duration-400 group-hover:translate-x-1"
              style={{ color: active ? hex : 'inherit' }}
            />
          </span>
        </div>
      </div>
    </Link>
  )
}
