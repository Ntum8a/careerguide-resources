'use client'

import { useEffect, useState } from 'react'

const GA_ID = 'G-095QE579VN'

function loadGA() {
  if (document.getElementById('ga4-script')) return
  const s = document.createElement('script')
  s.id = 'ga4-script'
  s.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`
  s.async = true
  document.head.appendChild(s)
  ;(window as unknown as Record<string, unknown[]>).dataLayer = (window as unknown as Record<string, unknown[]>).dataLayer || []
  function gtag(...args: unknown[]) { ((window as unknown as Record<string, unknown[]>).dataLayer as unknown[]).push(args) }
  gtag('js', new Date())
  gtag('config', GA_ID)
}

export default function CookieConsent() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent')
    if (consent === 'accepted') {
      loadGA()
    } else if (!consent) {
      setVisible(true)
    }
  }, [])

  function accept() {
    localStorage.setItem('cookie-consent', 'accepted')
    setVisible(false)
    loadGA()
  }

  function decline() {
    localStorage.setItem('cookie-consent', 'declined')
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 sm:p-6">
      <div className="max-w-4xl mx-auto bg-[var(--color-dark-section-deep)] border border-white/10 rounded-2xl shadow-2xl px-6 py-5 flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <p className="text-white/70 text-sm leading-relaxed flex-1">
          We use cookies to understand how visitors use our site (Google Analytics) and to improve your experience. No personal data is sold.{' '}
          <a href="https://www.careerguide.network/privacy" className="text-[var(--color-accent)] underline hover:opacity-80 transition-opacity">Privacy Policy</a>
        </p>
        <div className="flex gap-3 shrink-0">
          <button
            onClick={decline}
            className="px-5 py-2.5 rounded-full border border-white/20 text-white/60 hover:text-white hover:border-white/40 text-sm font-semibold transition-all duration-200"
          >
            Decline
          </button>
          <button
            onClick={accept}
            className="px-5 py-2.5 rounded-full bg-[var(--color-accent)] text-[var(--color-dark-section-deep)] font-bold text-sm hover:opacity-90 transition-opacity"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  )
}
