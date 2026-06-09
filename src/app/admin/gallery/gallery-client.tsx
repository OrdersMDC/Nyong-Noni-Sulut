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
        <h1 className="font-display text-2xl font-bold text-dark">Galeri</h1>
        <Button onClick={() => setShowAdd(true)}><Plus className="mr-2 h-4 w-4" />Tambah Foto</Button>
      </div>

      <Card>
        <CardHeader><CardTitle className="font-display text-lg">Daftar Galeri</CardTitle></CardHeader>
        <CardContent>
          {gallery.length === 0 ? (
            <div className="text-center py-12 text-muted">Belum ada foto</div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {gallery.map((item) => (
                <div key={item.id} className="group relative rounded-lg overflow-hidden border border-border">
                  <div className="aspect-[4/3] bg-gradient-to-br from-primary/10 to-gold/10 flex items-center justify-center">
                    <span className="text-3xl">📸</span>
                  </div>
                  <div className="p-2">
                    <p className="text-sm font-medium truncate">{item.title}</p>
                    <p className="text-xs text-muted">{item.category}</p>
                  </div>
                  <button
                    className="absolute top-2 right-2 rounded-full bg-red-600 p-1 text-white opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={() => handleDelete(item.id)}
                  >
                    <Trash2 className="h-3 w-3" />
                  </button>
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
              <CardTitle className="font-display text-lg">Tambah Foto</CardTitle>
              <Button variant="ghost" size="icon" onClick={() => setShowAdd(false)}><X className="h-4 w-4" /></Button>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleAdd} className="space-y-4">
                <div><Label>Judul</Label><Input required value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} /></div>
                <div><Label>URL Gambar</Label><Input required type="url" value={form.image_url} onChange={(e) => setForm({ ...form, image_url: e.target.value })} placeholder="https://..." /></div>
                <div><Label>Kategori</Label><Input required value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} /></div>
                <div><Label>Deskripsi</Label><Input value={form.description || ''} onChange={(e) => setForm({ ...form, description: e.target.value })} /></div>
                <Button type="submit" className="w-full">Simpan</Button>
              </form>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
