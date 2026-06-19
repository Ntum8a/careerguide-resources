import Link from 'next/link'
import { getDeadlineStatus } from '@/lib/content'

interface Props {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  listing: any
  basePath: string
}

export default function ListingCard({ listing, basePath }: Props) {
  const deadlineStatus = listing.deadline ? getDeadlineStatus(listing.deadline) : null

  return (
    <div className="bg-white rounded-[var(--radius-card)] card-shadow border border-[var(--color-border)] hover:border-[var(--color-brand-teal)] hover:card-shadow-hover transition-all duration-200 flex flex-col">
      <div className="p-5 flex flex-col flex-1">
        {/* Header badges */}
        <div className="flex flex-wrap items-center gap-2 mb-3">
          {listing.categoryLabel && (
            <span className="text-xs font-semibold bg-[var(--color-brand-teal-light)] text-[var(--color-brand-teal-dark)] px-2.5 py-1 rounded-full">
              {listing.categoryLabel}
            </span>
          )}
          {listing.levelLabel && (
            <span className="text-xs font-semibold bg-purple-100 text-purple-700 px-2.5 py-1 rounded-full">
              {listing.levelLabel}
            </span>
          )}
          {listing.costLabel && (
            <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
              listing.costLabel?.toLowerCase().includes('free')
                ? 'bg-green-100 text-green-700'
                : 'bg-slate-100 text-slate-600'
            }`}>
              {listing.costLabel}
            </span>
          )}
          {listing.paidLabel && (
            <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
              listing.paid ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-600'
            }`}>
              {listing.paidLabel}
            </span>
          )}
          {listing.isNew && (
            <span className="text-xs font-semibold bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full">New</span>
          )}
        </div>

        {/* Title + provider */}
        <h3 className="font-bold text-[var(--color-body)] leading-snug mb-0.5">
          {listing.title}
        </h3>
        <p className="text-sm font-medium text-[var(--color-brand-teal)] mb-2">{listing.provider}</p>

        {/* Description */}
        <p className="text-sm text-[var(--color-muted)] leading-relaxed line-clamp-2 flex-1">
          {listing.description}
        </p>

        {/* Skill tags */}
        {listing.skillTags && listing.skillTags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-3">
            {listing.skillTags.slice(0, 3).map((tag: string) => (
              <span key={tag} className="text-xs bg-[var(--color-surface)] text-[var(--color-muted)] px-2 py-0.5 rounded-full border border-[var(--color-border)]">
                {tag}
              </span>
            ))}
            {listing.skillTags.length > 3 && (
              <span className="text-xs text-[var(--color-muted)] px-1">+{listing.skillTags.length - 3}</span>
            )}
          </div>
        )}

        {/* Footer */}
        <div className="mt-4 pt-4 border-t border-[var(--color-border)] flex items-center justify-between gap-2">
          <div className="flex flex-col gap-0.5">
            {listing.deadline && (
              <span className={`text-xs font-medium ${
                deadlineStatus === 'urgent' ? 'text-red-600' :
                deadlineStatus === 'soon' ? 'text-amber-600' :
                deadlineStatus === 'rolling' ? 'text-green-600' :
                'text-[var(--color-muted)]'
              }`}>
                {deadlineStatus === 'rolling' ? '✓ Rolling deadline' :
                 deadlineStatus === 'urgent' ? `⚡ ${listing.deadlineLabel}` :
                 deadlineStatus === 'soon' ? `⏰ ${listing.deadlineLabel}` :
                 `Deadline: ${listing.deadlineLabel}`}
              </span>
            )}
            {(listing.location || listing.formatLabel) && (
              <span className="text-xs text-[var(--color-muted)]">
                {[listing.formatLabel || listing.locationTypeLabel, listing.location].filter(Boolean).join(' · ')}
              </span>
            )}
          </div>
          <a
            href={listing.url}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 inline-flex items-center gap-1 text-sm font-semibold text-[var(--color-brand-teal)] hover:underline"
          >
            Visit →
          </a>
        </div>
      </div>
    </div>
  )
}
