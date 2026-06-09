import { Card, CardContent } from '@/components/ui/card'
import { Calendar } from 'lucide-react'

const newsItems: Array<{
  title: string
  excerpt: string
  date: string
  slug: string
}> = []

export default function NewsPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mb-12 text-center">
        <h1 className="font-display text-4xl font-bold text-dark">Berita</h1>
        <p className="mt-2 text-muted">
          Informasi dan perkembangan terbaru Nyong Noni Sulawesi Utara
        </p>
      </div>

      {newsItems.length === 0 ? (
        <div className="py-20 text-center">
          <p className="text-lg text-muted">
            Belum ada berita. Pantau terus informasi terbaru dari kami.
          </p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {newsItems.map((item) => (
            <Card key={item.slug} className="group cursor-pointer transition-all hover:shadow-lg">
              <CardContent className="p-5">
                <div className="flex items-center gap-2 text-sm text-muted mb-3">
                  <Calendar className="h-4 w-4" />
                  <span>{item.date}</span>
                </div>
                <h3 className="font-display text-lg font-semibold group-hover:text-primary transition-colors">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm text-muted line-clamp-3">
                  {item.excerpt}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
