'use client'

import OutcomeCard from '@/components/ui/OutcomeCard'
import { cases, type ServicePillar } from '@/lib/data'
import { setOutcomesActive, setOutcomesFilter } from '@/lib/outcomesStore'
import { AnimatePresence, motion, useInView } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { useTheme } from 'next-themes'
import { type CSSProperties, type ReactNode, useCallback, useEffect, useMemo, useRef, useState } from 'react'

const OutcomesCanvas = dynamic(() => import('@/components/ui/OutcomesCanvas'), { ssr: false })

type OutcomesFilter = 'all' | ServicePillar

const PILLAR_COLOR: Record<ServicePillar, string> = {
  advisory: '#C8920A',
  intelligence: '#3B82F6',
  engineering: '#10B981',
}

const PILLAR_RGB: Record<ServicePillar, string> = {
  advisory: '200,146,10',
  intelligence: '59,130,246',
  engineering: '16,185,129',
}

const PILLAR_META: Record<ServicePillar, { label: string; strap: string; summary: string }> = {
  advisory: {
    label: 'Advisory',
    strap: 'Board, brand, transaction',
    summary: 'Commercial direction, market positioning, and high-stakes decision support for leadership teams.',
  },
  intelligence: {
    label: 'Intelligence',
    strap: 'Pipelines, dashboards, foresight',
    summary: 'Operational clarity built through data systems, executive reporting, and measurable signal design.',
  },
  engineering: {
    label: 'Engineering',
    strap: 'Platforms, systems, launches',
    summary: 'Digital products and connected systems that turn strategy into precise operational execution.',
  },
}

const FILTER_ORDER: ServicePillar[] = ['advisory', 'intelligence', 'engineering']

const PILLAR_COUNTS: Record<ServicePillar, number> = {
  advisory: cases.filter((item) => item.pillar === 'advisory').length,
  intelligence: cases.filter((item) => item.pillar === 'intelligence').length,
  engineering: cases.filter((item) => item.pillar === 'engineering').length,
}

const PM = { ease: [0.16, 1, 0.3, 1] as const, dur: 0.48 }

function PillarTab({
  id,
  label,
  colorHex,
  colorRgb,
  count,
  isActive,
  isDark,
  compact,
  stacked,
  onClick,
}: {
  id: OutcomesFilter
  label: string
  colorHex: string
  colorRgb: string
  count: number
  isActive: boolean
  isDark: boolean
  compact?: boolean
  stacked?: boolean
  onClick: () => void
}) {
  const dotCount = id === 'all' ? 0 : Math.min(count, compact ? 3 : 4)

  if (stacked) {
    return (
      <button
        type="button"
        onClick={onClick}
        className="group relative w-full overflow-hidden rounded-[16px] px-0 py-0 text-left transition-all duration-300"
        style={{
          background: 'transparent',
          boxShadow: 'none',
        }}
      >
        <div
          className="flex items-center justify-between gap-4 rounded-[16px] px-4 py-[0.9rem]"
          style={{
            background: isActive
              ? `linear-gradient(90deg, rgba(${colorRgb},${isDark ? '0.16' : '0.12'}), rgba(255,255,255,0.03) 72%)`
              : isDark
                ? 'rgba(255,255,255,0.018)'
                : 'rgba(18,24,34,0.028)',
            border: `1px solid ${isActive ? `rgba(${colorRgb},${isDark ? '0.24' : '0.18'})` : (isDark ? 'rgba(255,255,255,0.06)' : 'rgba(18,24,34,0.08)')}`,
            boxShadow: isActive ? `0 8px 24px rgba(${colorRgb},${isDark ? '0.12' : '0.08'})` : 'none',
          }}
        >
          <div className="flex min-w-0 items-center gap-3">
            <span
              className="block rounded-full"
              style={{
                width: 7,
                height: 7,
                background: isActive ? colorHex : isDark ? 'rgba(255,255,255,0.18)' : 'rgba(18,24,34,0.20)',
                boxShadow: isActive ? `0 0 14px rgba(${colorRgb},0.42)` : 'none',
              }}
            />
            <p
              className="font-mono text-[9px] uppercase tracking-[0.2em]"
              style={{ color: isActive ? (isDark ? 'rgba(245,248,255,0.94)' : 'rgba(18,24,34,0.92)') : (isDark ? 'rgba(255,255,255,0.46)' : 'rgba(24,34,48,0.48)') }}
            >
              {label}
            </p>
          </div>
          <span
            className="font-mono text-[9px] uppercase tracking-[0.16em]"
            style={{ color: isActive ? colorHex : isDark ? 'rgba(255,255,255,0.34)' : 'rgba(18,24,34,0.34)' }}
          >
            {String(count).padStart(2, '0')}
          </span>
        </div>
      </button>
    )
  }

  return (
    <button
      type="button"
      onClick={onClick}
      className="shrink-0 rounded-full transition-all duration-300"
      style={{
        padding: compact ? '8px 12px' : '10px 14px',
        background: isActive ? `rgba(${colorRgb},0.12)` : isDark ? 'rgba(255,255,255,0.03)' : 'rgba(18,24,34,0.03)',
        border: `1px solid ${isActive ? `rgba(${colorRgb},0.24)` : (isDark ? 'rgba(255,255,255,0.06)' : 'rgba(18,24,34,0.08)')}`,
        boxShadow: isActive ? `0 0 28px rgba(${colorRgb},0.12)` : 'none',
      }}
    >
      <div className="flex items-center gap-2.5">
        {dotCount > 0 && (
          <span className="flex items-center gap-[3px]">
            {Array.from({ length: dotCount }).map((_, index) => (
              <span
                key={index}
                className="block rounded-full"
                style={{
                  width: compact ? 3 : 4,
                  height: compact ? 3 : 4,
                  background: isActive ? `rgba(${colorRgb},0.9)` : 'rgba(255,255,255,0.18)',
                }}
              />
            ))}
          </span>
        )}
        <span
          className="font-mono uppercase whitespace-nowrap"
          style={{
            fontSize: compact ? '8px' : '9px',
            letterSpacing: '0.24em',
            color: isActive ? colorHex : isDark ? 'rgba(255,255,255,0.32)' : 'rgba(18,24,34,0.40)',
          }}
        >
          {label}
        </span>
        <span
          className="font-mono uppercase"
          style={{
            fontSize: compact ? '8px' : '9px',
            letterSpacing: '0.18em',
            color: isActive ? (isDark ? 'rgba(255,255,255,0.62)' : 'rgba(18,24,34,0.56)') : (isDark ? 'rgba(255,255,255,0.26)' : 'rgba(18,24,34,0.24)'),
          }}
        >
          {String(count).padStart(2, '0')}
        </span>
      </div>
    </button>
  )
}

function MobileCard({ children, index }: { children: ReactNode; index: number }) {
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

export default function CaseStudies() {
  const sectionRef = useRef<HTMLElement>(null)
  const reelRef = useRef<HTMLDivElement>(null)
  const cardRefs = useRef<Array<HTMLDivElement | null>>([])

  const [activeCase, setActiveCase] = useState(0)
  const [activeFilter, setActiveFilterLocal] = useState<OutcomesFilter>('all')
  const [canvasActive, setCanvasActive] = useState(false)
  const [mounted, setMounted] = useState(false)
  const { resolvedTheme } = useTheme()
  const sectionInView = useInView(sectionRef, { margin: '-18% 0px -18% 0px' })
  const isDark = !mounted || resolvedTheme === 'dark'

  const setActiveFilter = (filter: OutcomesFilter) => {
    setActiveFilterLocal(filter)
    setOutcomesFilter(filter)
  }

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    setCanvasActive(sectionInView)
  }, [sectionInView])

  useEffect(() => {
    setOutcomesActive(-1)
    setOutcomesFilter('all')
    return () => {
      setOutcomesActive(-1)
      setOutcomesFilter('all')
    }
  }, [])

  const filteredCases = useMemo(
    () => (activeFilter === 'all' ? cases : cases.filter((item) => item.pillar === activeFilter)),
    [activeFilter]
  )

  const firstVisibleIndex = useMemo(
    () => cases.findIndex((item) => activeFilter === 'all' || item.pillar === activeFilter),
    [activeFilter]
  )

  useEffect(() => {
    const next = firstVisibleIndex === -1 ? 0 : firstVisibleIndex
    setActiveCase(next)
    setOutcomesActive(next)
    requestAnimationFrame(() => {
      cardRefs.current[next]?.scrollIntoView({ behavior: 'auto', inline: 'center', block: 'nearest' })
    })
  }, [firstVisibleIndex])

  const featuredIndex = activeCase >= 0 && (activeFilter === 'all' || cases[activeCase]?.pillar === activeFilter)
    ? activeCase
    : (firstVisibleIndex === -1 ? 0 : firstVisibleIndex)
  const featuredCase = cases[featuredIndex] ?? cases[0]

  const accentPillar: ServicePillar = featuredCase?.pillar ?? (activeFilter === 'all' ? 'advisory' : activeFilter)
  const accentHex = PILLAR_COLOR[accentPillar]
  const accentRgb = PILLAR_RGB[accentPillar]
  const selectedPillarMeta = activeFilter === 'all' ? null : PILLAR_META[activeFilter]
  const selectedPillarCount = activeFilter === 'all' ? cases.length : PILLAR_COUNTS[activeFilter]

  const centerCard = useCallback((index: number, behavior: ScrollBehavior = 'smooth') => {
    const card = cardRefs.current[index]
    if (!card) return
    setActiveCase(index)
    setOutcomesActive(index)
    card.scrollIntoView({ behavior, inline: 'center', block: 'nearest' })
  }, [])

  const syncActiveCard = useCallback(() => {
    const viewport = reelRef.current
    if (!viewport) return

    const viewportRect = viewport.getBoundingClientRect()
    const centreX = viewportRect.left + viewportRect.width / 2
    let minDist = Infinity
    let next = featuredIndex

    cardRefs.current.forEach((element, index) => {
      if (!element) return
      if (activeFilter !== 'all' && cases[index].pillar !== activeFilter) return
      const rect = element.getBoundingClientRect()
      const dist = Math.abs(rect.left + rect.width / 2 - centreX)
      if (dist < minDist) {
        minDist = dist
        next = index
      }
    })

    setActiveCase(next)
    setOutcomesActive(next)
  }, [activeFilter, featuredIndex])

  useEffect(() => {
    const viewport = reelRef.current
    if (!viewport) return

    let frame = 0
    const onScroll = () => {
      cancelAnimationFrame(frame)
      frame = window.requestAnimationFrame(syncActiveCard)
    }

    viewport.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    onScroll()

    return () => {
      cancelAnimationFrame(frame)
      viewport.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [syncActiveCard])

  const handleGalleryWheel = (event: React.WheelEvent<HTMLDivElement>) => {
    if (Math.abs(event.deltaY) <= Math.abs(event.deltaX)) return
    const viewport = event.currentTarget
    if (viewport.scrollWidth <= viewport.clientWidth) return
    viewport.scrollLeft += event.deltaY * 0.92
    event.preventDefault()
  }

  const renderPillarTabs = (compact = false, stacked = false) => (
    <div
      className={stacked ? 'flex flex-col gap-2.5' : `flex items-center gap-2.5 ${compact ? 'overflow-x-auto pb-1' : 'flex-wrap'}`}
      style={compact ? { scrollbarWidth: 'none', WebkitOverflowScrolling: 'touch' } as CSSProperties : {}}
    >
      <PillarTab
        id="all"
        label={stacked ? 'All Cases' : 'All'}
        count={cases.length}
        colorHex={isDark ? 'rgba(255,255,255,0.75)' : 'rgba(18,24,34,0.72)'}
        colorRgb="255,255,255"
        isActive={activeFilter === 'all'}
        isDark={isDark}
        compact={compact}
        stacked={stacked}
        onClick={() => setActiveFilter('all')}
      />
      {FILTER_ORDER.map((pillar) => (
        <PillarTab
          key={pillar}
          id={pillar}
          label={stacked ? PILLAR_META[pillar].strap : PILLAR_META[pillar].label}
          count={PILLAR_COUNTS[pillar]}
          colorHex={PILLAR_COLOR[pillar]}
          colorRgb={PILLAR_RGB[pillar]}
          isActive={activeFilter === pillar}
          isDark={isDark}
          compact={compact}
          stacked={stacked}
          onClick={() => setActiveFilter(pillar)}
        />
      ))}
    </div>
  )

  return (
    <section
      ref={sectionRef}
      id="cases"
      aria-label="Client outcomes"
      className="relative overflow-hidden"
      style={{ background: isDark ? '#000208' : '#f5efe5' }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background: isDark
            ? 'radial-gradient(circle at 18% 50%, rgba(200,146,10,0.06), transparent 22%), radial-gradient(circle at 68% 72%, rgba(59,130,246,0.07), transparent 28%), radial-gradient(circle at 84% 38%, rgba(16,185,129,0.06), transparent 24%)'
            : 'radial-gradient(circle at 18% 50%, rgba(200,146,10,0.08), transparent 22%), radial-gradient(circle at 68% 72%, rgba(59,130,246,0.08), transparent 30%), radial-gradient(circle at 84% 38%, rgba(16,185,129,0.08), transparent 24%)',
          zIndex: 0,
        }}
      />

      <div
        className="hidden lg:block fixed inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          zIndex: 0,
          opacity: canvasActive ? 1 : 0,
          visibility: canvasActive ? 'visible' : 'hidden',
          transition: 'opacity 280ms linear, visibility 280ms linear',
        }}
      >
        <OutcomesCanvas active={canvasActive} isDark={isDark} className="absolute inset-0 h-full w-full" />
        <div
          className="absolute inset-0"
          style={{
            background: isDark
              ? 'radial-gradient(ellipse 92% 78% at 60% 50%, transparent 0%, rgba(0,2,8,0.16) 54%, rgba(0,2,8,0.68) 100%)'
              : 'radial-gradient(ellipse 92% 78% at 60% 50%, transparent 0%, rgba(245,239,229,0.12) 50%, rgba(245,239,229,0.72) 100%)',
          }}
        />
      </div>

      <div
        className="lg:hidden sticky top-0 h-screen w-full pointer-events-none"
        aria-hidden="true"
        style={{ zIndex: 0, marginBottom: '-100vh' }}
      >
        <OutcomesCanvas active={canvasActive} isDark={isDark} className="absolute inset-0 h-full w-full" />
        <div
          className="absolute inset-0"
          style={{
            background: isDark
              ? 'radial-gradient(ellipse 110% 108% at 50% 50%, transparent 12%, rgba(0,2,8,0.58) 74%)'
              : 'radial-gradient(ellipse 110% 108% at 50% 50%, transparent 12%, rgba(245,239,229,0.54) 74%)',
          }}
        />
      </div>

      <div className="relative hidden h-screen lg:block" style={{ zIndex: 10 }}>
        <div
          className="pointer-events-none fixed inset-x-0 top-0 z-20 hidden lg:block"
          aria-hidden="true"
          style={{
            opacity: canvasActive ? 1 : 0,
            transform: canvasActive ? 'translateY(0px)' : 'translateY(-8px)',
            transition: 'opacity 260ms ease, transform 260ms ease',
          }}
        >
          <div className="flex justify-between px-7 xl:px-8">
            <div className="pointer-events-auto pt-[110px] w-[248px]">
              <p
                className="font-mono text-[9px] uppercase tracking-[0.32em]"
                style={{ color: accentHex, textShadow: isDark ? `0 0 18px rgba(${accentRgb},0.18)` : 'none' }}
              >
                Proof of Work
              </p>
              <h2
                className="mt-3 font-syne font-bold tracking-tight"
                style={{
                  fontSize: 'clamp(1.48rem,1.6vw,1.8rem)',
                  lineHeight: 0.98,
                  color: isDark ? 'rgba(248,250,255,0.96)' : 'rgba(18,24,34,0.94)',
                  textShadow: isDark ? '0 8px 28px rgba(0,0,0,0.28)' : '0 8px 18px rgba(255,255,255,0.36)',
                }}
              >
                Client outcomes.
              </h2>
            </div>

            <div className="pointer-events-auto pt-[110px] w-[252px]">
              <p
                className="mb-3 text-right font-mono text-[9px] uppercase tracking-[0.24em]"
                style={{ color: isDark ? 'rgba(255,255,255,0.42)' : 'rgba(18,24,34,0.46)' }}
              >
                Services · {String(selectedPillarCount).padStart(2, '0')}
              </p>
              {renderPillarTabs(false, true)}
            </div>
          </div>
        </div>

        <div className="relative flex h-full items-center overflow-hidden pt-24">
          <div
            className="pointer-events-none absolute inset-y-0 left-0 w-32"
            aria-hidden="true"
            style={{ background: isDark ? 'linear-gradient(to right, rgba(0,2,8,0.92), rgba(0,2,8,0))' : 'linear-gradient(to right, rgba(245,239,229,0.92), rgba(245,239,229,0))' }}
          />
          <div
            className="pointer-events-none absolute inset-y-0 right-0 w-32"
            aria-hidden="true"
            style={{ background: isDark ? 'linear-gradient(to left, rgba(0,2,8,0.92), rgba(0,2,8,0))' : 'linear-gradient(to left, rgba(245,239,229,0.92), rgba(245,239,229,0))' }}
          />
          <div
            className="pointer-events-none absolute left-1/2 top-1/2 h-[84vh] w-[56vw] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
            aria-hidden="true"
            style={{ background: `radial-gradient(circle, rgba(${accentRgb},0.12) 0%, rgba(${accentRgb},0.03) 46%, rgba(0,0,0,0) 72%)` }}
          />

          <div className="flex h-full w-full items-center overflow-hidden">
            <div
              ref={reelRef}
              onWheel={handleGalleryWheel}
              className="no-scrollbar flex w-full snap-x snap-mandatory items-center gap-14 overflow-x-auto px-[16vw] pb-6 pt-2"
              style={{ scrollBehavior: 'smooth', scrollbarWidth: 'none' }}
            >
              <div className="shrink-0" aria-hidden="true" style={{ width: '22vw' }} />
              {cases.map((item, index) => (
                <div
                  key={item.slug}
                  ref={(element) => {
                    cardRefs.current[index] = element
                  }}
                  className="snap-center shrink-0"
                >
                  <OutcomeCard
                    slug={item.slug}
                    sector={item.sector}
                    service={item.service}
                    brief={item.brief}
                    metric={item.metric}
                    metricLabel={item.metricLabel}
                    outcome={item.outcome}
                    client={item.client}
                    tag={item.tag}
                    description={item.description}
                    pillar={item.pillar}
                    index={index}
                    total={cases.length}
                    active={featuredIndex === index && (activeFilter === 'all' || item.pillar === activeFilter)}
                    dimmed={activeFilter !== 'all' && item.pillar !== activeFilter}
                    isDark={isDark}
                    onSelect={() => centerCard(index)}
                    style={(() => {
                      const isVisible = activeFilter === 'all' || item.pillar === activeFilter
                      const distance = Math.abs(index - featuredIndex)
                      const direction = index < featuredIndex ? -1 : 1

                      if (!isVisible) {
                        return {
                          width: 152,
                          height: 214,
                          transform: `perspective(1600px) rotateY(${direction * -16}deg) translateY(40px) scale(0.82)`,
                          filter: 'blur(1.2px) saturate(0.7)',
                          zIndex: 0,
                        }
                      }

                      if (index === featuredIndex) {
                        return {
                          width: 'min(620px, 48vw)',
                          height: 'min(660px, 74vh)',
                          transform: 'translateY(-4px) scale(1)',
                          zIndex: 5,
                        }
                      }

                      if (distance === 1) {
                        return {
                          width: 224,
                          height: 302,
                          transform: `perspective(1600px) rotateY(${direction * -12}deg) translateY(28px) scale(0.92)`,
                          zIndex: 3,
                        }
                      }

                      return {
                        width: 178,
                        height: 252,
                        transform: `perspective(1600px) rotateY(${direction * -14}deg) translateY(42px) scale(0.86)`,
                        zIndex: 1,
                      }
                    })()}
                  />
                </div>
              ))}
              <div className="shrink-0" aria-hidden="true" style={{ width: '22vw' }} />
            </div>
          </div>
        </div>

      </div>

      <div className="relative lg:hidden" style={{ zIndex: 10 }}>
        <div className="px-5 pb-28 pt-20">
          <div
            className="mb-8 rounded-[24px] border px-5 py-6"
            style={{
              background: isDark
                ? 'linear-gradient(160deg, rgba(255,255,255,0.04) 0%, rgba(10,14,28,0.82) 100%)'
                : 'linear-gradient(160deg, rgba(255,255,255,0.74) 0%, rgba(250,247,242,0.96) 100%)',
              borderColor: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(18,24,34,0.08)',
              backdropFilter: 'blur(18px)',
              WebkitBackdropFilter: 'blur(18px)',
            }}
          >
            <p
              className="mb-4 font-mono text-[9px] uppercase tracking-[0.42em]"
              style={{ color: accentHex }}
            >
              Proof of Work
            </p>
            <h2
              className="mb-3 font-syne font-bold leading-[1.10] tracking-tight"
              style={{
                fontSize: 'clamp(1.72rem,6.5vw,2.4rem)',
                color: isDark ? 'rgba(255,255,255,0.95)' : 'rgba(18,24,34,0.94)',
              }}
            >
              Ten engagements.
              <br />
              <span style={{ color: accentHex }}>Permanent</span> results.
            </h2>
            <p
              className="font-sans text-sm leading-relaxed"
              style={{ color: isDark ? 'rgba(180,190,222,0.46)' : 'rgba(44,56,78,0.56)' }}
            >
              {selectedPillarMeta
                ? selectedPillarMeta.summary
                : 'A proof gallery spanning strategic advisory, intelligence systems, and digital execution.'}
            </p>
          </div>

          <div className="mb-7">{renderPillarTabs(true)}</div>

          <div className="flex flex-col gap-4">
            <AnimatePresence mode="popLayout">
              {filteredCases.map((item, index) => (
                <MobileCard key={item.slug} index={index}>
                  <OutcomeCard
                    slug={item.slug}
                    sector={item.sector}
                    service={item.service}
                    brief={item.brief}
                    metric={item.metric}
                    metricLabel={item.metricLabel}
                    outcome={item.outcome}
                    client={item.client}
                    tag={item.tag}
                    description={item.description}
                    pillar={item.pillar}
                    index={index}
                    total={filteredCases.length}
                    active
                    isDark={isDark}
                    dimmed={false}
                    mobile
                    showBrief
                  />
                </MobileCard>
              ))}
            </AnimatePresence>
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/cases"
              className="group inline-flex items-center gap-2.5"
              style={{
                fontFamily: 'var(--font-space, monospace)',
                fontSize: '0.68rem',
                textTransform: 'uppercase',
                letterSpacing: '0.28em',
                color: isDark ? 'rgba(255,255,255,0.40)' : 'rgba(18,24,34,0.48)',
              }}
            >
              View all case studies
              <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
