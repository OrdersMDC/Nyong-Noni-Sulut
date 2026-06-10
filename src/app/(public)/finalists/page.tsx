import { getPublicFinalists } from '@/server/actions/finalists'
import Link from 'next/link'
import { Instagram, MapPin, GraduationCap, Cake, ExternalLink } from 'lucide-react'

export default async function FinalistsPage() {
  const finalists = await getPublicFinalists().catch(() => [])

  return (
    <div className="bg-canvas min-h-screen pb-[120px]">
      <section className="relative flex flex-col items-center justify-center pt-[180px] pb-[96px] px-[20px] text-center border-b border-hairline">
        <div className="max-w-4xl mx-auto">
          <p className="text-caption text-ink-muted uppercase tracking-widest mb-4">Finalis</p>
          <h1 className="text-display-xl text-ink tracking-tighter mb-8 animate-fade-in">
            Para <br />
            <span className="text-accent-magenta">Kandidat</span>
          </h1>
          <p className="text-subhead text-ink-muted max-w-2xl mx-auto">
            Mengenal lebih dekat para finalis Nyong Noni Sulawesi Utara {new Date().getFullYear()}
          </p>
        </div>
      </section>

      <section className="py-[96px] bg-surface-1">
        <div className="mx-auto max-w-7xl px-[20px]">
          {finalists.length === 0 ? (
            <div className="py-20 text-center">
              <p className="text-body-lg text-ink-muted">
                Belum ada finalis yang diumumkan. Pantau terus informasi terbaru dari kami.
              </p>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {finalists.map((f: any) => (
                <Link key={f.id} href={`/finalists/${f.id}`} className="group active-scale block">
                  <div className="product-mockup-tile overflow-hidden p-0 h-full flex flex-col interactive-hover">
                    <div className="aspect-[3/4] overflow-hidden bg-surface-2 flex items-center justify-center relative">
                      {f.photo_url ? (
                        <img src={f.photo_url} alt={f.full_name} className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-700 ease-[var(--ease-out)]" />
                      ) : (
                        <span className="text-display-md text-ink-muted font-bold">{f.full_name?.charAt(0)}</span>
                      )}
                      <span className="absolute top-4 right-4 bg-ink text-surface-1 text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider">
                        Finalis
                      </span>
                    </div>
                    <div className="p-6 flex flex-col flex-grow">
                      <h3 className="text-headline text-ink mb-4">{f.full_name}</h3>
                      <div className="space-y-3 mt-auto">
                        <div className="flex items-center gap-2 text-body-sm text-ink-muted">
                          <MapPin className="h-4 w-4 shrink-0" />
                          <span className="truncate">{f.city}, {f.province}</span>
                        </div>
                        <div className="flex items-center gap-2 text-body-sm text-ink-muted">
                          <Cake className="h-4 w-4 shrink-0" />
                          <span>{f.umur} tahun</span>
                        </div>
                        <div className="flex items-center gap-2 text-body-sm text-ink-muted">
                          <GraduationCap className="h-4 w-4 shrink-0" />
                          <span className="truncate">{f.education}</span>
                        </div>
                        {f.instagram && (
                          <div className="flex items-center gap-2 text-body-sm text-ink-muted">
                            <Instagram className="h-4 w-4 shrink-0" />
                            <span className="truncate">{f.instagram}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
