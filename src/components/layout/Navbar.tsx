'use client'

import { ThemeToggle } from '@/components/ui/ThemeToggle'
import { AnimatePresence, motion } from 'framer-motion'
import { BarChart2, Code2, Compass, Cpu, Database, GitMerge, Globe, LayoutDashboard, Mail, Menu, Palette, TrendingUp, X } from 'lucide-react'
import { useTheme } from 'next-themes'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'

const navLinks = [
  { label: 'About', href: '/about' },
  { label: 'Services', href: '/services', hasDropdown: true },
  { label: 'Case Studies', href: '/cases' },
  { label: 'Insights', href: '/insights' },
  { label: 'Contact', href: '/contact' },
]

const megaMenuColumns = [
  {
    heading: 'Strategic Advisory',
    services: [
      { icon: Compass, title: 'Strategy Development', href: '/services/strategy-development' },
      { icon: GitMerge, title: 'M&A & Transactions', href: '/services/mergers-and-acquisitions' },
      { icon: Palette, title: 'Brand & Market Strategy', href: '/services/brand-and-market-strategy' },
      { icon: BarChart2, title: 'Financial & Data Analytics', href: '/services/financial-and-data-analytics' },
    ],
  },
  {
    heading: 'Data & Intelligence',
    services: [
      { icon: Database, title: 'Data Architecture & Pipelines', href: '/services/data-architecture-pipelines' },
      { icon: TrendingUp, title: 'Business Intelligence', href: '/services/business-intelligence' },
      { icon: LayoutDashboard, title: 'Executive Dashboards', href: '/services/executive-dashboards' },
    ],
  },
  {
    heading: 'Digital Engineering',
    services: [
      { icon: Code2, title: 'Custom Software', href: '/services/custom-software-development' },
      { icon: Globe, title: 'Web & Applications', href: '/services/web-development' },
      { icon: Cpu, title: 'System Integration', href: '/services/system-integration' },
    ],
  },
]

// Monochromatic accent system — obsidian / graphite / amber only. NO blue or emerald.
const columnAccents = [
  { bg: 'rgba(200,146,10,0.10)', border: 'rgba(200,146,10,0.18)', dot: '#F5C842', labelDark: '#F5C842', labelLight: '#C8920A', iconDark: '#C8920A', iconLight: '#a16207', hoverDark: 'rgba(200,146,10,0.07)', hoverLight: 'rgba(200,146,10,0.05)' },
  { bg: 'rgba(45,45,45,0.10)', border: 'rgba(45,45,45,0.15)', dot: '#888888', labelDark: 'rgba(255,255,255,0.55)', labelLight: '#555555', iconDark: '#999999', iconLight: '#555555', hoverDark: 'rgba(255,255,255,0.04)', hoverLight: 'rgba(0,0,0,0.03)' },
  { bg: 'rgba(45,45,45,0.08)', border: 'rgba(45,45,45,0.12)', dot: '#666666', labelDark: 'rgba(255,255,255,0.45)', labelLight: '#444444', iconDark: '#888888', iconLight: '#444444', hoverDark: 'rgba(255,255,255,0.04)', hoverLight: 'rgba(0,0,0,0.03)' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [showDropdown, setShowDropdown] = useState(false)
  const dropdownTimeout = useRef<NodeJS.Timeout | null>(null)
  const desktopNavRef = useRef<HTMLDivElement>(null)
  const dropdownPanelRef = useRef<HTMLDivElement>(null)
  const servicesTriggerRef = useRef<HTMLButtonElement>(null)
  const hamburgerRef = useRef<HTMLButtonElement>(null)
  const firstLinkRef = useRef<HTMLAnchorElement>(null)
  const pathname = usePathname()
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)
  useEffect(() => { setMounted(true) }, [])
  // Default isDark=true before mount to avoid a flash of light-mode glass on dark sites
  const isDark = !mounted || theme === 'dark'

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

  useEffect(() => {
    const handlePointerDown = (event: MouseEvent) => {
      if (!showDropdown) return
      const target = event.target as Node
      if (
        dropdownPanelRef.current?.contains(target) ||
        servicesTriggerRef.current?.contains(target)
      ) return
      setShowDropdown(false)
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return
      setShowDropdown(false)
      servicesTriggerRef.current?.focus()
    }

    document.addEventListener('mousedown', handlePointerDown)
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('mousedown', handlePointerDown)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [showDropdown])

  // Rich glass style system shared with Hero panel language.
  const glassBase = isDark
    ? 'linear-gradient(140deg, rgba(7,7,7,0.78) 0%, rgba(19,19,19,0.66) 60%, rgba(35,35,35,0.50) 100%)'
    : 'linear-gradient(140deg, rgba(255,255,255,0.80) 0%, rgba(252,250,243,0.74) 60%, rgba(237,231,212,0.64) 100%)'
  const glassBorder = isDark
    ? 'rgba(255,255,255,0.14)'
    : 'rgba(0,0,0,0.12)'
  const glassShadow = isDark
    ? `0 ${scrolled ? 20 : 12}px ${scrolled ? 60 : 40}px rgba(0,0,0,${scrolled ? 0.84 : 0.70}), inset 0 1px 0 rgba(255,255,255,0.12)`
    : `0 ${scrolled ? 16 : 10}px ${scrolled ? 46 : 30}px rgba(0,0,0,${scrolled ? 0.20 : 0.14}), inset 0 1px 0 rgba(255,255,255,0.94)`
  const pillStyle = {
    background: glassBase,
    backdropFilter: 'blur(26px) saturate(155%)',
    WebkitBackdropFilter: 'blur(26px) saturate(155%)',
    border: `1px solid ${glassBorder}`,
    boxShadow: glassShadow,
  }
  // Nav link classes — adaptive for dark / light glass surface
  const lkBase = 'nav-link relative inline-flex items-center px-[18px] h-[42px] rounded-[11px] font-sans text-[14px] font-medium tracking-[-0.01em] transition-all duration-200 whitespace-nowrap'
  const lkActive  = `${lkBase} ${isDark ? 'text-[#F5C842] bg-white/[0.09]' : 'text-[#111111] bg-black/[0.05]'}`
  const lkIdle    = `${lkBase} ${isDark ? 'text-white/65 hover:text-white/95 hover:bg-white/[0.06]' : 'text-[#111111]/70 hover:text-[#111111] hover:bg-black/[0.04]'}`

  return (
    // Outer shell spans full viewport width; pointer-events-none so clicks
    // pass through to the canvas in all empty areas outside the pills.
    <nav
      className="fixed top-0 left-0 right-0 z-50 pointer-events-none"
      style={{ height: '96px' }}
    >
      {/* ── Brand logo — detached, floating top-left ───────────────── */}
      <Link
        href="/"
        className="pointer-events-auto absolute left-8 md:left-12 top-1/2 -translate-y-1/2 flex items-center"
        aria-label="beehoop home"
      >
        <Image
          src={`${process.env.NEXT_PUBLIC_BASE_PATH ?? ''}/logo-with-name.png`}
          alt="beehoop"
          width={180}
          height={50}
          priority
          style={{ height: 'auto', width: '164px' }}
        />
      </Link>

      {/* ── Desktop: centred nav-links pill ─── */}
      <div ref={desktopNavRef} className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 hidden md:block pointer-events-auto">
        <div
          className="flex items-center gap-1 px-4 h-[72px] rounded-[22px] transition-[background,box-shadow] duration-300"
          style={pillStyle}
        >
          {navLinks.map((link) => (
            <div
              key={link.href}
              className="relative"
              style={{ overflow: 'visible' }}
              onMouseEnter={link.hasDropdown ? handleDropdownEnter : undefined}
              onMouseLeave={link.hasDropdown ? handleDropdownLeave : undefined}
            >
              {link.hasDropdown ? (
                <button
                  ref={servicesTriggerRef}
                  type="button"
                  className={showDropdown ? lkActive : lkIdle}
                  aria-expanded={showDropdown}
                  aria-haspopup="menu"
                  aria-controls="services-mega-menu"
                  onClick={() => setShowDropdown(v => !v)}
                  onFocus={handleDropdownEnter}
                >
                  {link.label}
                  {showDropdown ? (
                    <span
                      className="absolute left-1/2 -translate-x-1/2 bottom-[6px] w-[18px] h-[1.5px] rounded-full"
                      style={{
                        background: isDark
                          ? 'linear-gradient(90deg, rgba(245,200,66,0.35) 0%, rgba(245,200,66,0.95) 50%, rgba(245,200,66,0.35) 100%)'
                          : 'linear-gradient(90deg, rgba(200,146,10,0.30) 0%, rgba(200,146,10,0.95) 50%, rgba(200,146,10,0.30) 100%)',
                      }}
                    />
                  ) : null}
                </button>
              ) : (
                <Link
                  href={link.href}
                  className={
                    pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href))
                      ? lkActive
                      : lkIdle
                  }
                >
                  {link.label}
                  {pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href)) ? (
                    <span
                      className="absolute left-1/2 -translate-x-1/2 bottom-[6px] w-[18px] h-[1.5px] rounded-full"
                      style={{
                        background: isDark
                          ? 'linear-gradient(90deg, rgba(245,200,66,0.35) 0%, rgba(245,200,66,0.95) 50%, rgba(245,200,66,0.35) 100%)'
                          : 'linear-gradient(90deg, rgba(200,146,10,0.30) 0%, rgba(200,146,10,0.95) 50%, rgba(200,146,10,0.30) 100%)',
                      }}
                    />
                  ) : null}
                </Link>
              )}

              {/* Services mega-menu — full-width spatial overlay with atmospheric glassmorphism */}
              {link.hasDropdown && (
                <div
                  ref={dropdownPanelRef}
                  id="services-mega-menu"
                  role="menu"
                  style={{
                    position: 'absolute',
                    top: '100%',
                    left: '50%',
                    width: '96vw',
                    maxWidth: '1320px',
                    zIndex: 49,
                    overflow: 'hidden',
                    borderRadius: '24px',
                    background: isDark
                      ? 'linear-gradient(140deg, rgba(7,7,7,0.78) 0%, rgba(19,19,19,0.66) 60%, rgba(35,35,35,0.50) 100%)'
                      : 'linear-gradient(140deg, rgba(255,255,255,0.80) 0%, rgba(252,250,243,0.74) 60%, rgba(237,231,212,0.64) 100%)',
                    backdropFilter: 'blur(30px) saturate(160%)',
                    WebkitBackdropFilter: 'blur(30px) saturate(160%)',
                    border: `1px solid ${isDark ? 'rgba(255,255,255,0.14)' : 'rgba(0,0,0,0.12)'}`,
                    boxShadow: isDark
                      ? '0 40px 110px rgba(0,0,0,0.88), inset 0 1px 0 rgba(255,255,255,0.12)'
                      : '0 28px 80px rgba(0,0,0,0.14), inset 0 1px 0 rgba(255,255,255,0.94)',
                    opacity: showDropdown ? 1 : 0,
                    transform: showDropdown ? 'translateX(-50%) translateY(8px) scale(1)' : 'translateX(-50%) translateY(-12px) scale(0.985)',
                    pointerEvents: showDropdown ? 'all' : 'none',
                    transition: 'opacity 0.55s cubic-bezier(0.16, 1, 0.3, 1), transform 0.55s cubic-bezier(0.16, 1, 0.3, 1)',
                  }}
                >
                  <div style={{ padding: '4rem clamp(2rem, 5vw, 5rem)' }}>
                    <p
                      className="font-sans text-[11px] font-bold uppercase tracking-[0.3em] mb-12"
                      style={{ color: isDark ? 'rgba(255,255,255,0.26)' : 'rgba(0,0,0,0.32)', letterSpacing: '0.30em' }}
                    >
                      Our Services
                    </p>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '3rem' }}>
                      {megaMenuColumns.map((col, colIdx) => {
                        const acc = columnAccents[colIdx]
                        return (
                          <div key={col.heading}>
                            <div
                              className="flex items-center gap-2.5 mb-6 px-3 py-2.5 rounded-[10px]"
                              style={{ background: acc.bg, border: `1px solid ${acc.border}` }}
                            >
                              <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: acc.dot }} />
                              <p
                                className="font-sans text-[10px] font-bold uppercase tracking-[0.22em]"
                                style={{ color: isDark ? acc.labelDark : acc.labelLight, letterSpacing: '0.22em' }}
                              >
                                {col.heading}
                              </p>
                            </div>
                            <div className="space-y-0.5">
                              {col.services.map((item) => (
                                <div key={item.href}>
                                  <Link
                                    href={item.href}
                                    onClick={() => setShowDropdown(false)}
                                    className="group/item flex items-center gap-3.5 px-3 py-3.5 rounded-[12px] transition-all duration-200"
                                    onMouseEnter={e => (e.currentTarget.style.background = isDark ? acc.hoverDark : acc.hoverLight)}
                                    onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                                  >
                                    <div
                                      className="w-9 h-9 rounded-[10px] flex items-center justify-center flex-shrink-0"
                                      style={{ background: isDark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.03)', border: `1px solid ${isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'}` }}
                                    >
                                      <item.icon className="w-4 h-4" style={{ color: isDark ? acc.iconDark : acc.iconLight }} />
                                    </div>
                                    <p
                                      className="font-sans text-[0.92rem] leading-[1.35] font-medium transition-colors duration-150"
                                      style={{ color: isDark ? 'rgba(255,255,255,0.74)' : 'rgba(0,0,0,0.72)' }}
                                    >
                                      {item.title}
                                    </p>
                                  </Link>
                                </div>
                              ))}
                            </div>
                          </div>
                        )
                      })}
                    </div>
                    <div
                      className="mt-14 pt-7 flex items-center justify-between"
                      style={{ borderTop: `1px solid ${isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.05)'}` }}
                    >
                      <p className="font-sans text-[12px]" style={{ color: isDark ? 'rgba(255,255,255,0.22)' : 'rgba(0,0,0,0.35)' }}>
                        End-to-end strategic &amp; engineering partnership
                      </p>
                      <Link
                        href="/services"
                        onClick={() => setShowDropdown(false)}
                        className="inline-flex items-center gap-1.5 font-sans text-[12px] font-semibold transition-opacity hover:opacity-80"
                        style={{ color: isDark ? '#F5C842' : '#C8920A' }}
                      >
                        View all services <span className="text-[10px]">→</span>
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* ── Desktop: right cluster — CTA pill + theme toggle ─── */}
      <div className="pointer-events-auto absolute right-8 md:right-12 top-1/2 -translate-y-1/2 hidden md:flex items-center gap-3">
        {/* "Let's talk" CTA */}
        <Link
          href="/contact"
          className="inline-flex items-center gap-2 h-[46px] px-5 rounded-[14px] font-sans text-[13px] font-semibold transition-all duration-200 hover:opacity-90 active:scale-95"
          style={{
            background: isDark
              ? 'linear-gradient(140deg, rgba(7,7,7,0.80) 0%, rgba(19,19,19,0.68) 60%, rgba(35,35,35,0.52) 100%)'
              : 'linear-gradient(140deg, rgba(255,255,255,0.82) 0%, rgba(252,250,243,0.76) 60%, rgba(237,231,212,0.66) 100%)',
            border: `1px solid ${isDark ? 'rgba(255,255,255,0.14)' : 'rgba(0,0,0,0.12)'}`,
            color: isDark ? '#F5C842' : '#C8920A',
            backdropFilter: 'blur(26px) saturate(155%)',
            WebkitBackdropFilter: 'blur(26px) saturate(155%)',
            boxShadow: isDark
              ? '0 14px 34px rgba(0,0,0,0.54), inset 0 1px 0 rgba(255,255,255,0.12)'
              : '0 10px 26px rgba(0,0,0,0.14), inset 0 1px 0 rgba(255,255,255,0.94)',
          }}
        >
          Let&apos;s talk
          <span className="text-[11px] opacity-60">→</span>
        </Link>
        {/* Theme toggle glass capsule */}
        <div
          className="flex items-center justify-center w-[52px] h-[52px] rounded-[16px] transition-[background,box-shadow] duration-300"
          style={pillStyle}
        >
          <ThemeToggle />
        </div>
      </div>

      {/* ── Mobile right controls ─────────────────────────────────── */}
      <div className="absolute right-4 top-1/2 -translate-y-1/2 flex md:hidden items-center gap-1 pointer-events-auto">
        <ThemeToggle />
        <button
          ref={hamburgerRef}
          onClick={() => setMobileOpen(!mobileOpen)}
          className="p-2"
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
            className="fixed inset-0 z-40 bg-background flex flex-col items-center justify-center gap-8 md:hidden"
          >
            {/* Background bee watermark */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none" aria-hidden="true">
              <Image
                src={`${process.env.NEXT_PUBLIC_BASE_PATH ?? ''}/logo.png`}
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
                  className={`font-syne text-3xl font-bold transition-colors ${pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href))
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
                className="mt-4 bg-accent-light text-[#090a0c] px-7 py-4 rounded-full text-sm font-sans font-semibold hover:bg-accent-hover transition-all"
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
