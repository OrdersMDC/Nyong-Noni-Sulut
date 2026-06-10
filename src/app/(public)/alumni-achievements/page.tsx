import { getAlumniAchievements } from '@/server/actions/finalists'
import { Trophy, Instagram } from 'lucide-react'

const ACHIEVEMENT_COLORS: Record<string, string> = {
  'ASN': 'bg-surface-2 text-ink',
  'Dokter': 'bg-green-500/20 text-green-700',
  'Pengusaha': 'bg-gold/20 text-gold-dark',
  'Influencer': 'bg-accent-magenta/20 text-accent-magenta',
  'Duta Nasional': 'bg-accent-blue/20 text-accent-blue',
}

export default async function AlumniAchievementsPage({
  searchParams,
}: {
  searchParams: Promise<{ type?: string }>
}) {
  const params = await searchParams
  const achievements = await getAlumniAchievements().catch(() => []) as any[]

  const types = [...new Set(achievements.map((a: any) => a.achievement_type))]

  const filtered = params.type
    ? achievements.filter((a: any) => a.achievement_type === params.type)
    : achievements

  return (
    <div className="bg-canvas min-h-screen pb-[120px]">
      <section className="relative flex flex-col items-center justify-center pt-[180px] pb-[96px] px-[20px] text-center border-b border-hairline">
        <div className="max-w-4xl mx-auto">
          <p className="text-caption text-ink-muted uppercase tracking-widest mb-4">Alumni</p>
          <div className="flex items-center justify-center gap-4 mb-8 animate-fade-in">
            <Trophy className="h-10 w-10 text-accent-coral" />
            <h1 className="text-display-xl text-ink tracking-tighter">
              Prestasi
            </h1>
            <Trophy className="h-10 w-10 text-accent-coral" />
          </div>
          <p className="text-subhead text-ink-muted max-w-2xl mx-auto">
            Alumni Nyong Noni Sulawesi Utara yang berhasil di berbagai bidang
          </p>
        </div>
      </section>

      <section className="py-[96px]">
        <div className="mx-auto max-w-7xl px-[20px]">
          {/* Filter badges */}
          <div className="flex flex-wrap gap-3 mb-16 justify-center">
            <form>
              <button
                type="submit"
                name="type"
                value=""
                className={`rounded-full px-5 py-2 text-sm transition-colors border ${
                  !params.type
                    ? 'bg-ink text-surface-1 border-ink'
                    : 'bg-surface-2 text-ink border-hairline hover:bg-surface-1'
                }`}
              >
                Semua
              </button>
            </form>
            {types.map((t) => (
              <form key={t}>
                <button
                  type="submit"
                  name="type"
                  value={t}
                  className={`rounded-full px-5 py-2 text-sm transition-colors border ${
                    params.type === t
                      ? 'bg-ink text-surface-1 border-ink'
                      : 'bg-surface-2 text-ink border-hairline hover:bg-surface-1'
                  }`}
                >
                  {t}
                </button>
              </form>
            ))}
          </div>

          {filtered.length === 0 ? (
            <div className="py-20 text-center">
              <p className="text-body-lg text-ink-muted">Belum ada data prestasi alumni</p>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((a: any) => (
                <div key={a.id} className="product-mockup-tile flex flex-col p-8 interactive-hover active-scale">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="h-16 w-16 rounded-full bg-surface-2 border border-hairline flex items-center justify-center flex-shrink-0">
                      <span className="text-headline text-ink">{a.alumni_name.charAt(0)}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-headline text-ink mb-2 truncate">{a.alumni_name}</h3>
                      <span className={`px-2.5 py-1 rounded-md text-xs font-semibold ${ACHIEVEMENT_COLORS[a.achievement_type] || 'bg-surface-2 text-ink'}`}>
                        {a.achievement_type}
                      </span>
                    </div>
                  </div>
                  <p className="text-body-sm text-ink-muted leading-relaxed mb-6 flex-grow">{a.description}</p>
                  <div className="flex items-center gap-4 mt-auto text-sm text-ink-muted border-t border-hairline pt-4">
                    <span className="font-medium text-ink">{a.tahun}</span>
                    {a.instagram && (
                      <a href={`https://instagram.com/${a.instagram.replace('@', '')}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-accent-blue hover:opacity-80 transition-opacity ml-auto">
                        <Instagram className="h-4 w-4" /> <span className="truncate max-w-[120px]">{a.instagram}</span>
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
