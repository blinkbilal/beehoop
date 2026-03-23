import About from '@/components/sections/About'
import Contact from '@/components/sections/Contact'
import Leadership from '@/components/sections/Leadership'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About — beehoop',
  description: 'beehoop is an end-to-end strategic and engineering consultancy — combining boardroom advisory, data architecture, business intelligence, and custom software with rigorous analysis and proven execution.',
}

export default function AboutPage() {
  return (
    <>
      <div className="pt-10 md:pt-16">
        <About />
      </div>
      <Leadership />
      <Contact />
    </>
  )
}
