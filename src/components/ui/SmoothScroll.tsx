'use client'

import { useEffect } from 'react'

export default function SmoothScroll({
  children,
}: {
  children: React.ReactNode
}) {
  useEffect(() => {
    // Native anchor smooth scroll
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const anchor = target.closest('a[href^="#"]')
      if (anchor) {
        const href = anchor.getAttribute('href')
        if (href && href !== '#') {
          const el = document.querySelector(href)
          if (el) {
            e.preventDefault()
            el.scrollIntoView({ behavior: 'smooth', block: 'start' })
          }
        }
      }
    }
    document.addEventListener('click', handleClick)
    return () => document.removeEventListener('click', handleClick)
  }, [])

  return <>{children}</>
}
