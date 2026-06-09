'use client'

import { Search } from 'lucide-react'

export function HallOfFameFilter({
  tahun,
  kota,
  years,
  cities,
}: {
  tahun?: string
  kota?: string
  years: number[]
  cities: string[]
}) {
  return (
    <div className="flex flex-wrap gap-4 mb-8 justify-center">
      <div className="relative w-48">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
        <form>
          <select
            name="tahun"
            defaultValue={tahun || ''}
            onChange={(e) => {
              const url = new URL(window.location.href)
              url.searchParams.set('tahun', e.target.value)
              window.location.href = url.toString()
            }}
            className="w-full rounded-lg border border-border bg-white pl-9 pr-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
          >
            <option value="">Semua Tahun</option>
            {years.map((y) => <option key={y} value={String(y)}>{y}</option>)}
          </select>
        </form>
      </div>
      <div className="relative w-48">
        <form>
          <select
            name="kota"
            defaultValue={kota || ''}
            onChange={(e) => {
              const url = new URL(window.location.href)
              url.searchParams.set('kota', e.target.value)
              window.location.href = url.toString()
            }}
            className="w-full rounded-lg border border-border bg-white px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
          >
            <option value="">Semua Kota</option>
            {cities.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        </form>
      </div>
    </div>
  )
}
