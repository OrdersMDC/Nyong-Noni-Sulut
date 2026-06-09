import { getHallOfFame } from '@/server/actions/finalists'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Crown } from 'lucide-react'
import { HallOfFameFilter } from './filter'

export default async function HallOfFamePage({
  searchParams,
}: {
  searchParams: Promise<{ tahun?: string; kota?: string }>
}) {
  const params = await searchParams
  const entries = await getHallOfFame().catch(() => []) as any[]

  const years = [...new Set(entries.map((e: any) => e.tahun))].sort((a, b) => b - a)
  const cities = [...new Set(entries.map((e: any) => e.kabupaten_kota))].sort()

  const filtered = entries.filter((e: any) => {
    if (params.tahun && e.tahun !== Number(params.tahun)) return false
    if (params.kota && e.kabupaten_kota !== params.kota) return false
    return true
  })

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mb-12 text-center">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Crown className="h-8 w-8 text-gold" />
          <h1 className="font-display text-4xl font-bold text-dark">Hall of Fame</h1>
          <Crown className="h-8 w-8 text-gold" />
        </div>
        <p className="text-muted">Para pemenang Nyong Noni Sulawesi Utara dari tahun ke tahun</p>
      </div>

      <HallOfFameFilter tahun={params.tahun} kota={params.kota} years={years} cities={cities} />

      {filtered.length === 0 ? (
        <div className="py-20 text-center text-muted">Belum ada data Hall of Fame</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b-2 border-gold/30 bg-gold/5">
                <th className="p-4 font-display text-sm font-semibold">Tahun</th>
                <th className="p-4 font-display text-sm font-semibold text-primary">Nyong</th>
                <th className="p-4 font-display text-sm font-semibold text-gold-dark">Noni</th>
                <th className="p-4 font-display text-sm font-semibold">Kabupaten/Kota</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((entry: any, i: number) => (
                <tr key={entry.id} className={`border-b border-border/50 ${i % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}`}>
                  <td className="p-4 font-bold text-lg">{entry.tahun}</td>
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      {entry.nyong_photo_url ? <img src={entry.nyong_photo_url} alt="" className="h-10 w-10 rounded-full object-cover" /> : <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">N</div>}
                      <span className="font-medium">{entry.nyong_name}</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      {entry.noni_photo_url ? <img src={entry.noni_photo_url} alt="" className="h-10 w-10 rounded-full object-cover" /> : <div className="h-10 w-10 rounded-full bg-gold/10 flex items-center justify-center text-gold-dark font-bold">N</div>}
                      <span className="font-medium">{entry.noni_name}</span>
                    </div>
                  </td>
                  <td className="p-4 text-muted">{entry.kabupaten_kota}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
