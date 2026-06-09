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
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  return (
    <>
      <a href="#main-content" className="skip-link">
        Langsung ke konten
      </a>

      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          scrolled
            ? 'bg-white/90 backdrop-blur-xl border-b border-gray-200/60 shadow-sm'
            : 'bg-white/0 border-b border-transparent',
        )}
      >
        <div className="mx-auto flex h-[4.5rem] max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gold text-white text-xs font-bold font-display tracking-wider shadow-sm transition-transform group-hover:scale-105">
              NN
            </div>
            <div className="flex flex-col">
              <span className="font-display text-lg font-bold text-ocean leading-tight">
                Nyong Noni
              </span>
              <span className="text-[10px] font-medium tracking-[0.15em] uppercase text-gold-dark leading-tight -mt-0.5">
                Sulawesi Utara
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
                    'relative px-3 py-2 text-sm font-medium rounded-lg transition-colors',
                    isActive
                      ? 'text-primary bg-primary/5'
                      : 'text-gray-600 hover:text-primary hover:bg-gray-50',
                  )}
                  aria-current={isActive ? 'page' : undefined}
                >
                  {item.label}
                </Link>
              )
            })}
            <div className="ml-3 pl-3 border-l border-gray-200">
              <Link href="/register">
                <Button variant="gold" className="shadow-sm">
                  Daftar Sekarang
                </Button>
              </Link>
            </div>
          </nav>

          <button
            className="md:hidden relative z-50 flex h-10 w-10 items-center justify-center rounded-lg hover:bg-gray-100 transition-colors"
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
            'fixed inset-0 z-40 bg-white md:hidden transition-transform duration-300 pt-[4.5rem]',
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
                    'rounded-xl px-4 py-3.5 text-base font-medium transition-colors',
                    isActive
                      ? 'text-primary bg-primary/5 border border-primary/10'
                      : 'text-gray-700 hover:bg-gray-50',
                  )}
                  aria-current={isActive ? 'page' : undefined}
                >
                  {item.label}
                </Link>
              )
            })}
            <div className="pt-4 mt-4 border-t border-gray-100">
              <Link href="/register" onClick={() => setIsOpen(false)}>
                <Button variant="gold" className="w-full text-base py-3.5">
                  Daftar Sekarang
                </Button>
              </Link>
            </div>
          </nav>
        </div>
      </header>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/20 md:hidden"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}
    </>
  )
}
