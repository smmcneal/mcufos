import type { Metadata } from 'next'
import { Analytics } from '@vercel/analytics/react'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: {
    default: 'MCUFOS — Serial Killers, Cults & UFO Cases Database',
    template: '%s | MCUFOS',
  },
  description:
    'A comprehensive, sourced reference database of serial killers, cults, and UFO cases. Factual. Educational. Thoroughly documented.',
  metadataBase: new URL('https://mcufos.com'),
  openGraph: {
    siteName: 'MCUFOS',
    type: 'website',
  },
  verification: {
    google: 'ZOpwxS3qPV39sGCUNXTnbWlxdQXgbpLT4NEcOZOgo7c',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>
        <div className="site-wrapper" style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
          <Header />
          <main style={{ flex: 1 }}>
            {children}
          </main>
          <Footer />
          <Analytics />  
        </div>
      </body>
    </html>
  )
}
