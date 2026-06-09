'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const NAV_ITEMS = [
  { label: 'Beranda', href: '/' },
  { label: 'Tentang', href: '/about' },
  { label: 'Finalis', href: '/finalists' },
  { label: 'Hall of Fame', href: '/hall-of-fame' },
  { label: 'Prestasi', href: '/alumni-achievements' },
  { label: 'Galeri', href: '/gallery' },
  { label: 'Berita', href: '/news' },
  { label: 'Acara', href: '/events' },
]

export function Header() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-border/40 bg-white/80 backdrop-blur-lg">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2">
          <span className="font-display text-xl font-bold text-primary">
            Nyong Noni
          </span>
          <span className="hidden text-sm text-muted sm:inline">Sulawesi Utara</span>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-muted transition-colors hover:text-primary"
            >
              {item.label}
            </Link>
          ))}
          <Link href="/register">
            <Button>Daftar Sekarang</Button>
          </Link>
        </nav>

        <button
          className="md:hidden"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      <div
        className={cn(
          'border-t border-border/40 bg-white md:hidden',
          isOpen ? 'block' : 'hidden',
        )}
      >
        <nav className="flex flex-col space-y-2 px-4 py-4">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-lg px-3 py-2 text-sm font-medium text-muted transition-colors hover:bg-gray-50 hover:text-primary"
              onClick={() => setIsOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          <Link href="/register" onClick={() => setIsOpen(false)}>
            <Button className="w-full">Daftar Sekarang</Button>
          </Link>
        </nav>
      </div>
    </header>
  )
}
