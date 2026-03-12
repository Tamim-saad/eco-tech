import type { Metadata } from 'next'
import { Inter, Space_Grotesk } from 'next/font/google'
import './globals.css'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const spaceGrotesk = Space_Grotesk({ subsets: ['latin'], variable: '--font-space' })

export const metadata: Metadata = {
  title: 'NodiWatch - AI-Powered River Surveillance System for Bangladesh',
  description: 'AI-powered satellite surveillance detecting pollution, encroachment, and erosion in Bangladesh rivers using Sentinel-2, SAR, and advanced machine learning',
  keywords: 'NodiWatch, river monitoring, Bangladesh, pollution detection, AI surveillance, satellite imagery, river encroachment, erosion monitoring',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <head>
        <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
      </head>
      <body className={`${inter.className} flex flex-col min-h-screen antialiased`}>
        <Navigation />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
