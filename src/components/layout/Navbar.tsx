'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Compass, GitMerge, Palette, BarChart2, Mail } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const navLinks = [
  { label: 'About', href: '/about' },
  { label: 'Services', href: '/services', hasDropdown: true },
  { label: 'Case Studies', href: '/cases' },
  { label: 'Insights', href: '/insights' },
  { label: 'Contact', href: '/contact' },
]

const serviceDropdown = [
  { icon: Compass, title: 'Strategy Development', desc: 'Comprehensive strategic planning', href: '/services/strategy-development' },
  { icon: GitMerge, title: 'M&A & Transactions', desc: 'End-to-end deal advisory', href: '/services/mergers-and-acquisitions' },
  { icon: Palette, title: 'Brand & Market Strategy', desc: 'Brand positioning & growth', href: '/services/brand-and-market-strategy' },
  { icon: BarChart2, title: 'Financial & Data Analytics', desc: 'Data-driven insights', href: '/services/financial-and-data-analytics' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [showDropdown, setShowDropdown] = useState(false)
  const dropdownTimeout = useRef<NodeJS.Timeout | null>(null)
  const hamburgerRef = useRef<HTMLButtonElement>(null)
  const firstLinkRef = useRef<HTMLAnchorElement>(null)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden'
      // Focus the first menu link when opened
      setTimeout(() => firstLinkRef.current?.focus(), 300)
    } else {
      document.body.style.overflow = ''
      // Return focus to hamburger when closed
      hamburgerRef.current?.focus()
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileOpen])

  // Close mobile menu on scroll
  useEffect(() => {
    if (!mobileOpen) return
    const handleScroll = () => setMobileOpen(false)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [mobileOpen])

  const handleDropdownEnter = () => {
    if (dropdownTimeout.current) clearTimeout(dropdownTimeout.current)
    setShowDropdown(true)
  }

  const handleDropdownLeave = () => {
    dropdownTimeout.current = setTimeout(() => setShowDropdown(false), 200)
  }

  return (
    <nav
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/90 backdrop-blur-md shadow-[0_1px_3px_rgba(0,0,0,0.06)]'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-20 flex items-center justify-between h-16 md:h-20">
        {/* Brand */}
        <Link href="/" className="z-50 relative flex items-center" aria-label="beehoop home">
          <Image
            src="/logo-with-name.png"
            alt="beehoop"
            width={180}
            height={50}
            priority
            style={{ height: 'auto', width: '160px' }}
          />
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <div
              key={link.href}
              className="relative"
              onMouseEnter={link.hasDropdown ? handleDropdownEnter : undefined}
              onMouseLeave={link.hasDropdown ? handleDropdownLeave : undefined}
            >
              <Link
                href={link.href}
                className={`nav-link font-sans text-sm font-medium transition-colors duration-300 ${
                  pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href))
                    ? 'text-accent'
                    : 'text-text-secondary hover:text-text-primary'
                }`}
              >
                {link.label}
              </Link>

              {/* Service dropdown */}
              {link.hasDropdown && (
                <AnimatePresence>
                  {showDropdown && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full left-0 mt-3 w-80 bg-white rounded-2xl shadow-lg border border-border-subtle p-4"
                    >
                      {serviceDropdown.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          className="flex items-start gap-3 p-3 rounded-xl hover:bg-background-card transition-colors group"
                        >
                          <div className="w-10 h-10 rounded-lg bg-accent-pale flex items-center justify-center flex-shrink-0 group-hover:bg-accent-light transition-colors">
                            <item.icon className="w-4 h-4 text-accent" />
                          </div>
                          <div>
                            <p className="font-sans text-sm font-semibold text-text-primary">{item.title}</p>
                            <p className="font-sans text-xs text-text-muted mt-0.5">{item.desc}</p>
                          </div>
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              )}
            </div>
          ))}
        </div>

        {/* Desktop CTA */}
        <Link
          href="/contact"
          className="hidden md:inline-flex border border-text-primary text-text-primary hover:bg-accent-light hover:border-accent-light hover:shadow-[0_0_20px_rgba(245,200,66,0.3)] px-5 py-2 rounded-full text-sm font-sans font-semibold transition-all duration-300"
        >
          Let&apos;s talk &rarr;
        </Link>

        {/* Mobile hamburger */}
        <button
          ref={hamburgerRef}
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden z-50 relative p-2"
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
        >
          <AnimatePresence mode="wait">
            {mobileOpen ? (
              <motion.div
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <X className="w-6 h-6 text-text-primary" />
              </motion.div>
            ) : (
              <motion.div
                key="menu"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <Menu className="w-6 h-6 text-text-primary" />
              </motion.div>
            )}
          </AnimatePresence>
        </button>
      </div>

      {/* Mobile overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="fixed inset-0 z-40 bg-white flex flex-col items-center justify-center gap-8 md:hidden"
          >
            {/* Background bee watermark */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none" aria-hidden="true">
              <Image
                src="/logo.png"
                alt=""
                width={300}
                height={300}
                style={{ opacity: 0.07, width: '300px', height: 'auto' }}
              />
            </div>

            {navLinks.map((link, i) => (
              <motion.div
                key={link.href}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.05, duration: 0.3 }}
              >
                <Link
                  href={link.href}
                  ref={i === 0 ? firstLinkRef : undefined}
                  onClick={() => setMobileOpen(false)}
                  className={`font-syne text-2xl font-bold transition-colors ${
                    pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href))
                      ? 'text-accent'
                      : 'text-text-primary hover:text-accent'
                  }`}
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + navLinks.length * 0.05, duration: 0.3 }}
              className="flex flex-col items-center gap-4"
            >
              <a
                href="mailto:hello@beehoop.com"
                className="flex items-center gap-2 font-sans text-sm text-text-muted hover:text-accent transition-colors"
              >
                <Mail className="w-4 h-4" />
                hello@beehoop.com
              </a>
              <Link
                href="/contact"
                onClick={() => setMobileOpen(false)}
                className="mt-4 bg-accent-light text-text-primary px-7 py-4 rounded-full text-sm font-sans font-semibold hover:bg-accent-hover transition-all"
              >
                Let&apos;s talk &rarr;
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
