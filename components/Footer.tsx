import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-[var(--color-dark-section-deep)] text-white mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo-white.png" alt="CareerGuide" className="h-9 w-auto mb-3" />
            <p className="text-slate-400 text-sm leading-relaxed max-w-xs">
              Free resources, courses, and opportunities to help young people become work-ready and navigate their career path with confidence.
            </p>
            <div className="flex gap-3 mt-4">
              <a
                href="https://www.instagram.com/careerguideuk"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-white transition-colors text-sm"
                aria-label="Instagram"
              >
                Instagram
              </a>
              <span className="text-slate-600">·</span>
              <a
                href="https://www.linkedin.com/company/careerguidenetwork/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-white transition-colors text-sm"
                aria-label="LinkedIn"
              >
                LinkedIn
              </a>
              <span className="text-slate-600">·</span>
              <a
                href="https://www.tiktok.com/@careerguidenetwork"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-white transition-colors text-sm"
                aria-label="TikTok"
              >
                TikTok
              </a>
            </div>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-3 uppercase tracking-wider">Resources</h3>
            <ul className="space-y-2">
              {[
                { href: '/resources', label: 'All Resources' },
                { href: '/resources/foundation-kit', label: 'Foundation Kit' },
                { href: '/resources/cv-booster-guide', label: 'CV Booster Guide' },
                { href: '/resources/interview-cheat-sheet', label: 'Interview Cheat Sheet' },
                { href: '/resources/ai-for-students-playbook', label: 'AI Playbook' },
              ].map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-slate-400 hover:text-white text-sm transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Directories */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-3 uppercase tracking-wider">Opportunities</h3>
            <ul className="space-y-2">
              {[
                { href: '/learning-directory', label: 'Learning Directory' },
                { href: '/hidden-opportunities/apprenticeships', label: 'Apprenticeships' },
                { href: '/hidden-opportunities/scholarships', label: 'Scholarships' },
                { href: '/hidden-opportunities/mentoring', label: 'Mentoring' },
                { href: '/hidden-opportunities/competitions', label: 'Competitions' },
              ].map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-slate-400 hover:text-white text-sm transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-10 pt-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <p className="text-slate-500 text-xs">
            © {new Date().getFullYear()} CareerGuide. All rights reserved.
          </p>
          <div className="flex gap-4">
            <Link href="/about" className="text-slate-500 hover:text-slate-300 text-xs transition-colors">About</Link>
            <Link href="/contact" className="text-slate-500 hover:text-slate-300 text-xs transition-colors">Contact</Link>
            <a href="https://www.careerguide.network" target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-slate-300 text-xs transition-colors">Main Website</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
