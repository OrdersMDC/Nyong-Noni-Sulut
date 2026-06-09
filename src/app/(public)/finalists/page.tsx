import { getPublicFinalists } from '@/server/actions/finalists'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Instagram, MapPin, GraduationCap, Cake, ExternalLink } from 'lucide-react'

export default async function FinalistsPage() {
  const finalists = await getPublicFinalists().catch(() => [])

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mb-12 text-center">
        <h1 className="font-display text-4xl font-bold text-dark">Para Finalis</h1>
        <p className="mt-2 text-muted">
          Mengenal lebih dekat para finalis Nyong Noni Sulawesi Utara {new Date().getFullYear()}
        </p>
      </div>

      {finalists.length === 0 ? (
        <div className="py-20 text-center">
          <p className="text-lg text-muted">
            Belum ada finalis yang diumumkan. Pantau terus informasi terbaru dari kami.
          </p>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {finalists.map((f: any) => (
            <Link key={f.id} href={`/finalists/${f.id}`} className="group">
              <Card className="overflow-hidden transition-all hover:shadow-lg hover:-translate-y-1">
                <div className="aspect-[3/4] overflow-hidden bg-gradient-to-br from-primary/10 to-gold/10 flex items-center justify-center relative">
                  {f.photo_url ? (
                    <img src={f.photo_url} alt={f.full_name} className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  ) : (
                    <span className="text-6xl font-display text-primary/30 font-bold">{f.full_name?.charAt(0)}</span>
                  )}
                  <Badge className="absolute top-3 right-3" variant="gold">Finalis</Badge>
                </div>
                <CardContent className="p-4 space-y-2">
                  <h3 className="font-display text-lg font-semibold group-hover:text-primary transition-colors">{f.full_name}</h3>
                  <div className="flex items-center gap-1.5 text-sm text-muted">
                    <MapPin className="h-3.5 w-3.5" />
                    <span>{f.city}, {f.province}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-sm text-muted">
                    <Cake className="h-3.5 w-3.5" />
                    <span>{f.umur} tahun</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-sm text-muted">
                    <GraduationCap className="h-3.5 w-3.5" />
                    <span>{f.education}</span>
                  </div>
                  {f.instagram && (
                    <div className="flex items-center gap-1.5 text-sm text-muted">
                      <Instagram className="h-3.5 w-3.5" />
                      <span>{f.instagram}</span>
                    </div>
                  )}
                  <div className="pt-2 flex items-center gap-1 text-xs text-primary font-medium">
                    Lihat Profil <ExternalLink className="h-3 w-3" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
