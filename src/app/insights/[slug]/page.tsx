import BlogDetailPage from '@/components/pages/BlogDetail'
import { blogPosts } from '@/lib/data'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'

interface Props {
  params: { slug: string }
}

export function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }))
}

export function generateMetadata({ params }: Props): Metadata {
  const post = blogPosts.find((p) => p.slug === params.slug)
  if (!post) return { title: 'Not Found — beehoop' }
  return {
    title: `${post.title} | beehoop Insights`,
    description: post.excerpt,
    alternates: { canonical: `https://blinkbilal.github.io/beehoop/insights/${post.slug}` },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
    },
  }
}

export default function InsightPage({ params }: Props) {
  const post = blogPosts.find((p) => p.slug === params.slug)
  if (!post) return notFound()

  const related = blogPosts.filter((p) => p.slug !== post.slug).slice(0, 2)

  return <BlogDetailPage post={post} related={related} />
}
