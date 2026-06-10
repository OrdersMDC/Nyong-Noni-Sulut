import Link from 'next/link'
import { MapPin, Crown, Instagram, Quote } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { getTitleholders } from '@/server/actions/finalists'

const CATEGORY_ORDER: Record<string, number> = {
  'Wakil I': 2,
  'Wakil II': 3,
  'Harapan I': 4,
  'Harapan II': 5,
  'Berbakat': 10,
  'Favorit': 11,
  'Persahabatan': 12,
  'Digital': 13,
  'Other': 99,
}

function renderInitial(name: string) {
  return name.trim().charAt(0).toUpperCase() || 'N'
}

export default async function TitleholdersPage({
  searchParams,
}: {
  searchParams: Promise<{ tahun?: string }>
}) {
  const params = await searchParams
  const selectedYear = Number(params.tahun) || undefined
  const allTitleholders = await getTitleholders().catch(() => []) as any[]

  const years = [...new Set(allTitleholders.map((item: any) => item.tahun))].sort((a, b) => b - a)
  let titleholders = selectedYear
    ? allTitleholders.filter((item: any) => item.tahun === selectedYear)
    : allTitleholders

  // Separate Juara Utama from the rest, sort others by category order
  const juaraUtama = titleholders.find((item: any) => item.category === 'Juara Utama')
  const others = titleholders
    .filter((item: any) => item.id !== juaraUtama?.id)
    .sort((a, b) => (CATEGORY_ORDER[a.category] || 99) - (CATEGORY_ORDER[b.category] || 99))

  return (
    <div className="min-h-screen bg-canvas pb-[120px]">
      <section className="relative flex flex-col items-center justify-center border-b border-hairline px-[20px] pb-[96px] pt-[180px] text-center">
        <div className="mx-auto max-w-4xl">
          <p className="mb-4 text-caption uppercase tracking-widest text-ink-muted">Nyong &amp; Noni</p>
          <div className="mb-8 flex items-center justify-center gap-4 animate-fade-in">
            <Crown className="h-10 w-10 text-gold" />
            <h1 className="text-display-xl tracking-tighter text-ink">Titleholders</h1>
            <Crown className="h-10 w-10 text-gold" />
          </div>
          <p className="mx-auto max-w-2xl text-subhead text-ink-muted">
            Arsip pasangan Nyong dan Noni Sulawesi Utara. Setiap pasangan adalah duta yang mewakili daerahnya masing-masing.
          </p>
        </div>
      </section>

      <section className="py-[96px]">
        <div className="mx-auto max-w-7xl px-[20px]">
          <div className="mb-12 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-caption uppercase tracking-widest text-ink-muted">Arsip</p>
              <h2 className="mt-2 text-display-lg text-ink">Daftar Titleholders</h2>
            </div>
            <div className="flex flex-wrap gap-2">
              <Link href="/titleholders">
                <Button variant={selectedYear ? 'secondary' : 'primary'}>Semua Tahun</Button>
              </Link>
              {years.map((year) => (
                <Link key={year} href={`/titleholders?tahun=${year}`}>
                  <Button variant={selectedYear === year ? 'primary' : 'secondary'}>{year}</Button>
                </Link>
              ))}
            </div>
          </div>

          {titleholders.length === 0 ? (
            <div className="py-20 text-center">
              <p className="text-body-lg text-ink-muted">Belum ada data titleholders</p>
            </div>
          ) : (
            <>
              {/* ─── JUARA UTAMA (Highlight) ─── */}
              {juaraUtama && (
                <div className="mb-16">
                  <div className="relative rounded-[24px] overflow-hidden border-2 border-gold/30 bg-gradient-to-br from-gold/5 via-surface-2 to-surface-2 shadow-lg">
                    {/* Gold top accent */}
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-gold via-gold-light to-gold" />

                    <div className="grid md:grid-cols-2 gap-px bg-hairline/50">
                      {/* Nyong */}
                      <div className="relative bg-surface-2">
                        <div className="aspect-[2/3] md:aspect-[3/4] overflow-hidden">
                          {juaraUtama.nyong_photo_url ? (
                            <img src={juaraUtama.nyong_photo_url} alt={juaraUtama.nyong_name} className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-display-xl text-ink-muted">
                              {renderInitial(juaraUtama.nyong_name)}
                            </div>
                          )}
                        </div>
                        <div className="p-5">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-[10px] font-semibold uppercase tracking-widest text-gold">Nyong</span>
                            <span className="text-gold/50">|</span>
                            <span className="flex items-center gap-1 text-xs text-ink-muted">
                              <Instagram className="h-3 w-3" />
                              @{juaraUtama.nyong_instagram || '—'}
                            </span>
                          </div>
                          <h3 className="text-display-md text-ink">{juaraUtama.nyong_name}</h3>
                        </div>
                      </div>

                      {/* Noni */}
                      <div className="relative bg-surface-2">
                        <div className="aspect-[2/3] md:aspect-[3/4] overflow-hidden">
                          {juaraUtama.noni_photo_url ? (
                            <img src={juaraUtama.noni_photo_url} alt={juaraUtama.noni_name} className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-display-xl text-ink-muted">
                              {renderInitial(juaraUtama.noni_name)}
                            </div>
                          )}
                        </div>
                        <div className="p-5">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-[10px] font-semibold uppercase tracking-widest text-gold">Noni</span>
                            <span className="text-gold/50">|</span>
                            <span className="flex items-center gap-1 text-xs text-ink-muted">
                              <Instagram className="h-3 w-3" />
                              @{juaraUtama.noni_instagram || '—'}
                            </span>
                          </div>
                          <h3 className="text-display-md text-ink">{juaraUtama.noni_name}</h3>
                        </div>
                      </div>
                    </div>

                    {/* Pair info footer */}
                    <div className="px-6 py-6 md:py-8 text-center">
                      <div className="flex items-center justify-center gap-3 mb-4">
                        <span className="text-caption text-ink-muted">{juaraUtama.tahun}</span>
                        <span className="w-px h-4 bg-hairline" />
                        <span className="text-[13px] font-bold uppercase tracking-widest text-gold">Juara Utama</span>
                        <span className="w-px h-4 bg-hairline" />
                        <span className="flex items-center gap-1 text-caption text-ink-muted">
                          <MapPin className="h-3.5 w-3.5" />
                          {juaraUtama.region}
                        </span>
                      </div>
                      {juaraUtama.motto && (
                        <p className="text-body-lg text-ink-muted italic max-w-2xl mx-auto relative">
                          <Quote className="absolute -top-3 -left-6 h-6 w-6 text-gold/20" />
                          &ldquo;{juaraUtama.motto}&rdquo;
                        </p>
                      )}
                      {juaraUtama.biography && (
                        <p className="text-body text-ink-muted max-w-2xl mx-auto mt-4">{juaraUtama.biography}</p>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* ─── OTHER CATEGORIES ─── */}
              {others.length > 0 && (
                <div>
                  {/* Wakil I — highlighted separately */}
                  {others[0]?.category === 'Wakil I' && (
                    <div className="mb-8">
                      <div className="relative rounded-[20px] overflow-hidden border border-hairline bg-gradient-to-r from-surface-2 via-surface-2 to-surface-2/80">
                        <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-accent-blue to-accent-blue/40" />
                        <div className="grid md:grid-cols-[1fr_auto] items-center gap-6 p-6">
                          {/* Photos */}
                          <div className="flex items-center gap-6">
                            <div className="flex items-center gap-4">
                              <div className="w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden border-2 border-accent-blue/30 shrink-0">
                                {others[0].nyong_photo_url ? (
                                  <img src={others[0].nyong_photo_url} alt={others[0].nyong_name} className="w-full h-full object-cover" />
                                ) : (
                                  <div className="w-full h-full flex items-center justify-center text-headline text-ink-muted">
                                    {renderInitial(others[0].nyong_name)}
                                  </div>
                                )}
                              </div>
                              <div className="min-w-0">
                                <span className="text-[10px] font-semibold uppercase tracking-widest text-accent-blue">Nyong</span>
                                <h4 className="text-body font-semibold text-ink">{others[0].nyong_name}</h4>
                              </div>
                            </div>
                            <div className="hidden sm:flex items-center gap-3 text-ink-muted">
                              <span className="text-headline text-ink-muted">&amp;</span>
                            </div>
                            <div className="flex items-center gap-4">
                              <div className="min-w-0 text-right">
                                <span className="text-[10px] font-semibold uppercase tracking-widest text-accent-blue">Noni</span>
                                <h4 className="text-body font-semibold text-ink">{others[0].noni_name}</h4>
                              </div>
                              <div className="w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden border-2 border-accent-blue/30 shrink-0">
                                {others[0].noni_photo_url ? (
                                  <img src={others[0].noni_photo_url} alt={others[0].noni_name} className="w-full h-full object-cover" />
                                ) : (
                                  <div className="w-full h-full flex items-center justify-center text-headline text-ink-muted">
                                    {renderInitial(others[0].noni_name)}
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center gap-4 md:text-right">
                            <span className="text-[13px] font-bold uppercase tracking-widest text-accent-blue whitespace-nowrap">{others[0].category}</span>
                            <span className="text-hairline hidden md:inline w-px h-4 bg-hairline" />
                            <span className="flex items-center gap-1 text-caption text-ink-muted whitespace-nowrap">
                              <MapPin className="h-3.5 w-3.5" />
                              {others[0].region}
                            </span>
                          </div>
                        </div>
                        {others[0].motto && (
                          <div className="px-6 pb-4">
                            <p className="text-sm text-ink-muted italic">&ldquo;{others[0].motto}&rdquo;</p>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Remaining categories — uniform centered grid */}
                  {others.length > 1 && (
                    <div>
                      <h3 className="text-headline text-ink mb-8 text-center">Kategori Lainnya</h3>
                      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {others.slice(1).map((item: any) => (
                          <div key={item.id} className="rounded-[20px] border border-hairline bg-surface-2 overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
                            {/* Category badge — centered */}
                            <div className="pt-4 pb-2 text-center">
                              <span className="text-[11px] font-semibold uppercase tracking-wider text-gold-dark bg-gold/10 px-3 py-1 rounded-full">
                                {item.category}
                              </span>
                            </div>

                            {/* Photos + individual info */}
                            <div className="grid grid-cols-2 gap-px bg-hairline">
                              {/* Nyong */}
                              <div className="bg-surface-2 text-center">
                                <div className="aspect-square overflow-hidden bg-surface-1">
                                  {item.nyong_photo_url ? (
                                    <img src={item.nyong_photo_url} alt={item.nyong_name} className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" />
                                  ) : (
                                    <div className="w-full h-full flex items-center justify-center text-display-md text-ink-muted">
                                      {renderInitial(item.nyong_name)}
                                    </div>
                                  )}
                                </div>
                                <div className="p-3 space-y-1.5">
                                  <span className="block text-[9px] font-semibold uppercase tracking-widest text-ink-muted">Nyong</span>
                                  <h4 className="text-body-sm font-semibold text-ink">{item.nyong_name}</h4>
                                  <p className="flex items-center justify-center gap-1 text-[11px] text-ink-muted">
                                    <MapPin className="h-3 w-3 shrink-0" />
                                    {item.region}
                                  </p>
                                  {item.nyong_instagram && (
                                    <p className="flex items-center justify-center gap-1 text-[11px] text-ink-muted">
                                      <Instagram className="h-3 w-3 shrink-0" />
                                      @{item.nyong_instagram}
                                    </p>
                                  )}
                                </div>
                              </div>

                              {/* Noni */}
                              <div className="bg-surface-2 text-center">
                                <div className="aspect-square overflow-hidden bg-surface-1">
                                  {item.noni_photo_url ? (
                                    <img src={item.noni_photo_url} alt={item.noni_name} className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" />
                                  ) : (
                                    <div className="w-full h-full flex items-center justify-center text-display-md text-ink-muted">
                                      {renderInitial(item.noni_name)}
                                    </div>
                                  )}
                                </div>
                                <div className="p-3 space-y-1.5">
                                  <span className="block text-[9px] font-semibold uppercase tracking-widest text-ink-muted">Noni</span>
                                  <h4 className="text-body-sm font-semibold text-ink">{item.noni_name}</h4>
                                  <p className="flex items-center justify-center gap-1 text-[11px] text-ink-muted">
                                    <MapPin className="h-3 w-3 shrink-0" />
                                    {item.region}
                                  </p>
                                  {item.noni_instagram && (
                                    <p className="flex items-center justify-center gap-1 text-[11px] text-ink-muted">
                                      <Instagram className="h-3 w-3 shrink-0" />
                                      @{item.noni_instagram}
                                    </p>
                                  )}
                                </div>
                              </div>
                            </div>

                            {item.motto && (
                              <div className="px-4 pb-4 pt-3 text-center">
                                <p className="text-xs text-ink-muted italic">&ldquo;{item.motto}&rdquo;</p>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </div>
  )
}
