import Link from 'next/link'
import { Instagram, Mail, MapPin } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-canvas border-t border-hairline pt-[96px] pb-[48px] px-[32px]">
      <div className="mx-auto max-w-7xl">
        {/* Top Section: Large Brand Display Callout */}
        <div className="border-b border-hairline-soft pb-[48px] mb-[64px] flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
          <div>
            <span className="text-caption text-accent-blue font-semibold uppercase tracking-widest block mb-3">
              IKATAN NYONG NONI SULUT
            </span>
            <h2 className="text-display-md md:text-display-lg font-medium text-ink leading-tight tracking-tighter uppercase max-w-3xl">
              Membentuk Pemimpin Muda Inspiratif untuk Sulawesi Utara
            </h2>
          </div>
          <div className="shrink-0">
            <Link
              href="/register"
              className="inline-flex items-center justify-center bg-primary text-on-primary font-medium rounded-pill px-6 py-3.5 text-button transition-all duration-150 hover:opacity-90 active:scale-[0.97] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent-blue/50"
            >
              Daftar Sekarang
            </Link>
          </div>
        </div>

        {/* Dense Columns Section */}
        <div className="flex flex-col md:flex-row flex-wrap gap-8 lg:gap-12 justify-between text-caption text-ink-muted">
          {/* Brand Column */}
          <div className="w-full md:w-[35%] lg:w-[40%] min-w-[280px] space-y-6">
            <div>
              <span className="text-body font-bold text-ink tracking-tight block mb-2">
                Nyong Noni Sulut
              </span>
              <p className="text-caption text-ink-muted leading-relaxed">
                Platform resmi pembinaan, pemilihan, dan kolaborasi duta wisata, budaya, dan investasi Provinsi Sulawesi Utara.
              </p>
            </div>
            
            {/* Social & Contact Buttons */}
            <div className="flex items-center gap-3">
              <a
                href="https://instagram.com/nyongnonisulut"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center rounded-full bg-surface-1 text-ink md:size-[40px] size-[44px] hover:bg-surface-2 transition-all duration-200 hover:-translate-y-0.5 active:scale-[0.97] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent-blue/50"
                aria-label="Instagram Nyong Noni Sulut"
              >
                <Instagram className="h-4.5 w-4.5" />
              </a>
              <a
                href="mailto:info@nyongnonisulut.id"
                className="flex items-center justify-center rounded-full bg-surface-1 text-ink md:size-[40px] size-[44px] hover:bg-surface-2 transition-all duration-200 hover:-translate-y-0.5 active:scale-[0.97] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent-blue/50"
                aria-label="Email Nyong Noni Sulut"
              >
                <Mail className="h-4.5 w-4.5" />
              </a>
            </div>
          </div>

          {/* Column 1: Jelajahi */}
          <div className="w-full md:w-[15%] lg:w-[12%] min-w-[140px] space-y-4">
            <h4 className="font-semibold text-ink uppercase tracking-wider text-micro">Jelajahi</h4>
            <ul className="space-y-3">
              {[
                { label: 'Tentang Kami', href: '/about' },
                { label: 'Finalis', href: '/finalists' },
                { label: 'Hall of Fame', href: '/hall-of-fame' },
                { label: 'Prestasi Alumni', href: '/alumni-achievements' },
              ].map((link) => (
                <li key={link.href}>
                  <Link 
                    href={link.href} 
                    className="hover:text-ink hover:translate-x-1 inline-block transition-all duration-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent-blue/50"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 2: Media */}
          <div className="w-full md:w-[15%] lg:w-[12%] min-w-[140px] space-y-4">
            <h4 className="font-semibold text-ink uppercase tracking-wider text-micro">Media</h4>
            <ul className="space-y-3">
              {[
                { label: 'Galeri Kegiatan', href: '/gallery' },
                { label: 'Berita & Rilis', href: '/news' },
                { label: 'Agenda Acara', href: '/events' },
              ].map((link) => (
                <li key={link.href}>
                  <Link 
                    href={link.href} 
                    className="hover:text-ink hover:translate-x-1 inline-block transition-all duration-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent-blue/50"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Hubungi Kami */}
          <div className="w-full md:w-[20%] lg:w-[18%] min-w-[200px] space-y-4">
            <h4 className="font-semibold text-ink uppercase tracking-wider text-micro">Hubungi Kami</h4>
            <ul className="space-y-3 font-sans">
              <li className="flex items-start gap-2.5">
                <MapPin className="h-4 w-4 shrink-0 text-accent-blue mt-0.5" />
                <span className="leading-relaxed">Manado, Sulawesi Utara, Indonesia</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="h-4 w-4 shrink-0 text-accent-blue" />
                <a 
                  href="mailto:info@nyongnonisulut.id" 
                  className="hover:text-ink hover:translate-x-1 inline-block transition-all duration-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent-blue/50"
                >
                  info@nyongnonisulut.id
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Massive Decorative Wordmark */}
        <div className="mt-[96px] select-none border-t border-hairline-soft pt-[32px] overflow-hidden flex justify-center">
          <span className="text-[12vw] sm:text-[9vw] md:text-[8vw] lg:text-[7vw] xl:text-[90px] font-bold tracking-tighter text-ink opacity-[0.03] leading-none uppercase pointer-events-none whitespace-nowrap">
            Nyong Noni Sulut
          </span>
        </div>

        {/* Bottom copyright/links */}
        <div className="mt-8 pt-6 border-t border-hairline-soft flex flex-col sm:flex-row items-center justify-between gap-4 text-micro text-ink-muted">
          <p>&copy; {new Date().getFullYear()} Ikatan Nyong Noni Sulawesi Utara. Seluruh hak cipta dilindungi.</p>
          <div className="flex items-center gap-6">
            <Link 
              href="/register" 
              className="hover:text-ink transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent-blue/50"
            >
              Pendaftaran
            </Link>
            <Link 
              href="/about" 
              className="hover:text-ink transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent-blue/50"
            >
              Tentang
            </Link>
            <a 
              href="https://sulutprov.go.id" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:text-ink transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent-blue/50"
            >
              Pemprov SULUT
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
