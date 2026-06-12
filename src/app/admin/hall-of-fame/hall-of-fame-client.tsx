'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Plus, Trash2, X } from 'lucide-react'
import { createHallOfFame, deleteHallOfFame } from '@/server/actions/finalists'
import { useRouter } from 'next/navigation'

export function HallOfFameClient({ data }: { data: any[] }) {
  const router = useRouter()
  const [showAdd, setShowAdd] = useState(false)
  const [form, setForm] = useState({ tahun: '', nyong_name: '', noni_name: '', nyong_photo_url: '', noni_photo_url: '', kabupaten_kota: '' })
  const [error, setError] = useState('')

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    const result = await createHallOfFame({ ...form, tahun: Number(form.tahun) } as any)
    if (result?.error) { setError(String(result.error)); return }
    setShowAdd(false)
    setForm({ tahun: '', nyong_name: '', noni_name: '', nyong_photo_url: '', noni_photo_url: '', kabupaten_kota: '' })
    router.refresh()
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Hapus entri Hall of Fame?')) return
    await deleteHallOfFame(id)
    router.refresh()
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-display text-2xl font-bold text-ink">Hall of Fame</h1>
        <Button variant="gold" onClick={() => setShowAdd(true)}><Plus className="mr-2 h-4 w-4" />Tambah Pemenang</Button>
      </div>

      <Card className="bg-surface-2 border-hairline text-ink">
        <CardHeader><CardTitle className="font-display text-lg text-ink">Daftar Pemenang</CardTitle></CardHeader>
        <CardContent>
          {data.length === 0 ? <div className="text-center py-12 text-ink-muted">Belum ada data</div> : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead>
                  <tr className="border-b border-hairline text-ink-muted">
                    <th className="pb-3 font-medium">Tahun</th>
                    <th className="pb-3 font-medium">Nyong</th>
                    <th className="pb-3 font-medium">Noni</th>
                    <th className="pb-3 font-medium">Kota/Kabupaten</th>
                    <th className="pb-3 font-medium text-right">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((item: any) => (
                    <tr key={item.id} className="border-b border-hairline/50 hover:bg-surface-1/30 transition-colors">
                      <td className="py-3 font-bold text-gold">{item.tahun}</td>
                      <td className="py-3 text-ink font-medium">{item.nyong_name}</td>
                      <td className="py-3 text-ink font-medium">{item.noni_name}</td>
                      <td className="py-3 text-ink-muted">{item.kabupaten_kota}</td>
                      <td className="py-3 text-right">
                        <Button variant="ghost" size="icon" className="text-red-400 hover:text-red-300 hover:bg-red-500/10" onClick={() => handleDelete(item.id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>

      {showAdd && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-canvas/80 backdrop-blur-md p-4">
          <Card className="w-full max-w-lg bg-surface-2 border-hairline text-ink shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
            <CardHeader className="flex flex-row items-center justify-between border-b border-hairline pb-4 mb-4">
              <CardTitle className="font-display text-lg text-ink">Tambah Hall of Fame</CardTitle>
              <Button variant="ghost" size="icon" className="text-ink-muted hover:text-ink hover:bg-surface-1" onClick={() => setShowAdd(false)}><X className="h-4 w-4" /></Button>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleAdd} className="space-y-4">
                <div>
                  <Label className="text-ink-muted text-xs font-semibold uppercase tracking-wider mb-1">Tahun</Label>
                  <Input required type="number" className="bg-surface-1 border-hairline text-ink placeholder:text-ink-muted/50 focus-visible:ring-accent-blue/50 focus-visible:ring-1" value={form.tahun} onChange={(e) => setForm({ ...form, tahun: e.target.value })} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-ink-muted text-xs font-semibold uppercase tracking-wider mb-1">Nama Nyong</Label>
                    <Input required className="bg-surface-1 border-hairline text-ink placeholder:text-ink-muted/50 focus-visible:ring-accent-blue/50 focus-visible:ring-1" value={form.nyong_name} onChange={(e) => setForm({ ...form, nyong_name: e.target.value })} />
                  </div>
                  <div>
                    <Label className="text-ink-muted text-xs font-semibold uppercase tracking-wider mb-1">Nama Noni</Label>
                    <Input required className="bg-surface-1 border-hairline text-ink placeholder:text-ink-muted/50 focus-visible:ring-accent-blue/50 focus-visible:ring-1" value={form.noni_name} onChange={(e) => setForm({ ...form, noni_name: e.target.value })} />
                  </div>
                </div>
                <div>
                  <Label className="text-ink-muted text-xs font-semibold uppercase tracking-wider mb-1">Kabupaten/Kota</Label>
                  <Input required className="bg-surface-1 border-hairline text-ink placeholder:text-ink-muted/50 focus-visible:ring-accent-blue/50 focus-visible:ring-1" value={form.kabupaten_kota} onChange={(e) => setForm({ ...form, kabupaten_kota: e.target.value })} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-ink-muted text-xs font-semibold uppercase tracking-wider mb-1">Foto Nyong (URL)</Label>
                    <Input className="bg-surface-1 border-hairline text-ink placeholder:text-ink-muted/50 focus-visible:ring-accent-blue/50 focus-visible:ring-1" value={form.nyong_photo_url} onChange={(e) => setForm({ ...form, nyong_photo_url: e.target.value })} />
                  </div>
                  <div>
                    <Label className="text-ink-muted text-xs font-semibold uppercase tracking-wider mb-1">Foto Noni (URL)</Label>
                    <Input className="bg-surface-1 border-hairline text-ink placeholder:text-ink-muted/50 focus-visible:ring-accent-blue/50 focus-visible:ring-1" value={form.noni_photo_url} onChange={(e) => setForm({ ...form, noni_photo_url: e.target.value })} />
                  </div>
                </div>
                {error && <p className="text-sm text-red-400 font-semibold">{error}</p>}
                <Button type="submit" variant="gold" className="w-full mt-2">Simpan</Button>
              </form>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
