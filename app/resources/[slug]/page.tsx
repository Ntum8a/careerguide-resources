import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import ResourceCard from '@/components/ResourceCard'
import { getResources, getResourceBySlug, getCategoryColor, formatDownloadCount } from '@/lib/content'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return getResources().map((r) => ({ slug: r.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const resource = getResourceBySlug(slug)
  if (!resource) return {}
  return {
    title: resource.title,
    description: resource.description,
  }
}

export default async function ResourcePage({ params }: Props) {
  const { slug } = await params
  const resource = getResourceBySlug(slug)
  if (!resource) notFound()

  const allResources = getResources()
  const related = allResources.filter((r) => r.slug !== slug && r.category === resource.category).slice(0, 3)
  const categoryColor = getCategoryColor(resource.category)

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-[var(--color-muted)] mb-8">
        <Link href="/" className="hover:text-[var(--color-brand-teal)]">Home</Link>
        <span>/</span>
        <Link href="/resources" className="hover:text-[var(--color-brand-teal)]">Resources</Link>
        <span>/</span>
        <span className="text-[var(--color-body)] font-medium">{resource.title}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
        {/* Left: cover placeholder */}
        <div className="lg:col-span-2">
          <div className="aspect-[3/4] bg-gradient-to-br from-[var(--color-brand-teal-light)] to-white rounded-xl border border-[var(--color-border)] flex items-center justify-center">
            <div className="text-center p-8">
              <div className="text-6xl mb-4">📄</div>
              <div className="font-bold text-[var(--color-brand-teal-dark)] text-lg">{resource.title}</div>
              <div className="text-sm text-[var(--color-muted)] mt-1">CareerGuide</div>
            </div>
          </div>
          <div className="mt-3 flex justify-between text-xs text-[var(--color-muted)]">
            <span>{resource.pageCount} pages</span>
            <span>Version {resource.version}</span>
          </div>
        </div>

        {/* Right: content */}
        <div className="lg:col-span-3">
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${categoryColor}`}>
              {resource.categoryLabel}
            </span>
            <span className="text-xs bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-muted)] px-2.5 py-1 rounded-full font-medium">
              {resource.format}
            </span>
            {resource.isNew && (
              <span className="text-xs bg-amber-100 text-amber-700 px-2.5 py-1 rounded-full font-semibold">New</span>
            )}
          </div>

          <h1 className="text-3xl md:text-4xl font-extrabold text-[var(--color-body)] mb-2">
            {resource.title}
          </h1>
          <p className="text-lg text-[var(--color-muted)] mb-6">{resource.tagline}</p>

          <div className="flex items-center gap-4 text-sm text-[var(--color-muted)] mb-8 pb-8 border-b border-[var(--color-border)]">
            <span>⬇ {formatDownloadCount(resource.downloadCount)} downloads</span>
            <span>·</span>
            <span>⏱ {resource.readTime}</span>
            <span>·</span>
            <span>{resource.pageCount} pages</span>
          </div>

          {/* What's inside */}
          <div className="mb-8">
            <h2 className="font-bold text-lg text-[var(--color-body)] mb-4">What&apos;s inside</h2>
            <ul className="space-y-3">
              {resource.whatsInside.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="text-[var(--color-brand-teal)] font-bold shrink-0 mt-0.5">✓</span>
                  <span className="text-[var(--color-body)] text-sm leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Download CTA */}
          <div className="bg-[var(--color-surface)] rounded-xl border border-[var(--color-border)] p-6 mb-8">
            <h3 className="font-bold text-[var(--color-body)] mb-1">Ready to download?</h3>
            <p className="text-sm text-[var(--color-muted)] mb-4">Free — no sign-up required. Instant download.</p>
            <a
              href={`/resources/${resource.fileName}`}
              download
              className="inline-flex items-center gap-2 w-full sm:w-auto justify-center px-6 py-3.5 bg-[var(--color-brand-teal)] text-white font-bold rounded-lg hover:bg-[var(--color-brand-teal-dark)] transition-colors"
            >
              ⬇ Download Free — {resource.format}
            </a>
          </div>

          {/* Who it's for */}
          <div className="mb-6">
            <h2 className="font-bold text-lg text-[var(--color-body)] mb-3">Who is this for?</h2>
            <p className="text-[var(--color-muted)] text-sm leading-relaxed">{resource.whoIsItFor}</p>
          </div>

          <p className="text-xs text-[var(--color-muted)]">
            Published {new Date(resource.publishedAt).toLocaleDateString('en-GB', { month: 'long', year: 'numeric' })} · Version {resource.version}
          </p>
        </div>
      </div>

      {/* Related */}
      {related.length > 0 && (
        <div className="mt-16 pt-12 border-t border-[var(--color-border)]">
          <h2 className="text-xl font-bold text-[var(--color-body)] mb-6">You might also like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {related.map((r) => (
              <ResourceCard key={r.slug} resource={r} />
            ))}
          </div>
        </div>
      )}

      {/* Cross-link to opportunities */}
      <div className="mt-10 p-5 bg-[var(--color-brand-light)] rounded-xl border border-[var(--color-brand)]/20">
        <p className="text-sm font-medium text-[var(--color-brand-teal-dark)]">
          Ready to put this into practice?{' '}
          <Link href="/hidden-opportunities" className="font-bold underline hover:no-underline">
            Browse apprenticeships, insight days, and more →
          </Link>
        </p>
      </div>
    </div>
  )
}
