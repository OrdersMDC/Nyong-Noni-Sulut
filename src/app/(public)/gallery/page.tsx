'use client'

import { useState } from 'react'
import { Section } from '@/components/section'
import { GalleryLightbox } from '@/components/gallery-lightbox'
import { BentenanPattern } from '@/components/pattern'
import { CornerAccent } from '@/components/pattern'
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
    <>
      {/* ─── HERO ─── */}
      <section className="relative py-28 md:py-36 overflow-hidden bg-gradient-to-br from-ocean via-ocean/95 to-primary text-white">
        <BentenanPattern className="absolute inset-0 opacity-[0.03]" />
        <div className="section-container relative z-10 text-center">
          <p className="eyebrow text-gold-light">Galeri</p>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mt-4">
            Dokumentasi Visual
          </h1>
          <p className="mt-4 text-lg text-white/70 max-w-2xl mx-auto">
            Momen-momen terbaik dari perjalanan Nyong Noni Sulawesi Utara
          </p>
        </div>
      </section>

      {/* ─── ALBUMS GRID ─── */}
      <Section>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {albums.map((album) => (
            <button
              key={album.title}
              onClick={() => openLightbox(0)}
              className="group relative rounded-2xl overflow-hidden border border-gray-100 bg-white text-left transition-all hover:shadow-lg"
            >
              <div className={`aspect-[4/3] bg-gradient-to-br ${album.color} flex items-center justify-center relative`}>
                <ImageIcon className="h-10 w-10 text-muted/30 group-hover:scale-110 transition-transform" />
                <CornerAccent className="absolute top-3 right-3 text-white/20" />
              </div>
              <div className="p-4">
                <h3 className="font-display font-semibold text-dark group-hover:text-primary transition-colors">{album.title}</h3>
                <p className="text-sm text-muted">{album.count} foto</p>
              </div>
            </button>
          ))}
        </div>
      </Section>

      {/* ─── RECENT PHOTOS ─── */}
      <Section variant="cream" pattern>
        <div className="text-center mb-12">
          <p className="eyebrow">Sorotan</p>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-ocean mt-3">
            Foto Terbaru
          </h2>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {sampleImages.map((img, i) => (
            <button
              key={img.id}
              onClick={() => openLightbox(i)}
              className="group relative aspect-[4/3] rounded-2xl overflow-hidden border border-gray-100 bg-gradient-to-br from-gray-100 to-gray-200 transition-all hover:shadow-lg"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-2 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all">
                <p className="text-white font-medium text-sm">{img.title}</p>
              </div>
              <div className="flex h-full items-center justify-center">
                <ImageIcon className="h-8 w-8 text-muted/40" />
              </div>
            </button>
          ))}
        </div>
      </Section>

      {lightboxOpen && (
        <GalleryLightbox
          images={sampleImages}
          initialIndex={lightboxIndex}
          onClose={() => setLightboxOpen(false)}
        />
      )}
    </>
  )
}
