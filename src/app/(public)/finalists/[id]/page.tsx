import { notFound } from 'next/navigation'
import { getPublicFinalist } from '@/server/actions/finalists'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { MapPin, Cake, GraduationCap, Instagram, Ruler, Weight, Briefcase, Mail, Phone, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default async function FinalistDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const finalist = await getPublicFinalist(id)

  if (!finalist) notFound()

  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
      <Link href="/finalists" className="inline-flex items-center gap-1 text-sm text-muted hover:text-primary mb-6">
        <ArrowLeft className="h-4 w-4" /> Kembali ke Finalis
      </Link>

      <div className="grid gap-8 md:grid-cols-[1fr_2fr]">
        {/* Photo */}
        <Card className="overflow-hidden">
          <div className="aspect-[3/4] bg-gradient-to-br from-primary/10 to-gold/10 flex items-center justify-center">
            {finalist.photo_url ? (
              <img src={finalist.photo_url} alt={finalist.full_name} className="h-full w-full object-cover" />
            ) : (
              <span className="text-8xl font-display text-primary/20 font-bold">{finalist.full_name?.charAt(0)}</span>
            )}
          </div>
          <CardContent className="p-4 text-center">
            <Badge variant="gold" className="mb-2">Finalis {finalist.profile?.tahun || new Date().getFullYear()}</Badge>
            {finalist.instagram && (
              <a href={`https://instagram.com/${finalist.instagram.replace('@', '')}`} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-1 text-sm text-primary hover:underline mt-2">
                <Instagram className="h-4 w-4" /> {finalist.instagram}
              </a>
            )}
          </CardContent>
        </Card>

        {/* Info */}
        <div className="space-y-6">
          <div>
            <h1 className="font-display text-3xl font-bold text-dark">{finalist.full_name}</h1>
            <p className="text-muted mt-1">{finalist.occupation}</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-2 text-sm">
              <MapPin className="h-4 w-4 text-primary" />
              <div><span className="text-muted">Asal</span><p className="font-medium">{finalist.city}, {finalist.province}</p></div>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Cake className="h-4 w-4 text-primary" />
              <div><span className="text-muted">Umur</span><p className="font-medium">{finalist.umur} tahun</p></div>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <GraduationCap className="h-4 w-4 text-primary" />
              <div><span className="text-muted">Pendidikan</span><p className="font-medium">{finalist.education}</p></div>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Briefcase className="h-4 w-4 text-primary" />
              <div><span className="text-muted">Pekerjaan</span><p className="font-medium">{finalist.occupation}</p></div>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Ruler className="h-4 w-4 text-primary" />
              <div><span className="text-muted">Tinggi</span><p className="font-medium">{finalist.height_cm} cm</p></div>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Weight className="h-4 w-4 text-primary" />
              <div><span className="text-muted">Berat</span><p className="font-medium">{finalist.weight_kg} kg</p></div>
            </div>
          </div>

          <div className="border-t border-border pt-4">
            <h2 className="font-display text-lg font-semibold mb-2">Kontak</h2>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2"><Mail className="h-4 w-4 text-muted" /> {finalist.email}</div>
              <div className="flex items-center gap-2"><Phone className="h-4 w-4 text-muted" /> {finalist.phone}</div>
            </div>
          </div>

          {finalist.profile?.bio && (
            <div className="border-t border-border pt-4">
              <h2 className="font-display text-lg font-semibold mb-2">Tentang</h2>
              <p className="text-muted leading-relaxed">{finalist.profile.bio}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
