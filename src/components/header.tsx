'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'
import { Menu, X, ChevronDown } from 'lucide-react'
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
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  return (
    <>
      <a href="#main-content" className="absolute -top-10 left-0 z-[100] bg-surface-1 px-4 py-2 text-button text-ink transition-all focus:top-0">
        Langsung ke konten
      </a>

      <header className="fixed top-0 left-0 right-0 z-50 bg-canvas border-b border-hairline transition-all duration-300">
        <div className="mx-auto flex h-[56px] max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-3 group active-scale">
            <div className="flex flex-col">
              <span className="text-body-sm font-bold text-ink leading-tight">
                Nyong Noni Sulut
              </span>
            </div>
          </Link>

          <nav className="hidden items-center gap-1 md:flex" aria-label="Navigasi utama">
            {NAV_ITEMS.map((item) => {
              const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href))
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'relative px-3 py-2 text-body-sm rounded-xs interactive-hover',
                    isActive
                      ? 'text-ink bg-surface-1'
                      : 'text-ink-muted hover:text-ink hover:bg-surface-1',
                  )}
                  aria-current={isActive ? 'page' : undefined}
                >
                  {item.label}
                </Link>
              )
            })}
            <div className="ml-3 pl-3 border-l border-hairline flex gap-2">
              <Link href="/login">
                <Button variant="secondary">Masuk</Button>
              </Link>
              <Link href="/register">
                <Button variant="primary">Daftar Sekarang</Button>
              </Link>
            </div>
          </nav>

          <button
            className="md:hidden relative z-50 flex h-10 w-10 items-center justify-center rounded-full bg-surface-1 text-ink interactive-hover"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? 'Tutup menu' : 'Buka menu'}
            aria-expanded={isOpen}
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {/* Mobile nav */}
        <div
          className={cn(
            'fixed inset-0 z-40 bg-canvas md:hidden transition-transform duration-[400ms] ease-[var(--ease-drawer)] pt-[56px]',
            isOpen ? 'translate-x-0' : 'translate-x-full',
          )}
          aria-hidden={!isOpen}
        >
          <nav className="flex flex-col px-4 py-6 space-y-1" aria-label="Navigasi mobile">
            {NAV_ITEMS.map((item) => {
              const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href))
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'rounded-md px-4 py-3.5 text-body-sm interactive-hover',
                    isActive
                      ? 'text-ink bg-surface-1'
                      : 'text-ink-muted hover:text-ink hover:bg-surface-1',
                  )}
                  aria-current={isActive ? 'page' : undefined}
                >
                  {item.label}
                </Link>
              )
            })}
            <div className="pt-4 mt-4 border-t border-hairline flex flex-col gap-2">
              <Link href="/login" onClick={() => setIsOpen(false)}>
                <Button variant="secondary" className="w-full">
                  Masuk
                </Button>
              </Link>
              <Link href="/register" onClick={() => setIsOpen(false)}>
                <Button variant="primary" className="w-full">
                  Daftar Sekarang
                </Button>
              </Link>
            </div>
          </nav>
        </div>
      </header>
    </>
  )
}
