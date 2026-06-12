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
        <h1 className="font-display text-2xl font-bold text-ink">Acara</h1>
        <Button variant="gold" onClick={() => setShowAdd(true)}><Plus className="mr-2 h-4 w-4" />Tambah Acara</Button>
      </div>

      <Card className="bg-surface-2 border-hairline text-ink">
        <CardHeader><CardTitle className="font-display text-lg text-ink">Daftar Acara</CardTitle></CardHeader>
        <CardContent>
          {events.length === 0 ? (
            <div className="text-center py-12 text-ink-muted">Belum ada acara</div>
          ) : (
            <div className="space-y-3">
              {events.map((item) => (
                <div key={item.id} className="flex items-center justify-between rounded-lg border border-hairline p-4 bg-surface-1/30 hover:bg-surface-1/60 hover:border-gold/20 transition-all duration-200">
                  <div>
                    <p className="font-medium text-ink">{item.title}</p>
                    <p className="text-xs text-ink-muted mt-1">{item.date} &middot; {item.location}</p>
                  </div>
                  <Button variant="ghost" size="icon" className="text-red-400 hover:text-red-300 hover:bg-red-500/10" onClick={() => handleDelete(item.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
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
              <CardTitle className="font-display text-lg text-ink">Tambah Acara</CardTitle>
              <Button variant="ghost" size="icon" className="text-ink-muted hover:text-ink hover:bg-surface-1" onClick={() => setShowAdd(false)}><X className="h-4 w-4" /></Button>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleAdd} className="space-y-4">
                <div>
                  <Label className="text-ink-muted text-xs font-semibold uppercase tracking-wider mb-1">Judul</Label>
                  <Input required className="bg-surface-1 border-hairline text-ink placeholder:text-ink-muted/50 focus-visible:ring-accent-blue/50 focus-visible:ring-1" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
                </div>
                <div>
                  <Label className="text-ink-muted text-xs font-semibold uppercase tracking-wider mb-1">Slug</Label>
                  <Input required className="bg-surface-1 border-hairline text-ink placeholder:text-ink-muted/50 focus-visible:ring-accent-blue/50 focus-visible:ring-1" value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} />
                </div>
                <div>
                  <Label className="text-ink-muted text-xs font-semibold uppercase tracking-wider mb-1">Deskripsi</Label>
                  <textarea required className="flex h-20 w-full rounded-lg border border-hairline bg-surface-1 text-ink px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-accent-blue/50 placeholder:text-ink-muted/50" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-ink-muted text-xs font-semibold uppercase tracking-wider mb-1">Tanggal</Label>
                    <Input required type="date" className="bg-surface-1 border-hairline text-ink placeholder:text-ink-muted/50 focus-visible:ring-accent-blue/50 focus-visible:ring-1" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} />
                  </div>
                  <div>
                    <Label className="text-ink-muted text-xs font-semibold uppercase tracking-wider mb-1">Lokasi</Label>
                    <Input required className="bg-surface-1 border-hairline text-ink placeholder:text-ink-muted/50 focus-visible:ring-accent-blue/50 focus-visible:ring-1" value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} />
                  </div>
                </div>
                <label className="flex items-center gap-2 text-sm text-ink-muted hover:text-ink cursor-pointer">
                  <input type="checkbox" className="rounded border-hairline bg-surface-1 text-accent-blue focus:ring-accent-blue/50 focus:ring-1 h-4 w-4" checked={form.published} onChange={(e) => setForm({ ...form, published: e.target.checked })} />
                  Publikasikan
                </label>
                <Button type="submit" variant="gold" className="w-full mt-2">Simpan</Button>
              </form>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
