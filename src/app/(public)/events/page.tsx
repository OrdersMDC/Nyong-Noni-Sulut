import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Calendar, MapPin, Clock } from 'lucide-react'

const CATEGORIES = ['Audisi', 'Karantina', 'Grand Final', 'Kegiatan Sosial', 'Promosi Wisata'] as const

const CATEGORY_COLORS: Record<string, 'default' | 'gold' | 'success' | 'secondary' | 'warning'> = {
  'Grand Final': 'gold',
  'Karantina': 'default',
  'Audisi': 'secondary',
  'Kegiatan Sosial': 'success',
  'Promosi Wisata': 'warning',
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
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mb-12 text-center">
        <h1 className="font-display text-4xl font-bold text-dark">Event & Kegiatan</h1>
        <p className="mt-2 text-muted">Jadwal dan informasi kegiatan Nyong Noni Sulawesi Utara</p>
      </div>

      {/* Categories */}
      <div className="flex flex-wrap gap-3 mb-10 justify-center">
        {CATEGORIES.map((cat) => (
          <div key={cat} className="flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm">
            <div className={`h-2 w-2 rounded-full ${
              cat === 'Grand Final' ? 'bg-gold' :
              cat === 'Karantina' ? 'bg-primary' :
              cat === 'Audisi' ? 'bg-dark' :
              cat === 'Kegiatan Sosial' ? 'bg-green-500' :
              'bg-yellow-500'
            }`} />
            {cat}
          </div>
        ))}
      </div>

      {events.length === 0 ? (
        <div className="py-20 text-center">
          <p className="text-lg text-muted">Belum ada acara yang dijadwalkan.</p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2">
          {events.map((event) => (
            <Card key={event.id} className="transition-all hover:shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <Badge variant={CATEGORY_COLORS[event.category] || 'default'}>
                    {event.category}
                  </Badge>
                  <span className="text-xs text-muted">{event.date}</span>
                </div>
                <h3 className="font-display text-xl font-semibold">{event.title}</h3>
                <p className="mt-2 text-sm text-muted line-clamp-2">{event.description}</p>
                <div className="mt-4 flex flex-wrap gap-4 text-sm text-muted">
                  <span className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    {new Date(event.date).toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    {event.location}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
