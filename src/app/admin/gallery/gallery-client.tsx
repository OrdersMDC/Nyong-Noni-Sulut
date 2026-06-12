'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Plus, Trash2, X } from 'lucide-react'
import { createGalleryItem, deleteGalleryItem } from '@/server/actions/content'
import { useRouter } from 'next/navigation'

interface GalleryItem {
  id: string
  title: string
  category: string
  image_url: string
  created_at: string
}

export function GalleryClient({ gallery }: { gallery: GalleryItem[] }) {
  const router = useRouter()
  const [showAdd, setShowAdd] = useState(false)
  const [form, setForm] = useState({ title: '', description: '', image_url: '', category: '' })

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault()
    const fd = new FormData()
    Object.entries(form).forEach(([k, v]) => fd.append(k, v))
    await createGalleryItem(fd)
    setShowAdd(false)
    setForm({ title: '', description: '', image_url: '', category: '' })
    router.refresh()
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Hapus foto ini?')) return
    await deleteGalleryItem(id)
    router.refresh()
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-display text-2xl font-bold text-ink">Galeri</h1>
        <Button variant="gold" onClick={() => setShowAdd(true)}><Plus className="mr-2 h-4 w-4" />Tambah Foto</Button>
      </div>

      <Card className="bg-surface-2 border-hairline text-ink">
        <CardHeader><CardTitle className="font-display text-lg text-ink">Daftar Galeri</CardTitle></CardHeader>
        <CardContent>
          {gallery.length === 0 ? (
            <div className="text-center py-12 text-ink-muted">Belum ada foto</div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {gallery.map((item) => (
                <div key={item.id} className="group relative rounded-lg overflow-hidden border border-hairline bg-surface-1/30 hover:bg-surface-1/60 hover:border-gold/30 transition-all duration-200">
                  <div className="aspect-[4/3] bg-gradient-to-br from-surface-1 to-surface-2 flex items-center justify-center border-b border-hairline text-3xl">
                    📸
                  </div>
                  <div className="p-2.5">
                    <p className="text-sm font-medium text-ink truncate">{item.title}</p>
                    <p className="text-xs text-ink-muted mt-0.5">{item.category}</p>
                  </div>
                  <button
                    className="absolute top-2 right-2 rounded-full bg-red-500/85 hover:bg-red-500 p-1.5 text-white opacity-0 group-hover:opacity-100 transition-opacity shadow-[0_0_10px_rgba(239,68,68,0.3)] cursor-pointer"
                    onClick={() => handleDelete(item.id)}
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {showAdd && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-canvas/80 backdrop-blur-md p-4">
          <Card className="w-full max-w-lg bg-surface-2 border-hairline text-ink shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
            <CardHeader className="flex flex-row items-center justify-between border-b border-hairline pb-4 mb-4">
              <CardTitle className="font-display text-lg text-ink">Tambah Foto</CardTitle>
              <Button variant="ghost" size="icon" className="text-ink-muted hover:text-ink hover:bg-surface-1" onClick={() => setShowAdd(false)}><X className="h-4 w-4" /></Button>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleAdd} className="space-y-4">
                <div>
                  <Label className="text-ink-muted text-xs font-semibold uppercase tracking-wider mb-1">Judul</Label>
                  <Input required className="bg-surface-1 border-hairline text-ink placeholder:text-ink-muted/50 focus-visible:ring-accent-blue/50 focus-visible:ring-1" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
                </div>
                <div>
                  <Label className="text-ink-muted text-xs font-semibold uppercase tracking-wider mb-1">URL Gambar</Label>
                  <Input required type="url" className="bg-surface-1 border-hairline text-ink placeholder:text-ink-muted/50 focus-visible:ring-accent-blue/50 focus-visible:ring-1" value={form.image_url} onChange={(e) => setForm({ ...form, image_url: e.target.value })} placeholder="https://..." />
                </div>
                <div>
                  <Label className="text-ink-muted text-xs font-semibold uppercase tracking-wider mb-1">Kategori</Label>
                  <Input required className="bg-surface-1 border-hairline text-ink placeholder:text-ink-muted/50 focus-visible:ring-accent-blue/50 focus-visible:ring-1" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} />
                </div>
                <div>
                  <Label className="text-ink-muted text-xs font-semibold uppercase tracking-wider mb-1">Deskripsi</Label>
                  <Input className="bg-surface-1 border-hairline text-ink placeholder:text-ink-muted/50 focus-visible:ring-accent-blue/50 focus-visible:ring-1" value={form.description || ''} onChange={(e) => setForm({ ...form, description: e.target.value })} />
                </div>
                <Button type="submit" variant="gold" className="w-full mt-2">Simpan</Button>
              </form>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
