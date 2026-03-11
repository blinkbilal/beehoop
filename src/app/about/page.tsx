import { Metadata } from 'next'
import About from '@/components/sections/About'
import Achievements from '@/components/sections/Achievements'
import ClientLogos from '@/components/sections/ClientLogos'
import Contact from '@/components/sections/Contact'

export const metadata: Metadata = {
  title: 'About — beehoop',
  description: 'beehoop is a strategy, financial, and branding advisory firm — combining advanced planning, rigorous analysis, and proven execution expertise.',
}

export default function AboutPage() {
  return (
    <>
      <About />
      <Achievements />
      <ClientLogos />
      <Contact />
    </>
  )
}
