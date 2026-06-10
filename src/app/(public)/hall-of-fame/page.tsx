import { getHallOfFame } from '@/server/actions/finalists'
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
    <div className="bg-canvas min-h-screen pb-[120px]">
      <section className="relative flex flex-col items-center justify-center pt-[180px] pb-[96px] px-[20px] text-center border-b border-hairline">
        <div className="max-w-4xl mx-auto">
          <p className="text-caption text-ink-muted uppercase tracking-widest mb-4">Pemenang</p>
          <div className="flex items-center justify-center gap-4 mb-8 animate-fade-in">
            <Crown className="h-10 w-10 text-accent-violet" />
            <h1 className="text-display-xl text-ink tracking-tighter">
              Hall of Fame
            </h1>
            <Crown className="h-10 w-10 text-accent-violet" />
          </div>
          <p className="text-subhead text-ink-muted max-w-2xl mx-auto">
            Para pemenang Nyong Noni Sulawesi Utara dari tahun ke tahun
          </p>
        </div>
      </section>

      <section className="py-[96px]">
        <div className="mx-auto max-w-7xl px-[20px]">
          <div className="mb-12">
            <HallOfFameFilter tahun={params.tahun} kota={params.kota} years={years} cities={cities} />
          </div>

          {filtered.length === 0 ? (
            <div className="py-20 text-center">
              <p className="text-body-lg text-ink-muted">Belum ada data Hall of Fame</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b-2 border-ink">
                    <th className="p-5 text-caption uppercase tracking-wider text-ink-muted">Tahun</th>
                    <th className="p-5 text-caption uppercase tracking-wider text-accent-blue">Nyong</th>
                    <th className="p-5 text-caption uppercase tracking-wider text-accent-magenta">Noni</th>
                    <th className="p-5 text-caption uppercase tracking-wider text-ink-muted">Kabupaten/Kota</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((entry: any) => (
                    <tr key={entry.id} className="border-b border-hairline hover:bg-surface-1 transition-colors">
                      <td className="p-5 text-headline text-ink">{entry.tahun}</td>
                      <td className="p-5">
                        <div className="flex items-center gap-4">
                          {entry.nyong_photo_url ? (
                            <img src={entry.nyong_photo_url} alt="" className="h-12 w-12 rounded-full object-cover border border-hairline" />
                          ) : (
                            <div className="h-12 w-12 rounded-full bg-surface-2 border border-hairline flex items-center justify-center text-ink font-semibold">N</div>
                          )}
                          <span className="text-body text-ink font-medium">{entry.nyong_name}</span>
                        </div>
                      </td>
                      <td className="p-5">
                        <div className="flex items-center gap-4">
                          {entry.noni_photo_url ? (
                            <img src={entry.noni_photo_url} alt="" className="h-12 w-12 rounded-full object-cover border border-hairline" />
                          ) : (
                            <div className="h-12 w-12 rounded-full bg-surface-2 border border-hairline flex items-center justify-center text-ink font-semibold">N</div>
                          )}
                          <span className="text-body text-ink font-medium">{entry.noni_name}</span>
                        </div>
                      </td>
                      <td className="p-5 text-body-sm text-ink-muted">{entry.kabupaten_kota}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
