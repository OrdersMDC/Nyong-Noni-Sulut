'use client'

import { useState, useMemo } from 'react'
import { GalleryLightbox } from '@/components/gallery-lightbox'
import { ImageIcon } from 'lucide-react'

interface GalleryItem {
  id: string
  title: string
  description?: string | null
  image_url: string
  category: string
  created_at?: string
}

interface GalleryClientProps {
  images: GalleryItem[]
}

export default function GalleryClient({ images }: GalleryClientProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('All')
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState(0)

  // Group images by category to calculate albums dynamically
  const albums = useMemo(() => {
    const groups: Record<string, { count: number; coverUrl: string }> = {}
    
    images.forEach((img) => {
      if (!groups[img.category]) {
        groups[img.category] = { count: 0, coverUrl: img.image_url }
      }
      groups[img.category].count += 1
    })

    return Object.entries(groups).map(([category, info]) => ({
      title: category,
      count: info.count,
      coverUrl: info.coverUrl,
    }))
  }, [images])

  const filteredImages = useMemo(() => {
    if (selectedCategory === 'All') return images
    return images.filter((img) => img.category === selectedCategory)
  }, [images, selectedCategory])

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
          <div className="text-center mb-10">
            <p className="text-caption text-ink-muted uppercase tracking-widest mb-2">Kategori Album</p>
            <h2 className="text-display-md text-ink">Jelajahi Berdasarkan Kegiatan</h2>
          </div>

          {albums.length === 0 ? (
            <p className="text-center text-ink-muted">Belum ada album galeri.</p>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {/* "All" Card */}
              <button
                onClick={() => setSelectedCategory('All')}
                className={`product-mockup-tile text-left p-0 overflow-hidden interactive-hover active-scale group ${
                  selectedCategory === 'All' ? 'ring-2 ring-accent-coral ring-offset-2' : ''
                }`}
              >
                <div className="aspect-[4/3] bg-surface-2 flex items-center justify-center relative overflow-hidden">
                  {images.length > 0 ? (
                    <>
                      <img
                        src={images[0].image_url}
                        alt="Semua Foto"
                        className="w-full h-full object-cover opacity-60 transition-transform duration-750 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                        <span className="text-white font-semibold text-lg uppercase tracking-wider">Semua Foto</span>
                      </div>
                    </>
                  ) : (
                    <ImageIcon className="h-10 w-10 text-ink-muted opacity-50" />
                  )}
                </div>
                <div className="p-6">
                  <h3 className="text-headline text-ink mb-1">Semua Foto</h3>
                  <p className="text-body-sm text-ink-muted">{images.length} foto</p>
                </div>
              </button>

              {/* Dynamic Album Cards */}
              {albums.map((album) => (
                <button
                  key={album.title}
                  onClick={() => setSelectedCategory(album.title)}
                  className={`product-mockup-tile text-left p-0 overflow-hidden interactive-hover active-scale group ${
                    selectedCategory === album.title ? 'ring-2 ring-accent-coral ring-offset-2' : ''
                  }`}
                >
                  <div className="aspect-[4/3] bg-surface-2 flex items-center justify-center relative overflow-hidden">
                    {album.coverUrl ? (
                      <img
                        src={album.coverUrl}
                        alt={album.title}
                        className="w-full h-full object-cover transition-transform duration-750 group-hover:scale-105"
                      />
                    ) : (
                      <ImageIcon className="h-10 w-10 text-ink-muted opacity-50 group-hover:scale-110 transition-transform" />
                    )}
                  </div>
                  <div className="p-6">
                    <h3 className="text-headline text-ink mb-1 truncate">{album.title}</h3>
                    <p className="text-body-sm text-ink-muted">{album.count} foto</p>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ─── PHOTOS GRID ─── */}
      <section className="py-[96px] bg-surface-1 border-t border-hairline">
        <div className="mx-auto max-w-7xl px-[20px]">
          <div className="text-center mb-16">
            <h2 className="text-display-lg text-ink">
              {selectedCategory === 'All' ? 'Semua Foto' : `Album: ${selectedCategory}`}
            </h2>
            <p className="text-body text-ink-muted mt-2">
              Menampilkan {filteredImages.length} foto
            </p>
          </div>

          {filteredImages.length === 0 ? (
            <div className="py-20 text-center">
              <p className="text-body-lg text-ink-muted">Belum ada foto dalam kategori ini.</p>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filteredImages.map((img, i) => (
                <button
                  key={img.id}
                  onClick={() => openLightbox(i)}
                  className="group relative aspect-[4/3] rounded-[16px] overflow-hidden bg-surface-2 interactive-hover active-scale border border-hairline"
                >
                  <img
                    src={img.image_url}
                    alt={img.title}
                    className="w-full h-full object-cover transition-transform duration-750 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300 text-left">
                    <p className="text-headline text-white font-medium mb-1">{img.title}</p>
                    {img.description && (
                      <p className="text-body-sm text-white/80 line-clamp-2 leading-relaxed">{img.description}</p>
                    )}
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </section>

      {lightboxOpen && filteredImages.length > 0 && (
        <GalleryLightbox
          images={filteredImages}
          initialIndex={lightboxIndex}
          onClose={() => setLightboxOpen(false)}
        />
      )}
    </div>
  )
}
