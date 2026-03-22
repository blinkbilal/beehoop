'use client'

import { Magnetic } from '@/components/ui/Magnetic'
import { processIcons } from '@/components/ui/ProcessIcons'
import { TextScramble } from '@/components/ui/TextScramble'
import { processSteps } from '@/lib/data'
import { AnimatePresence, motion, useInView } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { useCallback, useEffect, useRef, useState } from 'react'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

/* ────────────────────────────────────────────
   Deliverables per step — enriched content
   ──────────────────────────────────────────── */
const deliverables: string[][] = [
  ['Stakeholder interview synthesis', 'Data ecosystem audit', 'Competitive benchmark report', 'Technical landscape map'],
  ['Strategic roadmap', 'Data architecture blueprint', 'Operating model design', 'Resource & timeline plan'],
  ['Financial scenario models', 'Pipeline proof-of-concept', 'Assumption stress-tests', 'Validation sign-off'],
  ['Production dashboards', 'Data pipelines & integrations', 'Custom software modules', 'Enterprise documentation'],
  ['Launch monitoring playbook', 'Performance tuning cycles', 'Team enablement & training', 'Ongoing support retainer'],
]

export default function Process() {
  const sectionRef = useRef<HTMLElement>(null)
  const pinnedRef = useRef<HTMLDivElement>(null)
  const stepsContainerRef = useRef<HTMLDivElement>(null)
  const [activeStep, setActiveStep] = useState(0)
  const [isDesktop, setIsDesktop] = useState(false)

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
    if (!isDesktop || !sectionRef.current || !pinnedRef.current || !stepsContainerRef.current) return

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    const stepEls = stepsContainerRef.current.querySelectorAll<HTMLElement>('.process-step')

    const ctx = gsap.context(() => {
      // Pin the section so left column stays fixed while right scrolls
      const trigger = ScrollTrigger.create({
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
            if (self.isActive) setActiveStep(i)
          },
        })
      })

      return () => trigger.kill()
    }, sectionRef)

    return () => ctx.revert()
  }, [isDesktop])

  const ActiveIcon = processIcons[activeStep]

  return (
    <section
      ref={sectionRef}
      id="process"
      className="relative bg-background"
      aria-label="Our engagement process"
    >
      {/* ── Subtle top border ── */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-border/50 to-transparent" />

      {/* ── DESKTOP: Scroll-pinned split-screen ── */}
      <div className="hidden lg:flex max-w-[90rem] mx-auto relative">

        {/* Left column — pinned */}
        <div
          ref={pinnedRef}
          className="w-[42%] h-screen flex flex-col justify-center pl-10 xl:pl-20 pr-12 sticky top-0"
        >
          <p className="text-[10px] md:text-xs font-mono font-semibold uppercase tracking-[0.3em] text-accent mb-6">
            How We Engage
          </p>

          <h2 className="font-syne text-4xl xl:text-5xl 2xl:text-6xl font-bold tracking-tight text-foreground leading-[1.08] mb-8">
            Process<br />
            <span className="text-accent">Architecture.</span>
          </h2>

          <p className="font-sans text-base text-muted-foreground leading-relaxed max-w-sm mb-12">
            A five-phase engagement model refined across 200+ mandates. Every phase has a clear owner, a hard deliverable, and a client sign-off before we advance.
          </p>

          {/* Animated icon — crossfades when active step changes */}
          <div className="w-24 h-24 text-accent/80 mb-10">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStep}
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.85 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              >
                <ActiveIcon animate className="w-24 h-24" />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Step indicator dots */}
          <div className="flex gap-3">
            {processSteps.map((_, i) => (
              <div
                key={i}
                className="h-1.5 rounded-full transition-all duration-500 ease-out"
                style={{
                  width: i === activeStep ? 32 : 12,
                  background: i === activeStep
                    ? 'hsl(var(--accent))'
                    : 'hsl(var(--border))',
                }}
              />
            ))}
          </div>
        </div>

        {/* Right column — scrolls naturally */}
        <div
          ref={stepsContainerRef}
          className="w-[58%] pr-10 xl:pr-20 py-[25vh]"
        >
          {processSteps.map((step, i) => {
            return (
              <div
                key={i}
                className="process-step min-h-[75vh] flex items-center"
              >
                <div
                  className="py-14 border-t border-border/30 w-full transition-opacity duration-500"
                  style={{ opacity: activeStep === i ? 1 : 0.3 }}
                >
                  {/* Step number — scramble */}
                  <span className="font-mono text-xs font-bold tracking-[0.3em] text-accent/60 block mb-5">
                    <TextScramble text={step.number} trigger={activeStep === i} duration={500} />
                  </span>

                  <h3 className="font-syne text-2xl xl:text-3xl font-bold text-foreground mb-4 leading-tight">
                    {step.title}
                  </h3>

                  <p className="font-sans text-base text-muted-foreground leading-relaxed mb-8 max-w-lg">
                    {step.description}
                  </p>

                  {/* Deliverables */}
                  <div className="grid grid-cols-2 gap-x-8 gap-y-3">
                    {deliverables[i].map((d, j) => (
                      <div key={j} className="flex items-start gap-2.5">
                        <span className="mt-1.5 block w-1.5 h-1.5 rounded-full bg-accent/50 shrink-0" />
                        <span className="font-sans text-sm text-muted-foreground/80">{d}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )
          })}

          {/* CTA at the end of the scroll journey */}
          <div className="py-20 flex gap-4">
            <Magnetic>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-accent text-background px-7 py-4 rounded-full text-sm font-sans font-bold hover:brightness-110 transition-all duration-300"
              >
                Start an engagement
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Magnetic>
          </div>
        </div>
      </div>

      {/* ── MOBILE / TABLET: Vertical stacked cards ── */}
      <div className="lg:hidden py-20 max-w-3xl mx-auto px-6 md:px-10">

        <p className="text-[10px] md:text-xs font-mono font-semibold uppercase tracking-[0.3em] text-accent mb-5">
          How We Engage
        </p>
        <h2 className="font-syne text-3xl md:text-4xl font-bold tracking-tight text-foreground leading-[1.1] mb-4">
          Process <span className="text-accent">Architecture.</span>
        </h2>
        <p className="font-sans text-base text-muted-foreground leading-relaxed mb-14 max-w-md">
          Five phases. Hard deliverables. Client sign-off before every advance.
        </p>

        <div className="space-y-6">
          {processSteps.map((step, i) => {
            const StepIcon = processIcons[i]
            return <MobileCard key={i} step={step} index={i} StepIcon={StepIcon} deliverables={deliverables[i]} />
          })}
        </div>

        <div className="mt-12">
          <Magnetic>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-accent text-background px-7 py-4 rounded-full text-sm font-sans font-bold hover:brightness-110 transition-all duration-300"
            >
              Start an engagement
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Magnetic>
        </div>
      </div>

      {/* ── Bottom border ── */}
      <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-border/50 to-transparent" />
    </section>
  )
}

/* ── Mobile card with useInView trigger ── */

function MobileCard({
  step,
  index,
  StepIcon,
  deliverables,
}: {
  step: (typeof processSteps)[number]
  index: number
  StepIcon: (typeof processIcons)[number]
  deliverables: string[]
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-15%' })

  return (
    <div
      ref={ref}
      className="relative bg-card/40 backdrop-blur-md border border-border/40 rounded-2xl p-7 md:p-9 transition-all duration-500"
      style={{
        opacity: isInView ? 1 : 0,
        transform: isInView ? 'translateY(0)' : 'translateY(32px)',
        transition: `opacity 0.6s ease ${index * 0.08}s, transform 0.6s cubic-bezier(0.16,1,0.3,1) ${index * 0.08}s`,
      }}
    >
      <div className="flex items-start justify-between mb-5">
        <span className="font-mono text-xs font-bold tracking-[0.3em] text-accent/60">
          {step.number}
        </span>
        <StepIcon animate={isInView} className="w-10 h-10 text-accent/60" />
      </div>

      <h3 className="font-syne text-xl font-bold text-foreground mb-3 leading-tight">
        {step.title}
      </h3>

      <p className="font-sans text-sm text-muted-foreground leading-relaxed mb-6">
        {step.description}
      </p>

      {/* Deliverables */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {deliverables.map((d, j) => (
          <div key={j} className="flex items-start gap-2">
            <span className="mt-1.5 block w-1.5 h-1.5 rounded-full bg-accent/40 shrink-0" />
            <span className="font-sans text-xs text-muted-foreground/80">{d}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
