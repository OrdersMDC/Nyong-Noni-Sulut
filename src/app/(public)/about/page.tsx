import { Section } from '@/components/section'
import { CornerAccent } from '@/components/pattern'
import { Award, MapPin, Users, Globe, ArrowRight, Quote } from 'lucide-react'

const milestones = [
  { year: '2014', event: 'Penyelenggaraan pertama Nyong Noni Sulawesi Utara' },
  { year: '2016', event: 'Jangkauan diperluas ke seluruh kabupaten/kota se-Sulut' },
  { year: '2018', event: 'Kerjasama dengan Dinas Pariwisata Provinsi Sulawesi Utara' },
  { year: '2020', event: 'Platform digital dan pendaftaran online diperkenalkan' },
  { year: '2022', event: 'Alumni berprestasi di tingkat nasional dan internasional' },
  { year: '2024', event: 'Menjadi ajang duta wisata dan budaya terdepan di Sulawesi' },
]

const values = [
  {
    icon: Award,
    title: 'Prestasi',
    desc: 'Melahirkan generasi muda berprestasi yang siap bersaing di kancah nasional dan internasional.',
  },
  {
    icon: Globe,
    title: 'Budaya',
    desc: 'Melestarikan dan mempromosikan kekayaan budaya Sulawesi Utara kepada dunia.',
  },
  {
    icon: MapPin,
    title: 'Wisata',
    desc: 'Mengembangkan potensi pariwisata daerah melalui duta-duta muda berbakat.',
  },
  {
    icon: Users,
    title: 'Generasi Muda',
    desc: 'Membentuk karakter pemuda yang peduli terhadap budaya, pariwisata, dan masyarakat.',
  },
]

export default function AboutPage() {
  return (
    <>
      {/* ─── HERO ─── */}
      <section className="relative py-28 md:py-36 overflow-hidden ocean-gradient text-white">
        <div className="section-container relative z-10 text-center">
          <p className="eyebrow text-gold-light">Tentang</p>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mt-4">
            Nyong Noni Sulawesi Utara
          </h1>
          <p className="mt-4 text-lg text-white/70 max-w-2xl mx-auto">
            Ajang bergengsi pemilihan duta wisata dan budaya yang telah melahirkan generasi muda terbaik Sulawesi Utara.
          </p>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent" />
      </section>

      {/* ─── ABOUT TEXT ─── */}
      <Section>
        <div className="mx-auto max-w-3xl">
          <div className="prose prose-lg max-w-none">
            <p className="lead">
              Nyong Noni Sulawesi Utara adalah ajang bergengsi pemilihan duta wisata dan budaya yang diselenggarakan setiap tahun di Sulawesi Utara. Program ini bertujuan untuk menemukan generasi muda yang berprestasi, berwawasan luas, dan siap menjadi duta pariwisata serta budaya daerah.
            </p>
          </div>
        </div>
      </Section>

      {/* ─── VALUES ─── */}
      <Section variant="cream" pattern>
        <div className="text-center mb-12">
          <p className="eyebrow">Nilai Kami</p>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-ocean mt-3">
            Pilar Utama
          </h2>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {values.map((v) => {
            const Icon = v.icon
            return (
              <div key={v.title} className="rounded-2xl bg-white border border-gray-100 p-8 shadow-sm relative group hover:shadow-md transition-shadow">
                <CornerAccent className="absolute top-4 right-4 text-gray-200" />
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-gold/10 text-gold">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="font-display text-lg font-semibold text-dark mb-2">{v.title}</h3>
                <p className="text-sm text-muted leading-relaxed">{v.desc}</p>
              </div>
            )
          })}
        </div>
      </Section>

      {/* ─── VISI & MISI ─── */}
      <Section>
        <div className="grid gap-10 md:grid-cols-2">
          <div className="rounded-2xl bg-gradient-to-br from-primary/5 to-primary/0 border border-primary/10 p-8 md:p-10">
            <h2 className="font-display text-2xl font-bold text-primary">Visi</h2>
            <p className="mt-4 text-muted leading-relaxed">
              Menjadi ajang pemilihan duta wisata dan budaya terdepan yang mampu melahirkan generasi muda berkualitas, berkarakter, dan siap mempromosikan potensi Sulawesi Utara di kancah nasional dan internasional.
            </p>
          </div>
          <div className="rounded-2xl bg-gradient-to-br from-gold/5 to-gold/0 border border-gold/10 p-8 md:p-10">
            <h2 className="font-display text-2xl font-bold text-gold-dark">Misi</h2>
            <ul className="mt-4 space-y-3 text-muted">
              {[
                'Menjaring generasi muda berbakat dari seluruh Sulawesi Utara',
                'Membentuk duta wisata yang berpengetahuan luas tentang budaya dan pariwisata daerah',
                'Mempromosikan keindahan alam, budaya, dan kuliner Sulawesi Utara',
                'Menciptakan generasi muda yang peduli terhadap pariwisata',
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-gold shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {/* ─── TIMELINE ─── */}
      <Section variant="cream" pattern>
        <div className="text-center mb-12">
          <p className="eyebrow">Perjalanan</p>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-ocean mt-3">
            Sejarah
          </h2>
          <p className="mt-2 text-muted">Perjalanan Nyong Noni Sulawesi Utara dari masa ke masa</p>
        </div>
        <div className="relative mx-auto max-w-2xl">
          <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-gold/40 via-gold/20 to-transparent" />
          <div className="space-y-10">
            {milestones.map((m) => (
              <div key={m.year} className="relative pl-16">
                <div className="absolute left-4 top-1 flex h-5 w-5 items-center justify-center rounded-full bg-gold shadow-sm">
                  <div className="h-2 w-2 rounded-full bg-white" />
                </div>
                <span className="font-display text-sm font-bold text-gold-dark">{m.year}</span>
                <p className="mt-1 text-muted leading-relaxed">{m.event}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* ─── CTA ─── */}
      <Section className="text-center bg-gradient-to-b from-cream to-background">
        <div className="mx-auto max-w-2xl">
          <h2 className="font-display text-3xl font-bold text-ocean">
            Bergabung Menjadi Bagian dari Sejarah
          </h2>
          <p className="mt-4 text-muted">
            Daftarkan dirimu sekarang dan jadilah bagian dari perjalanan Nyong Noni Sulawesi Utara.
          </p>
          <div className="mt-8 flex justify-center">
            <a
              href="/register"
              className="inline-flex items-center gap-2 rounded-xl bg-gold text-white px-8 py-3.5 font-semibold hover:bg-gold-dark transition-colors shadow-lg shadow-gold/20"
            >
              Daftar Sekarang <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </Section>
    </>
  )
}
