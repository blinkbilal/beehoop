import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { services, cases } from '@/lib/data'
import ServiceDetailPage from '@/components/pages/ServiceDetail'

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
    title: `${service.title} — beehoop`,
    description: service.description,
  }
}

export default function ServicePage({ params }: Props) {
  const service = services.find((s) => s.slug === params.slug)
  if (!service) return notFound()

  const relatedCases = cases.filter((c) =>
    c.service.toLowerCase().includes(service.title.split(' ')[0].toLowerCase())
  ).slice(0, 3)

  return <ServiceDetailPage service={service} relatedCases={relatedCases} />
}
