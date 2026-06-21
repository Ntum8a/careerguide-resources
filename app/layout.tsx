import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import './globals.css'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import CookieConsent from '@/components/CookieConsent'

const poppins = Poppins({ subsets: ['latin'], weight: ['400', '500', '600', '700', '800'], variable: '--font-sans' })

export const metadata: Metadata = {
  verification: {
    google: 'uU6LSqauAITlmBgMUAVWzgX9s_zKR7hcUh0B9QTtv8o',
  },
  title: {
    default: 'CareerGuide Resources — Free Career Tools for Young People',
    template: '%s | CareerGuide Resources',
  },
  description:
    'Free resources, guides, and directories to help young people become work-ready — CV templates, interview prep, apprenticeships, scholarships, and more.',
  metadataBase: new URL('https://resources.careerguide.network'),
  icons: {
    icon: '/logo-icon.png',
    apple: '/logo-icon.png',
  },
  openGraph: {
    siteName: 'CareerGuide Resources',
    locale: 'en_GB',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={poppins.variable}>
      <body>
        <Nav />
        <main>{children}</main>
        <Footer />
        <CookieConsent />
      </body>
    </html>
  )
}
