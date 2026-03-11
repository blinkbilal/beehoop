'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ArrowUp, Linkedin, Twitter } from 'lucide-react'

const serviceLinks = [
  { label: 'Strategy Development', href: '/services/strategy-development' },
  { label: 'M&A & Transactions', href: '/services/mergers-and-acquisitions' },
  { label: 'Brand Strategy', href: '/services/brand-and-market-strategy' },
  { label: 'Analytics', href: '/services/financial-and-data-analytics' },
]

const companyLinks = [
  { label: 'About', href: '/about' },
  { label: 'Case Studies', href: '/cases' },
  { label: 'Insights', href: '/insights' },
  { label: 'Contact', href: '/contact' },
]

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="gradient-dark-navy relative">
      {/* Decorative top border */}
      <div className="h-px w-full gradient-warm-gold opacity-30" />

      <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-20 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* Brand column */}
          <div>
            <Image
              src="/name-colored.png"
              alt="beehoop"
              width={130}
              height={36}
              style={{ height: 'auto', width: '110px' }}
            />
            <p className="font-sans text-sm text-gray-400 mt-4 max-w-xs leading-relaxed">
              Strategy, Financial, and Branding Advisory — combining advanced planning, rigorous analysis, and proven execution expertise.
            </p>
            <div className="mt-6 space-y-2">
              <a href="mailto:hello@beehoop.com" className="font-sans text-sm text-gray-300 hover:text-accent-light transition-colors block">
                hello@beehoop.com
              </a>
            </div>
          </div>

          {/* Services column */}
          <div>
            <h4 className="font-syne text-sm font-bold text-white mb-4">Services</h4>
            <ul className="space-y-2.5">
              {serviceLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="font-sans text-sm text-gray-400 hover:text-accent-light hover:underline transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company column */}
          <div>
            <h4 className="font-syne text-sm font-bold text-white mb-4">Company</h4>
            <ul className="space-y-2.5">
              {companyLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="font-sans text-sm text-gray-400 hover:text-accent-light hover:underline transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social & back to top column */}
          <div>
            <h4 className="font-syne text-sm font-bold text-white mb-4">Follow Us</h4>
            <div className="flex gap-3">
              <a
                href="https://linkedin.com/company/beehoop"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-gray-700 flex items-center justify-center text-gray-400 hover:text-accent-light hover:border-accent-light transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="https://x.com/beehoop"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-gray-700 flex items-center justify-center text-gray-400 hover:text-accent-light hover:border-accent-light transition-colors"
                aria-label="X (Twitter)"
              >
                <Twitter className="w-4 h-4" />
              </a>
            </div>

            {/* Back to top */}
            <button
              onClick={scrollToTop}
              className="mt-8 w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center text-accent-light hover:bg-accent/40 transition-colors"
              aria-label="Back to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-4">
            <span className="font-sans text-xs text-gray-500">
              &copy; {new Date().getFullYear()} beehoop. All rights reserved.
            </span>
            <span className="inline-flex items-center gap-1.5 bg-accent/10 border border-accent/20 rounded-full px-3 py-1">
              <span className="w-1.5 h-1.5 rounded-full bg-accent-light" />
              <span className="font-sans text-[10px] text-accent-light font-medium">Trusted Advisory</span>
            </span>
          </div>
          <div className="flex gap-6">
            <a href="/privacy" className="font-sans text-xs text-gray-500 hover:text-gray-300 hover:underline transition-colors">Privacy</a>
            <a href="/terms" className="font-sans text-xs text-gray-500 hover:text-gray-300 hover:underline transition-colors">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
