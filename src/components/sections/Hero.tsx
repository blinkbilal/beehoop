'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight, ChevronDown } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useRef } from 'react'
import { SketchNetwork } from '@/components/ui/SketchIllustrations'

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
  const illustrationY = useTransform(scrollYProgress, [0, 1], [0, -40])
  const textY = useTransform(scrollYProgress, [0, 1], [0, -15])
  const scrollIndicatorOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0])

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
                src={`${process.env.NEXT_PUBLIC_BASE_PATH}/logo.png`}
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
              Your Strategic Partner
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

          {/* Right column — Animated sketch illustration */}
          <motion.div
            style={{ y: illustrationY }}
            custom={2}
            initial="hidden"
            animate="visible"
            variants={heroVariants}
            className="hidden lg:flex justify-center items-center w-full max-w-[480px] mx-auto animate-float"
          >
            <SketchNetwork className="w-full" />
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator — fades on scroll */}
      <motion.div
        style={{ opacity: scrollIndicatorOpacity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <ChevronDown className="w-5 h-5 text-text-muted animate-bounce-gentle" />
      </motion.div>
    </section>
  )
}
