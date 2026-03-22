'use client'

import { StrategicAdvisoryCanvas } from '@/components/ui/StrategicAdvisoryCanvas'
import { Magnetic } from '@/components/ui/Magnetic'
import { TextScramble } from '@/components/ui/TextScramble'
import { useInView } from 'framer-motion'
import { useTheme } from 'next-themes'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'

const capabilities = [
  {
    id: '01',
    title: 'Strategy Development',
    tagline: 'The architecture of decisions.',
    body: 'Before a single initiative is greenlit, we map the full terrain \u2014 competitive forces, internal capabilities, financial scenarios, and market timing. The result is not a slide deck. It\u2019s a decision architecture that your leadership team can execute against with conviction \u2014 and measure against with precision.',
    stat: '670%',
    statLabel: 'Projected ROI on flagship engagement',
    href: '/services/strategy-development',
  },
  {
    id: '02',
    title: 'M&A & Transactions',
    tagline: 'Capital deployed. Value compounded.',
    body: 'We operate across the full transaction lifecycle \u2014 from target origination and commercial due diligence through deal structuring, negotiation, and post-merger integration. Our clients don\u2019t just close deals. They enter markets, consolidate positions, and unlock value chains that compound for years after signing.',
    stat: '+12',
    statLabel: 'Markets entered through our M&A mandates',
    href: '/services/mergers-and-acquisitions',
  },
  {
    id: '03',
    title: 'Brand & Market Strategy',
    tagline: 'Identity engineered for growth.',
    body: 'A brand is the most scalable asset in business \u2014 but only when it\u2019s built on insight, not instinct. We ground brand strategy in competitive intelligence, stakeholder research, and commercial positioning \u2014 then engineer identities that don\u2019t just resonate but actively drive measurable market capture.',
    stat: '+45%',
    statLabel: 'Brand recognition uplift delivered',
    href: '/services/brand-and-market-strategy',
  },
]

export default function StrategicAdvisory() {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-10%' })
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  const isDark = !mounted || resolvedTheme === 'dark'

  // ── Theme tokens ──────────────────────────────────────────────────────────
  const BG     = isDark ? '#07060A'   : '#FDFAF4'       // void-black  vs warm parchment
  const BG_IN  = isDark ? 'hsl(var(--background))' : 'hsl(var(--background))'
  const VIGN   = isDark
    ? 'radial-gradient(ellipse 70% 60% at 50% 50%, transparent 38%, #07060A 100%)'
    : 'radial-gradient(ellipse 70% 60% at 50% 50%, transparent 42%, #FDFAF4 100%)'
  const ACCENT = '#C8920A'
  const ACCENT_BRIGHT = '#F5C842'
  const H_COLOR   = isDark ? '#ffffff'   : '#1A140A'       // white   vs ink-brown
  const P_COLOR   = isDark ? '#8a9ab0'   : '#6B5840'       // cool-grey vs warm taupe
  const LBL_COLOR = isDark ? `${ACCENT}B3` : `${ACCENT}CC`

  // Card tokens
  const CARD_BG     = isDark ? 'rgba(255,255,255,0.04)' : 'rgba(255,255,255,0.72)'
  const CARD_BORDER = isDark ? 'rgba(255,255,255,0.07)' : 'rgba(200,146,10,0.16)'
  const CARD_SHADOW = isDark ? 'none'                   : '0 2px 18px rgba(200,146,10,0.06), 0 1px 4px rgba(0,0,0,0.04)'
  const CARD_H_BG   = isDark ? 'rgba(255,255,255,0.07)' : 'rgba(255,255,255,0.95)'
  const CARD_H_BORDER = isDark ? 'rgba(200,146,10,0.28)' : 'rgba(200,146,10,0.44)'
  const CARD_H_SHADOW = isDark ? '0 8px 40px rgba(200,146,10,0.06)' : '0 12px 48px rgba(200,146,10,0.12)'
  const NUM_COLOR   = isDark ? `${ACCENT}80`  : `${ACCENT}99`
  const TITLE_COLOR = isDark ? '#ffffff'       : '#1A140A'
  const TITLE_H_COLOR = isDark ? ACCENT_BRIGHT : ACCENT
  const TAG_COLOR   = isDark ? `${ACCENT}99`  : `${ACCENT}CC`
  const BODY_COLOR  = isDark ? '#8a9ab0'       : '#6B5840'
  const DIV_COLOR   = isDark ? 'rgba(255,255,255,0.06)' : 'rgba(200,146,10,0.12)'
  const STAT_COLOR  = ACCENT
  const STAT_LBL    = isDark ? '#566578' : '#9E7B4A'
  const CTA1_BG     = ACCENT
  const CTA1_TEXT   = isDark ? '#07060A' : '#FDFAF4'
  const CTA1_H_BG   = ACCENT_BRIGHT
  const CTA2_BORDER = isDark ? 'rgba(255,255,255,0.08)' : 'rgba(200,146,10,0.22)'
  const CTA2_COLOR  = isDark ? '#8a9ab0' : '#7A5C28'
  const CTA2_H_BORDER = isDark ? 'rgba(200,146,10,0.40)' : 'rgba(200,146,10,0.60)'
  const CTA2_H_TEXT = isDark ? '#ffffff' : '#1A140A'

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden"
      aria-label="Strategic Advisory capabilities"
      style={{
        background: isDark
          ? `linear-gradient(180deg, ${BG_IN} 0%, ${BG} 8%, ${BG} 100%)`
          : `linear-gradient(180deg, ${BG_IN} 0%, ${BG} 8%, ${BG} 100%)`,
        transition: 'background 0.6s ease',
      }}
    >
      {/* Noise overlay */}
      <div className="noise-overlay py-28 md:py-40 relative">
        {/* Orbital constellation field */}
        <StrategicAdvisoryCanvas />

        {/* Radial vignette — pulls focus to copy */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: VIGN, transition: 'background 0.6s ease' }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10 lg:px-20">

          {/* ── Header ── */}
          <div className="max-w-2xl mb-20 md:mb-24">
            <p
              className="text-[10px] md:text-xs font-mono font-semibold uppercase tracking-[0.3em] mb-5"
              style={{
                color: LBL_COLOR,
                opacity: isInView ? 1 : 0,
                transform: isInView ? 'translateY(0)' : 'translateY(16px)',
                transition: 'opacity 0.6s ease, transform 0.6s ease',
              }}
            >
              The Advisory Field
            </p>
            <h2
              className="font-syne text-3xl md:text-5xl lg:text-[3.5rem] font-bold leading-[1.1] tracking-tight"
              style={{
                color: H_COLOR,
                opacity: isInView ? 1 : 0,
                transform: isInView ? 'translateY(0)' : 'translateY(24px)',
                transition: 'opacity 0.7s ease 0.1s, transform 0.7s cubic-bezier(0.16,1,0.3,1) 0.1s, color 0.5s ease',
              }}
            >
              Where complexity<br />
              <span style={{ color: ACCENT }}>becomes direction.</span>
            </h2>
            <p
              className="font-sans text-base md:text-lg mt-6 leading-relaxed max-w-xl"
              style={{
                color: P_COLOR,
                opacity: isInView ? 1 : 0,
                transform: isInView ? 'translateY(0)' : 'translateY(20px)',
                transition: 'opacity 0.7s ease 0.2s, transform 0.7s ease 0.2s, color 0.5s ease',
              }}
            >
              We work at the intersection of market dynamics, organisational capability, and capital allocation — turning ambiguity into a precise, executable strategic direction.
            </p>
          </div>

          {/* ── Capability cards ── */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
            {capabilities.map((cap, i) => (
              <Link
                key={cap.id}
                href={cap.href}
                className="relative rounded-2xl p-7 md:p-8 group block"
                style={{
                  background: CARD_BG,
                  backdropFilter: 'blur(12px)',
                  WebkitBackdropFilter: 'blur(12px)',
                  border: `1px solid ${CARD_BORDER}`,
                  boxShadow: CARD_SHADOW,
                  opacity: isInView ? 1 : 0,
                  transform: isInView ? 'translateY(0)' : 'translateY(48px)',
                  transition: `opacity 0.7s ease ${0.15 + i * 0.12}s, transform 0.7s cubic-bezier(0.16,1,0.3,1) ${0.15 + i * 0.12}s, background 0.45s ease, border-color 0.45s ease, box-shadow 0.45s ease`,
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget
                  el.style.background = CARD_H_BG
                  el.style.borderColor = CARD_H_BORDER
                  el.style.boxShadow = CARD_H_SHADOW
                  el.style.transform = 'translateY(-4px) scale(1.015)'
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget
                  el.style.background = CARD_BG
                  el.style.borderColor = CARD_BORDER
                  el.style.boxShadow = CARD_SHADOW
                  el.style.transform = 'translateY(0) scale(1)'
                }}
              >
                {/* Hover ambient glow */}
                <div
                  className="absolute inset-0 rounded-2xl bg-gradient-to-br to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{ backgroundImage: `linear-gradient(135deg, ${ACCENT}0F, transparent)` }}
                />

                {/* Number */}
                <span className="font-mono text-[11px] font-bold tracking-[0.25em] block mb-5" style={{ color: NUM_COLOR }}>
                  <TextScramble text={cap.id} trigger={isInView} duration={600 + i * 200} />
                </span>

                {/* Title + tagline */}
                <h3
                  className="font-syne text-xl font-bold mb-1.5 leading-tight transition-colors duration-300"
                  style={{ color: TITLE_COLOR }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = TITLE_H_COLOR }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = TITLE_COLOR }}
                >
                  {cap.title}
                </h3>
                <p className="font-sans text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: TAG_COLOR }}>
                  {cap.tagline}
                </p>

                {/* Body */}
                <p className="font-sans text-sm leading-relaxed mb-8" style={{ color: BODY_COLOR }}>
                  {cap.body}
                </p>

                {/* Stat */}
                <div className="border-t pt-5 mt-auto" style={{ borderColor: DIV_COLOR }}>
                  <p className="font-syne text-3xl font-bold" style={{ color: STAT_COLOR }}>
                    <TextScramble text={cap.stat} trigger={isInView} duration={1000 + i * 200} />
                  </p>
                  <p className="font-sans text-[11px] mt-1 tracking-wide" style={{ color: STAT_LBL }}>
                    {cap.statLabel}
                  </p>
                </div>

                <ArrowRight
                  className="absolute bottom-7 right-7 w-4 h-4 transition-all duration-300 translate-x-0 group-hover:translate-x-1"
                  style={{ color: 'transparent' }}
                  onMouseEnter={(e) => { (e.currentTarget as SVGElement).style.color = `${ACCENT}99` }}
                />
              </Link>
            ))}
          </div>

          {/* ── CTA row ── */}
          <div
            className="mt-16 md:mt-20 flex flex-col sm:flex-row gap-4"
            style={{
              opacity: isInView ? 1 : 0,
              transform: isInView ? 'translateY(0)' : 'translateY(20px)',
              transition: 'opacity 0.7s ease 0.6s, transform 0.7s ease 0.6s',
            }}
          >
            <Magnetic>
              <Link
                href="/services"
                className="inline-flex items-center gap-2 px-7 py-4 rounded-full text-sm font-sans font-bold transition-colors duration-300"
                style={{ background: CTA1_BG, color: CTA1_TEXT }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = CTA1_H_BG }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = CTA1_BG }}
              >
                Explore advisory services
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Magnetic>
            <Link
              href="/cases"
              className="inline-flex items-center gap-2 px-7 py-4 rounded-full text-sm font-sans font-semibold transition-colors duration-300"
              style={{ border: `1px solid ${CTA2_BORDER}`, color: CTA2_COLOR }}
              onMouseEnter={(e) => {
                const el = e.currentTarget
                el.style.borderColor = CTA2_H_BORDER
                el.style.color = CTA2_H_TEXT
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget
                el.style.borderColor = CTA2_BORDER
                el.style.color = CTA2_COLOR
              }}
            >
              See strategic outcomes
            </Link>
          </div>

        </div>
      </div>
    </section>
  )
}
