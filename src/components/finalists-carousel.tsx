'use client'

import { useRef, useEffect, useState, useCallback } from 'react'
import Image from 'next/image'
import Link from 'next/link'

interface FinalistCardData {
  id: string
  full_name: string
  city: string
  photo_url: string | null
  umur: number | null
}

interface Props {
  items: FinalistCardData[]
  speed?: number
}

export function FinalistsCarousel({ items, speed = 0.4 }: Props) {
  const containerRef = useRef<HTMLDivElement>(null)
  const animationRef = useRef<number>(0)
  const currentXRef = useRef(0)
  const isPausedRef = useRef(false)
  const isDraggingRef = useRef(false)
  const dragStartXRef = useRef(0)
  const dragStartPosRef = useRef(0)
  const lastTimeRef = useRef(performance.now())
  const [isHovered, setIsHovered] = useState(false)

  const duplicated = [...items, ...items]

  const animate = useCallback((time: number) => {
    const delta = time - lastTimeRef.current
    lastTimeRef.current = time

    if (!isPausedRef.current && !isDraggingRef.current) {
      currentXRef.current -= speed * (delta / 16.67)

      if (containerRef.current) {
        const halfWidth = containerRef.current.scrollWidth / 2
        if (Math.abs(currentXRef.current) >= halfWidth) {
          currentXRef.current = 0
        }
        containerRef.current.style.transform = `translateX(${currentXRef.current}px)`
      }
    }

    animationRef.current = requestAnimationFrame(animate)
  }, [speed])

  useEffect(() => {
    lastTimeRef.current = performance.now()
    animationRef.current = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animationRef.current)
  }, [animate])

  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    isDraggingRef.current = true
    dragStartXRef.current = e.clientX
    dragStartPosRef.current = currentXRef.current
    if (containerRef.current) {
      containerRef.current.style.cursor = 'grabbing'
      containerRef.current.setPointerCapture(e.pointerId)
    }
  }, [])

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    if (!isDraggingRef.current || !containerRef.current) return
    const deltaX = e.clientX - dragStartXRef.current
    currentXRef.current = dragStartPosRef.current + deltaX
    containerRef.current.style.transform = `translateX(${currentXRef.current}px)`
    containerRef.current.style.transition = 'none'
  }, [])

  const handlePointerUp = useCallback((e: React.PointerEvent) => {
    isDraggingRef.current = false
    if (containerRef.current) {
      containerRef.current.style.cursor = 'grab'
      containerRef.current.releasePointerCapture(e.pointerId)
    }
  }, [])

  const handlePointerLeave = useCallback(() => {
    isDraggingRef.current = false
  }, [])

  return (
    <div className="relative w-full overflow-hidden">
      {/* Edge gradient masks */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 md:w-32 bg-gradient-to-r from-background to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 md:w-32 bg-gradient-to-l from-background to-transparent" />

      <div
        ref={containerRef}
        className="flex gap-5 md:gap-6 cursor-grab select-none"
        style={{ willChange: 'transform' }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerLeave}
        onMouseEnter={() => { isPausedRef.current = true; setIsHovered(true) }}
        onMouseLeave={() => { isPausedRef.current = false; setIsHovered(false) }}
        role="region"
        aria-label="Finalis Nyong Noni Sulawesi Utara"
        aria-roledescription="carousel"
      >
        {duplicated.map((item, idx) => (
          <Link
            key={`${item.id}-${idx}`}
            href={`/finalists/${item.id}`}
            className="group relative flex-shrink-0 w-[220px] sm:w-[260px] md:w-[280px] h-[340px] sm:h-[380px] md:h-[420px] rounded-2xl overflow-hidden shadow-lg transition-transform duration-500 hover:scale-[1.04]"
            style={{ transitionTimingFunction: 'cubic-bezier(0.34, 1.56, 0.64, 1)' }}
            aria-label={`${item.full_name} dari ${item.city}`}
          >
            {/* Photo */}
            {item.photo_url ? (
              <Image
                src={item.photo_url}
                alt={item.full_name}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                sizes="(max-width: 640px) 220px, (max-width: 768px) 260px, 280px"
              />
            ) : (
              <div className="absolute inset-0 bg-gradient-to-br from-ocean to-primary flex items-center justify-center">
                <span className="font-display text-6xl text-white/30">{item.full_name.charAt(0)}</span>
              </div>
            )}

            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

            {/* Gold accent line - top */}
            <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-gold to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            {/* Content */}
            <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6">
              <div className="transform transition-transform duration-300 group-hover:-translate-y-1">
                <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-gold-light mb-1.5">
                  Finalis 2026
                </p>
                <h3 className="font-display text-lg md:text-xl font-bold text-white leading-tight">
                  {item.full_name}
                </h3>
                <p className="text-xs text-white/60 mt-1 flex items-center gap-1">
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {item.city}
                </p>
              </div>
            </div>

            {/* Shine effect on hover */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
              <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/10 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
