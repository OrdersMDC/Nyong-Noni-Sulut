import Link from 'next/link'

export function Footer() {
  return (
    <footer className="border-t border-border bg-dark text-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <h3 className="font-display text-lg font-semibold text-gold">
              Nyong Noni Sulawesi Utara
            </h3>
            <p className="mt-2 text-sm text-gray-400">
              Ajang pemilihan duta wisata dan budaya Sulawesi Utara yang
              menampilkan generasi muda terbaik.
            </p>
          </div>
          <div>
            <h4 className="mb-3 font-semibold">Tautan</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link href="/about" className="hover:text-gold transition-colors">Tentang Kami</Link></li>
              <li><Link href="/finalists" className="hover:text-gold transition-colors">Finalis</Link></li>
              <li><Link href="/gallery" className="hover:text-gold transition-colors">Galeri</Link></li>
              <li><Link href="/register" className="hover:text-gold transition-colors">Pendaftaran</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="mb-3 font-semibold">Kontak</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>Email: info@nyongnonisulut.id</li>
              <li>Instagram: @nyongnonisulut</li>
              <li>Manado, Sulawesi Utara</li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-700 pt-8 text-center text-sm text-gray-500">
          &copy; {new Date().getFullYear()} Nyong Noni Sulawesi Utara. All
          rights reserved.
        </div>
      </div>
    </footer>
  )
}
