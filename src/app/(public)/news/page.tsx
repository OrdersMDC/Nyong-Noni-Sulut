import { Section } from '@/components/section'
import { BentenanPattern } from '@/components/pattern'
import { Card, CardContent } from '@/components/ui/card'
import { Calendar, ArrowRight } from 'lucide-react'

const newsItems: Array<{
  title: string
  excerpt: string
  date: string
  slug: string
  category?: string
}> = []

export default function NewsPage() {
  return (
    <>
      {/* ─── HERO ─── */}
      <section className="relative py-28 md:py-36 overflow-hidden bg-gradient-to-br from-ocean via-ocean/95 to-primary text-white">
        <BentenanPattern className="absolute inset-0 opacity-[0.03]" />
        <div className="section-container relative z-10 text-center">
          <p className="eyebrow text-gold-light">Berita</p>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mt-4">
            Informasi & Berita
          </h1>
          <p className="mt-4 text-lg text-white/70 max-w-2xl mx-auto">
            Informasi dan perkembangan terbaru Nyong Noni Sulawesi Utara
          </p>
        </div>
      </section>

      {/* ─── NEWS LIST ─── */}
      <Section>
        {newsItems.length === 0 ? (
          <div className="py-20 text-center max-w-lg mx-auto">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gray-100">
              <Calendar className="h-8 w-8 text-muted" />
            </div>
            <h2 className="font-display text-xl font-semibold text-dark">Belum Ada Berita</h2>
            <p className="mt-2 text-muted">
              Pantau terus halaman ini untuk mendapatkan informasi terbaru seputar Nyong Noni Sulawesi Utara.
            </p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {newsItems.map((item) => (
              <Card key={item.slug} className="group cursor-pointer transition-all hover:shadow-lg border border-gray-100">
                <CardContent className="p-5">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs text-muted">{item.date}</span>
                    {item.category && (
                      <span className="rounded-full bg-gold/10 px-3 py-1 text-xs font-medium text-gold-dark">
                        {item.category}
                      </span>
                    )}
                  </div>
                  <h3 className="font-display text-lg font-semibold text-dark group-hover:text-primary transition-colors">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm text-muted line-clamp-3 leading-relaxed">
                    {item.excerpt}
                  </p>
                  <div className="mt-4 flex items-center gap-1 text-sm font-medium text-gold-dark group-hover:gap-2 transition-all">
                    Baca selengkapnya <ArrowRight className="h-3.5 w-3.5" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </Section>
    </>
  )
}
