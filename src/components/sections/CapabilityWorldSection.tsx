'use client'

import { Magnetic } from '@/components/ui/Magnetic'
import { homepageCapabilityWorlds, premiumMotion, type HomepageCapabilityKey } from '@/lib/siteExperience'
import { services, type ServicePillar } from '@/lib/data'
import { motion, useInView, useMotionValue, useReducedMotion, useSpring, useTransform } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { useTheme } from 'next-themes'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { clsx } from 'clsx'

type CapabilitySectionKey = Exclude<HomepageCapabilityKey, 'intelligence-engine'>

type CapabilityWorldSectionProps = {
  capabilityKey: CapabilitySectionKey
}

type CapabilitySectionConfig = {
  id: string
  pillar: ServicePillar
  label: string
  narrative: string
  metricValue: string
  metricLabel: string
  primaryCta: {
    href: string
    label: string
  }
  secondaryCta: {
    href: string
    label: string
  }
  sceneVariant: 'advisory' | 'engineering'
  reverse: boolean
}

const capabilitySectionConfig: Record<CapabilitySectionKey, CapabilitySectionConfig> = {
  'strategic-advisory': {
    id: 'strategic-advisory',
    pillar: 'advisory',
    label: 'Strategic Advisory',
    narrative:
      'We clarify where to play, how to win, and what to sequence first.',
    metricValue: '3 horizons',
    metricLabel: 'One strategic direction',
    primaryCta: {
      href: '/services/strategy-development',
      label: 'Explore advisory services',
    },
    secondaryCta: {
      href: '/cases',
      label: 'See strategic outcomes',
    },
    sceneVariant: 'advisory',
    reverse: false,
  },
  'digital-engineering': {
    id: 'digital-engineering',
    pillar: 'engineering',
    label: 'Digital Engineering',
    narrative:
      'Once direction is clear and intelligence is structured, we engineer the systems that operationalize both.',
    metricValue: '1 system',
    metricLabel: 'Platforms, data, and operations converge',
    primaryCta: {
      href: '/services/custom-software-development',
      label: 'Explore engineering services',
    },
    secondaryCta: {
      href: '/cases',
      label: 'View engineered results',
    },
    sceneVariant: 'engineering',
    reverse: true,
  },
}

export default function CapabilityWorldSection({ capabilityKey }: CapabilityWorldSectionProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const sceneRef = useRef<HTMLDivElement>(null)
  const isViewportActive = useInView(sectionRef, { margin: '-10% 0px -10% 0px' })
  const { theme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [hasEntered, setHasEntered] = useState(false)
  const prefersReducedMotion = useReducedMotion()
  const pointerX = useMotionValue(0)
  const pointerY = useMotionValue(0)
  const softX = useSpring(pointerX, { stiffness: 80, damping: 18, mass: 0.6 })
  const softY = useSpring(pointerY, { stiffness: 80, damping: 18, mass: 0.6 })
  const rotateX = useTransform(softY, [-1, 1], [6, -6])
  const rotateY = useTransform(softX, [-1, 1], [-7, 7])
  const depthX = useTransform(softX, [-1, 1], [-18, 18])
  const depthY = useTransform(softY, [-1, 1], [-16, 16])

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (isViewportActive) {
      setHasEntered(true)
    }
  }, [isViewportActive])

  const activeTheme = resolvedTheme ?? theme
  const isDark = !mounted || activeTheme === 'dark'
  const world = homepageCapabilityWorlds[capabilityKey]
  const config = capabilitySectionConfig[capabilityKey]
  const featuredServices = services.filter((service) => service.pillar === config.pillar).slice(0, 3)

  const sectionTransition = `${premiumMotion.duration.slow}s var(--ease-expressive)`
  const copyTransition = `${premiumMotion.duration.base}s var(--ease-standard)`
  const allowAmbientMotion = isViewportActive && !prefersReducedMotion

  const handleSceneMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!sceneRef.current) {
      return
    }

    const bounds = sceneRef.current.getBoundingClientRect()
    const normalizedX = ((event.clientX - bounds.left) / bounds.width) * 2 - 1
    const normalizedY = ((event.clientY - bounds.top) / bounds.height) * 2 - 1

    pointerX.set(normalizedX)
    pointerY.set(normalizedY)
  }

  const resetSceneMove = () => {
    pointerX.set(0)
    pointerY.set(0)
  }

  const getCompactSummary = (description: string) => {
    const trimmed = description.trim()

    if (trimmed.includes(' - ')) {
      return `${trimmed.split(' - ')[0]}.`
    }

    if (trimmed.includes(' — ')) {
      return `${trimmed.split(' — ')[0]}.`
    }

    const firstSentence = trimmed.match(/^[^.?!]+[.?!]?/)
    return firstSentence?.[0] ?? trimmed
  }

  return (
    <section
      ref={sectionRef}
      id={config.id}
      className="relative overflow-hidden py-14 md:py-16"
      aria-label={world.label}
      style={{
        background: 'linear-gradient(180deg, hsl(var(--background)) 0%, color-mix(in srgb, var(--experience-canvas-edge) 78%, transparent) 10%, var(--experience-canvas-base) 52%, color-mix(in srgb, var(--experience-canvas-edge) 86%, transparent) 92%, hsl(var(--background)) 100%)',
      }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: isDark
            ? 'radial-gradient(circle at 18% 20%, rgba(245,200,66,0.11) 0%, transparent 38%), radial-gradient(circle at 80% 72%, rgba(255,255,255,0.05) 0%, transparent 34%)'
            : 'radial-gradient(circle at 18% 20%, rgba(200,146,10,0.08) 0%, transparent 42%), radial-gradient(circle at 80% 72%, rgba(255,255,255,0.55) 0%, transparent 34%)',
        }}
      />
      <div
        className="absolute inset-x-0 top-0 h-32 pointer-events-none"
        style={{
          background: isDark
            ? 'linear-gradient(180deg, rgba(255,255,255,0.03) 0%, transparent 100%)'
            : 'linear-gradient(180deg, rgba(255,255,255,0.48) 0%, transparent 100%)',
        }}
      />
      <div className="absolute inset-x-0 top-0 pointer-events-none flex justify-center">
        <div
          className="h-px w-[min(78vw,54rem)]"
          style={{
            background: isDark
              ? 'linear-gradient(90deg, transparent 0%, rgba(245,200,66,0.16) 18%, rgba(255,255,255,0.20) 50%, rgba(245,200,66,0.16) 82%, transparent 100%)'
              : 'linear-gradient(90deg, transparent 0%, rgba(200,146,10,0.12) 18%, rgba(74,70,56,0.18) 50%, rgba(200,146,10,0.12) 82%, transparent 100%)',
          }}
        />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[92rem] px-5 md:px-8 lg:px-10">
        <div className="experience-shell relative overflow-hidden rounded-[32px] border border-[color:var(--experience-surface-border)] px-5 py-5 shadow-[var(--experience-surface-shadow)] md:px-8 md:py-7 lg:px-10 lg:py-8">
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'linear-gradient(180deg, transparent 0%, var(--experience-ambient-glow) 100%)',
              opacity: isDark ? 0.78 : 0.54,
            }}
          />
          <div
            className="absolute inset-x-8 top-5 h-px pointer-events-none"
            style={{
              background: isDark
                ? 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.12) 50%, transparent 100%)'
                : 'linear-gradient(90deg, transparent 0%, rgba(74,70,56,0.12) 50%, transparent 100%)',
            }}
          />
          <div
            className={clsx(
              'relative grid items-center gap-6 lg:gap-10',
              config.reverse ? 'lg:grid-cols-[minmax(0,1fr)_minmax(0,1.18fr)]' : 'lg:grid-cols-[minmax(0,1.18fr)_minmax(0,1fr)]'
            )}
          >
            <div className={clsx(config.reverse ? 'lg:order-2' : 'lg:order-1')}>
              <p
                className="text-[10px] md:text-xs font-mono font-semibold uppercase tracking-[0.3em] mb-3"
                style={{
                  color: capabilityKey === 'strategic-advisory' ? 'var(--capability-advisory)' : 'var(--capability-engineering)',
                  opacity: hasEntered ? 1 : 0,
                  transform: hasEntered ? 'translateY(0)' : 'translateY(12px)',
                  transition: `opacity ${copyTransition}, transform ${copyTransition}`,
                }}
              >
                {config.label}
              </p>

              <h2
                className="max-w-[28rem] font-syne text-3xl md:text-[3.05rem] lg:text-[3.25rem] font-bold leading-[1.02] tracking-tight"
                style={{
                  color: 'hsl(var(--foreground))',
                  opacity: hasEntered ? 1 : 0,
                  transform: hasEntered ? 'translateY(0)' : 'translateY(22px)',
                  transition: `opacity ${sectionTransition} 0.1s, transform ${sectionTransition} 0.1s`,
                }}
              >
                {world.headline}
              </h2>

              <p
                className="mt-4 max-w-[29rem] font-sans text-[14px] md:text-[15px] leading-7"
                style={{
                  color: 'hsl(var(--text-secondary))',
                  opacity: hasEntered ? 1 : 0,
                  transform: hasEntered ? 'translateY(0)' : 'translateY(18px)',
                  transition: `opacity ${copyTransition} 0.18s, transform ${copyTransition} 0.18s`,
                }}
              >
                {world.summary} {config.narrative}
              </p>

              <div
                className="mt-5 flex flex-wrap items-center gap-3"
                style={{
                  opacity: hasEntered ? 1 : 0,
                  transform: hasEntered ? 'translateY(0)' : 'translateY(18px)',
                  transition: `opacity ${copyTransition} 0.28s, transform ${copyTransition} 0.28s`,
                }}
              >
                <div className="experience-surface relative overflow-hidden rounded-full px-4 py-3">
                  <p
                    className="font-syne text-2xl md:text-[2.2rem] font-bold"
                    style={{
                      color: capabilityKey === 'strategic-advisory' ? 'var(--capability-advisory)' : 'var(--capability-engineering)',
                    }}
                  >
                    {config.metricValue}
                  </p>
                  <p className="mt-1 max-w-[10rem] text-[11px] font-sans leading-relaxed text-[hsl(var(--text-secondary))]">
                    {config.metricLabel}
                  </p>
                </div>
                <div className="experience-surface relative overflow-hidden rounded-full px-4 py-2.5 text-[12px] font-sans font-medium text-[hsl(var(--text-secondary))]">
                  {capabilityKey === 'strategic-advisory' ? 'Decision gravity' : 'Operational continuity'}
                </div>
              </div>
            </div>

            <div className={clsx(config.reverse ? 'lg:order-1' : 'lg:order-2')}>
              <motion.div
                ref={sceneRef}
                onMouseMove={handleSceneMove}
                onMouseLeave={resetSceneMove}
                className="relative mx-auto w-full max-w-[50rem] [perspective:1400px]"
                style={{
                  x: depthX,
                  y: depthY,
                  rotateX,
                  rotateY,
                  transformStyle: 'preserve-3d',
                }}
              >
                <CapabilityScene
                  capabilityKey={capabilityKey}
                  isDark={isDark}
                  isInView={hasEntered}
                  allowAmbientMotion={allowAmbientMotion}
                  depthX={depthX}
                  depthY={depthY}
                />
              </motion.div>
            </div>
          </div>

          <div
            className="relative mt-6 grid gap-3 md:grid-cols-3 md:gap-3"
            style={{
              opacity: hasEntered ? 1 : 0,
              transform: hasEntered ? 'translateY(0)' : 'translateY(22px)',
              transition: `opacity ${sectionTransition} 0.3s, transform ${sectionTransition} 0.3s`,
            }}
          >
            {featuredServices.map((service, index) => (
              <Link
                key={service.slug}
                href={`/services/${service.slug}`}
                className="glass-card premium-transition relative block overflow-hidden rounded-[24px] p-4 md:p-5 group"
              >
                <span
                  className="font-mono text-[10px] font-bold tracking-[0.28em]"
                  style={{
                    color: capabilityKey === 'strategic-advisory' ? 'var(--capability-advisory)' : 'var(--capability-engineering)',
                  }}
                >
                  {String(index + 1).padStart(2, '0')}
                </span>
                <h3 className="mt-2.5 font-syne text-[1.2rem] font-bold leading-tight text-[hsl(var(--foreground))]">
                  {service.title}
                </h3>
                <p className="mt-2 text-[12px] leading-6 text-[hsl(var(--text-secondary))]">
                  {getCompactSummary(service.description)}
                </p>
                <div className="mt-4 flex items-center justify-between border-t border-[color:var(--experience-surface-border)] pt-3 text-[11px] font-sans font-semibold uppercase tracking-[0.2em]">
                  <span style={{ color: 'hsl(var(--text-muted))' }}>
                    {capabilityKey === 'strategic-advisory' ? 'Advisory' : 'Engineering'}
                  </span>
                  <ArrowRight
                    className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                    style={{
                      color: capabilityKey === 'strategic-advisory' ? 'var(--capability-advisory)' : 'var(--capability-engineering)',
                    }}
                  />
                </div>
              </Link>
            ))}
          </div>

          <div
            className="relative mt-6 flex flex-col gap-3 sm:flex-row"
            style={{
              opacity: hasEntered ? 1 : 0,
              transform: hasEntered ? 'translateY(0)' : 'translateY(18px)',
              transition: `opacity ${copyTransition} 0.42s, transform ${copyTransition} 0.42s`,
            }}
          >
            <Magnetic>
              <Link
                href={config.primaryCta.href}
                className="btn-primary inline-flex items-center justify-center gap-2 rounded-full px-7 py-4 text-sm font-sans font-bold text-[#070809]"
              >
                {config.primaryCta.label}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Magnetic>

            <Link
              href={config.secondaryCta.href}
              className="premium-transition inline-flex items-center justify-center gap-2 rounded-full px-7 py-4 text-sm font-sans font-semibold"
              style={{
                border: '1px solid var(--experience-surface-border)',
                color: 'hsl(var(--text-secondary))',
                background: 'var(--experience-surface)',
              }}
            >
              {config.secondaryCta.label}
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

function CapabilityScene({
  capabilityKey,
  isDark,
  isInView,
  allowAmbientMotion,
  depthX,
  depthY,
}: {
  capabilityKey: CapabilitySectionKey
  isDark: boolean
  isInView: boolean
  allowAmbientMotion: boolean
  depthX: ReturnType<typeof useTransform>
  depthY: ReturnType<typeof useTransform>
}) {
  return capabilityKey === 'strategic-advisory'
    ? <StrategicFieldScene isDark={isDark} isInView={isInView} allowAmbientMotion={allowAmbientMotion} depthX={depthX} depthY={depthY} />
    : <EngineeringAssemblyScene isDark={isDark} isInView={isInView} allowAmbientMotion={allowAmbientMotion} depthX={depthX} depthY={depthY} />
}

function StrategicFieldScene({
  isDark,
  isInView,
  allowAmbientMotion,
  depthX,
  depthY,
}: {
  isDark: boolean
  isInView: boolean
  allowAmbientMotion: boolean
  depthX: ReturnType<typeof useTransform>
  depthY: ReturnType<typeof useTransform>
}) {
  const ringColor = isDark ? 'rgba(245,200,66,0.24)' : 'rgba(200,146,10,0.18)'
  const pathColor = isDark ? 'rgba(255,255,255,0.38)' : 'rgba(74,70,56,0.30)'
  const glowColor = isDark ? 'rgba(245,200,66,0.22)' : 'rgba(200,146,10,0.14)'

  return (
    <div className="experience-surface relative isolate mx-auto aspect-[1.7] w-full max-w-[50rem] overflow-hidden rounded-[30px] p-4 md:p-5">
      <div
        className="absolute inset-0"
        style={{
          background: isDark
            ? 'radial-gradient(circle at 50% 50%, rgba(245,200,66,0.08) 0%, rgba(0,0,0,0) 48%), linear-gradient(160deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0) 55%)'
            : 'radial-gradient(circle at 50% 50%, rgba(200,146,10,0.08) 0%, rgba(255,255,255,0) 48%), linear-gradient(160deg, rgba(255,255,255,0.58) 0%, rgba(255,255,255,0) 55%)',
        }}
      />
      <motion.div
        className="absolute inset-[10%] rounded-full"
        style={{
          x: depthX,
          y: depthY,
          background: isDark
            ? 'radial-gradient(circle at 50% 50%, rgba(245,200,66,0.08) 0%, rgba(245,200,66,0.00) 62%)'
            : 'radial-gradient(circle at 50% 50%, rgba(200,146,10,0.06) 0%, rgba(200,146,10,0.00) 62%)',
          filter: 'blur(8px)',
        }}
      />
      {[
        { top: '16%', left: '16%', size: 5 },
        { top: '22%', left: '76%', size: 4 },
        { top: '34%', left: '28%', size: 3 },
        { top: '62%', left: '74%', size: 4 },
        { top: '78%', left: '44%', size: 3 },
      ].map((point, index) => (
        <motion.div
          key={`${point.top}-${point.left}`}
          className="absolute rounded-full"
          style={{
            top: point.top,
            left: point.left,
            width: `${point.size}px`,
            height: `${point.size}px`,
            background: isDark ? 'rgba(255,255,255,0.72)' : 'rgba(74,70,56,0.42)',
            boxShadow: `0 0 12px ${glowColor}`,
          }}
          animate={isInView ? (allowAmbientMotion ? { opacity: [0.25, 0.8, 0.25] } : { opacity: 0.7 }) : { opacity: 0 }}
          transition={allowAmbientMotion ? { duration: 3 + index * 0.3, repeat: Infinity, repeatType: 'mirror' } : { duration: 0.55, delay: index * 0.05 }}
        />
      ))}

      {[0, 1, 2].map((index) => (
        <motion.div
          key={index}
          className="absolute rounded-full border"
          style={{
            borderColor: ringColor,
            inset: `${10 + index * 12}%`,
          }}
          initial={{ opacity: 0, scale: 0.92 }}
          animate={isInView ? (allowAmbientMotion ? { opacity: 1, scale: 1, rotate: index % 2 === 0 ? 360 : -360 } : { opacity: 1, scale: 1, rotate: index % 2 === 0 ? 10 : -10 }) : { opacity: 0, scale: 0.92 }}
          transition={allowAmbientMotion ? {
            opacity: { duration: 0.8, delay: index * 0.08 },
            scale: { duration: 0.8, delay: index * 0.08 },
            rotate: { duration: 30 + index * 10, ease: 'linear', repeat: Infinity },
          } : { duration: 0.8, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
        />
      ))}
      <motion.div
        className="absolute left-[18%] top-[20%] h-[58%] w-[58%] rounded-full border border-dashed"
        style={{
          borderColor: isDark ? 'rgba(255,255,255,0.10)' : 'rgba(74,70,56,0.10)',
          x: useTransform(depthX, (value) => value * 0.28),
          y: useTransform(depthY, (value) => value * 0.28),
        }}
        animate={isInView ? (allowAmbientMotion ? { rotate: 360, opacity: 1 } : { rotate: 12, opacity: 1 }) : { rotate: 0, opacity: 0 }}
        transition={allowAmbientMotion ? { rotate: { duration: 38, ease: 'linear', repeat: Infinity }, opacity: { duration: 0.8 } } : { duration: 0.8 }}
      />

      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" fill="none" aria-hidden="true">
        <motion.path
          d="M18 62C28 44 44 36 58 38C68 39 77 33 84 22"
          stroke={pathColor}
          strokeWidth="0.55"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={isInView ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        />
        <motion.path
          d="M16 30C30 36 46 49 57 64C66 76 76 78 87 70"
          stroke={pathColor}
          strokeWidth="0.55"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={isInView ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
          transition={{ duration: 1.35, delay: 0.14, ease: [0.16, 1, 0.3, 1] }}
        />
        <motion.path
          d="M25 18C40 24 55 23 70 15"
          stroke={glowColor}
          strokeWidth="1.1"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={isInView ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
          transition={{ duration: 1.1, delay: 0.24, ease: [0.16, 1, 0.3, 1] }}
        />
      </svg>
      <motion.div
        className="absolute h-4 w-4 rounded-full"
        style={{
          top: '33%',
          left: '55%',
          background: 'var(--accent-strong)',
          boxShadow: `0 0 0 10px ${glowColor}`,
          x: useTransform(depthX, (value) => value * 0.16),
          y: useTransform(depthY, (value) => value * 0.16),
        }}
        animate={isInView ? (allowAmbientMotion ? { opacity: [0.45, 1, 0.45], scale: [0.92, 1.06, 0.92] } : { opacity: 0.9, scale: 1 }) : { opacity: 0, scale: 0.8 }}
        transition={allowAmbientMotion ? { duration: 2.4, repeat: Infinity, repeatType: 'mirror' } : { duration: 0.7 }}
      />

      {[
        { top: '18%', left: '22%' },
        { top: '29%', left: '69%' },
        { top: '48%', left: '53%' },
        { top: '63%', left: '20%' },
        { top: '76%', left: '74%' },
      ].map((node, index) => (
        <motion.div
          key={`${node.top}-${node.left}`}
          className="absolute h-3 w-3 rounded-full"
          style={{
            top: node.top,
            left: node.left,
            background: 'var(--capability-advisory)',
            boxShadow: `0 0 0 6px ${glowColor}`,
          }}
          initial={{ opacity: 0, scale: 0.6 }}
          animate={isInView ? (allowAmbientMotion ? { opacity: [0.7, 1, 0.7], scale: 1 } : { opacity: 0.92, scale: 1 }) : { opacity: 0, scale: 0.6 }}
          transition={allowAmbientMotion ? {
            opacity: { duration: 2.4, delay: index * 0.1, repeat: Infinity, repeatType: 'mirror' },
            scale: { duration: 0.7, delay: index * 0.08 },
          } : { duration: 0.7, delay: index * 0.08 }}
        />
      ))}

      {[
        { label: 'Portfolio direction', top: '12%', left: '54%' },
        { label: 'Competitive position', top: '52%', left: '58%' },
        { label: 'Capital allocation', top: '70%', left: '12%' },
      ].map((tag, index) => (
        <motion.div
          key={tag.label}
          className="experience-surface absolute rounded-full px-3 py-2 text-[11px] font-sans font-medium md:px-4 md:text-xs"
          style={{
            top: tag.top,
            left: tag.left,
            color: 'hsl(var(--text-secondary))',
          }}
          initial={{ opacity: 0, y: 12 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
          transition={{ duration: 0.7, delay: 0.18 + index * 0.08, ease: [0.16, 1, 0.3, 1] }}
        >
          {tag.label}
        </motion.div>
      ))}
    </div>
  )
}

function EngineeringAssemblyScene({
  isDark,
  isInView,
  allowAmbientMotion,
  depthX,
  depthY,
}: {
  isDark: boolean
  isInView: boolean
  allowAmbientMotion: boolean
  depthX: ReturnType<typeof useTransform>
  depthY: ReturnType<typeof useTransform>
}) {
  const lineColor = isDark ? 'rgba(255,255,255,0.14)' : 'rgba(74,70,56,0.14)'
  const moduleColor = isDark ? 'rgba(255,255,255,0.06)' : 'rgba(255,255,255,0.56)'
  const highlightColor = isDark ? 'rgba(245,200,66,0.18)' : 'rgba(177,138,75,0.16)'

  return (
    <div className="experience-surface relative isolate mx-auto aspect-[1.7] w-full max-w-[50rem] overflow-hidden rounded-[30px] p-4 md:p-5">
      <div
        className="absolute inset-0"
        style={{
          background: isDark
            ? 'linear-gradient(180deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0) 42%), radial-gradient(circle at 72% 26%, rgba(245,200,66,0.10) 0%, transparent 28%)'
            : 'linear-gradient(180deg, rgba(255,255,255,0.46) 0%, rgba(255,255,255,0) 42%), radial-gradient(circle at 72% 26%, rgba(177,138,75,0.10) 0%, transparent 28%)',
        }}
      />
      <motion.div
        className="absolute inset-[14%] rounded-[26px]"
        style={{
          x: useTransform(depthX, (value) => value * 0.24),
          y: useTransform(depthY, (value) => value * 0.24),
          background: isDark
            ? 'linear-gradient(145deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0) 56%)'
            : 'linear-gradient(145deg, rgba(255,255,255,0.42) 0%, rgba(255,255,255,0) 56%)',
          border: `1px solid ${lineColor}`,
        }}
      />
      <motion.div
        className="absolute left-[12%] top-[18%] h-[64%] w-[64%] rounded-[24px] border border-dashed"
        style={{
          borderColor: lineColor,
          x: useTransform(depthX, (value) => value * -0.18),
          y: useTransform(depthY, (value) => value * -0.18),
        }}
        animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.96 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      />

      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" fill="none" aria-hidden="true">
        {[
          'M18 26H82',
          'M18 50H82',
          'M18 74H82',
          'M26 18V82',
          'M50 18V82',
          'M74 18V82',
        ].map((path, index) => (
          <motion.path
            key={path}
            d={path}
            stroke={lineColor}
            strokeWidth="0.6"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={isInView ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
            transition={{ duration: 0.9, delay: 0.08 + index * 0.06, ease: [0.16, 1, 0.3, 1] }}
          />
        ))}
        <motion.path
          d="M16 16L84 84"
          stroke={lineColor}
          strokeWidth="0.38"
          strokeDasharray="2 3"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={isInView ? { pathLength: 1, opacity: 0.6 } : { pathLength: 0, opacity: 0 }}
          transition={{ duration: 1.2, delay: 0.28, ease: [0.16, 1, 0.3, 1] }}
        />
        <motion.path
          d="M84 16L16 84"
          stroke={lineColor}
          strokeWidth="0.38"
          strokeDasharray="2 3"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={isInView ? { pathLength: 1, opacity: 0.52 } : { pathLength: 0, opacity: 0 }}
          transition={{ duration: 1.2, delay: 0.34, ease: [0.16, 1, 0.3, 1] }}
        />
      </svg>
      <motion.div
        className="absolute left-[10%] top-[46%] h-[2px] w-[36%] rounded-full"
        style={{
          background: isDark
            ? 'linear-gradient(90deg, rgba(245,200,66,0) 0%, rgba(245,200,66,0.55) 50%, rgba(245,200,66,0) 100%)'
            : 'linear-gradient(90deg, rgba(177,138,75,0) 0%, rgba(177,138,75,0.42) 50%, rgba(177,138,75,0) 100%)',
          x: useTransform(depthX, (value) => value * 0.22),
        }}
        animate={isInView ? (allowAmbientMotion ? { x: ['-10%', '90%', '-10%'], opacity: [0, 1, 0] } : { x: '46%', opacity: 0.5 }) : { opacity: 0 }}
        transition={allowAmbientMotion ? { duration: 4.2, repeat: Infinity, ease: 'easeInOut' } : { duration: 0.75 }}
      />

      {[
        { top: '16%', left: '16%', delay: 0.1 },
        { top: '16%', left: '44%', delay: 0.18 },
        { top: '16%', left: '60%', delay: 0.26 },
        { top: '42%', left: '24%', delay: 0.14 },
        { top: '42%', left: '52%', delay: 0.22 },
        { top: '58%', left: '64%', delay: 0.3 },
        { top: '68%', left: '22%', delay: 0.36 },
      ].map((module, index) => (
        <motion.div
          key={`${module.top}-${module.left}`}
          className="absolute rounded-[18px] border"
          style={{
            top: module.top,
            left: module.left,
            width: index % 3 === 0 ? '30%' : index % 2 === 0 ? '24%' : '18%',
            height: index % 3 === 0 ? '16%' : '14%',
            borderColor: lineColor,
            background: moduleColor,
            boxShadow: `inset 0 1px 0 rgba(255,255,255,0.08), 0 0 0 1px ${highlightColor}`,
          }}
          initial={{ opacity: 0, x: index % 2 === 0 ? 18 : -18, y: 14 }}
          animate={isInView ? { opacity: 1, x: 0, y: 0 } : { opacity: 0, x: index % 2 === 0 ? 18 : -18, y: 14 }}
          transition={{ duration: 0.85, delay: module.delay, ease: [0.16, 1, 0.3, 1] }}
        />
      ))}

      {[
        { top: '24%', left: '30%' },
        { top: '36%', left: '56%' },
        { top: '55%', left: '42%' },
        { top: '72%', left: '58%' },
      ].map((joint, index) => (
        <motion.div
          key={`${joint.top}-${joint.left}`}
          className="absolute h-2.5 w-2.5 rounded-full"
          style={{
            top: joint.top,
            left: joint.left,
            background: 'var(--capability-engineering)',
            boxShadow: `0 0 0 8px ${highlightColor}`,
          }}
          initial={{ opacity: 0, scale: 0.6 }}
          animate={isInView ? (allowAmbientMotion ? { opacity: [0.55, 1, 0.55], scale: 1 } : { opacity: 0.92, scale: 1 }) : { opacity: 0, scale: 0.6 }}
          transition={allowAmbientMotion ? {
            opacity: { duration: 2.1, delay: index * 0.12, repeat: Infinity, repeatType: 'mirror' },
            scale: { duration: 0.6, delay: index * 0.1 },
          } : { duration: 0.65, delay: index * 0.08 }}
        />
      ))}

      {[
        { label: 'Integration layer', top: '12%', left: '57%' },
        { label: 'Platform core', top: '48%', left: '5%' },
        { label: 'Automation fabric', top: '77%', left: '45%' },
      ].map((tag, index) => (
        <motion.div
          key={tag.label}
          className="experience-surface absolute rounded-full px-3 py-2 text-[11px] font-sans font-medium md:px-4 md:text-xs"
          style={{
            top: tag.top,
            left: tag.left,
            color: 'hsl(var(--text-secondary))',
          }}
          initial={{ opacity: 0, y: 12 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
          transition={{ duration: 0.7, delay: 0.2 + index * 0.08, ease: [0.16, 1, 0.3, 1] }}
        >
          {tag.label}
        </motion.div>
      ))}
    </div>
  )
}