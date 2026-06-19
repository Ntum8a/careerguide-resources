import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'About',
  description: 'Why CareerGuide built this free resource library — and what we believe about helping young people get work-ready.',
}

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="mb-12">
        <h1 className="text-3xl md:text-4xl font-extrabold text-[var(--color-body)] mb-4">
          About CareerGuide Resources
        </h1>
        <p className="text-xl text-[var(--color-muted)] leading-relaxed">
          Free tools, honest information, and real opportunities — for every young person, regardless of background.
        </p>
      </div>

      <div className="prose max-w-none space-y-8">
        <div className="bg-[var(--color-surface)] rounded-xl p-6 border border-[var(--color-border)]">
          <h2 className="text-xl font-bold text-[var(--color-body)] mb-3">Why this exists</h2>
          <p className="text-[var(--color-muted)] leading-relaxed">
            CareerGuide was created to give early talent the knowledge, experience, and high-quality career training that too many young people never get access to — particularly those without networks, connections, or family experience of professional careers.
          </p>
          <p className="text-[var(--color-muted)] leading-relaxed mt-3">
            This resource library is the free, open part of that mission. No paywalls. No sign-up walls. Just the tools and information you need to take your next step.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-bold text-[var(--color-body)] mb-4">What you&apos;ll find here</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              {
                icon: '📄',
                title: 'Free Resources',
                desc: '7 guides covering CVs, cover letters, interview prep, pay, and AI — all downloadable instantly.',
                href: '/resources',
              },
              {
                icon: '📚',
                title: 'Learning Directory',
                desc: 'Curated free and affordable courses from providers like Google, LinkedIn Learning, and freeCodeCamp.',
                href: '/learning-directory',
              },
              {
                icon: '🔍',
                title: 'Hidden Opportunities',
                desc: 'Apprenticeships, insight days, scholarships, competitions, and mentoring that most people never find.',
                href: '/hidden-opportunities',
              },
            ].map((item) => (
              <Link
                key={item.title}
                href={item.href}
                className="group bg-white border border-[var(--color-border)] rounded-xl p-5 card-shadow hover:border-[var(--color-brand-teal)] transition-all"
              >
                <div className="text-2xl mb-2">{item.icon}</div>
                <h3 className="font-bold text-[var(--color-body)] mb-1 group-hover:text-[var(--color-brand-teal)] transition-colors">
                  {item.title}
                </h3>
                <p className="text-sm text-[var(--color-muted)] leading-relaxed">{item.desc}</p>
              </Link>
            ))}
          </div>
        </div>

        <div className="bg-[var(--color-brand-teal-light)] rounded-xl p-6 border border-[var(--color-brand-teal)]/20">
          <h2 className="text-xl font-bold text-[var(--color-brand-teal-dark)] mb-2">From the founder</h2>
          <blockquote className="text-[var(--color-brand-teal-dark)] leading-relaxed italic">
            &ldquo;CareerGuide was created to give early talent the knowledge, experience, and high-quality career training I wish I had earlier, helping them build strong foundations and maximise their chances of success.&rdquo;
          </blockquote>
          <p className="text-sm font-semibold text-[var(--color-brand-teal-dark)] mt-3">
            — Jerome Ntumba, Founder &amp; CEO, CareerGuide
          </p>
        </div>

        <div>
          <h2 className="text-xl font-bold text-[var(--color-body)] mb-3">Our main website</h2>
          <p className="text-[var(--color-muted)] leading-relaxed">
            This is the free student-facing resource library. Our main website — where we work directly with schools, colleges, and employers — is at{' '}
            <a
              href="https://www.careerguide.network"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--color-brand-teal)] font-semibold hover:underline"
            >
              www.careerguide.network
            </a>
            .
          </p>
        </div>

        <div>
          <h2 className="text-xl font-bold text-[var(--color-body)] mb-3">A note on the directory</h2>
          <p className="text-sm text-[var(--color-muted)] leading-relaxed">
            All listings in our directories are manually curated and verified quarterly. We don&apos;t earn from outbound links — we list opportunities because they&apos;re genuinely valuable, not because anyone paid to be listed. Always do your own research before applying.
          </p>
        </div>
      </div>

      <div className="mt-12 flex flex-col sm:flex-row gap-3">
        <Link
          href="/resources"
          className="inline-flex items-center justify-center px-6 py-3 bg-[var(--color-brand-teal)] text-white font-bold rounded-lg hover:bg-[var(--color-brand-teal-dark)] transition-colors text-sm"
        >
          Browse Free Resources
        </Link>
        <Link
          href="/contact"
          className="inline-flex items-center justify-center px-6 py-3 border border-[var(--color-border)] text-[var(--color-body)] font-semibold rounded-lg hover:bg-[var(--color-surface)] transition-colors text-sm"
        >
          Get in touch
        </Link>
      </div>
    </div>
  )
}
