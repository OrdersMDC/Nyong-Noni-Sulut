import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { ArrowRight, Award, Camera, Calendar, Newspaper } from 'lucide-react'

const highlights = [
  {
    title: 'Finalis 2026',
    desc: 'Kenali para finalis Nyong Noni Sulawesi Utara 2026',
    icon: Award,
    href: '/finalists',
    color: 'text-gold',
  },
  {
    title: 'Galeri Foto',
    desc: 'Momen-momen terbaik dari acara sebelumnya',
    icon: Camera,
    href: '/gallery',
    color: 'text-primary',
  },
  {
    title: 'Berita Terbaru',
    desc: 'Informasi dan perkembangan terbaru',
    icon: Newspaper,
    href: '/news',
    color: 'text-primary',
  },
  {
    title: 'Jadwal Acara',
    desc: 'Kalender acara Nyong Noni Sulut',
    icon: Calendar,
    href: '/events',
    color: 'text-gold',
  },
]

export default function HomePage() {
  return (
    <>
      <section className="relative overflow-hidden premium-gradient">
        <div className="absolute inset-0 bg-[url('/images/hero-bg.jpg')] bg-cover bg-center opacity-20" />
        <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="font-display text-4xl font-bold tracking-tight text-white sm:text-6xl">
              Nyong Noni
              <span className="block text-gold">Sulawesi Utara</span>
            </h1>
            <p className="mt-6 text-lg text-white/80">
              Ajang pemilihan duta wisata dan budaya yang menampilkan generasi
              muda terbaik dari Sulawesi Utara. Bergabunglah dalam perjalanan
              penuh prestasi dan kebanggaan.
            </p>
            <div className="mt-10 flex items-center justify-center gap-4">
              <Link href="/register">
                <Button variant="gold" size="xl">
                  Daftar Sekarang
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/about">
                <Button
                  variant="outline"
                  size="xl"
                  className="border-white/30 text-white hover:bg-white/10"
                >
                  Pelajari Lebih Lanjut
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h2 className="font-display text-3xl font-bold text-dark">
            Jelajahi Portal Kami
          </h2>
          <p className="mt-2 text-muted">
            Temukan informasi lengkap tentang Nyong Noni Sulawesi Utara
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {highlights.map((item) => {
            const Icon = item.icon
            return (
              <Link key={item.href} href={item.href}>
                <Card className="group h-full transition-all hover:shadow-lg hover:-translate-y-1">
                  <CardContent className="flex flex-col items-center p-6 text-center">
                    <Icon className={`h-12 w-12 ${item.color} mb-4`} />
                    <h3 className="font-display text-lg font-semibold">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm text-muted">{item.desc}</p>
                  </CardContent>
                </Card>
              </Link>
            )
          })}
        </div>
      </section>

      <section className="bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 md:grid-cols-2">
            <div>
              <h2 className="font-display text-3xl font-bold text-dark">
                Tentang Nyong Noni Sulawesi Utara
              </h2>
              <p className="mt-4 text-muted leading-relaxed">
                Nyong Noni Sulawesi Utara adalah ajang pemilihan duta wisata dan
                budaya yang bertujuan untuk menemukan generasi muda berbakat yang
                siap mempromosikan keindahan alam, budaya, dan pariwisata
                Sulawesi Utara ke tingkat nasional dan internasional.
              </p>
              <Link href="/about">
                <Button variant="outline" className="mt-6">
                  Baca Selengkapnya
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
            <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-gradient-to-br from-primary/10 to-gold/10">
              <div className="flex h-full items-center justify-center">
                <p className="text-sm text-muted">Image placeholder</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
