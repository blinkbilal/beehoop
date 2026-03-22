'use client'

import { DataEngineCanvas } from '@/components/ui/DataEngineCanvas'
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
    title: 'Data Architecture & Pipelines',
    tagline: 'The nervous system.',
    body: 'Every organisation\u2019s intelligence begins with its plumbing. We design and build event-driven data architectures that ingest, transform, and route data from every corner of your operation \u2014 in real time, with sub-second latency. Not batch jobs that deliver yesterday\u2019s answers. Living pipelines that deliver tomorrow\u2019s signals, today.',
    stat: '99.8%',
    statLabel: 'Pipeline uptime across production systems',
    href: '/services/data-architecture-pipelines',
  },
  {
    id: '02',
    title: 'Business Intelligence & AI',
    tagline: 'Signal from noise.',
    body: 'We don\u2019t build dashboards. We build decision architectures \u2014 AI-powered intelligence layers that surface what matters from millions of data points. Predictive models that see demand shifts before they appear on a P&L. Prescriptive systems that don\u2019t just flag the problem but recommend the highest-ROI response \u2014 automatically.',
    stat: '$12M',
    statLabel: 'Cost savings surfaced for a single client',
    href: '/services/business-intelligence',
  },
  {
    id: '03',
    title: 'Executive Dashboards & Reporting',
    tagline: 'Radical clarity, on demand.',
    body: 'Your executive team shouldn\u2019t be hunting through spreadsheets. We engineer C-suite intelligence interfaces \u2014 real-time, role-specific, and designed around how your leadership actually makes decisions. Every metric, drill-down, and alert is purposefully placed. The result is not a report. It\u2019s a command centre.',
    stat: '4.2\u00d7',
    statLabel: 'Faster C-suite decision cycles',
    href: '/services/executive-dashboards',
  },
]

export default function DataEngine() {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-10%' })
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  const isDark = !mounted || resolvedTheme === 'dark'

  // ── Theme tokens ──────────────────────────────────────────────────────────
  const BG           = isDark ? '#060810'  : '#F4F7FD'
  const VIGN         = isDark
    ? 'radial-gradient(ellipse 70% 60% at 50% 50%, transparent 40%, #060810 100%)'
    : 'radial-gradient(ellipse 70% 60% at 50% 50%, transparent 44%, #F4F7FD 100%)'
  const ACCENT       = isDark ? '#3B82F6' : '#1D5DBF'
  const ACCENT_BRIGHT = isDark ? '#60A5FA' : '#3B82F6'
  const H_COLOR      = isDark ? '#ffffff'  : '#0A1020'
  const P_COLOR      = isDark ? '#7A8FB0'  : '#3D5575'
  const LBL_COLOR    = isDark ? 'rgba(59,130,246,0.70)' : 'rgba(29,93,191,0.80)'
  const CARD_BG      = isDark ? 'rgba(59,130,246,0.04)' : 'rgba(255,255,255,0.78)'
  const CARD_BORDER  = isDark ? 'rgba(59,130,246,0.10)' : 'rgba(29,93,191,0.16)'
  const CARD_SHADOW  = isDark ? 'none' : '0 2px 18px rgba(29,93,191,0.06), 0 1px 4px rgba(0,0,0,0.04)'
  const CARD_H_BG    = isDark ? 'rgba(59,130,246,0.07)' : 'rgba(255,255,255,0.95)'
  const CARD_H_BORDER = isDark ? 'rgba(59,130,246,0.30)' : 'rgba(29,93,191,0.40)'
  const CARD_H_SHADOW = isDark ? '0 8px 40px rgba(59,130,246,0.06)' : '0 12px 48px rgba(29,93,191,0.10)'
  const NUM_COLOR    = isDark ? 'rgba(59,130,246,0.50)' : 'rgba(29,93,191,0.60)'
  const TITLE_COLOR  = isDark ? '#ffffff' : '#0A1020'
  const TITLE_H_COLOR = ACCENT_BRIGHT
  const TAG_COLOR    = isDark ? 'rgba(59,130,246,0.60)' : 'rgba(29,93,191,0.80)'
  const BODY_COLOR   = isDark ? '#7A8FB0' : '#3D5575'
  const DIV_COLOR    = isDark ? 'rgba(59,130,246,0.08)' : 'rgba(29,93,191,0.12)'
  const STAT_LBL     = isDark ? '#4A6085' : '#6B85A8'
  const CTA1_TEXT    = isDark ? '#060810' : '#F4F7FD'
  const CTA2_BORDER  = isDark ? 'rgba(59,130,246,0.12)' : 'rgba(29,93,191,0.22)'
  const CTA2_COLOR   = isDark ? '#7A8FB0' : '#3D6B9E'
  const CTA2_H_BORDER = isDark ? 'rgba(59,130,246,0.40)' : 'rgba(29,93,191,0.60)'
  const CTA2_H_TEXT  = isDark ? '#ffffff' : '#0A1020'

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden"
      aria-label="Intelligence Engine capabilities"
      style={{ background: BG, transition: 'background 0.6s ease' }}
    >
      {/* Noise overlay */}
      <div className="noise-overlay py-28 md:py-40 relative">
        {/* Particle field */}
        <DataEngineCanvas />

        {/* Radial vignette */}
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
              The Engine Room
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
              Where data becomes<br />
              <span style={{ color: ACCENT }}>foresight.</span>
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
              We build the intelligence infrastructure that sits beneath every strategic recommendation — data pipelines that never sleep, AI models that learn faster than markets move, and decision systems that give leadership teams clarity measured in seconds, not quarters.
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
                <div
                  className="absolute inset-0 rounded-2xl to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{ backgroundImage: `linear-gradient(135deg, ${isDark ? 'rgba(59,130,246,0.06)' : 'rgba(29,93,191,0.04)'}, transparent)` }}
                />

                <span className="font-mono text-[11px] font-bold tracking-[0.25em] block mb-5" style={{ color: NUM_COLOR }}>
                  <TextScramble text={cap.id} trigger={isInView} duration={600 + i * 200} />
                </span>

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

                <p className="font-sans text-sm leading-relaxed mb-8" style={{ color: BODY_COLOR }}>
                  {cap.body}
                </p>

                <div className="border-t pt-5 mt-auto" style={{ borderColor: DIV_COLOR }}>
                  <p className="font-syne text-3xl font-bold" style={{ color: ACCENT }}>
                    <TextScramble text={cap.stat} trigger={isInView} duration={1000 + i * 200} />
                  </p>
                  <p className="font-sans text-[11px] mt-1 tracking-wide" style={{ color: STAT_LBL }}>
                    {cap.statLabel}
                  </p>
                </div>

                <ArrowRight
                  className="absolute bottom-7 right-7 w-4 h-4 transition-all duration-300 translate-x-0 group-hover:translate-x-1"
                  style={{ color: 'transparent' }}
                  onMouseEnter={(e) => { (e.currentTarget as SVGElement).style.color = isDark ? 'rgba(59,130,246,0.60)' : 'rgba(29,93,191,0.60)' }}
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
                style={{ background: ACCENT, color: CTA1_TEXT }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = ACCENT_BRIGHT }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = ACCENT }}
              >
                Explore all capabilities
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
              View case studies
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
