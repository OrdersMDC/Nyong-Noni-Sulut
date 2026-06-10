'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import { Check, ChevronLeft, ChevronRight, Upload } from 'lucide-react'
import { submitRegistration } from '@/server/actions/applicants'
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
  const [submitError, setSubmitError] = useState('')
  const [submitting, setSubmitting] = useState(false)

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

  const fieldsByStep: Record<number, (keyof RegistrationInput)[]> = {
    0: ['full_name', 'email', 'phone', 'date_of_birth'],
    1: ['address', 'city', 'province'],
    2: ['height_cm', 'weight_kg', 'occupation', 'education'],
  }

  const validateStep = async (targetStep: number): Promise<boolean> => {
    const fields = fieldsByStep[targetStep] || []
    if (fields.length === 0) return true
    return trigger(fields)
  }

  const nextStep = async () => {
    setSubmitError('')
    const valid = await validateStep(step)
    if (valid) {
      setStep((prev) => Math.min(prev + 1, STEPS.length - 1))
    }
  }

  const prevStep = () => {
    setSubmitError('')
    setStep((prev) => Math.max(prev - 1, 0))
  }

  const onSubmit = async (data: RegistrationInput) => {
    setSubmitError('')

    for (let currentStep = 0; currentStep < 3; currentStep += 1) {
      const valid = await validateStep(currentStep)
      if (!valid) {
        setStep(currentStep)
        setSubmitError(`Lengkapi data pada langkah "${STEPS[currentStep].title}" terlebih dahulu`)
        return
      }
    }

    setSubmitting(true)

    try {
      const formData = new FormData()
      Object.entries(data).forEach(([key, value]) => {
        formData.append(key, String(value))
      })

      const result = await submitRegistration(formData)
      if (result?.error) {
        setSubmitError(String(result.error))
        return
      }

      setStep(STEPS.length)
    } catch {
      setSubmitError('Terjadi kesalahan. Silakan coba lagi.')
    } finally {
      setSubmitting(false)
    }
  }

  // Simplified styled input component
  const FormInput = ({ id, label, type = "text", placeholder, error, ...props }: any) => (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-body-sm text-ink font-medium">{label}</label>
      <input 
        id={id} 
        type={type}
        className={`bg-surface-2 border ${error ? 'border-red-500' : 'border-hairline'} rounded-lg px-4 py-3 text-ink placeholder:text-ink-muted/50 focus:outline-none focus:ring-2 focus:ring-ink`} 
        placeholder={placeholder}
        {...props} 
      />
      {error && <span className="text-xs text-red-500">{error}</span>}
    </div>
  )

  return (
    <div className="bg-canvas min-h-screen pb-[120px]">
      <section className="relative flex flex-col items-center justify-center pt-[180px] pb-[96px] px-[20px] text-center border-b border-hairline">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-display-xl text-ink tracking-tighter mb-6 animate-fade-in">
            Pendaftaran
          </h1>
          <p className="text-subhead text-ink-muted max-w-2xl mx-auto">
            Isi formulir pendaftaran Nyong Noni Sulawesi Utara
          </p>
        </div>
      </section>

      <section className="py-[96px]">
        <div className="mx-auto max-w-3xl px-[20px]">
          {/* Steps indicator */}
          <div className="mb-12">
            <div className="flex items-center justify-between">
              {STEPS.map((s, i) => (
                <div key={s.title} className="flex items-center">
                  <div className="flex items-center gap-3">
                    <div
                      className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold transition-colors ${
                        i < step
                          ? 'bg-ink text-surface-1 border border-ink'
                          : i === step
                            ? 'bg-transparent text-ink border-2 border-ink'
                            : 'bg-surface-2 text-ink-muted border border-hairline'
                      }`}
                    >
                      {i < step ? <Check className="h-5 w-5" /> : i + 1}
                    </div>
                    <div className="hidden sm:block">
                      <p className={`text-sm font-semibold ${i <= step ? 'text-ink' : 'text-ink-muted'}`}>{s.title}</p>
                      <p className="text-xs text-ink-muted opacity-70">{s.description}</p>
                    </div>
                  </div>
                  {i < STEPS.length - 1 && (
                    <div
                      className={`mx-4 h-px w-8 sm:w-16 transition-colors ${
                        i < step ? 'bg-ink' : 'bg-hairline'
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="product-mockup-tile p-8 md:p-12">
            {step < STEPS.length && (
              <div className="mb-8 border-b border-hairline pb-6">
                <h2 className="text-display-md text-ink mb-2">{STEPS[step].title}</h2>
                <p className="text-body-sm text-ink-muted">{STEPS[step].description}</p>
              </div>
            )}
            
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
              {/* Step 1: Personal Info */}
              {step === 0 && (
                <div className="space-y-6 animate-fade-in">
                  <FormInput id="full_name" label="Nama Lengkap" placeholder="Masukkan nama lengkap" error={errors.full_name?.message} {...register('full_name')} />
                  <FormInput id="email" type="email" label="Email" placeholder="email@example.com" error={errors.email?.message} {...register('email')} />
                  <FormInput id="phone" label="Nomor Telepon" placeholder="08xxxxxxxxxx" error={errors.phone?.message} {...register('phone')} />
                  <FormInput id="date_of_birth" type="date" label="Tanggal Lahir" error={errors.date_of_birth?.message} {...register('date_of_birth')} />
                </div>
              )}

              {/* Step 2: Address */}
              {step === 1 && (
                <div className="space-y-6 animate-fade-in">
                  <FormInput id="address" label="Alamat" placeholder="Masukkan alamat lengkap" error={errors.address?.message} {...register('address')} />
                  <FormInput id="city" label="Kota" placeholder="Masukkan kota" error={errors.city?.message} {...register('city')} />
                  <FormInput id="province" label="Provinsi" placeholder="Masukkan provinsi" error={errors.province?.message} {...register('province')} />
                </div>
              )}

              {/* Step 3: Physical & Background */}
              {step === 2 && (
                <div className="space-y-6 animate-fade-in">
                  <div className="grid grid-cols-2 gap-6">
                    <FormInput id="height_cm" type="number" label="Tinggi Badan (cm)" placeholder="170" error={errors.height_cm?.message} {...register('height_cm')} />
                    <FormInput id="weight_kg" type="number" label="Berat Badan (kg)" placeholder="60" error={errors.weight_kg?.message} {...register('weight_kg')} />
                  </div>
                  <FormInput id="occupation" label="Pekerjaan" placeholder="Masukkan pekerjaan" error={errors.occupation?.message} {...register('occupation')} />
                  <FormInput id="education" label="Pendidikan Terakhir" placeholder="SMA/S1/S2" error={errors.education?.message} {...register('education')} />
                  
                  <div className="flex flex-col gap-2 pt-2">
                    <label className="text-body-sm text-ink font-medium">Upload Foto</label>
                    <div className="flex items-center gap-4 mt-2">
                      <label className="flex cursor-pointer items-center gap-2 rounded-lg border border-ink px-5 py-3 text-sm font-semibold hover:bg-surface-2 transition-colors">
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
                        <span className="text-xs bg-green-500/20 text-green-700 px-3 py-1.5 rounded-full font-semibold">Foto terpilih: {photo.name}</span>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Step 4: Confirmation */}
              {step === 3 && (
                <div className="space-y-6 animate-fade-in">
                  <h3 className="text-headline text-ink mb-4">
                    Review Data Diri
                  </h3>
                  <div className="rounded-xl border border-hairline bg-surface-2 p-6 space-y-4">
                    {Object.entries(getValues()).map(([key, value]) => (
                      <div key={key} className="flex justify-between border-b border-hairline pb-3 last:border-0 last:pb-0">
                        <span className="text-ink-muted capitalize text-sm">
                          {key.replace(/_/g, ' ')}
                        </span>
                        <span className="font-semibold text-ink text-sm text-right max-w-[60%]">
                          {value?.toString() || '-'}
                        </span>
                      </div>
                    ))}
                    {photo && (
                      <div className="flex justify-between border-t border-hairline pt-3 mt-3">
                        <span className="text-ink-muted text-sm">Foto</span>
                        <span className="font-semibold text-ink text-sm max-w-[60%] truncate">{photo.name}</span>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {step === STEPS.length && (
                <div className="space-y-6 animate-fade-in py-10 text-center">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-green-500/20 bg-green-500/10">
                    <Check className="h-8 w-8 text-green-600" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-display-md text-ink">Pendaftaran Berhasil</h3>
                    <p className="text-body-sm text-ink-muted max-w-lg mx-auto">
                      Terima kasih telah mendaftar. Data Anda sudah kami terima dan akan diproses lebih lanjut.
                    </p>
                  </div>
                </div>
              )}

              {submitError && (
                <p className="text-center text-sm text-red-500">{submitError}</p>
              )}

              {/* Navigation */}
              <div className="flex justify-between pt-8 border-t border-hairline mt-10">
                {step === STEPS.length ? (
                  <div className="w-full text-center">
                    <Link href="/" className="text-body-sm font-semibold text-ink-muted transition-colors hover:text-ink">
                      Kembali ke Beranda
                    </Link>
                  </div>
                ) : (
                  <>
                    <Button
                      type="button"
                      variant="secondary"
                      onClick={prevStep}
                      disabled={step === 0}
                      className="px-6"
                    >
                      <ChevronLeft className="mr-2 h-4 w-4" />
                      Sebelumnya
                    </Button>
                    {step < STEPS.length - 1 ? (
                      <Button type="button" variant="primary" onClick={nextStep} className="px-6">
                        Selanjutnya
                        <ChevronRight className="ml-2 h-4 w-4" />
                      </Button>
                    ) : (
                      <Button type="submit" variant="primary" className="px-8" disabled={submitting}>
                        {submitting ? 'Mengirim...' : 'Kirim Pendaftaran'}
                      </Button>
                    )}
                  </>
                )}
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  )
}
