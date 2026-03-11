import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { cases } from '@/lib/data'
import CaseDetailPage from '@/components/pages/CaseDetail'

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
    title: `${caseStudy.outcome} — beehoop`,
    description: caseStudy.description,
  }
}

export default function CasePage({ params }: Props) {
  const caseStudy = cases.find((c) => c.slug === params.slug)
  if (!caseStudy) return notFound()

  const related = cases.filter((c) => c.slug !== caseStudy.slug && c.service === caseStudy.service).slice(0, 2)

  return <CaseDetailPage caseStudy={caseStudy} related={related} />
}
