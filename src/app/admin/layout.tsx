'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import {
  LayoutDashboard,
  Users,
  UserCheck,
  Newspaper,
  Image,
  Calendar,
  Crown,
  Trophy,
  Award,
  LogOut,
  Menu,
  X,
} from 'lucide-react'
import { useState } from 'react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { createClient } from '@/lib/supabase/client'

const SIDEBAR_ITEMS = [
  { label: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { label: 'Pendaftar', href: '/admin/applicants', icon: Users },
  { label: 'Finalis', href: '/admin/finalists', icon: UserCheck },
  { label: 'Titleholders', href: '/admin/titleholders', icon: Crown },
  { label: 'Hall of Fame', href: '/admin/hall-of-fame', icon: Trophy },
  { label: 'Prestasi Alumni', href: '/admin/alumni-achievements', icon: Award },
  { label: 'Berita', href: '/admin/news', icon: Newspaper },
  { label: 'Galeri', href: '/admin/gallery', icon: Image },
  { label: 'Acara', href: '/admin/events', icon: Calendar },
]

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const router = useRouter()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const supabase = createClient()

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/admin/login')
  }

  return (
    <div className="flex min-h-screen bg-canvas">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-hairline bg-surface-2 transition-transform duration-200 lg:static lg:translate-x-0',
          sidebarOpen ? 'translate-x-0' : '-translate-x-full',
        )}
      >
        <div className="flex h-16 shrink-0 items-center justify-between border-b border-hairline px-6">
          <Link href="/admin" className="text-headline text-ink">
            Admin Panel
          </Link>
          <button
            className="lg:hidden text-ink-muted hover:text-ink"
            onClick={() => setSidebarOpen(false)}
            aria-label="Close sidebar"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto p-3 space-y-0.5">
          {SIDEBAR_ITEMS.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
                  isActive
                    ? 'bg-accent-blue/10 text-accent-blue'
                    : 'text-ink-muted hover:bg-surface-1 hover:text-ink',
                )}
                onClick={() => setSidebarOpen(false)}
              >
                <Icon className="h-4 w-4 shrink-0" />
                {item.label}
              </Link>
            )
          })}
        </nav>

        <div className="shrink-0 border-t border-hairline p-3 space-y-1">
          <Button
            variant="ghost"
            className="w-full justify-start text-ink-muted hover:text-ink"
            onClick={handleLogout}
          >
            <LogOut className="mr-2 h-4 w-4" />
            Keluar
          </Button>
          <Link
            href="/"
            className="flex items-center gap-2 rounded-lg px-3 py-2 text-xs text-ink-muted hover:bg-surface-1 hover:text-ink transition-colors"
          >
            &larr; Kembali ke Website
          </Link>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex h-16 shrink-0 items-center justify-between border-b border-hairline bg-surface-2 px-6">
          <button
            className="lg:hidden text-ink-muted hover:text-ink"
            onClick={() => setSidebarOpen(true)}
            aria-label="Open sidebar"
          >
            <Menu className="h-5 w-5" />
          </button>
          <div className="text-body-sm text-ink-muted">Nyong Noni Sulut Admin</div>
        </header>

        <main className="flex-1 p-6 lg:p-8">{children}</main>
      </div>
    </div>
  )
}
