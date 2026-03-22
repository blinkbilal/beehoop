'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { useTheme } from 'next-themes'
import dynamic from 'next/dynamic'
import { clientTypes } from '@/lib/data'

const AboutCanvas = dynamic(() => import('@/components/ui/AboutCanvas'), { ssr: false })

// ── Three convictions — each maps to a canvas stream discipline ──────────────
//   01 → Strategy     amber   rgb(200,146,10)
//   02 → Intelligence sapphire rgb(59,130,246)
//   03 → Engineering  emerald  rgb(16,185,129)
interface Belief {
  num: string
  label: string
  text: string
  hex: string   // stream accent colour
  rgb: string   // 'R,G,B' for rgba()
  Sketch: (props: { col: string }) => React.ReactElement
}

const BELIEFS: Belief[] = [
  {
    num: '01', label: 'Strategy → Execution',
    text: 'The gap between strategy and execution is where most transformations die. We close it.',
    hex: '#C8920A', rgb: '200,146,10',
    Sketch: ({ col }) => (
      <motion.svg viewBox="0 0 80 40" className="w-full h-full" aria-hidden="true"
        initial="hidden" whileInView="visible" viewport={{ once: true }}>
        <motion.circle cx="10" cy="20" r="4" fill="none" stroke={col} strokeWidth="1.2"
          variants={{ hidden:{opacity:0,scale:0}, visible:{opacity:0.7,scale:1,transition:{delay:0.2,duration:0.4}} }}/>
        <motion.path d="M14 20 Q40 8 66 20" fill="none" stroke={col} strokeWidth="0.9" strokeDasharray="3 2"
          variants={{ hidden:{pathLength:0,opacity:0}, visible:{pathLength:1,opacity:0.55,transition:{delay:0.4,duration:0.9,type:'spring',bounce:0}} }}/>
        <motion.circle cx="70" cy="20" r="5.5" fill={col}
          variants={{ hidden:{opacity:0,scale:0}, visible:{opacity:0.82,scale:1,transition:{delay:1.0,duration:0.35}} }}/>
        <motion.path d="M67 17 L70 20 L67 23" fill="none" stroke={col} strokeWidth="1.2"
          variants={{ hidden:{pathLength:0,opacity:0}, visible:{pathLength:1,opacity:1,transition:{delay:1.1,duration:0.3}} }}/>
      </motion.svg>
    ),
  },
  {
    num: '02', label: 'Compounding Intelligence',
    text: 'Every intelligence system we build compounds over time — returning sharper insight as your market evolves.',
    hex: '#3B82F6', rgb: '59,130,246',
    Sketch: ({ col }) => (
      <motion.svg viewBox="0 0 80 40" className="w-full h-full" aria-hidden="true"
        initial="hidden" whileInView="visible" viewport={{ once: true }}>
        {([8, 20, 32] as const).map((cy, i) => (
          <motion.g key={cy}>
            <motion.circle cx="10" cy={cy} r="3" fill="none" stroke={col} strokeWidth="1"
              variants={{ hidden:{opacity:0}, visible:{opacity:0.65,transition:{delay:0.15*i,duration:0.3}} }}/>
            <motion.path d={`M13 ${cy} Q42 ${cy} 58 20`} fill="none" stroke={col} strokeWidth="0.8" strokeDasharray="2.5 2"
              variants={{ hidden:{pathLength:0,opacity:0}, visible:{pathLength:1,opacity:0.48,transition:{delay:0.2+i*0.15,duration:0.7,type:'spring',bounce:0}} }}/>
          </motion.g>
        ))}
        <motion.circle cx="62" cy="20" r="6" fill={col}
          variants={{ hidden:{opacity:0,scale:0}, visible:{opacity:0.88,scale:1,transition:{delay:0.8,duration:0.4}} }}/>
        <motion.circle cx="62" cy="20" r="11" fill="none" stroke={col} strokeWidth="0.7"
          variants={{ hidden:{opacity:0,scale:0.4}, visible:{opacity:0.28,scale:1,transition:{delay:1.1,duration:0.6}} }}/>
        <motion.path d="M68 20 L75 20" fill="none" stroke={col} strokeWidth="1"
          variants={{ hidden:{pathLength:0,opacity:0}, visible:{pathLength:1,opacity:0.65,transition:{delay:1.2,duration:0.3}} }}/>
      </motion.svg>
    ),
  },
  {
    num: '03', label: 'No Translation Loss',
    text: 'The same judgment that shaped your strategy shapes the engineering. No handoffs. No translation loss.',
    hex: '#10B981', rgb: '16,185,129',
    Sketch: ({ col }) => (
      <motion.svg viewBox="0 0 80 40" className="w-full h-full" aria-hidden="true"
        initial="hidden" whileInView="visible" viewport={{ once: true }}>
        <motion.path d="M5 12 Q30 12 55 20" fill="none" stroke={col} strokeWidth="0.9" strokeDasharray="3 2"
          variants={{ hidden:{pathLength:0,opacity:0}, visible:{pathLength:1,opacity:0.55,transition:{delay:0.2,duration:0.7,type:'spring',bounce:0}} }}/>
        <motion.path d="M5 28 Q30 28 55 20" fill="none" stroke={col} strokeWidth="0.9" strokeDasharray="3 2"
          variants={{ hidden:{pathLength:0,opacity:0}, visible:{pathLength:1,opacity:0.55,transition:{delay:0.35,duration:0.7,type:'spring',bounce:0}} }}/>
        <motion.circle cx="5" cy="12" r="2.5" fill="none" stroke={col} strokeWidth="1"
          variants={{ hidden:{opacity:0}, visible:{opacity:0.6,transition:{delay:0.1,duration:0.3}} }}/>
        <motion.circle cx="5" cy="28" r="2.5" fill="none" stroke={col} strokeWidth="1"
          variants={{ hidden:{opacity:0}, visible:{opacity:0.6,transition:{delay:0.1,duration:0.3}} }}/>
        <motion.circle cx="58" cy="20" r="5.5" fill={col}
          variants={{ hidden:{opacity:0,scale:0}, visible:{opacity:0.85,scale:1,transition:{delay:0.9,duration:0.4}} }}/>
        <motion.path d="M64 20 L74 20" fill="none" stroke={col} strokeWidth="1.2"
          variants={{ hidden:{pathLength:0,opacity:0}, visible:{pathLength:1,opacity:0.8,transition:{delay:1.1,duration:0.3}} }}/>
        <motion.path d="M71 17 L74 20 L71 23" fill="none" stroke={col} strokeWidth="1.2"
          variants={{ hidden:{pathLength:0,opacity:0}, visible:{pathLength:1,opacity:0.8,transition:{delay:1.3,duration:0.25}} }}/>
      </motion.svg>
    ),
  },
]

const EASE = [0.16, 1, 0.3, 1] as const

export default function About() {
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  useEffect(() => { setMounted(true) }, [])

  const isDark = !mounted || resolvedTheme === 'dark'
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-8%' })

  const BG           = isDark ? '#0C0A08' : '#FFFDF8'
  const ACCENT       = '#C8920A'
  const H_COLOR      = isDark ? '#FFFFFF' : '#1A0E04'
  const P_COLOR      = isDark ? '#8A9AB0' : '#5C4E36'
  const LBL_COLOR    = isDark ? 'rgba(200,146,10,0.72)' : 'rgba(200,146,10,0.88)'
  const DIVIDER      = isDark ? 'rgba(255,255,255,0.07)' : 'rgba(200,146,10,0.14)'
  const CLIENT_COLOR = isDark ? '#6B7E96' : '#7A6248'
  // Vignette centred at 60% so both the card zone (left) and nucleus zone (right) breathe
  const VIGN         = isDark
    ? 'radial-gradient(ellipse 92% 74% at 60% 50%, transparent 28%, rgba(12,10,8,0.90) 100%)'
    : 'radial-gradient(ellipse 92% 74% at 60% 50%, transparent 30%, rgba(255,253,248,0.92) 100%)'

  const glassPanelStyle = {
    background: isDark
      ? 'linear-gradient(140deg, rgba(7,7,7,0.78) 0%, rgba(19,19,19,0.62) 58%, rgba(35,35,35,0.48) 100%)'
      : 'linear-gradient(140deg, rgba(255,255,255,0.76) 0%, rgba(252,250,243,0.70) 58%, rgba(237,231,212,0.60) 100%)',
    border: `1px solid ${isDark ? 'rgba(255,255,255,0.10)' : 'rgba(0,0,0,0.09)'}`,
    boxShadow: isDark
      ? '0 40px 100px rgba(0,0,0,0.72), inset 0 1px 0 rgba(255,255,255,0.10)'
      : '0 32px 80px rgba(0,0,0,0.12), inset 0 1px 0 rgba(255,255,255,0.92)',
    backdropFilter: 'blur(28px) saturate(160%)',
    WebkitBackdropFilter: 'blur(28px) saturate(160%)',
  } as const

  return (
    <section
      id="about"
      ref={sectionRef}
      aria-label="About beehoop"
      className="relative overflow-hidden noise-overlay"
      style={{ backgroundColor: BG }}
    >
      {/* ── Canvas — full section background ── */}
      <div className="absolute inset-0" aria-hidden="true">
        <AboutCanvas />
      </div>

      {/* ── Vignette — open ellipse at 60% keeps card zone (left) + nucleus (right) bright ── */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true"
        style={{ background: VIGN, zIndex: 1 }} />

      {/* ── Layout: glass card LEFT | right nucleus spacer RIGHT ── */}
      <div className="relative py-20 md:py-28" style={{ zIndex: 2 }}>
        <div className="max-w-screen-xl mx-auto px-6 md:px-10 lg:px-16">

          {/*
            Two-column grid on desktop:
            Left 72%  — glass manifesto card; streams originate from far left of canvas
            Right 28% — transparent spacer; beehoop nucleus + logo visible here
          */}
          <div className="grid grid-cols-1 lg:grid-cols-[72fr_28fr]">

            {/* ── Glass card ── */}
            <motion.div
              initial={{ opacity: 0, y: 32 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.9, ease: EASE }}
              className="relative rounded-[28px] overflow-hidden p-8 md:p-10 lg:p-12"
              style={glassPanelStyle}
            >
              {/* Inner glare highlight — top-left corner, identical to Hero */}
              <div className="absolute inset-0 pointer-events-none" aria-hidden="true"
                style={{
                  background: isDark
                    ? 'radial-gradient(140% 100% at 0% 0%, rgba(255,255,255,0.06) 0%, transparent 55%)'
                    : 'radial-gradient(140% 100% at 0% 0%, rgba(255,255,255,0.65) 0%, transparent 60%)',
                }} />

              {/* Amber accent rail across top of card */}
              <div className="absolute top-0 left-12 right-12 h-px" aria-hidden="true"
                style={{ background: `linear-gradient(90deg, transparent, ${ACCENT}55, transparent)` }} />

              {/* ── Header ── */}
              <div className="relative mb-8 md:mb-10">
                <motion.p
                  className="font-mono text-[10px] uppercase tracking-[0.3em] mb-5"
                  style={{ color: LBL_COLOR }}
                  initial={{ opacity: 0, y: 12 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, ease: EASE, delay: 0.10 }}
                >
                  About beehoop
                </motion.p>

                <motion.h2
                  className="font-syne font-bold leading-[1.06] mb-5"
                  style={{ fontSize: 'clamp(2.4rem, 4.5vw, 4.5rem)', color: H_COLOR }}
                  initial={{ opacity: 0, y: 24 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.85, ease: EASE, delay: 0.18 }}
                >
                  One firm carries{' '}
                  <em className="not-italic" style={{
                    color: ACCENT,
                    textShadow: isDark ? '0 0 40px rgba(200,146,10,0.45)' : 'none',
                  }}>the full</em>
                  {' '}distance.
                </motion.h2>

                <motion.p
                  className="font-sans leading-[1.75]"
                  style={{ fontSize: 'clamp(0.95rem, 1.25vw, 1.1rem)', color: P_COLOR, maxWidth: '58ch' }}
                  initial={{ opacity: 0, y: 16 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.75, ease: EASE, delay: 0.30 }}
                >
                  beehoop operates at the exact intersection where boardroom thinking
                  becomes operational reality — where a financial model becomes a data
                  pipeline, where a market insight becomes a product. We are the only
                  firm built to navigate the full distance.
                </motion.p>
              </div>

              <div className="mb-8" aria-hidden="true"
                style={{ height: '1px', background: DIVIDER }} />

              {/* ── Three stream-coloured conviction cards ── */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
                {BELIEFS.map((b, i) => {
                  const cardBorder = isDark ? `rgba(${b.rgb},0.24)` : `rgba(${b.rgb},0.32)`
                  const cardBg     = isDark ? `rgba(${b.rgb},0.06)` : `rgba(${b.rgb},0.05)`
                  const numColor   = isDark ? `rgba(${b.rgb},0.65)` : `rgba(${b.rgb},0.80)`
                  const labelColor = isDark ? 'rgba(255,255,255,0.48)' : 'rgba(26,14,4,0.48)'
                  return (
                    <motion.div
                      key={b.num}
                      className="relative flex flex-col gap-3 p-5 rounded-2xl"
                      style={{ background: cardBg, border: `1px solid ${cardBorder}` }}
                      initial={{ opacity: 0, y: 20 }}
                      animate={isInView ? { opacity: 1, y: 0 } : {}}
                      transition={{ duration: 0.65, ease: EASE, delay: 0.44 + i * 0.14 }}
                    >
                      {/* Stream-coloured node sketch */}
                      <div className="w-full" style={{ height: '40px', color: b.hex }}>
                        <b.Sketch col={b.hex} />
                      </div>

                      {/* Number · rule · label */}
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-[9px] tracking-[0.25em] flex-shrink-0"
                          style={{ color: numColor }}>{b.num}</span>
                        <span aria-hidden="true" style={{
                          display: 'inline-block', width: '10px', height: '1px',
                          background: b.hex, opacity: 0.45,
                        }} />
                        <span className="font-mono text-[9px] uppercase tracking-[0.14em]"
                          style={{ color: labelColor }}>{b.label}</span>
                      </div>

                      <p className="font-sans text-[13px] leading-[1.7]" style={{ color: P_COLOR }}>
                        {b.text}
                      </p>

                      {/* Stream-coloured bottom accent hairline */}
                      <div className="absolute bottom-0 left-4 right-4 h-px rounded-full" aria-hidden="true"
                        style={{ background: `linear-gradient(90deg, transparent, ${b.hex}45, transparent)` }} />
                    </motion.div>
                  )
                })}
              </div>

              {/* ── We work with ── */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.6, ease: EASE, delay: 0.88 }}
                className="pt-7"
                style={{ borderTop: `1px solid ${DIVIDER}` }}
              >
                <p className="font-mono text-[10px] uppercase tracking-[0.25em] mb-5"
                  style={{ color: LBL_COLOR }}>We work with</p>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-5 gap-y-3">
                  {clientTypes.map((type, i) => (
                    <motion.div key={type} className="flex items-center gap-2"
                      initial={{ opacity: 0, y: 6 }}
                      animate={isInView ? { opacity: 1, y: 0 } : {}}
                      transition={{ duration: 0.45, ease: EASE, delay: 0.94 + i * 0.04 }}
                    >
                      <span aria-hidden="true" style={{
                        display: 'inline-block', width: '4px', height: '4px',
                        borderRadius: '50%', backgroundColor: ACCENT, flexShrink: 0,
                        animation: `amber-dot-pulse 3.2s ease-in-out ${i * 0.14}s infinite`,
                      }} />
                      <span className="font-sans text-xs font-medium" style={{ color: CLIENT_COLOR }}>
                        {type}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

            </motion.div>

            {/* Right spacer — nucleus / logo zone, canvas renders behind this */}
            <div className="hidden lg:block" aria-hidden="true" />

          </div>
        </div>
      </div>
    </section>
  )
}
