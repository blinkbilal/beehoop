import { ArrowRight, Home } from 'lucide-react'
import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Page Not Found | beehoop',
  description: 'The page you are looking for does not exist.',
  robots: { index: false, follow: false },
}

export default function NotFound() {
  return (
    <main className="min-h-screen bg-background noise-overlay flex items-center justify-center px-6 relative overflow-hidden">
      {/* Decorative background element */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none" aria-hidden="true">
        <span className="font-syne text-[20rem] md:text-[30rem] font-bold text-foreground/[0.02] leading-none">
          404
        </span>
      </div>

      <div className="relative z-10 max-w-xl text-center">
        <p className="font-mono text-[10px] font-bold uppercase tracking-[0.3em] text-accent mb-6">
          Error 404 — Page Not Found
        </p>
        <h1 className="font-syne text-5xl md:text-7xl lg:text-8xl font-bold text-foreground mb-4 leading-none">
          Lost in<br />the data.
        </h1>
        <p className="font-sans text-base text-muted-foreground leading-relaxed mt-6 mb-10 max-w-md mx-auto">
          The page you&apos;re looking for doesn&apos;t exist — or may have been moved.
          Let&apos;s get you back on track.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="btn-primary text-[#090a0c] px-7 py-4 rounded-full text-sm font-sans font-bold inline-flex items-center justify-center gap-2"
          >
            <Home className="w-4 h-4" />
            Back to home
          </Link>
          <Link
            href="/services"
            className="border border-border text-muted-foreground px-7 py-4 rounded-full text-sm font-sans font-semibold hover:border-accent hover:text-foreground transition-colors duration-300 inline-flex items-center justify-center gap-2"
          >
            Our services
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </main>
  )
}
