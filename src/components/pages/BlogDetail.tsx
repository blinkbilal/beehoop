'use client'

import { ArrowLeft, ArrowRight, Calendar, Clock } from 'lucide-react'
import Link from 'next/link'
import AnimatedSection from '@/components/ui/AnimatedSection'
import Contact from '@/components/sections/Contact'

interface BlogPost {
  slug: string
  title: string
  excerpt: string
  category: string
  date: string
  readTime: string
  content?: string[]
}

interface BlogDetailProps {
  post: BlogPost
  related: BlogPost[]
}

export default function BlogDetailPage({ post, related }: BlogDetailProps) {
  const formattedDate = new Date(post.date).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })

  return (
    <>
      {/* Hero */}
      <section className="gradient-hero-subtle noise-overlay py-20 md:py-32">
        <div className="relative z-10 max-w-3xl mx-auto px-6 md:px-10 lg:px-20">
          <AnimatedSection>
            <Link href="/insights" className="inline-flex items-center gap-2 text-sm font-sans text-text-muted hover:text-text-primary transition-colors mb-8">
              <ArrowLeft className="w-4 h-4" />
              All insights
            </Link>

            <span className="inline-block bg-accent-pale text-accent text-xs font-sans font-semibold uppercase tracking-label px-3 py-1 rounded-full mb-4">
              {post.category}
            </span>

            <h1 className="font-syne text-2xl md:text-3xl lg:text-4xl font-bold text-text-primary tracking-heading leading-[1.15]">
              {post.title}
            </h1>

            <div className="flex items-center gap-4 mt-4 text-xs font-sans text-text-muted">
              <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" />{formattedDate}</span>
              <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{post.readTime}</span>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Body */}
      <section className="py-20 md:py-28">
        <div className="max-w-3xl mx-auto px-6 md:px-10 lg:px-20">
          <AnimatedSection>
            <div className="prose prose-neutral max-w-none font-sans text-text-secondary leading-[1.7] space-y-6">
              {post.content && post.content.length > 0 ? (
                post.content.map((paragraph, i) => (
                  <p key={i}>{paragraph}</p>
                ))
              ) : (
                <>
                  <p>{post.excerpt}</p>
                  <p>
                    In today&apos;s rapidly evolving business landscape, leaders face unprecedented complexity.
                    Markets shift faster, competitive advantages erode more quickly, and the volume of data available
                    for decision-making can be as much a barrier as an enabler.
                  </p>
                  <p>
                    At beehoop, we believe the answer lies not in more information, but in sharper frameworks for
                    interpreting it. Our advisory approach synthesises quantitative rigour with qualitative market
                    intelligence — delivering recommendations that are both analytically sound and pragmatically actionable.
                  </p>
                </>
              )}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Related */}
      {related.length > 0 && (
        <section className="py-16 bg-background-card">
          <div className="max-w-3xl mx-auto px-6 md:px-10 lg:px-20">
            <AnimatedSection>
              <h3 className="font-syne text-xl font-bold text-text-primary tracking-heading mb-8">
                More Insights
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {related.map((p) => (
                  <Link
                    key={p.slug}
                    href={`/insights/${p.slug}`}
                    className="group bg-white rounded-xl border border-border p-6 hover:border-accent hover:shadow-sm transition-all"
                  >
                    <span className="text-xs font-sans font-semibold uppercase tracking-label text-accent">{p.category}</span>
                    <p className="font-syne text-sm font-bold text-text-primary mt-2 leading-snug">{p.title}</p>
                    <div className="mt-3 flex items-center gap-1 text-xs font-sans font-semibold text-text-muted group-hover:text-accent transition-colors">
                      Read more <ArrowRight className="w-3 h-3" />
                    </div>
                  </Link>
                ))}
              </div>
            </AnimatedSection>
          </div>
        </section>
      )}

      <Contact />
    </>
  )
}
