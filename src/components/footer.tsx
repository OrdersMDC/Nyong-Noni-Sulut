import Link from 'next/link'
import { BentenanPattern } from './pattern'
import { Instagram, Mail, MapPin, ChevronRight } from 'lucide-react'

export function Footer() {
  return (
    <footer className="relative bg-ocean text-white overflow-hidden">
      <div className="pointer-events-none absolute inset-0 opacity-[0.03]">
        <BentenanPattern className="h-full w-full" />
      </div>

      <div className="section-container relative z-10 py-16 md:py-20">
        <div className="grid gap-10 md:grid-cols-4">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gold text-ocean text-sm font-bold font-display">
                NN
              </div>
              <div>
                <p className="font-display text-lg font-bold text-gold leading-tight">Nyong Noni</p>
                <p className="text-[10px] font-medium tracking-[0.15em] uppercase text-gold-light/70 leading-tight -mt-0.5">Sulawesi Utara</p>
              </div>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed max-w-xs">
              Ajang pemilihan duta wisata dan budaya Sulawesi Utara yang menampilkan generasi muda terbaik.
            </p>
            <div className="flex items-center gap-3 mt-5">
              <a
                href="https://instagram.com/nyongnonisulut"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 hover:bg-gold/20 transition-colors"
                aria-label="Instagram Nyong Noni Sulut"
              >
                <Instagram className="h-4 w-4" />
              </a>
              <a
                href="mailto:info@nyongnonisulut.id"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 hover:bg-gold/20 transition-colors"
                aria-label="Email Nyong Noni Sulut"
              >
                <Mail className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display text-sm font-semibold text-gold-light mb-4 uppercase tracking-wider">Jelajahi</h4>
            <ul className="space-y-3">
              {[
                { label: 'Tentang Kami', href: '/about' },
                { label: 'Finalis', href: '/finalists' },
                { label: 'Hall of Fame', href: '/hall-of-fame' },
                { label: 'Prestasi Alumni', href: '/alumni-achievements' },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="group flex items-center gap-1.5 text-sm text-gray-400 hover:text-gold transition-colors">
                    <ChevronRight className="h-3 w-3 text-gold/50 group-hover:text-gold transition-colors" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Media */}
          <div>
            <h4 className="font-display text-sm font-semibold text-gold-light mb-4 uppercase tracking-wider">Media</h4>
            <ul className="space-y-3">
              {[
                { label: 'Galeri', href: '/gallery' },
                { label: 'Berita', href: '/news' },
                { label: 'Acara', href: '/events' },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="group flex items-center gap-1.5 text-sm text-gray-400 hover:text-gold transition-colors">
                    <ChevronRight className="h-3 w-3 text-gold/50 group-hover:text-gold transition-colors" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display text-sm font-semibold text-gold-light mb-4 uppercase tracking-wider">Kontak</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 mt-0.5 text-gold/50 shrink-0" />
                <span>Manado, Sulawesi Utara</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-gold/50 shrink-0" />
                <a href="mailto:info@nyongnonisulut.id" className="hover:text-gold transition-colors">info@nyongnonisulut.id</a>
              </li>
              <li className="flex items-center gap-2">
                <Instagram className="h-4 w-4 text-gold/50 shrink-0" />
                <a href="https://instagram.com/nyongnonisulut" target="_blank" rel="noopener noreferrer" className="hover:text-gold transition-colors">@nyongnonisulut</a>
              </li>
            </ul>
          </div>
        </div>

        {/* Newsletter placeholder */}
        <div className="mt-12 p-6 rounded-2xl bg-white/5 border border-white/10">
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <div className="flex-1 text-center sm:text-left">
              <p className="font-display text-base font-semibold text-gold-light">Ikuti Perkembangan Terbaru</p>
              <p className="text-sm text-gray-400 mt-1">Dapatkan informasi acara dan pendaftaran langsung di email Anda.</p>
            </div>
            <div className="flex gap-2 w-full sm:w-auto">
              <input
                type="email"
                placeholder="email@anda.com"
                className="flex-1 sm:w-56 rounded-xl border border-white/20 bg-white/10 px-4 py-2.5 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-gold/50"
                aria-label="Email untuk newsletter"
              />
              <button className="rounded-xl bg-gold text-ocean px-5 py-2.5 text-sm font-semibold hover:bg-gold-light transition-colors whitespace-nowrap">
                Berlangganan
              </button>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-10 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} Nyong Noni Sulawesi Utara. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <Link href="/register" className="hover:text-gold transition-colors">Pendaftaran</Link>
            <span className="text-white/20">|</span>
            <Link href="/about" className="hover:text-gold transition-colors">Tentang</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
