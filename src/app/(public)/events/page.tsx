import { Calendar, MapPin, Clock } from 'lucide-react'

const CATEGORIES = ['Audisi', 'Karantina', 'Grand Final', 'Kegiatan Sosial', 'Promosi Wisata'] as const

const CATEGORY_COLORS: Record<string, string> = {
  'Grand Final': 'bg-gold text-white',
  'Karantina': 'bg-primary text-white',
  'Audisi': 'bg-surface-2 text-ink',
  'Kegiatan Sosial': 'bg-green-500/20 text-green-700',
  'Promosi Wisata': 'bg-yellow-500/20 text-yellow-700',
}

interface EventItem {
  id: string
  title: string
  description: string
  date: string
  location: string
  category: string
  image_url?: string | null
  published?: boolean
}

export default async function EventsPage() {
  let events: EventItem[] = []
  try {
    const { getEvents } = await import('@/server/actions/content')
    events = (await getEvents().catch(() => [])) as EventItem[]
  } catch {}

  return (
    <div className="bg-canvas min-h-screen pb-[120px]">
      <section className="relative flex flex-col items-center justify-center pt-[180px] pb-[96px] px-[20px] text-center border-b border-hairline">
        <div className="max-w-4xl mx-auto">
          <p className="text-caption text-ink-muted uppercase tracking-widest mb-4">Event & Kegiatan</p>
          <h1 className="text-display-xl text-ink tracking-tighter mb-8 animate-fade-in">
            Jadwal Acara <br />
            <span className="text-accent-violet">Nyong Noni</span>
          </h1>
          <p className="text-subhead text-ink-muted max-w-2xl mx-auto">
            Ikuti setiap kegiatan mulai dari audisi, masa karantina, hingga malam puncak Grand Final.
          </p>
        </div>
      </section>

      <section className="py-[96px] bg-surface-1">
        <div className="mx-auto max-w-7xl px-[20px]">
          <div className="flex flex-wrap gap-3 mb-16 justify-center">
            {CATEGORIES.map((cat) => (
              <div key={cat} className="flex items-center gap-2 rounded-full border border-hairline px-5 py-2 text-sm bg-surface-2">
                {cat}
              </div>
            ))}
          </div>

          {events.length === 0 ? (
            <div className="py-20 text-center">
              <p className="text-body-lg text-ink-muted">Belum ada acara yang dijadwalkan.</p>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2">
              {events.map((event) => (
                <div key={event.id} className="product-mockup-tile flex flex-col p-8 interactive-hover">
                  <div className="flex items-start justify-between mb-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${CATEGORY_COLORS[event.category] || 'bg-surface-2 text-ink'}`}>
                      {event.category}
                    </span>
                    <span className="text-caption text-ink-muted">{event.date}</span>
                  </div>
                  <h3 className="text-headline text-ink mb-3">{event.title}</h3>
                  <p className="text-body-sm text-ink-muted mb-6">{event.description}</p>
                  
                  <div className="mt-auto flex flex-wrap gap-4 text-sm text-ink-muted border-t border-hairline pt-4">
                    <span className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      {new Date(event.date).toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                    </span>
                    <span className="flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      {event.location}
                    </span>
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
