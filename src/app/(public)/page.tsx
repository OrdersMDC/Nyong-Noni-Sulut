import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Countdown } from '@/components/countdown'
import { FinalistsCarousel } from '@/components/finalists-carousel'
import { getPublicFinalists } from '@/server/actions/finalists'

export default async function HomePage() {
  const finalists = await getPublicFinalists()

  return (
    <div className="bg-canvas min-h-screen">
      {/* ─── HERO ─── */}
      <section className="relative flex flex-col items-center justify-center pt-[180px] pb-[96px] px-[20px] text-center">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-display-xxl text-ink tracking-tighter mb-8 animate-fade-in">
            Ajang Duta Wisata <br />
            <span className="text-accent-blue">Sulawesi Utara</span>
          </h1>
          <p className="text-subhead text-ink-muted max-w-2xl mx-auto mb-10">
            Bergabunglah dalam perjalanan penuh prestasi dan kebanggaan. Ajang pemilihan duta wisata dan budaya yang menampilkan generasi muda terbaik.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/register">
              <Button variant="primary" className="h-14 px-8 text-lg">
                Daftar Sekarang
              </Button>
            </Link>
            <Link href="/about">
              <Button variant="secondary" className="h-14 px-8 text-lg">
                Pelajari Lebih Lanjut
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ─── COUNTDOWN ─── */}
      <section className="py-[96px] border-t border-hairline">
        <div className="mx-auto max-w-7xl px-[20px] text-center">
          <p className="text-caption text-ink-muted uppercase tracking-widest mb-4">
            Grand Final dalam
          </p>
          <div className="flex justify-center">
            <Countdown targetDate="2026-12-15T19:00:00" />
          </div>
        </div>
      </section>

      {/* ─── SPOTLIGHT HIGHLIGHTS ─── */}
      <section className="py-[96px]">
        <div className="mx-auto max-w-7xl px-[20px]">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Link href="/finalists" className="block active-scale">
              <div className="gradient-spotlight-card h-full">
                <h3 className="text-display-md mb-2">Finalis 2026</h3>
                <p className="text-subhead opacity-80">
                  Kenali para finalis Nyong Noni Sulawesi Utara 2026.
                </p>
              </div>
            </Link>
            <Link href="/gallery" className="block active-scale">
              <div className="gradient-spotlight-card-magenta h-full">
                <h3 className="text-display-md mb-2">Galeri Foto</h3>
                <p className="text-subhead opacity-80">
                  Momen-momen terbaik dari acara sebelumnya.
                </p>
              </div>
            </Link>
            <Link href="/events" className="block active-scale">
              <div className="gradient-spotlight-card-orange h-full">
                <h3 className="text-display-md mb-2">Jadwal Acara</h3>
                <p className="text-subhead opacity-80">
                  Kalender acara Nyong Noni Sulut.
                </p>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* ─── FINALISTS PREVIEW ─── */}
      <section className="py-[96px] bg-surface-1">
        <div className="mx-auto max-w-7xl px-[20px]">
          <div className="flex items-end justify-between mb-14">
            <div>
              <p className="text-caption text-ink-muted uppercase tracking-widest mb-2">Finalis 2026</p>
              <h2 className="text-display-xl text-ink">
                Kenali Mereka
              </h2>
            </div>
            <Link href="/finalists">
              <Button variant="secondary">Lihat Semua</Button>
            </Link>
          </div>
          <FinalistsCarousel items={finalists} />
        </div>
      </section>

      {/* ─── TOURISM DESTINATIONS ─── */}
      <section className="py-[120px] bg-canvas border-t border-hairline">
        <div className="mx-auto max-w-7xl px-[32px]">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
            <div className="shrink-0">
              <p className="text-caption text-ink-muted uppercase tracking-widest mb-2">Pesona Alam</p>
              <h2 className="text-display-xl text-ink tracking-tight">
                Jelajahi
              </h2>
            </div>
            <p className="text-body-lg text-ink-muted leading-relaxed w-full md:w-[380px] shrink-0 md:mb-1">
              Destinasi wisata yang kami promosikan melalui ajang Nyong Noni.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[24px]">
            {[
              { name: 'Bunaken', desc: 'Taman laut dengan keindahan bawah laut kelas dunia' },
              { name: 'Likupang', desc: 'Kawasan pariwisata super prioritas dengan pantai eksotis' },
              { name: 'Tomohon', desc: 'Kota bunga yang sejuk dengan pemandangan gunung berapi' },
              { name: 'Danau Tondano', desc: 'Danau vulkanik terbesar di Sulawesi Utara' },
            ].map((dest) => (
              <div 
                key={dest.name} 
                className="group relative flex flex-col justify-between p-[40px] min-h-[320px] bg-surface-1 border border-hairline rounded-[24px] overflow-hidden transition-all duration-700 hover:bg-surface-2 hover:border-ink/20 active-scale"
              >
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-ink/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                
                <h3 className="text-headline text-ink tracking-tight relative z-10 transition-transform duration-500 group-hover:-translate-y-1">
                  {dest.name}
                </h3>
                
                <div className="relative z-10 flex flex-col gap-6">
                  <p className="text-body-sm text-ink-muted leading-relaxed transition-all duration-500 group-hover:text-ink/80">
                    {dest.desc}
                  </p>
                  <div className="w-8 h-px bg-hairline group-hover:w-16 group-hover:bg-ink/40 transition-all duration-500" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="py-[120px] bg-surface-2 text-center">
        <div className="mx-auto max-w-3xl px-[20px]">
          <h2 className="text-display-xl text-ink mb-6">
            Jadilah Bagian dari Sejarah
          </h2>
          <p className="text-body-lg text-ink-muted mb-10">
            Daftarkan dirimu dan jadilah duta wisata dan budaya Sulawesi Utara berikutnya. Kesempatan untuk mempromosikan keindahan daerah kita.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
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
