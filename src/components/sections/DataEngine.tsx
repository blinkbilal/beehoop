'use client'

import { DataEngineCanvas } from '@/components/ui/DataEngineCanvas'
import { Magnetic } from '@/components/ui/Magnetic'
import { TextScramble } from '@/components/ui/TextScramble'
import { useInView } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { useRef } from 'react'

const capabilities = [
  {
    id: '01',
    title: 'Data Architecture & Pipelines',
    tagline: 'Building the bedrock.',
    body: 'We architect scalable, secure data pipelines that seamlessly ingest, clean, and unify your disparate data streams into a single source of truth — with sub-second latency and 99.9 % reliability.',
    stat: '99.8%',
    statLabel: 'Pipeline uptime delivered',
    href: '/services/data-architecture-pipelines',
  },
  {
    id: '02',
    title: 'Business Intelligence',
    tagline: 'Connecting the dots.',
    body: 'We deploy advanced BI frameworks that transform static databases into dynamic, predictive intelligence — uncovering hidden operational efficiencies and market gaps before competitors do.',
    stat: '2M+',
    statLabel: 'Events processed daily',
    href: '/services/business-intelligence',
  },
  {
    id: '03',
    title: 'Executive Dashboards',
    tagline: 'Clarity at a glance.',
    body: 'Bespoke, real-time reporting dashboards designed for the C-Suite. We distil millions of data points into beautiful, actionable visual interfaces that drive faster, smarter decisions.',
    stat: '4.2×',
    statLabel: 'Faster decision-making',
    href: '/services/executive-dashboards',
  },
]

export default function DataEngine() {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-10%' })

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden"
      aria-label="Intelligence Engine capabilities"
      style={{
        background: 'linear-gradient(180deg, hsl(var(--background)) 0%, #070809 6%, #070809 94%, hsl(var(--background)) 100%)',
      }}
    >
      {/* Noise overlay for the dark section only */}
      <div className="noise-overlay py-28 md:py-40 relative">
        {/* Animated particle field — chaos → grid on scroll */}
        <DataEngineCanvas />

        {/* Radial vignette */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse 70% 60% at 50% 50%, transparent 40%, #070809 100%)' }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10 lg:px-20">

          {/* ── Header ── */}
          <div className="max-w-2xl mb-20 md:mb-24">
            <p
              className="text-[10px] md:text-xs font-mono font-semibold uppercase tracking-[0.3em] text-[#C8920A]/70 mb-5"
              style={{
                opacity: isInView ? 1 : 0,
                transform: isInView ? 'translateY(0)' : 'translateY(16px)',
                transition: 'opacity 0.6s ease, transform 0.6s ease',
              }}
            >
              The Engine Room
            </p>
            <h2
              className="font-syne text-3xl md:text-5xl lg:text-[3.5rem] font-bold text-white leading-[1.1] tracking-tight"
              style={{
                opacity: isInView ? 1 : 0,
                transform: isInView ? 'translateY(0)' : 'translateY(24px)',
                transition: 'opacity 0.7s ease 0.1s, transform 0.7s cubic-bezier(0.16,1,0.3,1) 0.1s',
              }}
            >
              The Intelligence<br />
              <span className="text-[#C8920A]">Engine.</span>
            </h2>
            <p
              className="font-sans text-base md:text-lg text-[#8a9ab0] mt-6 leading-relaxed max-w-xl"
              style={{
                opacity: isInView ? 1 : 0,
                transform: isInView ? 'translateY(0)' : 'translateY(20px)',
                transition: 'opacity 0.7s ease 0.2s, transform 0.7s ease 0.2s',
              }}
            >
              From raw telemetry to radical clarity. We build the underlying systems that make every strategic recommendation executable — and measurable.
            </p>
          </div>

          {/* ── Capability cards — glassmorphism ── */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
            {capabilities.map((cap, i) => (
              <Link
                key={cap.id}
                href={cap.href}
                className="glass-card relative rounded-2xl p-7 md:p-8 group block"
                style={{
                  opacity: isInView ? 1 : 0,
                  transform: isInView ? 'translateY(0)' : 'translateY(48px)',
                  transition: `opacity 0.7s ease ${0.15 + i * 0.12}s, transform 0.7s cubic-bezier(0.16,1,0.3,1) ${0.15 + i * 0.12}s`,
                }}
              >
                {/* Hover glow */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#C8920A]/[0.06] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                {/* Number */}
                <span className="font-mono text-[11px] font-bold tracking-[0.25em] text-[#C8920A]/50 block mb-5">
                  <TextScramble text={cap.id} trigger={isInView} duration={600 + i * 200} />
                </span>

                {/* Title + tagline */}
                <h3 className="font-syne text-xl font-bold text-white mb-1.5 leading-tight group-hover:text-[#F5C842] transition-colors duration-300">
                  {cap.title}
                </h3>
                <p className="font-sans text-xs font-semibold uppercase tracking-widest text-[#C8920A]/60 mb-4">
                  {cap.tagline}
                </p>

                {/* Body */}
                <p className="font-sans text-sm text-[#8a9ab0] leading-relaxed mb-8">
                  {cap.body}
                </p>

                {/* Stat scramble */}
                <div className="border-t border-white/[0.06] pt-5 mt-auto">
                  <p className="font-syne text-3xl font-bold text-[#C8920A]">
                    <TextScramble text={cap.stat} trigger={isInView} duration={1000 + i * 200} />
                  </p>
                  <p className="font-sans text-[11px] text-[#566578] mt-1 tracking-wide">
                    {cap.statLabel}
                  </p>
                </div>

                {/* Arrow hint */}
                <ArrowRight className="absolute bottom-7 right-7 w-4 h-4 text-[#C8920A]/0 group-hover:text-[#C8920A]/60 transition-all duration-300 translate-x-0 group-hover:translate-x-1" />
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
                className="inline-flex items-center gap-2 bg-[#C8920A] text-[#070809] px-7 py-4 rounded-full text-sm font-sans font-bold hover:bg-[#F5C842] transition-colors duration-300"
              >
                Explore all capabilities
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Magnetic>
            <Link
              href="/cases"
              className="inline-flex items-center gap-2 border border-white/[0.08] text-[#8a9ab0] px-7 py-4 rounded-full text-sm font-sans font-semibold hover:border-[#C8920A]/40 hover:text-white transition-colors duration-300"
            >
              View case studies
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
