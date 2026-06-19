import Link from 'next/link'
import { type Resource, getCategoryColor, formatDownloadCount } from '@/lib/content'

interface Props {
  resource: Resource
  featured?: boolean
}

export default function ResourceCard({ resource, featured = false }: Props) {
  const categoryColor = getCategoryColor(resource.category)

  if (featured) {
    return (
      <Link
        href={`/resources/${resource.slug}`}
        className="group block bg-white rounded-[var(--radius-card)] card-shadow hover:card-shadow-hover border border-[var(--color-border)] hover:border-[var(--color-brand-teal)] transition-all duration-200"
      >
        <div className="p-6 md:p-8">
          <div className="flex items-start justify-between gap-4 mb-4">
            <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${categoryColor}`}>
              {resource.categoryLabel}
            </span>
            <div className="flex items-center gap-2">
              {resource.isNew && (
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-amber-100 text-amber-700">
                  New
                </span>
              )}
              <span className="text-xs text-[var(--color-muted)] bg-[var(--color-surface)] px-2 py-0.5 rounded-full font-medium">
                {resource.format}
              </span>
            </div>
          </div>
          <h3 className="text-xl font-bold text-[var(--color-body)] mb-2 group-hover:text-[var(--color-brand-teal)] transition-colors">
            {resource.title}
          </h3>
          <p className="text-[var(--color-muted)] text-sm leading-relaxed mb-5">
            {resource.description}
          </p>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 text-xs text-[var(--color-muted)]">
              <span>⬇ {formatDownloadCount(resource.downloadCount)} downloads</span>
              <span>·</span>
              <span>⏱ {resource.readTime}</span>
            </div>
            <span className="text-sm font-semibold text-[var(--color-brand-teal)] group-hover:underline">
              Download Free →
            </span>
          </div>
        </div>
      </Link>
    )
  }

  return (
    <Link
      href={`/resources/${resource.slug}`}
      className="group flex flex-col bg-white rounded-[var(--radius-card)] card-shadow hover:card-shadow-hover border border-[var(--color-border)] hover:border-[var(--color-brand-teal)] transition-all duration-200 hover:-translate-y-0.5"
    >
      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-start justify-between gap-2 mb-3">
          <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${categoryColor}`}>
            {resource.categoryLabel}
          </span>
          <div className="flex items-center gap-1.5 shrink-0">
            {resource.isNew && (
              <span className="text-xs font-semibold bg-amber-100 text-amber-700 px-1.5 py-0.5 rounded-full">New</span>
            )}
            <span className="text-xs text-[var(--color-muted)] bg-[var(--color-surface)] px-1.5 py-0.5 rounded-full font-medium">
              {resource.format}
            </span>
          </div>
        </div>

        <h3 className="font-bold text-[var(--color-body)] mb-2 group-hover:text-[var(--color-brand-teal)] transition-colors leading-snug">
          {resource.title}
        </h3>
        <p className="text-[var(--color-muted)] text-sm leading-relaxed flex-1 line-clamp-2">
          {resource.description}
        </p>

        <div className="mt-4 pt-4 border-t border-[var(--color-border)] flex items-center justify-between">
          <span className="text-xs text-[var(--color-muted)]">⬇ {formatDownloadCount(resource.downloadCount)}</span>
          <span className="text-sm font-semibold text-[var(--color-brand-teal)] group-hover:underline">
            Download Free →
          </span>
        </div>
      </div>
    </Link>
  )
}
