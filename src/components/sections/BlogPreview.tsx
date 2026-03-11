'use client'

import { ArrowRight } from 'lucide-react'
import AnimatedSection from '@/components/ui/AnimatedSection'
import { blogPosts } from '@/lib/data'
import Link from 'next/link'

export default function BlogPreview() {
  return (
    <section className="py-24 md:py-32 bg-background-card">
      <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-20">
        <AnimatedSection>
          <p className="text-xs font-sans font-semibold uppercase tracking-label text-accent mb-4">
            Latest Thinking
          </p>
          <h2 className="font-syne text-2xl md:text-lg font-bold text-text-primary tracking-heading">
            Insights
          </h2>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          {blogPosts.map((post, i) => (
            <AnimatedSection key={post.slug} delay={i * 0.1}>
              <Link href={`/insights/${post.slug}`} className="block h-full">
                <div className="group bg-white rounded-2xl border border-border p-6 hover:shadow-[0_8px_30px_rgba(200,146,10,0.08)] hover:-translate-y-1 transition-all duration-300 h-full flex flex-col">
                  {/* Category */}
                  <span className="inline-block self-start bg-accent-pale text-accent text-[10px] font-sans font-semibold uppercase tracking-label px-2.5 py-1 rounded-full">
                    {post.category}
                  </span>

                  {/* Title */}
                  <h3 className="font-syne text-lg font-bold text-text-primary leading-snug tracking-heading mt-4">
                    {post.title}
                  </h3>

                  {/* Excerpt */}
                  <p className="font-sans text-sm text-text-secondary leading-relaxed mt-2 line-clamp-2">
                    {post.excerpt}
                  </p>

                  {/* Meta */}
                  <div className="mt-auto pt-6 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs text-text-muted font-sans">
                      <time>{new Date(post.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</time>
                      <span>&middot;</span>
                      <span>{post.readTime}</span>
                    </div>
                    <ArrowRight className="w-4 h-4 text-text-muted group-hover:text-accent group-hover:translate-x-1 transition-all" />
                  </div>
                </div>
              </Link>
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection className="mt-12 text-center">
          <Link
            href="/insights"
            className="inline-flex items-center gap-2 font-sans text-sm font-semibold text-text-primary hover:text-accent transition-colors group"
          >
            View all insights
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </AnimatedSection>
      </div>
    </section>
  )
}
