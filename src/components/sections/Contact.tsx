'use client'

import Image from 'next/image'
import AnimatedSection from '@/components/ui/AnimatedSection'

export default function Contact() {
  return (
    <section id="contact" className="bg-background-dark relative overflow-hidden">
      {/* Bee watermark — decorative, non-interactive */}
      <div
        className="absolute right-[-4rem] top-1/2 -translate-y-1/2 w-[420px] h-[420px] pointer-events-none select-none"
        aria-hidden="true"
      >
        <Image
          src="/logo.png"
          alt=""
          fill
          style={{ objectFit: 'contain', opacity: 0.06 }}
        />
      </div>

      <div className="relative z-10 flex flex-col items-center text-center py-24 md:py-32 px-6">
        <AnimatedSection>
          <p className="text-xs font-sans font-semibold uppercase tracking-widest text-accent-light mb-4">
            Get In Touch
          </p>
          <h2 className="font-serif text-5xl md:text-6xl text-white italic leading-tight mt-4">
            Ready to think
            <br />
            differently?
          </h2>
          <p className="font-sans text-base text-gray-400 mt-6 max-w-md mx-auto">
            We partner with a select number of clients at any one time. If your
            timing is right, we&apos;d like to hear from you.
          </p>
          <div className="mt-10">
            <a
              href="mailto:hello@beehoop.com"
              className="inline-block bg-accent-light text-text-primary font-sans font-semibold px-8 py-4 rounded-full hover:bg-accent-hover transition-all text-sm"
            >
              Start a conversation &rarr;
            </a>
          </div>
          <p className="mt-6 font-sans text-sm text-gray-500">
            hello@beehoop.com
          </p>
        </AnimatedSection>
      </div>
    </section>
  )
}
