'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import AnimatedSection from '@/components/ui/AnimatedSection'
import { testimonials } from '@/lib/data'

function getInitials(name: string) {
  return name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()
}

export default function Testimonials() {
  const [current, setCurrent] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { amount: 0.3 })

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % testimonials.length)
  }, [])

  const prev = () => {
    setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  useEffect(() => {
    if (isPaused || !isInView) return
    const timer = setInterval(next, 6000)
    return () => clearInterval(timer)
  }, [isPaused, isInView, next])

  return (
    <section ref={sectionRef} className="bg-background-cream py-24 md:py-32">
      <div className="max-w-4xl mx-auto px-6 md:px-10 lg:px-20">
        <AnimatedSection className="text-center">
          <p className="text-xs font-sans font-semibold uppercase tracking-label text-accent mb-4">
            Testimonials
          </p>
          <h2 className="font-syne text-lg md:text-xl font-bold text-text-primary tracking-heading">
            What our clients say
          </h2>
        </AnimatedSection>

        <div
          className="relative mt-16"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Large decorative quote marks */}
          <span className="absolute -top-8 left-0 md:-left-8 font-syne text-[120px] leading-none text-accent-pale select-none pointer-events-none" aria-hidden="true">
            &ldquo;
          </span>

          <div className="relative min-h-[200px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, x: 40, scale: 0.98 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: -40, scale: 0.98 }}
                transition={{ duration: 0.4, ease: 'easeInOut' }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.2}
                onDragEnd={(_e, info) => {
                  if (info.offset.x < -50) next()
                  else if (info.offset.x > 50) prev()
                }}
                className="text-center cursor-grab active:cursor-grabbing"
              >
                <p className="font-syne text-xl md:text-2xl text-text-primary italic leading-relaxed font-medium">
                  &ldquo;{testimonials[current].quote}&rdquo;
                </p>
                <div className="mt-8 flex flex-col items-center gap-3">
                  {/* Initials avatar */}
                  <div className="w-12 h-12 rounded-full bg-accent-pale flex items-center justify-center">
                    <span className="font-syne text-sm font-bold text-accent">
                      {getInitials(testimonials[current].name)}
                    </span>
                  </div>
                  <div>
                    <p className="font-sans text-sm font-bold text-text-primary">
                      {testimonials[current].name}
                    </p>
                    <p className="font-sans text-xs text-text-muted mt-0.5">
                      {testimonials[current].title}
                    </p>
                    <p className="font-sans text-xs text-accent mt-0.5">
                      {testimonials[current].company}
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-6 mt-10">
            <button
              onClick={prev}
              className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:border-accent hover:text-accent transition-colors"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    i === current ? 'bg-accent w-6' : 'bg-border'
                  }`}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>

            <button
              onClick={next}
              className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:border-accent hover:text-accent transition-colors"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
