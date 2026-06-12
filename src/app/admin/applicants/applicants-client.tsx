'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Plus, Search, Trash2, X, ChevronDown } from 'lucide-react'
import { updateApplicantStatus, deleteApplicant, createApplicant } from '@/server/actions/applicants'
import { useRouter } from 'next/navigation'

interface Applicant {
  id: string
  full_name: string
  email: string
  phone: string
  city: string
  province: string
  status: string
  created_at: string
  height_cm?: number
  weight_kg?: number
  occupation?: string
  education?: string
  date_of_birth?: string
  address?: string
}

export function ApplicantsClient({
  applicants,
  stats,
}: {
  applicants: Applicant[]
  stats: { total: number; pending: number; verified: number; rejected: number; finalist: number }
}) {
  const router = useRouter()
  const [search, setSearch] = useState('')
  const [showAdd, setShowAdd] = useState(false)
  const [loading, setLoading] = useState<string | null>(null)
  const [form, setForm] = useState({
    full_name: '',
    email: '',
    phone: '',
    date_of_birth: '',
    address: '',
    city: '',
    province: '',
    height_cm: '',
    weight_kg: '',
    occupation: '',
    education: '',
  })
  const [formError, setFormError] = useState('')

  const filtered = applicants.filter(
    (a) =>
      a.full_name.toLowerCase().includes(search.toLowerCase()) ||
      a.email.toLowerCase().includes(search.toLowerCase()) ||
      a.city.toLowerCase().includes(search.toLowerCase()),
  )

  const handleStatusChange = async (id: string, status: string) => {
    setLoading(id)
    try {
      await updateApplicantStatus(id, status as any)
      router.refresh()
    } finally {
      setLoading(null)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Yakin ingin menghapus pendaftar ini?')) return
    setLoading(id)
    try {
      await deleteApplicant(id)
      router.refresh()
    } finally {
      setLoading(null)
    }
  }

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault()
    setFormError('')

    const numericData = {
      ...form,
      height_cm: Number(form.height_cm),
      weight_kg: Number(form.weight_kg),
    }

    const result = await createApplicant(numericData as any)
    if (result?.error) {
      setFormError(String(result.error))
      return
    }
    setShowAdd(false)
    setForm({ full_name: '', email: '', phone: '', date_of_birth: '', address: '', city: '', province: '', height_cm: '', weight_kg: '', occupation: '', education: '' })
    router.refresh()
  }

  const statCards = [
    {
      label: 'Total',
      value: stats.total,
      color: 'text-accent-blue',
      cardStyle: 'bg-accent-blue/5 border-accent-blue/20 shadow-[0_0_15px_rgba(0,153,255,0.05)] hover:bg-accent-blue/10 hover:border-accent-blue/30',
    },
    {
      label: 'Pending',
      value: stats.pending,
      color: 'text-amber-400',
      cardStyle: 'bg-amber-500/5 border-amber-500/20 shadow-[0_0_15px_rgba(245,158,11,0.05)] hover:bg-amber-500/10 hover:border-amber-500/30',
    },
    {
      label: 'Terverifikasi',
      value: stats.verified,
      color: 'text-semantic-success',
      cardStyle: 'bg-emerald-500/5 border-emerald-500/20 shadow-[0_0_15px_rgba(16,185,129,0.05)] hover:bg-emerald-500/10 hover:border-emerald-500/30',
    },
    {
      label: 'Finalis',
      value: stats.finalist,
      color: 'text-gold',
      cardStyle: 'bg-gold/5 border-gold/20 shadow-[0_0_15px_rgba(212,175,55,0.05)] hover:bg-gold/10 hover:border-gold/30',
    },
    {
      label: 'Ditolak',
      value: stats.rejected,
      color: 'text-red-400',
      cardStyle: 'bg-red-500/5 border-red-500/20 shadow-[0_0_15px_rgba(239,68,68,0.05)] hover:bg-red-500/10 hover:border-red-500/30',
    },
  ]

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-display text-2xl font-bold text-ink">Pendaftar</h1>
        <Button variant="gold" onClick={() => setShowAdd(true)}>
          <Plus className="mr-2 h-4 w-4" /> Tambah Pendaftar
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-6">
        {statCards.map((s) => (
          <div
            key={s.label}
            className={`rounded-xl border p-4 text-center transition-all duration-200 ${s.cardStyle}`}
          >
            <div className={`text-2xl font-bold ${s.color}`}>{s.value}</div>
            <div className="text-xs text-ink-muted mt-1 uppercase tracking-wider font-semibold">{s.label}</div>
          </div>
        ))}
      </div>

      <Card className="bg-surface-2 border-hairline text-ink">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="font-display text-lg text-ink">Daftar Pendaftar</CardTitle>
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-muted" />
              <Input
                placeholder="Cari pendaftar..."
                className="pl-9 bg-surface-1 border-hairline text-ink placeholder:text-ink-muted/50 focus-visible:ring-accent-blue/50 focus-visible:ring-1 focus-visible:border-accent-blue/50"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {filtered.length === 0 ? (
            <div className="text-center py-12 text-ink-muted">
              {search ? 'Tidak ada hasil pencarian' : 'Belum ada pendaftar'}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-hairline text-left text-ink-muted">
                    <th className="pb-3 font-medium">Nama</th>
                    <th className="pb-3 font-medium hidden md:table-cell">Email</th>
                    <th className="pb-3 font-medium hidden lg:table-cell">Kota</th>
                    <th className="pb-3 font-medium">Status</th>
                    <th className="pb-3 font-medium hidden sm:table-cell">Tanggal</th>
                    <th className="pb-3 font-medium text-right">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((a) => (
                    <tr key={a.id} className="border-b border-hairline/50 hover:bg-surface-1/30 transition-colors">
                      <td className="py-3 font-medium text-ink">{a.full_name}</td>
                      <td className="py-3 text-ink-muted hidden md:table-cell">{a.email}</td>
                      <td className="py-3 text-ink-muted hidden lg:table-cell">{a.city}</td>
                      <td className="py-3">
                        <div className="relative inline-flex items-center">
                          <select
                            value={a.status}
                            onChange={(e) => handleStatusChange(a.id, e.target.value)}
                            disabled={loading === a.id}
                            className={`appearance-none rounded-full border px-3 pr-7 py-1 text-xs font-semibold cursor-pointer focus:outline-none focus:ring-1 focus:ring-accent-blue/50 disabled:opacity-50 transition-colors uppercase tracking-wider ${
                              a.status === 'finalist'
                                ? 'bg-gold/10 text-gold border-gold/30 hover:bg-gold/20'
                                : a.status === 'verified'
                                ? 'bg-semantic-success/10 text-semantic-success border-semantic-success/30 hover:bg-semantic-success/20'
                                : a.status === 'rejected'
                                ? 'bg-red-500/10 text-red-400 border-red-500/30 hover:bg-red-500/20'
                                : 'bg-amber-500/10 text-amber-400 border-amber-500/30 hover:bg-amber-500/20'
                            }`}
                          >
                            <option value="pending" className="bg-surface-2 text-amber-400">Pending</option>
                            <option value="verified" className="bg-surface-2 text-semantic-success">Terverifikasi</option>
                            <option value="rejected" className="bg-surface-2 text-red-400">Ditolak</option>
                            <option value="finalist" className="bg-surface-2 text-gold">Finalis</option>
                          </select>
                          <ChevronDown className={`absolute right-2.5 h-3 w-3 pointer-events-none ${
                            a.status === 'finalist' ? 'text-gold' :
                            a.status === 'verified' ? 'text-semantic-success' :
                            a.status === 'rejected' ? 'text-red-400' :
                            'text-amber-400'
                          }`} />
                        </div>
                      </td>
                      <td className="py-3 text-ink-muted hidden sm:table-cell text-xs">
                        {new Date(a.created_at).toLocaleDateString('id-ID')}
                      </td>
                      <td className="py-3 text-right">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
                          onClick={() => handleDelete(a.id)}
                          disabled={loading === a.id}
                        >
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

      {/* Add Modal */}
      {showAdd && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-canvas/80 backdrop-blur-md p-4">
          <Card className="w-full max-w-lg max-h-[90vh] overflow-y-auto bg-surface-2 border-hairline shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
            <CardHeader className="flex flex-row items-center justify-between border-b border-hairline pb-4 mb-4">
              <CardTitle className="font-display text-lg text-ink">Tambah Pendaftar</CardTitle>
              <Button variant="ghost" size="icon" className="text-ink-muted hover:text-ink hover:bg-surface-1" onClick={() => setShowAdd(false)}>
                <X className="h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleAdd} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2">
                    <Label className="text-ink-muted text-xs font-semibold uppercase tracking-wider mb-1">Nama Lengkap</Label>
                    <Input
                      required
                      className="bg-surface-1 border-hairline text-ink placeholder:text-ink-muted/50 focus-visible:ring-accent-blue/50 focus-visible:ring-1 focus-visible:border-accent-blue/50"
                      value={form.full_name}
                      onChange={(e) => setForm({ ...form, full_name: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label className="text-ink-muted text-xs font-semibold uppercase tracking-wider mb-1">Email</Label>
                    <Input
                      required
                      type="email"
                      className="bg-surface-1 border-hairline text-ink placeholder:text-ink-muted/50 focus-visible:ring-accent-blue/50 focus-visible:ring-1 focus-visible:border-accent-blue/50"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label className="text-ink-muted text-xs font-semibold uppercase tracking-wider mb-1">Telepon</Label>
                    <Input
                      required
                      className="bg-surface-1 border-hairline text-ink placeholder:text-ink-muted/50 focus-visible:ring-accent-blue/50 focus-visible:ring-1 focus-visible:border-accent-blue/50"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label className="text-ink-muted text-xs font-semibold uppercase tracking-wider mb-1">Tgl Lahir</Label>
                    <Input
                      required
                      type="date"
                      className="bg-surface-1 border-hairline text-ink placeholder:text-ink-muted/50 focus-visible:ring-accent-blue/50 focus-visible:ring-1 focus-visible:border-accent-blue/50"
                      value={form.date_of_birth}
                      onChange={(e) => setForm({ ...form, date_of_birth: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label className="text-ink-muted text-xs font-semibold uppercase tracking-wider mb-1">Kota</Label>
                    <Input
                      required
                      className="bg-surface-1 border-hairline text-ink placeholder:text-ink-muted/50 focus-visible:ring-accent-blue/50 focus-visible:ring-1 focus-visible:border-accent-blue/50"
                      value={form.city}
                      onChange={(e) => setForm({ ...form, city: e.target.value })}
                    />
                  </div>
                  <div className="col-span-2">
                    <Label className="text-ink-muted text-xs font-semibold uppercase tracking-wider mb-1">Provinsi</Label>
                    <Input
                      required
                      className="bg-surface-1 border-hairline text-ink placeholder:text-ink-muted/50 focus-visible:ring-accent-blue/50 focus-visible:ring-1 focus-visible:border-accent-blue/50"
                      value={form.province}
                      onChange={(e) => setForm({ ...form, province: e.target.value })}
                    />
                  </div>
                  <div className="col-span-2">
                    <Label className="text-ink-muted text-xs font-semibold uppercase tracking-wider mb-1">Alamat</Label>
                    <Input
                      required
                      className="bg-surface-1 border-hairline text-ink placeholder:text-ink-muted/50 focus-visible:ring-accent-blue/50 focus-visible:ring-1 focus-visible:border-accent-blue/50"
                      value={form.address}
                      onChange={(e) => setForm({ ...form, address: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label className="text-ink-muted text-xs font-semibold uppercase tracking-wider mb-1">Tinggi (cm)</Label>
                    <Input
                      required
                      type="number"
                      className="bg-surface-1 border-hairline text-ink placeholder:text-ink-muted/50 focus-visible:ring-accent-blue/50 focus-visible:ring-1 focus-visible:border-accent-blue/50"
                      value={form.height_cm}
                      onChange={(e) => setForm({ ...form, height_cm: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label className="text-ink-muted text-xs font-semibold uppercase tracking-wider mb-1">Berat (kg)</Label>
                    <Input
                      required
                      type="number"
                      className="bg-surface-1 border-hairline text-ink placeholder:text-ink-muted/50 focus-visible:ring-accent-blue/50 focus-visible:ring-1 focus-visible:border-accent-blue/50"
                      value={form.weight_kg}
                      onChange={(e) => setForm({ ...form, weight_kg: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label className="text-ink-muted text-xs font-semibold uppercase tracking-wider mb-1">Pekerjaan</Label>
                    <Input
                      required
                      className="bg-surface-1 border-hairline text-ink placeholder:text-ink-muted/50 focus-visible:ring-accent-blue/50 focus-visible:ring-1 focus-visible:border-accent-blue/50"
                      value={form.occupation}
                      onChange={(e) => setForm({ ...form, occupation: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label className="text-ink-muted text-xs font-semibold uppercase tracking-wider mb-1">Pendidikan</Label>
                    <Input
                      required
                      className="bg-surface-1 border-hairline text-ink placeholder:text-ink-muted/50 focus-visible:ring-accent-blue/50 focus-visible:ring-1 focus-visible:border-accent-blue/50"
                      value={form.education}
                      onChange={(e) => setForm({ ...form, education: e.target.value })}
                    />
                  </div>
                </div>
                {formError && <p className="text-sm text-red-400 font-semibold">{formError}</p>}
                <Button type="submit" variant="gold" className="w-full mt-2">Simpan</Button>
              </form>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
