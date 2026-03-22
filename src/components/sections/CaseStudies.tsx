'use client'

/**
 * CaseStudies — "The Proof Field"
 *
 * Desktop (≥1024px):
 *   GSAP ScrollTrigger pins the section and translates the card reel
 *   horizontally as the viewer scrolls vertically. A fixed left panel
 *   cross-fades between the section header (idle) and the active-case
 *   summary. The OutcomesCanvas (position: fixed) shows the live galaxy
 *   topology, with the active node pulsing behind its card.
 *
 * Mobile (<1024px):
 *   No pin. The canvas is sticky-behind. Cards cascade in with
 *   IntersectionObserver-driven Framer Motion animations. Filters are
 *   a horizontally scrollable pill row.
 */

import OutcomeCard from '@/components/ui/OutcomeCard'
import { cases } from '@/lib/data'
import { setOutcomesActive, setOutcomesFilter } from '@/lib/outcomesStore'
import { AnimatePresence, motion, useInView } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowRight } from 'lucide-react'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { CSSProperties, useCallback, useEffect, useMemo, useRef, useState } from 'react'

const OutcomesCanvas = dynamic(() => import('@/components/ui/OutcomesCanvas'), { ssr: false })

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

// ─── Constants ───────────────────────────────────────────────────────────────
const PILLAR_COLOR: Record<string, string> = {
  advisory:     '#C8920A',
  intelligence: '#3B82F6',
  engineering:  '#10B981',
}

const PILLAR_RGB: Record<string, string> = {
  advisory:     '200,146,10',
  intelligence: '59,130,246',
  engineering:  '16,185,129',
}

const PILLAR_COUNTS = {
  advisory:     cases.filter(c => c.pillar === 'advisory').length,
  intelligence: cases.filter(c => c.pillar === 'intelligence').length,
  engineering:  cases.filter(c => c.pillar === 'engineering').length,
}

const LEFT_W = 310
const PM = { ease: [0.16, 1, 0.3, 1] as const, dur: 0.48 }

// ─── Pillar filter tab ────────────────────────────────────────────────────────
function PillarTab({
  id, label, colorHex, colorRgb, count, isActive, compact, onClick,
}: {
  id: string; label: string; colorHex: string; colorRgb: string
  count: number; isActive: boolean; compact?: boolean; onClick: () => void
}) {
  return (
    <button type="button" onClick={onClick}
      className="flex items-center gap-2.5 rounded-lg transition-all duration-300 shrink-0"
      style={{
        padding:    compact ? '6px 10px' : '7px 12px',
        background: isActive ? `rgba(${colorRgb},0.10)` : 'rgba(255,255,255,0.026)',
        border:     `1px solid ${isActive ? `rgba(${colorRgb},0.28)` : 'rgba(255,255,255,0.06)'}`,
      }}>
      {id !== 'all' && (
        <span className="flex items-center gap-[3px]">
          {Array.from({ length: count }).map((_, di) => (
            <span key={di} style={{
              display: 'block', width: 4, height: 4, borderRadius: '50%', flexShrink: 0,
              background: isActive ? `rgba(${colorRgb},0.88)` : 'rgba(255,255,255,0.18)',
              transition: 'background 300ms ease',
            }} />
          ))}
        </span>
      )}
      <span className="font-mono uppercase whitespace-nowrap" style={{
        fontSize: compact ? '8px' : '9px', letterSpacing: '0.24em',
        color: isActive ? colorHex : 'rgba(255,255,255,0.30)',
        transition: 'color 300ms ease',
      }}>
        {label}{id === 'all' && <span style={{ opacity: 0.50 }}> &middot; {count}</span>}
      </span>
    </button>
  )
}

// ─── Mobile card entrance wrapper ─────────────────────────────────────────────
function MobileCard({
  children,
  index,
}: {
  children: React.ReactNode
  index: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-8% 0px -8% 0px' })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 26 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 26 }}
      transition={{ duration: PM.dur, delay: Math.min(index * 0.055, 0.22), ease: PM.ease }}
    >
      {children}
    </motion.div>
  )
}

// ─── Main component ───────────────────────────────────────────────────────────
export default function CaseStudies() {
  const sectionRef  = useRef<HTMLElement>(null)
  const reelRef     = useRef<HTMLDivElement>(null)
  const gsapCtxRef  = useRef<gsap.Context | null>(null)

  const [activeCase,   setActiveCase]        = useState(-1)
  const [activeFilter, setActiveFilterLocal] = useState<string>('all')
  const [isDesktop,    setIsDesktop]          = useState(false)
  const [canvasActive, setCanvasActive]       = useState(false)

  // Wrap filter setter to keep canvas in sync
  const setActiveFilter = (f: string) => {
    setActiveFilterLocal(f)
    setOutcomesFilter(f)
  }


  // ── Breakpoint detection ──────────────────────────────────────────────────
  const checkDesktop = useCallback(() => {
    setIsDesktop(window.matchMedia('(min-width: 1024px)').matches)
  }, [])
  useEffect(() => {
    checkDesktop()
    window.addEventListener('resize', checkDesktop)
    return () => window.removeEventListener('resize', checkDesktop)
  }, [checkDesktop])

  // ── Filtered cases (mobile only) ─────────────────────────────────────────
  const filteredCases = useMemo(
    () =>
      activeFilter === 'all'
        ? cases
        : cases.filter((c) => c.pillar === activeFilter),
    [activeFilter]
  )

  // ── Derived values ────────────────────────────────────────────────────────
  const activeCaseData = activeCase >= 0 ? cases[activeCase] : null
  const activePillar   = activeCaseData?.pillar ?? 'advisory'
  const activeHex      = PILLAR_COLOR[activePillar]
  const activeRgb      = PILLAR_RGB[activePillar]

  // ── GSAP horizontal reel (desktop only) ──────────────────────────────────
  useEffect(() => {
    if (!isDesktop || !sectionRef.current || !reelRef.current) {
      setCanvasActive(false)
      return
    }
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    gsapCtxRef.current?.revert()

    const LEFT_PANEL_W = LEFT_W

    const getScrollDist = () => {
      if (!reelRef.current) return 0
      const available = window.innerWidth - LEFT_PANEL_W
      return Math.max(0, reelRef.current.scrollWidth - available)
    }

    const updateActiveCard = () => {
      if (!reelRef.current) return
      const centreX  = LEFT_PANEL_W + (window.innerWidth - LEFT_PANEL_W) / 2
      const children = Array.from(reelRef.current.children) as HTMLElement[]
      let minDist = Infinity
      let next = -1
      children.forEach((el, i) => {
        const r = el.getBoundingClientRect()
        const d = Math.abs(r.left + r.width / 2 - centreX)
        if (d < minDist) { minDist = d; next = i }
      })
      setActiveCase(next)
      setOutcomesActive(next)
    }

    const onEnter = () => setCanvasActive(true)
    const onLeave = () => { setCanvasActive(false); setActiveCase(-1); setOutcomesActive(-1) }

    const ctx = gsap.context(() => {
      // ── Canvas visibility: fires as soon as section scrolls into view ──────
      // This MUST be separate from the pin trigger so canvas activates early,
      // not only after top of section hits viewport top.
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start:   'top bottom',   // section entering from below
        end:     'bottom top',
        onEnter:     () => setCanvasActive(true),
        onEnterBack: () => setCanvasActive(true),
        onLeave:     () => { setCanvasActive(false); setActiveCase(-1); setOutcomesActive(-1) },
        onLeaveBack: () => { setCanvasActive(false); setActiveCase(-1); setOutcomesActive(-1) },
      })

      if (prefersReduced) return

      // ── Horizontal reel pin ───────────────────────────────────────────────
      gsap.to(reelRef.current, {
        x:    () => -getScrollDist(),
        ease: 'none',
        scrollTrigger: {
          trigger:             sectionRef.current,
          start:               'top top',
          end:                 () => `+=${getScrollDist()}`,
          pin:                 true,
          scrub:               0.9,
          invalidateOnRefresh: true,
          onUpdate:            updateActiveCard,
        },
      })
    }, sectionRef)

    gsapCtxRef.current = ctx
    return () => ctx.revert()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDesktop])

  // ── Pillar tab renderer ───────────────────────────────────────────────────
  const renderPillarTabs = (compact = false) => (
    <div
      className={`flex items-center gap-2 ${compact ? 'overflow-x-auto pb-1' : ''}`}
      style={compact ? { scrollbarWidth: 'none', WebkitOverflowScrolling: 'touch' } as CSSProperties : {}}
    >
      <PillarTab id="all" label="All" count={cases.length}
        colorHex="rgba(255,255,255,0.75)" colorRgb="255,255,255"
        isActive={activeFilter === 'all'} compact={compact}
        onClick={() => setActiveFilter('all')} />
      {(['advisory', 'intelligence', 'engineering'] as const).map(p => (
        <PillarTab key={p} id={p}
          label={p.charAt(0).toUpperCase() + p.slice(1)}
          colorHex={PILLAR_COLOR[p]} colorRgb={PILLAR_RGB[p]}
          count={PILLAR_COUNTS[p]} isActive={activeFilter === p} compact={compact}
          onClick={() => setActiveFilter(p)} />
      ))}
    </div>
  )

  return (
    <section
      ref={sectionRef}
      id="cases"
      aria-label="Client outcomes"
      style={{ background: '#000208' }}
    >
      {/* ── Desktop canvas — fixed, gated by canvasActive ──────────────── */}
      <div
        className="hidden lg:block fixed inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          zIndex:     0,
          opacity:    canvasActive ? 1 : 0,
          visibility: canvasActive ? 'visible' : 'hidden',
          transition: 'opacity 280ms linear, visibility 280ms linear',
        }}
      >
        <OutcomesCanvas active={canvasActive} className="absolute inset-0 w-full h-full" />
        <div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse 88% 78% at 62% 50%, transparent 0%, rgba(0,2,8,0.18) 52%, rgba(0,2,8,0.62) 100%)',
          }}
        />
      </div>

      {/* ── Mobile canvas — sticky behind cards ───────────────────────────── */}
      <div
        className="lg:hidden sticky top-0 w-full h-screen pointer-events-none"
        aria-hidden="true"
        style={{ zIndex: 0, marginBottom: '-100vh' }}
      >
        <OutcomesCanvas active={canvasActive} className="absolute inset-0 w-full h-full" />
        <div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse 105% 105% at 50% 50%, transparent 15%, rgba(0,2,8,0.52) 72%)',
          }}
        />
      </div>

      {/* ════════════════════════════════════════════════════════════════
          DESKTOP — horizontal reel pinned by GSAP
      ════════════════════════════════════════════════════════════════ */}
      <div className="hidden lg:flex h-screen relative" style={{ zIndex: 10 }}>

        {/* Left context panel */}
        <aside
          className="flex-shrink-0 h-screen flex flex-col justify-center pl-12 xl:pl-20 pr-8"
          style={{ width: LEFT_W }}
        >
          {/* Gradient backdrop — keeps text crisp over canvas */}
          <div
            className="absolute inset-y-0 left-0 pointer-events-none"
            aria-hidden="true"
            style={{
              width: LEFT_W + 110,
              background: 'linear-gradient(to right, rgba(0,2,8,0.94) 0%, rgba(0,2,8,0.74) 72%, rgba(0,2,8,0) 100%)',
            }}
          />

          <div className="relative z-10">
            <p
              className="font-mono text-[9px] uppercase tracking-[0.42em] mb-7"
              style={{ color: activeHex }}
            >
              Proof of Work
            </p>

            {/* Idle ↔ Active case summary (animated crossfade) */}
            <AnimatePresence mode="wait">
              {activeCaseData === null ? (
                <motion.div
                  key="idle"
                  initial={{ opacity: 0, y: 16, filter: 'blur(4px)' }}
                  animate={{ opacity: 1, y: 0,  filter: 'blur(0px)' }}
                  exit={{   opacity: 0, y: -12, filter: 'blur(4px)' }}
                  transition={{ duration: PM.dur, ease: PM.ease }}
                >
                  <h2
                    className="font-syne font-bold leading-[1.10] tracking-tight mb-5"
                    style={{
                      fontSize: 'clamp(1.9rem,2.8vw,2.55rem)',
                      color: 'rgba(255,255,255,0.95)',
                    }}
                  >
                    Ten engagements.<br />
                    <span style={{ color: activeHex }}>Permanent</span> results.
                  </h2>
                  <p
                    className="font-sans text-sm leading-relaxed"
                    style={{
                      maxWidth: '218px',
                      color: 'rgba(255,255,255,0.46)',
                    }}
                  >
                    Strategy to transaction, data pipeline to digital platform. Each number here was reported twelve months post-delivery.
                  </p>
                </motion.div>
              ) : (
                <motion.div
                  key={`case-${activeCase}`}
                  initial={{ opacity: 0, y: 18, filter: 'blur(4px)' }}
                  animate={{ opacity: 1, y: 0,  filter: 'blur(0px)' }}
                  exit={{   opacity: 0, y: -14, filter: 'blur(4px)' }}
                  transition={{ duration: PM.dur, ease: PM.ease }}
                >
                  <p
                    className="font-mono text-[9px] uppercase tracking-[0.32em] mb-4"
                    style={{ color: activeHex }}
                  >
                    {String(activeCase + 1).padStart(2, '0')}&nbsp;/&nbsp;{String(cases.length).padStart(2, '0')}
                    &nbsp;&nbsp;·&nbsp;&nbsp;
                    {activeCaseData.sector}
                  </p>
                  <div className="mb-4">
                    <span
                      className="font-mono font-bold block leading-none"
                      style={{
                        fontSize: 'clamp(2.2rem,3.8vw,3.0rem)',
                        color:      activeHex,
                        textShadow: `0 0 32px rgba(${activeRgb},0.40)`,
                      }}
                    >
                      {activeCaseData.metric}
                    </span>
                    <p
                      className="font-mono text-[9px] uppercase tracking-[0.26em] mt-1.5"
                      style={{ color: 'rgba(255,255,255,0.30)' }}
                    >
                      {activeCaseData.metricLabel}
                    </p>
                  </div>
                  <h3
                    className="font-syne font-bold leading-[1.26] tracking-tight"
                    style={{
                      fontSize: 'clamp(0.92rem,1.4vw,1.12rem)',
                      color: 'rgba(255,255,255,0.88)',
                    }}
                  >
                    {activeCaseData.outcome}
                  </h3>
                  {activeCaseData.brief && (
                    <p
                      className="font-sans text-sm leading-relaxed mt-4"
                      style={{ color: 'rgba(255,255,255,0.44)', maxWidth: '230px' }}
                    >
                      {activeCaseData.brief}
                    </p>
                  )}
                  <Link
                    href={`/cases/${activeCaseData.slug}`}
                    className="inline-flex items-center gap-1.5 mt-5 group"
                    style={{
                      fontFamily: 'var(--font-space, monospace)',
                      fontSize: '0.68rem',
                      textTransform: 'uppercase',
                      letterSpacing: '0.24em',
                      color: activeHex,
                    }}
                  >
                    Read case study
                    <ArrowRight className="w-3 h-3 transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Case progress dots */}
            <div className="flex items-center gap-2 mt-8">
              {cases.map((c, i) => (
                <div
                  key={i}
                  className="rounded-full transition-all duration-400"
                  style={{
                    width:      i === activeCase ? 20 : 5,
                    height:     5,
                    background: i === activeCase
                      ? PILLAR_COLOR[c.pillar]
                      : 'rgba(255,255,255,0.14)',
                  }}
                />
              ))}
            </div>

            <Link
              href="/cases"
              className="inline-flex items-center gap-2 mt-8 group"
              style={{
                color:         'rgba(255,255,255,0.36)',
                fontFamily:    'var(--font-space, monospace)',
                fontSize:      '0.68rem',
                textTransform: 'uppercase',
                letterSpacing: '0.24em',
              }}
            >
              View all work
              <ArrowRight className="w-3 h-3 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        </aside>

        {/* Right column: pillar tabs + card reel */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Pillar tabs row */}
          <div className="flex items-center gap-2.5 px-7 pt-9 pb-5 flex-shrink-0">
            {renderPillarTabs()}
            <span
              className="ml-auto font-mono text-[8px] uppercase tracking-[0.28em] hidden xl:block"
              style={{ color: 'rgba(255,255,255,0.16)' }}
            >
              Scroll to explore →
            </span>
          </div>

          {/* Card reel */}
          <div className="flex-1 overflow-hidden flex items-center">
            <div
              ref={reelRef}
              className="flex gap-4 pl-7 pr-40 items-center"
              style={{ willChange: 'transform' }}
            >
              {cases.map((c, i) => (
                <OutcomeCard
                  key={c.slug}
                  slug={c.slug}
                  sector={c.sector}
                  service={c.service}
                  brief={c.brief}
                  metric={c.metric}
                  metricLabel={c.metricLabel}
                  outcome={c.outcome}
                  pillar={c.pillar}
                  active={activeCase === i}
                  dimmed={activeFilter !== 'all' && c.pillar !== activeFilter}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ════════════════════════════════════════════════════════════════
          MOBILE — sticky canvas + cascade cards
      ════════════════════════════════════════════════════════════════ */}
      <div className="lg:hidden relative" style={{ zIndex: 10 }}>
        <div className="px-5 pt-20 pb-28">

          <div className="mb-8">
            <p
              className="font-mono text-[9px] uppercase tracking-[0.42em] mb-4"
              style={{ color: '#C8920A' }}
            >
              Proof of Work
            </p>
            <h2
              className="font-syne font-bold leading-[1.14] tracking-tight mb-3"
              style={{
                fontSize: 'clamp(1.70rem,6.5vw,2.35rem)',
                color: 'rgba(255,255,255,0.95)',
              }}
            >
              Ten engagements.<br />
              <span style={{ color: '#C8920A' }}>Permanent</span> results.
            </h2>
            <p
              className="font-sans text-sm leading-relaxed"
              style={{ color: 'rgba(255,255,255,0.46)' }}
            >
              Strategy to transaction, data to digital platform.
            </p>
          </div>

          {/* Mobile filter scroll row */}
          <div className="mb-7">
            {renderPillarTabs(true)}
          </div>

          <div className="flex flex-col gap-4">
            <AnimatePresence mode="popLayout">
              {filteredCases.map((c, i) => (
                <MobileCard key={c.slug} index={i}>
                  <OutcomeCard
                    slug={c.slug}
                    sector={c.sector}
                    service={c.service}
                    brief={c.brief}
                    metric={c.metric}
                    metricLabel={c.metricLabel}
                    outcome={c.outcome}
                    pillar={c.pillar}
                    active
                    dimmed={false}
                    mobile
                  />
                </MobileCard>
              ))}
            </AnimatePresence>
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/cases"
              className="inline-flex items-center gap-2.5 group"
              style={{
                fontFamily:    'var(--font-space, monospace)',
                fontSize:      '0.68rem',
                textTransform: 'uppercase',
                letterSpacing: '0.28em',
                color:         'rgba(255,255,255,0.40)',
              }}
            >
              View all case studies
              <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
