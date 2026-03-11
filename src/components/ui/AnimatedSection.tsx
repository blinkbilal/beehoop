'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

type Direction = 'up' | 'down' | 'left' | 'right' | 'scale'

interface AnimatedSectionProps {
  children: React.ReactNode
  className?: string
  delay?: number
  direction?: Direction
  stagger?: boolean
}

const directionMap: Record<Direction, { opacity: number; x?: number; y?: number; scale?: number }> = {
  up: { opacity: 0, y: 32 },
  down: { opacity: 0, y: -32 },
  left: { opacity: 0, x: -40 },
  right: { opacity: 0, x: 40 },
  scale: { opacity: 0, scale: 0.95 },
}

export default function AnimatedSection({
  children,
  className,
  delay = 0,
  direction = 'up',
  stagger = false,
}: AnimatedSectionProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  const initial = directionMap[direction]
  const animate = isInView
    ? { opacity: 1, x: 0, y: 0, scale: 1 }
    : initial

  return (
    <motion.div
      ref={ref}
      initial={initial}
      animate={animate}
      transition={{
        duration: 0.6,
        delay,
        ease: [0.25, 0.1, 0.25, 1],
        ...(stagger ? { staggerChildren: 0.1 } : {}),
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
