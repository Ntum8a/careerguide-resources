import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch with CareerGuide — suggest a listing, report an issue, or just say hello.',
}

export default function ContactPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="mb-10">
        <h1 className="text-3xl md:text-4xl font-extrabold text-[var(--color-body)] mb-3">Get in touch</h1>
        <p className="text-lg text-[var(--color-muted)]">
          Found a broken link? Want to suggest an opportunity? Just want to say hello? We&apos;re here.
        </p>
      </div>

      {/* Contact options */}
      <div className="space-y-4 mb-10">
        <a
          href="mailto:hello@careerguide.network"
          className="flex items-center gap-4 p-5 bg-white border border-[var(--color-border)] rounded-xl card-shadow hover:border-[var(--color-brand-teal)] transition-all group"
        >
          <div className="w-10 h-10 bg-[var(--color-brand-teal-light)] rounded-lg flex items-center justify-center text-lg shrink-0">
            ✉️
          </div>
          <div>
            <div className="font-semibold text-[var(--color-body)] group-hover:text-[var(--color-brand-teal)] transition-colors">
              hello@careerguide.network
            </div>
            <div className="text-sm text-[var(--color-muted)]">Email us directly — we aim to reply within 2 working days</div>
          </div>
        </a>

        <a
          href="https://www.linkedin.com/company/careerguide-network"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-4 p-5 bg-white border border-[var(--color-border)] rounded-xl card-shadow hover:border-[var(--color-brand-teal)] transition-all group"
        >
          <div className="w-10 h-10 bg-[var(--color-brand-teal-light)] rounded-lg flex items-center justify-center text-lg shrink-0">
            💼
          </div>
          <div>
            <div className="font-semibold text-[var(--color-body)] group-hover:text-[var(--color-brand-teal)] transition-colors">
              LinkedIn
            </div>
            <div className="text-sm text-[var(--color-muted)]">Follow CareerGuide on LinkedIn for updates</div>
          </div>
        </a>

        <a
          href="https://www.instagram.com/careerguide.network"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-4 p-5 bg-white border border-[var(--color-border)] rounded-xl card-shadow hover:border-[var(--color-brand-teal)] transition-all group"
        >
          <div className="w-10 h-10 bg-[var(--color-brand-teal-light)] rounded-lg flex items-center justify-center text-lg shrink-0">
            📸
          </div>
          <div>
            <div className="font-semibold text-[var(--color-body)] group-hover:text-[var(--color-brand-teal)] transition-colors">
              Instagram
            </div>
            <div className="text-sm text-[var(--color-muted)]">@careerguide.network</div>
          </div>
        </a>
      </div>

      {/* Suggest a listing */}
      <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl p-6 mb-8">
        <h2 className="font-bold text-[var(--color-body)] mb-2">Suggest a listing</h2>
        <p className="text-sm text-[var(--color-muted)] leading-relaxed mb-3">
          Know of a free course, apprenticeship, scholarship, or opportunity we haven&apos;t listed? Email us at{' '}
          <a href="mailto:hello@careerguide.network?subject=Suggest a listing" className="text-[var(--color-brand-teal)] font-medium hover:underline">
            hello@careerguide.network
          </a>{' '}
          with the name, link, and a brief description. We review every suggestion.
        </p>
        <p className="text-xs text-[var(--color-muted)]">
          Note: we don&apos;t accept paid listings. All directory entries are independently curated.
        </p>
      </div>

      {/* Main site link */}
      <div className="text-center">
        <p className="text-sm text-[var(--color-muted)] mb-2">Looking for CareerGuide&apos;s main services?</p>
        <a
          href="https://www.careerguide.network"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm font-semibold text-[var(--color-brand-teal)] hover:underline"
        >
          Visit www.careerguide.network →
        </a>
      </div>
    </div>
  )
}
