'use client'

import { AnimatePresence, motion } from 'framer-motion'
import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function MobileCTA() {
  const [visible, setVisible] = useState(false)
  const [contactVisible, setContactVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > window.innerHeight)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const contactEl = document.getElementById('contact')
    if (!contactEl) return
    const observer = new IntersectionObserver(
      ([entry]) => setContactVisible(entry.isIntersecting),
      { threshold: 0.15 }
    )
    observer.observe(contactEl)
    return () => observer.disconnect()
  }, [])

  return (
    <AnimatePresence>
      {visible && !contactVisible && (
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 20, opacity: 0 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="fixed bottom-5 right-5 z-40 safe-bottom"
        >
          <Link
            href="/contact"
            className="inline-flex items-center bg-accent-light/80 backdrop-blur-sm text-text-primary font-sans font-semibold px-5 py-2.5 rounded-full text-xs shadow-md hover:bg-accent-light transition-colors"
          >
            Let&apos;s talk &rarr;
          </Link>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
