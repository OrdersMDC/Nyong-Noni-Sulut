import { getApplicantStats } from '@/server/actions/applicants'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Users, UserCheck, Newspaper, Calendar } from 'lucide-react'
import Link from 'next/link'

export default async function AdminDashboard() {
  const stats = await getApplicantStats().catch(() => ({
    total: 0, pending: 0, verified: 0, rejected: 0, finalist: 0,
  }))

  const adminLinks = [
    {
      label: 'Pendaftar',
      value: stats.total,
      icon: Users,
      color: 'text-blue-600',
      href: '/admin/applicants',
      detail: `${stats.pending} pending`,
    },
    {
      label: 'Finalis',
      value: stats.finalist,
      icon: UserCheck,
      color: 'text-gold',
      href: '/admin/finalists',
      detail: `${stats.verified} terverifikasi`,
    },
    {
      label: 'Berita',
      value: '0',
      icon: Newspaper,
      color: 'text-green-600',
      href: '/admin/news',
      detail: 'kelola berita',
    },
    {
      label: 'Acara',
      value: '0',
      icon: Calendar,
      color: 'text-purple-600',
      href: '/admin/events',
      detail: 'kelola acara',
    },
  ]

  return (
    <div>
      <h1 className="text-display-md text-ink mb-8">Dashboard</h1>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {adminLinks.map((link) => {
          const Icon = link.icon
          return (
            <Link key={link.href} href={link.href}>
              <div className="rounded-xl border border-hairline bg-surface-2 p-5 transition-all hover:-translate-y-0.5 hover:shadow-md cursor-pointer">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-caption text-ink-muted uppercase tracking-widest">
                    {link.label}
                  </span>
                  <Icon className={`h-5 w-5 ${link.color}`} />
                </div>
                <div className="text-display-md text-ink">{link.value}</div>
                <p className="text-body-sm text-ink-muted mt-1">{link.detail}</p>
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
