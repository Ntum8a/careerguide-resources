'use client'

import { useState } from 'react'

export default function NewsletterSignup() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email) return
    setStatus('loading')

    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, tags: ['resources-site'] }),
      })
      const data = await res.json()

      if (res.ok) {
        setStatus('success')
        setMessage(data.message === 'Already subscribed' ? "You're already on the list!" : "You're in — welcome to CareerGuide.")
        setEmail('')
      } else {
        setStatus('error')
        setMessage(data.error || 'Something went wrong. Please try again.')
      }
    } catch {
      setStatus('error')
      setMessage('Something went wrong. Please try again.')
    }
  }

  return (
    <section className="bg-[var(--color-dark-section-deep)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-xs font-bold uppercase tracking-widest text-[var(--color-accent)] mb-3">Stay in the loop</p>
          <h2 className="text-3xl md:text-4xl font-extrabold uppercase tracking-tight text-white mb-4">
            Free career tips & hidden opportunities — straight to your inbox
          </h2>
          <p className="text-white/55 mb-8 leading-relaxed">
            Join students getting weekly career advice, hidden opportunities, and resources — all free. No spam, unsubscribe any time.
          </p>

          {status === 'success' ? (
            <div className="inline-flex items-center gap-3 px-6 py-4 bg-[var(--color-accent)]/10 border border-[var(--color-accent)]/30 rounded-2xl text-[var(--color-accent)] font-semibold">
              <span className="text-xl">✓</span>
              {message}
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
                className="flex-1 px-5 py-3.5 rounded-full bg-white/10 border border-white/15 text-white placeholder:text-white/35 focus:outline-none focus:border-[var(--color-accent)] transition-colors text-sm"
              />
              <button
                type="submit"
                disabled={status === 'loading'}
                className="px-7 py-3.5 bg-[var(--color-accent)] text-[var(--color-dark-section-deep)] font-bold rounded-full hover:opacity-90 transition-opacity text-sm uppercase tracking-wide disabled:opacity-60 shrink-0"
              >
                {status === 'loading' ? 'Subscribing…' : 'Subscribe Free'}
              </button>
            </form>
          )}

          {status === 'error' && (
            <p className="mt-3 text-sm text-red-400">{message}</p>
          )}

          <p className="text-white/30 text-xs mt-5">
            By subscribing you agree to our{' '}
            <a href="https://www.careerguide.network/privacy" className="underline hover:text-white/60 transition-colors">Privacy Policy</a>.
            Unsubscribe any time.
          </p>
        </div>
      </div>
    </section>
  )
}
