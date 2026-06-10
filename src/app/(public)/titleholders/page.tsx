import Link from 'next/link'
import { Crown, MapPin } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { getReigningPair, getTitleholders } from '@/server/actions/finalists'

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
  const reigningPair = await getReigningPair().catch(() => null) as any | null

  const years = [...new Set(allTitleholders.map((item: any) => item.tahun))].sort((a, b) => b - a)
  const titleholders = selectedYear
    ? allTitleholders.filter((item: any) => item.tahun === selectedYear)
    : allTitleholders

  return (
    <div className="min-h-screen bg-canvas pb-[120px]">
      <section className="relative flex flex-col items-center justify-center border-b border-hairline px-[20px] pb-[96px] pt-[180px] text-center">
        <div className="mx-auto max-w-4xl">
          <p className="mb-4 text-caption uppercase tracking-widest text-ink-muted">Nyong &amp; Noni</p>
          <div className="mb-8 flex items-center justify-center gap-4 animate-fade-in">
            <Crown className="h-10 w-10 text-accent-violet" />
            <h1 className="text-display-xl tracking-tighter text-ink">Titleholders</h1>
            <Crown className="h-10 w-10 text-accent-violet" />
          </div>
          <p className="mx-auto max-w-2xl text-subhead text-ink-muted">
            Arsip pasangan Nyong dan Noni Sulawesi Utara per tahun dan kategori penghargaan.
          </p>
        </div>
      </section>

      {reigningPair && (
        <section className="border-b border-hairline py-[72px]">
          <div className="mx-auto max-w-7xl px-[20px]">
            <div className="mb-10 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="text-caption uppercase tracking-widest text-ink-muted">Pasangan Tahun Berjalan</p>
                <h2 className="mt-2 text-display-lg text-ink">
                  {reigningPair.tahun} - {reigningPair.category}
                </h2>
              </div>
              <p className="max-w-xl text-body-sm text-ink-muted">
                Data pasangan utama terbaru tersedia di sini tanpa mengubah tampilan hero atau homepage Anda.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {[
                {
                  label: 'Nyong',
                  name: reigningPair.nyong_name,
                  photo: reigningPair.nyong_photo_url,
                },
                {
                  label: 'Noni',
                  name: reigningPair.noni_name,
                  photo: reigningPair.noni_photo_url,
                },
              ].map((person) => (
                <div key={person.label} className="product-mockup-tile p-6">
                  <div className="mb-5 flex items-center justify-between">
                    <span className="text-caption uppercase tracking-widest text-ink-muted">{person.label}</span>
                    <span className="rounded-full border border-hairline px-3 py-1 text-xs font-semibold text-ink-muted">
                      {reigningPair.category}
                    </span>
                  </div>
                  <div className="flex items-center gap-5">
                    {person.photo ? (
                      <img src={person.photo} alt={person.name} className="h-20 w-20 rounded-full border border-hairline object-cover" />
                    ) : (
                      <div className="flex h-20 w-20 items-center justify-center rounded-full border border-hairline bg-surface-2 text-headline text-ink">
                        {renderInitial(person.name)}
                      </div>
                    )}
                    <div>
                      <h3 className="text-headline text-ink">{person.name}</h3>
                      <p className="mt-2 flex items-center gap-2 text-body-sm text-ink-muted">
                        <MapPin className="h-4 w-4" />
                        {reigningPair.region}
                      </p>
                    </div>
                  </div>
                  {reigningPair.motto && (
                    <p className="mt-5 border-t border-hairline pt-5 text-body-sm text-ink-muted">
                      {reigningPair.motto}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="py-[96px]">
        <div className="mx-auto max-w-7xl px-[20px]">
          <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
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
            <div className="space-y-6">
              {titleholders.map((item: any) => (
                <div key={item.id} className="product-mockup-tile p-6">
                  <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                    <div>
                      <div className="mb-2 flex items-center gap-3">
                        <span className="text-caption uppercase tracking-widest text-ink-muted">{item.tahun}</span>
                        <span className="rounded-full border border-hairline px-3 py-1 text-xs font-semibold text-ink-muted">
                          {item.category}
                        </span>
                      </div>
                      <p className="flex items-center gap-2 text-body-sm text-ink-muted">
                        <MapPin className="h-4 w-4" />
                        {item.region}
                      </p>
                      {item.biography && (
                        <p className="mt-3 max-w-2xl text-body-sm text-ink-muted">{item.biography}</p>
                      )}
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      {[
                        {
                          label: 'Nyong',
                          name: item.nyong_name,
                          photo: item.nyong_photo_url,
                          instagram: item.nyong_instagram,
                        },
                        {
                          label: 'Noni',
                          name: item.noni_name,
                          photo: item.noni_photo_url,
                          instagram: item.noni_instagram,
                        },
                      ].map((person) => (
                        <div key={`${item.id}-${person.label}`} className="rounded-2xl border border-hairline bg-surface-2 p-4">
                          <div className="mb-3 flex items-center gap-3">
                            {person.photo ? (
                              <img src={person.photo} alt={person.name} className="h-14 w-14 rounded-full border border-hairline object-cover" />
                            ) : (
                              <div className="flex h-14 w-14 items-center justify-center rounded-full border border-hairline bg-canvas text-body font-semibold text-ink">
                                {renderInitial(person.name)}
                              </div>
                            )}
                            <div>
                              <p className="text-caption uppercase tracking-widest text-ink-muted">{person.label}</p>
                              <h3 className="text-body font-semibold text-ink">{person.name}</h3>
                            </div>
                          </div>
                          {person.instagram && (
                            <p className="text-xs text-ink-muted">{person.instagram}</p>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
