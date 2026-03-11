import { Metadata } from 'next'
import BlogPreview from '@/components/sections/BlogPreview'
import Contact from '@/components/sections/Contact'

export const metadata: Metadata = {
  title: 'Insights — beehoop',
  description:
    'Perspectives on strategy, M&A, brand building, and data analytics from the beehoop advisory team.',
}

export default function InsightsPage() {
  return (
    <>
      <BlogPreview />
      <Contact />
    </>
  )
}
