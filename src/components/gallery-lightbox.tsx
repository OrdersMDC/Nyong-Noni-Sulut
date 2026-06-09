'use client'

import { useState, useEffect, useCallback } from 'react'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'
import Image from 'next/image'

interface GalleryImage {
  id: string
  image_url: string
  title: string
  description?: string | null
}

interface GalleryLightboxProps {
  images: GalleryImage[]
  initialIndex?: number
  onClose: () => void
}

export function GalleryLightbox({ images, initialIndex = 0, onClose }: GalleryLightboxProps) {
  const [index, setIndex] = useState(initialIndex)
  const current = images[index]

  const goNext = useCallback(() => {
    setIndex((i) => (i + 1) % images.length)
  }, [images.length])

  const goPrev = useCallback(() => {
    setIndex((i) => (i - 1 + images.length) % images.length)
  }, [images.length])

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'Escape': onClose(); break
        case 'ArrowRight': goNext(); break
        case 'ArrowLeft': goPrev(); break
      }
    }
    document.addEventListener('keydown', handleKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handleKey)
      document.body.style.overflow = ''
    }
  }, [onClose, goNext, goPrev])

  if (!current) return null

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black/95"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Galeri foto"
    >
      <button
        onClick={(e) => { e.stopPropagation(); onClose() }}
        className="absolute top-4 right-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors text-white"
        aria-label="Tutup"
      >
        <X className="h-5 w-5" />
      </button>

      <button
        onClick={(e) => { e.stopPropagation(); goPrev() }}
        className="absolute left-4 z-10 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors text-white"
        aria-label="Sebelumnya"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>

      <div className="relative max-h-[85vh] max-w-[90vw]" onClick={(e) => e.stopPropagation()}>
        <Image
          src={current.image_url}
          alt={current.title}
          width={1200}
          height={800}
          className="max-h-[85vh] w-auto object-contain rounded-lg"
          priority
        />
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent rounded-b-lg">
          <p className="text-white font-medium">{current.title}</p>
          {current.description && (
            <p className="text-sm text-white/70 mt-1">{current.description}</p>
          )}
          <p className="text-xs text-white/50 mt-1">{index + 1} / {images.length}</p>
        </div>
      </div>

      <button
        onClick={(e) => { e.stopPropagation(); goNext() }}
        className="absolute right-4 z-10 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors text-white"
        aria-label="Selanjutnya"
      >
        <ChevronRight className="h-6 w-6" />
      </button>
    </div>
  )
}
