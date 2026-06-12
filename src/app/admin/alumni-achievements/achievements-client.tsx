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
        <h1 className="font-display text-2xl font-bold text-ink">Prestasi Alumni</h1>
        <Button variant="gold" onClick={() => setShowAdd(true)}><Plus className="mr-2 h-4 w-4" />Tambah Prestasi</Button>
      </div>

      <Card className="bg-surface-2 border-hairline text-ink">
        <CardHeader><CardTitle className="font-display text-lg text-ink">Daftar Prestasi</CardTitle></CardHeader>
        <CardContent>
          {data.length === 0 ? <div className="text-center py-12 text-ink-muted">Belum ada data</div> : (
            <div className="space-y-3">
              {data.map((item: any) => (
                <div key={item.id} className="flex items-center justify-between rounded-lg border border-hairline p-4 bg-surface-1/30 hover:bg-surface-1/60 hover:border-gold/20 transition-all duration-200">
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-full bg-gradient-to-br from-gold/20 to-gold/5 border border-gold/30 flex items-center justify-center font-bold text-gold">
                      {item.alumni_name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-medium text-ink">{item.alumni_name}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant={ACHIEVEMENT_COLORS[item.achievement_type] || 'default'}>{item.achievement_type}</Badge>
                        <span className="text-xs text-ink-muted">{item.tahun}</span>
                      </div>
                      <p className="text-xs text-ink-muted mt-1">{item.description}</p>
                    </div>
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
              <CardTitle className="font-display text-lg text-ink">Tambah Prestasi</CardTitle>
              <Button variant="ghost" size="icon" className="text-ink-muted hover:text-ink hover:bg-surface-1" onClick={() => setShowAdd(false)}><X className="h-4 w-4" /></Button>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleAdd} className="space-y-4">
                <div>
                  <Label className="text-ink-muted text-xs font-semibold uppercase tracking-wider mb-1">Nama Alumni</Label>
                  <Input required className="bg-surface-1 border-hairline text-ink placeholder:text-ink-muted/50 focus-visible:ring-accent-blue/50 focus-visible:ring-1" value={form.alumni_name} onChange={(e) => setForm({ ...form, alumni_name: e.target.value })} />
                </div>
                <div>
                  <Label className="text-ink-muted text-xs font-semibold uppercase tracking-wider mb-1">Tipe Prestasi</Label>
                  <select value={form.achievement_type} onChange={(e) => setForm({ ...form, achievement_type: e.target.value })} className="w-full rounded-lg border border-hairline bg-surface-1 text-ink px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-accent-blue/50">
                    {ACHIEVEMENT_TYPES.map(t => <option key={t} value={t} className="bg-surface-2 text-ink">{t}</option>)}
                  </select>
                </div>
                <div>
                  <Label className="text-ink-muted text-xs font-semibold uppercase tracking-wider mb-1">Deskripsi</Label>
                  <textarea required className="flex h-20 w-full rounded-lg border border-hairline bg-surface-1 text-ink px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-accent-blue/50 placeholder:text-ink-muted/50" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-ink-muted text-xs font-semibold uppercase tracking-wider mb-1">Tahun</Label>
                    <Input required className="bg-surface-1 border-hairline text-ink placeholder:text-ink-muted/50 focus-visible:ring-accent-blue/50 focus-visible:ring-1" value={form.tahun} onChange={(e) => setForm({ ...form, tahun: e.target.value })} />
                  </div>
                  <div>
                    <Label className="text-ink-muted text-xs font-semibold uppercase tracking-wider mb-1">Instagram</Label>
                    <Input className="bg-surface-1 border-hairline text-ink placeholder:text-ink-muted/50 focus-visible:ring-accent-blue/50 focus-visible:ring-1" value={form.instagram} onChange={(e) => setForm({ ...form, instagram: e.target.value })} />
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
