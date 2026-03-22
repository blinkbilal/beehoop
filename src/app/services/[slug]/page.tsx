import ServiceDetailPage from '@/components/pages/ServiceDetail'
import { cases, services } from '@/lib/data'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'

interface Props {
  params: { slug: string }
}

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }))
}

export function generateMetadata({ params }: Props): Metadata {
  const service = services.find((s) => s.slug === params.slug)
  if (!service) return { title: 'Not Found — beehoop' }
  return {
    title: `${service.title} | beehoop Consulting`,
    description: service.description,
    alternates: { canonical: `https://blinkbilal.github.io/beehoop/services/${service.slug}` },
    openGraph: {
      title: `${service.title} | beehoop`,
      description: service.description,
      type: 'website',
    },
  }
}

export default function ServicePage({ params }: Props) {
  const service = services.find((s) => s.slug === params.slug)
  if (!service) return notFound()

  // Map pillar → case service tags for robust matching
  const pillarCaseTags: Record<string, string[]> = {
    advisory: ['strategy', 'm&a', 'brand'],
    intelligence: ['data'],
    engineering: ['engineering'],
  }
  const tags = pillarCaseTags[service.pillar] ?? []
  const relatedCases = cases.filter((c) =>
    tags.some((t) => c.service.toLowerCase() === t)
  ).slice(0, 3)

  return <ServiceDetailPage service={service} relatedCases={relatedCases} />
}
