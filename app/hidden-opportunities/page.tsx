import type { Metadata } from 'next'
import Link from 'next/link'
import ListingCard from '@/components/ListingCard'
import { HIDDEN_SUBCATEGORIES, getHiddenOpportunities } from '@/lib/content'

export const metadata: Metadata = {
  title: 'Hidden Opportunities Directory',
  description: 'Apprenticeships, insight programmes, work experience, scholarships, competitions, and mentoring opportunities most young people never find.',
}

const ICONS: Record<string, string> = {
  'apprenticeships': '🏗️',
  'insight-programmes': '👁️',
  'work-experience': '💼',
  'competitions': '🏆',
  'scholarships': '🎓',
  'mentoring': '🤝',
}

export default function HiddenOpportunitiesPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="mb-12">
        <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-[var(--color-brand-teal-light)] text-[var(--color-brand-teal-dark)] mb-3">
          Curated &amp; verified
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-[var(--color-body)] mb-3">
          Hidden Opportunities
        </h1>
        <p className="text-lg text-[var(--color-muted)] max-w-2xl">
          Opportunities you won&apos;t find by searching Google. Apprenticeships, insight days, scholarships, mentoring and more — all free to apply.
        </p>
      </div>

      {/* Subcategory grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-16">
        {HIDDEN_SUBCATEGORIES.map((sub) => {
          const listings = getHiddenOpportunities(sub.slug)
          return (
            <Link
              key={sub.slug}
              href={`/hidden-opportunities/${sub.slug}`}
              className="group bg-white rounded-[var(--radius-card)] border border-[var(--color-border)] card-shadow hover:border-[var(--color-brand-teal)] hover:card-shadow-hover transition-all p-6"
            >
              <div className="text-3xl mb-3">{ICONS[sub.slug]}</div>
              <h2 className="font-bold text-lg text-[var(--color-body)] mb-1 group-hover:text-[var(--color-brand-teal)] transition-colors">
                {sub.label}
              </h2>
              <p className="text-sm text-[var(--color-muted)] leading-relaxed mb-4">
                {sub.description}
              </p>
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-[var(--color-muted)]">
                  {listings.length} listed
                </span>
                <span className="text-sm font-semibold text-[var(--color-brand-teal)] group-hover:underline">
                  Browse →
                </span>
              </div>
            </Link>
          )
        })}
      </div>

      {/* Recently added — pull 1 from each subcategory */}
      <div className="mb-12">
        <h2 className="text-xl font-bold text-[var(--color-body)] mb-6">Recently added</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {HIDDEN_SUBCATEGORIES.slice(0, 3).map((sub) => {
            const listings = getHiddenOpportunities(sub.slug)
            const first = listings[0]
            if (!first) return null
            return (
              <ListingCard
                key={`${sub.slug}-${first.slug}`}
                listing={first}
                basePath={`/hidden-opportunities/${sub.slug}`}
              />
            )
          })}
        </div>
      </div>

      {/* Cross-link to resources */}
      <div className="p-5 bg-[var(--color-surface)] rounded-xl border border-[var(--color-border)]">
        <p className="text-sm text-[var(--color-muted)]">
          Applying for an opportunity?{' '}
          <Link href="/resources" className="font-semibold text-[var(--color-brand-teal)] hover:underline">
            Download our free CV and cover letter guides first →
          </Link>
        </p>
      </div>
    </div>
  )
}
