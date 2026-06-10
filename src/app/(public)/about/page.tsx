import { Award, MapPin, Users, Globe } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

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
    <div className="bg-canvas min-h-screen pb-[120px]">
      {/* ─── HERO ─── */}
      <section className="relative flex flex-col items-center justify-center pt-[180px] pb-[96px] px-[20px] text-center border-b border-hairline">
        <div className="max-w-4xl mx-auto">
          <p className="text-caption text-ink-muted uppercase tracking-widest mb-4">Tentang</p>
          <h1 className="text-display-xl text-ink tracking-tighter mb-8 animate-fade-in">
            Nyong Noni <br />
            <span className="text-accent-blue">Sulawesi Utara</span>
          </h1>
          <p className="text-subhead text-ink-muted max-w-2xl mx-auto">
            Ajang bergengsi pemilihan duta wisata dan budaya yang telah melahirkan generasi muda terbaik Sulawesi Utara.
          </p>
        </div>
      </section>

      {/* ─── ABOUT TEXT ─── */}
      <section className="py-[96px]">
        <div className="mx-auto max-w-3xl px-[20px]">
          <p className="text-body-lg text-ink-muted leading-relaxed">
            Nyong Noni Sulawesi Utara adalah ajang bergengsi pemilihan duta wisata dan budaya yang diselenggarakan setiap tahun di Sulawesi Utara. Program ini bertujuan untuk menemukan generasi muda yang berprestasi, berwawasan luas, dan siap menjadi duta pariwisata serta budaya daerah.
          </p>
        </div>
      </section>

      {/* ─── VALUES ─── */}
      <section className="py-[96px] bg-surface-1 border-t border-hairline">
        <div className="mx-auto max-w-7xl px-[20px]">
          <div className="text-center mb-16">
            <h2 className="text-display-lg text-ink">Pilar Utama</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {values.map((v) => {
              const Icon = v.icon
              return (
                <div key={v.title} className="product-mockup-tile flex flex-col p-8 interactive-hover min-h-[250px]">
                  <Icon className="h-8 w-8 text-ink mb-6" />
                  <h3 className="text-headline text-ink mb-3">{v.title}</h3>
                  <p className="text-body-sm text-ink-muted leading-relaxed">{v.desc}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ─── VISI & MISI ─── */}
      <section className="py-[96px]">
        <div className="mx-auto max-w-7xl px-[20px]">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="gradient-spotlight-card p-10 h-full flex flex-col justify-center">
              <h2 className="text-display-md text-ink mb-4">Visi</h2>
              <p className="text-body-lg opacity-80 leading-relaxed">
                Menjadi ajang pemilihan duta wisata dan budaya terdepan yang mampu melahirkan generasi muda berkualitas, berkarakter, dan siap mempromosikan potensi Sulawesi Utara di kancah nasional dan internasional.
              </p>
            </div>
            <div className="gradient-spotlight-card-violet p-10 h-full flex flex-col justify-center">
              <h2 className="text-display-md text-ink mb-6">Misi</h2>
              <ul className="space-y-4">
                {[
                  'Menjaring generasi muda berbakat dari seluruh Sulawesi Utara',
                  'Membentuk duta wisata yang berpengetahuan luas tentang budaya dan pariwisata daerah',
                  'Mempromosikan keindahan alam, budaya, dan kuliner Sulawesi Utara',
                  'Menciptakan generasi muda yang peduli terhadap pariwisata',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-4">
                    <span className="w-1.5 h-1.5 rounded-full bg-ink mt-2.5 opacity-50 shrink-0" />
                    <span className="text-body opacity-90">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ─── TIMELINE ─── */}
      <section className="py-[96px] bg-surface-2 border-t border-hairline">
        <div className="mx-auto max-w-3xl px-[20px]">
          <div className="text-center mb-16">
            <h2 className="text-display-lg text-ink">Perjalanan Sejarah</h2>
          </div>
          <div className="relative pl-8 border-l border-hairline ml-4 md:ml-0">
            <div className="space-y-12">
              {milestones.map((m) => (
                <div key={m.year} className="relative">
                  <div className="absolute -left-[41px] top-1.5 w-4 h-4 rounded-full bg-ink outline outline-4 outline-surface-2" />
                  <span className="text-headline text-ink block mb-2">{m.year}</span>
                  <p className="text-body-sm text-ink-muted">{m.event}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="py-[96px] text-center">
        <div className="mx-auto max-w-2xl px-[20px]">
          <h2 className="text-display-lg text-ink mb-6">
            Bergabung Menjadi Bagian dari Sejarah
          </h2>
          <p className="text-body-lg text-ink-muted mb-10">
            Daftarkan dirimu sekarang dan jadilah bagian dari perjalanan Nyong Noni Sulawesi Utara.
          </p>
          <div className="flex justify-center">
            <Link href="/register">
              <Button variant="primary" className="h-14 px-8 text-lg">
                Daftar Sekarang
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
