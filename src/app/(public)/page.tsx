import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Section } from '@/components/section'
import { BentenanPattern, CornerAccent } from '@/components/pattern'
import { Countdown } from '@/components/countdown'
import { FinalistsCarousel } from '@/components/finalists-carousel'
import { getPublicFinalists } from '@/server/actions/finalists'
import { ArrowRight, Award, Camera, Calendar, Newspaper, Users, MapPin, Quote, Star, ChevronRight } from 'lucide-react'

const stats = [
  { value: '12+', label: 'Tahun Penyelenggaraan', icon: Star },
  { value: '200+', label: 'Finalis', icon: Users },
  { value: '50+', label: 'Alumni Berprestasi', icon: Award },
  { value: '15', label: 'Kabupaten/Kota', icon: MapPin },
]

const highlights = [
  {
    title: 'Finalis 2026',
    desc: 'Kenali para finalis Nyong Noni Sulawesi Utara 2026',
    icon: Award,
    href: '/finalists',
    gradient: 'from-gold/10 to-gold/5',
    iconColor: 'text-gold',
  },
  {
    title: 'Galeri Foto',
    desc: 'Momen-momen terbaik dari acara sebelumnya',
    icon: Camera,
    href: '/gallery',
    gradient: 'from-primary/10 to-primary/5',
    iconColor: 'text-primary',
  },
  {
    title: 'Berita Terbaru',
    desc: 'Informasi dan perkembangan terbaru',
    icon: Newspaper,
    href: '/news',
    gradient: 'from-ocean/10 to-ocean/5',
    iconColor: 'text-ocean',
  },
  {
    title: 'Jadwal Acara',
    desc: 'Kalender acara Nyong Noni Sulut',
    icon: Calendar,
    href: '/events',
    gradient: 'from-coral/10 to-coral/5',
    iconColor: 'text-coral',
  },
]

const destinations = [
  { name: 'Bunaken', desc: 'Taman laut dengan keindahan bawah laut kelas dunia', color: 'from-teal/20 to-teal/5' },
  { name: 'Likupang', desc: 'Kawasan pariwisata super prioritas dengan pantai eksotis', color: 'from-coral/20 to-coral/5' },
  { name: 'Tomohon', desc: 'Kota bunga yang sejuk dengan pemandangan gunung berapi', color: 'from-green-500/20 to-green-500/5' },
  { name: 'Danau Tondano', desc: 'Danau vulkanik terbesar di Sulawesi Utara', color: 'from-primary/20 to-primary/5' },
]

const testimonials = [
  {
    quote: 'Nyong Noni mengubah hidup saya. Saya belajar tentang budaya, pariwisata, dan percaya diri untuk berkarya.',
    name: 'Rina Manoppo',
    role: 'Noni Sulawesi Utara 2023',
  },
  {
    quote: 'Pengalaman yang luar biasa. Saya bangga bisa mempromosikan Sulawesi Utara ke seluruh Indonesia.',
    name: 'Steven Runtuwene',
    role: 'Nyong Sulawesi Utara 2024',
  },
  {
    quote: 'Ajang ini bukan sekadar kontes kecantikan, tapi wadah untuk mengembangkan potensi generasi muda.',
    name: 'Dr. Maria Wenas',
    role: 'Jurit',
  },
]

export default async function HomePage() {
  const finalists = await getPublicFinalists()

  return (
    <>
      {/* ─── HERO ─── */}
      <section className="relative min-h-screen flex items-center overflow-hidden premium-gradient">
        <div className="absolute inset-0 bg-[url('/images/hero-bg.jpg')] bg-cover bg-center opacity-10" />
        <div className="pointer-events-none absolute inset-0">
          <BentenanPattern className="absolute top-10 right-10 h-[500px] w-[500px] text-white/5" />
          <BentenanPattern className="absolute bottom-10 left-10 h-[300px] w-[300px] text-gold/5 rotate-45" />
        </div>
        <div className="section-container relative z-10 w-full py-32 md:py-40">
          <div className="mx-auto max-w-4xl text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 backdrop-blur px-4 py-1.5 mb-8">
              <span className="h-1.5 w-1.5 rounded-full bg-gold animate-pulse" />
              <span className="text-xs font-medium tracking-wider text-white/80 uppercase">
                Ajang Duta Wisata & Budaya
              </span>
            </div>

            <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-white leading-[1.1]">
              Nyong Noni
              <span className="block text-gradient-gold mt-2">Sulawesi Utara</span>
            </h1>

            <p className="mt-6 text-lg sm:text-xl text-white/70 max-w-2xl mx-auto leading-relaxed">
              Ajang pemilihan duta wisata dan budaya yang menampilkan generasi muda terbaik dari Sulawesi Utara.
              Bergabunglah dalam perjalanan penuh prestasi dan kebanggaan.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/register">
                <Button variant="gold" size="xl" className="shadow-xl shadow-gold/25 text-base sm:text-lg px-10 py-6">
                  Daftar Sekarang
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/about">
                <Button
                  variant="outline"
                  size="xl"
                  className="border-white/30 text-white hover:bg-white/10 text-base sm:text-lg px-10 py-6"
                >
                  Pelajari Lebih Lanjut
                </Button>
              </Link>
            </div>

            <div className="mt-16">
              <p className="text-sm font-medium text-white/50 mb-4 uppercase tracking-widest">
                Grand Final dalam
              </p>
              <div className="flex justify-center">
                <Countdown targetDate="2026-12-15T19:00:00" />
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
      </section>

      {/* ─── FINALISTS CAROUSEL ─── */}
      <section className="relative overflow-hidden bg-ocean py-20 md:py-28">
        <div className="pointer-events-none absolute inset-0">
          <BentenanPattern className="absolute -top-20 -right-20 h-[400px] w-[400px] text-white/[0.03]" />
          <BentenanPattern className="absolute -bottom-20 -left-20 h-[300px] w-[300px] text-gold/[0.03] rotate-45" />
        </div>
        <div className="section-container relative z-10">
          <div className="flex items-end justify-between mb-10 md:mb-14">
            <div>
              <p className="eyebrow text-gold-light">Finalis 2026</p>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-white mt-2">
                Kenali Mereka
              </h2>
              <p className="text-white/50 mt-2 max-w-xl">
                Generasi muda terbaik dari seluruh Sulawesi Utara yang siap menjadi duta wisata dan budaya.
              </p>
            </div>
            <Link
              href="/finalists"
              className="hidden sm:inline-flex items-center gap-1.5 text-sm font-medium text-gold-light hover:text-gold transition-colors group"
            >
              Lihat Semua
              <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
          <FinalistsCarousel items={finalists} />
          <div className="mt-8 text-center sm:hidden">
            <Link
              href="/finalists"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-gold-light hover:text-gold transition-colors"
            >
              Lihat Semua Finalis
              <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ─── STATISTICS ─── */}
      <Section variant="default">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {stats.map((stat) => {
            const Icon = stat.icon
            return (
              <div key={stat.label} className="text-center group">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-gold/10 to-gold/5 group-hover:from-gold/20 group-hover:to-gold/10 transition-colors">
                  <Icon className="h-7 w-7 text-gold" />
                </div>
                <p className="font-display text-3xl md:text-4xl font-bold text-ocean">{stat.value}</p>
                <p className="mt-1 text-sm text-muted">{stat.label}</p>
              </div>
            )
          })}
        </div>
      </Section>

      {/* ─── ABOUT ─── */}
      <Section variant="cream" pattern>
        <div className="mx-auto max-w-4xl text-center">
          <p className="eyebrow">Tentang</p>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-ocean mt-3">
            Nyong Noni Sulawesi Utara
          </h2>
          <p className="mt-6 text-lg text-muted leading-relaxed max-w-3xl mx-auto">
            Ajang bergengsi pemilihan duta wisata dan budaya yang diselenggarakan setiap tahun.
            Menemukan generasi muda berprestasi, berwawasan luas, dan siap menjadi duta pariwisata serta budaya daerah.
          </p>
          <Link href="/about">
            <Button variant="outline" className="mt-8">
              Baca Selengkapnya <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </Section>

      {/* ─── HIGHLIGHTS ─── */}
      <Section variant="default">
        <div className="text-center mb-12">
          <p className="eyebrow">Jelajahi</p>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-ocean mt-3">
            Portal Kami
          </h2>
          <p className="mt-2 text-muted">Temukan informasi lengkap tentang Nyong Noni Sulawesi Utara</p>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {highlights.map((item) => {
            const Icon = item.icon
            return (
              <Link key={item.href} href={item.href} className="group block">
                <div className={`h-full rounded-2xl bg-gradient-to-br ${item.gradient} border border-gray-100 p-8 transition-all duration-300 group-hover:shadow-lg group-hover:-translate-y-1`}>
                  <div className={`mb-5 flex h-14 w-14 items-center justify-center rounded-xl bg-white shadow-sm ${item.iconColor}`}>
                    <Icon className="h-7 w-7" />
                  </div>
                  <h3 className="font-display text-xl font-semibold text-dark mb-2">{item.title}</h3>
                  <p className="text-sm text-muted leading-relaxed">{item.desc}</p>
                  <div className="mt-4 flex items-center gap-1 text-sm font-medium text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                    Lihat <ArrowRight className="h-3 w-3" />
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </Section>

      {/* ─── TOURISM SHOWCASE ─── */}
      <Section variant="cream" pattern>
        <div className="text-center mb-12">
          <p className="eyebrow">Wisata</p>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-ocean mt-3">
            Jelajahi Sulawesi Utara
          </h2>
          <p className="mt-2 text-muted">Destinasi wisata yang kami promosikan melalui ajang Nyong Noni</p>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {destinations.map((dest) => (
            <div key={dest.name} className={`rounded-2xl bg-gradient-to-br ${dest.color} border border-gray-100 p-6 min-h-[200px] flex flex-col justify-end relative overflow-hidden group`}>
              <CornerAccent className="absolute top-3 right-3 text-gray-300 opacity-50" />
              <div>
                <h3 className="font-display text-xl font-bold text-dark">{dest.name}</h3>
                <p className="mt-1 text-sm text-muted leading-relaxed">{dest.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* ─── TESTIMONIALS ─── */}
      <Section variant="default">
        <div className="text-center mb-12">
          <p className="eyebrow">Testimoni</p>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-ocean mt-3">
            Kata Mereka
          </h2>
        </div>
        <div className="grid gap-8 md:grid-cols-3">
          {testimonials.map((t) => (
            <div key={t.name} className="rounded-2xl bg-white border border-gray-100 p-8 shadow-sm relative">
              <Quote className="h-8 w-8 text-gold/20 absolute top-6 right-6" />
              <p className="text-muted leading-relaxed italic">&ldquo;{t.quote}&rdquo;</p>
              <div className="mt-6 pt-4 border-t border-gray-100">
                <p className="font-display font-semibold text-sm text-dark">{t.name}</p>
                <p className="text-xs text-muted mt-0.5">{t.role}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* ─── SPONSORS ─── */}
      <Section variant="cream">
        <div className="text-center mb-10">
          <p className="eyebrow">Didukung Oleh</p>
          <h2 className="font-display text-2xl md:text-3xl font-bold text-ocean mt-3">
            Sponsor & Mitra
          </h2>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12 opacity-40">
          {['Dinas Pariwisata', 'Pemprov Sulut', 'Wonderful Indonesia', 'Bank SulutGo'].map((name) => (
            <div key={name} className="h-12 w-36 rounded-xl bg-gray-200 flex items-center justify-center text-sm font-medium text-gray-500">
              {name}
            </div>
          ))}
        </div>
      </Section>

      {/* ─── CTA ─── */}
      <Section variant="ocean" className="text-center">
        <div className="mx-auto max-w-2xl">
          <p className="eyebrow text-gold-light">Bergabunglah</p>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-white mt-3">
            Jadilah Bagian dari Sejarah
          </h2>
          <p className="mt-4 text-lg text-white/70 leading-relaxed">
            Daftarkan dirimu dan jadilah duta wisata dan budaya Sulawesi Utara berikutnya. Kesempatan untuk mempromosikan keindahan daerah kita.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/register">
              <Button variant="gold" size="xl" className="shadow-xl shadow-gold/25 text-base px-10 py-6">
                Daftar Sekarang <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/about">
              <Button variant="outline" size="xl" className="border-white/30 text-white hover:bg-white/10 text-base px-10 py-6">
                Pelajari Lebih Lanjut
              </Button>
            </Link>
          </div>
        </div>
      </Section>
    </>
  )
}
