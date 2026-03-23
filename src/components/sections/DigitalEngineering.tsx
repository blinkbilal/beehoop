'use client'

import { DigitalEngineeringCanvas } from '@/components/ui/DigitalEngineeringCanvas'
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
    title: 'Custom Software Development',
    tagline: 'Precision-built. Production-hardened.',
    body: 'Off-the-shelf software is built for the average case. Your business is not average. We build bespoke platforms \u2014 transaction monitoring systems processing millions of events daily, internal workflow tools that eliminate entire manual processes, enterprise applications engineered to pass third-party security audits on first submission.',
    stat: '2M+',
    statLabel: 'Daily events processed by our platforms',
    href: '/services/custom-software-development',
  },
  {
    id: '02',
    title: 'Web & Application Development',
    tagline: 'Where engineering meets experience.',
    body: 'Premium digital experiences built with modern engineering \u2014 React, Next.js, TypeScript. We don\u2019t build websites. We build conversion-engineered digital platforms where every millisecond of load time, every interaction pattern, and every piece of content architecture is designed to compound organic growth and qualified pipeline.',
    stat: '3\u00d7',
    statLabel: 'Qualified lead growth delivered',
    href: '/services/web-development',
  },
  {
    id: '03',
    title: 'System Integration & APIs',
    tagline: 'The connective tissue.',
    body: 'Fragmented systems create fragmented decisions. We architect the integration layer that connects your CRM, ERP, cloud platforms, and data sources into a unified operational backbone \u2014 eliminating manual transfers, automating cross-system workflows, and ensuring every team operates from the same real-time truth.',
    stat: '99.9%',
    statLabel: 'System uptime maintained',
    href: '/services/system-integration',
  },
]

export default function DigitalEngineering() {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-10%' })
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  const isDark = !mounted || resolvedTheme === 'dark'

  // ── Theme tokens ──────────────────────────────────────────────────────────
  const BG          = isDark ? '#030A08'   : '#F4FAF7'    // void-green vs mint vellum
  const BG_FADE     = isDark
    ? `linear-gradient(180deg, ${BG} 0%, ${BG} 92%, hsl(var(--background)) 100%)`
    : `linear-gradient(180deg, ${BG} 0%, ${BG} 92%, hsl(var(--background)) 100%)`
  const VIGN        = isDark
    ? 'radial-gradient(ellipse 70% 60% at 50% 50%, transparent 38%, #030A08 100%)'
    : 'radial-gradient(ellipse 70% 60% at 50% 50%, transparent 44%, #F4FAF7 100%)'
  const EM          = isDark ? '#10B981'   : '#067856'    // emerald vs deep jade
  const EM_BRIGHT   = isDark ? '#34D399'   : '#15a56e'    // bright emerald vs sage
  const EM_DIM      = isDark ? 'rgba(16,185,129,0.6)' : 'rgba(6,120,86,0.7)'
  const H_COLOR     = isDark ? '#ffffff'   : '#0A1A12'    // white vs ink-green
  const P_COLOR     = isDark ? '#7a9a8a'   : '#3d6a54'    // cool-green vs deep sage
  const LBL_COLOR   = isDark ? `${EM}B3`   : `${EM}CC`
  const CARD_BG     = isDark ? 'rgba(255,255,255,0.03)' : 'rgba(255,255,255,0.78)'
  const CARD_BORDER = isDark ? 'rgba(16,185,129,0.10)'  : 'rgba(6,120,86,0.18)'
  const CARD_SHADOW = isDark ? 'none' : '0 2px 18px rgba(6,120,86,0.06), 0 1px 4px rgba(0,0,0,0.04)'
  const CARD_H_BG   = isDark ? 'rgba(16,185,129,0.06)' : 'rgba(255,255,255,0.96)'
  const CARD_H_BORDER = isDark ? 'rgba(16,185,129,0.30)' : 'rgba(6,120,86,0.40)'
  const CARD_H_SHADOW = isDark ? '0 8px 40px rgba(16,185,129,0.06)' : '0 12px 48px rgba(6,120,86,0.10)'
  const NUM_COLOR   = isDark ? `${EM}80` : `${EM}99`
  const TITLE_COLOR = isDark ? '#f0faf6' : '#0A1A12'
  const DIV_COLOR   = isDark ? 'rgba(16,185,129,0.08)' : 'rgba(6,120,86,0.12)'
  const STAT_LBL    = isDark ? '#3d6a54' : '#2a5040'
  const CTA1_TEXT   = isDark ? '#030A08' : '#F4FAF7'
  const CTA2_BORDER = isDark ? 'rgba(16,185,129,0.12)' : 'rgba(6,120,86,0.20)'
  const CTA2_COLOR  = isDark ? '#5fa882' : '#30705a'
  const CTA2_H_BORDER = isDark ? `${EM}60` : `${EM}70`
  const CTA2_H_TEXT = isDark ? '#f0faf6' : '#0A1A12'

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden"
      aria-label="Digital Engineering capabilities"
      style={{ background: BG_FADE, transition: 'background 0.6s ease' }}
    >
      {/* Noise overlay */}
      <div className="noise-overlay py-28 md:py-40 relative">
        {/* Blueprint assembly field */}
        <DigitalEngineeringCanvas />

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
              The Engineering Layer
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
              Strategy made<br />
              <span style={{ color: EM_BRIGHT }}>operational.</span>
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
              Once direction is set and intelligence is structured, we engineer the systems that bring both to life — production-grade platforms, seamless integrations, and applications built to perform under real-world pressure. The same team that defined the strategy writes the code.
            </p>
          </div>

          {/* ── Capability cards ── */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
            {capabilities.map((cap, i) => (
              <Link
                key={cap.id}
                href={cap.href}
                className="relative rounded-2xl p-7 md:p-8 group block transition-all duration-500"
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
                  style={{ backgroundImage: `linear-gradient(135deg, ${EM}07, transparent)` }}
                />

                <span className="font-mono text-[11px] font-bold tracking-[0.25em] block mb-5" style={{ color: NUM_COLOR }}>
                  <TextScramble text={cap.id} trigger={isInView} duration={600 + i * 200} />
                </span>

                <h3
                  className="font-syne text-xl font-bold mb-1.5 leading-tight transition-colors duration-300"
                  style={{ color: TITLE_COLOR }}
                >
                  {cap.title}
                </h3>
                <p className="font-sans text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: EM_DIM }}>
                  {cap.tagline}
                </p>

                <p className="font-sans text-sm leading-relaxed mb-8" style={{ color: P_COLOR }}>
                  {cap.body}
                </p>

                <div className="border-t pt-5 mt-auto" style={{ borderColor: DIV_COLOR }}>
                  <p className="font-syne text-3xl font-bold" style={{ color: EM }}>
                    <TextScramble text={cap.stat} trigger={isInView} duration={1000 + i * 200} />
                  </p>
                  <p className="font-sans text-[11px] mt-1 tracking-wide" style={{ color: STAT_LBL }}>
                    {cap.statLabel}
                  </p>
                </div>

                <ArrowRight
                  className="absolute bottom-7 right-7 w-4 h-4 transition-all duration-300 translate-x-0 group-hover:translate-x-1"
                  style={{ color: 'transparent' }}
                  onMouseEnter={(e) => { (e.currentTarget as SVGElement).style.color = `${EM}99` }}
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
                style={{ background: EM, color: CTA1_TEXT }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = EM_BRIGHT }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = EM }}
              >
                Explore engineering services
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
              View engineered results
            </Link>
          </div>

        </div>
      </div>
    </section>
  )
}
