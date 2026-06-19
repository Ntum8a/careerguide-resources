import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' })

export const metadata: Metadata = {
  title: {
    default: 'CareerGuide Resources — Free Career Tools for Young People',
    template: '%s | CareerGuide Resources',
  },
  description:
    'Free resources, guides, and directories to help young people become work-ready — CV templates, interview prep, apprenticeships, scholarships, and more.',
  metadataBase: new URL('https://resources.careerguide.network'),
  openGraph: {
    siteName: 'CareerGuide Resources',
    locale: 'en_GB',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body>
        <Nav />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
