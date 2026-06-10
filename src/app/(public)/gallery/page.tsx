'use client'

import { useState } from 'react'
import { GalleryLightbox } from '@/components/gallery-lightbox'
import { ImageIcon } from 'lucide-react'

const albums = [
  { title: 'Grand Final 2025', count: 24, color: 'from-gold/20 to-gold/5' },
  { title: 'Auditions', count: 18, color: 'from-ocean/20 to-ocean/5' },
  { title: 'Photo Shoot', count: 12, color: 'from-teal/20 to-teal/5' },
  { title: 'Cultural Day', count: 15, color: 'from-coral/20 to-coral/5' },
]

const sampleImages = [
  { id: '1', image_url: '/placeholder.svg', title: 'Grand Final 2025', description: 'Malam puncak Grand Final Nyong Noni 2025' },
  { id: '2', image_url: '/placeholder.svg', title: 'Audisi Kota Manado', description: 'Ribuan peserta antusias mengikuti audisi' },
  { id: '3', image_url: '/placeholder.svg', title: 'Sesi Foto Peserta', description: 'Pemotretan resmi para finalis' },
  { id: '4', image_url: '/placeholder.svg', title: 'Batik Sulawesi Utara', description: 'Pesona batik khas daerah' },
  { id: '5', image_url: '/placeholder.svg', title: 'Karantina', description: 'Pembekalan dan pelatihan finalis' },
  { id: '6', image_url: '/placeholder.svg', title: 'Bunaken Island', description: 'Foto bersama di destinasi wisata unggulan' },
]

export default function GalleryPage() {
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState(0)

  const openLightbox = (index: number) => {
    setLightboxIndex(index)
    setLightboxOpen(true)
  }

  return (
    <div className="bg-canvas min-h-screen pb-[120px]">
      {/* ─── HERO ─── */}
      <section className="relative flex flex-col items-center justify-center pt-[180px] pb-[96px] px-[20px] text-center border-b border-hairline">
        <div className="max-w-4xl mx-auto">
          <p className="text-caption text-ink-muted uppercase tracking-widest mb-4">Galeri</p>
          <h1 className="text-display-xl text-ink tracking-tighter mb-8 animate-fade-in">
            Dokumentasi <br />
            <span className="text-accent-coral">Visual</span>
          </h1>
          <p className="text-subhead text-ink-muted max-w-2xl mx-auto">
            Momen-momen terbaik dari perjalanan Nyong Noni Sulawesi Utara
          </p>
        </div>
      </section>

      {/* ─── ALBUMS GRID ─── */}
      <section className="py-[96px]">
        <div className="mx-auto max-w-7xl px-[20px]">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {albums.map((album) => (
              <button
                key={album.title}
                onClick={() => openLightbox(0)}
                className="product-mockup-tile text-left p-0 overflow-hidden interactive-hover active-scale group"
              >
                <div className={`aspect-[4/3] bg-surface-2 flex items-center justify-center relative`}>
                  <ImageIcon className="h-10 w-10 text-ink-muted opacity-50 group-hover:scale-110 transition-transform" />
                </div>
                <div className="p-6">
                  <h3 className="text-headline text-ink mb-1">{album.title}</h3>
                  <p className="text-body-sm text-ink-muted">{album.count} foto</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ─── RECENT PHOTOS ─── */}
      <section className="py-[96px] bg-surface-1 border-t border-hairline">
        <div className="mx-auto max-w-7xl px-[20px]">
          <div className="text-center mb-16">
            <h2 className="text-display-lg text-ink">Foto Terbaru</h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {sampleImages.map((img, i) => (
              <button
                key={img.id}
                onClick={() => openLightbox(i)}
                className="group relative aspect-[4/3] rounded-[16px] overflow-hidden bg-surface-2 interactive-hover active-scale border border-hairline"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-surface-1/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all text-left">
                  <p className="text-headline text-ink">{img.title}</p>
                </div>
                <div className="flex h-full items-center justify-center">
                  <ImageIcon className="h-8 w-8 text-ink-muted opacity-30 group-hover:scale-110 transition-transform" />
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {lightboxOpen && (
        <GalleryLightbox
          images={sampleImages}
          initialIndex={lightboxIndex}
          onClose={() => setLightboxOpen(false)}
        />
      )}
    </div>
  )
}
