'use client'

import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import Image from 'next/image'

const heroVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.15,
      duration: 0.5,
      ease: [0.25, 0.1, 0.25, 1],
    },
  }),
}

export default function Hero() {
  return (
    <section className="bg-background-hero min-h-[90vh] flex items-center">
      <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-20 py-24 md:py-32 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left column */}
          <div>
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
              className="text-xs font-sans font-semibold uppercase tracking-widest text-accent mb-6"
            >
              Strategy &amp; Financial &amp; Branding Advisory
            </motion.p>

            <motion.h1
              custom={2}
              initial="hidden"
              animate="visible"
              variants={heroVariants}
              className="font-serif text-5xl md:text-6xl lg:text-7xl text-text-primary leading-tight"
            >
              We help organisations
              <br />
              make <em className="italic">better decisions</em>,
              <br />
              faster.
            </motion.h1>

            <motion.p
              custom={3}
              initial="hidden"
              animate="visible"
              variants={heroVariants}
              className="font-sans text-lg text-text-secondary max-w-md mt-6"
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
              <a
                href="#contact"
                className="bg-accent-light text-text-primary font-sans font-semibold px-7 py-4 rounded-full hover:bg-accent-hover transition-all text-sm"
              >
                Start a conversation
              </a>
              <a
                href="#cases"
                className="font-sans text-sm font-medium text-text-primary flex items-center gap-2 hover:gap-3 transition-all"
              >
                See our work
                <ArrowRight className="w-4 h-4" />
              </a>
            </motion.div>
          </div>

          {/* Right column — SVG illustration */}
          <motion.div
            custom={2}
            initial="hidden"
            animate="visible"
            variants={heroVariants}
            className="hidden lg:flex justify-center items-center"
          >
            <svg
              viewBox="0 0 520 480"
              width="100%"
              style={{ maxWidth: 520 }}
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-label="Abstract strategic network diagram"
              role="img"
            >
              {/* Hexagonal nodes connected in a network pattern */}
              {/* Central hexagon — amber filled */}
              <polygon
                points="260,200 290,217 290,251 260,268 230,251 230,217"
                fill="#F5C842"
                stroke="#0A0A0A"
                strokeWidth="1.5"
              />

              {/* Top hexagon */}
              <polygon
                points="260,100 290,117 290,151 260,168 230,151 230,117"
                fill="none"
                stroke="#0A0A0A"
                strokeWidth="1.5"
              />

              {/* Top-right hexagon */}
              <polygon
                points="370,150 400,167 400,201 370,218 340,201 340,167"
                fill="none"
                stroke="#0A0A0A"
                strokeWidth="1.5"
              />

              {/* Top-left hexagon */}
              <polygon
                points="150,150 180,167 180,201 150,218 120,201 120,167"
                fill="none"
                stroke="#0A0A0A"
                strokeWidth="1.5"
              />

              {/* Bottom-right hexagon */}
              <polygon
                points="370,280 400,297 400,331 370,348 340,331 340,297"
                fill="none"
                stroke="#0A0A0A"
                strokeWidth="1.5"
              />

              {/* Bottom-left hexagon */}
              <polygon
                points="150,280 180,297 180,331 150,348 120,331 120,297"
                fill="none"
                stroke="#0A0A0A"
                strokeWidth="1.5"
              />

              {/* Bottom hexagon */}
              <polygon
                points="260,330 290,347 290,381 260,398 230,381 230,347"
                fill="none"
                stroke="#0A0A0A"
                strokeWidth="1.5"
              />

              {/* Far top-right */}
              <polygon
                points="440,80 462,93 462,119 440,132 418,119 418,93"
                fill="none"
                stroke="#0A0A0A"
                strokeWidth="1"
                opacity="0.4"
              />

              {/* Far top-left */}
              <polygon
                points="80,80 102,93 102,119 80,132 58,119 58,93"
                fill="none"
                stroke="#0A0A0A"
                strokeWidth="1"
                opacity="0.4"
              />

              {/* Connecting lines — central to surrounding */}
              <line x1="260" y1="200" x2="260" y2="168" stroke="#0A0A0A" strokeWidth="1.5" />
              <line x1="260" y1="268" x2="260" y2="330" stroke="#0A0A0A" strokeWidth="1.5" />
              <line x1="230" y1="217" x2="180" y2="184" stroke="#0A0A0A" strokeWidth="1.5" />
              <line x1="290" y1="217" x2="340" y2="184" stroke="#0A0A0A" strokeWidth="1.5" />
              <line x1="230" y1="251" x2="180" y2="297" stroke="#0A0A0A" strokeWidth="1.5" />
              <line x1="290" y1="251" x2="340" y2="297" stroke="#0A0A0A" strokeWidth="1.5" />

              {/* Outer connections */}
              <line x1="290" y1="117" x2="340" y2="167" stroke="#0A0A0A" strokeWidth="1" opacity="0.5" />
              <line x1="230" y1="117" x2="180" y2="167" stroke="#0A0A0A" strokeWidth="1" opacity="0.5" />
              <line x1="400" y1="167" x2="418" y2="119" stroke="#0A0A0A" strokeWidth="1" opacity="0.3" />
              <line x1="120" y1="167" x2="102" y2="119" stroke="#0A0A0A" strokeWidth="1" opacity="0.3" />
              <line x1="150" y1="218" x2="150" y2="280" stroke="#0A0A0A" strokeWidth="1" opacity="0.5" />
              <line x1="370" y1="218" x2="370" y2="280" stroke="#0A0A0A" strokeWidth="1" opacity="0.5" />
              <line x1="180" y1="331" x2="230" y2="347" stroke="#0A0A0A" strokeWidth="1" opacity="0.5" />
              <line x1="340" y1="331" x2="290" y2="347" stroke="#0A0A0A" strokeWidth="1" opacity="0.5" />

              {/* Small accent dots at intersections */}
              <circle cx="260" cy="134" r="3" fill="#0A0A0A" />
              <circle cx="260" cy="300" r="3" fill="#0A0A0A" />
              <circle cx="205" cy="200" r="3" fill="#0A0A0A" />
              <circle cx="315" cy="200" r="3" fill="#0A0A0A" />
              <circle cx="205" cy="274" r="3" fill="#0A0A0A" />
              <circle cx="315" cy="274" r="3" fill="#0A0A0A" />

              {/* Subtle decorative arcs */}
              <path
                d="M 150 348 Q 200 420 260 398"
                fill="none"
                stroke="#0A0A0A"
                strokeWidth="1"
                opacity="0.25"
                strokeDasharray="4 4"
              />
              <path
                d="M 370 348 Q 320 420 260 398"
                fill="none"
                stroke="#0A0A0A"
                strokeWidth="1"
                opacity="0.25"
                strokeDasharray="4 4"
              />
              <path
                d="M 80 132 Q 80 184 120 201"
                fill="none"
                stroke="#0A0A0A"
                strokeWidth="1"
                opacity="0.2"
                strokeDasharray="4 4"
              />
              <path
                d="M 440 132 Q 440 184 400 201"
                fill="none"
                stroke="#0A0A0A"
                strokeWidth="1"
                opacity="0.2"
                strokeDasharray="4 4"
              />
            </svg>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
