'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Plus, Trash2, X } from 'lucide-react'
import { createNews, deleteNews } from '@/server/actions/content'
import { useRouter } from 'next/navigation'

interface NewsItem {
  id: string
  title: string
  slug: string
  excerpt: string
  published: number | boolean
  created_at: string
}

export function NewsClient({ news }: { news: NewsItem[] }) {
  const router = useRouter()
  const [showAdd, setShowAdd] = useState(false)
  const [form, setForm] = useState({ title: '', slug: '', content: '', excerpt: '', published: false })

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault()
    const fd = new FormData()
    Object.entries(form).forEach(([k, v]) => fd.append(k, String(v)))
    await createNews(fd)
    setShowAdd(false)
    setForm({ title: '', slug: '', content: '', excerpt: '', published: false })
    router.refresh()
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Hapus berita ini?')) return
    await deleteNews(id)
    router.refresh()
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-display text-2xl font-bold text-dark">Berita</h1>
        <Button onClick={() => setShowAdd(true)}><Plus className="mr-2 h-4 w-4" />Tambah Berita</Button>
      </div>

      <Card>
        <CardHeader><CardTitle className="font-display text-lg">Daftar Berita</CardTitle></CardHeader>
        <CardContent>
          {news.length === 0 ? (
            <div className="text-center py-12 text-muted">Belum ada berita</div>
          ) : (
            <div className="space-y-3">
              {news.map((item) => (
                <div key={item.id} className="flex items-center justify-between rounded-lg border border-border p-4">
                  <div>
                    <p className="font-medium">{item.title}</p>
                    <p className="text-xs text-muted mt-1">{item.excerpt}</p>
                  </div>
                  <Button variant="ghost" size="icon" className="text-red-600" onClick={() => handleDelete(item.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {showAdd && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <Card className="w-full max-w-lg">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="font-display text-lg">Tambah Berita</CardTitle>
              <Button variant="ghost" size="icon" onClick={() => setShowAdd(false)}><X className="h-4 w-4" /></Button>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleAdd} className="space-y-4">
                <div><Label>Judul</Label><Input required value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} /></div>
                <div><Label>Slug</Label><Input required value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} /></div>
                <div><Label>Ringkasan</Label><Input required value={form.excerpt} onChange={(e) => setForm({ ...form, excerpt: e.target.value })} /></div>
                <div><Label>Konten</Label><textarea required className="flex h-20 w-full rounded-lg border border-border bg-white px-3 py-2 text-sm" value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} /></div>
                <label className="flex items-center gap-2 text-sm">
                  <input type="checkbox" checked={form.published} onChange={(e) => setForm({ ...form, published: e.target.checked })} />
                  Publikasikan
                </label>
                <Button type="submit" className="w-full">Simpan</Button>
              </form>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
