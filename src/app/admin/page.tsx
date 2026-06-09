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
      <h1 className="font-display text-2xl font-bold text-dark mb-6">Dashboard</h1>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {adminLinks.map((link) => {
          const Icon = link.icon
          return (
            <Link key={link.href} href={link.href}>
              <Card className="transition-all hover:shadow-md hover:-translate-y-0.5 cursor-pointer">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-muted">
                    {link.label}
                  </CardTitle>
                  <Icon className={`h-4 w-4 ${link.color}`} />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{link.value}</div>
                  <p className="text-xs text-muted mt-1">{link.detail}</p>
                </CardContent>
              </Card>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
