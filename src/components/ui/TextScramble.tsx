'use client'

import { useEffect, useRef, useState } from 'react'

const CHARS = '0123456789ABCDEFabcdef!@#$%&∑∆∂λ'

interface TextScrambleProps {
  text: string
  className?: string
  trigger?: boolean
  duration?: number
}

export function TextScramble({ text, className = '', trigger = true, duration = 1200 }: TextScrambleProps) {
  const [display, setDisplay] = useState(text)
  const hasRun = useRef(false)
  const rafRef = useRef<number | null>(null)

  useEffect(() => {
    if (!trigger || hasRun.current) return
    hasRun.current = true
    const start = performance.now()
    const chars = text.split('')

    const frame = (now: number) => {
      const elapsed = now - start
      const progress = Math.min(elapsed / duration, 1)
      // Ease-out curve for more satisfying reveal
      const eased = 1 - Math.pow(1 - progress, 3)
      const revealCount = Math.floor(eased * chars.length)

      const scrambled = chars.map((ch, i) => {
        if (i < revealCount) return ch
        // Keep non-alphanumeric chars (like %, +, .) stable
        if (/[^a-zA-Z0-9]/.test(ch)) return ch
        return CHARS[Math.floor(Math.random() * CHARS.length)]
      })

      setDisplay(scrambled.join(''))

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(frame)
      }
    }

    rafRef.current = requestAnimationFrame(frame)
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [text, trigger, duration])

  return <span className={className}>{display}</span>
}
