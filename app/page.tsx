import Link from 'next/link'
import ResourceCard from '@/components/ResourceCard'
import { getFeaturedResources, getResources, HIDDEN_SUBCATEGORIES } from '@/lib/content'

export default function HomePage() {
  const featured = getFeaturedResources()
  const allResources = getResources()

  return (
    <>
      {/* Hero — full viewport height */}
      <section className="relative min-h-[92vh] flex items-center bg-[var(--color-dark-section-deep)] overflow-hidden">
        {/* Background gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-dark-section-deep)] via-[var(--color-dark-section)] to-[var(--color-brand)] opacity-90" />
        {/* Subtle geometric accent */}
        <div className="absolute right-0 top-0 w-1/2 h-full opacity-10"
          style={{ background: 'radial-gradient(ellipse at 80% 20%, #4BFFBB 0%, transparent 60%)' }} />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 w-full">
          <div className="max-w-3xl">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-white/10 text-[var(--color-accent)] mb-6 uppercase tracking-widest">
              Free for every student
            </span>
            <h1 className="text-5xl md:text-7xl font-extrabold leading-none mb-6 uppercase tracking-tight text-white">
              Everything you need to{' '}
              <span className="text-[var(--color-accent)]">launch your career</span>
            </h1>
            <p className="text-lg md:text-xl text-white/70 leading-relaxed mb-10 max-w-xl">
              Free guides, CV templates, interview prep, and directories of opportunities that most people never find. No paywalls. No sign-up required.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href="/resources"
                className="inline-flex items-center justify-center px-8 py-4 bg-[var(--color-accent)] text-[var(--color-dark-section-deep)] font-bold rounded-full hover:opacity-90 transition-opacity text-sm uppercase tracking-wide"
              >
                Browse Free Resources
              </Link>
              <Link
                href="/hidden-opportunities"
                className="inline-flex items-center justify-center px-8 py-4 border-2 border-white/30 text-white font-semibold rounded-full hover:bg-white/10 transition-colors text-sm uppercase tracking-wide"
              >
                Find Hidden Opportunities
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <section className="bg-[var(--color-dark-section)] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-wrap justify-center md:justify-start gap-10">
            {[
              { value: '8', label: 'Free Resources' },
              { value: '10+', label: 'Learning Courses' },
              { value: '60+', label: 'Opportunities Listed' },
              { value: '100%', label: 'Free to Access' },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl font-extrabold text-[var(--color-accent)]">{stat.value}</div>
                <div className="text-xs text-white/50 font-medium uppercase tracking-wider mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Resources */}
      <section className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-[var(--color-brand)] mb-2">Most Popular</p>
              <h2 className="text-3xl md:text-4xl font-extrabold text-[var(--color-body)] uppercase tracking-tight">Start here</h2>
            </div>
            <Link href="/resources" className="text-sm font-semibold text-[var(--color-brand)] hover:underline shrink-0">
              Browse all {allResources.length} →
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {featured.map((resource) => (
              <ResourceCard key={resource.slug} resource={resource} featured />
            ))}
          </div>
        </div>
      </section>

      {/* Directory signposts — dark section */}
      <section className="bg-[var(--color-dark-section-deep)] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center mb-12">
            <p className="text-xs font-bold uppercase tracking-widest text-[var(--color-accent)] mb-2">Curated Directories</p>
            <h2 className="text-3xl md:text-4xl font-extrabold uppercase tracking-tight">Explore opportunities</h2>
            <p className="text-white/60 mt-3 max-w-xl mx-auto">
              Two curated directories of opportunities most young people never know about.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
            <Link
              href="/learning-directory"
              className="group bg-white/5 border border-white/10 rounded-2xl hover:border-[var(--color-accent)]/50 hover:bg-white/10 transition-all p-8"
            >
              <div className="w-12 h-12 bg-[var(--color-accent)]/10 rounded-xl flex items-center justify-center mb-5 text-2xl">
                📚
              </div>
              <h3 className="font-extrabold text-xl text-white mb-2 uppercase tracking-tight group-hover:text-[var(--color-accent)] transition-colors">
                Free &amp; Low-Cost Learning Directory
              </h3>
              <p className="text-white/50 text-sm leading-relaxed mb-5">
                Curated courses and learning programmes — Google, freeCodeCamp, Barclays LifeSkills, and more. All free or affordable.
              </p>
              <span className="text-sm font-semibold text-[var(--color-accent)]">
                Browse courses →
              </span>
            </Link>

            <Link
              href="/hidden-opportunities"
              className="group bg-white/5 border border-white/10 rounded-2xl hover:border-[var(--color-accent)]/50 hover:bg-white/10 transition-all p-8"
            >
              <div className="w-12 h-12 bg-[var(--color-accent)]/10 rounded-xl flex items-center justify-center mb-5 text-2xl">
                🔍
              </div>
              <h3 className="font-extrabold text-xl text-white mb-2 uppercase tracking-tight group-hover:text-[var(--color-accent)] transition-colors">
                Hidden Opportunities Directory
              </h3>
              <p className="text-white/50 text-sm leading-relaxed mb-5">
                Apprenticeships, insight programmes, scholarships, mentoring, and competitions that most people discover too late — or never.
              </p>
              <span className="text-sm font-semibold text-[var(--color-accent)]">
                Find opportunities →
              </span>
            </Link>
          </div>

          <div className="flex flex-wrap justify-center gap-2">
            {HIDDEN_SUBCATEGORIES.map((sub) => (
              <Link
                key={sub.slug}
                href={`/hidden-opportunities/${sub.slug}`}
                className="text-xs font-semibold bg-white/5 border border-white/10 text-white/60 hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] px-4 py-2 rounded-full transition-colors uppercase tracking-wide"
              >
                {sub.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[var(--color-dark-section)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <p className="text-xs font-bold uppercase tracking-widest text-[var(--color-accent)] mb-3">Not sure where to start?</p>
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4 uppercase tracking-tight">Download the Foundation Kit</h2>
          <p className="text-white/60 mb-8 max-w-md mx-auto">
            The complete starting point for your career journey — free, instant download.
          </p>
          <Link
            href="/resources/foundation-kit"
            className="inline-flex items-center gap-2 px-8 py-4 bg-[var(--color-accent)] text-[var(--color-dark-section-deep)] font-bold rounded-full hover:opacity-90 transition-opacity uppercase tracking-wide text-sm"
          >
            ⬇ Download Free
          </Link>
        </div>
      </section>
    </>
  )
}
