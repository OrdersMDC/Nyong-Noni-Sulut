'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Plus, Trash2, X } from 'lucide-react'
import { createAlumniAchievement, deleteAlumniAchievement } from '@/server/actions/finalists'
import { useRouter } from 'next/navigation'
import { Badge } from '@/components/ui/badge'

const ACHIEVEMENT_TYPES = ['ASN', 'Dokter', 'Pengusaha', 'Influencer', 'Duta Nasional']
const ACHIEVEMENT_COLORS: Record<string, 'default' | 'gold' | 'success' | 'secondary'> = {
  'ASN': 'default', 'Dokter': 'success', 'Pengusaha': 'gold', 'Influencer': 'secondary', 'Duta Nasional': 'default',
}

export function AlumniAchievementsClient({ data }: { data: any[] }) {
  const router = useRouter()
  const [showAdd, setShowAdd] = useState(false)
  const [form, setForm] = useState({ alumni_name: '', achievement_type: 'ASN', description: '', tahun: '', photo_url: '', instagram: '' })
  const [error, setError] = useState('')

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    const result = await createAlumniAchievement(form as any)
    if (result?.error) { setError(String(result.error)); return }
    setShowAdd(false)
    setForm({ alumni_name: '', achievement_type: 'ASN', description: '', tahun: '', photo_url: '', instagram: '' })
    router.refresh()
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Hapus prestasi ini?')) return
    await deleteAlumniAchievement(id)
    router.refresh()
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-display text-2xl font-bold text-dark">Prestasi Alumni</h1>
        <Button onClick={() => setShowAdd(true)}><Plus className="mr-2 h-4 w-4" />Tambah</Button>
      </div>

      <Card>
        <CardHeader><CardTitle className="font-display text-lg">Daftar Prestasi</CardTitle></CardHeader>
        <CardContent>
          {data.length === 0 ? <div className="text-center py-12 text-muted">Belum ada data</div> : (
            <div className="space-y-3">
              {data.map((item: any) => (
                <div key={item.id} className="flex items-center justify-between rounded-lg border border-border p-4">
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-full bg-gradient-to-br from-primary/10 to-gold/10 flex items-center justify-center font-bold text-primary">
                      {item.alumni_name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-medium">{item.alumni_name}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant={ACHIEVEMENT_COLORS[item.achievement_type] || 'default'}>{item.achievement_type}</Badge>
                        <span className="text-xs text-muted">{item.tahun}</span>
                      </div>
                      <p className="text-xs text-muted mt-1">{item.description}</p>
                    </div>
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
              <CardTitle className="font-display text-lg">Tambah Prestasi</CardTitle>
              <Button variant="ghost" size="icon" onClick={() => setShowAdd(false)}><X className="h-4 w-4" /></Button>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleAdd} className="space-y-4">
                <div><Label>Nama Alumni</Label><Input required value={form.alumni_name} onChange={(e) => setForm({ ...form, alumni_name: e.target.value })} /></div>
                <div><Label>Tipe Prestasi</Label>
                  <select value={form.achievement_type} onChange={(e) => setForm({ ...form, achievement_type: e.target.value })} className="w-full rounded-lg border border-border bg-white px-3 py-2 text-sm">
                    {ACHIEVEMENT_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
                <div><Label>Deskripsi</Label><textarea required className="flex h-20 w-full rounded-lg border border-border bg-white px-3 py-2 text-sm" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} /></div>
                <div className="grid grid-cols-2 gap-4">
                  <div><Label>Tahun</Label><Input required value={form.tahun} onChange={(e) => setForm({ ...form, tahun: e.target.value })} /></div>
                  <div><Label>Instagram</Label><Input value={form.instagram} onChange={(e) => setForm({ ...form, instagram: e.target.value })} /></div>
                </div>
                {error && <p className="text-sm text-red-600">{error}</p>}
                <Button type="submit" className="w-full">Simpan</Button>
              </form>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
