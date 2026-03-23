'use client'

/**
 * OutcomeCard — minimal proof plate for the Client Outcomes section.
 */

import { CaseStudy } from '@/lib/data'
import { motion } from 'framer-motion'
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
  'slug' | 'sector' | 'brief' | 'metric' | 'metricLabel' | 'outcome' | 'pillar' | 'service' | 'client' | 'tag' | 'description'
> {
  active: boolean
  isDark?: boolean
  dimmed?: boolean
  mobile?: boolean
  showBrief?: boolean
  style?: CSSProperties
  index?: number
  total?: number
  onSelect?: () => void
}

export default function OutcomeCard({
  slug,
  sector,
  service,
  brief,
  metric,
  metricLabel,
  outcome,
  client,
  tag,
  description,
  pillar,
  active,
  isDark = true,
  dimmed = false,
  mobile = false,
  showBrief = false,
  style,
  index,
  total,
  onSelect,
}: OutcomeCardProps) {
  const { hex, rgb, label } = PILLAR[pillar]
  const expanded = active && !mobile
  const showNarrative = mobile || expanded || showBrief

  const cardStyle: CSSProperties = {
    transition: 'opacity 420ms ease, transform 420ms cubic-bezier(0.16,1,0.3,1), box-shadow 420ms ease, border-color 420ms ease, filter 420ms ease',
    opacity: dimmed ? 0.12 : active || mobile ? 1 : 0.68,
    transform: dimmed
      ? 'scale(0.963) translateY(0px)'
      : active
        ? 'scale(1.01) translateY(-4px)'
        : 'scale(1) translateY(0px)',
    borderRadius: mobile ? '24px' : '22px',
    ...(active
      ? {
          background: expanded
            ? isDark
              ? `linear-gradient(160deg, rgba(${rgb},0.14) 0%, rgba(8,14,30,0.92) 36%, rgba(${rgb},0.06) 100%)`
              : `linear-gradient(160deg, rgba(${rgb},0.09) 0%, rgba(255,255,255,0.96) 38%, rgba(${rgb},0.05) 100%)`
            : isDark
              ? `linear-gradient(160deg, rgba(${rgb},0.11) 0%, rgba(8,14,30,0.84) 46%, rgba(${rgb},0.04) 100%)`
              : `linear-gradient(160deg, rgba(${rgb},0.07) 0%, rgba(255,255,255,0.92) 52%, rgba(${rgb},0.04) 100%)`,
          backdropFilter: 'blur(28px) saturate(165%)',
          WebkitBackdropFilter: 'blur(28px) saturate(165%)',
          border: `1px solid rgba(${rgb},${expanded ? '0.34' : '0.24'})`,
          boxShadow: expanded
            ? isDark
              ? `0 0 120px rgba(${rgb},0.20), 0 28px 80px rgba(0,0,0,0.58), inset 0 1px 0 rgba(255,255,255,0.08)`
              : `0 12px 40px rgba(${rgb},0.10), 0 24px 48px rgba(120,110,90,0.14), inset 0 1px 0 rgba(255,255,255,0.90)`
            : isDark
              ? `0 0 64px rgba(${rgb},0.16), 0 22px 50px rgba(0,0,0,0.52), inset 0 1px 0 rgba(255,255,255,0.06)`
              : `0 10px 28px rgba(120,110,90,0.10)`,
        }
      : {
          background: isDark
            ? 'linear-gradient(160deg, rgba(255,255,255,0.04) 0%, rgba(8,12,28,0.74) 58%, rgba(255,255,255,0.015) 100%)'
            : 'linear-gradient(160deg, rgba(255,255,255,0.84) 0%, rgba(250,247,242,0.96) 58%, rgba(255,255,255,0.72) 100%)',
          backdropFilter: 'blur(18px) saturate(135%)',
          WebkitBackdropFilter: 'blur(18px) saturate(135%)',
          border: isDark ? '1px solid rgba(255,255,255,0.06)' : '1px solid rgba(20,28,40,0.08)',
          boxShadow: isDark ? '0 10px 22px rgba(0,0,0,0.26)' : '0 8px 18px rgba(120,110,90,0.08)',
        }
    ),
    ...style,
  }

  const accentRail = mobile
    ? {
        position: 'absolute' as const,
        top: 0,
        left: 0,
        width: '4px',
        bottom: 0,
        borderRadius: '12px 0 0 12px',
        background: `linear-gradient(to bottom, ${hex}, rgba(${rgb},0.24))`,
        opacity: active ? 1 : 0.4,
        transition: 'opacity 400ms ease',
      }
    : {
        position: 'absolute' as const,
        top: 0,
        left: 0,
        right: 0,
        height: '2px',
        borderRadius: '22px 22px 0 0',
        background: active
          ? `linear-gradient(to right, transparent, ${hex} 28%, rgba(${rgb},0.60) 72%, transparent)`
          : `linear-gradient(to right, transparent, rgba(${rgb},0.28) 28%, rgba(${rgb},0.14) 72%, transparent)`,
        transition: 'opacity 400ms ease, background 400ms ease',
      }

  return (
    <div
      role={mobile ? undefined : 'button'}
      tabIndex={mobile ? undefined : 0}
      onClick={mobile ? undefined : onSelect}
      onKeyDown={mobile ? undefined : (event) => {
        if ((event.key === 'Enter' || event.key === ' ') && onSelect) {
          event.preventDefault()
          onSelect()
        }
      }}
      className={`group block relative overflow-hidden outline-none ${mobile ? 'w-full min-h-[290px]' : 'flex-shrink-0 w-[228px] h-[318px] cursor-pointer'}`}
      style={cardStyle}
    >
      <div aria-hidden="true" style={accentRail} />

      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background: active
            ? expanded
              ? `radial-gradient(circle at 18% 12%, rgba(${rgb},${isDark ? '0.24' : '0.18'}), transparent 34%), radial-gradient(circle at 76% 84%, rgba(${rgb},${isDark ? '0.14' : '0.08'}), transparent 28%)`
              : `radial-gradient(circle at 18% 12%, rgba(${rgb},${isDark ? '0.18' : '0.12'}), transparent 34%)`
            : `radial-gradient(circle at 18% 12%, rgba(${rgb},${isDark ? '0.08' : '0.05'}), transparent 28%)`,
          opacity: active ? 1 : 0.72,
          transition: 'opacity 400ms ease',
        }}
      />

      {expanded && (
        <div
          aria-hidden="true"
          className="absolute inset-[18px] rounded-[28px]"
          style={{
            border: `1px solid rgba(${rgb},${isDark ? '0.14' : '0.10'})`,
            background: isDark
              ? 'linear-gradient(180deg, rgba(255,255,255,0.03), rgba(255,255,255,0))'
              : 'linear-gradient(180deg, rgba(255,255,255,0.40), rgba(255,255,255,0))',
          }}
        />
      )}

      <div className={`relative flex h-full flex-col overflow-hidden ${mobile ? 'px-6 py-6 pl-8' : expanded ? 'px-8 py-8' : 'px-5 py-5'}`}>
        <div className={`flex items-start justify-between gap-3 ${expanded ? 'mb-7' : 'mb-5'}`}>
          <p
            className="font-mono text-[9px] uppercase tracking-[0.32em] leading-none"
            style={{ color: active ? hex : isDark ? 'rgba(196,205,234,0.28)' : 'rgba(34,44,60,0.34)' }}
          >
            {sector}
          </p>
          {typeof index === 'number' && typeof total === 'number' ? (
            <span
              className="font-mono text-[8px] uppercase tracking-[0.28em]"
              style={{ color: active ? (isDark ? 'rgba(255,255,255,0.44)' : 'rgba(34,44,60,0.42)') : (isDark ? 'rgba(255,255,255,0.18)' : 'rgba(34,44,60,0.18)') }}
            >
              {String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
            </span>
          ) : (
            <div className="flex items-center gap-1.5 pt-0.5">
              {Array.from({ length: 3 }).map((_, dotIndex) => (
                <span
                  key={dotIndex}
                  className="block rounded-full"
                  style={{
                    width: 3,
                    height: 3,
                    background: dotIndex === 1 || active ? `rgba(${rgb},0.82)` : 'rgba(255,255,255,0.14)',
                  }}
                />
              ))}
            </div>
          )}
        </div>

        <div className={expanded ? 'mb-5' : 'mb-3'}>
          <motion.span
            className="font-mono font-bold block leading-none"
            animate={{ scale: expanded ? 1.06 : active ? 1.03 : 1, opacity: active ? 1 : 0.84 }}
            transition={{ duration: 0.42, ease: EASE }}
            style={{
              fontSize: mobile ? 'clamp(2.7rem, 12vw, 3.5rem)' : expanded ? 'clamp(4.4rem, 7vw, 6rem)' : '3.35rem',
              color: active ? hex : isDark ? 'rgba(225,230,248,0.54)' : 'rgba(34,44,60,0.42)',
              textShadow: active ? `0 0 ${expanded ? '54px' : '34px'} rgba(${rgb},0.36)` : 'none',
            }}
          >
            {metric}
          </motion.span>
          <p
            className={`font-mono uppercase tracking-[0.28em] ${expanded ? 'mt-3 text-[10px]' : 'mt-2 text-[9px]'}`}
            style={{ color: active ? (isDark ? 'rgba(160,170,210,0.58)' : 'rgba(60,74,98,0.56)') : (isDark ? 'rgba(160,170,210,0.34)' : 'rgba(60,74,98,0.34)') }}
          >
            {metricLabel}
          </p>
        </div>

        <div
          className={`h-px ${expanded ? 'mb-6' : 'mb-4'}`}
          style={{
            background: active
              ? `linear-gradient(to right, rgba(${rgb},0.55), rgba(${rgb},0.12), transparent)`
              : isDark
                ? 'linear-gradient(to right, rgba(255,255,255,0.14), transparent)'
                : 'linear-gradient(to right, rgba(18,28,42,0.14), transparent)',
          }}
        />

        <h3
          className="font-syne font-bold tracking-tight"
          style={{
            fontSize: mobile ? '1.08rem' : expanded ? 'clamp(2rem, 2.75vw, 2.7rem)' : '0.96rem',
            lineHeight: mobile || expanded ? 1.04 : 1.22,
            color: active ? (isDark ? 'rgba(246,248,255,0.95)' : 'rgba(18,24,34,0.92)') : (isDark ? 'rgba(192,201,230,0.48)' : 'rgba(34,44,60,0.46)'),
            minHeight: mobile || expanded ? undefined : '4.8rem',
            display: '-webkit-box',
            WebkitLineClamp: mobile ? 'unset' : expanded ? 4 : 3,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {outcome}
        </h3>

        {showNarrative && (
          <motion.div
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: EASE }}
            className={expanded ? 'mt-5 space-y-3.5' : 'mt-4'}
          >
            <p
              className="font-sans leading-relaxed"
              style={{
                fontSize: expanded ? '0.92rem' : '0.82rem',
                color: active ? (isDark ? 'rgba(182,192,224,0.78)' : 'rgba(44,56,78,0.72)') : (isDark ? 'rgba(140,152,190,0.52)' : 'rgba(44,56,78,0.52)'),
                display: expanded ? '-webkit-box' : undefined,
                WebkitLineClamp: expanded ? 3 : undefined,
                WebkitBoxOrient: expanded ? 'vertical' : undefined,
                overflow: expanded ? 'hidden' : undefined,
              }}
            >
              {brief}
            </p>

            {expanded && (
              <div
                className="rounded-[18px] px-4 py-3"
                style={{
                  background: isDark ? 'rgba(255,255,255,0.028)' : 'rgba(255,255,255,0.44)',
                  border: isDark ? '1px solid rgba(255,255,255,0.05)' : '1px solid rgba(20,28,40,0.08)',
                }}
              >
                <div className="grid grid-cols-2 gap-4">
                  <div className="min-w-0">
                    <p
                      className="font-mono text-[8px] uppercase tracking-[0.24em]"
                      style={{ color: `rgba(${rgb},0.78)` }}
                    >
                      Client
                    </p>
                    <p
                      className="mt-2 font-sans text-[0.78rem] leading-relaxed"
                      style={{
                        color: isDark ? 'rgba(232,238,255,0.76)' : 'rgba(24,34,48,0.76)',
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                      }}
                    >
                      {client}
                    </p>
                  </div>
                  <div className="min-w-0">
                    <p
                      className="font-mono text-[8px] uppercase tracking-[0.24em]"
                      style={{ color: `rgba(${rgb},0.78)` }}
                    >
                      Mandate
                    </p>
                    <p
                      className="mt-2 font-sans text-[0.78rem] leading-relaxed"
                      style={{
                        color: isDark ? 'rgba(232,238,255,0.76)' : 'rgba(24,34,48,0.76)',
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                      }}
                    >
                      {tag}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        )}

        <div className={`mt-auto flex items-end justify-between gap-3 ${expanded ? 'pt-5' : 'pt-5'}`}>
          <div className="min-w-0">
            <p
              className={`font-mono uppercase tracking-[0.26em] ${expanded ? 'text-[9px]' : 'text-[8px]'}`}
              style={{ color: active ? `rgba(${rgb},0.82)` : isDark ? 'rgba(150,160,198,0.24)' : 'rgba(44,56,78,0.28)' }}
            >
              {label}
            </p>
            <p
              className={`font-mono uppercase tracking-[0.20em] mt-1 ${expanded ? 'text-[9px] whitespace-normal leading-relaxed' : 'text-[8px] truncate'}`}
              style={{
                color: expanded ? (isDark ? 'rgba(178,188,220,0.52)' : 'rgba(44,56,78,0.52)') : (isDark ? 'rgba(150,160,198,0.24)' : 'rgba(44,56,78,0.24)'),
                display: expanded ? '-webkit-box' : undefined,
                WebkitLineClamp: expanded ? 1 : undefined,
                WebkitBoxOrient: expanded ? 'vertical' : undefined,
                overflow: expanded ? 'hidden' : undefined,
              }}
            >
              {service}
            </p>
          </div>
          <Link
            href={`/cases/${slug}`}
            onClick={(event) => event.stopPropagation()}
            className={`inline-flex items-center gap-1.5 font-mono uppercase tracking-[0.24em] whitespace-nowrap ${expanded ? 'text-[10px]' : 'text-[9px]'}`}
            style={{
              color: active || mobile ? hex : isDark ? 'rgba(150,160,198,0.22)' : 'rgba(44,56,78,0.22)',
              opacity: active || mobile ? 1 : 0.24,
              transform: active || mobile ? 'translateX(0px)' : 'translateX(-4px)',
              transition: 'opacity 320ms ease, transform 320ms ease, color 320ms ease',
            }}
          >
            View details
            <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </div>
  )
}
