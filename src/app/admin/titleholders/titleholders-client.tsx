'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Crown, Pencil, Plus, Trash2, X } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { createTitleholder, updateTitleholder, deleteTitleholder } from '@/server/actions/finalists'

const CATEGORIES = ['Juara Utama', 'Wakil I', 'Wakil II', 'Harapan I', 'Harapan II', 'Berbakat', 'Favorit', 'Persahabatan', 'Digital', 'Other'] as const

interface FormState {
  tahun: string
  category: string
  nyong_name: string
  noni_name: string
  region: string
  motto: string
  biography: string
  nyong_photo_url: string
  noni_photo_url: string
  nyong_instagram: string
  noni_instagram: string
}

const emptyForm: FormState = {
  tahun: `${new Date().getFullYear()}`,
  category: 'Juara Utama',
  nyong_name: '',
  noni_name: '',
  region: '',
  motto: '',
  biography: '',
  nyong_photo_url: '',
  noni_photo_url: '',
  nyong_instagram: '',
  noni_instagram: '',
}

export function TitleholdersClient({ data }: { data: any[] }) {
  const router = useRouter()
  const [showModal, setShowModal] = useState(false)
  const [editId, setEditId] = useState<string | null>(null)
  const [form, setForm] = useState<FormState>(emptyForm)
  const [error, setError] = useState('')

  const closeModal = () => {
    setShowModal(false)
    setEditId(null)
    setForm(emptyForm)
    setError('')
  }

  const openAdd = () => {
    setEditId(null)
    setForm(emptyForm)
    setError('')
    setShowModal(true)
  }

  const openEdit = (item: any) => {
    setEditId(item.id)
    setForm({
      tahun: String(item.tahun),
      category: item.category,
      nyong_name: item.nyong_name,
      noni_name: item.noni_name,
      region: item.region,
      motto: item.motto || '',
      biography: item.biography || '',
      nyong_photo_url: item.nyong_photo_url || '',
      noni_photo_url: item.noni_photo_url || '',
      nyong_instagram: item.nyong_instagram || '',
      noni_instagram: item.noni_instagram || '',
    })
    setError('')
    setShowModal(true)
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    setError('')

    const payload = {
      ...form,
      tahun: Number(form.tahun),
    }

    const result = editId
      ? await updateTitleholder(editId, payload)
      : await createTitleholder(payload)

    if (result?.error) {
      setError(String(result.error))
      return
    }

    closeModal()
    router.refresh()
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Hapus pasangan titleholder ini?')) return
    await deleteTitleholder(id)
    router.refresh()
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-dark">Titleholders</h1>
          <p className="mt-1 text-sm text-muted">Kelola pasangan Nyong &amp; Noni per kategori</p>
        </div>
        <Button onClick={openAdd}>
          <Plus className="mr-2 h-4 w-4" />
          Tambah
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="font-display text-lg">Daftar Titleholders</CardTitle>
        </CardHeader>
        <CardContent>
          {data.length === 0 ? (
            <div className="py-12 text-center text-muted">Belum ada data titleholders</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-border text-muted">
                    <th className="pb-3 font-medium">Tahun</th>
                    <th className="pb-3 font-medium">Kategori</th>
                    <th className="pb-3 font-medium">Nyong</th>
                    <th className="pb-3 font-medium">Noni</th>
                    <th className="pb-3 font-medium">Region</th>
                    <th className="pb-3 text-right font-medium">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((item: any) => (
                    <tr key={item.id} className="border-b border-border/50">
                      <td className="py-3 font-bold">{item.tahun}</td>
                      <td className="py-3">
                        <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
                          <Crown className="h-3 w-3" />
                          {item.category}
                        </span>
                      </td>
                      <td className="py-3 font-medium">{item.nyong_name}</td>
                      <td className="py-3 font-medium">{item.noni_name}</td>
                      <td className="py-3 text-muted">{item.region}</td>
                      <td className="py-3 text-right">
                        <div className="flex items-center justify-end gap-1">
                          <Button variant="ghost" size="icon" onClick={() => openEdit(item)}>
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" className="text-red-600" onClick={() => handleDelete(item.id)}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/50 p-4">
          <Card className="my-8 w-full max-w-2xl">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="font-display text-lg">
                {editId ? 'Edit Titleholder' : 'Tambah Titleholder'}
              </CardTitle>
              <Button variant="ghost" size="icon" onClick={closeModal}>
                <X className="h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Tahun</Label>
                    <Input
                      required
                      type="number"
                      value={form.tahun}
                      onChange={(event) => setForm({ ...form, tahun: event.target.value })}
                    />
                  </div>
                  <div>
                    <Label>Kategori</Label>
                    <select
                      className="flex h-10 w-full rounded-lg border border-border bg-white px-3 py-2 text-sm"
                      value={form.category}
                      onChange={(event) => setForm({ ...form, category: event.target.value })}
                    >
                      {CATEGORIES.map((category) => (
                        <option key={category} value={category}>
                          {category}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Nama Nyong</Label>
                    <Input
                      required
                      value={form.nyong_name}
                      onChange={(event) => setForm({ ...form, nyong_name: event.target.value })}
                    />
                  </div>
                  <div>
                    <Label>Nama Noni</Label>
                    <Input
                      required
                      value={form.noni_name}
                      onChange={(event) => setForm({ ...form, noni_name: event.target.value })}
                    />
                  </div>
                </div>

                <div>
                  <Label>Region / Kabupaten / Kota</Label>
                  <Input
                    required
                    value={form.region}
                    onChange={(event) => setForm({ ...form, region: event.target.value })}
                  />
                </div>

                <div>
                  <Label>Motto</Label>
                  <Input
                    value={form.motto}
                    onChange={(event) => setForm({ ...form, motto: event.target.value })}
                  />
                </div>

                <div>
                  <Label>Biografi</Label>
                  <textarea
                    className="flex min-h-[100px] w-full rounded-lg border border-border bg-white px-3 py-2 text-sm"
                    value={form.biography}
                    onChange={(event) => setForm({ ...form, biography: event.target.value })}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Foto Nyong (URL)</Label>
                    <Input
                      value={form.nyong_photo_url}
                      onChange={(event) => setForm({ ...form, nyong_photo_url: event.target.value })}
                    />
                  </div>
                  <div>
                    <Label>Foto Noni (URL)</Label>
                    <Input
                      value={form.noni_photo_url}
                      onChange={(event) => setForm({ ...form, noni_photo_url: event.target.value })}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Instagram Nyong</Label>
                    <Input
                      value={form.nyong_instagram}
                      onChange={(event) => setForm({ ...form, nyong_instagram: event.target.value })}
                    />
                  </div>
                  <div>
                    <Label>Instagram Noni</Label>
                    <Input
                      value={form.noni_instagram}
                      onChange={(event) => setForm({ ...form, noni_instagram: event.target.value })}
                    />
                  </div>
                </div>

                {error && <p className="text-sm text-red-600">{error}</p>}

                <div className="flex gap-3 pt-2">
                  <Button type="submit" className="flex-1">
                    {editId ? 'Simpan Perubahan' : 'Simpan'}
                  </Button>
                  <Button type="button" variant="outline" onClick={closeModal}>
                    Batal
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
