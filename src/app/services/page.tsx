import { Metadata } from 'next'
import Services from '@/components/sections/Services'
import Process from '@/components/sections/Process'
import Contact from '@/components/sections/Contact'

export const metadata: Metadata = {
  title: 'Services — beehoop',
  description: 'We bring deep expertise across four practice areas — Strategy, M&A, Brand, and Analytics.',
}

export default function ServicesPage() {
  return (
    <>
      <Services />
      <Process />
      <Contact />
    </>
  )
}
