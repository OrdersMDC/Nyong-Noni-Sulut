import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Nyong Noni Sulawesi Utara - Official Portal',
  description:
    'Portal resmi pemilihan Nyong Noni Sulawesi Utara. Temukan informasi terbaru tentang finalis, galeri, berita, dan acara.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="id" className={inter.variable}>
      <body className="min-h-screen bg-canvas text-ink font-sans antialiased">
        {children}
      </body>
    </html>
  )
}
