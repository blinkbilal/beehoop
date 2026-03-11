'use client'

import { useEffect, useRef } from 'react'
import { useAnimationFrame } from 'framer-motion'
import Lenis from '@studio-freight/lenis'

export default function SmoothScroll({
  children,
}: {
  children: React.ReactNode
}) {
  const lenisRef = useRef<Lenis | null>(null)

  useEffect(() => {
    // Skip Lenis on mobile for better performance
    if (typeof window !== 'undefined' && window.innerWidth < 768) return

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    })
    lenisRef.current = lenis

    // Support anchor clicks with smooth scroll
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const anchor = target.closest('a[href^="#"]')
      if (anchor) {
        const href = anchor.getAttribute('href')
        if (href && href !== '#') {
          const el = document.querySelector(href)
          if (el) {
            e.preventDefault()
            lenis.scrollTo(el as HTMLElement, { offset: -80 })
          }
        }
      }
    }
    document.addEventListener('click', handleClick)

    return () => {
      lenis.destroy()
      lenisRef.current = null
      document.removeEventListener('click', handleClick)
    }
  }, [])

  // Use Framer Motion's RAF to avoid competing loops
  useAnimationFrame((time) => {
    lenisRef.current?.raf(time)
  })

  return <>{children}</>
}
