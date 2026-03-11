import { Metadata } from 'next'
import CaseStudies from '@/components/sections/CaseStudies'
import Contact from '@/components/sections/Contact'

export const metadata: Metadata = {
  title: 'Case Studies — beehoop',
  description: 'A curated snapshot of high-impact projects across industries and geographies.',
}

export default function CasesPage() {
  return (
    <>
      <CaseStudies />
      <Contact />
    </>
  )
}
