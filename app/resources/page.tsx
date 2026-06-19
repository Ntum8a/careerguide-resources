import type { Metadata } from 'next'
import ResourceGrid from '@/components/ResourceGrid'
import { getResources } from '@/lib/content'

export const metadata: Metadata = {
  title: 'Free Resources',
  description: 'Download free career guides, CV templates, cover letter packs, interview cheat sheets, and more — all made for young people.',
}

export default function ResourcesPage() {
  const resources = getResources()

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-3xl md:text-4xl font-extrabold text-[var(--color-body)] mb-3">
          Free Resources
        </h1>
        <p className="text-lg text-[var(--color-muted)] max-w-2xl">
          {resources.length} free guides and templates — CV writing, interview prep, pay, and more. Download instantly, no sign-up needed.
        </p>
      </div>

      <ResourceGrid resources={resources} />
    </div>
  )
}
