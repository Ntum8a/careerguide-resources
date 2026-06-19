import type { Metadata } from 'next'
import DirectoryGrid from '@/components/DirectoryGrid'
import { getLearningListings, LEARNING_CATEGORIES } from '@/lib/content'

export const metadata: Metadata = {
  title: 'Free & Low-Cost Learning Directory',
  description: 'Find free and affordable online courses, training, and learning programmes — curated for young people building their skills for work.',
}

const COST_FILTERS = [
  { value: 'all', label: 'All' },
  { value: 'free', label: 'Free' },
  { value: 'low-cost', label: 'Low-Cost' },
]

const FORMAT_FILTERS = [
  { value: 'all', label: 'All' },
  { value: 'online', label: 'Online' },
  { value: 'in-person', label: 'In-Person' },
  { value: 'hybrid', label: 'Hybrid' },
]

export default function LearningDirectoryPage() {
  const listings = getLearningListings()

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="mb-10">
        <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-[var(--color-brand-teal-light)] text-[var(--color-brand-teal-dark)] mb-3">
          Free &amp; Low-Cost
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-[var(--color-body)] mb-3">
          Learning Directory
        </h1>
        <p className="text-lg text-[var(--color-muted)] max-w-2xl">
          Curated free and affordable courses from trusted providers — Google, freeCodeCamp, LinkedIn Learning, and more. Build real skills without spending a fortune.
        </p>
      </div>

      {/* Category quick links */}
      <div className="flex flex-wrap gap-2 mb-8">
        {LEARNING_CATEGORIES.map((cat) => (
          <a
            key={cat.slug}
            href={`/learning-directory/${cat.slug}`}
            className="text-xs font-medium bg-white border border-[var(--color-border)] text-[var(--color-muted)] hover:border-[var(--color-brand-teal)] hover:text-[var(--color-brand-teal)] px-3 py-1.5 rounded-full transition-colors"
          >
            {cat.label}
          </a>
        ))}
      </div>

      <DirectoryGrid
        listings={listings}
        basePath="/learning-directory"
        searchKeys={['title', 'provider', 'description', 'skillTags', 'categoryLabel']}
        filters={[
          { label: 'Cost', key: 'cost', options: COST_FILTERS },
          { label: 'Format', key: 'format', options: FORMAT_FILTERS },
        ]}
      />
    </div>
  )
}
