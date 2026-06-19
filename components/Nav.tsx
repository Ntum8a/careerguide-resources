'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

const links = [
  { href: '/', label: 'Home' },
  { href: '/resources', label: 'Resources' },
  { href: '/learning-directory', label: 'Learning' },
  { href: '/hidden-opportunities', label: 'Opportunities' },
  { href: '/about', label: 'About' },
]

export default function Nav() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href)

  return (
    <header className="sticky top-0 z-50 bg-[var(--color-dark-section-deep)] border-b border-white/10">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 shrink-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo-icon.png" alt="CareerGuide" className="h-10 w-auto" />
            <span className="hidden md:inline text-xs font-semibold bg-white/10 text-[var(--color-accent)] px-2 py-0.5 rounded-full">
              Resources
            </span>
          </Link>

          {/* Desktop links */}
          <div className="hidden lg:flex items-center gap-1">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isActive(link.href)
                    ? 'bg-white/15 text-[var(--color-accent)]'
                    : 'text-white/70 hover:text-white hover:bg-white/10'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Contact CTA */}
          <div className="hidden lg:block">
            <Link
              href="/contact"
              className="px-4 py-2 rounded-full text-sm font-semibold bg-white text-[var(--color-dark-section-deep)] hover:bg-[var(--color-accent)] transition-colors"
            >
              Contact
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            className="lg:hidden p-2 rounded-lg text-white/70 hover:text-white hover:bg-white/10"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {open ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile menu */}
        {open && (
          <div className="lg:hidden pb-4 border-t border-white/10 mt-0 pt-2">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={`block px-3 py-2.5 rounded-lg text-sm font-medium mb-1 transition-colors ${
                  isActive(link.href)
                    ? 'bg-white/15 text-[var(--color-accent)]'
                    : 'text-white/70 hover:text-white hover:bg-white/10'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/contact"
              onClick={() => setOpen(false)}
              className="block mt-3 px-3 py-2.5 rounded-full text-sm font-semibold bg-white text-[var(--color-dark-section-deep)] text-center"
            >
              Contact
            </Link>
          </div>
        )}
      </nav>
    </header>
  )
}
