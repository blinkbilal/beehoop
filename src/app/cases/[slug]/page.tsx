import CaseDetailPage from '@/components/pages/CaseDetail'
import { cases } from '@/lib/data'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'

interface Props {
  params: { slug: string }
}

export function generateStaticParams() {
  return cases.map((c) => ({ slug: c.slug }))
}

export function generateMetadata({ params }: Props): Metadata {
  const caseStudy = cases.find((c) => c.slug === params.slug)
  if (!caseStudy) return { title: 'Not Found — beehoop' }
  return {
    title: `${caseStudy.outcome} | beehoop Case Study`,
    description: caseStudy.description,
    alternates: { canonical: `https://blinkbilal.github.io/beehoop/cases/${caseStudy.slug}` },
    openGraph: {
      title: `${caseStudy.outcome} | beehoop`,
      description: caseStudy.description,
      type: 'article',
    },
  }
}

export default function CasePage({ params }: Props) {
  const caseStudy = cases.find((c) => c.slug === params.slug)
  if (!caseStudy) return notFound()

  const related = cases.filter((c) => c.slug !== caseStudy.slug && c.service === caseStudy.service).slice(0, 2)

  return <CaseDetailPage caseStudy={caseStudy} related={related} />
}
