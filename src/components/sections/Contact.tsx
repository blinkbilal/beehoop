'use client'

import { useState } from 'react'
import Image from 'next/image'
import AnimatedSection from '@/components/ui/AnimatedSection'
import { SketchConversation } from '@/components/ui/SketchIllustrations'
import { Mail, Send } from 'lucide-react'

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    service: '',
    message: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const subject = encodeURIComponent(`Enquiry from ${formData.name} — ${formData.company}`)
    const body = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\nCompany: ${formData.company}\nService: ${formData.service}\n\n${formData.message}`
    )
    window.location.href = `mailto:hello@beehoop.com?subject=${subject}&body=${body}`
  }

  return (
    <section id="contact" className="gradient-dark-navy noise-overlay relative overflow-hidden">
      {/* Bee watermark — sketch outline style */}
      <div
        className="absolute right-[-4rem] top-1/2 -translate-y-1/2 w-[420px] h-[420px] pointer-events-none select-none"
        aria-hidden="true"
      >
        <Image
          src={`${process.env.NEXT_PUBLIC_BASE_PATH}/logo.png`}
          alt=""
          fill
          style={{ objectFit: 'contain', opacity: 0.04, filter: 'grayscale(100%) brightness(200%)' }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10 lg:px-20 py-24 md:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Left — Info */}
          <AnimatedSection direction="left">
            <p className="text-xs font-sans font-semibold uppercase tracking-label text-accent-light mb-4">
              Get In Touch
            </p>
            <h2 className="font-syne text-3xl md:text-4xl lg:text-5xl text-white italic leading-[1.1] font-bold tracking-heading mt-4">
              Ready to think
              <br />
              differently?
            </h2>
            <p className="font-sans text-base text-gray-400 mt-6 max-w-md leading-relaxed">
              Every great outcome starts with a conversation. Share your story with us — where you are, where you want to be, and what&apos;s standing in the way. We&apos;ll bring the thinking, the rigour, and the commitment to help you get there.
            </p>

            <div className="mt-10 space-y-4">
              <a
                href="mailto:hello@beehoop.com"
                className="flex items-center gap-3 text-gray-300 hover:text-accent-light transition-colors group"
              >
                <Mail className="w-4 h-4 text-accent-light" />
                <span className="font-sans text-sm">hello@beehoop.com</span>
              </a>
            </div>

            {/* Free consultation badge */}
            <div className="mt-10 inline-flex items-center gap-2 bg-accent-light/10 border border-accent-light/20 rounded-full px-4 py-2">
              <span className="w-2 h-2 rounded-full bg-accent-light animate-pulse" />
              <span className="font-sans text-xs text-accent-light font-medium">Free initial consultation</span>
            </div>

            {/* Sketch illustration */}
            <div className="mt-10 hidden lg:block">
              <SketchConversation className="w-32 h-32 opacity-60" />
            </div>
          </AnimatedSection>

          {/* Right — Form */}
          <AnimatedSection direction="right" delay={0.15}>
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="form-field">
                <input
                  id="contact-name"
                  type="text"
                  name="name"
                  placeholder=" "
                  value={formData.name}
                  onChange={handleChange}
                  required
                  autoComplete="name"
                />
                <label htmlFor="contact-name">Your name</label>
              </div>

              <div className="form-field">
                <input
                  id="contact-email"
                  type="email"
                  name="email"
                  placeholder=" "
                  value={formData.email}
                  onChange={handleChange}
                  required
                  autoComplete="email"
                />
                <label htmlFor="contact-email">Your email</label>
              </div>

              <div className="form-field">
                <input
                  id="contact-company"
                  type="text"
                  name="company"
                  placeholder=" "
                  value={formData.company}
                  onChange={handleChange}
                  autoComplete="organization"
                />
                <label htmlFor="contact-company">Company name</label>
              </div>

              <div className="form-field">
                <select
                  id="contact-service"
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                  required
                >
                  <option value="" disabled>How can we help?</option>
                  <option value="Strategy Development">Strategy Development</option>
                  <option value="M&A & Transactions">M&A &amp; Transactions</option>
                  <option value="Brand & Market Strategy">Brand &amp; Market Strategy</option>
                  <option value="Financial & Data Analytics">Financial &amp; Data Analytics</option>
                  <option value="Other">Other</option>
                </select>
                <label htmlFor="contact-service">Service interest</label>
              </div>

              <div className="form-field">
                <textarea
                  id="contact-message"
                  name="message"
                  placeholder=" "
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  className="resize-none"
                />
                <label htmlFor="contact-message">Tell us more</label>
              </div>

              <button
                type="submit"
                className="w-full md:w-auto gradient-warm-gold text-text-primary font-sans font-semibold px-8 py-4 rounded-full hover:shadow-[0_0_20px_rgba(245,200,66,0.3)] hover:scale-[1.02] transition-all duration-300 text-sm flex items-center justify-center gap-2"
              >
                Send message
                <Send className="w-4 h-4" />
              </button>
            </form>
          </AnimatedSection>
        </div>
      </div>
    </section>
  )
}
