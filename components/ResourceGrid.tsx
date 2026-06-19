'use client'

import { useState, useMemo } from 'react'
import Fuse from 'fuse.js'
import ResourceCard from './ResourceCard'
import { type Resource, RESOURCE_CATEGORIES } from '@/lib/content'

interface Props {
  resources: Resource[]
}

const FORMATS = ['PDF', 'Template', 'Pack', 'Playbook', 'Guide']

export default function ResourceGrid({ resources }: Props) {
  const [query, setQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState('all')
  const [activeFormat, setActiveFormat] = useState('all')
  const [sort, setSort] = useState<'newest' | 'popular' | 'az'>('popular')

  const fuse = useMemo(
    () =>
      new Fuse(resources, {
        keys: ['title', 'description', 'categoryLabel', 'format', 'whatsInside'],
        threshold: 0.35,
        minMatchCharLength: 2,
      }),
    [resources]
  )

  const filtered = useMemo(() => {
    let result = query.trim() ? fuse.search(query).map((r) => r.item) : [...resources]

    if (activeCategory !== 'all') {
      result = result.filter((r) => r.category === activeCategory)
    }

    if (activeFormat !== 'all') {
      result = result.filter((r) =>
        r.format.toLowerCase().includes(activeFormat.toLowerCase())
      )
    }

    if (sort === 'popular') result.sort((a, b) => b.downloadCount - a.downloadCount)
    if (sort === 'newest') result.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
    if (sort === 'az') result.sort((a, b) => a.title.localeCompare(b.title))

    return result
  }, [query, activeCategory, activeFormat, sort, fuse, resources])

  return (
    <div>
      {/* Search */}
      <div className="mb-5">
        <div className="relative">
          <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-muted)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="search"
            placeholder="Search resources, topics, skills..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-xl border border-[var(--color-border)] bg-white text-[var(--color-body)] text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-teal)] focus:border-transparent placeholder:text-[var(--color-muted)]"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[var(--color-muted)] hover:text-[var(--color-body)]"
            >
              ×
            </button>
          )}
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2 mb-4">
        {/* Category */}
        <div className="flex flex-wrap gap-1.5">
          <button
            onClick={() => setActiveCategory('all')}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-colors ${
              activeCategory === 'all'
                ? 'bg-[var(--color-brand-teal)] text-white'
                : 'bg-white border border-[var(--color-border)] text-[var(--color-muted)] hover:border-[var(--color-brand-teal)] hover:text-[var(--color-brand-teal)]'
            }`}
          >
            All
          </button>
          {RESOURCE_CATEGORIES.map((cat) => (
            <button
              key={cat.slug}
              onClick={() => setActiveCategory(activeCategory === cat.slug ? 'all' : cat.slug)}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-colors ${
                activeCategory === cat.slug
                  ? 'bg-[var(--color-brand-teal)] text-white'
                  : 'bg-white border border-[var(--color-border)] text-[var(--color-muted)] hover:border-[var(--color-brand-teal)] hover:text-[var(--color-brand-teal)]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Sort + count */}
      <div className="flex items-center justify-between mb-6">
        <p className="text-sm text-[var(--color-muted)]">
          {filtered.length} {filtered.length === 1 ? 'resource' : 'resources'}
          {query && ` for "${query}"`}
        </p>
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value as typeof sort)}
          className="text-sm border border-[var(--color-border)] rounded-lg px-3 py-1.5 text-[var(--color-body)] bg-white focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-teal)]"
        >
          <option value="popular">Most Downloaded</option>
          <option value="newest">Newest</option>
          <option value="az">A–Z</option>
        </select>
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-[var(--color-muted)] text-lg mb-2">Nothing found for &quot;{query}&quot;</p>
          <button
            onClick={() => { setQuery(''); setActiveCategory('all') }}
            className="text-sm text-[var(--color-brand-teal)] hover:underline"
          >
            Clear filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((resource) => (
            <ResourceCard key={resource.slug} resource={resource} />
          ))}
        </div>
      )}
    </div>
  )
}
