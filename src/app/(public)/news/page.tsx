import { Calendar, ArrowRight } from 'lucide-react'
import { getPublicNews } from '@/server/actions/content'

export default async function NewsPage() {
  const news = await getPublicNews().catch(() => [])

  return (
    <div className="bg-canvas min-h-screen pb-[120px]">
      {/* ─── HERO ─── */}
      <section className="relative flex flex-col items-center justify-center pt-[180px] pb-[96px] px-[20px] text-center border-b border-hairline">
        <div className="max-w-4xl mx-auto">
          <p className="text-caption text-ink-muted uppercase tracking-widest mb-4">Berita</p>
          <h1 className="text-display-xl text-ink tracking-tighter mb-8 animate-fade-in">
            Informasi & <br />
            <span className="text-accent-blue">Berita</span>
          </h1>
          <p className="text-subhead text-ink-muted max-w-2xl mx-auto">
            Informasi dan perkembangan terbaru Nyong Noni Sulawesi Utara
          </p>
        </div>
      </section>

      {/* ─── NEWS LIST ─── */}
      <section className="py-[96px]">
        <div className="mx-auto max-w-7xl px-[20px]">
          {news.length === 0 ? (
            <div className="py-20 text-center max-w-lg mx-auto">
              <div className="mx-auto mb-8 flex h-16 w-16 items-center justify-center rounded-2xl bg-surface-2 border border-hairline">
                <Calendar className="h-8 w-8 text-ink-muted" />
              </div>
              <h2 className="text-display-md text-ink mb-4">Belum Ada Berita</h2>
              <p className="text-body-lg text-ink-muted leading-relaxed">
                Pantau terus halaman ini untuk mendapatkan informasi terbaru seputar Nyong Noni Sulawesi Utara.
              </p>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {news.map((item: any) => {
                const dateStr = item.published_at || item.created_at
                const formattedDate = dateStr
                  ? new Date(dateStr).toLocaleDateString('id-ID', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })
                  : ''
                return (
                  <div key={item.id} className="product-mockup-tile cursor-pointer interactive-hover active-scale flex flex-col p-8">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-caption text-ink-muted">{formattedDate}</span>
                    </div>
                    <h3 className="text-headline text-ink mb-3 group-hover:text-accent-blue transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-body-sm text-ink-muted line-clamp-3 leading-relaxed mb-6">
                      {item.excerpt}
                    </p>
                    <div className="mt-auto flex items-center gap-2 text-sm font-medium text-ink group-hover:text-accent-blue transition-all border-t border-hairline pt-4">
                      Baca selengkapnya <ArrowRight className="h-4 w-4" />
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}

