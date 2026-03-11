'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'

export default function MobileCTA() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > window.innerHeight)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-white/90 backdrop-blur-md border-t border-border-subtle px-4 py-3 safe-bottom"
        >
          <Link
            href="/contact"
            className="block w-full text-center bg-accent-light text-text-primary font-sans font-semibold px-6 py-3.5 rounded-full text-sm hover:bg-accent-hover transition-colors"
          >
            Start a conversation &rarr;
          </Link>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
