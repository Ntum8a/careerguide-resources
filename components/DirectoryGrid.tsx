'use client'

import { useState, useMemo } from 'react'
import Fuse from 'fuse.js'
import ListingCard from './ListingCard'

interface Props {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  listings: any[]
  basePath: string
  searchKeys?: string[]
  filters?: {
    label: string
    key: string
    options: { value: string; label: string }[]
  }[]
}

export default function DirectoryGrid({ listings, basePath, searchKeys = ['title', 'provider', 'description', 'skillTags'], filters = [] }: Props) {
  const [query, setQuery] = useState('')
  const [activeFilters, setActiveFilters] = useState<Record<string, string>>({})

  const fuse = useMemo(
    () => new Fuse(listings, { keys: searchKeys, threshold: 0.35, minMatchCharLength: 2 }),
    [listings, searchKeys]
  )

  const filtered = useMemo(() => {
    let result = query.trim() ? fuse.search(query).map((r) => r.item) : [...listings]

    for (const [key, value] of Object.entries(activeFilters)) {
      if (value && value !== 'all') {
        result = result.filter((item) => {
          const itemValue = item[key]
          if (Array.isArray(itemValue)) return itemValue.some((v: string) => v.toLowerCase().includes(value.toLowerCase()))
          return String(itemValue ?? '').toLowerCase().includes(value.toLowerCase())
        })
      }
    }

    return result
  }, [query, activeFilters, fuse, listings])

  const setFilter = (key: string, value: string) => {
    setActiveFilters((prev) => ({ ...prev, [key]: value === prev[key] ? 'all' : value }))
  }

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
            placeholder="Search by name, provider, skill..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-xl border border-[var(--color-border)] bg-white text-[var(--color-body)] text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-teal)] focus:border-transparent placeholder:text-[var(--color-muted)]"
          />
          {query && (
            <button onClick={() => setQuery('')} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[var(--color-muted)] hover:text-[var(--color-body)]">×</button>
          )}
        </div>
      </div>

      {/* Filters */}
      {filters.length > 0 && (
        <div className="flex flex-wrap gap-4 mb-4">
          {filters.map((filter) => (
            <div key={filter.key} className="flex flex-wrap gap-1.5 items-center">
              <span className="text-xs font-semibold text-[var(--color-muted)] mr-1">{filter.label}:</span>
              {filter.options.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => setFilter(filter.key, opt.value)}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-colors ${
                    (activeFilters[filter.key] ?? 'all') === opt.value
                      ? 'bg-[var(--color-brand-teal)] text-white'
                      : 'bg-white border border-[var(--color-border)] text-[var(--color-muted)] hover:border-[var(--color-brand-teal)] hover:text-[var(--color-brand-teal)]'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          ))}
        </div>
      )}

      {/* Count */}
      <p className="text-sm text-[var(--color-muted)] mb-6">
        {filtered.length} {filtered.length === 1 ? 'listing' : 'listings'}
        {query && ` for "${query}"`}
      </p>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-[var(--color-muted)] text-lg mb-2">Nothing found</p>
          <button
            onClick={() => { setQuery(''); setActiveFilters({}) }}
            className="text-sm text-[var(--color-brand-teal)] hover:underline"
          >
            Clear search & filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((listing) => (
            <ListingCard key={listing.slug} listing={listing} basePath={basePath} />
          ))}
        </div>
      )}
    </div>
  )
}
