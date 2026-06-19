import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import DirectoryGrid from '@/components/DirectoryGrid'
import { HIDDEN_SUBCATEGORIES, getHiddenOpportunities, type HiddenSubcategory } from '@/lib/content'

interface Props {
  params: Promise<{ subcategory: string }>
}

export async function generateStaticParams() {
  return HIDDEN_SUBCATEGORIES.map((s) => ({ subcategory: s.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { subcategory } = await params
  const sub = HIDDEN_SUBCATEGORIES.find((s) => s.slug === subcategory)
  if (!sub) return {}
  return {
    title: sub.label,
    description: sub.description,
  }
}

const FILTERS: Record<string, { label: string; key: string; options: { value: string; label: string }[] }[]> = {
  apprenticeships: [
    {
      label: 'Level',
      key: 'level',
      options: [
        { value: 'all', label: 'All' },
        { value: 'intermediate', label: 'Intermediate (L2)' },
        { value: 'advanced', label: 'Advanced (L3)' },
        { value: 'higher', label: 'Higher (L4–5)' },
        { value: 'degree', label: 'Degree (L6–7)' },
      ],
    },
    {
      label: 'Sector',
      key: 'sector',
      options: [
        { value: 'all', label: 'All' },
        { value: 'finance', label: 'Finance' },
        { value: 'tech', label: 'Tech' },
        { value: 'media', label: 'Media' },
        { value: 'engineering', label: 'Engineering' },
        { value: 'healthcare', label: 'Healthcare' },
        { value: 'public-sector', label: 'Public Sector' },
      ],
    },
  ],
  'insight-programmes': [
    {
      label: 'Year Group',
      key: 'yearGroup',
      options: [
        { value: 'all', label: 'All' },
        { value: 'school', label: 'School (Y10–11)' },
        { value: 'sixth-form', label: 'Sixth Form' },
        { value: 'university', label: 'University' },
      ],
    },
    {
      label: 'Format',
      key: 'locationType',
      options: [
        { value: 'all', label: 'All' },
        { value: 'in-person', label: 'In-Person' },
        { value: 'virtual', label: 'Virtual' },
        { value: 'hybrid', label: 'Hybrid' },
      ],
    },
  ],
  'work-experience': [
    {
      label: 'Paid',
      key: 'paid',
      options: [
        { value: 'all', label: 'All' },
        { value: 'true', label: 'Paid' },
        { value: 'false', label: 'Unpaid' },
      ],
    },
    {
      label: 'Format',
      key: 'locationType',
      options: [
        { value: 'all', label: 'All' },
        { value: 'in-person', label: 'In-Person' },
        { value: 'virtual', label: 'Virtual' },
        { value: 'hybrid', label: 'Hybrid' },
      ],
    },
  ],
  competitions: [
    {
      label: 'Type',
      key: 'type',
      options: [
        { value: 'all', label: 'All' },
        { value: 'business-challenge', label: 'Business' },
        { value: 'design', label: 'Design' },
        { value: 'writing', label: 'Writing' },
        { value: 'stem', label: 'STEM' },
        { value: 'arts', label: 'Arts' },
      ],
    },
    {
      label: 'Team / Solo',
      key: 'teamOrSolo',
      options: [
        { value: 'all', label: 'All' },
        { value: 'solo', label: 'Solo' },
        { value: 'team', label: 'Team' },
        { value: 'either', label: 'Either' },
      ],
    },
  ],
  scholarships: [
    {
      label: 'Stage',
      key: 'stage',
      options: [
        { value: 'all', label: 'All' },
        { value: 'sixth-form', label: 'Sixth Form' },
        { value: 'university', label: 'University' },
        { value: 'post-education', label: '18–30' },
      ],
    },
    {
      label: 'Sector',
      key: 'sector',
      options: [
        { value: 'all', label: 'All' },
        { value: 'general', label: 'General' },
        { value: 'stem', label: 'STEM' },
        { value: 'law', label: 'Law' },
        { value: 'finance', label: 'Finance' },
        { value: 'creative', label: 'Creative' },
      ],
    },
  ],
  mentoring: [
    {
      label: 'Format',
      key: 'format',
      options: [
        { value: 'all', label: 'All' },
        { value: '1-to-1', label: '1-to-1' },
        { value: 'group', label: 'Group' },
        { value: 'peer', label: 'Peer' },
      ],
    },
    {
      label: 'Delivery',
      key: 'delivery',
      options: [
        { value: 'all', label: 'All' },
        { value: 'online', label: 'Online' },
        { value: 'in-person', label: 'In-Person' },
        { value: 'hybrid', label: 'Hybrid' },
      ],
    },
  ],
}

export default async function SubcategoryPage({ params }: Props) {
  const { subcategory } = await params
  const sub = HIDDEN_SUBCATEGORIES.find((s) => s.slug === subcategory)
  if (!sub) notFound()

  const listings = getHiddenOpportunities(sub.slug as HiddenSubcategory)
  const filters = FILTERS[sub.slug] ?? []

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <nav className="flex items-center gap-2 text-sm text-[var(--color-muted)] mb-8">
        <Link href="/" className="hover:text-[var(--color-brand-teal)]">Home</Link>
        <span>/</span>
        <Link href="/hidden-opportunities" className="hover:text-[var(--color-brand-teal)]">Hidden Opportunities</Link>
        <span>/</span>
        <span className="text-[var(--color-body)] font-medium">{sub.label}</span>
      </nav>

      {/* Subcategory tab bar */}
      <div className="flex flex-wrap gap-2 mb-10 pb-6 border-b border-[var(--color-border)]">
        {HIDDEN_SUBCATEGORIES.map((s) => (
          <Link
            key={s.slug}
            href={`/hidden-opportunities/${s.slug}`}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-colors ${
              s.slug === sub.slug
                ? 'bg-[var(--color-brand-teal)] text-white'
                : 'bg-white border border-[var(--color-border)] text-[var(--color-muted)] hover:border-[var(--color-brand-teal)] hover:text-[var(--color-brand-teal)]'
            }`}
          >
            {s.label}
          </Link>
        ))}
      </div>

      <div className="mb-10">
        <h1 className="text-3xl md:text-4xl font-extrabold text-[var(--color-body)] mb-3">{sub.label}</h1>
        <p className="text-lg text-[var(--color-muted)] max-w-2xl">{sub.description}</p>
      </div>

      <DirectoryGrid
        listings={listings}
        basePath={`/hidden-opportunities/${sub.slug}`}
        filters={filters}
      />

      {/* Related resource cross-link */}
      <div className="mt-12 p-5 bg-[var(--color-brand-teal-light)] rounded-xl border border-[var(--color-brand-teal)]/20">
        <p className="text-sm font-medium text-[var(--color-brand-teal-dark)]">
          Preparing your application?{' '}
          <Link href="/resources" className="font-bold underline hover:no-underline">
            Download our free CV, cover letter, and interview guides →
          </Link>
        </p>
      </div>
    </div>
  )
}
