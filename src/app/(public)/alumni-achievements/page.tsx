import { getAlumniAchievements } from '@/server/actions/finalists'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Trophy, Instagram, Search } from 'lucide-react'

const ACHIEVEMENT_COLORS: Record<string, 'default' | 'gold' | 'success' | 'secondary'> = {
  'ASN': 'default',
  'Dokter': 'success',
  'Pengusaha': 'gold',
  'Influencer': 'secondary',
  'Duta Nasional': 'default',
}

export default async function AlumniAchievementsPage({
  searchParams,
}: {
  searchParams: Promise<{ type?: string }>
}) {
  const params = await searchParams
  const achievements = await getAlumniAchievements().catch(() => []) as any[]

  const types = [...new Set(achievements.map((a: any) => a.achievement_type))]

  const filtered = params.type
    ? achievements.filter((a: any) => a.achievement_type === params.type)
    : achievements

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mb-12 text-center">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Trophy className="h-8 w-8 text-gold" />
          <h1 className="font-display text-4xl font-bold text-dark">Prestasi Alumni</h1>
          <Trophy className="h-8 w-8 text-gold" />
        </div>
        <p className="text-muted">Alumni Nyong Noni Sulawesi Utara yang berhasil di berbagai bidang</p>
      </div>

      {/* Filter badges */}
      <div className="flex flex-wrap gap-2 mb-8 justify-center">
        <form>
          <button
            type="submit"
            name="type"
            value=""
            className="rounded-full border border-border px-4 py-1.5 text-sm hover:bg-gray-50 transition-colors"
          >
            Semua
          </button>
        </form>
        {types.map((t) => (
          <form key={t}>
            <button
              type="submit"
              name="type"
              value={t}
              className={`rounded-full border px-4 py-1.5 text-sm transition-colors ${
                params.type === t
                  ? 'bg-primary text-white border-primary'
                  : 'border-border hover:bg-gray-50'
              }`}
            >
              {t}
            </button>
          </form>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="py-20 text-center text-muted">Belum ada data prestasi alumni</div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((a: any) => (
            <Card key={a.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="h-14 w-14 rounded-full bg-gradient-to-br from-primary/10 to-gold/10 flex items-center justify-center flex-shrink-0">
                    <span className="text-xl font-display font-bold text-primary">{a.alumni_name.charAt(0)}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-display font-semibold">{a.alumni_name}</h3>
                    <Badge variant={ACHIEVEMENT_COLORS[a.achievement_type] || 'default'} className="mt-1">
                      {a.achievement_type}
                    </Badge>
                    <p className="text-sm text-muted mt-2">{a.description}</p>
                    <div className="flex items-center gap-3 mt-3 text-xs text-muted">
                      <span>{a.tahun}</span>
                      {a.instagram && (
                        <a href={`https://instagram.com/${a.instagram.replace('@', '')}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-primary hover:underline">
                          <Instagram className="h-3 w-3" /> {a.instagram}
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
