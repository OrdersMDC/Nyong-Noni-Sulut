'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Check, ChevronLeft, ChevronRight, Upload } from 'lucide-react'
import {
  registrationSchema,
  type RegistrationInput,
} from '@/lib/validations/registration'

const STEPS = [
  { title: 'Data Diri', description: 'Informasi pribadi' },
  { title: 'Alamat', description: 'Alamat lengkap' },
  { title: 'Fisik & Latar Belakang', description: 'Data fisik dan pendidikan' },
  { title: 'Konfirmasi', description: 'Review data' },
]

export default function RegisterPage() {
  const [step, setStep] = useState(0)
  const [photo, setPhoto] = useState<File | null>(null)

  const form = useForm<RegistrationInput>({
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      full_name: '',
      email: '',
      phone: '',
      date_of_birth: '',
      address: '',
      city: '',
      province: '',
      height_cm: undefined,
      weight_kg: undefined,
      occupation: '',
      education: '',
    },
    mode: 'onChange',
  })

  const { register, handleSubmit, formState: { errors }, trigger, getValues } = form

  const validateStep = async (): Promise<boolean> => {
    const fieldsByStep: Record<number, (keyof RegistrationInput)[]> = {
      0: ['full_name', 'email', 'phone', 'date_of_birth'],
      1: ['address', 'city', 'province'],
      2: ['height_cm', 'weight_kg', 'occupation', 'education'],
      3: [],
    }
    const fields = fieldsByStep[step] || []
    if (fields.length === 0) return true
    const result = await trigger(fields)
    return result
  }

  const nextStep = async () => {
    const valid = await validateStep()
    if (valid) {
      setStep((prev) => Math.min(prev + 1, STEPS.length - 1))
    }
  }

  const prevStep = () => {
    setStep((prev) => Math.max(prev - 1, 0))
  }

  const onSubmit = async (data: RegistrationInput) => {
    // Will be implemented with server action
    console.log('Registration data:', { ...data, photo })
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mb-8 text-center">
        <h1 className="font-display text-4xl font-bold text-dark">
          Pendaftaran
        </h1>
        <p className="mt-2 text-muted">
          Isi formulir pendaftaran Nyong Noni Sulawesi Utara
        </p>
      </div>

      {/* Steps indicator */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          {STEPS.map((s, i) => (
            <div key={s.title} className="flex items-center">
              <div className="flex items-center gap-2">
                <div
                  className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium ${
                    i < step
                      ? 'bg-primary text-white'
                      : i === step
                        ? 'border-2 border-primary text-primary'
                        : 'border-2 border-border text-muted'
                  }`}
                >
                  {i < step ? <Check className="h-4 w-4" /> : i + 1}
                </div>
                <div className="hidden sm:block">
                  <p className="text-sm font-medium">{s.title}</p>
                  <p className="text-xs text-muted">{s.description}</p>
                </div>
              </div>
              {i < STEPS.length - 1 && (
                <div
                  className={`mx-4 h-0.5 w-12 sm:w-20 ${
                    i < step ? 'bg-primary' : 'bg-border'
                  }`}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="font-display">{STEPS[step].title}</CardTitle>
          <CardDescription>{STEPS[step].description}</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Step 1: Personal Info */}
            {step === 0 && (
              <div className="space-y-4">
                <div>
                  <Label htmlFor="full_name">Nama Lengkap</Label>
                  <Input id="full_name" {...register('full_name')} placeholder="Masukkan nama lengkap" />
                  {errors.full_name && (
                    <p className="mt-1 text-sm text-red-600">{errors.full_name.message}</p>
                  )}
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" {...register('email')} placeholder="email@example.com" />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                  )}
                </div>
                <div>
                  <Label htmlFor="phone">Nomor Telepon</Label>
                  <Input id="phone" {...register('phone')} placeholder="08xxxxxxxxxx" />
                  {errors.phone && (
                    <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
                  )}
                </div>
                <div>
                  <Label htmlFor="date_of_birth">Tanggal Lahir</Label>
                  <Input id="date_of_birth" type="date" {...register('date_of_birth')} />
                  {errors.date_of_birth && (
                    <p className="mt-1 text-sm text-red-600">{errors.date_of_birth.message}</p>
                  )}
                </div>
              </div>
            )}

            {/* Step 2: Address */}
            {step === 1 && (
              <div className="space-y-4">
                <div>
                  <Label htmlFor="address">Alamat</Label>
                  <Input id="address" {...register('address')} placeholder="Masukkan alamat lengkap" />
                  {errors.address && (
                    <p className="mt-1 text-sm text-red-600">{errors.address.message}</p>
                  )}
                </div>
                <div>
                  <Label htmlFor="city">Kota</Label>
                  <Input id="city" {...register('city')} placeholder="Masukkan kota" />
                  {errors.city && (
                    <p className="mt-1 text-sm text-red-600">{errors.city.message}</p>
                  )}
                </div>
                <div>
                  <Label htmlFor="province">Provinsi</Label>
                  <Input id="province" {...register('province')} placeholder="Masukkan provinsi" />
                  {errors.province && (
                    <p className="mt-1 text-sm text-red-600">{errors.province.message}</p>
                  )}
                </div>
              </div>
            )}

            {/* Step 3: Physical & Background */}
            {step === 2 && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="height_cm">Tinggi Badan (cm)</Label>
                    <Input id="height_cm" type="number" {...register('height_cm')} placeholder="170" />
                    {errors.height_cm && (
                      <p className="mt-1 text-sm text-red-600">{errors.height_cm.message}</p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="weight_kg">Berat Badan (kg)</Label>
                    <Input id="weight_kg" type="number" {...register('weight_kg')} placeholder="60" />
                    {errors.weight_kg && (
                      <p className="mt-1 text-sm text-red-600">{errors.weight_kg.message}</p>
                    )}
                  </div>
                </div>
                <div>
                  <Label htmlFor="occupation">Pekerjaan</Label>
                  <Input id="occupation" {...register('occupation')} placeholder="Masukkan pekerjaan" />
                  {errors.occupation && (
                    <p className="mt-1 text-sm text-red-600">{errors.occupation.message}</p>
                  )}
                </div>
                <div>
                  <Label htmlFor="education">Pendidikan Terakhir</Label>
                  <Input id="education" {...register('education')} placeholder="SMA/S1/S2" />
                  {errors.education && (
                    <p className="mt-1 text-sm text-red-600">{errors.education.message}</p>
                  )}
                </div>
                <div>
                  <Label>Upload Foto</Label>
                  <div className="mt-1 flex items-center gap-4">
                    <label className="flex cursor-pointer items-center gap-2 rounded-lg border border-border px-4 py-2 text-sm hover:bg-gray-50">
                      <Upload className="h-4 w-4" />
                      Pilih Foto
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => setPhoto(e.target.files?.[0] ?? null)}
                      />
                    </label>
                    {photo && (
                      <Badge variant="success">Foto terpilih</Badge>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Step 4: Confirmation */}
            {step === 3 && (
              <div className="space-y-4">
                <h3 className="font-display text-lg font-semibold">
                  Review Data Diri
                </h3>
                <div className="rounded-lg bg-gray-50 p-4 space-y-3">
                  {Object.entries(getValues()).map(([key, value]) => (
                    <div key={key} className="flex justify-between text-sm">
                      <span className="text-muted capitalize">
                        {key.replace(/_/g, ' ')}:
                      </span>
                      <span className="font-medium">
                        {value?.toString() || '-'}
                      </span>
                    </div>
                  ))}
                  {photo && (
                    <div className="flex justify-between text-sm">
                      <span className="text-muted">Foto:</span>
                      <span className="font-medium">{photo.name}</span>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Navigation */}
            <div className="flex justify-between pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={prevStep}
                disabled={step === 0}
              >
                <ChevronLeft className="mr-2 h-4 w-4" />
                Sebelumnya
              </Button>
              {step < STEPS.length - 1 ? (
                <Button type="button" onClick={nextStep}>
                  Selanjutnya
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              ) : (
                <Button type="submit" variant="gold">
                  Kirim Pendaftaran
                </Button>
              )}
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
