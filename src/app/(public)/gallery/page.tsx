import { Card, CardContent } from '@/components/ui/card'

const albums = [
  { title: 'Grand Final 2025', count: 24 },
  { title: 'Auditions', count: 18 },
  { title: 'Photo Shoot', count: 12 },
  { title: 'Cultural Day', count: 15 },
]

export default function GalleryPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mb-12 text-center">
        <h1 className="font-display text-4xl font-bold text-dark">Galeri</h1>
        <p className="mt-2 text-muted">
          Dokumentasi momen-momen terbaik Nyong Noni Sulawesi Utara
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {albums.map((album) => (
          <Card key={album.title} className="group cursor-pointer transition-all hover:shadow-lg">
            <CardContent className="p-0">
              <div className="aspect-[4/3] rounded-t-xl bg-gradient-to-br from-primary/10 to-gold/10 flex items-center justify-center">
                <span className="text-3xl text-muted">📸</span>
              </div>
              <div className="p-4">
                <h3 className="font-display font-semibold">{album.title}</h3>
                <p className="text-sm text-muted">{album.count} foto</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
