'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

const links = [
  { href: '/', label: 'Home' },
  { href: '/resources', label: 'Resources' },
  { href: '/learning-directory', label: 'Learning Directory' },
  { href: '/hidden-opportunities', label: 'Hidden Opportunities' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
]

export default function Nav() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href)

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-[var(--color-border)]">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <span className="text-[var(--color-brand-teal)] font-bold text-xl tracking-tight">
              CareerGuide
            </span>
            <span className="hidden sm:inline text-xs text-[var(--color-muted)] font-medium bg-[var(--color-brand-teal-light)] text-[var(--color-brand-teal-dark)] px-2 py-0.5 rounded-full">
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
                    ? 'bg-[var(--color-brand-teal-light)] text-[var(--color-brand-teal-dark)]'
                    : 'text-[var(--color-muted)] hover:text-[var(--color-body)] hover:bg-[var(--color-surface)]'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Mobile hamburger */}
          <button
            className="lg:hidden p-2 rounded-lg text-[var(--color-muted)] hover:bg-[var(--color-surface)]"
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
          <div className="lg:hidden pb-4 border-t border-[var(--color-border)] mt-0 pt-2">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={`block px-3 py-2.5 rounded-lg text-sm font-medium mb-1 transition-colors ${
                  isActive(link.href)
                    ? 'bg-[var(--color-brand-teal-light)] text-[var(--color-brand-teal-dark)]'
                    : 'text-[var(--color-body)] hover:bg-[var(--color-surface)]'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        )}
      </nav>
    </header>
  )
}
