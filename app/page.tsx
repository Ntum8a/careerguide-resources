import Link from 'next/link'
import ResourceCard from '@/components/ResourceCard'
import { getFeaturedResources, getResources, HIDDEN_SUBCATEGORIES } from '@/lib/content'

export default function HomePage() {
  const featured = getFeaturedResources()
  const allResources = getResources()

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-[var(--color-brand-teal-dark)] to-[var(--color-brand-teal)] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="max-w-2xl">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-white/20 text-white mb-4">
              Free for every student
            </span>
            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-5">
              Everything you need to launch your career
            </h1>
            <p className="text-lg md:text-xl text-teal-100 leading-relaxed mb-8">
              Free guides, CV templates, interview prep, and directories of opportunities that most people never find. No paywalls. No sign-up required.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href="/resources"
                className="inline-flex items-center justify-center px-6 py-3 bg-white text-[var(--color-brand-teal-dark)] font-bold rounded-lg hover:bg-teal-50 transition-colors text-sm"
              >
                Browse Free Resources
              </Link>
              <Link
                href="/hidden-opportunities"
                className="inline-flex items-center justify-center px-6 py-3 border-2 border-white/50 text-white font-semibold rounded-lg hover:bg-white/10 transition-colors text-sm"
              >
                Find Hidden Opportunities
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <section className="bg-[var(--color-body)] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex flex-wrap justify-center md:justify-start gap-8">
            {[
              { value: '8', label: 'Free Resources' },
              { value: '10+', label: 'Learning Courses' },
              { value: '60+', label: 'Opportunities Listed' },
              { value: '100%', label: 'Free to Access' },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-2xl font-bold text-[var(--color-brand-teal)]">{stat.value}</div>
                <div className="text-xs text-slate-400 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Resources */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-[var(--color-body)]">Start here</h2>
            <p className="text-[var(--color-muted)] mt-1">The most popular free resources</p>
          </div>
          <Link href="/resources" className="text-sm font-semibold text-[var(--color-brand-teal)] hover:underline shrink-0">
            Browse all {allResources.length} →
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {featured.map((resource) => (
            <ResourceCard key={resource.slug} resource={resource} featured />
          ))}
        </div>
      </section>

      {/* Directory signposts */}
      <section className="bg-[var(--color-surface)] border-y border-[var(--color-border)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-[var(--color-body)]">Explore opportunities</h2>
            <p className="text-[var(--color-muted)] mt-2 max-w-xl mx-auto">
              Two curated directories of opportunities most young people never know about.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
            <Link
              href="/learning-directory"
              className="group bg-white rounded-[var(--radius-card)] border border-[var(--color-border)] card-shadow hover:border-[var(--color-brand-teal)] hover:card-shadow-hover transition-all p-6"
            >
              <div className="w-12 h-12 bg-[var(--color-brand-teal-light)] rounded-xl flex items-center justify-center mb-4 text-2xl">
                📚
              </div>
              <h3 className="font-bold text-xl text-[var(--color-body)] mb-2 group-hover:text-[var(--color-brand-teal)] transition-colors">
                Free &amp; Low-Cost Learning Directory
              </h3>
              <p className="text-[var(--color-muted)] text-sm leading-relaxed mb-4">
                Curated courses and learning programmes — Google, freeCodeCamp, Barclays LifeSkills, and more. All free or affordable.
              </p>
              <span className="text-sm font-semibold text-[var(--color-brand-teal)] group-hover:underline">
                Browse courses →
              </span>
            </Link>

            <Link
              href="/hidden-opportunities"
              className="group bg-white rounded-[var(--radius-card)] border border-[var(--color-border)] card-shadow hover:border-[var(--color-brand-teal)] hover:card-shadow-hover transition-all p-6"
            >
              <div className="w-12 h-12 bg-[var(--color-brand-teal-light)] rounded-xl flex items-center justify-center mb-4 text-2xl">
                🔍
              </div>
              <h3 className="font-bold text-xl text-[var(--color-body)] mb-2 group-hover:text-[var(--color-brand-teal)] transition-colors">
                Hidden Opportunities Directory
              </h3>
              <p className="text-[var(--color-muted)] text-sm leading-relaxed mb-4">
                Apprenticeships, insight programmes, scholarships, mentoring, and competitions that most people discover too late — or never.
              </p>
              <span className="text-sm font-semibold text-[var(--color-brand-teal)] group-hover:underline">
                Find opportunities →
              </span>
            </Link>
          </div>

          <div className="flex flex-wrap justify-center gap-2">
            {HIDDEN_SUBCATEGORIES.map((sub) => (
              <Link
                key={sub.slug}
                href={`/hidden-opportunities/${sub.slug}`}
                className="text-xs font-medium bg-white border border-[var(--color-border)] text-[var(--color-muted)] hover:border-[var(--color-brand-teal)] hover:text-[var(--color-brand-teal)] px-3 py-1.5 rounded-full transition-colors"
              >
                {sub.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-[var(--color-brand-teal)] rounded-2xl p-8 md:p-12 text-white text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">Not sure where to start?</h2>
          <p className="text-teal-100 mb-6 max-w-md mx-auto">
            Download the Foundation Kit — the complete starting point for your career journey.
          </p>
          <Link
            href="/resources/foundation-kit"
            className="inline-flex items-center gap-2 px-6 py-3 bg-white text-[var(--color-brand-teal-dark)] font-bold rounded-lg hover:bg-teal-50 transition-colors"
          >
            ⬇ Download Foundation Kit — Free
          </Link>
        </div>
      </section>
    </>
  )
}
