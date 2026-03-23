'use client'

import { Magnetic } from '@/components/ui/Magnetic'
import { processIcons } from '@/components/ui/ProcessIcons'
import { TextScramble } from '@/components/ui/TextScramble'
import { processSteps } from '@/lib/data'
import { setProcessPhase } from '@/lib/processPhaseStore'
import { AnimatePresence, motion, useInView } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowRight, CheckCircle2 } from 'lucide-react'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { CSSProperties, useCallback, useEffect, useRef, useState } from 'react'

const ProcessCanvas = dynamic(() => import('@/components/ui/ProcessCanvas'), { ssr: false })

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

// ── Phase accent colours — amber → blend → sapphire → blend → emerald ────────
//   mirrors the three capability worlds the viewer just traversed
const PHASE_ACCENTS = [
  { hex: '#C8920A', rgb: '200,146,10',  label: 'Discovery'   },
  { hex: '#7A74A8', rgb: '122,116,168', label: 'Strategy'    },
  { hex: '#3B82F6', rgb: '59,130,246',  label: 'Validation'  },
  { hex: '#2C9DA3', rgb: '44,157,163',  label: 'Engineering' },
  { hex: '#10B981', rgb: '16,185,129',  label: 'Launch'      },
]

const glassDarkStyle: CSSProperties = {
  background: 'linear-gradient(135deg, rgba(255,255,255,0.055) 0%, rgba(255,255,255,0.018) 60%, rgba(255,255,255,0.008) 100%)',
  backdropFilter: 'blur(28px) saturate(160%)',
  WebkitBackdropFilter: 'blur(28px) saturate(160%)',
  border: '1px solid rgba(255,255,255,0.10)',
  boxShadow: '0 8px 64px rgba(0,0,0,0.28), inset 0 1px 0 rgba(255,255,255,0.12)',
}

const glassLightStyle: CSSProperties = {
  background: 'linear-gradient(135deg, rgba(255,255,255,0.72) 0%, rgba(255,255,255,0.52) 60%, rgba(255,255,255,0.38) 100%)',
  backdropFilter: 'blur(28px) saturate(160%)',
  WebkitBackdropFilter: 'blur(28px) saturate(160%)',
  border: '1px solid rgba(0,0,0,0.06)',
  boxShadow: '0 8px 64px rgba(0,0,0,0.08), inset 0 1px 0 rgba(255,255,255,0.90)',
}

const pm = { ease: [0.16, 1, 0.3, 1] as const, base: 0.55 }

export default function Process() {
  const sectionRef        = useRef<HTMLElement>(null)
  const pinnedRef         = useRef<HTMLDivElement>(null)
  const stepsContainerRef = useRef<HTMLDivElement>(null)
  const activePhaseRef    = useRef(0)
  const [activeStep, setActiveStep] = useState(0)
  const [isDesktop,  setIsDesktop]  = useState(false)
  const [isDark,     setIsDark]     = useState(true)
  const [canvasActive, setCanvasActive] = useState(false)

  // ── Theme detection for glass variants ──────────────────────────────────
  useEffect(() => {
    const check = () => setIsDark(document.documentElement.classList.contains('dark'))
    check()
    const obs = new MutationObserver(check)
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })
    return () => obs.disconnect()
  }, [])

  /* ── Detect lg breakpoint ── */
  const checkDesktop = useCallback(() => {
    setIsDesktop(window.matchMedia('(min-width: 1024px)').matches)
  }, [])

  useEffect(() => {
    checkDesktop()
    window.addEventListener('resize', checkDesktop)
    return () => window.removeEventListener('resize', checkDesktop)
  }, [checkDesktop])

  /* ── GSAP ScrollTrigger: pin left, scroll right ── */
  useEffect(() => {
    if (!isDesktop || !sectionRef.current || !pinnedRef.current || !stepsContainerRef.current) {
      setCanvasActive(false)
      return
    }

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    const stepEls = stepsContainerRef.current.querySelectorAll<HTMLElement>('.process-step')

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top bottom',
        end: 'bottom top',
        onEnter: () => setCanvasActive(true),
        onEnterBack: () => setCanvasActive(true),
        onLeave: () => setCanvasActive(false),
        onLeaveBack: () => setCanvasActive(false),
      })

      // Pin the section so left column stays fixed while right scrolls
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top top',
        end: () => `+=${stepsContainerRef.current!.scrollHeight - window.innerHeight + 200}`,
        pin: pinnedRef.current,
        pinSpacing: false,
        scrub: false,
      })

      // Track which step is active based on scroll position
      stepEls.forEach((step, i) => {
        ScrollTrigger.create({
          trigger: step,
          start: 'top 55%',
          end: 'bottom 55%',
          onToggle: (self) => {
            if (self.isActive) {
              setProcessPhase(i)       // synchronous — canvas reads this same frame
              setActiveStep(i)
              activePhaseRef.current = i
            }
          },
        })
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [isDesktop])

  useEffect(() => {
    setProcessPhase(activeStep)
  }, [activeStep])

  const ActiveIcon    = processIcons[activeStep]
  const activeAccent  = PHASE_ACCENTS[activeStep]
  const glassStyle    = isDark ? glassDarkStyle : glassLightStyle

  return (
    <section
      ref={sectionRef}
      id="process"
      className="relative"
      aria-label="Engagement process"
      data-active-phase={activeStep}
      style={{
        background: isDark
          ? 'linear-gradient(180deg,#000000 0%,#020508 40%,#000000 100%)'
          : 'linear-gradient(180deg,#F5F5F2 0%,#EFEFF0 40%,#F5F5F2 100%)',
      }}
    >
      {/* Desktop viewport camera — fixed to the viewport while the section is active. */}
      <div
        className="hidden lg:block fixed inset-0 w-full h-screen pointer-events-none"
        aria-hidden="true"
        style={{
          zIndex: 0,
          opacity: canvasActive ? 1 : 0,
          visibility: canvasActive ? 'visible' : 'hidden',
          transition: 'opacity 180ms linear, visibility 180ms linear',
        }}
      >
        <ProcessCanvas className="absolute inset-0 w-full h-full" />
        {/* Radial vignette — keeps text readable over canvas */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            zIndex: 1,
            background: isDark
              ? 'radial-gradient(ellipse 92% 76% at 62% 50%, transparent 0%, rgba(0,0,0,0.22) 56%, rgba(0,0,0,0.70) 100%)'
              : 'radial-gradient(ellipse 92% 76% at 62% 50%, transparent 0%, rgba(245,245,242,0.24) 56%, rgba(245,245,242,0.72) 100%)',
          }}
        />
      </div>

      {/* Mobile viewport camera — section-local sticky background */}
      <div
        className="lg:hidden sticky top-0 w-full h-screen pointer-events-none"
        aria-hidden="true"
        style={{ zIndex: 0, marginBottom: '-100vh' }}
      >
        <ProcessCanvas className="absolute inset-0 w-full h-full" />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            zIndex: 1,
            background: isDark
              ? 'radial-gradient(ellipse 82% 70% at 50% 50%, transparent 0%, rgba(0,0,0,0.42) 60%, rgba(0,0,0,0.82) 100%)'
              : 'radial-gradient(ellipse 82% 70% at 50% 50%, transparent 0%, rgba(245,245,242,0.40) 60%, rgba(245,245,242,0.80) 100%)',
          }}
        />
      </div>

      {/* ── DESKTOP: Scroll-pinned split-screen ── */}
      <div className="hidden lg:flex max-w-[90rem] mx-auto relative z-20">

        {/* Left column — pinned */}
        <div
          ref={pinnedRef}
          className="w-[40%] h-screen flex flex-col justify-center pl-10 xl:pl-20 pr-10"
        >
          <p className="text-[10px] md:text-xs font-mono font-semibold uppercase tracking-[0.35em] text-accent mb-7">
            How We Engage
          </p>

          <h2 className="font-syne text-4xl xl:text-5xl 2xl:text-[3.5rem] font-bold tracking-tight text-foreground leading-[1.06] mb-6">
            Engagement<br />
            <span
              className="transition-colors duration-700"
              style={{ color: activeAccent.hex }}
            >
              Architecture.
            </span>
          </h2>

          <p className="font-sans text-sm text-muted-foreground/80 leading-relaxed max-w-xs mb-10">
            Five phases. Each one with a named owner, a hard deliverable, and a client sign-off before anything advances.
          </p>

          {/* Animated icon — crossfades per active step */}
          <div className="mb-10" style={{ color: activeAccent.hex }}>
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStep}
                initial={{ opacity: 0, scale: 0.82, filter: 'blur(4px)' }}
                animate={{ opacity: 1, scale: 1,    filter: 'blur(0px)' }}
                exit={{   opacity: 0, scale: 0.82,  filter: 'blur(4px)' }}
                transition={{ duration: pm.base, ease: pm.ease }}
                className="w-[72px] h-[72px]"
              >
                <ActiveIcon animate className="w-full h-full" />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Vertical step indicators */}
          <div className="flex flex-col gap-3">
            {processSteps.map((step, i) => (
              <button
                key={i}
                type="button"
                className="flex items-center gap-3 text-left"
                onClick={() => {
                  const el = stepsContainerRef.current?.querySelectorAll<HTMLElement>('.process-step')[i]
                  el?.scrollIntoView({ behavior: 'smooth', block: 'center' })
                }}
                aria-label={`Jump to ${step.title}`}
              >
                <div
                  className="h-px rounded-full transition-all duration-500 ease-out shrink-0"
                  style={{
                    width: i === activeStep ? 36 : 14,
                    background: i === activeStep
                      ? PHASE_ACCENTS[i].hex
                      : isDark ? 'rgba(255,255,255,0.18)' : 'rgba(0,0,0,0.16)',
                  }}
                />
                <span
                  className="font-mono text-[10px] font-semibold tracking-[0.25em] uppercase transition-colors duration-400"
                  style={{
                    color: i === activeStep
                      ? PHASE_ACCENTS[i].hex
                      : isDark ? 'rgba(255,255,255,0.30)' : 'rgba(0,0,0,0.28)',
                  }}
                >
                  {step.number}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Right column — scrolls naturally */}
        <div
          ref={stepsContainerRef}
          className="w-[60%] pr-10 xl:pr-20 py-[25vh]"
        >
          {processSteps.map((step, i) => {
            const accent = PHASE_ACCENTS[i]
            return (
              <div key={i} className="process-step min-h-[80vh] flex items-center">
                <motion.div
                  className="w-full py-10"
                  animate={{ opacity: activeStep === i ? 1 : 0.22 }}
                  transition={{ duration: 0.55, ease: pm.ease }}
                >
                  {/* Phase accent rule */}
                  <div
                    className="h-px w-full mb-10 transition-all duration-700"
                    style={{
                      background: activeStep === i
                        ? `linear-gradient(to right, rgba(${accent.rgb},0.8), rgba(${accent.rgb},0.0))`
                        : isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)',
                    }}
                  />

                  {/* Glass card */}
                  <div
                    className="rounded-2xl p-8 xl:p-10 relative overflow-hidden"
                    style={activeStep === i ? glassStyle : undefined}
                  >
                    {/* Phase top accent rail */}
                    {activeStep === i && (
                      <div
                        className="absolute top-0 left-0 right-0 h-[2px] rounded-t-2xl"
                        style={{ background: `linear-gradient(to right, rgba(${accent.rgb},0.9), rgba(${accent.rgb},0.1))` }}
                      />
                    )}
                    {/* Inner glare */}
                    {activeStep === i && (
                      <div
                        className="absolute top-0 left-0 right-0 h-16 rounded-t-2xl pointer-events-none"
                        style={{ background: 'linear-gradient(to bottom, rgba(255,255,255,0.06), transparent)' }}
                      />
                    )}

                    {/* Header row */}
                    <div className="flex items-start justify-between mb-6">
                      <span
                        className="font-mono text-xs font-bold tracking-[0.35em] uppercase transition-colors duration-500"
                        style={{ color: activeStep === i ? accent.hex : isDark ? 'rgba(255,255,255,0.25)' : 'rgba(0,0,0,0.22)' }}
                      >
                        <TextScramble text={step.number} trigger={activeStep === i} duration={500} />
                      </span>

                      {activeStep === i && (
                        <motion.span
                          initial={{ opacity: 0, x: 8 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: pm.base, ease: pm.ease }}
                          className="font-mono text-[9px] font-semibold tracking-[0.25em] uppercase px-2.5 py-1 rounded-full"
                          style={{
                            color: accent.hex,
                            background: `rgba(${accent.rgb}, 0.12)`,
                            border: `1px solid rgba(${accent.rgb}, 0.30)`,
                          }}
                        >
                          {accent.label}
                        </motion.span>
                      )}
                    </div>

                    <h3 className="font-syne text-2xl xl:text-3xl font-bold text-foreground mb-2 leading-tight">
                      {step.title}
                    </h3>

                    {/* Subtitle — premium new field */}
                    <p
                      className="font-sans text-sm font-medium mb-5 transition-colors duration-500"
                      style={{ color: activeStep === i ? accent.hex : isDark ? 'rgba(255,255,255,0.28)' : 'rgba(0,0,0,0.32)', opacity: 0.9 }}
                    >
                      {step.subtitle}
                    </p>

                    <p className="font-sans text-[15px] text-muted-foreground leading-relaxed mb-8 max-w-[520px]">
                      {step.description}
                    </p>

                    {/* Deliverables 2×2 grid */}
                    <div className="grid grid-cols-2 gap-x-6 gap-y-3 mb-8">
                      {step.deliverables.map((d, j) => (
                        <div key={j} className="flex items-start gap-2.5">
                          <span
                            className="mt-[5px] block w-1.5 h-1.5 rounded-full shrink-0 transition-colors duration-500"
                            style={{ background: `rgba(${accent.rgb}, ${activeStep === i ? '0.70' : '0.25'})` }}
                          />
                          <span className="font-sans text-sm text-muted-foreground/80 leading-snug">{d}</span>
                        </div>
                      ))}
                    </div>

                    {/* Outcome statement */}
                    <div
                      className="flex items-center gap-3 rounded-xl px-5 py-4 transition-all duration-500"
                      style={{
                        background: `rgba(${accent.rgb}, ${activeStep === i ? '0.07' : '0.02'})`,
                        border: `1px solid rgba(${accent.rgb}, ${activeStep === i ? '0.22' : '0.06'})`,
                      }}
                    >
                      <CheckCircle2
                        className="w-4 h-4 shrink-0 transition-colors duration-500"
                        style={{ color: activeStep === i ? accent.hex : isDark ? 'rgba(255,255,255,0.25)' : 'rgba(0,0,0,0.22)' }}
                      />
                      <p
                        className="font-mono text-xs leading-snug transition-colors duration-500"
                        style={{ color: activeStep === i ? accent.hex : isDark ? 'rgba(255,255,255,0.38)' : 'rgba(0,0,0,0.35)' }}
                      >
                        {step.outcome}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </div>
            )
          })}

          {/* CTA at the end of the scroll journey */}
          <div className="py-24 flex gap-4">
            <Magnetic>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2.5 bg-accent text-background px-8 py-4 rounded-full text-sm font-sans font-bold hover:brightness-110 transition-all duration-300"
              >
                Start an engagement
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Magnetic>
          </div>
        </div>
      </div>

      {/* ── MOBILE / TABLET: Atmospheric stacked cards ── */}
      <div className="lg:hidden relative z-20 py-24 max-w-2xl mx-auto px-5 md:px-10">

        <p className="text-[10px] md:text-xs font-mono font-semibold uppercase tracking-[0.35em] text-accent mb-6">
          How We Engage
        </p>
        <h2 className="font-syne text-3xl md:text-4xl font-bold tracking-tight text-foreground leading-[1.1] mb-4">
          Engagement <span className="text-accent">Architecture.</span>
        </h2>
        <p className="font-sans text-sm text-muted-foreground/80 leading-relaxed mb-16 max-w-sm">
          Five phases. Hard deliverables. Client sign-off before every advance.
        </p>

        <div className="space-y-5">
          {processSteps.map((step, i) => {
            const StepIcon = processIcons[i]
            return (
              <MobileCard
                key={i}
                step={step}
                index={i}
                StepIcon={StepIcon}
                accent={PHASE_ACCENTS[i]}
                isDark={isDark}
                glassDark={glassDarkStyle}
                glassLight={glassLightStyle}
              />
            )
          })}
        </div>

        <div className="mt-16">
          <Magnetic>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2.5 bg-accent text-background px-8 py-4 rounded-full text-sm font-sans font-bold hover:brightness-110 transition-all duration-300"
            >
              Start an engagement
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Magnetic>
        </div>
      </div>
    </section>
  )
}

// ── Mobile card with useInView trigger ──────────────────────────────────────

interface MobileCardProps {
  step: (typeof processSteps)[number]
  index: number
  StepIcon: (typeof processIcons)[number]
  accent: { hex: string; rgb: string; label: string }
  isDark: boolean
  glassDark: CSSProperties
  glassLight: CSSProperties
}

function MobileCard({ step, index, StepIcon, accent, isDark, glassDark, glassLight }: MobileCardProps) {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-12%' })
  const glass  = isDark ? glassDark : glassLight

  return (
    <div
      ref={ref}
      className="relative rounded-2xl overflow-hidden"
      style={{
        ...glass,
        opacity:    inView ? 1 : 0,
        transform:  inView ? 'translateY(0)' : 'translateY(28px)',
        transition: `opacity 0.65s ease ${index * 0.07}s, transform 0.65s cubic-bezier(0.16,1,0.3,1) ${index * 0.07}s`,
      }}
    >
      {/* Phase top rail */}
      <div
        className="absolute top-0 left-0 right-0 h-[2px]"
        style={{ background: `linear-gradient(to right, rgba(${accent.rgb},0.9), rgba(${accent.rgb},0.05))` }}
      />
      {/* Phase ambient glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: `radial-gradient(ellipse 80% 60% at 10% 0%, rgba(${accent.rgb},0.07), transparent 70%)` }}
      />

      <div className="relative p-6 md:p-8">
        <div className="flex items-start justify-between mb-5">
          <div>
            <span
              className="font-mono text-[9px] font-bold tracking-[0.35em] uppercase block mb-1"
              style={{ color: accent.hex }}
            >
              {step.number}
            </span>
            <h3 className="font-syne text-xl font-bold text-foreground leading-tight">
              {step.title}
            </h3>
          </div>
          <div style={{ color: accent.hex }} className="opacity-70 mt-0.5">
            <StepIcon animate={inView} className="w-9 h-9" />
          </div>
        </div>

        <p className="font-sans text-sm font-medium mb-3" style={{ color: accent.hex, opacity: 0.85 }}>
          {step.subtitle}
        </p>

        <p className="font-sans text-sm text-muted-foreground/80 leading-relaxed mb-6">
          {step.description}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-5">
          {step.deliverables.map((d, j) => (
            <div key={j} className="flex items-start gap-2">
              <span
                className="mt-[5px] block w-1.5 h-1.5 rounded-full shrink-0"
                style={{ background: `rgba(${accent.rgb}, 0.60)` }}
              />
              <span className="font-sans text-xs text-muted-foreground/80">{d}</span>
            </div>
          ))}
        </div>

        <div
          className="flex items-center gap-2.5 rounded-xl px-4 py-3"
          style={{
            background: `rgba(${accent.rgb}, 0.07)`,
            border: `1px solid rgba(${accent.rgb}, 0.22)`,
          }}
        >
          <CheckCircle2 className="w-3.5 h-3.5 shrink-0" style={{ color: accent.hex }} />
          <p className="font-mono text-[10px] leading-snug" style={{ color: accent.hex, opacity: 0.90 }}>
            {step.outcome}
          </p>
        </div>
      </div>
    </div>
  )
}
