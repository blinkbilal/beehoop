import Contact from '@/components/sections/Contact'
import Process from '@/components/sections/Process'
import Services from '@/components/sections/Services'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Services — beehoop',
  description: 'Three integrated practices — Strategic Advisory, Data & Intelligence, and Digital Engineering — delivered as one team, under one roof.',
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
