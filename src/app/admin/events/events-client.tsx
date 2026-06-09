'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Plus, Trash2, X } from 'lucide-react'
import { createEvent, deleteEvent } from '@/server/actions/content'
import { useRouter } from 'next/navigation'

interface EventItem {
  id: string
  title: string
  date: string
  location: string
  published: number | boolean
}

export function EventsClient({ events }: { events: EventItem[] }) {
  const router = useRouter()
  const [showAdd, setShowAdd] = useState(false)
  const [form, setForm] = useState({ title: '', slug: '', description: '', date: '', location: '', published: false })

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault()
    const fd = new FormData()
    Object.entries(form).forEach(([k, v]) => fd.append(k, String(v)))
    await createEvent(fd)
    setShowAdd(false)
    setForm({ title: '', slug: '', description: '', date: '', location: '', published: false })
    router.refresh()
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Hapus acara ini?')) return
    await deleteEvent(id)
    router.refresh()
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-display text-2xl font-bold text-dark">Acara</h1>
        <Button onClick={() => setShowAdd(true)}><Plus className="mr-2 h-4 w-4" />Tambah Acara</Button>
      </div>

      <Card>
        <CardHeader><CardTitle className="font-display text-lg">Daftar Acara</CardTitle></CardHeader>
        <CardContent>
          {events.length === 0 ? (
            <div className="text-center py-12 text-muted">Belum ada acara</div>
          ) : (
            <div className="space-y-3">
              {events.map((item) => (
                <div key={item.id} className="flex items-center justify-between rounded-lg border border-border p-4">
                  <div>
                    <p className="font-medium">{item.title}</p>
                    <p className="text-xs text-muted mt-1">{item.date} &middot; {item.location}</p>
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
              <CardTitle className="font-display text-lg">Tambah Acara</CardTitle>
              <Button variant="ghost" size="icon" onClick={() => setShowAdd(false)}><X className="h-4 w-4" /></Button>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleAdd} className="space-y-4">
                <div><Label>Judul</Label><Input required value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} /></div>
                <div><Label>Slug</Label><Input required value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} /></div>
                <div><Label>Deskripsi</Label><textarea required className="flex h-20 w-full rounded-lg border border-border bg-white px-3 py-2 text-sm" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} /></div>
                <div className="grid grid-cols-2 gap-4">
                  <div><Label>Tanggal</Label><Input required type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} /></div>
                  <div><Label>Lokasi</Label><Input required value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} /></div>
                </div>
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
