'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight, ChevronDown } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useRef } from 'react'

const heroVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.15,
      duration: 0.6,
      ease: [0.25, 0.1, 0.25, 1],
    },
  }),
}

export default function Hero() {
  const sectionRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  })
  const illustrationY = useTransform(scrollYProgress, [0, 1], [0, -80])
  const textY = useTransform(scrollYProgress, [0, 1], [0, -30])

  return (
    <section ref={sectionRef} className="gradient-hero-subtle noise-overlay min-h-[100dvh] flex items-center relative overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10 lg:px-20 py-16 md:py-24 lg:py-32 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left column */}
          <motion.div style={{ y: textY }}>
            <motion.div
              custom={0}
              initial="hidden"
              animate="visible"
              variants={heroVariants}
              className="mb-6"
            >
              <Image
                src="/logo.png"
                alt="beehoop mark"
                width={48}
                height={48}
                style={{ height: '48px', width: 'auto' }}
                priority
              />
            </motion.div>

            <motion.p
              custom={1}
              initial="hidden"
              animate="visible"
              variants={heroVariants}
              className="text-xs font-sans font-semibold uppercase tracking-label text-accent mb-6"
            >
              Strategy &amp; Financial &amp; Branding Advisory
            </motion.p>

            <motion.h1
              custom={2}
              initial="hidden"
              animate="visible"
              variants={heroVariants}
              className="font-syne text-4xl md:text-6xl lg:text-7xl xl:text-[5.5rem] text-text-primary leading-[1.05] tracking-heading font-bold"
            >
              We help organisations
              <br />
              make <em className="italic font-serif">better decisions</em>,
              <br />
              faster.
            </motion.h1>

            <motion.p
              custom={3}
              initial="hidden"
              animate="visible"
              variants={heroVariants}
              className="font-sans text-base md:text-md text-text-secondary max-w-md mt-6 leading-relaxed"
            >
              beehoop is a strategy, financial, and branding advisory firm — combining advanced planning, rigorous analysis, and proven execution expertise to help organisations achieve lasting impact.
            </motion.p>

            <motion.div
              custom={4}
              initial="hidden"
              animate="visible"
              variants={heroVariants}
              className="mt-10 flex flex-col sm:flex-row items-start sm:items-center gap-6"
            >
              <Link
                href="/contact"
                className="bg-accent-light text-text-primary font-sans font-semibold px-8 py-4 rounded-full hover:bg-accent-hover hover:scale-[1.02] hover:shadow-lg transition-all duration-300 text-sm"
              >
                Start a conversation
              </Link>
              <Link
                href="/cases"
                className="font-sans text-sm font-medium text-text-primary flex items-center gap-2 hover:gap-3 transition-all group"
              >
                See our work
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </motion.div>

          {/* Right column — Animated SVG illustration */}
          <motion.div
            style={{ y: illustrationY }}
            custom={2}
            initial="hidden"
            animate="visible"
            variants={heroVariants}
            className="flex justify-center items-center w-full max-w-[300px] mx-auto lg:max-w-none"
          >
            <svg
              viewBox="0 0 520 480"
              width="100%"
              style={{ maxWidth: 520 }}
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-label="Abstract strategic network diagram"
              role="img"
              className="sketch-wobble"
            >
              {/* Connecting lines — animated sketch paths */}
              <line x1="260" y1="200" x2="260" y2="168" stroke="#0A0A0A" strokeWidth="1.5" className="sketch-path" style={{ animationDelay: '0.3s' }} />
              <line x1="260" y1="268" x2="260" y2="330" stroke="#0A0A0A" strokeWidth="1.5" className="sketch-path" style={{ animationDelay: '0.5s' }} />
              <line x1="230" y1="217" x2="180" y2="184" stroke="#0A0A0A" strokeWidth="1.5" className="sketch-path" style={{ animationDelay: '0.4s' }} />
              <line x1="290" y1="217" x2="340" y2="184" stroke="#0A0A0A" strokeWidth="1.5" className="sketch-path" style={{ animationDelay: '0.6s' }} />
              <line x1="230" y1="251" x2="180" y2="297" stroke="#0A0A0A" strokeWidth="1.5" className="sketch-path" style={{ animationDelay: '0.7s' }} />
              <line x1="290" y1="251" x2="340" y2="297" stroke="#0A0A0A" strokeWidth="1.5" className="sketch-path" style={{ animationDelay: '0.8s' }} />

              {/* Outer connections */}
              <line x1="290" y1="117" x2="340" y2="167" stroke="#0A0A0A" strokeWidth="1" opacity="0.5" className="sketch-path" style={{ animationDelay: '1s' }} />
              <line x1="230" y1="117" x2="180" y2="167" stroke="#0A0A0A" strokeWidth="1" opacity="0.5" className="sketch-path" style={{ animationDelay: '1.1s' }} />
              <line x1="400" y1="167" x2="418" y2="119" stroke="#0A0A0A" strokeWidth="1" opacity="0.3" className="sketch-path" style={{ animationDelay: '1.2s' }} />
              <line x1="120" y1="167" x2="102" y2="119" stroke="#0A0A0A" strokeWidth="1" opacity="0.3" className="sketch-path" style={{ animationDelay: '1.3s' }} />
              <line x1="150" y1="218" x2="150" y2="280" stroke="#0A0A0A" strokeWidth="1" opacity="0.5" className="sketch-path" style={{ animationDelay: '1.4s' }} />
              <line x1="370" y1="218" x2="370" y2="280" stroke="#0A0A0A" strokeWidth="1" opacity="0.5" className="sketch-path" style={{ animationDelay: '1.5s' }} />
              <line x1="180" y1="331" x2="230" y2="347" stroke="#0A0A0A" strokeWidth="1" opacity="0.5" className="sketch-path" style={{ animationDelay: '1.6s' }} />
              <line x1="340" y1="331" x2="290" y2="347" stroke="#0A0A0A" strokeWidth="1" opacity="0.5" className="sketch-path" style={{ animationDelay: '1.7s' }} />

              {/* Central hexagon — amber filled with wipe */}
              <motion.polygon
                points="260,200 290,217 290,251 260,268 230,251 230,217"
                fill="#F5C842"
                stroke="#0A0A0A"
                strokeWidth="1.5"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.6, ease: 'easeOut' }}
                style={{ transformOrigin: '260px 234px' }}
              />

              {/* Surrounding hexagons */}
              {[
                '260,100 290,117 290,151 260,168 230,151 230,117',
                '370,150 400,167 400,201 370,218 340,201 340,167',
                '150,150 180,167 180,201 150,218 120,201 120,167',
                '370,280 400,297 400,331 370,348 340,331 340,297',
                '150,280 180,297 180,331 150,348 120,331 120,297',
                '260,330 290,347 290,381 260,398 230,381 230,347',
              ].map((pts, i) => (
                <motion.polygon
                  key={i}
                  points={pts}
                  fill="none"
                  stroke="#0A0A0A"
                  strokeWidth="1.5"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 1, delay: 0.8 + i * 0.15, ease: 'easeInOut' }}
                />
              ))}

              {/* Far hexagons */}
              <motion.polygon
                points="440,80 462,93 462,119 440,132 418,119 418,93"
                fill="none"
                stroke="#0A0A0A"
                strokeWidth="1"
                opacity="0.4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.4 }}
                transition={{ duration: 0.8, delay: 1.8 }}
              />
              <motion.polygon
                points="80,80 102,93 102,119 80,132 58,119 58,93"
                fill="none"
                stroke="#0A0A0A"
                strokeWidth="1"
                opacity="0.4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.4 }}
                transition={{ duration: 0.8, delay: 2 }}
              />

              {/* Accent dots */}
              {[
                [260, 134], [260, 300], [205, 200],
                [315, 200], [205, 274], [315, 274],
              ].map(([cx, cy], i) => (
                <motion.circle
                  key={i}
                  cx={cx}
                  cy={cy}
                  r="3"
                  fill="#0A0A0A"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.3, delay: 1.5 + i * 0.1 }}
                />
              ))}

              {/* Decorative arcs */}
              <path d="M 150 348 Q 200 420 260 398" fill="none" stroke="#0A0A0A" strokeWidth="1" opacity="0.25" strokeDasharray="4 4" className="sketch-path" style={{ animationDelay: '2s' }} />
              <path d="M 370 348 Q 320 420 260 398" fill="none" stroke="#0A0A0A" strokeWidth="1" opacity="0.25" strokeDasharray="4 4" className="sketch-path" style={{ animationDelay: '2.1s' }} />
            </svg>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <ChevronDown className="w-5 h-5 text-text-muted animate-bounce-gentle" />
      </motion.div>
    </section>
  )
}
